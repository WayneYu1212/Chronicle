import assert from "node:assert/strict";
import test from "node:test";
import {
  applyFragmentAction,
  createCompilationEntry,
  migrateCompilationState,
  grantFragments,
  toggleFocus,
  resolveCompilationRoute,
  preserveCompilationProgress,
} from "./compilation";
import type { CompilationState, SourceFragment } from "../types/game";

const fragment: SourceFragment = {
  id: "folio-13",
  title: "无题译抄残页 · 十三",
  content: "二十四日暮，城垣已弃。",
  fragmentary: true,
  sourcePerson: "汉文译者未详",
  foundAt: "广州城西旧宅",
  estimatedDate: "顺治七年前后",
  medium: "译抄残页",
  paper: "白棉纸",
  ink: "青灰旧墨",
  handwriting: "译抄小楷",
  marks: ["页码十三", "封蜡残屑"],
  value: 50,
  politicalRisk: 4,
  relatedPeople: ["沈掌柜"],
  relatedEvents: ["广州旧事"],
  transmission: "translated-copy",
};

function state(): CompilationState {
  return {
    fragments: { [fragment.id]: fragment },
    entries: { [fragment.id]: createCompilationEntry(fragment.id) },
    history: [],
    focusLimit: 2,
  };
}

test("a fragment occupies exactly one compilation disposition", () => {
  const recorded = applyFragmentAction(state(), fragment.id, {
    disposition: "recorded",
    section: "main",
    interpretation: "这页记录了一次城破后的混乱。",
    sourceClarity: "unclear",
    reliability: "medium",
    missingEvidence: "缺少记录者姓名与旁证。",
  });
  assert.equal(recorded.entries[fragment.id].disposition, "recorded");
  assert.equal(recorded.entries[fragment.id].section, "main");
  assert.equal(recorded.history.length, 1);
});

test("sold and destroyed fragments cannot return to an owned disposition", () => {
  const focused = toggleFocus(state(), fragment.id);
  const sold = applyFragmentAction(focused, fragment.id, { disposition: "sold" });
  assert.equal(sold.entries[fragment.id].focused, false);
  assert.throws(
    () => applyFragmentAction(sold, fragment.id, { disposition: "recorded", section: "appendix" }),
    /永久离手/,
  );
});

test("focus marks respect the configured limit and can be removed", () => {
  const initial = state();
  initial.fragments.second = { ...fragment, id: "second", title: "第二页" };
  initial.fragments.third = { ...fragment, id: "third", title: "第三页" };
  initial.entries.second = createCompilationEntry("second");
  initial.entries.third = createCompilationEntry("third");

  const one = toggleFocus(initial, "folio-13");
  const two = toggleFocus(one, "second");
  assert.throws(() => toggleFocus(two, "third"), /朱记最多/);
  const removed = toggleFocus(two, "folio-13");
  assert.equal(removed.entries["folio-13"].focused, false);
  assert.equal(toggleFocus(removed, "third").entries.third.focused, true);
});

test("old saves receive an empty compilation state without losing existing data", () => {
  const migrated = migrateCompilationState({ wage: 12, clues: ["旧线索"] });
  assert.equal(migrated.wage, 12);
  assert.deepEqual(migrated.clues, ["旧线索"]);
  assert.deepEqual(migrated.compilation.fragments, {});
  assert.equal(migrated.compilation.focusLimit, 2);
});

test("granting the same fragment twice keeps one entry and preserves player judgement", () => {
  const recorded = applyFragmentAction(state(), fragment.id, {
    disposition: "recorded",
    section: "appendix",
    interpretation: "保留原文，暂不下断语。",
  });
  const granted = grantFragments(recorded, [fragment]);
  assert.equal(Object.keys(granted.fragments).length, 1);
  assert.equal(granted.entries[fragment.id].interpretation, "保留原文，暂不下断语。");
});

test("compilation route resolution uses disposition and section", () => {
  const recorded = applyFragmentAction(state(), fragment.id, {
    disposition: "recorded",
    section: "appendix",
    interpretation: "保留原文。",
  });
  assert.equal(resolveCompilationRoute(recorded, fragment.id, {
    "recorded:main": "main-route",
    "recorded:appendix": "appendix-route",
    doubtful: "doubt-route",
  }), "appendix-route");
  assert.equal(resolveCompilationRoute(state(), fragment.id, { recorded: "recorded-route" }), undefined);
});

test("page history cannot roll back fragment disposition, money, or risk", () => {
  const current = applyFragmentAction(state(), fragment.id, { disposition: "sold" });
  const previous = { compilation: state(), variables: { wage: 10, risk: 0 }, beat: "before" };
  const now = { compilation: current, variables: { wage: 60, risk: 1 }, beat: "after" };
  const restored = preserveCompilationProgress(previous, now);
  assert.equal(restored.beat, "before");
  assert.equal(restored.compilation.entries[fragment.id].disposition, "sold");
  assert.deepEqual(restored.variables, { wage: 60, risk: 1 });
});
