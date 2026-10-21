"use client";
import { useEffect, useLayoutEffect } from "react";
import { projects } from "@/data/projects";
import { dict } from "@/lib/i18n/dict";
import { localizeProject } from "@/lib/i18n/localize";
import { getLang, subscribe } from "@/lib/i18n/store";
import Tx from "./Tx";

/** Coverflow carousel (real projects) + "Case em destaque" that crossfades with the active card. */
export default function Projects() {
  useLayoutEffect(() => {
    const apply = () => {
      const ui = dict[getLang()].projectsUi;
      const cf = document.getElementById("cf");
      cf?.setAttribute("aria-roledescription", ui.carousel);
      cf?.setAttribute("aria-label", ui.carouselLabel);
      document.getElementById("cfl")?.setAttribute("aria-label", ui.prev);
      document.getElementById("cfr")?.setAttribute("aria-label", ui.next);
      document.getElementById("cfl2")?.setAttribute("aria-label", ui.prev);
      document.getElementById("cfr2")?.setAttribute("aria-label", ui.next);
      document.getElementById("dots")?.setAttribute("aria-label", ui.dots);
    };
    apply();
    return subscribe(apply);
  }, []);

  useEffect(() => {
    import("@/lib/engines/projects").then((m) => m.startProjects(projects));
  }, []);

  const ui = dict.pt.projectsUi;
  const en = dict.en.projectsUi;
  return (
    <section className="s pj4" id="projetos">
      <div className="abw">
        <span className="mo abk"><Tx pt={ui.kicker} en={en.kicker} /></span>
        <div className="p4h">
          <h2><Tx pt={ui.title} en={en.title} /></h2>
          <p><Tx pt={ui.lede} en={en.lede} /></p>
        </div>
      </div>
      <ul className="sr">
        {projects.map((p) => {
          const localized = localizeProject(p, "en");
          return (
            <li key={p.id}>
              <h3>{p.name}</h3>
              <p className="i18n-pt">{p.overview[0]}</p>
              <p className="i18n-en">{localized.overview[0]}</p>
              {p.url ? <a href={p.url}>{p.url}</a> : null}
            </li>
          );
        })}
      </ul>
      <div className="cf" id="cf" tabIndex={0} aria-roledescription={ui.carousel} aria-label={ui.carouselLabel}>
        <div className="cft" id="cft" />
        <button className="cfa l" id="cfl" aria-label={ui.prev}>←</button>
        <button className="cfa r" id="cfr" aria-label={ui.next}>→</button>
      </div>
      <div className="cfn">
        <button className="cfa m" id="cfl2" aria-label={ui.prev}>←</button>
        <div className="dots" id="dots" role="group" aria-label={ui.dots} />
        <span className="cnt mo" id="cnt">01 / {String(projects.length).padStart(2, "0")}</span>
        <button className="cfa m" id="cfr2" aria-label={ui.next}>→</button>
      </div>
      <div className="abw">
        <div className="cdh">
          <span className="mo abk"><Tx pt={ui.featured} en={en.featured} /></span>
          <span className="cdn" id="cdn" />
        </div>
        <article className="csd" id="csd" />
      </div>
    </section>
  );
}
