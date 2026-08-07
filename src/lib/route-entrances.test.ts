import assert from "node:assert/strict";
import test from "node:test";
import { mergeRouteEntrances, routeEntranceIds } from "./route-entrances";

test("route entrance updates are idempotent and preserve discovery order", () => {
  assert.deepEqual(
    mergeRouteEntrances(["xiqiao-copyist"], ["xiqiao-copyist", "zhaoqing-common-ledger"]),
    ["xiqiao-copyist", "zhaoqing-common-ledger"],
  );
});

test("chapter four and five add only named, reviewable route entrances", () => {
  assert.ok(routeEntranceIds.includes("chaozhou-merchant-ledger"));
  assert.ok(routeEntranceIds.includes("guangzhou-plum-gate"));
  assert.ok(routeEntranceIds.includes("guangzhou-burial-register"));
});
