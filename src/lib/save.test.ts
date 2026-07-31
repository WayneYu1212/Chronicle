import assert from "node:assert/strict";
import test from "node:test";
import { createInitialSave, writeSave } from "./save";
import { CURRENT_SAVE_SCHEMA_VERSION, decodeSave, encodeSave } from "./save-migrations";
import { SAVE_KEY } from "../types/game";
import { getChapter, resolveChoiceStoryTarget, resolveNextStoryBeat } from "./story";
import { mergeRouteEntrances } from "./route-entrances";

test("new saves round-trip through the current envelope", () => {
  const initial = createInitialSave("chapter01");
  const decoded = decodeSave(encodeSave(initial));
  assert.equal(decoded.status, "ok");
  if (decoded.status === "ok") {
    assert.equal(decoded.migrated, false);
    assert.deepEqual(decoded.data, initial);
  }
});

test("legacy unversioned saves migrate missing fields and unlocked fragments", () => {
  const legacy = {
    chapterId: "chapter01",
    beatIndex: 1,
    variables: { wage: 12, risk: 2 },
    unlockedArchive: ["folio-13"],
    clues: ["旧线索"],
  };
  const decoded = decodeSave(JSON.stringify(legacy));
  assert.equal(decoded.status, "ok");
  if (decoded.status === "ok") {
    assert.equal(decoded.migrated, true);
    assert.equal(decoded.data.variables.wage, 12);
    assert.equal(decoded.data.variables.paper, 0);
    assert.ok(decoded.data.compilation.fragments["folio-13"]);
    assert.deepEqual(decoded.data.clues, ["旧线索"]);
  }
});

test("migration preserves permanent fragment disposition and judgement", () => {
  const legacy = createInitialSave("chapter01");
  legacy.compilation = {
    fragments: {},
    entries: {
      "folio-13": {
        fragmentId: "folio-13",
        disposition: "sold",
        interpretation: "已经出售，只留摘要。",
        sourceClarity: "unclear",
        reliability: "medium",
        missingEvidence: "原件离手",
        focused: false,
        updatedAt: 1,
      },
    },
    history: [{ fragmentId: "folio-13", action: "sold", at: 1 }],
    focusLimit: 2,
  };
  legacy.unlockedArchive = ["folio-13"];
  const decoded = decodeSave(JSON.stringify(legacy));
  assert.equal(decoded.status, "ok");
  if (decoded.status === "ok") {
    assert.equal(decoded.data.compilation.entries["folio-13"].disposition, "sold");
    assert.equal(decoded.data.compilation.entries["folio-13"].interpretation, "已经出售，只留摘要。");
  }
});

test("loading an older save refreshes fragment metadata without changing its judgement", () => {
  const olderSave = createInitialSave("chapter02-guangzhou");
  olderSave.unlockedArchive = [];
  olderSave.compilation = {
    fragments: {
      "gazetteer-secret-copy": {
        id: "gazetteer-secret-copy",
        title: "县署书吏私抄旧志条",
        content: "旧存档内容",
        fragmentary: false,
        sourcePerson: "县署书吏",
        foundAt: "听雨书坊后院",
        estimatedDate: "康熙六年",
        medium: "私下誊写的地方志旧条",
        paper: "薄竹纸",
        ink: "急写浓墨",
        handwriting: "行楷",
        marks: [],
        value: 0,
        politicalRisk: 5,
        relatedPeople: [],
        relatedEvents: [],
        transmission: "copy",
      },
    },
    entries: {
      "gazetteer-secret-copy": {
        fragmentId: "gazetteer-secret-copy",
        disposition: "doubtful",
        section: "doubtful",
        interpretation: "保留旧判断",
        sourceClarity: "identified",
        reliability: "medium",
        missingEvidence: "仍缺母本",
        focused: true,
        updatedAt: 1,
      },
    },
    history: [{ fragmentId: "gazetteer-secret-copy", action: "doubtful", at: 1 }],
    focusLimit: 2,
  };

  const decoded = decodeSave(encodeSave(olderSave));
  assert.equal(decoded.status, "ok");
  if (decoded.status === "ok") {
    assert.equal(decoded.migrated, true);
    assert.equal(decoded.data.compilation.fragments["gazetteer-secret-copy"].estimatedDate, "康熙九年");
    assert.equal(decoded.data.compilation.entries["gazetteer-secret-copy"].disposition, "doubtful");
    assert.equal(decoded.data.compilation.entries["gazetteer-secret-copy"].section, "doubtful");
    assert.equal(decoded.data.compilation.entries["gazetteer-secret-copy"].interpretation, "保留旧判断");
    assert.equal(decoded.data.compilation.entries["gazetteer-secret-copy"].sourceClarity, "identified");
    assert.equal(decoded.data.compilation.entries["gazetteer-secret-copy"].reliability, "medium");
    assert.equal(decoded.data.compilation.entries["gazetteer-secret-copy"].missingEvidence, "仍缺母本");
    assert.equal(decoded.data.compilation.entries["gazetteer-secret-copy"].focused, true);
    assert.deepEqual(decoded.data.compilation.history, [
      { fragmentId: "gazetteer-secret-copy", action: "doubtful", at: 1 },
    ]);
  }
});

