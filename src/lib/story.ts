import type { StoryChapter } from "@/types/game";
import chapter01 from "@/story/chapter01.json";
import chapter02Guangzhou from "@/story/chapter02-guangzhou.json";
import chapter02Nanhai from "@/story/chapter02-nanhai.json";

const chapters: Record<string, StoryChapter> = {
  chapter01: chapter01 as StoryChapter,
  "chapter02-guangzhou": chapter02Guangzhou as StoryChapter,
  "chapter02-nanhai": chapter02Nanhai as StoryChapter,
};

export function getChapter(id: string): StoryChapter | undefined {
  return chapters[id];
}

export function getFirstChapterId(): string {
  return "chapter01";
}

export function listChapters(): StoryChapter[] {
  return Object.values(chapters);
}
