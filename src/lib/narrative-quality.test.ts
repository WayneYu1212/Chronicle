import assert from "node:assert/strict";
import test from "node:test";
import chapter01 from "../story/chapter01.json";
import chapter02Guangzhou from "../story/chapter02-guangzhou.json";
import chapter02Nanhai from "../story/chapter02-nanhai.json";
import type { AssemblyConfig, ComparisonConfig } from "../types/game";

test("chapter one uses the public name 沈掌柜 and fixed evidence conclusions", () => {
  assert.equal(chapter01.beats.some((beat) => beat.speaker === "老板"), false);

  const comparison = chapter01.beats.find((beat) => beat.id === "comparison-01");
  const comparisonConfig = comparison?.comparison as ComparisonConfig | undefined;
  assert.equal(comparisonConfig?.options?.length ?? 0, 0);
  assert.ok(comparisonConfig?.conclusion);

  const assembly = chapter01.beats.find((beat) => beat.id === "assembly-01");
  const assemblyConfig = assembly?.assembly as AssemblyConfig | undefined;
  assert.equal(assemblyConfig?.options?.length ?? 0, 0);
  assert.ok(assemblyConfig?.conclusion);
});

test("chapter one preserves evidence boundaries and the two character archives", () => {
  const inspection = chapter01.beats.find((beat) => beat.id === "inspect-01");
  assert.match(inspection?.inspection?.document.excerpt ?? "", /坟墓/);
  assert.doesNotMatch(inspection?.inspection?.hotspots.find((spot) => spot.id === "ink")?.detail ?? "", /不能当作现场写成/);
  assert.ok(inspection?.inspection?.verso?.includes("Relação"));

  const characterNotes = chapter01.beats.find((beat) => beat.id === "opening-05")?.noteUpdates?.add ?? [];
  assert.ok(characterNotes.some((note) => note.content.includes("沈子壮")));
  assert.ok(characterNotes.some((note) => note.content.includes("小满")));
});

test("chapter two removes route subtitles and keeps long scenes split", () => {
  assert.equal(chapter02Nanhai.beats.find((beat) => beat.id === "nanhai-title")?.text, "第二章 · 南海旧稿");
  assert.equal(chapter02Guangzhou.beats.find((beat) => beat.id === "guangzhou-title")?.text, "第二章 · 书坊旧稿");
  assert.equal(chapter02Nanhai.beats.filter((beat) => beat.id.startsWith("nanhai-departure")).length, 2);
  assert.equal(chapter02Guangzhou.beats.filter((beat) => beat.id.startsWith("guangzhou-terms")).length, 2);

  assert.doesNotMatch(chapter02Nanhai.beats.find((beat) => beat.id === "nanhai-boss-01")?.text ?? "", /误传/);
  assert.doesNotMatch(chapter02Nanhai.beats.find((beat) => beat.id === "nanhai-departure")?.text ?? "", /青布轿|没有携带兵器/);
});
