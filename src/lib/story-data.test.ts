import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import test from "node:test";
import { basename } from "node:path";
import { fileURLToPath } from "node:url";
import type { MapLocation, SourceFragment, StoryChapter } from "../types/game";
import fragmentsJson from "../story/fragments.json";
import archiveJson from "../story/archive.json";
import locationsJson from "../story/locations.json";
import chapter02Guangzhou from "../story/chapter02-guangzhou.json";
import chapter02Nanhai from "../story/chapter02-nanhai.json";
import chapter01 from "../story/chapter01.json";
import { chapterRegistry, getFirstChapterId } from "./story";
import { validateStoryData } from "./story-validation";
import { routeEntranceIds } from "./route-entrances";

const fragments = fragmentsJson as SourceFragment[];
const locations = (locationsJson as { locations: MapLocation[] }).locations;
const chapter02Prefixes = {
  "chapter02-guangzhou": ["guangzhou-title","guangzhou-map","guangzhou-morning","guangzhou-work","guangzhou-response","guangzhou-clerk-arrival","guangzhou-clerk","guangzhou-terms","guangzhou-copy-start","guangzhou-discovery","guangzhou-grant","guangzhou-inspection","guangzhou-comparison","guangzhou-meaning","guangzhou-xiaoman","guangzhou-player","guangzhou-first-compilation","guangzhou-record-main","guangzhou-record-appendix","guangzhou-record-doubtful","guangzhou-clerk-return","guangzhou-demand","guangzhou-pressure","guangzhou-ledger-01","guangzhou-ledger-02","guangzhou-ledger-03","guangzhou-neighbor","guangzhou-printing","guangzhou-wage","guangzhou-clerk-motive","guangzhou-clerk-question","guangzhou-clerk-overreach","guangzhou-clerk-careful","guangzhou-before-stranger","guangzhou-copy-ethics-01","guangzhou-copy-ethics-02","guangzhou-copy-ethics-03","guangzhou-copy-ethics-04","guangzhou-copy-ethics-05","guangzhou-stranger","guangzhou-options","guangzhou-secret-copy","guangzhou-critical-compilation","guangzhou-obey-result","guangzhou-obey-reflection","guangzhou-obey-ending","guangzhou-preserve-result","guangzhou-preserve-reaction","guangzhou-preserve-ending","guangzhou-refuse-result","guangzhou-refuse-ending","guangzhou-sell-result","guangzhou-sell-ending","guangzhou-transfer-result","guangzhou-transfer-ending"],
  "chapter02-nanhai": ["nanhai-title","nanhai-map","nanhai-departure","nanhai-river-01","nanhai-boss-01","nanhai-boss-02","nanhai-boss-03","nanhai-arrival","nanhai-house","nanhai-zhou","nanhai-owner-response","nanhai-silence","nanhai-box-open","nanhai-box","nanhai-inspection","nanhai-after-inspection","nanhai-first-compilation","nanhai-record-main","nanhai-record-appendix","nanhai-record-doubtful","nanhai-letter-open","nanhai-letter-question","nanhai-letter-wrong","nanhai-letter-wrong-author","nanhai-letter-right","nanhai-letter-grant","nanhai-noon","nanhai-yard-01","nanhai-yard-02","nanhai-yard-03","nanhai-woman","nanhai-woman-note","nanhai-tenant","nanhai-tenant-choice","nanhai-tenant-overreach","nanhai-tenant-careful","nanhai-tenant-after","nanhai-evening","nanhai-label-01","nanhai-label-02","nanhai-label-03","nanhai-label-04","nanhai-label-05","nanhai-copyist-clue","nanhai-return-choice","nanhai-keep-access","nanhai-return-owner","nanhai-leave-doubt","nanhai-final-compilation","nanhai-preserve-result","nanhai-preserve-ending","nanhai-parallel-result","nanhai-parallel-ending","nanhai-return-result","nanhai-return-ending"],
} as const;

