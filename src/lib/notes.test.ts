import assert from "node:assert/strict";
import test from "node:test";
import { notesNewestFirst } from "./notes";

test("puts the newest note first without mutating saved order", () => {
  const notes = [
    { id: "old", type: "observation", title: "旧", content: "旧记录" },
    { id: "new", type: "clue", title: "新", content: "新记录" },
  ] as const;

  const newestFirst = notesNewestFirst([...notes]);

  assert.deepEqual(newestFirst.map((note) => note.id), ["new", "old"]);
  assert.deepEqual(notes.map((note) => note.id), ["old", "new"]);
});
