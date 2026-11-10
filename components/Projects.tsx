"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { dict } from "@/lib/i18n/dict";
import { useLang } from "@/lib/i18n/store";
import { casePath, filterPublished, galleryPath, laneFromSearch, projectLane, publishedProjectIds, publishedProjects } from "@/lib/projects/catalog";
import { FILTERS, type FilterId, projectIdFromHash } from "@/lib/projects/explore";
import Tx from "./Tx";
import WorkCard from "./WorkCard";

const FILTER_COPY: Record<(typeof FILTERS)[number], { pt: string; en: string }> = {
  "*": { pt: dict.pt.projectsUi.filterAll, en: dict.en.projectsUi.filterAll },
  ecommerce: { pt: dict.pt.projectsUi.filterEcommerce, en: dict.en.projectsUi.filterEcommerce },
  front: { pt: dict.pt.projectsUi.filterFront, en: dict.en.projectsUi.filterFront },
  pessoais: { pt: dict.pt.projectsUi.filterAuthored, en: dict.en.projectsUi.filterAuthored },
};

function applyLane(id: FilterId) {
  history.replaceState(null, "", galleryPath(id));
}

export default function Projects() {
  useLang();
  const [filter, setFilter] = useState<FilterId>("*");

  useEffect(() => {
    const sync = () => {
      setFilter(laneFromSearch(window.location.search));
      const id = projectIdFromHash(window.location.hash, publishedProjectIds());
      if (id) window.location.replace(casePath(id));
    };
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  const visible = useMemo(() => filterPublished(publishedProjects(), filter), [filter]);
  const authored = visible.filter((project) => projectLane(project) === "authored");
  const storefronts = visible.filter((project) => projectLane(project) === "storefront");
  const empty = visible.length === 0;

  const onFilter = (id: FilterId) => {
    setFilter(id);
    applyLane(id);
  };

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
        <span id="flt2-label" className="sr">
          <Tx pt={ui.filters} en={en.filters} />
        </span>
        <div className="flt2" id="flt2" role="group" aria-labelledby="flt2-label">
          {FILTERS.map((id) => (
            <button
              key={id}
              type="button"
              data-f={id}
              className={id === filter ? "on" : undefined}
              aria-pressed={id === filter}
              onClick={() => onFilter(id)}
            >
              <Tx pt={FILTER_COPY[id].pt} en={FILTER_COPY[id].en} />
            </button>
          ))}
        </div>
        <span id="pix-label" className="sr">
          <Tx pt={ui.index} en={en.index} />
        </span>
        <div className="pix" id="pix" role="list" aria-labelledby="pix-label">
          {visible.map((project) => (
            <Link key={project.id} href={casePath(project.id)} className="pixi" data-id={project.id} role="listitem">
              {project.name}
            </Link>
          ))}
        </div>
        {empty ? (
          <p className="pempty" id="pempty">
            <Tx pt={ui.empty} en={en.empty} />
          </p>
        ) : (
          <p className="pempty" id="pempty" hidden>
            <Tx pt={ui.empty} en={en.empty} />
          </p>
        )}
        <ul className="sr">
          {visible.map((project) => (
            <li key={project.id}>
              <a href={casePath(project.id)}>{project.name}</a>
            </li>
          ))}
        </ul>
        <div className="wk-lanes">
          {authored.length ? (
            <section className="wk-lane" aria-labelledby="lane-authored">
              <h3 id="lane-authored"><Tx pt={ui.laneAuthored} en={en.laneAuthored} /></h3>
              <div className="wk-grid wk-grid-authored">
                {authored.map((project) => (
                  <WorkCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          ) : null}
          {storefronts.length ? (
            <section className="wk-lane" aria-labelledby="lane-stores">
              <h3 id="lane-stores"><Tx pt={ui.laneStorefronts} en={en.laneStorefronts} /></h3>
              <div className="wk-grid">
                {storefronts.map((project) => (
                  <WorkCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </section>
  );
}
