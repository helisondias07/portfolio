"use client";
import { useEffect, useLayoutEffect } from "react";
import { dict } from "@/lib/i18n/dict";
import { getLang, subscribe } from "@/lib/i18n/store";
import Tx from "./Tx";

/**
 * Hero: typed headline + 3D keyboard (desktop, lazy three.js) + terminal; phone/tablet chat below 1024px.
 * The stage area is reserved in CSS from first paint, so the lazy 3D never shifts layout.
 */
export default function Hero() {
  useLayoutEffect(() => {
    const apply = () => {
      document.getElementById("hero-title")?.setAttribute("aria-label", dict[getLang()].hero.headline);
      document.querySelector(".term")?.setAttribute("aria-label", dict[getLang()].hero.terminal);
    };
    apply();
    return subscribe(apply);
  }, []);

  useEffect(() => {
    import("@/lib/engines/hero").then((m) => m.startHero());
  }, []);
  return (
    <header className="hero g3" id="hero">
      <p className="tag mo"><Tx pt={dict.pt.hero.tag} en={dict.en.hero.tag} /></p>
      <h1 className="hl" id="hero-title" aria-label={dict.pt.hero.headline}>
        <span className="hli">
          <span id="hl" />
          <span className="car" />
          <span id="hlr" className="hlr" aria-hidden="true">
            <span className="i18n-pt">{dict.pt.hero.headline}</span>
            <span className="i18n-en">{dict.en.hero.headline}</span>
          </span>
        </span>
      </h1>
      <div className="hrow">
        <div className="stage" id="stage" aria-hidden="true">
          <div className="kb3" />
        </div>
        <aside className="term" aria-label={dict.pt.hero.terminal}>
          <div className="tb">
            <i />
            <i />
            <i />
            <span>helison@portfolio — zsh</span>
          </div>
          <div className="bd" id="tbd" />
        </aside>
      </div>
      <div className="foot mo" hidden style={{ display: "none" }}>
        <span><Tx pt={dict.pt.hero.location} en={dict.en.hero.location} /></span>
        <span id="hint"><Tx pt={dict.pt.hero.hintKb} en={dict.en.hero.hintKb} /></span>
        <span><Tx pt={dict.pt.hero.published} en={dict.en.hero.published} /></span>
      </div>
    </header>
  );
}
