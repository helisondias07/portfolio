"use client";
import { Fragment, useLayoutEffect } from "react";
import { dict, type Segment } from "@/lib/i18n/dict";
import { getLang, subscribe } from "@/lib/i18n/store";
import Counters from "./Counters";
import Tx from "./Tx";

const words = (t: string) => t.split(/\s+/).filter(Boolean).map((w, i) => <span key={i} className="w">{w}</span>).reduce<React.ReactNode[]>((a, w, i) => (i ? [...a, " ", w] : [w]), []);

function Bio({ segments, langClass }: { segments: readonly Segment[]; langClass: string }) {
  return (
    <p className={`bio ${langClass}`}>
      {segments.map(([t, em], i) => {
        const glue = i > 0 && !t.startsWith(".") ? " " : "";
        return (
          <Fragment key={i}>
            {glue}
            {em ? <em>{words(t)}</em> : words(t)}
          </Fragment>
        );
      })}
    </p>
  );
}

function bindBio(bio: HTMLElement) {
  const ws = [...bio.querySelectorAll<HTMLElement>(".w")];
  const ems = [...bio.querySelectorAll<HTMLElement>("em")];
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    ws.forEach((w) => w.classList.add("on"));
    ems.forEach((e) => e.classList.add("lit"));
    return () => {};
  }
  let tick = false;
  const up = () => {
    tick = false;
    const r = bio.getBoundingClientRect();
    const vh = innerHeight;
    const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
    const n = Math.round(p * ws.length);
    ws.forEach((w, i) => w.classList.toggle("on", i < n));
    ems.forEach((e) => e.classList.toggle("lit", !!e.querySelector(".w:last-child")?.classList.contains("on")));
  };
  const onScroll = () => {
    if (!tick) {
      tick = true;
      requestAnimationFrame(up);
    }
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", up);
  up();
  return () => {
    removeEventListener("scroll", onScroll);
    removeEventListener("resize", up);
  };
}

export default function About() {
  // Scroll-linked word reveal on the language that's actually on screen.
  useLayoutEffect(() => {
    let cleanup = () => {};
    const bind = () => {
      cleanup();
      const bio = document.querySelector<HTMLElement>(getLang() === "en" ? "p.bio.i18n-en" : "p.bio.i18n-pt");
      if (bio) cleanup = bindBio(bio);
    };
    bind();
    const unsub = subscribe(bind);
    return () => {
      unsub();
      cleanup();
    };
  }, []);

  return (
    <section className="s ab" id="sobre">
      <div className="abw">
        <span className="mo abk"><Tx pt={dict.pt.about.kicker} en={dict.en.about.kicker} /></span>
        <Bio segments={dict.pt.about.bio} langClass="i18n-pt" />
        <Bio segments={dict.en.about.bio} langClass="i18n-en" />
        <Counters />
        <dl className="skl">
          {dict.pt.about.skills.map((skill, i) => {
            const en = dict.en.about.skills[i];
            return (
              <div key={skill.title} className={skill.wide ? "skl-ia" : undefined}>
                <dt><Tx pt={skill.title} en={en.title} /></dt>
                <dd><Tx pt={skill.body} en={en.body} /></dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