test("corrupt, structurally invalid, and future saves fail without fallback", () => {
  assert.equal(decodeSave("not-json").status, "corrupt");
  assert.equal(decodeSave("null").status, "corrupt");
  assert.equal(decodeSave(JSON.stringify({ chapterId: "missing", beatIndex: 0 })).status, "corrupt");
  assert.equal(decodeSave(JSON.stringify({ chapterId: "chapter01", beatIndex: -1 })).status, "corrupt");
  const future = decodeSave(JSON.stringify({ schemaVersion: CURRENT_SAVE_SCHEMA_VERSION + 1, data: {} }));
  assert.deepEqual(future, { status: "future-version", version: CURRENT_SAVE_SCHEMA_VERSION + 1 });
});

test("malformed nested compilation fields are rejected safely", () => {
  for (const mutate of [
    (data: Record<string, unknown>) => { (data.compilation as Record<string, unknown>).history = {}; },
    (data: Record<string, unknown>) => { (data.compilation as Record<string, unknown>).focusLimit = "two"; },
    (data: Record<string, unknown>) => {
      (data.compilation as Record<string, unknown>).entries = { bad: { fragmentId: "bad", disposition: "invented" } };
    },
  ]) {
    const data = structuredClone(createInitialSave("chapter01")) as unknown as Record<string, unknown>;
    mutate(data);
    assert.equal(decodeSave(JSON.stringify({ schemaVersion: CURRENT_SAVE_SCHEMA_VERSION, data })).status, "corrupt");
  }
});

test("route entrances survive save round-trip and legacy saves default to none", () => {
  const initial = createInitialSave("chapter01");
  initial.unlockedEntrances = ["guangzhou-gazetteer-office"];
  const current = decodeSave(encodeSave(initial));
  assert.equal(current.status, "ok");
  if (current.status === "ok") assert.deepEqual(current.data.unlockedEntrances, ["guangzhou-gazetteer-office"]);

  const legacy = { ...createInitialSave("chapter01") } as Partial<ReturnType<typeof createInitialSave>>;
  delete legacy.unlockedEntrances;
  const migrated = decodeSave(JSON.stringify(legacy));
  assert.equal(migrated.status, "ok");
  if (migrated.status === "ok") assert.deepEqual(migrated.data.unlockedEntrances, []);
});

test("legacy bookmarks on all eight Chapter Two endings keep their beat index and can continue without an entrance field", () => {
  const bookmarks = [
    ["chapter02-guangzhou", 45, "ch03-gz-destroyed-prelude", "guangzhou-gazetteer-office"],
    ["chapter02-guangzhou", 48, "ch03-py-preserved-prelude", "panyu-private-copy"],
    ["chapter02-guangzhou", 50, "ch03-gz-doubtful-prelude", "guangzhou-gazetteer-office"],
    ["chapter02-guangzhou", 52, "ch03-py-sold-prelude", "panyu-unknown-collector"],
    ["chapter02-guangzhou", 54, "ch03-gz-transferred-prelude", "guangzhou-gazetteer-office"],
    ["chapter02-nanhai", 50, "ch03-xq-recorded-prelude", "xiqiao-copyist"],
    ["chapter02-nanhai", 52, "ch03-zq-doubtful-prelude", "zhaoqing-half-seal"],
    ["chapter02-nanhai", 54, "ch03-xq-transferred-prelude", "xiqiao-copyist"],
  ] as const;

  for (const [chapterId, beatIndex, preludeId, entranceId] of bookmarks) {
    const legacy = createInitialSave(chapterId);
    legacy.beatIndex = beatIndex;
    const withoutEntrances = { ...legacy } as Partial<typeof legacy>;
    delete withoutEntrances.unlockedEntrances;
    const decoded = decodeSave(JSON.stringify(withoutEntrances));
    assert.equal(decoded.status, "ok");
    if (decoded.status === "ok") {
      assert.equal(decoded.data.chapterId, chapterId);
      assert.equal(decoded.data.beatIndex, beatIndex);
      assert.deepEqual(decoded.data.unlockedEntrances, []);
      const chapter = getChapter(chapterId);
      assert.ok(chapter);
      const continuation = resolveNextStoryBeat(chapter, chapter.beats[beatIndex]);
      assert.ok(continuation);
      const target = resolveChoiceStoryTarget(continuation.beat.choices?.[0], chapterId);
      assert.equal(target?.chapterId, "chapter03");
      assert.equal(target?.beat.id, preludeId);
      assert.deepEqual(
        mergeRouteEntrances(decoded.data.unlockedEntrances, target?.beat.locationUpdates?.unlockEntrances ?? []),
        [entranceId],
      );
    }
  }

  assert.equal(resolveChoiceStoryTarget(undefined, "chapter02-guangzhou"), undefined);
  assert.equal(resolveNextStoryBeat(getChapter("chapter02-guangzhou")!, { id: "unknown", text: "" }), undefined);
});

test("write failures return a player-facing result instead of throwing", () => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const originalStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  Object.defineProperty(globalThis, "window", { configurable: true, value: {} });
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: { setItem(key: string) { assert.equal(key, SAVE_KEY); throw new DOMException("full", "QuotaExceededError"); } },
  });
  try {
    const result = writeSave(createInitialSave("chapter01"));
    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.reason, "quota");
  } finally {
    if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow); else delete (globalThis as { window?: unknown }).window;
    if (originalStorage) Object.defineProperty(globalThis, "localStorage", originalStorage); else delete (globalThis as { localStorage?: unknown }).localStorage;
  }
});
