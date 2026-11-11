"use client";

import { useLang } from "@/lib/i18n/store";

/** Both languages stay in the DOM. CSS shows one; aria-hidden hides the other from the name. */
export default function Tx({ pt, en }: { pt: string; en: string }) {
  const lang = useLang();
  return (
    <>
      <span className="i18n-pt" aria-hidden={lang === "en" ? true : undefined}>{pt}</span>
      <span className="i18n-en" aria-hidden={lang === "pt" ? true : undefined}>{en}</span>
    </>
  );
}
