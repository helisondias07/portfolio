"use client";

import { useSyncExternalStore } from "react";
import { dict, type Lang } from "./dict";

export const LANG_KEY = "lang";

const listeners = new Set<() => void>();

function detect(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "pt" || saved === "en") return saved;
  } catch {}
  const n = (navigator.language || "pt").toLowerCase();
  return n.startsWith("pt") ? "pt" : "en";
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
    } catch {}
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
