import { createEmptyCompilationState, grantFragments } from "./compilation";
import { getFragments } from "./fragments";
import { getChapter } from "./story";
import type { CompilationEntry, CompilationState, FragmentHistoryEntry, GameVariables, PlayerNote, SaveData, SourceFragment } from "../types/game";
import { DEFAULT_VARIABLES } from "../types/game";

export const CURRENT_SAVE_SCHEMA_VERSION = 1;

export interface SaveEnvelope {
  schemaVersion: number;
  data: unknown;
}

export type DecodeSaveResult =
  | { status: "ok"; data: SaveData; migrated: boolean }
  | { status: "corrupt"; reason: string }
  | { status: "future-version"; version: number };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringArray(value: unknown, fallback: string[] = []): string[] {
  if (value === undefined) return fallback;
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) throw new Error("存档中的列表字段损坏");
  return Array.from(new Set(value));
}

function notes(value: unknown): PlayerNote[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some((item) => !isRecord(item) || typeof item.id !== "string" || typeof item.type !== "string")) {
    throw new Error("存档中的手记字段损坏");
  }
  return value as PlayerNote[];
}

function variables(value: unknown): GameVariables {
  if (value === undefined) return { ...DEFAULT_VARIABLES };
  if (!isRecord(value)) throw new Error("存档中的变量字段损坏");
  const result = { ...DEFAULT_VARIABLES };
  for (const name of Object.keys(result) as (keyof GameVariables)[]) {
    const current = value[name];
    if (current === undefined) continue;
    if (typeof current !== "number" || !Number.isFinite(current)) throw new Error(`存档变量无效：${name}`);
    result[name] = current;
  }
  return result;
}

const dispositions = new Set(["unfiled", "recorded", "doubtful", "sold", "destroyed", "transferred"]);
const sections = new Set(["main", "appendix", "doubtful"]);
const sourceClarities = new Set(["unknown", "unclear", "identified"]);
const reliabilities = new Set(["low", "medium", "high"]);
const historyActions = new Set([...dispositions, "focus", "unfocus"]);

function compilationState(value: unknown): CompilationState {
  if (value === undefined) return createEmptyCompilationState();
  if (!isRecord(value)) throw new Error("存档中的长编字段损坏");
  const rawFragments = value.fragments ?? {};
  const rawEntries = value.entries ?? {};
  const rawHistory = value.history ?? [];
  const focusLimit = value.focusLimit ?? 2;
  if (!isRecord(rawFragments) || !isRecord(rawEntries) || !Array.isArray(rawHistory)) {
    throw new Error("存档中的长编嵌套字段损坏");
  }
  if (typeof focusLimit !== "number" || !Number.isInteger(focusLimit) || focusLimit < 1) {
    throw new Error("存档中的朱记上限无效");
  }

  const fragments: Record<string, SourceFragment> = {};
  for (const [id, fragment] of Object.entries(rawFragments)) {
    if (!isRecord(fragment) || fragment.id !== id) throw new Error(`存档中的史料条目无效：${id}`);
    fragments[id] = fragment as unknown as SourceFragment;
  }

  const entries: Record<string, CompilationEntry> = {};
  for (const [id, entry] of Object.entries(rawEntries)) {
    if (!isRecord(entry) || entry.fragmentId !== id) throw new Error(`存档中的长编条目无效：${id}`);
    if (typeof entry.disposition !== "string" || !dispositions.has(entry.disposition)) throw new Error(`存档中的史料处置无效：${id}`);
    if (entry.section !== undefined && (typeof entry.section !== "string" || !sections.has(entry.section))) throw new Error(`存档中的长编分卷无效：${id}`);
    if ((entry.disposition === "recorded" || entry.disposition === "doubtful") && entry.section === undefined) throw new Error(`存档中的已著录史料缺少分卷：${id}`);
    if (typeof entry.interpretation !== "string" || typeof entry.missingEvidence !== "string") throw new Error(`存档中的史料说明无效：${id}`);
    if (typeof entry.sourceClarity !== "string" || !sourceClarities.has(entry.sourceClarity)) throw new Error(`存档中的来源清晰度无效：${id}`);
    if (typeof entry.reliability !== "string" || !reliabilities.has(entry.reliability)) throw new Error(`存档中的可靠度无效：${id}`);
    if (typeof entry.focused !== "boolean" || typeof entry.updatedAt !== "number" || !Number.isFinite(entry.updatedAt)) throw new Error(`存档中的朱记状态无效：${id}`);
    if (["sold", "destroyed", "transferred"].includes(entry.disposition) && entry.focused) throw new Error(`已离手史料不能保留朱记：${id}`);
    entries[id] = entry as unknown as CompilationEntry;
  }

  const history: FragmentHistoryEntry[] = rawHistory.map((item, index) => {
    if (!isRecord(item) || typeof item.fragmentId !== "string" || typeof item.action !== "string" || !historyActions.has(item.action) || typeof item.at !== "number" || !Number.isFinite(item.at)) {
      throw new Error(`存档中的长编历史无效：${index}`);
    }
    return item as unknown as FragmentHistoryEntry;
  });
  if (Object.values(entries).filter((entry) => entry.focused).length > focusLimit) throw new Error("存档中的朱记数量超过上限");
  return { fragments, entries, history, focusLimit };
}

