export interface TutorialStep {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

export const TUTORIAL_STORAGE_KEY = "chronicle-tutorial-v1";
const TUTORIAL_STORAGE_VALUE = "done";

export const TUTORIAL_STEPS = [
  { id: "reading", title: "先看正文，再做选择", body: "人物名在左，“旁白”记录你的所见。" },
  { id: "notes", title: "手札：记下所见所疑", body: "手札记录观察、疑问和线索。" },
  { id: "compilation", title: "长编：整理史料判断", body: "长编整理材料，填写来源和判断。" },
  { id: "navigation", title: "点页翻读，底栏导航", body: "点正文翻页；底栏可打开其他页面。" },
] as const satisfies readonly TutorialStep[];

export function hasCompletedTutorial(value: string | null): boolean {
  return value === TUTORIAL_STORAGE_VALUE;
}

export function markTutorialComplete(storage: Pick<Storage, "setItem">): void {
  try {
    storage.setItem(TUTORIAL_STORAGE_KEY, TUTORIAL_STORAGE_VALUE);
  } catch {
    return;
  }
}

function getTutorialStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readTutorialCompletion(): boolean {
  const storage = getTutorialStorage();
  if (!storage) return false;
  try {
    return hasCompletedTutorial(storage.getItem(TUTORIAL_STORAGE_KEY));
  } catch {
    return false;
  }
}

export function saveTutorialCompletion(): void {
  const storage = getTutorialStorage();
  if (storage) markTutorialComplete(storage);
}

export function shouldAutoOpenTutorial(pageReady: boolean, completed: boolean): boolean {
  return pageReady && !completed;
}
