import type { StoryChapter } from "@/types/game";
import chapter01 from "@/story/chapter01.json";

const chapters: Record<string, StoryChapter> = {
  chapter01: chapter01 as StoryChapter,
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
