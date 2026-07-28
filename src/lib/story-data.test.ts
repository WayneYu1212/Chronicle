import assert from "node:assert/strict";
import test from "node:test";
import chapter01 from "../story/chapter01.json";
import chapter02Guangzhou from "../story/chapter02-guangzhou.json";
import chapter02Nanhai from "../story/chapter02-nanhai.json";
import fragments from "../story/fragments.json";

const chapters = [chapter01, chapter02Guangzhou, chapter02Nanhai];
const fragmentIds = new Set(fragments.map((fragment) => fragment.id));

test("story targets, compilation routes, and fragment grants resolve", () => {
  for (const chapter of chapters) {
    const ids = new Set(chapter.beats.map((beat) => beat.id));
    assert.equal(ids.size, chapter.beats.length, `${chapter.id} contains duplicate beat ids`);
    for (const beat of chapter.beats) {
      if ("next" in beat && beat.next) assert.ok(ids.has(beat.next), `${chapter.id}:${beat.id} has missing next ${beat.next}`);
      if ("choices" in beat && beat.choices) {
        for (const choice of beat.choices) {
          if (choice.goto && !("chapter" in choice && choice.chapter)) assert.ok(ids.has(choice.goto), `${chapter.id}:${beat.id} has missing goto ${choice.goto}`);
        }
      }
      if ("grantFragments" in beat && beat.grantFragments) {
        for (const id of beat.grantFragments) assert.ok(fragmentIds.has(id), `${chapter.id}:${beat.id} grants unknown fragment ${id}`);
      }
      if ("compilation" in beat && beat.compilation) {
        assert.ok(fragmentIds.has(beat.compilation.fragmentId), `${chapter.id}:${beat.id} references unknown compilation fragment`);
        for (const route of Object.values(beat.compilation.routes)) assert.ok(ids.has(route), `${chapter.id}:${beat.id} has missing compilation route ${route}`);
      }
    }
  }
});

test("both Chapter Two routes contain at least five thousand narrative characters", () => {
  for (const chapter of [chapter02Guangzhou, chapter02Nanhai]) {
    const length = chapter.beats.reduce((sum, beat) => sum + beat.text.length, 0);
    assert.ok(length >= 5000, `${chapter.id} only contains ${length} narrative characters`);
  }
});
