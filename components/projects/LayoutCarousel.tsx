"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/data/projects";
import { dict } from "@/lib/i18n/dict";
import { localizeProject } from "@/lib/i18n/localize";
import { casePath } from "@/lib/projects/catalog";
import Tx from "../Tx";
import ProjectActions from "./ProjectActions";
import StackTags from "./StackTags";

function thumbSrc(file: string) {
  return file.startsWith("/") ? file : `/thumbnails/${file}`;
}

function layoutFor(width: number) {
  if (width < 640) return { cw: Math.round(width * 0.82), pitch: 0.46, vis: 1, rot: 0 };
  if (width < 1024) return { cw: Math.min(560, Math.round(width * 0.7)), pitch: 0.5, vis: 1, rot: 7 };
  return { cw: Math.min(720, Math.round(width * 0.46)), pitch: 0.52, vis: 2, rot: 9 };
}

export default function LayoutCarousel({ projects }: { projects: Project[] }) {
  const [cur, setCur] = useState(0);
  const [width, setWidth] = useState(1440);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const resize = () => setWidth(window.innerWidth);
    resize();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMq = () => setReduced(mq.matches);
    syncMq();
    window.addEventListener("resize", resize);
    mq.addEventListener("change", syncMq);
    return () => {
      window.removeEventListener("resize", resize);
      mq.removeEventListener("change", syncMq);
    };
  }, []);

  const L = useMemo(() => layoutFor(width), [width]);
  const n = projects.length;
  const active = projects[cur];

  const offsetOf = (i: number) => {
    if (!n) return 0;
    let r = i - cur;
    if (r > n / 2) r -= n;
    if (r < -n / 2) r += n;
    return r;
  };

  const go = (i: number) => {
    if (!n) return;
    setCur(((i % n) + n) % n);
  };

  if (!n || !active) {
    return (
      <p className="pempty">
        <Tx pt={dict.pt.projectsUi.empty} en={dict.en.projectsUi.empty} />
      </p>
    );
  }

  const en = localizeProject(active, "en");
  const preview = dict.pt.projectsUi.preview;
  const sh = Math.round(L.cw * (width < 768 ? 0.92 : 0.68) + 48);

  return (
    <div className="lo-e">
      <div
        className="lo-e-stage"
        style={{ height: sh, ["--lo-cw" as string]: `${L.cw}px` }}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={dict.pt.projectsUi.carouselLabel}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            go(cur + 1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            go(cur - 1);
          }
        }}
      >
        {projects.map((project, i) => {
          const o = offsetOf(i);
          const a = Math.abs(o);
          const hidden = a > L.vis;
          const x = o * L.cw * L.pitch;
          const rot = reduced ? 0 : o * -L.rot;
          const loc = localizeProject(project, "en");
          return (
            <article
              key={project.id}
              className={`lo-e-card${o === 0 ? " on" : ""}`}
              style={{
                transform: `translateX(${x}px) rotateY(${rot}deg)`,
                zIndex: o === 0 ? 40 : 20 - a,
                opacity: hidden ? 0 : 1,
                pointerEvents: hidden ? "none" : "auto",
              }}
              aria-hidden={hidden}
            >
              <button
                type="button"
                className="lo-e-hit"
                tabIndex={o === 0 ? 0 : -1}
                aria-label={`${dict.pt.projectsUi.select}${project.name}`}
                onClick={() => (o === 0 ? go(cur) : go(i))}
              >
                {project.img ? (
                  // eslint-disable-next-line @next/next/no-img-element -- preview option, not LCP
                  <img
                    src={thumbSrc(project.img)}
                    alt={`${preview}${project.name}`}
                    width={project.dw}
                    height={project.dh}
                  />
                ) : (
                  <span className="lo-e-ph"><Tx pt={project.name} en={loc.name} /></span>
                )}
              </button>
              {o === 0 ? (
                <div className="lo-e-ov">
                  {project.mvp ? <span className="wk-mvp"><Tx pt={dict.pt.projectsUi.mvpBadge} en={dict.en.projectsUi.mvpBadge} /></span> : null}
                  <h3><Tx pt={project.name} en={loc.name} /></h3>
                </div>
              ) : null}
            </article>
          );
        })}
        <button type="button" className="lo-e-nav l" aria-label={dict.pt.projectsUi.prev} onClick={() => go(cur - 1)}>
          ‹
        </button>
        <button type="button" className="lo-e-nav r" aria-label={dict.pt.projectsUi.next} onClick={() => go(cur + 1)}>
          ›
        </button>
      </div>
      <div className="lo-e-dots" role="tablist" aria-label={dict.pt.projectsUi.dots}>
        {projects.map((project, i) => (
          <button
            key={project.id}
            type="button"
            role="tab"
            aria-selected={i === cur}
            className={i === cur ? "on" : undefined}
            aria-label={`${dict.pt.projectsUi.goTo}${project.name}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
      <div className="lo-e-detail">
        <p className="wk-eye">
          {active.mvp ? <span className="wk-mvp"><Tx pt={dict.pt.projectsUi.mvpBadge} en={dict.en.projectsUi.mvpBadge} /></span> : null}
          <Tx pt={active.cat} en={en.cat} />
        </p>
        <h3><Tx pt={active.title} en={en.title} /></h3>
        <p className="lo-purpose"><Tx pt={active.overview[0]} en={en.overview[0]} /></p>
        <StackTags stack={active.stack} />
        <ProjectActions project={active} />
        <a className="sr" href={casePath(active.id)}>{active.name}</a>
      </div>
    </div>
  );
}
