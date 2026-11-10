"use client";

import { dict } from "@/lib/i18n/dict";
import { toggleLang, useLang } from "@/lib/i18n/store";
import Tx from "./Tx";

export default function LangToggle({ tabIndex }: { tabIndex?: number }) {
  useLang();
  return (
    <button id="lang" className="thm lang" type="button" tabIndex={tabIndex} onClick={toggleLang}>
      <span className="i18n-pt" aria-hidden="true">PT</span>
      <span className="i18n-en" aria-hidden="true">EN</span>
      <span className="sr">
        <Tx pt={dict.pt.langToggle.label} en={dict.en.langToggle.label} />
      </span>
    </button>
  );
}
