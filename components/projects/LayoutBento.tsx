"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import { dict } from "@/lib/i18n/dict";
import { localizeProject } from "@/lib/i18n/localize";
import { casePath } from "@/lib/projects/catalog";
import Tx from "../Tx";
import ProjectActions from "./ProjectActions";
import StackTags from "./StackTags";

function Tile({ project, featured }: { project: Project; featured?: boolean }) {
  const en = localizeProject(project, "en");
  return (
    <article className={`lo-c-tile${featured ? " feat" : ""}`} id={`p-${project.id}`}>
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
    </article>
  );
}

export default function LayoutBento({ authored, storefronts }: { authored: Project[]; storefronts: Project[] }) {
  const feature = authored[0];
  const restAuthored = authored.slice(1);
  return (
    <div className="lo-c">
      <div className="lo-c-grid">
        {feature ? <Tile project={feature} featured /> : null}
        {restAuthored.map((project) => (
          <Tile key={project.id} project={project} />
        ))}
        {storefronts.map((project) => (
          <Tile key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
