"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";
import { dict } from "@/lib/i18n/dict";
import { localizeProject } from "@/lib/i18n/localize";
import Tx from "../Tx";
import ProjectActions from "./ProjectActions";
import StackTags from "./StackTags";

export default function LayoutIndex({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState(projects[0]?.id ?? "");
  const active = projects.find((project) => project.id === open) ?? projects[0];
  if (!active) return null;
  const enActive = localizeProject(active, "en");

  return (
    <div className="lo-b">
      <ol className="lo-b-index">
        {projects.map((project, i) => {
          const en = localizeProject(project, "en");
          const selected = project.id === active.id;
          return (
            <li key={project.id} className={selected ? "on" : undefined}>
              <button
                type="button"
                className="lo-b-name"
                aria-expanded={selected}
                aria-controls="lo-b-panel"
                onClick={() => setOpen(project.id)}
                onFocus={() => setOpen(project.id)}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <Tx pt={project.name} en={en.name} />
                {project.mvp ? <i className="wk-mvp"><Tx pt={dict.pt.projectsUi.mvpBadge} en={dict.en.projectsUi.mvpBadge} /></i> : null}
              </button>
              <div className="lo-b-mobile">
                <p className="lo-purpose"><Tx pt={project.overview[0]} en={en.overview[0]} /></p>
                <StackTags stack={project.stack} />
                <ProjectActions project={project} />
              </div>
            </li>
          );
        })}
      </ol>
      <aside className="lo-b-panel" id="lo-b-panel">
        <p className="wk-eye">
          {active.mvp ? <span className="wk-mvp"><Tx pt={dict.pt.projectsUi.mvpBadge} en={dict.en.projectsUi.mvpBadge} /></span> : null}
          <Tx pt={active.cat} en={enActive.cat} />
        </p>
        <h3><Tx pt={active.title} en={enActive.title} /></h3>
        <p className="lo-purpose"><Tx pt={active.overview[0]} en={enActive.overview[0]} /></p>
        <StackTags stack={active.stack} />
        <ProjectActions project={active} />
      </aside>
    </div>
  );
}
