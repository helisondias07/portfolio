"use client";

import type { MouseEvent } from "react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { siGmail } from "simple-icons";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useI18n } from "@/lib/i18n";
import { contactLinks } from "@/lib/utils";

const linkedInPath =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z";

function BrandIcon({ path, label }: { path: string; label: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-label={label}
    >
      <path d={path} />
    </svg>
  );
}

export function Contact() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  function openEmail(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    const popup = window.open(
      contactLinks.gmail,
      "gmail-compose",
      "width=720,height=680,left=160,top=80",
    );

    if (!popup) {
      window.location.href = contactLinks.email;
    }
  }

  async function copyEmail(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    try {
      await navigator.clipboard.writeText(contactLinks.emailAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = contactLinks.email;
    }
  }

  return (
    <section id="contact" className="bg-transparent px-4 py-16 sm:px-5 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <SectionTitle
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            description={t.contact.description}
          />
        </FadeIn>

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          <FadeIn direction="right">
            <a
              href={contactLinks.email}
              onClick={openEmail}
              className="group flex h-full min-w-0 flex-col rounded-lg border border-[#dfdeda] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#b4d6f5] hover:bg-[#f8fbff] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-[#0a66c2] dark:hover:bg-[#0a66c2]/10 sm:min-h-60"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e8f3ff] text-[#0a66c2] ring-1 ring-[#cfe7fb] dark:bg-[#0a66c2]/15 dark:text-[#70b5f9] dark:ring-[#0a66c2]/25">
                  <BrandIcon path={siGmail.path} label="Gmail" />
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0a66c2]" />
              </div>
              <div className="mt-6 flex flex-1 flex-col">
                <p className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {t.contact.emailTitle}
                </p>
                <p className="mt-2 text-base font-bold text-zinc-950 [overflow-wrap:anywhere] dark:text-white">
                  {contactLinks.emailAddress}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300 sm:min-h-12">
                  {t.contact.emailText}
                </p>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="mt-5 inline-flex min-h-9 w-fit items-center rounded-md border border-[#dfdeda] bg-white px-3 text-sm font-semibold text-[#0a66c2] transition hover:border-[#0a66c2] hover:bg-[#e8f3ff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-[#70b5f9] dark:hover:bg-[#0a66c2]/10"
                >
                  {copied ? t.contact.copiedEmail : t.contact.copyEmail}
                </button>
              </div>
            </a>
          </FadeIn>

          <FadeIn direction="left">
            <a
              href={contactLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full min-w-0 flex-col rounded-lg border border-[#dfdeda] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#b4d6f5] hover:bg-[#f8fbff] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-[#0a66c2] dark:hover:bg-[#0a66c2]/10 sm:min-h-60"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e8f3ff] text-[#0a66c2] ring-1 ring-[#cfe7fb] dark:bg-[#0a66c2]/15 dark:text-[#70b5f9] dark:ring-[#0a66c2]/25">
                  <BrandIcon path={linkedInPath} label="LinkedIn" />
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0a66c2]" />
              </div>
              <div className="mt-6 flex flex-1 flex-col">
                <p className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {t.contact.linkedinTitle}
                </p>
                <p className="mt-2 text-base font-bold text-zinc-950 [overflow-wrap:anywhere] dark:text-white">
                  linkedin.com/in/helisondias
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300 sm:min-h-12">
                  {t.contact.linkedinText}
                </p>
              </div>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
