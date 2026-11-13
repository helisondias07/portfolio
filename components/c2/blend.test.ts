import assert from "node:assert/strict";
import test from "node:test";
import { blendWorlds, contrastRatio, parseHex, washAt, type RGB, type WorldKey } from "./blend";

function rgbOf(s: string): RGB {
  const n = s.match(/\d+/g)!.map(Number);
  return [n[0], n[1], n[2]];
}

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

test("title ink stays AA on every step of shop→sneakers and sneakers→supfy", () => {
  const pairs: [WorldKey, WorldKey][] = [["w-shop", "w-sneak"], ["w-sneak", "w-supfy"]];
  for (const [from, to] of pairs) {
    for (let i = 0; i <= 20; i++) {
      const wash = blendWorlds(i / 20, from, to);
      const ratio = contrastRatio(rgbOf(wash.fg), rgbOf(wash.bg));
      assert.ok(ratio >= 4.5, `${from}→${to} t=${i / 20} ${wash.bg} / ${wash.fg} contrast ${ratio.toFixed(2)}`);
    }
  }
});

test("the 0.64vh ShopMind→Sneakers seam keeps readable ink", () => {
  const vh = 900;
  const wash = washAt([-200, 0.64 * vh, 1800], vh);
  assert.ok(wash);
  const ratio = contrastRatio(rgbOf(wash.fg), rgbOf(wash.bg));
  assert.ok(ratio >= 4.5, `${wash.bg} / ${wash.fg} contrast ${ratio.toFixed(2)}`);
  assert.notEqual(wash.fg, wash.bg);
});
