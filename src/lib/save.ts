import type { GameVariables, SaveData } from "@/types/game";
import { DEFAULT_VARIABLES, SAVE_KEY } from "@/types/game";

export function loadSave(): SaveData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SaveData;
  } catch {
    return null;
  }
}

export function writeSave(data: SaveData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

export function clearSave(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SAVE_KEY);
}

export function hasSave(): boolean {
  return loadSave() !== null;
}

export function applyEffects(
  variables: GameVariables,
  effects?: Partial<GameVariables>
): GameVariables {
  if (!effects) return variables;
  const next = { ...variables };
  for (const key of Object.keys(effects) as (keyof GameVariables)[]) {
    const delta = effects[key];
    if (typeof delta === "number") {
      next[key] = (next[key] ?? 0) + delta;
    }
  }
  return next;
}

export function createInitialSave(chapterId: string): SaveData {
  return {
    chapterId,
    beatIndex: 0,
    variables: { ...DEFAULT_VARIABLES },
    unlockedArchive: [],
    unlockedCharacters: [],
    savedAt: Date.now(),
  };
}
