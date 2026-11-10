"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import { dict } from "@/lib/i18n/dict";
import { localizeProject } from "@/lib/i18n/localize";
import { casePath } from "@/lib/projects/catalog";
import Tx from "../Tx";
import ProjectActions from "./ProjectActions";
import StackTags from "./StackTags";

function Row({ project, index }: { project: Project; index: number }) {
  const en = localizeProject(project, "en");
  return (
    <article className="lo-a-row" id={`p-${project.id}`}>
      <span className="lo-a-num">{String(index + 1).padStart(2, "0")}</span>
      <div className="lo-a-copy">
        <p className="wk-eye">
          {project.mvp ? <span className="wk-mvp"><Tx pt={dict.pt.projectsUi.mvpBadge} en={dict.en.projectsUi.mvpBadge} /></span> : null}
          <Tx pt={project.cat} en={en.cat} />
        </p>
        <h3>
          <Link href={casePath(project.id)}><Tx pt={project.name} en={en.name} /></Link>
        </h3>
        <p className="lo-purpose"><Tx pt={project.overview[0]} en={en.overview[0]} /></p>
        <StackTags stack={project.stack} />
        <ProjectActions project={project} />
      </div>
    </article>
  );
}

export default function LayoutEditorial({ authored, storefronts }: { authored: Project[]; storefronts: Project[] }) {
  const ui = dict.pt.projectsUi;
  const en = dict.en.projectsUi;
  return (
    <div className="lo-a">
      {authored.length ? (
        <section className="lo-group" aria-labelledby="lane-authored">
          <h3 id="lane-authored"><Tx pt="Autoria e experimentos" en="Authored and experiments" /></h3>
          <div className="lo-a-list">
            {authored.map((project, i) => (
              <Row key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>
      ) : null}
      {storefronts.length ? (
        <section className="lo-group" aria-labelledby="lane-stores">
          <h3 id="lane-stores"><Tx pt={ui.laneStorefronts} en={en.laneStorefronts} /></h3>
          <div className="lo-a-list lo-a-stores">
            {storefronts.map((project, i) => (
              <Row key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
