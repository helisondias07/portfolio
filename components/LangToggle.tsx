"use client";

import { dict } from "@/lib/i18n/dict";
import { toggleLang, useLang } from "@/lib/i18n/store";

export default function LangToggle() {
  const lang = useLang();
  return (
    <button id="lang" className="thm lang" type="button" aria-label={dict[lang].langToggle.label} onClick={toggleLang}>
      <span className="i18n-pt">PT</span>
      <span className="i18n-en">EN</span>
    </button>
  );
}
