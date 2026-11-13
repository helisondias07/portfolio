"use client";
import { useEffect, useLayoutEffect } from "react";
import { dict } from "@/lib/i18n/dict";
import { getLang, subscribe } from "@/lib/i18n/store";
import Tx from "./Tx";

/**
 * Hero: name and role paint with the HTML. The keyboard types the stack
 * after the first frame, and the 3D scene stays lazy so the text wins first paint.
 * The stage box is reserved in CSS, so the keyboard never shifts the layout.
 */
export default function Hero() {
  useLayoutEffect(() => {
    const apply = () => {
      const hero = dict[getLang()].hero;
      document.getElementById("hero-title")?.setAttribute("aria-label", `${hero.name}. ${hero.role}`);
      document.querySelector(".term")?.setAttribute("aria-label", hero.terminal);
    };
    apply();
    return subscribe(apply);
  }, []);

  useEffect(() => {
    import("@/lib/engines/hero").then((m) => m.startHero());
  }, []);

  const pt = dict.pt.hero;
  const en = dict.en.hero;

  return (
    <header className="hero g3" id="hero">
      <h1 className="who" id="hero-title" aria-label={`${pt.name}. ${pt.role}`}>
        <span className="who-name">{pt.name}</span>
        <span className="who-role">
          <Tx pt={pt.role} en={en.role} />
        </span>
      </h1>
      <p className="hl" id="hero-type">
        <span className="sr"><Tx pt={pt.headline} en={en.headline} /></span>
        <span className="hli">
          <span id="hl" aria-hidden="true" />
          <span className="car" aria-hidden="true">{"\u2060"}</span>
          <span id="hlrest" className="hlrest" aria-hidden="true">
            <span className="i18n-pt">{pt.headline}</span>
            <span className="i18n-en">{en.headline}</span>
          </span>
          <span id="hlr" className="hlr" aria-hidden="true">
            <span className="i18n-pt">{pt.headline}</span>
            <span className="i18n-en">{en.headline}</span>
          </span>
        </span>
      </p>
      <div className="hrow">
        <div className="stage" id="stage" aria-hidden="true">
          <div className="kb3" />
        </div>
        <aside className="term" aria-label={pt.terminal}>
          <div className="tb">
            <i />
            <i />
            <i />
            <span>helison@portfolio — zsh</span>
          </div>
          <div className="bd" id="tbd" />
        </aside>
      </div>
      <div className="hcta">
        <p className="hmeta mo">
          <Tx pt={pt.location} en={en.location} />
        </p>
        <div className="hacts">
          <a className="btn wa" href="#projetos"><Tx pt={pt.ctaProjects} en={en.ctaProjects} /></a>
          <a className="btn ghost" href="#contato"><Tx pt={pt.ctaContact} en={en.ctaContact} /></a>
          <a className="btn" href="/cv/helison-dias-cv.pdf" download data-cv>
            <Tx pt={dict.pt.contact.cv} en={dict.en.contact.cv} />
          </a>
        </div>
      </div>
      <div className="foot mo" hidden style={{ display: "none" }}>
        <span><Tx pt={pt.location} en={en.location} /></span>
        <span id="hint"><Tx pt={pt.hintKb} en={en.hintKb} /></span>
      </div>
    </header>
  );
}
