import type { StoryBeat, StoryChapter, StoryChoice } from "@/types/game";
import chapter01 from "@/story/chapter01.json";
import chapter02Guangzhou from "@/story/chapter02-guangzhou.json";
import chapter02Nanhai from "@/story/chapter02-nanhai.json";
import chapter03 from "@/story/chapter03.json";

export const chapterRegistry: Readonly<Record<string, StoryChapter>> = {
  chapter01: chapter01 as StoryChapter,
  "chapter02-guangzhou": chapter02Guangzhou as StoryChapter,
  "chapter02-nanhai": chapter02Nanhai as StoryChapter,
  chapter03: chapter03 as StoryChapter,
};

export function getChapter(id: string): StoryChapter | undefined {
  return chapterRegistry[id];
}

export function resolveNextStoryBeat(
  chapter: StoryChapter,
  beat: StoryBeat,
): { beat: StoryBeat; index: number } | undefined {
  const currentIndex = chapter.beats.findIndex((item) => item.id === beat.id);
  if (currentIndex < 0 || beat.terminal) return undefined;
  const index = beat.next
    ? chapter.beats.findIndex((item) => item.id === beat.next)
    : currentIndex + 1;
  return index >= 0 && index < chapter.beats.length
    ? { beat: chapter.beats[index], index }
    : undefined;
}

export function resolveChoiceStoryTarget(
  choice: StoryChoice | undefined,
  currentChapterId: string,
): { chapterId: string; chapter: StoryChapter; beat: StoryBeat; index: number } | undefined {
  if (!choice?.goto) return undefined;
  const chapterId = choice.chapter ?? currentChapterId;
  const chapter = getChapter(chapterId);
  const index = chapter?.beats.findIndex((beat) => beat.id === choice.goto) ?? -1;
  return chapter && index >= 0
    ? { chapterId, chapter, beat: chapter.beats[index], index }
    : undefined;
}

export function getFirstChapterId(): string {
  return "chapter01";
}

export function listChapters(): StoryChapter[] {
  return Object.values(chapterRegistry);
}
