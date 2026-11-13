import assert from "node:assert/strict";
import test from "node:test";
import { blendWorlds, parseHex, washAt } from "./blend";

test("chapter wash starts on the previous world and ends on the next", () => {
  const start = blendWorlds(0, "w-shop", "w-sneak");
  const end = blendWorlds(1, "w-shop", "w-sneak");
  assert.equal(start.bg, "rgb(238 240 242)");
  assert.equal(start.fg, "rgb(26 28 31)");
  assert.equal(end.bg, "rgb(14 14 14)");
  assert.equal(end.fg, "rgb(245 245 245)");
});

test("text keeps the ink that still reads on the mixed background", () => {
  const early = blendWorlds(0.25, "w-shop", "w-sneak");
  assert.equal(early.fg, "rgb(26 28 31)");
  assert.notEqual(early.bg, "rgb(238 240 242)");
  const late = blendWorlds(0.8, "w-shop", "w-sneak");
  assert.equal(late.fg, "rgb(245 245 245)");
  assert.notEqual(late.bg, "rgb(14 14 14)");
});

test("a chapter still below the fold keeps the current world", () => {
  const wash = washAt([100, 900, 1800, 2700], 800);
  assert.deepEqual(parseHex("#EEF0F2"), [238, 240, 242]);
  assert.equal(wash?.bg, "rgb(238 240 242)");
  assert.equal(wash?.fg, "rgb(26 28 31)");
});

test("crossing into the next chapter blends the two worlds", () => {
  const wash = washAt([ -400, 400, 1400, 2400 ], 800);
  assert.ok(wash);
  assert.notEqual(wash.bg, "rgb(238 240 242)");
  assert.notEqual(wash.bg, "rgb(14 14 14)");
});

test("after the crossing the wash is the arrived world", () => {
  const wash = washAt([ -1600, -200, 900, 1800 ], 800);
  assert.equal(wash?.bg, "rgb(14 14 14)");
  assert.equal(wash?.fg, "rgb(245 245 245)");
});
