"use client";

import { valueProps } from "@/data/value-props";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useI18n } from "@/lib/i18n";

const statValues = ["2+", "10+"];

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="bg-transparent px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle
            eyebrow={t.about.eyebrow}
            title={t.about.title}
            description={t.about.description}
            titleClassName="mx-auto mt-3 max-w-3xl font-display text-2xl font-bold leading-tight text-zinc-950 dark:text-white sm:text-3xl lg:text-4xl"
            descriptionClassName="mx-auto mt-4 max-w-2xl text-center text-sm leading-7 text-zinc-600 dark:text-zinc-400"
          />
        </FadeIn>

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {valueProps.map(({ icon: Icon }, index) => (
            <FadeIn key={t.valueProps[index].title} delay={index * 0.12}>
              <article className="flex h-full flex-col rounded-lg border border-[#dfdeda] bg-white p-5 shadow-sm transition hover:border-[#b4d6f5] hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-[#0a66c2]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#e8f3ff] text-[#0a66c2] dark:bg-[#0a66c2]/15 dark:text-[#70b5f9]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold leading-6 text-zinc-950 dark:text-white">
                  {t.valueProps[index].title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {t.valueProps[index].desc}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {t.about.stats.map((label, index) => (
            <FadeIn key={label} direction="up" delay={index * 0.12}>
              <div className="h-full rounded-lg border border-[#dfdeda] bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <p className="font-display text-3xl font-bold leading-none text-zinc-950 dark:text-white">
                  {statValues[index]}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-zinc-600 dark:text-zinc-300">
                  {label}
                </p>
              </div>
            </FadeIn>
          ))}

          <FadeIn direction="up" delay={0.24}>
            <div className="h-full rounded-lg border border-[#dfdeda] bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {t.about.stackTitle}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.about.stack.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md bg-[#f4f2ee] px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
