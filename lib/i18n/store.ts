"use client";

import { useSyncExternalStore } from "react";
import { dict, type Lang } from "./dict";
import { browserLanguageTags, LANG_KEY, langCookieAssignment, langFromCookie, resolveLang } from "./detect";

export { LANG_KEY };

const listeners = new Set<() => void>();

function detect(): Lang {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(LANG_KEY);
  } catch {
    /* private mode or blocked storage */
  }
  let cookie: string | null = null;
  try {
    cookie = langFromCookie(document.cookie);
  } catch {
    /* ignore */
  }
  return resolveLang({ stored, cookie, languages: browserLanguageTags() });
}

function readInitial(): Lang {
  if (typeof document === "undefined") return "pt";
  const preset = document.documentElement.dataset.lang;
  if (preset === "pt" || preset === "en") return preset;
  return detect();
}

let lang: Lang = readInitial();

export function getLang(): Lang {
  return lang;
}

function setMeta(sel: string, value: string) {
  document.querySelector(sel)?.setAttribute("content", value);
}

export function syncDom(next: Lang = lang) {
  if (typeof document === "undefined") return;
  const meta = dict[next].meta;
  const root = document.documentElement;
  root.lang = meta.htmlLang;
  root.dataset.lang = next;
  document.title = meta.title;
  setMeta('meta[name="description"]', meta.description);
  setMeta('meta[property="og:title"]', meta.title);
  setMeta('meta[property="og:description"]', meta.description);
  setMeta('meta[property="og:locale"]', meta.locale);
  setMeta('meta[name="twitter:title"]', meta.title);
  setMeta('meta[name="twitter:description"]', meta.description);
}

export function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

/** Apply language to the document. Persists only when the visitor chooses. */
export function applyLang(next: Lang, persist = false) {
  lang = next;
  syncDom(next);
  if (persist) {
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch {
      /* private mode or blocked storage */
    }
    try {
      document.cookie = langCookieAssignment(next, location.protocol === "https:");
    } catch {
      /* ignore */
    }
  }
  listeners.forEach((cb) => cb());
}

export function toggleLang() {
  applyLang(lang === "pt" ? "en" : "pt", true);
}

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, getLang, () => "pt");
}

declare global {
  interface Window {
    __heroApply?: () => void;
    __projectsApply?: () => void;
    __hlNow?: string;
  }
}
