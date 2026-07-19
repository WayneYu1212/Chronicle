"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ManuscriptPage from "@/components/ManuscriptPage";
import WoodButton from "@/components/WoodButton";
import { applyEffects, createInitialSave, loadSave, writeSave } from "@/lib/save";
import { getChapter, getFirstChapterId } from "@/lib/story";
import type { GameVariables, SaveData, StoryBeat } from "@/types/game";

function GameContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") ?? "new";

  const chapterId = getFirstChapterId();
  const chapter = getChapter(chapterId);

  const [save, setSave] = useState<SaveData | null>(null);
  const [beatId, setBeatId] = useState<string>("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!chapter) return;

    if (mode === "continue") {
      const existing = loadSave();
      if (existing && existing.chapterId === chapterId) {
        setSave(existing);
        const beat = chapter.beats[existing.beatIndex];
        setBeatId(beat?.id ?? chapter.beats[0].id);
        setReady(true);
        return;
      }
    }

    const initial = createInitialSave(chapterId);
    setSave(initial);
    setBeatId(chapter.beats[0].id);
    setReady(true);
  }, [chapter, chapterId, mode]);

  const currentIndex = useMemo(() => {
    if (!chapter) return -1;
    return chapter.beats.findIndex((b) => b.id === beatId);
  }, [chapter, beatId]);

  const currentBeat: StoryBeat | undefined = chapter?.beats[currentIndex];

  const persistProgress = useCallback(
    (nextBeatId: string, variables: GameVariables, beatIndex: number) => {
      if (!chapter) return;
      const data: SaveData = {
        chapterId: chapter.id,
        beatIndex,
        variables,
        unlockedArchive: save?.unlockedArchive ?? [],
        unlockedCharacters: save?.unlockedCharacters ?? [],
        savedAt: Date.now(),
      };
      setSave(data);
      writeSave(data);
      setBeatId(nextBeatId);
    },
    [chapter, save]
  );

  const resolveNextBeat = useCallback(
    (beat: StoryBeat) => {
      if (!chapter) return null;
      if (beat.next) {
        const index = chapter.beats.findIndex((b) => b.id === beat.next);
        if (index >= 0) return { beat: chapter.beats[index], index };
      }
      const nextIndex = chapter.beats.findIndex((b) => b.id === beat.id) + 1;
      if (nextIndex >= chapter.beats.length) return null;
      return { beat: chapter.beats[nextIndex], index: nextIndex };
    },
    [chapter]
  );

  const advance = useCallback(() => {
    if (!chapter || !save || !currentBeat) return;
    const resolved = resolveNextBeat(currentBeat);
    if (!resolved) return;
    persistProgress(resolved.beat.id, save.variables, resolved.index);
  }, [chapter, save, currentBeat, resolveNextBeat, persistProgress]);

  const handleChoice = useCallback(
    (choiceIndex: number) => {
      if (!currentBeat?.choices || !save) return;
      const choice = currentBeat.choices[choiceIndex];
      if (!choice) return;

      const nextVariables = applyEffects(save.variables, choice.effects);
      const gotoId = choice.goto;
      const gotoIndex = chapter?.beats.findIndex((b) => b.id === gotoId) ?? -1;

      if (gotoId && gotoIndex >= 0) {
        persistProgress(gotoId, nextVariables, gotoIndex);
        return;
      }

      advance();
    },
    [currentBeat, save, chapter, persistProgress, advance]
  );

  const isEnd = useMemo(() => {
    if (!chapter || !currentBeat || currentIndex < 0) return false;
    return resolveNextBeat(currentBeat) === null;
  }, [chapter, currentBeat, currentIndex, resolveNextBeat]);

  if (!ready || !chapter || !save || !currentBeat) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="tracking-[0.3em] text-ink-faint">展卷中……</p>
      </div>
    );
  }

  const isChoice = currentBeat.type === "choice" && currentBeat.choices?.length;
  const isTitle = currentBeat.type === "title";

  return (
    <main className="relative flex min-h-screen flex-col bg-gradient-to-b from-paper via-paper to-paper-dark/30 px-4 py-8 sm:px-6 sm:py-12">
      <header className="mx-auto mb-8 flex w-full max-w-2xl items-center justify-between">
        <Link href="/" className="text-xs tracking-[0.3em] text-ink-faint hover:text-cinnabar">
          ← 返回
        </Link>
        <div className="text-center">
          <p className="chapter-label">{chapter.title}</p>
          {chapter.subtitle && (
            <p className="mt-1 text-xs tracking-[0.35em] text-ink-faint">{chapter.subtitle}</p>
          )}
        </div>
        <span className="text-xs tracking-wider text-ink-faint">
          {currentIndex + 1}/{chapter.beats.length}
        </span>
      </header>

      <section className="mx-auto w-full max-w-2xl flex-1">
        <ManuscriptPage
          key={currentBeat.id}
          speaker={isTitle ? undefined : currentBeat.speaker}
          text={currentBeat.text}
          isTitle={isTitle}
          canTurn={!isEnd && !isChoice}
          onTurn={advance}
          choices={isChoice ? currentBeat.choices : undefined}
          onChoice={isChoice ? handleChoice : undefined}
          footer={
            isEnd ? (
              <div className="flex flex-col items-center gap-3 pt-6">
                <WoodButton href="/" className="text-sm opacity-80">
                  返回首页
                </WoodButton>
                <WoodButton
                  href="/game?mode=new"
                  onClick={() => {
                    const initial = createInitialSave(chapterId);
                    writeSave(initial);
                  }}
                  className="text-sm opacity-80"
                >
                  重读本章
                </WoodButton>
              </div>
            ) : undefined
          }
        />
      </section>

      <footer className="mx-auto mt-10 w-full max-w-2xl border-t border-paper-edge/40 pt-4 text-center text-xs tracking-wider text-ink-faint">
        残页 {save.variables.paper} · 信任 {save.variables.trust}
      </footer>
    </main>
  );
}

export default function GamePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="tracking-[0.3em] text-ink-faint">展卷中……</p>
        </div>
      }
    >
      <GameContent />
    </Suspense>
  );
}
