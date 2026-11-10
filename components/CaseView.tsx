"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import { dict } from "@/lib/i18n/dict";
import { localizeProject } from "@/lib/i18n/localize";
import { useLang } from "@/lib/i18n/store";
import { isGithubUrl } from "@/lib/projects/explore";
import Tx from "./Tx";

function thumbSrc(file: string) {
  return `/thumbnails/${file}`;
}

export default function CaseView({ project }: { project: Project }) {
  const lang = useLang();
  const en = localizeProject(project, "en");
  const ui = dict.pt.projectsUi;
  const uien = dict.en.projectsUi;
  const altUi = dict[lang].projectsUi;
  const avif = project.img.replace(/\.webp$/i, ".avif");
  const mavif = project.mimg.replace(/\.webp$/i, ".avif");
  const primaryLabel = project.url
    ? isGithubUrl(project.url)
      ? { pt: ui.visitRepo, en: uien.visitRepo }
      : { pt: ui.visit, en: uien.visit }
    : null;
  const extraRepo = project.repo && project.repo !== project.url ? project.repo : null;

  return (
    <article className="czcase">
      <p className="wk-back">
        <Link href="/#projetos">
          <Tx pt={ui.backToWork} en={uien.backToWork} />
        </Link>
      </p>
      <p className="wk-eye"><Tx pt={project.eyebrow} en={en.eyebrow} /></p>
      <h1><Tx pt={project.title} en={en.title} /></h1>
      <p className="wk-as"><Tx pt={project.association} en={en.association} /></p>
      <div className="cz-hero">
        <picture>
          <source srcSet={thumbSrc(avif)} type="image/avif" />
          <img
            src={thumbSrc(project.img)}
            alt={`${altUi.preview}${project.name} (${altUi.desktop})`}
            width={project.dw}
            height={project.dh}
          />
        </picture>
        <picture className="cz-mobile">
          <source srcSet={thumbSrc(mavif)} type="image/avif" />
          <img
            src={thumbSrc(project.mimg)}
            alt={`${altUi.preview}${project.name} (${altUi.mobile})`}
            width={project.mw}
            height={project.mh}
          />
        </picture>
      </div>
      <div className="cz-grid">
        <section>
          <h2><Tx pt={ui.overview} en={uien.overview} /></h2>
          {project.overview.map((para, i) => (
            <p key={i}><Tx pt={para} en={en.overview[i] ?? para} /></p>
          ))}
          {project.resultado ? (
            <p className="res"><Tx pt={project.resultado} en={en.resultado || project.resultado} /></p>
          ) : null}
        </section>
        {project.build ? (
          <section>
            {project.build.problem ? (
              <>
                <h2><Tx pt={ui.buildProblem} en={uien.buildProblem} /></h2>
                <p><Tx pt={project.build.problem} en={en.build?.problem ?? project.build.problem} /></p>
              </>
            ) : null}
            {project.build.approach ? (
              <>
                <h2><Tx pt={ui.buildApproach} en={uien.buildApproach} /></h2>
                <p><Tx pt={project.build.approach} en={en.build?.approach ?? project.build.approach} /></p>
              </>
            ) : null}
            {project.build.decisions?.length ? (
              <>
                <h2><Tx pt={ui.buildDecisions} en={uien.buildDecisions} /></h2>
                <ul>
                  {project.build.decisions.map((item, i) => (
                    <li key={i}><Tx pt={item} en={en.build?.decisions?.[i] ?? item} /></li>
                  ))}
                </ul>
              </>
            ) : null}
            {project.build.learnings?.length ? (
              <>
                <h2><Tx pt={ui.buildLearnings} en={uien.buildLearnings} /></h2>
                <ul>
                  {project.build.learnings.map((item, i) => (
                    <li key={i}><Tx pt={item} en={en.build?.learnings?.[i] ?? item} /></li>
                  ))}
                </ul>
              </>
            ) : null}
          </section>
        ) : null}
        <section>
          <h2><Tx pt={project.contributionsTitle} en={en.contributionsTitle} /></h2>
          <ul>
            {project.contributions.map((item, i) => (
              <li key={i}><Tx pt={item} en={en.contributions[i] ?? item} /></li>
            ))}
          </ul>
        </section>
        <section>
          <h2><Tx pt={project.stackTitle} en={en.stackTitle} /></h2>
          <p className="kc">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
        </section>
      </div>
      <p className="cz-acts">
        {primaryLabel ? (
          <a className="go2" href={project.url} target="_blank" rel="noopener">
            <Tx pt={primaryLabel.pt} en={primaryLabel.en} />
          </a>
        ) : null}
        {extraRepo ? (
          <a className="wk-ext" href={extraRepo} target="_blank" rel="noopener">
            <Tx pt={ui.visitRepo} en={uien.visitRepo} />
          </a>
        ) : null}
      </p>
    </article>
  );
}