test("runtime registry contains every chapter JSON file", () => {
  const storyDirectory = fileURLToPath(new URL("../story", import.meta.url));
  const files = readdirSync(storyDirectory)
    .filter((name) => /^chapter.*\.json$/.test(name))
    .map((name) => basename(name, ".json"))
    .sort();
  const registered = Object.keys(chapterRegistry).sort();
  assert.deepEqual(registered, files);
});

test("full story graph, cross-chapter targets, locations, and fragments validate", () => {
  const issues = validateStoryData(chapterRegistry, fragments, archiveJson, locations, routeEntranceIds, getFirstChapterId());
  assert.deepEqual(issues, []);
});

test("validator rejects chapters and contemporary fragments outside the approved timeline", () => {
  const wrongChapter = structuredClone(chapterRegistry) as Record<string, StoryChapter>;
  wrongChapter["chapter02-guangzhou"].date = "康熙六年 · 九月廿四";
  const chapterIssues = validateStoryData(wrongChapter, fragments, archiveJson, locations, routeEntranceIds, getFirstChapterId());
  assert.ok(chapterIssues.some((issue) => issue.message.includes("康熙九年")));

  const wrongFragments = fragments.map((fragment) =>
    fragment.id === "gazetteer-secret-copy" ? { ...fragment, estimatedDate: "康熙六年" } : fragment
  );
  const fragmentIssues = validateStoryData(chapterRegistry, wrongFragments, archiveJson, locations, routeEntranceIds, getFirstChapterId());
  assert.ok(fragmentIssues.some((issue) => issue.location === "gazetteer-secret-copy" && issue.message.includes("康熙九年")));
});

test("the translated folio uses the reviewed short translation and every fragment has editable draft prompts", () => {
  const folio = fragments.find((fragment) => fragment.id === "folio-13");
  assert.equal(folio?.content, "第二天……下午前往城墙那边，……聆听告解一直到五点多钟，……“神父，士兵们已经放弃城墙逃跑了！”");
  for (const fragment of fragments) {
    assert.ok(fragment.suggestedInterpretation?.trim(), `${fragment.id} needs an interpretation draft`);
    assert.ok(fragment.suggestedMissingEvidence?.trim(), `${fragment.id} needs a missing-evidence draft`);
  }
});

test("validator rejects fragments with an incomplete prepared draft", () => {
  const incomplete = fragments.map((fragment, index) => index === 0
    ? { ...fragment, suggestedInterpretation: "" }
    : fragment);
  const issues = validateStoryData(chapterRegistry, incomplete, archiveJson, locations, routeEntranceIds, getFirstChapterId());
  assert.ok(issues.some((issue) => issue.code === "fragment-suggestion" && issue.location === "folio-13"));
});

test("validator reports unreachable nodes and unknown cross-chapter targets", () => {
  const broken: Record<string, StoryChapter> = {
    chapter01: {
      id: "chapter01",
      title: "broken",
      beats: [
        { id: "start", type: "choice", text: "", choices: [{ id: "bad", text: "", chapter: "missing", goto: "nowhere" }] },
        { id: "orphan", text: "", terminal: true },
      ],
    },
  };
  const issues = validateStoryData(broken, [], [], [], [], "chapter01");
  assert.ok(issues.some((issue) => issue.code === "unknown-chapter"));
  assert.ok(issues.some((issue) => issue.code === "unreachable" && issue.location === "chapter01:orphan"));
});

test("both Chapter Two routes contain at least five thousand narrative characters", () => {
  for (const chapter of [chapter02Guangzhou, chapter02Nanhai]) {
    const length = chapter.beats.reduce((sum, beat) => sum + beat.text.length, 0);
    assert.ok(length >= 5000, `${chapter.id} only contains ${length} narrative characters`);
  }
});

test("Chapter One conclusions remain playable before entering either Chapter Two route", () => {
  const chapter = chapter01 as StoryChapter;
  const finalChoice = chapter.beats.find((beat) => beat.id === "final-choice");
  assert.equal(finalChoice?.type, "choice");
  assert.deepEqual(finalChoice?.choices?.map((choice) => choice.goto), ["ending-accept", "ending-night"]);

  const acceptTransition = chapter.beats.find((beat) => beat.id === "ending-to-nanhai");
  const stayTransition = chapter.beats.find((beat) => beat.id === "ending-to-guangzhou");
  assert.equal(acceptTransition?.choices?.[0]?.chapter, "chapter02-nanhai");
  assert.equal(stayTransition?.choices?.[0]?.chapter, "chapter02-guangzhou");
});

