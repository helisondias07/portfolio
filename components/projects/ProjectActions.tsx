"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import { dict } from "@/lib/i18n/dict";
import { casePath } from "@/lib/projects/catalog";
import { isGithubUrl } from "@/lib/projects/explore";
import Tx from "../Tx";

export default function ProjectActions({ project }: { project: Project }) {
  const ui = dict.pt.projectsUi;
  const uien = dict.en.projectsUi;
  const github = isGithubUrl(project.url) ? project.url : project.repo;
  const site = project.url && !isGithubUrl(project.url) ? project.url : null;

  return (
    <div className="wk-acts">
      <Link href={casePath(project.id)} className="wk-case">
        <Tx pt={ui.openCase} en={uien.openCase} />
      </Link>
      {project.demo ? (
        <a className="wk-ext" href={project.demo} target="_blank" rel="noopener">
          <Tx pt={ui.visitDemo} en={uien.visitDemo} />
        </a>
      ) : null}
      {github ? (
        <a className="wk-ext" href={github} target="_blank" rel="noopener">
          <Tx pt={ui.visitGithub} en={uien.visitGithub} />
        </a>
      ) : null}
      {site ? (
        <a className="wk-ext" href={site} target="_blank" rel="noopener">
          <Tx pt={ui.visitSite} en={uien.visitSite} />
        </a>
      ) : null}
    </div>
  );
}
