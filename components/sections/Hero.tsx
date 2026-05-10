"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Download,
  GraduationCap,
  MapPin,
  Store,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getCvFile } from "@/lib/cv";
import { useI18n } from "@/lib/i18n";
import { contactLinks } from "@/lib/utils";

const coverTags = ["React", "Next.js", "TypeScript", "Wake", "AI Workflows"];

export function Hero() {
  const { language, t } = useI18n();
  const cvFile = getCvFile(language);

  return (
    <section id="top" className="relative isolate px-3 sm:px-5 pb-8 pt-12 sm:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-6xl rounded-lg border border-[#dfdeda] bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
      >
        <div className="relative h-36 overflow-hidden rounded-t-lg bg-[#0a66c2] sm:h-44">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.28),transparent_28%),linear-gradient(135deg,#0a66c2_0%,#004182_62%,#191919_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="absolute bottom-4 right-5 hidden flex-wrap justify-end gap-2 md:flex">
            {coverTags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1fr_320px] lg:px-8">
          <div>
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="relative -mt-14 h-32 w-32 shrink-0 self-center overflow-hidden rounded-full border-4 border-white bg-[#e8f3ff] shadow-md dark:border-zinc-950 sm:-mt-16 sm:h-40 sm:w-40 md:self-auto">
                <Image
                  src="/profile.jpg"
                  alt={t.about.imageAlt}
                  fill
                  priority
                  className="object-cover object-[50%_34%]"
                  sizes="160px"
                />
              </div>

              <div className="text-center md:text-left">
                <h1 className="font-display text-4xl font-bold leading-tight text-zinc-950 dark:text-white sm:text-5xl">
                  Helison Dias
                </h1>
                <p className="mt-1 max-w-2xl text-sm font-semibold leading-7 text-zinc-800 dark:text-zinc-100">
                  {t.hero.role}
                </p>
              </div>
            </div>

            <div className="mt-5 grid w-full gap-2 text-[0.7rem] font-semibold leading-none text-zinc-600 min-[360px]:text-xs md:flex md:flex-wrap dark:text-zinc-300">
              <span className="inline-flex min-h-9 w-full items-center gap-1.5 rounded-md bg-[#f4f2ee] px-3 py-2 whitespace-nowrap md:w-auto dark:bg-zinc-900">
                <MapPin className="h-4 w-4 shrink-0 text-[#0a66c2]" aria-hidden="true" />
                {t.hero.location}
              </span>
              <span className="inline-flex min-h-9 w-full items-center gap-1.5 rounded-md bg-[#f4f2ee] px-3 py-2 whitespace-nowrap md:w-auto dark:bg-zinc-900">
                <GraduationCap className="h-4 w-4 shrink-0 text-[#0a66c2]" aria-hidden="true" />
                {t.hero.education}
              </span>
              <span className="inline-flex min-h-9 w-full items-center gap-1.5 rounded-md bg-[#f4f2ee] px-3 py-2 whitespace-nowrap md:w-auto dark:bg-zinc-900">
                <BriefcaseBusiness className="h-4 w-4 shrink-0 text-[#0a66c2]" aria-hidden="true" />
                {t.hero.availability}
              </span>
            </div>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base">
              {t.hero.intro}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={cvFile.href} download={cvFile.filename} variant="secondary">
                <Download className="h-4 w-4" aria-hidden="true" />
                {t.nav.downloadCv}
              </Button>
              <Button href={contactLinks.linkedin} target="_blank" rel="noreferrer">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                </svg>
                LinkedIn
              </Button>
            </div>
          </div>

          <aside className="self-stretch lg:flex lg:items-center">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-lg border border-[#dfdeda] bg-white p-4 shadow-sm sm:p-5 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#e8f3ff] text-[#0a66c2] sm:h-11 sm:w-11 dark:bg-[#0a66c2]/15 dark:text-[#70b5f9]">
                  <Store className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </div>
                <p className="font-display text-xl font-bold leading-tight text-zinc-950 sm:text-2xl lg:text-[1.65rem] dark:text-white">
                  {t.hero.storesValue}
                </p>
                <p className="mt-1 text-xs font-bold uppercase leading-snug tracking-wide text-zinc-500 dark:text-zinc-400">
                  {t.hero.storesLabel}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {t.hero.storesText}
                </p>
              </div>

              <div className="rounded-lg bg-[#0a66c2] p-4 text-white shadow-sm sm:p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-white/15 sm:h-11 sm:w-11">
                  <Workflow className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </div>
                <p className="font-display text-xl font-bold leading-tight sm:text-2xl lg:text-[1.65rem]">
                  {t.hero.automationValue}
                </p>
                <p className="mt-1 text-xs font-bold uppercase leading-snug tracking-wide text-white/85">
                  {t.hero.automationLabel}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/85">
                  {t.hero.automationText}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </section>
  );
}
