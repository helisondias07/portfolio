"use client";

import Link from "next/link";
import { dict } from "@/lib/i18n/dict";
import { localizeProject } from "@/lib/i18n/localize";
import { useLang } from "@/lib/i18n/store";
import { casePath, projectLane } from "@/lib/projects/catalog";
import { isGithubUrl } from "@/lib/projects/explore";
import type { Project } from "@/data/projects";
import Tx from "./Tx";

function thumbSrc(file: string) {
  return `/thumbnails/${file}`;
}

export default function WorkCard({ project }: { project: Project }) {
  const lang = useLang();
  const en = localizeProject(project, "en");
  const href = casePath(project.id);
  const authored = projectLane(project) === "authored";
  const preview = dict[lang].projectsUi.preview;
  const visit = project.url
    ? isGithubUrl(project.url)
      ? { pt: dict.pt.projectsUi.visitRepo, en: dict.en.projectsUi.visitRepo }
      : { pt: dict.pt.projectsUi.visitSite, en: dict.en.projectsUi.visitSite }
    : null;
  const avif = project.img.replace(/\.webp$/i, ".avif");

  return (
    <article className={`wk-card${authored ? " wk-authored" : ""}`} id={`p-${project.id}`}>
      <Link href={href} className="wk-media" tabIndex={-1} aria-hidden="true">
        <picture>
          <source srcSet={thumbSrc(avif)} type="image/avif" />
          <img src={thumbSrc(project.img)} alt={`${preview}${project.name}`} width={project.dw} height={project.dh} />
        </picture>
      </Link>
      <div className="wk-body">
        <p className="wk-eye"><Tx pt={project.eyebrow} en={en.eyebrow} /></p>
        <h3>
          <Link href={href}><Tx pt={project.name} en={en.name} /></Link>
        </h3>
        <p className="wk-cat"><Tx pt={project.cat} en={en.cat} /></p>
        <p className="wk-ov"><Tx pt={project.overview[0]} en={en.overview[0]} /></p>
        <div className="wk-acts">
          <Link href={href} className="wk-case">
            <Tx pt={dict.pt.projectsUi.openCase} en={dict.en.projectsUi.openCase} />
          </Link>
          {visit ? (
            <a className="wk-ext" href={project.url} target="_blank" rel="noopener">
              <Tx pt={visit.pt} en={visit.en} />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