test("all Chapter Two result routes persist an existing third-chapter entrance", () => {
  const expected: Record<string, string[]> = {
    "chapter02-guangzhou": ["guangzhou-gazetteer-office", "panyu-private-copy", "guangzhou-gazetteer-office", "panyu-unknown-collector", "guangzhou-gazetteer-office"],
    "chapter02-nanhai": ["xiqiao-copyist", "zhaoqing-half-seal", "xiqiao-copyist"],
  };

  for (const chapter of [chapter02Guangzhou, chapter02Nanhai] as StoryChapter[]) {
    const resultBeats = chapter.beats.filter(
      (beat) => beat.id.endsWith("-result") && beat.locationUpdates?.unlockEntrances,
    );
    assert.deepEqual(
      resultBeats.map((beat) => beat.locationUpdates?.unlockEntrances?.[0]),
      expected[chapter.id],
    );
    for (const result of resultBeats) assert.ok(result.next, `${chapter.id}:${result.id} must lead to its ending page`);
  }
});

test("validator rejects unknown archive and route entrance references", () => {
  const broken: Record<string, StoryChapter> = {
    chapter01: { id: "chapter01", title: "broken", beats: [{ id: "start", text: "", unlockArchive: ["missing"], locationUpdates: { unlockEntrances: ["missing"] }, terminal: true }] },
  };
  const issues = validateStoryData(broken, [], [], [], routeEntranceIds, "chapter01");
  assert.ok(issues.some((issue) => issue.code === "unknown-archive"));
  assert.ok(issues.some((issue) => issue.code === "unknown-entrance"));
});

test("returning the Zhou interleaf permanently transfers the original", () => {
  const chapter = chapter02Nanhai as StoryChapter;
  const choiceBeat = chapter.beats.find((beat) => beat.id === "nanhai-return-choice");
  const returnChoice = choiceBeat?.choices?.find((choice) => choice.id === "return-owner");
  assert.deepEqual(returnChoice?.fragmentAction, {
    fragmentId: "zhou-interleaf",
    disposition: "transferred",
  });
});

test("Chapter Two keeps every legacy beat index and appends deterministic Chapter Three continuations", () => {
  const transitions = {
    "chapter02-guangzhou": {
      "guangzhou-obey-ending": ["guangzhou-obey-continue", "ch03-gz-destroyed-prelude", "guangzhou-gazetteer-office"],
      "guangzhou-preserve-ending": ["guangzhou-preserve-continue", "ch03-py-preserved-prelude", "panyu-private-copy"],
      "guangzhou-refuse-ending": ["guangzhou-refuse-continue", "ch03-gz-doubtful-prelude", "guangzhou-gazetteer-office"],
      "guangzhou-sell-ending": ["guangzhou-sell-continue", "ch03-py-sold-prelude", "panyu-unknown-collector"],
      "guangzhou-transfer-ending": ["guangzhou-transfer-continue", "ch03-gz-transferred-prelude", "guangzhou-gazetteer-office"],
    },
    "chapter02-nanhai": {
      "nanhai-preserve-ending": ["nanhai-preserve-continue", "ch03-xq-recorded-prelude", "xiqiao-copyist"],
      "nanhai-parallel-ending": ["nanhai-parallel-continue", "ch03-zq-doubtful-prelude", "zhaoqing-half-seal"],
      "nanhai-return-ending": ["nanhai-return-continue", "ch03-xq-transferred-prelude", "xiqiao-copyist"],
    },
  } as const;

  for (const chapter of [chapter02Guangzhou, chapter02Nanhai] as StoryChapter[]) {
    assert.deepEqual(chapter.beats.slice(0, 55).map((beat) => beat.id), [...chapter02Prefixes[chapter.id as keyof typeof chapter02Prefixes]]);
    const chapterTransitions = transitions[chapter.id as keyof typeof transitions];
    for (const [endingId, [continueId, preludeId, entranceId]] of Object.entries(chapterTransitions)) {
      const ending = chapter.beats.find((beat) => beat.id === endingId);
      assert.equal(ending?.terminal, undefined);
      assert.equal(ending?.next, continueId);
      const continuation = chapter.beats.find((beat) => beat.id === continueId);
      assert.equal(continuation?.choices?.length, 1);
      assert.equal(continuation?.choices?.[0]?.chapter, "chapter03");
      assert.equal(continuation?.choices?.[0]?.goto, preludeId);
      assert.ok(chapter.beats.findIndex((beat) => beat.id === continueId) >= 55);
      assert.deepEqual(chapterRegistry.chapter03?.beats.find((beat) => beat.id === preludeId)?.locationUpdates?.unlockEntrances, [entranceId]);
    }
  }
});

