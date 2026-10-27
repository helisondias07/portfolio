import type { Lang } from "./dict";

/** localStorage key. An explicit toggle writes this; detection never does. */
export const LANG_KEY = "lang";

/** Same name as {@link LANG_KEY}. Readable by the blocking head script. */
export const LANG_COOKIE = "lang";

export const LANG_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Matches `lang=pt` or `lang=en` in a Cookie header / document.cookie.
 * Embedded into the head script, so keep it free of `/`.
 */
export const LANG_COOKIE_PATTERN = "(?:^|;\\s*)lang=(pt|en)(?:;|$)";

export function isLang(value: string | null | undefined): value is Lang {
  return value === "pt" || value === "en";
}

export function langFromCookie(header: string | null | undefined): Lang | null {
  if (!header) return null;
  const match = header.match(new RegExp(LANG_COOKIE_PATTERN));
  return match && isLang(match[1]) ? match[1] : null;
}

export function langCookieAssignment(lang: Lang, secure: boolean): string {
  return `${LANG_COOKIE}=${lang}; Path=/; Max-Age=${LANG_MAX_AGE}; SameSite=Lax${secure ? "; Secure" : ""}`;
}

/**
 * Saved choice wins (localStorage, then cookie). Otherwise the primary browser
 * language — first `navigator.languages` entry, which is the list the browser
 * also sends as Accept-Language, falling back to `navigator.language`.
 * A tag that starts with "pt" is Portuguese. Every other tag, including an
 * empty one, is English. The page is static and ships both languages; the
 * head script applies this before paint, so the HTML does not vary by header.
 */
export function resolveLang(input: {
  stored?: string | null;
  cookie?: string | null;
  languages?: readonly string[] | null;
}): Lang {
  if (isLang(input.stored)) return input.stored;
  const fromCookie = isLang(input.cookie) ? input.cookie : langFromCookie(input.cookie);
  if (fromCookie) return fromCookie;
  const primary = (input.languages ?? []).map((tag) => tag.trim()).find(Boolean) ?? "";
  return primary.toLowerCase().startsWith("pt") ? "pt" : "en";
}

/** Primary content language, then `navigator.language` when the list is empty. */
export function browserLanguageTags(): string[] {
  if (typeof navigator === "undefined") return [];
  try {
    const list = navigator.languages;
    if (list && list.length) {
      return Array.from(list).filter((tag): tag is string => typeof tag === "string" && tag.trim().length > 0);
    }
  } catch {
    /* navigator.languages can throw in locked-down browsers */
  }
  try {
    if (navigator.language) return [navigator.language];
  } catch {
    /* ignore */
  }
  return [];
}