export function normalizeSaveData(value: unknown): SaveData {
  if (!isRecord(value)) throw new Error("存档主体不是有效对象");
  if (typeof value.chapterId !== "string") throw new Error("存档缺少章节位置");
  if (typeof value.beatIndex !== "number" || !Number.isInteger(value.beatIndex) || value.beatIndex < 0) throw new Error("存档节点位置无效");
  const chapter = getChapter(value.chapterId);
  if (!chapter) throw new Error(`存档引用未知章节：${value.chapterId}`);
  if (value.beatIndex >= chapter.beats.length) throw new Error(`存档节点超出章节范围：${value.beatIndex}`);

  const unlockedArchive = stringArray(value.unlockedArchive);
  const savedCompilation = compilationState(value.compilation);
  const knownFragmentIds = Array.from(new Set([
    ...Object.keys(savedCompilation.fragments),
    ...unlockedArchive,
  ]));
  const compilation = grantFragments(savedCompilation, getFragments(knownFragmentIds));
  return {
    chapterId: value.chapterId,
    beatIndex: value.beatIndex,
    variables: variables(value.variables),
    unlockedArchive,
    unlockedCharacters: stringArray(value.unlockedCharacters),
    completedActivities: stringArray(value.completedActivities),
    clues: stringArray(value.clues),
    playerNotes: notes(value.playerNotes),
    unlockedLocations: stringArray(value.unlockedLocations, ["guangzhou"]),
    investigatedLocations: stringArray(value.investigatedLocations),
    unlockedEntrances: stringArray(value.unlockedEntrances),
    compilation,
    savedAt: typeof value.savedAt === "number" && Number.isFinite(value.savedAt) ? value.savedAt : Date.now(),
  };
}

export function decodeSave(raw: string): DecodeSaveResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { status: "corrupt", reason: "书签不是有效的 JSON 数据" };
  }

  try {
    let version = 0;
    let data = parsed;
    if (isRecord(parsed) && "schemaVersion" in parsed) {
      if (typeof parsed.schemaVersion !== "number" || !Number.isInteger(parsed.schemaVersion) || parsed.schemaVersion < 0) {
        return { status: "corrupt", reason: "书签版本号无效" };
      }
      version = parsed.schemaVersion;
      data = parsed.data;
    }
    if (version > CURRENT_SAVE_SCHEMA_VERSION) return { status: "future-version", version };

    let migrated = version !== CURRENT_SAVE_SCHEMA_VERSION;
    while (version < CURRENT_SAVE_SCHEMA_VERSION) {
      if (version === 0) {
        data = normalizeSaveData(data);
        version = 1;
      } else {
        return { status: "corrupt", reason: `没有从版本 ${version} 开始的迁移路径` };
      }
    }
    const normalized = normalizeSaveData(data);
    if (JSON.stringify(normalized) !== JSON.stringify(data)) migrated = true;
    return { status: "ok", data: normalized, migrated };
  } catch (error) {
    return { status: "corrupt", reason: error instanceof Error ? error.message : "书签结构损坏" };
  }
}

export function encodeSave(data: SaveData): string {
  const envelope: SaveEnvelope = { schemaVersion: CURRENT_SAVE_SCHEMA_VERSION, data };
  return JSON.stringify(envelope);
}
