import assert from "node:assert/strict";
import test from "node:test";
import {
  TUTORIAL_STEPS,
  hasCompletedTutorial,
  markTutorialComplete,
} from "./tutorial";

test("tutorial copy explains the two notebook views within 30 characters", () => {
  const copy = TUTORIAL_STEPS.flatMap((step) => [step.title, step.body]);
  assert.equal(TUTORIAL_STEPS.length, 4);
  assert.ok(copy.every((text) => Array.from(text).length <= 30));
  assert.ok(copy.some((text) => text.includes("手札") && text.includes("线索")));
  assert.ok(copy.some((text) => text.includes("长编") && text.includes("来源")));
});

test("tutorial completion recognizes only the current stored value", () => {
  assert.equal(hasCompletedTutorial("done"), true);
  assert.equal(hasCompletedTutorial(null), false);
  assert.equal(hasCompletedTutorial("chronicle-tutorial-v0"), false);
});

test("marking tutorial complete writes the versioned completion value", () => {
  let value = "";
  markTutorialComplete({ setItem: (_key, next) => { value = next; } });
  assert.equal(value, "done");
});
