"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ActivityStage from "@/components/ActivityStage";
import BookShell from "@/components/BookShell";
import ManuscriptPage from "@/components/ManuscriptPage";
import { applyEffects, createInitialSave, loadSave, writeSave } from "@/lib/save";
import { getChapter, getFirstChapterId } from "@/lib/story";
import type { SaveData, StoryBeat } from "@/types/game";

const ACTIVITY_TYPES = new Set(["sorting", "inspection", "comparison", "assembly"]);

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
  };
}

function GameContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") ?? "new";
  const chapterId = getFirstChapterId();
  const chapter = getChapter(chapterId);
  const [save, setSave] = useState<SaveData | null>(null);
  const [beatId, setBeatId] = useState("");

  useEffect(() => {
    if (!chapter) return;
    const existing = mode === "continue" ? loadSave() : null;
    const initial = existing?.chapterId === chapterId ? normalizeSave(existing) : createInitialSave(chapterId);
    setSave(initial);
    setBeatId(chapter.beats[initial.beatIndex]?.id ?? chapter.beats[0].id);
  }, [chapter, chapterId, mode]);

  const currentIndex = useMemo(() => chapter?.beats.findIndex((beat) => beat.id === beatId) ?? -1, [chapter, beatId]);
  const currentBeat = chapter?.beats[currentIndex];

  const commit = useCallback((nextBeatId: string, nextSave: SaveData, index: number) => {
    const data = { ...nextSave, beatIndex: index, savedAt: Date.now() };
    setSave(data);
    writeSave(data);
    setBeatId(nextBeatId);
  }, []);

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
  const segment = currentIndex < 9 ? "开工" : currentIndex < 18 ? "旧纸" : currentIndex < 30 ? "残页" : currentIndex < 41 ? "来客" : "夜谈";

  const left = (
    <aside className="ledger-page">
      <div className="vertical-title"><span>听雨书坊</span><small>今日书课</small></div>
      <div className="ledger-date">康熙九年 · 九月廿三</div>
      <h2>{segment}</h2>
      <p className="ledger-objective">{activity ? "完成案上的工作，所得判断会写入笺记。" : "读下去。留意纸上没有写明的事情。"}</p>
      <dl className="ledger-stats">
        <div><dt>工钱</dt><dd>{save.variables.wage || 20} 文</dd></div>
        <div><dt>残页</dt><dd>{save.variables.paper} 页</dd></div>
        <div><dt>掌柜</dt><dd>{save.variables.trust > 3 ? "渐信" : save.variables.trust < 0 ? "存疑" : "平常"}</dd></div>
      </dl>
      <div className="clue-notes">
        <h3>案头笺记</h3>
        {save.clues.length ? save.clues.slice(-4).map((clue) => <p key={clue}>· {clue}</p>) : <p>尚无可记之事。</p>}
      </div>
      <blockquote>纸寿千年，语存一日。所抄为何，须自己看清。</blockquote>
    </aside>
  );

  const right = activity ? (
    <ActivityStage key={currentBeat.id} beat={currentBeat} onComplete={handleActivity} />
  ) : (
    <ManuscriptPage
      key={currentBeat.id}
      speaker={currentBeat.type === "title" ? undefined : currentBeat.speaker}
      text={currentBeat.text}
      isTitle={currentBeat.type === "title"}
      canTurn={!isEnd && !choices}
      onTurn={() => advance()}
      choices={choices}
      onChoice={handleChoice}
      footer={isEnd ? <Link className="seal-action" href="/archive"><span>终</span> 查看本章笺记</Link> : undefined}
    />
  );

  return <BookShell left={left} right={right} chapter={chapter.subtitle} progress={`${currentIndex + 1} / ${chapter.beats.length}`} />;
}

export default function GamePage() {
  return <Suspense fallback={<div className="loading-book">展卷中……</div>}><GameContent /></Suspense>;
}
