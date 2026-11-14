/** Chapter worlds. The scroll wash lerps these instead of cutting from one sheet to the next. */
export const CHAPTER_WORLDS = {
  "w-shop": { bg: "#EEF0F2", fg: "#1A1C1F" },
  "w-sneak": { bg: "#0E0E0E", fg: "#F5F5F5" },
  "w-fit": { bg: "#713D50", fg: "#FFF1F2" },
  "w-serra": { bg: "#1F5E84", fg: "#F2F8FB" },
  "w-supfy": { bg: "#F7F6F2", fg: "#171A18" },
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

export function contrastRatio(a: RGB, b: RGB): number {
  const lum = (rgb: RGB) => 0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
  const hi = Math.max(lum(a), lum(b));
  const lo = Math.min(lum(a), lum(b));
  return (hi + 0.05) / (lo + 0.05);
}

const AA = 4.5;
const FALLBACK_DARK: RGB = [0, 0, 0];
const FALLBACK_LIGHT: RGB = [255, 255, 255];

/** World inks when they still read; otherwise a dark/light pair that stays AA on mixed grey. */
export function inkOn(bg: RGB, fromFg: RGB, toFg: RGB): RGB {
  const a = contrastRatio(fromFg, bg);
  const b = contrastRatio(toFg, bg);
  if (a >= AA || b >= AA) return a >= b ? fromFg : toFg;
  return contrastRatio(FALLBACK_DARK, bg) >= contrastRatio(FALLBACK_LIGHT, bg) ? FALLBACK_DARK : FALLBACK_LIGHT;
}

export function blendWorlds(t: number, fromKey: WorldKey, toKey: WorldKey): { bg: string; fg: string; live: boolean } {
  const from = CHAPTER_WORLDS[fromKey];
  const to = CHAPTER_WORLDS[toKey];
  const clamped = Math.min(1, Math.max(0, t));
  const bg = lerp(parseHex(from.bg), parseHex(to.bg), smooth(clamped));
  const fg = inkOn(bg, parseHex(from.fg), parseHex(to.fg));
  return {
    bg: formatRgb(bg),
    fg: formatRgb(fg),
    live: clamped > 0 && clamped < 1,
  };
}

const ORDER: WorldKey[] = ["w-shop", "w-sneak", "w-supfy"];

export type Wash = { bg: string; fg: string; live: boolean; from: WorldKey; to: WorldKey };

/** One wash for every chapter on screen, so the seam between sheets is a blend, not a cut.
 *  The blend runs for most of a viewport so a fast scroll still has room to ease. */
export function washAt(chapterTops: readonly number[], viewportHeight: number): Wash | null {
  if (!chapterTops.length || viewportHeight <= 0) return null;
  const span = viewportHeight * 1.08;
  let key: WorldKey = ORDER[0];
  for (let i = 0; i < chapterTops.length - 1; i++) {
    const t = Math.min(1, Math.max(0, (viewportHeight - chapterTops[i + 1]) / span));
    if (t <= 0) break;
    const from = ORDER[Math.min(i, ORDER.length - 1)];
    const to = ORDER[Math.min(i + 1, ORDER.length - 1)];
    key = to;
    if (t < 1) return { ...blendWorlds(t, from, to), from, to };
  }
  const world = CHAPTER_WORLDS[key];
  return { bg: formatRgb(parseHex(world.bg)), fg: formatRgb(parseHex(world.fg)), live: false, from: key, to: key };
}

/** Frame-rate independent ease. tau and dt are milliseconds. No overshoot. */
export function damp(current: number, target: number, tauMs: number, dtMs: number): number {
  if (!(tauMs > 0) || !(dtMs > 0)) return target;
  const t = 1 - Math.exp(-dtMs / tauMs);
  return current + (target - current) * t;
}

export function dampRgb(current: RGB, target: RGB, tauMs: number, dtMs: number): RGB {
  return [
    damp(current[0], target[0], tauMs, dtMs),
    damp(current[1], target[1], tauMs, dtMs),
    damp(current[2], target[2], tauMs, dtMs),
  ];
}
