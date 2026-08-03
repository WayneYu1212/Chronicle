import assert from "node:assert/strict";
import test from "node:test";
import { splitSentenceTokens } from "./text";

test("keeps Chinese evidence phrases together", () => {
  const tokens = splitSentenceTokens("沈掌柜把第十三页夹进空账簿。");

  assert.ok(tokens.includes("沈掌柜"));
  assert.ok(tokens.some((token) => token.includes("第十三页")));
  assert.ok(!tokens.includes("第"));
});

test("keeps Latin words and punctuation readable", () => {
  const tokens = splitSentenceTokens("Relação ... Canton ... Padre ...");

  assert.ok(tokens.some((token) => token.startsWith("Relação")));
  assert.ok(tokens.some((token) => token.startsWith("Canton")));
  assert.ok(tokens.some((token) => token.startsWith("Padre")));
});
