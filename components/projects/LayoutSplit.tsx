"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import { dict } from "@/lib/i18n/dict";
import { localizeProject } from "@/lib/i18n/localize";
import { casePath } from "@/lib/projects/catalog";
import Tx from "../Tx";
import ProjectActions from "./ProjectActions";
import StackTags from "./StackTags";

function Compact({ project }: { project: Project }) {
  const en = localizeProject(project, "en");
  return (
    <article className="lo-d-card" id={`p-${project.id}`}>
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

export default function LayoutSplit({ experiments, cases }: { experiments: Project[]; cases: Project[] }) {
  return (
    <div className="lo-d">
      <section className="lo-d-col" aria-labelledby="lo-d-exp">
        <h3 id="lo-d-exp"><Tx pt="Experimentos" en="Experiments" /></h3>
        {experiments.map((project) => (
          <Compact key={project.id} project={project} />
        ))}
      </section>
      <section className="lo-d-col" aria-labelledby="lo-d-cases">
        <h3 id="lo-d-cases"><Tx pt="Cases" en="Cases" /></h3>
        {cases.map((project) => (
          <Compact key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}
