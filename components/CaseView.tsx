"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import { dict } from "@/lib/i18n/dict";
import { localizeProject } from "@/lib/i18n/localize";
import { useLang } from "@/lib/i18n/store";
import { isGithubUrl } from "@/lib/projects/explore";
import Tx from "./Tx";

function thumbSrc(file: string) {
  return file.startsWith("/") ? file : `/thumbnails/${file}`;
}

export default function CaseView({ project }: { project: Project }) {
  const lang = useLang();
  const en = localizeProject(project, "en");
  const ui = dict.pt.projectsUi;
  const uien = dict.en.projectsUi;
  const altUi = dict[lang].projectsUi;
  const webp = /\.webp$/i.test(project.img);
  const mwebp = /\.webp$/i.test(project.mimg);
  const avif = webp ? project.img.replace(/\.webp$/i, ".avif") : null;
  const mavif = mwebp ? project.mimg.replace(/\.webp$/i, ".avif") : null;
  const github = isGithubUrl(project.url) ? project.url : project.repo;
  const site = project.url && !isGithubUrl(project.url) ? project.url : null;
  const inspiration = lang === "en" ? en.inspiration : project.inspiration;

  return (
    <article className="czcase">
      <p className="wk-back">
        <Link href="/#projetos">
          <Tx pt={ui.backToWork} en={uien.backToWork} />
        </Link>
      </p>
      <p className="wk-eye">
        {project.mvp ? <span className="wk-mvp"><Tx pt={ui.mvpBadge} en={uien.mvpBadge} /></span> : null}
        <Tx pt={project.eyebrow} en={en.eyebrow} />
      </p>
      <h1><Tx pt={project.title} en={en.title} /></h1>
      <p className="wk-as"><Tx pt={project.association} en={en.association} /></p>
      {inspiration?.href ? (
        <p className="wk-insp">
          <a href={inspiration.href} target="_blank" rel="noopener">
            {inspiration.text}
          </a>
        </p>
      ) : null}
      {project.img ? (
        <div className="cz-hero">
          <picture>
            {avif ? <source srcSet={thumbSrc(avif)} type="image/avif" /> : null}
            <img
              src={thumbSrc(project.img)}
              alt={`${altUi.preview}${project.name} (${altUi.desktop})`}
              width={project.dw}
              height={project.dh}
            />
          </picture>
          {project.mimg ? (
            <picture className="cz-mobile">
              {mavif ? <source srcSet={thumbSrc(mavif)} type="image/avif" /> : null}
              <img
                src={thumbSrc(project.mimg)}
                alt={`${altUi.preview}${project.name} (${altUi.mobile})`}
                width={project.mw}
                height={project.mh}
              />
            </picture>
          ) : null}
        </div>
      ) : null}
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
        {project.limits ? (
          <section>
            <h2><Tx pt={ui.buildLimits} en={uien.buildLimits} /></h2>
            <p><Tx pt={project.limits} en={en.limits ?? project.limits} /></p>
          </section>
        ) : null}
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
        {project.contributions.length ? (
          <section>
            <h2><Tx pt={project.contributionsTitle} en={en.contributionsTitle} /></h2>
            <ul>
              {project.contributions.map((item, i) => (
                <li key={i}><Tx pt={item} en={en.contributions[i] ?? item} /></li>
              ))}
            </ul>
          </section>
        ) : null}
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
        {project.demo ? (
          <a className="go2" href={project.demo} target="_blank" rel="noopener">
            <Tx pt={ui.visitDemo} en={uien.visitDemo} />
          </a>
        ) : site ? (
          <a className="go2" href={site} target="_blank" rel="noopener">
            <Tx pt={ui.visit} en={uien.visit} />
          </a>
        ) : null}
        {github ? (
          <a className={project.demo || site ? "wk-ext" : "go2"} href={github} target="_blank" rel="noopener">
            <Tx pt={ui.visitGithub} en={uien.visitGithub} />
          </a>
        ) : null}
      </p>
    </article>
  );
}
