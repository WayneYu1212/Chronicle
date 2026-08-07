import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import TutorialOverlay from "../components/TutorialOverlay";
import {
  TUTORIAL_STEPS,
  hasCompletedTutorial,
  markTutorialComplete,
  shouldAutoOpenTutorial,
} from "./tutorial";

const globalsCss = readFileSync(fileURLToPath(new URL("../app/globals.css", import.meta.url)), "utf8");

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

test("tutorial overlay exposes an accessible first step", () => {
  const markup = renderToStaticMarkup(createElement(TutorialOverlay, {
    open: true,
    onClose: () => undefined,
    onComplete: () => undefined,
  }));

  assert.match(markup, /role="dialog"/);
  assert.match(markup, /aria-modal="true"/);
  assert.match(markup, /先看正文，再做选择/);
  assert.match(markup, /人物名在左/);
});

test("auto tutorial waits for the book and skips completed players", () => {
  assert.equal(shouldAutoOpenTutorial(false, false), false);
  assert.equal(shouldAutoOpenTutorial(true, false), true);
  assert.equal(shouldAutoOpenTutorial(true, true), false);
});

test("mobile book shell uses dynamic height and safe containment", () => {
  assert.match(globalsCss, /height:calc\(100dvh - 80px\)/);
  assert.match(globalsCss, /max-width:calc\(100vw - 16px\)/);
  assert.match(globalsCss, /safe-area-inset-bottom/);
});
