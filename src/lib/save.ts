import type { GameVariables, NoteUpdates, PlayerNote, SaveData } from "@/types/game";
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

export function applyNoteUpdates(
  notes: PlayerNote[],
  updates?: NoteUpdates,
  sourceBeatId?: string
): PlayerNote[] {
  if (!updates) return notes;

  const removed = new Set(updates.remove ?? []);
  const patches = new Map((updates.update ?? []).map((patch) => [patch.id, patch]));
  const next = notes
    .filter((note) => !removed.has(note.id))
    .map((note) => patches.has(note.id) ? { ...note, ...patches.get(note.id) } : note);

  for (const note of updates.add ?? []) {
    const value = { ...note, sourceBeatId: note.sourceBeatId ?? sourceBeatId };
    const index = next.findIndex((current) => current.id === value.id);
    if (index >= 0) next[index] = { ...next[index], ...value };
    else next.push(value);
  }

  return next;
}

export function createInitialPlayerNotes(): PlayerNote[] {
  return [];
}

export function createInitialSave(chapterId: string): SaveData {
  return {
    chapterId,
    beatIndex: 0,
    variables: { ...DEFAULT_VARIABLES },
    unlockedArchive: [],
    unlockedCharacters: [],
    completedActivities: [],
    clues: [],
    playerNotes: createInitialPlayerNotes(),
    unlockedLocations: ["guangzhou"],
    investigatedLocations: [],
    savedAt: Date.now(),
  };
}