test("Chapter Three exposes five gateways, two labor routes, one convergence, and no resurrected originals", () => {
  const chapter = chapterRegistry.chapter03;
  assert.ok(chapter, "chapter03 must be registered");
  assert.equal(chapter.date, "康熙九年 · 九月下旬");

  const ids = new Set(chapter.beats.map((beat) => beat.id));
  for (const id of [
    "ch03-gateway-gazetteer",
    "ch03-gateway-panyu-private",
    "ch03-gateway-panyu-collector",
    "ch03-gateway-xiqiao",
    "ch03-gateway-zhaoqing-half-seal",
    "ch03-route-version-lineage",
    "ch03-route-transmission-lineage",
    "ch03-zhaoqing-convergence",
    "ch03-ending-zhaoqing",
  ]) assert.ok(ids.has(id), `chapter03 needs ${id}`);

  const terminals = chapter.beats.filter((beat) => beat.terminal);
  assert.deepEqual(terminals.map((beat) => beat.id), ["ch03-ending-zhaoqing"]);
  assert.ok(chapter.beats.reduce((sum, beat) => sum + beat.text.length, 0) >= 3000, "chapter03 narrative text is too thin");
  for (const beat of chapter.beats) {
    assert.ok(!(beat.grantFragments ?? []).includes("gazetteer-old-entry"), `${beat.id} resurrects the old gazetteer original`);
    assert.ok(!(beat.grantFragments ?? []).includes("zhou-interleaf"), `${beat.id} resurrects the Zhou interleaf`);
  }
});

test("each Chapter Two disposition produces distinct observable labor before a shared gateway", () => {
  const chapter = chapterRegistry.chapter03;
  const paths = {
    "ch03-gz-destroyed-prelude": ["ch03-gz-destroyed-work", "ch03-gateway-gazetteer"],
    "ch03-py-preserved-prelude": ["ch03-py-preserved-work", "ch03-gateway-panyu-private"],
    "ch03-gz-doubtful-prelude": ["ch03-gz-doubtful-work", "ch03-gateway-gazetteer"],
    "ch03-py-sold-prelude": ["ch03-py-sold-work", "ch03-gateway-panyu-collector"],
    "ch03-gz-transferred-prelude": ["ch03-gz-transferred-work", "ch03-gateway-gazetteer"],
    "ch03-xq-recorded-prelude": ["ch03-xq-recorded-work", "ch03-gateway-xiqiao"],
    "ch03-zq-doubtful-prelude": ["ch03-zq-doubtful-work", "ch03-gateway-zhaoqing-half-seal"],
    "ch03-xq-transferred-prelude": ["ch03-xq-transferred-work", "ch03-gateway-xiqiao"],
  } as const;

  for (const [preludeId, [workId, gatewayId]] of Object.entries(paths)) {
    const prelude = chapter.beats.find((beat) => beat.id === preludeId);
    const work = chapter.beats.find((beat) => beat.id === workId);
    assert.equal(prelude?.next, workId);
    assert.equal(work?.next, gatewayId);
    assert.ok((work?.text.length ?? 0) >= 180, `${workId} must show disposition-specific investigation`);
    assert.ok(work?.noteUpdates?.add?.length, `${workId} must leave an observable notebook finding`);
    assert.equal(work?.grantFragments, undefined, `${workId} must not restore an unavailable original`);
  }
});

