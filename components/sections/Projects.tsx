"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const projectMeta = [
  {
    id: "fiturban",
    url: "https://www.fiturban.com.br/",
    screenshot: "/thumbnails/fiturban-screenshot.jpg",
    mobileScreenshot: "/thumbnails/fiturban-screenshot-mobile.jpg",
  },
  {
    id: "hotrio",
    url: "https://www.hotrio.com.br/",
    screenshot: "/thumbnails/hotrio-screenshot-card.jpg",
    mobileScreenshot: "/thumbnails/hotrio-screenshot-mobile.jpg",
  },
  {
    id: "mckhome",
    url: "https://www.mckhome.com.br/",
    screenshot: "/thumbnails/mckhome-screenshot-card.jpg",
    mobileScreenshot: "/thumbnails/mckhome-screenshot-mobile.jpg",
  },
  {
    id: "serralheria",
    url: "https://www.serralheria.com.br/",
    screenshot: "/thumbnails/serralheria-screenshot-card.jpg",
    mobileScreenshot: "/thumbnails/serralheria-screenshot-mobile.jpg",
  },
  {
    id: "lojaultra",
    url: "https://www.lojadaultra.com.br/",
    screenshot: "/thumbnails/lojaultra-screenshot-card.jpg",
    mobileScreenshot: "/thumbnails/lojaultra-screenshot-mobile.jpg",
  },
  {
    id: "tubaraocenter",
    url: "https://tubaraocenter.com.br/",
    screenshot: "/thumbnails/tubaraocenter-screenshot-card.jpg",
    mobileScreenshot: "/thumbnails/tubaraocenter-screenshot-mobile.jpg",
  },
  {
    id: "useloft",
    url: "https://viaveneto.com.br/pages/loft",
    screenshot: "/thumbnails/useloft-screenshot-card.jpg",
    mobileScreenshot: "/thumbnails/useloft-screenshot-mobile.jpg",
  },
  {
    id: "viaveneto",
    url: "https://viaveneto.com.br/",
    screenshot: "/thumbnails/viaveneto-screenshot-card.jpg",
    mobileScreenshot: "/thumbnails/viaveneto-screenshot-mobile.jpg",
  },
  {
    id: "yamuna",
    url: "https://www.yamuna.com.br/",
    screenshot: "/thumbnails/yamuna-screenshot-card.jpg",
    mobileScreenshot: "/thumbnails/yamuna-screenshot-mobile.jpg",
  },
  {
    id: "webcine",
    url: "https://webcinetv.com.br/",
    screenshot: "/thumbnails/webcine-screenshot-card.jpg",
    mobileScreenshot: "/thumbnails/webcine-screenshot-mobile.jpg",
  },
] as const;

function getCarouselLayout(viewportWidth: number) {
  if (viewportWidth < 375) {
    return {
      cardWidth: Math.round(viewportWidth * 0.88),
      stageHeight: 600,
      visibleOffset: 0,
      gap: 0.86,
      scales: { first: 0.72, second: 0.5 },
      sideY: 22,
      rotate: 12,
    };
  }

  if (viewportWidth < 425) {
    return {
      cardWidth: Math.round(viewportWidth * 0.86),
      stageHeight: 630,
      visibleOffset: 0,
      gap: 0.84,
      scales: { first: 0.72, second: 0.5 },
      sideY: 22,
      rotate: 12,
    };
  }

  if (viewportWidth < 640) {
    return {
      cardWidth: Math.min(Math.round(viewportWidth * 0.84), 380),
      stageHeight: 660,
      visibleOffset: 0,
      gap: 0.82,
      scales: { first: 0.74, second: 0.5 },
      sideY: 24,
      rotate: 13,
    };
  }

  if (viewportWidth < 768) {
    return {
      cardWidth: Math.min(Math.round(viewportWidth * 0.82), 560),
      stageHeight: 620,
      visibleOffset: 1,
      gap: 0.82,
      scales: { first: 0.74, second: 0.52 },
      sideY: 26,
      rotate: 14,
    };
  }

  if (viewportWidth < 1024) {
    return {
      cardWidth: Math.min(Math.round(viewportWidth * 0.78), 650),
      stageHeight: 700,
      visibleOffset: 1,
      gap: 0.82,
      scales: { first: 0.74, second: 0.52 },
      sideY: 28,
      rotate: 15,
    };
  }

  if (viewportWidth < 1240) {
    return {
      cardWidth: 760,
      stageHeight: 760,
      visibleOffset: 2,
      gap: 0.64,
      scales: { first: 0.66, second: 0.48 },
      sideY: 30,
      rotate: 17,
    };
  }

  if (viewportWidth < 1366) {
    return {
      cardWidth: 840,
      stageHeight: 790,
      visibleOffset: 2,
      gap: 0.64,
      scales: { first: 0.66, second: 0.48 },
      sideY: 30,
      rotate: 17,
    };
  }

  if (viewportWidth < 1520) {
    return {
      cardWidth: 900,
      stageHeight: 820,
      visibleOffset: 2,
      gap: 0.64,
      scales: { first: 0.66, second: 0.48 },
      sideY: 32,
      rotate: 18,
    };
  }

  if (viewportWidth < 1920) {
    return {
      cardWidth: 980,
      stageHeight: 880,
      visibleOffset: 2,
      gap: 0.63,
      scales: { first: 0.65, second: 0.47 },
      sideY: 34,
      rotate: 18,
    };
  }

  return {
    cardWidth: Math.min(Math.round(viewportWidth * 0.56), 1240),
    stageHeight: Math.min(Math.round(viewportWidth * 0.52), 1060),
    visibleOffset: 2,
    gap: 0.62,
    scales: { first: 0.64, second: 0.46 },
    sideY: 36,
    rotate: 18,
  };
}

