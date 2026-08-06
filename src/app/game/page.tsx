"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ActivityStage from "@/components/ActivityStage";
import type { ActivityResult } from "@/components/ActivityStage";
import BookShell from "@/components/BookShell";
import ManuscriptPage from "@/components/ManuscriptPage";
import PlayerNotebook from "@/components/PlayerNotebook";
import TutorialOverlay from "@/components/TutorialOverlay";
import { applyEffects, applyNoteUpdates, createInitialSave, loadSaveResult, writeSave } from "@/lib/save";
import { getChapter, getFirstChapterId, resolveChoiceStoryTarget, resolveNextStoryBeat } from "@/lib/story";
import type { SaveData, StoryBeat } from "@/types/game";
import type { CompilationState } from "@/types/game";
import { applyFragmentAction, grantFragments, preserveCompilationProgress } from "@/lib/compilation";
import { getFragments } from "@/lib/fragments";
import { GAME_TIMELINE } from "@/lib/timeline";
import { mergeRouteEntrances } from "@/lib/route-entrances";
import { readTutorialCompletion, saveTutorialCompletion, shouldAutoOpenTutorial } from "@/lib/tutorial";

const ACTIVITY_TYPES = new Set(["sorting", "inspection", "comparison", "assembly", "map", "compilation"]);
type HistoryEntry = { beatId: string; save: SaveData };

function GameContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") ?? "new";
  const [chapterId, setChapterId] = useState(getFirstChapterId());
  const chapter = getChapter(chapterId);
  const [save, setSave] = useState<SaveData | null>(null);
  const [beatId, setBeatId] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showDelayedControls, setShowDelayedControls] = useState(false);
  const [showFlyleaf, setShowFlyleaf] = useState(mode === "new");
  const [showTutorial, setShowTutorial] = useState(false);
  const [pageTurn, setPageTurn] = useState<"forward" | "backward" | null>(null);
  const [loadIssue, setLoadIssue] = useState<string | null>(null);
  const [saveIssue, setSaveIssue] = useState<string | null>(null);
  const [runtimeIssue, setRuntimeIssue] = useState<string | null>(null);
  const turnTimers = useRef<number[]>([]);
  const turning = useRef(false);
  const tutorialAutoShown = useRef(false);

  const performPageTurn = useCallback((action: () => void, direction: "forward" | "backward" = "forward") => {
    if (turning.current) return;
    turning.current = true;
    setPageTurn(direction);
    turnTimers.current.push(window.setTimeout(action, 350));
    turnTimers.current.push(window.setTimeout(() => {
      setPageTurn(null);
      turning.current = false;
    }, 760));
  }, []);

  useEffect(() => () => {
    turnTimers.current.forEach((timer) => window.clearTimeout(timer));
    turning.current = false;
  }, []);

  useEffect(() => {
    setLoadIssue(null);
    setRuntimeIssue(null);
    tutorialAutoShown.current = false;
    setShowTutorial(false);
    let initial: SaveData;
    if (mode === "continue") {
      const result = loadSaveResult();
      if (result.status === "ok") {
        initial = result.data;
        if (result.migrated) {
          const written = writeSave(initial);
          if (!written.ok) setSaveIssue(written.message);
        }
      } else if (result.status === "missing") {
        initial = createInitialSave(getFirstChapterId());
      } else {
        const reason = result.status === "future-version"
          ? `这份书签来自更新版本（版本 ${result.version}），当前版本不会覆盖它。`
          : result.status === "corrupt" ? result.reason : result.reason;
        setLoadIssue(reason);
        setSave(null);
        return;
      }
    } else initial = createInitialSave(getFirstChapterId());
    const initialChapter = getChapter(initial.chapterId);
    if (!initialChapter) return;
    setChapterId(initialChapter.id);
    setSave(initial);
    setBeatId(initialChapter.beats[initial.beatIndex]?.id ?? initialChapter.beats[0].id);
    setHistory([]);
    setShowFlyleaf(mode === "new");
  }, [mode]);

  useEffect(() => {
    if (tutorialAutoShown.current || !save || showFlyleaf) return;
    tutorialAutoShown.current = true;
    setShowTutorial(shouldAutoOpenTutorial(true, readTutorialCompletion()));
  }, [save, showFlyleaf]);

  const closeTutorial = useCallback(() => setShowTutorial(false), []);
  const openTutorial = useCallback(() => setShowTutorial(true), []);
  const completeTutorial = useCallback(() => {
    saveTutorialCompletion();
    setShowTutorial(false);
  }, []);

  const persist = useCallback((data: SaveData) => {
    const result = writeSave(data);
    setSaveIssue(result.ok ? null : result.message);
  }, []);

  useEffect(() => {
    if (!save || !showFlyleaf || mode !== "new") return;
    const timer = window.setTimeout(() => performPageTurn(() => setShowFlyleaf(false)), 1150);
    return () => window.clearTimeout(timer);
  }, [mode, performPageTurn, save, showFlyleaf]);

  useEffect(() => {
    setShowDelayedControls(false);
    const timer = window.setTimeout(() => setShowDelayedControls(true), 5000);
    return () => window.clearTimeout(timer);
  }, [beatId]);

  const currentIndex = useMemo(() => chapter?.beats.findIndex((beat) => beat.id === beatId) ?? -1, [chapter, beatId]);
  const currentBeat = chapter?.beats[currentIndex];

  const commit = useCallback((nextChapterId: string, nextBeatId: string, nextSave: SaveData, index: number) => {
    const nextChapter = getChapter(nextChapterId);
    const enteringBeat = nextChapter?.beats.find((beat) => beat.id === nextBeatId);
    if (!nextChapter || !enteringBeat || index < 0) {
      setRuntimeIssue(`剧情目标不存在：${nextChapterId}:${nextBeatId}`);
      return;
    }
    if (save && beatId) setHistory((current) => [...current, { beatId, save }]);
    const unlockedLocations = Array.from(new Set([
      ...nextSave.unlockedLocations,
      ...(enteringBeat?.locationUpdates?.unlock ?? []),
    ]));
    const investigatedLocations = Array.from(new Set([
      ...nextSave.investigatedLocations,
      ...(enteringBeat?.locationUpdates?.investigate ?? []),
    ]));
    const unlockedEntrances = mergeRouteEntrances(
      nextSave.unlockedEntrances,
      enteringBeat?.locationUpdates?.unlockEntrances ?? [],
    );
    const compilation = grantFragments(nextSave.compilation, getFragments(enteringBeat?.grantFragments ?? []));
    const data = {
      ...nextSave,
      chapterId: nextChapterId,
      playerNotes: applyNoteUpdates(nextSave.playerNotes, enteringBeat?.noteUpdates, enteringBeat?.id),
      unlockedLocations,
      investigatedLocations,
      unlockedEntrances,
      compilation,
      beatIndex: index,
      savedAt: Date.now(),
    };
    setChapterId(nextChapterId);
    setSave(data);
    persist(data);
    setBeatId(nextBeatId);
  }, [beatId, persist, save]);

  const goBack = useCallback(() => {
    const previous = history.at(-1);
    if (!previous || !save) return;
    const persistentPrevious = preserveCompilationProgress(previous.save, save);
    setHistory((current) => current.slice(0, -1));
    setChapterId(persistentPrevious.chapterId);
    setSave(persistentPrevious);
    setBeatId(previous.beatId);
    persist(persistentPrevious);
  }, [history, persist, save]);

  const resolveNext = useCallback((beat: StoryBeat) => {
    if (!chapter) return null;
    return resolveNextStoryBeat(chapter, beat) ?? null;
  }, [chapter]);

  const advance = useCallback((override?: SaveData) => {
    if (!currentBeat || !save) return;
    const resolved = resolveNext(currentBeat);
    if (resolved) commit(chapterId, resolved.beat.id, override ?? save, resolved.index);
  }, [chapterId, commit, currentBeat, resolveNext, save]);

  const handleChoice = useCallback((choiceIndex: number) => {
    if (!currentBeat?.choices || !save || !chapter) return;
    const choice = currentBeat.choices[choiceIndex];
    let compilation = save.compilation;
    try {
      if (choice.fragmentAction) compilation = applyFragmentAction(save.compilation, choice.fragmentAction.fragmentId, choice.fragmentAction);
    } catch (error) {
      setRuntimeIssue(error instanceof Error ? error.message : "无法执行史料处置");
      return;
    }
    const nextSave = {
      ...save,
      compilation,
      variables: applyEffects(save.variables, choice.effects),
      unlockedLocations: Array.from(new Set([...save.unlockedLocations, ...(choice.unlockLocations ?? [])])),
    };
    if (choice.goto) {
      const target = resolveChoiceStoryTarget(choice, chapterId);
      if (target) commit(target.chapterId, target.beat.id, nextSave, target.index);
      else setRuntimeIssue(`选择目标不存在：${choice.chapter ?? chapterId}:${choice.goto}`);
    } else advance(nextSave);
  }, [advance, chapter, chapterId, commit, currentBeat, save]);

  const handleActivity = useCallback((result: ActivityResult) => {
    if (!save || !currentBeat || !chapter) return;
    const effectedVariables = applyEffects(save.variables, result.effects);
    effectedVariables.risk = Math.max(0, effectedVariables.risk);
    effectedVariables.wage = Math.max(0, effectedVariables.wage);
    const nextSave: SaveData = {
      ...save,
      variables: {
        ...effectedVariables,
        wage: effectedVariables.wage + (result.wage ?? 0),
        paper: effectedVariables.paper + (result.paper ?? 0),
      },
      completedActivities: Array.from(new Set([...save.completedActivities, currentBeat.id])),
      clues: Array.from(new Set([...save.clues, ...(result.clues ?? [])])),
      unlockedArchive: Array.from(new Set([...save.unlockedArchive, ...(result.archive ?? []), ...(currentBeat.unlockArchive ?? [])])),
      unlockedLocations: Array.from(new Set([...save.unlockedLocations, ...(result.location ? [result.location] : [])])),
    };
    if (result.goto) {
      const gotoIndex = chapter.beats.findIndex((beat) => beat.id === result.goto);
      if (gotoIndex >= 0) commit(chapterId, chapter.beats[gotoIndex].id, nextSave, gotoIndex);
      else setRuntimeIssue(`活动目标不存在：${chapterId}:${result.goto}`);
      return;
    }
    advance(nextSave);
  }, [advance, chapter, chapterId, commit, currentBeat, save]);

  const handleCompilationChange = useCallback((compilation: CompilationState, effects?: { wage?: number; risk?: number }) => {
    if (!save) return;
    const data: SaveData = {
      ...save,
      compilation,
      variables: {
        ...save.variables,
        wage: Math.max(0, save.variables.wage + (effects?.wage ?? 0)),
        risk: Math.max(0, save.variables.risk + (effects?.risk ?? 0)),
      },
      savedAt: Date.now(),
    };
    setSave(data);
    persist(data);
  }, [persist, save]);

  if (loadIssue) {
    return <main className="save-recovery" role="alert"><h1>书签无法展开</h1><p>{loadIssue}</p><p>原始书签仍保留在本机，没有被清空或覆盖。请先到“杂项”导出备份，再决定清除或从头开始。</p><div><Link className="ink-action" href="/settings">前往杂项</Link><Link className="ink-action" href="/">返回卷首</Link></div></main>;
  }

  if (runtimeIssue) {
    return <main className="save-recovery" role="alert"><h1>此处无法续写</h1><p>{runtimeIssue}</p><p>书签没有被推进。请返回卷首或舆图，并保留此提示用于排查。</p><div><Link className="ink-action" href="/">返回卷首</Link><Link className="ink-action" href="/map">查看舆图</Link></div></main>;
  }

  if (!chapter || !save || !currentBeat || currentIndex < 0) {
    return <div className="loading-book">展卷中……</div>;
  }

  const activity = ACTIVITY_TYPES.has(currentBeat.type ?? "");
  const choices = currentBeat.type === "choice" ? currentBeat.choices : undefined;
  const isEnd = resolveNext(currentBeat) === null;
  const sceneLeft = <PlayerNotebook notes={save.playerNotes} compilation={save.compilation} onCompilationChange={handleCompilationChange} date={chapter.date} place={chapter.place} weather={chapter.weather} />;

  const flyleafLeft = (
    <aside className="flyleaf flyleaf--chapter" aria-label="卷首">
      <small>佣书</small>
      <h1>第一章</h1>
      <p>第十三页</p>
      <i aria-hidden>录</i>
    </aside>
  );

  const flyleafRight = (
    <section className="flyleaf flyleaf--time" aria-label="时间地点">
      <span>{GAME_TIMELINE.reignLabel}</span>
      <strong>广州</strong>
      <em>雨</em>
      <small>九月廿三</small>
    </section>
  );

  const attributes = (
    <div className="ledger-page attribute-ledger">
      <div className="vertical-title"><span>课簿</span><small>听雨书坊</small></div>
      <div className="ledger-date">听雨坊店规 · 交成记账</div>
      <h2>今日账记</h2>
      <p className="ledger-objective">旧纸分类、跑腿杂役做完入账；抄书另行议价，到约定账日结清。</p>
      <dl className="ledger-stats">
        <div><dt>账上工钱</dt><dd>{save.variables.wage} 文</dd></div>
        <div><dt>残页</dt><dd>{save.variables.paper} 页</dd></div>
        <div><dt>掌柜</dt><dd>{save.variables.trust > 3 ? "渐信" : save.variables.trust < 0 ? "存疑" : "平常"}</dd></div>
        <div><dt>风险</dt><dd>{save.variables.risk > 5 ? "迫近" : save.variables.risk > 2 ? "渐起" : "平静"}</dd></div>
      </dl>
      <div className="clue-notes">
        <span className="clue-kind">自查</span>
        <h3 className="clue-heading">案头笺记</h3>
        <div className="clue-content">
          {save.clues.length ? save.clues.slice(-4).map((clue) => <p key={clue}>· {clue}</p>) : <p>尚无可记之事。</p>}
        </div>
      </div>
    </div>
  );

  const storyRight = activity ? (
    <ActivityStage
      key={`${chapterId}:${currentBeat.id}`}
      beat={currentBeat}
      onComplete={(result) => performPageTurn(() => handleActivity(result))}
      showSkip={showDelayedControls}
      unlockedLocations={save.unlockedLocations}
      investigatedLocations={save.investigatedLocations}
      compilation={save.compilation}
    />
  ) : (
    <ManuscriptPage
      key={`${chapterId}:${currentBeat.id}`}
      speaker={currentBeat.type === "title" ? undefined : currentBeat.speaker}
      text={currentBeat.text}
      isTitle={currentBeat.type === "title"}
      canTurn={!isEnd && !choices}
      onTurn={() => performPageTurn(() => advance())}
      choices={choices}
      onChoice={(index) => performPageTurn(() => handleChoice(index))}
      footer={isEnd ? <Link className="seal-action" href="/archive"><span>终</span> 查看本章笺记</Link> : undefined}
    />
  );

  const controls = history.length > 0 ? (
    <button type="button" className="previous-page" onClick={() => performPageTurn(goBack, "backward")} title="翻回上一页" aria-label="翻回上一页">
      <span aria-hidden>←</span><small>前页</small>
    </button>
  ) : null;

  const rightPage = <>{saveIssue && <p className="save-warning" role="alert">{saveIssue}</p>}{storyRight}</>;

  return (
    <BookShell
      left={showFlyleaf ? flyleafLeft : sceneLeft}
      right={showFlyleaf ? flyleafRight : rightPage}
      chapter={showFlyleaf ? "卷首" : chapter.subtitle}
      progress={showFlyleaf ? "扉页" : `${currentIndex + 1} / ${chapter.beats.length}`}
      attributes={showFlyleaf ? undefined : attributes}
      controls={showFlyleaf ? undefined : controls}
      pageTurn={pageTurn}
      mobileLeftLabel={showFlyleaf ? undefined : "手札"}
      tutorialOpen={showTutorial}
      showTutorialHelp={!showFlyleaf}
      onOpenTutorial={openTutorial}
      tutorial={<TutorialOverlay open={showTutorial} onClose={closeTutorial} onComplete={completeTutorial} />}
      binding="right"
    />
  );
}

export default function GamePage() {
  return <Suspense fallback={<div className="loading-book">展卷中……</div>}><GameContent /></Suspense>;
}
