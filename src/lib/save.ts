import type { GameVariables, NoteUpdates, PlayerNote, SaveData } from "@/types/game";
import { DEFAULT_VARIABLES, SAVE_KEY } from "@/types/game";
import { createEmptyCompilationState } from "@/lib/compilation";
import { decodeSave, encodeSave } from "@/lib/save-migrations";

export type LoadSaveResult =
  | { status: "missing" }
  | { status: "ok"; data: SaveData; migrated: boolean }
  | { status: "corrupt"; reason: string }
  | { status: "future-version"; version: number }
  | { status: "storage-error"; reason: string };

export type StorageResult = { ok: true } | { ok: false; reason: "quota" | "storage" | "serialize"; message: string };

export function loadSaveResult(): LoadSaveResult {
  if (typeof window === "undefined") return { status: "missing" };
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return { status: "missing" };
    return decodeSave(raw);
  } catch (error) {
    return { status: "storage-error", reason: error instanceof Error ? error.message : "浏览器拒绝读取本机书签" };
  }
}

export function loadSave(): SaveData | null {
  const result = loadSaveResult();
  return result.status === "ok" ? result.data : null;
}

export function getRawSave(): string | null {
  if (typeof window === "undefined") return null;
  try { return localStorage.getItem(SAVE_KEY); } catch { return null; }
}

export function writeSave(data: SaveData): StorageResult {
  if (typeof window === "undefined") return { ok: false, reason: "storage", message: "当前环境无法写入浏览器书签。" };
  let encoded: string;
  try {
    encoded = encodeSave(data);
  } catch {
    return { ok: false, reason: "serialize", message: "本次进度无法整理成书签，尚未保存。" };
  }
  try {
    localStorage.setItem(SAVE_KEY, encoded);
    return { ok: true };
  } catch (error) {
    const quota = error instanceof DOMException && (error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED");
    return quota
      ? { ok: false, reason: "quota", message: "本机存储空间不足，本次进度尚未保存。请先导出或清理浏览器数据。" }
      : { ok: false, reason: "storage", message: "浏览器拒绝写入书签，本次进度尚未保存。请检查隐私模式或站点权限。" };
  }
}

export function clearSave(): StorageResult {
  if (typeof window === "undefined") return { ok: false, reason: "storage", message: "当前环境无法清除书签。" };
  try {
    localStorage.removeItem(SAVE_KEY);
    return { ok: true };
  } catch {
    return { ok: false, reason: "storage", message: "浏览器拒绝清除书签。" };
  }
}

export function hasSave(): boolean {
  if (typeof window === "undefined") return false;
  try { return localStorage.getItem(SAVE_KEY) !== null; } catch { return false; }
}

export function applyEffects(variables: GameVariables, effects?: Partial<GameVariables>): GameVariables {
  if (!effects) return variables;
  const next = { ...variables };
  for (const key of Object.keys(effects) as (keyof GameVariables)[]) {
    const delta = effects[key];
    if (typeof delta === "number") next[key] = (next[key] ?? 0) + delta;
  }
  return next;
}

export function applyNoteUpdates(notes: PlayerNote[], updates?: NoteUpdates, sourceBeatId?: string): PlayerNote[] {
  if (!updates) return notes;
  const removed = new Set(updates.remove ?? []);
  const patches = new Map((updates.update ?? []).map((patch) => [patch.id, patch]));
  const next = notes.filter((note) => !removed.has(note.id)).map((note) => patches.has(note.id) ? { ...note, ...patches.get(note.id) } : note);
  for (const note of updates.add ?? []) {
    const value = { ...note, sourceBeatId: note.sourceBeatId ?? sourceBeatId };
    const index = next.findIndex((current) => current.id === value.id);
    if (index >= 0) next[index] = { ...next[index], ...value };
    else next.push(value);
  }
  return next;
}

export function createInitialPlayerNotes(): PlayerNote[] { return []; }

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
    unlockedEntrances: [],
    compilation: createEmptyCompilationState(),
    savedAt: Date.now(),
  };
}
