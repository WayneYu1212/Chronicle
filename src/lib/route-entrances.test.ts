import assert from "node:assert/strict";
import test from "node:test";
import { mergeRouteEntrances } from "./route-entrances";

test("route entrance updates are idempotent and preserve discovery order", () => {
  assert.deepEqual(
    mergeRouteEntrances(["xiqiao-copyist"], ["xiqiao-copyist", "zhaoqing-common-ledger"]),
    ["xiqiao-copyist", "zhaoqing-common-ledger"],
  );
});

