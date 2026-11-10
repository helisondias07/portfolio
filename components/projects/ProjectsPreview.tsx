"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/data/projects";
import { dict } from "@/lib/i18n/dict";
import { filterPublished, publishedProjects, projectLane } from "@/lib/projects/catalog";
import { type FilterId } from "@/lib/projects/explore";
import Tx from "../Tx";
import LayoutBento from "./LayoutBento";
import LayoutCarousel from "./LayoutCarousel";
import LayoutEditorial from "./LayoutEditorial";
import LayoutIndex from "./LayoutIndex";
import LayoutSplit from "./LayoutSplit";
import OptionsChrome from "./OptionsChrome";
import type { ProjectLayoutId } from "./layout-types";
import "./projetos-options.css";

export default function ProjectsPreview({ layout, lane }: { layout: ProjectLayoutId; lane: FilterId }) {
  const [filter, setFilter] = useState<FilterId>(lane);

  const visible = useMemo(() => filterPublished(publishedProjects(), filter), [filter]);
  const authored = visible.filter((project) => projectLane(project) === "authored");
  const storefronts = visible.filter((project) => projectLane(project) === "storefront");
  const experiments = visible.filter((project) => project.mvp);
  const cases = visible.filter((project) => !project.mvp);
  const empty = visible.length === 0;

  return (
    <OptionsChrome filter={filter} onFilter={setFilter} layout={layout} layoutClass={`lo-${layout}`}>
      {empty ? (
        <p className="pempty">
          <Tx pt={dict.pt.projectsUi.empty} en={dict.en.projectsUi.empty} />
        </p>
      ) : (
        <LayoutBody
          layout={layout}
          visible={visible}
          authored={authored}
          storefronts={storefronts}
          experiments={experiments}
          cases={cases}
        />
      )}
    </OptionsChrome>
  );
}

function LayoutBody({
  layout,
  visible,
  authored,
  storefronts,
  experiments,
  cases,
}: {
  layout: ProjectLayoutId;
  visible: Project[];
  authored: Project[];
  storefronts: Project[];
  experiments: Project[];
  cases: Project[];
}) {
  if (layout === "b") return <LayoutIndex projects={visible} />;
  if (layout === "c") return <LayoutBento authored={authored} storefronts={storefronts} />;
  if (layout === "d") return <LayoutSplit experiments={experiments} cases={cases} />;
          if (layout === "e") return <LayoutCarousel key={visible.map((p) => p.id).join("-")} projects={visible} />;
  return <LayoutEditorial authored={authored} storefronts={storefronts} />;
}
