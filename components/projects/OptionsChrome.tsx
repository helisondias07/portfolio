"use client";

import { dict } from "@/lib/i18n/dict";
import { FILTERS, type FilterId } from "@/lib/projects/explore";
import type { ProjectLayoutId } from "./layout-types";
import Tx from "../Tx";

const FILTER_COPY: Record<(typeof FILTERS)[number], { pt: string; en: string }> = {
  "*": { pt: dict.pt.projectsUi.filterAll, en: dict.en.projectsUi.filterAll },
  ecommerce: { pt: dict.pt.projectsUi.filterEcommerce, en: dict.en.projectsUi.filterEcommerce },
  front: { pt: dict.pt.projectsUi.filterFront, en: dict.en.projectsUi.filterFront },
  pessoais: { pt: dict.pt.projectsUi.filterAuthored, en: dict.en.projectsUi.filterAuthored },
};

function previewPath(layout: ProjectLayoutId, filter: FilterId) {
  const sp = new URLSearchParams();
  if (layout !== "current") sp.set("layout", layout);
  if (filter !== "*") sp.set("lane", filter);
  const q = sp.toString();
  return `/projetos${q ? `?${q}` : ""}#projetos`;
}

export default function OptionsChrome({
  filter,
  onFilter,
  children,
  layoutClass,
  layout,
}: {
  filter: FilterId;
  onFilter: (id: FilterId) => void;
  children: React.ReactNode;
  layoutClass: string;
  layout: ProjectLayoutId;
}) {
  const ui = dict.pt.projectsUi;
  const en = dict.en.projectsUi;

  return (
    <section className={`s pj4 lo-root ${layoutClass}`} id="projetos">
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
              onClick={() => {
                onFilter(id);
                history.replaceState(null, "", previewPath(layout, id));
              }}
            >
              <Tx pt={FILTER_COPY[id].pt} en={FILTER_COPY[id].en} />
            </button>
          ))}
        </div>
        {children}
      </div>
    </section>
  );
}
