"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useI18n } from "@/lib/i18n";

export function Experience() {
  const { t } = useI18n();

  return (
    <section id="experience" className="bg-transparent px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <SectionTitle
            eyebrow={t.experience.eyebrow}
            title={t.experience.title}
            description={t.experience.description}
          />
        </FadeIn>

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-zinc-200 dark:bg-zinc-800 sm:block" />
          <div className="space-y-6">
            {t.experience.items.map((item, index) => (
              <FadeIn key={`${item.role}-${item.period}`} delay={index * 0.1} direction="left">
                <article className="relative rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:ml-12">
                  <span className="absolute -left-[2.55rem] top-7 hidden h-4 w-4 rounded-full border-4 border-white bg-[#0a66c2] shadow-sm dark:border-zinc-950 sm:block" />
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-xl font-bold leading-tight text-zinc-950 dark:text-white">
                          {item.role}
                        </h3>
                        {index === 0 ? (
                          <span className="rounded-md bg-[#e8f3ff] px-2 py-1 text-xs font-bold uppercase text-[#0a66c2] dark:bg-[#0a66c2]/15 dark:text-[#70b5f9]">
                            {t.experience.current}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 font-semibold text-zinc-700 dark:text-zinc-200">
                        {item.company}
                      </p>
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        {item.location}
                      </p>
                    </div>
                    <p className="shrink-0 rounded-md bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {item.period}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a66c2]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
