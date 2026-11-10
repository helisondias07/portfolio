"use client";

import Link from "next/link";
import { dict } from "@/lib/i18n/dict";
import { localizeProject } from "@/lib/i18n/localize";
import { useLang } from "@/lib/i18n/store";
import { casePath, projectLane } from "@/lib/projects/catalog";
import type { Project } from "@/data/projects";
import Tx from "./Tx";
import ProjectActions from "./projects/ProjectActions";

function thumbSrc(file: string) {
  return file.startsWith("/") ? file : `/thumbnails/${file}`;
}

export default function WorkCard({ project }: { project: Project }) {
  const lang = useLang();
  const en = localizeProject(project, "en");
  const href = casePath(project.id);
  const authored = projectLane(project) === "authored";
  const preview = dict[lang].projectsUi.preview;
  const webp = /\.webp$/i.test(project.img);
  const avif = webp ? project.img.replace(/\.webp$/i, ".avif") : null;

  return (
    <article className={`wk-card${authored ? " wk-authored" : ""}`} id={`p-${project.id}`}>
      {project.img ? (
        <Link href={href} className="wk-media" tabIndex={-1} aria-hidden="true">
          <picture>
            {avif ? <source srcSet={thumbSrc(avif)} type="image/avif" /> : null}
            <img src={thumbSrc(project.img)} alt={`${preview}${project.name}`} width={project.dw} height={project.dh} />
          </picture>
        </Link>
      ) : (
        <Link href={href} className="wk-media wk-cover" tabIndex={-1} aria-hidden="true">
          <span><Tx pt={project.name} en={en.name} /></span>
        </Link>
      )}
      <div className="wk-body">
        <p className="wk-eye">
          {project.mvp ? <span className="wk-mvp"><Tx pt={dict.pt.projectsUi.mvpBadge} en={dict.en.projectsUi.mvpBadge} /></span> : null}
          <Tx pt={project.eyebrow} en={en.eyebrow} />
        </p>
        <h3>
          <Link href={href}><Tx pt={project.name} en={en.name} /></Link>
        </h3>
        <p className="wk-cat"><Tx pt={project.cat} en={en.cat} /></p>
        <p className="wk-ov"><Tx pt={project.overview[0]} en={en.overview[0]} /></p>
        <ProjectActions project={project} />
      </div>
    </article>
  );
}
