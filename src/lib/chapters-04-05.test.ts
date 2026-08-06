import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";
import type { MapLocation, StoryChapter } from "../types/game";
import archiveJson from "../story/archive.json";
import fragmentsJson from "../story/fragments.json";
import locationsJson from "../story/locations.json";
import { chapterRegistry } from "./story";

const packageDirectory = fileURLToPath(new URL("../../佣书-第四第五章扩写包/", import.meta.url));
const packageChapter04 = JSON.parse(readFileSync(`${packageDirectory}chapter04.json`, "utf8")) as StoryChapter;
const packageChapter05 = JSON.parse(readFileSync(`${packageDirectory}chapter05.json`, "utf8")) as StoryChapter;
const locations = (locationsJson as { locations: MapLocation[] }).locations;

const NEW_FRAGMENT_IDS = [
  "zhaoqing-common-ledger",
  "feng-boat-private-ledger",
  "ch04-ledger-extract",
  "zhaoqing-packet-edge-rubbing",
  "chaozhou-receipt-ledger",
  "chaozhou-receipt-ledger-summary",
  "chaozhou-parallel-leaf",
  "chaozhou-six-leaf-receipt",
  "chaozhou-six-leaf-receipt-copy",
  "mei-compilation-draft",
  "local-leaf-seven",
  "xu-family-oral-account",
  "chen-akui-eyewitness-account",
  "xu-family-access-letter",
  "burial-register-loan-note",
] as const;

const NEW_ARCHIVE_IDS = [
  "chapter04-twenty-seven-leaves",
  "chapter05-chaozhou-route",
  "chapter05-compilation-origin",
  "chapter05-leaf-seven",
  "chapter05-access-and-names",
] as const;

const CUSTOM_ACTIVITY_TYPES = [
  "edge_match",
  "transcription",
  "packing",
  "alignment",
  "exploration",
  "interview_plan",
  "deduction",
  "state_summary",
  "search",
  "spatial_reconstruction",
  "facsimile_layout",
  "interview",
  "association",
  "access_protocol",
  "access_log",
  "redaction",
  "chronicle_draft",
  "versioning",
] as const;

test("the runtime registers the supplied fourth and fifth chapters at full size", () => {
  assert.equal(chapterRegistry.chapter04?.beats.length, 109);
  assert.equal(chapterRegistry.chapter05?.beats.length, 185);
  assert.ok(chapterRegistry.chapter04);
  assert.ok(chapterRegistry.chapter05);
});

test("the supplied chapter package contributes every new fragment and archive", () => {
  const fragmentIds = new Set((fragmentsJson as { id: string }[]).map((fragment) => fragment.id));
  const archiveIds = new Set((archiveJson as { id: string }[]).map((archive) => archive.id));
  for (const id of NEW_FRAGMENT_IDS) assert.ok(fragmentIds.has(id), `missing fragment ${id}`);
  for (const id of NEW_ARCHIVE_IDS) assert.ok(archiveIds.has(id), `missing archive ${id}`);
});

test("the package's updated map records are present", () => {
  const byId = new Map(locations.map((location) => [location.id, location]));
  assert.match(byId.get("guangzhou")?.investigatedRecord ?? "", /梅花门/);
  assert.match(byId.get("zhaoqing")?.investigatedRecord ?? "", /同柜一夜/);
  assert.match(byId.get("chaozhou")?.investigatedRecord ?? "", /六叶与七叶/);
});

test("every supplied custom activity has a matching data payload", () => {
  const chapters = [packageChapter04, packageChapter05];
  for (const type of CUSTOM_ACTIVITY_TYPES) {
    const beats = chapters.flatMap((chapter) => chapter.beats.filter((beat) => beat.type === type));
    assert.ok(beats.length > 0, `package does not exercise ${type}`);
    for (const beat of beats) {
      assert.ok((beat as unknown as Record<string, unknown>)[type], `${beat.id} is missing ${type} payload`);
    }
  }
});

test("package beats preserve top-level fragment actions and choice location updates", () => {
  const chapter04 = packageChapter04.beats.find((beat) => beat.id === "ch04-hide") as StoryChapter["beats"][number] & { fragmentAction?: unknown };
  const routeChoice = packageChapter04.beats.find((beat) => beat.id === "ch04-route-choice")?.choices?.find((choice) => choice.id === "to-chaozhou") as { locationUpdates?: unknown } | undefined;
  assert.deepEqual(chapter04.fragmentAction, { fragmentId: "zhaoqing-common-ledger", disposition: "retained-illicit" });
  assert.deepEqual(routeChoice?.locationUpdates, {
    unlock: ["chaozhou"],
    investigate: ["zhaoqing"],
    unlockEntrances: ["chaozhou-merchant-ledger"],
  });
});

test("supplied fourth and fifth chapter beat IDs are unique", () => {
  for (const chapter of [packageChapter04, packageChapter05]) {
    const ids = chapter.beats.map((beat) => beat.id);
    assert.equal(new Set(ids).size, ids.length, `${chapter.id} has duplicate beat IDs`);
  }
});
