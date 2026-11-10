"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { projects } from "@/data/projects";
import { dict } from "@/lib/i18n/dict";
import { localizeProject } from "@/lib/i18n/localize";
import { getLang, subscribe, useLang } from "@/lib/i18n/store";
import { FILTERS, type FilterId, isFilterId } from "@/lib/projects/explore";
import Tx from "./Tx";

const FILTER_COPY: Record<(typeof FILTERS)[number], { pt: string; en: string }> = {
  "*": { pt: dict.pt.projectsUi.filterAll, en: dict.en.projectsUi.filterAll },
  ecommerce: { pt: dict.pt.projectsUi.filterEcommerce, en: dict.en.projectsUi.filterEcommerce },
  front: { pt: dict.pt.projectsUi.filterFront, en: dict.en.projectsUi.filterFront },
  pessoais: { pt: dict.pt.projectsUi.filterAuthored, en: dict.en.projectsUi.filterAuthored },
};

/** Coverflow + case detail, with filters and an index over the real project list. */
export default function Projects() {
  useLang();
  const [filter, setFilter] = useState<FilterId>("*");
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
      document.getElementById("pix")?.setAttribute("aria-label", ui.index);
      document.getElementById("flt2")?.setAttribute("aria-label", ui.filters);
    };
    apply();
    return subscribe(apply);
  }, []);

  useEffect(() => {
    let alive = true;
    import("@/lib/engines/projects").then((m) => {
      if (!alive) return;
      m.startProjects(projects, {
        onFilter(next: string) {
          if (isFilterId(next)) setFilter(next);
        },
      });
    });
    return () => {
      alive = false;
    };
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
        <div className="flt2" id="flt2" role="group" aria-label={ui.filters}>
          {FILTERS.map((id) => (
            <button key={id} type="button" data-f={id} className={id === filter ? "on" : undefined} aria-pressed={id === filter}>
              <Tx pt={FILTER_COPY[id].pt} en={FILTER_COPY[id].en} />
            </button>
          ))}
        </div>
        <div className="pix" id="pix" role="list" aria-label={ui.index}>
          {projects.map((p) => (
            <button key={p.id} type="button" className="pixi" data-id={p.id} role="listitem">
              {p.name}
            </button>
          ))}
        </div>
        <p className="pempty" id="pempty" hidden>
          <Tx pt={ui.empty} en={en.empty} />
        </p>
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
        <button className="cfa l" id="cfl" type="button" aria-label={ui.prev}>←</button>
        <button className="cfa r" id="cfr" type="button" aria-label={ui.next}>→</button>
      </div>
      <div className="cfn">
        <button className="cfa m" id="cfl2" type="button" aria-label={ui.prev}>←</button>
        <div className="dots" id="dots" role="group" aria-label={ui.dots} />
        <span className="cnt mo" id="cnt">01 / {String(projects.length).padStart(2, "0")}</span>
        <button className="cfa m" id="cfr2" type="button" aria-label={ui.next}>→</button>
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
