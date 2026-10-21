"use client";

import { useEffect, useLayoutEffect } from "react";
import { dict } from "@/lib/i18n/dict";
import { getLang, subscribe, syncDom } from "@/lib/i18n/store";

/** Re-apply lang after hydration (and React Strict Mode remounts) without writing localStorage. */
export default function LangMeta() {
  useLayoutEffect(() => {
    syncDom(getLang());
    return subscribe(() => syncDom(getLang()));
  }, []);

  // Next restores the server <title> (Portuguese) after hydration. Keep the active language.
  useEffect(() => {
    const fix = () => {
      const meta = dict[getLang()].meta;
      const description = document.querySelector('meta[name="description"]')?.getAttribute("content");
      if (document.title !== meta.title || description !== meta.description) syncDom(getLang());
    };
    fix();
    const obs = new MutationObserver(fix);
    obs.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => obs.disconnect();
  }, []);

  return null;
}