function getCircularOffset(index: number, current: number, total: number) {
  const raw = index - current;
  const half = total / 2;

  if (raw > half) {
    return raw - total;
  }

  if (raw < -half) {
    return raw + total;
  }

  return raw;
}

function useViewportWidth() {
  const [viewportWidth, setViewportWidth] = useState(1366);

  useEffect(() => {
    function updateViewportWidth() {
      setViewportWidth(window.innerWidth);
    }

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);

    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  return viewportWidth;
}

function ProjectScreenshot({
  alt,
  desktopSrc,
  mobileSrc,
  priority,
  zoomOnHover,
  useMobileScreenshot,
}: {
  alt: string;
  desktopSrc: string;
  mobileSrc: string;
  priority: boolean;
  zoomOnHover: boolean;
  useMobileScreenshot: boolean;
}) {
  const preferredSrc = useMobileScreenshot ? mobileSrc : desktopSrc;

  return (
    <Image
      src={preferredSrc}
      alt={alt}
      fill
      priority={priority}
      className={cn(
        "object-cover object-top transition-transform duration-500 ease-out sm:object-contain",
        zoomOnHover && "group-hover:scale-[1.035]",
      )}
      sizes="(min-width: 1280px) 860px, (min-width: 1024px) 760px, (min-width: 640px) 620px, 82vw"
    />
  );
}

type CaseStudy = {
  eyebrow: string;
  title: string;
  association: string;
  overview: readonly string[];
  contributionsTitle: string;
  contributions: readonly string[];
  stackTitle: string;
  stack: readonly string[];
};

function ProjectCaseStudy({ caseStudy, url }: { caseStudy: CaseStudy; url?: string }) {
  const { t } = useI18n();

  return (
    <FadeIn className="mx-auto mt-8 max-w-5xl sm:mt-10">
      <article className="overflow-hidden rounded-lg border border-[#dfdeda] bg-white/92 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/82">
        <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#0a66c2] dark:text-[#70b5f9]">
              {caseStudy.eyebrow}
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-zinc-950 dark:text-white sm:text-3xl">
              {caseStudy.title}
            </h3>
            <p className="mt-3 text-sm font-semibold leading-6 text-zinc-700 dark:text-zinc-300">
              {caseStudy.association}
            </p>

            <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
              {caseStudy.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-md bg-[#0a66c2] px-4 text-sm font-semibold text-white transition hover:bg-[#004182] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 dark:bg-[#70b5f9] dark:text-zinc-950 dark:hover:bg-[#a8d4ff] dark:focus-visible:ring-[#70b5f9] dark:focus-visible:ring-offset-zinc-950"
              >
                {t.projects.visit}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>

          <div className="grid gap-6">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-zinc-950 dark:text-white">
                {caseStudy.contributionsTitle}
              </h4>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {caseStudy.contributions.map((contribution) => (
                  <li key={contribution} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a66c2] dark:bg-[#70b5f9]" />
                    <span>{contribution}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-zinc-950 dark:text-white">
                {caseStudy.stackTitle}
              </h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {caseStudy.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-[#dfdeda] bg-[#f4f2ee] px-2.5 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </FadeIn>
  );
}

export function Projects() {
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);
  const viewportWidth = useViewportWidth();
  const shouldReduceMotion = useReducedMotion();
  const layout = getCarouselLayout(viewportWidth);
  const useMobileScreenshot = viewportWidth < 640;
  const total = Math.min(t.projects.items.length, projectMeta.length);
  const activeMeta = projectMeta[current];
  const activeUrl = "url" in activeMeta ? activeMeta.url : undefined;
  const activeCaseStudy =
    activeMeta.id in t.projects.caseStudies
      ? t.projects.caseStudies[activeMeta.id as keyof typeof t.projects.caseStudies]
      : null;

  const slides = useMemo(
    () =>
      projectMeta.slice(0, total).map((meta, index) => ({
        meta,
        project: t.projects.items[index],
        index,
        offset: getCircularOffset(index, current, total),
      })),
    [current, t.projects.items, total],
  );

  function goTo(index: number) {
    setCurrent((index + total) % total);
  }

  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden bg-[#f8fbff] px-4 py-14 text-zinc-950 dark:bg-zinc-950 sm:px-5 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(232,243,255,0.78)_0%,rgba(255,255,255,0.92)_46%,rgba(244,242,238,0.7)_100%)] dark:bg-[linear-gradient(135deg,rgba(10,102,194,0.14)_0%,rgba(9,9,11,0.96)_52%,rgba(9,9,11,1)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#f4f2ee] to-transparent dark:from-[#09090b]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f4f2ee] to-transparent dark:from-[#09090b]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeIn className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wide text-[#0a66c2] dark:text-[#70b5f9]">
              {t.projects.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-zinc-950 dark:text-white sm:text-4xl lg:text-5xl">
              {t.projects.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
              {t.projects.description}
            </p>
          </div>

          <div className="hidden md:block" aria-hidden="true" />
        </FadeIn>

        <FadeIn>
          <div
            className="relative left-1/2 mt-8 w-screen -translate-x-1/2 overflow-hidden sm:mt-10"
            style={{ minHeight: layout.stageHeight }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ perspective: "2000px" }}
            >
              {slides.map(({ meta, project, index, offset }) => {
                const active = offset === 0;
                const absOffset = Math.abs(offset);
                const visible = absOffset <= layout.visibleOffset;
                const dimOpacity = active ? 0 : absOffset === 1 ? 0.58 : 0.78;
                const scale =
                  active ? 1 : absOffset === 1 ? layout.scales.first : layout.scales.second;
                const projectUrl = "url" in meta ? meta.url : undefined;

                return (
                  <button
                    key={meta.id}
                    type="button"
                    onClick={() => {
                      if (active && projectUrl) {
                        window.open(projectUrl, "_blank", "noopener,noreferrer");
                        return;
                      }

                      goTo(index);
                    }}
                    className={cn(
                      "group absolute cursor-pointer overflow-hidden rounded-lg border bg-white text-left shadow-2xl shadow-zinc-950/18 outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fbff] dark:bg-zinc-950 dark:shadow-black/60 dark:focus-visible:ring-[#70b5f9] dark:focus-visible:ring-offset-zinc-950",
                      active
                        ? "border-[#0a66c2]/35 shadow-zinc-950/28 dark:border-white/28 dark:shadow-black/90"
                        : "border-zinc-200 hover:border-[#8ec5f4] dark:border-white/12 dark:hover:border-white/35",
                      !visible && "pointer-events-none",
                    )}
                    style={{
                      width: layout.cardWidth,
                      transform: `translateX(${offset * layout.cardWidth * layout.gap}px) translateY(${active ? 0 : layout.sideY}px) rotateY(${offset * -layout.rotate}deg) scale(${scale})`,
                      opacity: visible ? 1 : 0,
                      zIndex: active ? 50 : 10 - absOffset,
                      transformStyle: "preserve-3d",
                      transition: shouldReduceMotion
                        ? "none"
                        : "transform 950ms cubic-bezier(0.22, 1, 0.36, 1), opacity 720ms ease, box-shadow 720ms ease, border-color 720ms ease",
                      willChange: "transform, opacity",
                    }}
                    aria-label={`${t.projects.select}: ${project.storeName}`}
                    aria-current={active}
                  >
                    <div className="relative aspect-[3/4] bg-white sm:aspect-[4/3] dark:bg-zinc-950">
                      <ProjectScreenshot
                        alt={`${t.projects.previewAlt}: ${project.storeName}`}
                        desktopSrc={meta.screenshot}
                        mobileSrc={meta.mobileScreenshot}
                        priority={active}
                        zoomOnHover={visible && !shouldReduceMotion}
                        useMobileScreenshot={useMobileScreenshot}
                      />
                      <div
                        className={cn(
                          "pointer-events-none absolute inset-0 bg-black transition-opacity duration-700 ease-out",
                          shouldReduceMotion && "transition-none",
                        )}
                        style={{ opacity: dimOpacity }}
                      />
                      <div
                        className={cn(
                          "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-4 pb-5 pt-20 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-8 sm:pb-7 sm:pt-32",
                          active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                          shouldReduceMotion && "transition-none",
                        )}
                      >
                        <p className="text-xs font-medium leading-5 text-zinc-300 sm:text-sm">
                          {project.category}
                        </p>
                        <h3 className="mt-2 font-project text-4xl font-normal uppercase leading-none text-white min-[375px]:text-5xl sm:text-5xl lg:text-6xl">
                          {project.storeName}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-300 sm:mt-4">
                          {projectUrl ? t.projects.visit : t.projects.details}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => goTo(current - 1)}
              className="absolute top-1/2 z-[70] hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-zinc-200/80 bg-white/72 text-zinc-700 shadow-md shadow-zinc-950/10 backdrop-blur transition hover:-translate-x-0.5 hover:bg-white hover:text-[#0a66c2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fbff] dark:border-white/12 dark:bg-zinc-950/58 dark:text-zinc-200 dark:shadow-black/25 dark:hover:bg-zinc-950/82 dark:hover:text-[#70b5f9] dark:focus-visible:ring-[#70b5f9] dark:focus-visible:ring-offset-zinc-950 md:grid"
              style={{
                left: `calc(50% - ${layout.cardWidth / 2}px + 18px)`,
              }}
              aria-label={t.projects.previous}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => goTo(current + 1)}
              className="absolute top-1/2 z-[70] hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-zinc-200/80 bg-white/72 text-zinc-700 shadow-md shadow-zinc-950/10 backdrop-blur transition hover:translate-x-0.5 hover:bg-white hover:text-[#0a66c2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fbff] dark:border-white/12 dark:bg-zinc-950/58 dark:text-zinc-200 dark:shadow-black/25 dark:hover:bg-zinc-950/82 dark:hover:text-[#70b5f9] dark:focus-visible:ring-[#70b5f9] dark:focus-visible:ring-offset-zinc-950 md:grid"
              style={{
                right: `calc(50% - ${layout.cardWidth / 2}px + 18px)`,
              }}
              aria-label={t.projects.next}
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="absolute inset-x-0 bottom-8 flex items-center justify-center sm:bottom-0">
              <div className="flex items-center gap-3 rounded-full border border-[#dfdeda] bg-white/92 p-1.5 shadow-lg shadow-zinc-950/10 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/92 dark:shadow-black/30 md:hidden">
                <button
                  type="button"
                  onClick={() => goTo(current - 1)}
                  className="grid h-10 w-10 place-items-center rounded-full text-zinc-700 transition hover:bg-[#e8f3ff] hover:text-[#0a66c2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 dark:text-zinc-300 dark:hover:bg-[#0a66c2]/15 dark:hover:text-[#70b5f9] dark:focus-visible:ring-[#70b5f9] dark:focus-visible:ring-offset-zinc-950"
                  aria-label={t.projects.previous}
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                <p className="min-w-14 text-center text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </p>

                <button
                  type="button"
                  onClick={() => goTo(current + 1)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#0a66c2] text-white transition hover:bg-[#004182] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 dark:bg-[#70b5f9] dark:text-zinc-950 dark:hover:bg-[#a8d4ff] dark:focus-visible:ring-[#70b5f9] dark:focus-visible:ring-offset-zinc-950"
                  aria-label={t.projects.next}
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-[#dfdeda] bg-white/90 px-4 py-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90 md:flex" aria-label={t.projects.indicators}>
                {projectMeta.slice(0, total).map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(index)}
                    className={cn(
                      "h-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 dark:focus-visible:ring-[#70b5f9] dark:focus-visible:ring-offset-zinc-950",
                      index === current
                        ? "w-8 bg-[#0a66c2] dark:bg-[#70b5f9]"
                        : "w-2 bg-zinc-300 hover:bg-[#8ec5f4] dark:bg-zinc-700 dark:hover:bg-[#70b5f9]/60",
                    )}
                    aria-label={`${t.projects.goTo} ${t.projects.items[index].storeName}`}
                    aria-current={index === current}
                  />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {activeCaseStudy ? (
          <ProjectCaseStudy caseStudy={activeCaseStudy} url={activeUrl} />
        ) : null}
      </div>
    </section>
  );
}
