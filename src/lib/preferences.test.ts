import assert from "node:assert/strict";
import test from "node:test";
import { readReducedMotion, writeReducedMotion } from "./preferences";

test("reduced-motion preference reads and writes through an available storage", () => {
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
  };
  assert.deepEqual(readReducedMotion(storage), { ok: true, value: false });
  assert.deepEqual(writeReducedMotion(true, storage), { ok: true });
  assert.deepEqual(readReducedMotion(storage), { ok: true, value: true });
});

test("storage security errors become player-facing results instead of exceptions", () => {
  const blocked = {
    getItem() { throw new DOMException("blocked", "SecurityError"); },
    setItem() { throw new DOMException("blocked", "SecurityError"); },
  };
  assert.equal(readReducedMotion(blocked).ok, false);
  assert.equal(writeReducedMotion(true, blocked).ok, false);
});
