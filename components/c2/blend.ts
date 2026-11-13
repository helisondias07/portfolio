/** Chapter worlds. The scroll wash lerps these instead of cutting from one sheet to the next. */
export const CHAPTER_WORLDS = {
  "w-shop": { bg: "#EEF0F2", fg: "#1A1C1F" },
  "w-sneak": { bg: "#0E0E0E", fg: "#F5F5F5" },
  "w-fit": { bg: "#E8E4DE", fg: "#1A1B1D" },
  "w-serra": { bg: "#DCE4E7", fg: "#17262D" },
  "w-supfy": { bg: "#E3E8E2", fg: "#172019" },
} as const;

export type WorldKey = keyof typeof CHAPTER_WORLDS;
export type RGB = readonly [number, number, number];

export function parseHex(hex: string): RGB {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function formatRgb(rgb: RGB): string {
  return `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`;
}

function lerp(a: RGB, b: RGB, t: number): RGB {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

function channel(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function contrast(a: RGB, b: RGB): number {
  const lum = (rgb: RGB) => 0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
  const hi = Math.max(lum(a), lum(b));
  const lo = Math.min(lum(a), lum(b));
  return (hi + 0.05) / (lo + 0.05);
}

export function blendWorlds(t: number, fromKey: WorldKey, toKey: WorldKey): { bg: string; fg: string; live: boolean } {
  const from = CHAPTER_WORLDS[fromKey];
  const to = CHAPTER_WORLDS[toKey];
  const clamped = Math.min(1, Math.max(0, t));
  const bg = lerp(parseHex(from.bg), parseHex(to.bg), smooth(clamped));
  const fromFg = parseHex(from.fg);
  const toFg = parseHex(to.fg);
  /* Light and dark worlds cross. Lerping the ink makes it disappear on the mixed ground, so the text takes whichever world ink still reads. */
  const fg = contrast(toFg, bg) > contrast(fromFg, bg) ? toFg : fromFg;
  return {
    bg: formatRgb(bg),
    fg: formatRgb(fg),
    live: clamped > 0 && clamped < 1,
  };
}

const ORDER = Object.keys(CHAPTER_WORLDS) as WorldKey[];

/** One wash for every chapter on screen, so the seam between sheets is a blend, not a cut. */
export function washAt(chapterTops: readonly number[], viewportHeight: number): { bg: string; fg: string; live: boolean } | null {
  if (!chapterTops.length || viewportHeight <= 0) return null;
  const span = viewportHeight * 0.72;
  let key: WorldKey = ORDER[0];
  for (let i = 0; i < chapterTops.length - 1; i++) {
    const t = Math.min(1, Math.max(0, (viewportHeight - chapterTops[i + 1]) / span));
    if (t <= 0) break;
    key = ORDER[Math.min(i + 1, ORDER.length - 1)];
    if (t < 1) return blendWorlds(t, ORDER[i], ORDER[i + 1]);
  }
  const world = CHAPTER_WORLDS[key];
  return { bg: formatRgb(parseHex(world.bg)), fg: formatRgb(parseHex(world.fg)), live: false };
}
