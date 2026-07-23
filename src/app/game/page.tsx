"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ActivityStage from "@/components/ActivityStage";
import BookShell from "@/components/BookShell";
import ManuscriptPage from "@/components/ManuscriptPage";
import PlayerNotebook from "@/components/PlayerNotebook";
import { applyEffects, applyNoteUpdates, createInitialPlayerNotes, createInitialSave, loadSave, writeSave } from "@/lib/save";
import { getChapter, getFirstChapterId } from "@/lib/story";
import type { SaveData, StoryBeat } from "@/types/game";

const ACTIVITY_TYPES = new Set(["sorting", "inspection", "comparison", "assembly"]);
type HistoryEntry = { beatId: string; save: SaveData };

function normalizeSave(data: SaveData): SaveData {
  return {
    ...data,
    variables: {
      paper: data.variables.paper ?? 0,
      trust: data.variables.trust ?? 0,
      wage: data.variables.wage ?? 0,
      trust_yimin: data.variables.trust_yimin ?? 0,
      trust_qing: data.variables.trust_qing ?? 0,
      trust_priest: data.variables.trust_priest ?? 0,
    },
    unlockedArchive: data.unlockedArchive ?? [],
    unlockedCharacters: data.unlockedCharacters ?? [],
    completedActivities: data.completedActivities ?? [],
    clues: data.clues ?? [],
    playerNotes: data.playerNotes ?? createInitialPlayerNotes(),
  };
}

function GameContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") ?? "new";
  const chapterId = getFirstChapterId();
  const chapter = getChapter(chapterId);
  const [save, setSave] = useState<SaveData | null>(null);
  const [beatId, setBeatId] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showDelayedControls, setShowDelayedControls] = useState(false);
  const [showFlyleaf, setShowFlyleaf] = useState(mode === "new");
  const [pageTurn, setPageTurn] = useState<"forward" | "backward" | null>(null);
  const turnTimers = useRef<number[]>([]);
  const turning = useRef(false);

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
    if (!chapter) return;
    const existing = mode === "continue" ? loadSave() : null;
    const initial = existing?.chapterId === chapterId ? normalizeSave(existing) : createInitialSave(chapterId);
    setSave(initial);
    setBeatId(chapter.beats[initial.beatIndex]?.id ?? chapter.beats[0].id);
    setHistory([]);
    setShowFlyleaf(mode === "new");
  }, [chapter, chapterId, mode]);

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

  const commit = useCallback((nextBeatId: string, nextSave: SaveData, index: number) => {
    if (save && beatId) setHistory((current) => [...current, { beatId, save }]);
    const enteringBeat = chapter?.beats.find((beat) => beat.id === nextBeatId);
    const data = {
      ...nextSave,
      playerNotes: applyNoteUpdates(nextSave.playerNotes, enteringBeat?.noteUpdates, enteringBeat?.id),
      beatIndex: index,
      savedAt: Date.now(),
    };
    setSave(data);
    writeSave(data);
    setBeatId(nextBeatId);
  }, [beatId, chapter, save]);

  const goBack = useCallback(() => {
    const previous = history.at(-1);
    if (!previous) return;
    setHistory((current) => current.slice(0, -1));
    setSave(previous.save);
    setBeatId(previous.beatId);
    writeSave(previous.save);
  }, [history]);

  const resolveNext = useCallback((beat: StoryBeat) => {
    if (!chapter) return null;
    const index = beat.next ? chapter.beats.findIndex((item) => item.id === beat.next) : chapter.beats.findIndex((item) => item.id === beat.id) + 1;
    return index >= 0 && index < chapter.beats.length ? { beat: chapter.beats[index], index } : null;
  }, [chapter]);

  const advance = useCallback((override?: SaveData) => {
    if (!currentBeat || !save) return;
    const resolved = resolveNext(currentBeat);
    if (resolved) commit(resolved.beat.id, override ?? save, resolved.index);
  }, [commit, currentBeat, resolveNext, save]);

  const handleChoice = useCallback((choiceIndex: number) => {
    if (!currentBeat?.choices || !save || !chapter) return;
    const choice = currentBeat.choices[choiceIndex];
    const nextSave = { ...save, variables: applyEffects(save.variables, choice.effects) };
    const gotoIndex = choice.goto ? chapter.beats.findIndex((beat) => beat.id === choice.goto) : -1;
    if (gotoIndex >= 0) commit(chapter.beats[gotoIndex].id, nextSave, gotoIndex);
    else advance(nextSave);
  }, [advance, chapter, commit, currentBeat, save]);

  const handleActivity = useCallback((result: { clues?: string[]; archive?: string[]; wage?: number; paper?: number }) => {
    if (!save || !currentBeat) return;
    const nextSave: SaveData = {
      ...save,
      variables: {
        ...save.variables,
        wage: save.variables.wage + (result.wage ?? 0),
        paper: save.variables.paper + (result.paper ?? 0),
      },
      completedActivities: Array.from(new Set([...save.completedActivities, currentBeat.id])),
      clues: Array.from(new Set([...save.clues, ...(result.clues ?? [])])),
      unlockedArchive: Array.from(new Set([...save.unlockedArchive, ...(result.archive ?? []), ...(currentBeat.unlockArchive ?? [])])),
    };
    advance(nextSave);
  }, [advance, currentBeat, save]);

  if (!chapter || !save || !currentBeat || currentIndex < 0) {
    return <div className="loading-book">展卷中……</div>;
  }

  const activity = ACTIVITY_TYPES.has(currentBeat.type ?? "");
  const choices = currentBeat.type === "choice" ? currentBeat.choices : undefined;
  const isEnd = resolveNext(currentBeat) === null;
  const sceneLeft = <PlayerNotebook notes={save.playerNotes} />;

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
      <span>康熙九年</span>
      <strong>广州</strong>
      <em>雨</em>
      <small>九月廿三</small>
    </section>
  );

  const attributes = (
    <div className="ledger-page attribute-ledger">
      <div className="vertical-title"><span>课簿</span><small>听雨书坊</small></div>
      <div className="ledger-date">逢五日结清 · 抄书另按字数</div>
      <h2>今日账记</h2>
      <p className="ledger-objective">旧纸分类、跑腿杂役依件入账。逢五日一清，抄书另照字数计工。</p>
      <dl className="ledger-stats">
        <div><dt>账上工钱</dt><dd>{save.variables.wage} 文</dd></div>
        <div><dt>残页</dt><dd>{save.variables.paper} 页</dd></div>
        <div><dt>掌柜</dt><dd>{save.variables.trust > 3 ? "渐信" : save.variables.trust < 0 ? "存疑" : "平常"}</dd></div>
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
    <ActivityStage key={currentBeat.id} beat={currentBeat} onComplete={(result) => performPageTurn(() => handleActivity(result))} showSkip={showDelayedControls} />
  ) : (
    <ManuscriptPage
      key={currentBeat.id}
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

  return (
    <BookShell
      left={showFlyleaf ? flyleafLeft : sceneLeft}
      right={showFlyleaf ? flyleafRight : storyRight}
      chapter={showFlyleaf ? "卷首" : chapter.subtitle}
      progress={showFlyleaf ? "扉页" : `${currentIndex + 1} / ${chapter.beats.length}`}
      attributes={showFlyleaf ? undefined : attributes}
      controls={showFlyleaf ? undefined : controls}
      pageTurn={pageTurn}
      mobileLeftLabel={showFlyleaf ? undefined : "手札"}
      binding="right"
    />
  );
}

export default function GamePage() {
  return <Suspense fallback={<div className="loading-book">展卷中……</div>}><GameContent /></Suspense>;
}
