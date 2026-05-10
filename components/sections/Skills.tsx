"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { skills } from "@/data/skills";
import type { SkillCategory } from "@/data/skills";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { useI18n } from "@/lib/i18n";

const categories: SkillCategory[] = ["frontend", "backend", "tools", "ai"];

function SkillRow({
  category,
  delay,
}: {
  category: SkillCategory;
  delay: number;
}) {
  const { t } = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const categorySkills = useMemo(
    () => skills.filter((skill) => skill.category === category),
    [category],
  );

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    function updateOverflow() {
      if (!container) {
        return;
      }

      setHasOverflow(container.scrollWidth > container.clientWidth + 1);
      setActiveIndex((current) => Math.min(current, categorySkills.length - 1));
    }

    updateOverflow();

    const resizeObserver = new ResizeObserver(updateOverflow);
    resizeObserver.observe(container);

    window.addEventListener("resize", updateOverflow);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateOverflow);
    };
  }, [categorySkills.length]);

  function updateActiveIndex() {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(container.children).forEach((child, index) => {
      const element = child as HTMLElement;
      const distance = Math.abs(element.offsetLeft - container.scrollLeft);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }

  function scroll(direction: "left" | "right") {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    const nextIndex =
      direction === "left"
        ? Math.max(activeIndex - 1, 0)
        : Math.min(activeIndex + 1, categorySkills.length - 1);
    const target = container.children.item(nextIndex) as HTMLElement | null;

    if (!target) {
      return;
    }

    setActiveIndex(nextIndex);

    container.scrollTo({
      left: target.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <FadeIn delay={delay}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {t.skills.categories[category]}
          </h3>

          {hasOverflow ? (
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="grid h-8 w-8 place-items-center rounded-md border border-[#dfdeda] text-zinc-700 transition hover:border-[#0a66c2] hover:bg-[#e8f3ff] hover:text-[#0a66c2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-[#70b5f9] dark:hover:bg-[#0a66c2]/10 dark:hover:text-[#70b5f9]"
                aria-label={`${t.skills.previous}: ${t.skills.categories[category]}`}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                className="grid h-8 w-8 place-items-center rounded-md border border-[#dfdeda] text-zinc-700 transition hover:border-[#0a66c2] hover:bg-[#e8f3ff] hover:text-[#0a66c2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-[#70b5f9] dark:hover:bg-[#0a66c2]/10 dark:hover:text-[#70b5f9]"
                aria-label={`${t.skills.next}: ${t.skills.categories[category]}`}
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
      </FadeIn>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-white to-transparent dark:from-zinc-950" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-white to-transparent dark:from-zinc-950" />

        <div
          ref={scrollRef}
          onScroll={updateActiveIndex}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categorySkills.map((skill, index) => (
            <FadeIn
              key={skill.name}
              delay={index * 0.03}
              className="w-full shrink-0 snap-start sm:w-[132px]"
            >
              <SkillIcon {...skill} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="bg-transparent px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle
            eyebrow={t.skills.eyebrow}
            title={t.skills.title}
            description={t.skills.description}
          />
        </FadeIn>

        <div className="space-y-8 rounded-lg border border-[#dfdeda] bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          {categories.map((category, categoryIndex) => (
            <SkillRow key={category} category={category} delay={categoryIndex * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
