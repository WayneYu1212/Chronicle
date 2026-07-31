import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

const claimsPath = fileURLToPath(new URL("../../docs/research/CLAIMS.md", import.meta.url));
const claims = readFileSync(claimsPath, "utf8");
const sourceLibraryPath = fileURLToPath(new URL("../../docs/research/SOURCE_LIBRARY.md", import.meta.url));
const sourceLibrary = readFileSync(sourceLibraryPath, "utf8");

test("P0 historical claims are uniquely registered and reviewed", () => {
  for (let index = 1; index <= 5; index += 1) {
    const id = `HIST-${String(index).padStart(3, "0")}`;
    const rows = claims.split("\n").filter((line) => line.startsWith(`| ${id} |`));
    assert.equal(rows.length, 1, `${id} must appear in exactly one claim-register row`);
    assert.match(rows[0], /\| supported \|/i, `${id} must be reviewed as supported`);
  }
});

test("P0 evidence notes preserve source locations and uncertainty boundaries", () => {
  for (let index = 1; index <= 5; index += 1) {
    const id = `HIST-${String(index).padStart(3, "0")}`;
    assert.match(claims, new RegExp(`### ${id}\\b`), `${id} needs a detailed evidence section`);
  }
  for (const category of ["H1", "H2", "H3", "H4"]) {
    assert.match(claims, new RegExp(`${category}\\b`));
  }
  assert.match(sourceLibrary, /C:\\Users\\UUWayne\\Desktop\\课业\\06 广东新语/);
  assert.match(claims, /异文|分歧|不(?:完全)?一致/);
});
