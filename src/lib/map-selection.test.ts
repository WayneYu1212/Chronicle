import assert from "node:assert/strict";
import test from "node:test";
import { findNearestSelectableMapLocation } from "./map-selection";

const denseLocations = [
  { id: "guangzhou", x: 47.79, y: 49.02 },
  { id: "nanhai", x: 47.79, y: 42.78 },
  { id: "panyu", x: 41.8, y: 46.79 },
];

test("overlapping map targets resolve a pointer to the nearest selectable marker", () => {
  const width = 310;
  const height = 248;
  assert.equal(
    findNearestSelectableMapLocation(
      denseLocations,
      ["guangzhou", "panyu"],
      width * 0.4779,
      height * 0.4902,
      width,
      height,
    ),
    "guangzhou",
  );
});

test("map pointer selection ignores locked markers and distant taps", () => {
  assert.equal(
    findNearestSelectableMapLocation(denseLocations, ["guangzhou"], 130, 116, 310, 248),
    "guangzhou",
  );
  assert.equal(
    findNearestSelectableMapLocation(denseLocations, ["guangzhou"], 300, 230, 310, 248),
    undefined,
  );
});