test("Chapter Three playable paths keep an approximately 20/50/30 visible-text rhythm", () => {
  const chapter = chapterRegistry.chapter03;
  const byId = new Map(chapter.beats.map((beat) => [beat.id, beat]));
  const entries = [
    ["ch03-gz-destroyed-prelude", "ch03-gz-destroyed-work", "ch03-gateway-gazetteer", "version"],
    ["ch03-py-preserved-prelude", "ch03-py-preserved-work", "ch03-gateway-panyu-private", "version"],
    ["ch03-gz-doubtful-prelude", "ch03-gz-doubtful-work", "ch03-gateway-gazetteer", "version"],
    ["ch03-py-sold-prelude", "ch03-py-sold-work", "ch03-gateway-panyu-collector", "version"],
    ["ch03-gz-transferred-prelude", "ch03-gz-transferred-work", "ch03-gateway-gazetteer", "version"],
    ["ch03-xq-recorded-prelude", "ch03-xq-recorded-work", "ch03-gateway-xiqiao", "transmission"],
    ["ch03-zq-doubtful-prelude", "ch03-zq-doubtful-work", "ch03-gateway-zhaoqing-half-seal", "transmission"],
    ["ch03-xq-transferred-prelude", "ch03-xq-transferred-work", "ch03-gateway-xiqiao", "transmission"],
  ] as const;
  const middle = {
    version: ["ch03-route-version-lineage", "ch03-version-ledger-01", "ch03-version-ledger-02", "ch03-version-ledger-03", "ch03-version-ledger-04", "ch03-version-after", "ch03-version-choice", "ch03-version-departure", "ch03-zhaoqing-arrival", "ch03-zhaoqing-broker"],
    transmission: ["ch03-route-transmission-lineage", "ch03-transmission-ledger-01", "ch03-transmission-ledger-02", "ch03-transmission-ledger-03", "ch03-transmission-ledger-04", "ch03-transmission-after", "ch03-transmission-choice", "ch03-transmission-departure", "ch03-zhaoqing-arrival", "ch03-zhaoqing-broker"],
  } as const;
  const convergence = ["ch03-zhaoqing-convergence", "ch03-convergence-after-assembly", "ch03-convergence-owner", "ch03-convergence-comparison", "ch03-final-compilation", "ch03-convergence-recorded", "ch03-ending-zhaoqing"];
  const count = (ids: readonly string[]) => ids.reduce((sum, id) => sum + (byId.get(id)?.text.length ?? 0), 0);

  for (const [preludeId, workId, gatewayId, route] of entries) {
    const portions = [count([preludeId, workId, gatewayId]), count(middle[route]), count(convergence)];
    const total = portions.reduce((sum, value) => sum + value, 0);
    const ratios = portions.map((value) => value / total);
    assert.ok(ratios[0] >= 0.15 && ratios[0] <= 0.22, `${preludeId} entry rhythm drifted`);
    assert.ok(ratios[1] >= 0.48 && ratios[1] <= 0.58, `${preludeId} middle rhythm drifted`);
    assert.ok(ratios[2] >= 0.25 && ratios[2] <= 0.35, `${preludeId} convergence rhythm drifted`);
  }
});

test("Chapter Three registers its five new fragments and three archives", () => {
  for (const id of ["gazetteer-deletion-register", "panyu-early-copy", "collector-sale-docket", "xiqiao-copy-register", "zhaoqing-transfer-tally"]) {
    assert.ok(fragments.some((fragment) => fragment.id === id), `missing fragment ${id}`);
  }
  for (const id of ["chapter03-version-lineage", "chapter03-transmission-lineage", "chapter03-zhaoqing-convergence"]) {
    assert.ok(archiveJson.some((item) => item.id === id), `missing archive ${id}`);
  }
});
