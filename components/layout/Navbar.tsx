"use client";

import { useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getCvFile } from "@/lib/cv";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { language, t } = useI18n();
  const cvFile = getCvFile(language);
  const navItems = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#dfdeda] bg-white/90 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/85">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="font-display rounded-md text-sm font-bold uppercase text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 dark:text-white"
        >
          Helison Dias
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-600 transition hover:bg-[#e8f3ff] hover:text-[#0a66c2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-[#70b5f9]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href={cvFile.href}
            download={cvFile.filename}
            className="inline-flex min-h-10 items-center gap-2 rounded-md bg-[#0a66c2] px-4 text-sm font-semibold text-white transition hover:bg-[#004182] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 dark:bg-[#70b5f9] dark:text-zinc-950 dark:hover:bg-[#a8d4ff]"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {t.nav.downloadCv}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-md border border-zinc-200 text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 dark:border-zinc-800 dark:text-white lg:hidden"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "border-t border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950 lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-2">
          <div className="mb-2 flex lg:justify-end gap-2">
            <LanguageToggle onChange={() => setOpen(false)} />
            <ThemeToggle />
          </div>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-semibold text-zinc-700 hover:bg-[#e8f3ff] hover:text-[#0a66c2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-[#70b5f9]"
            >
              {item.label}
            </a>
          ))}
          <a
            href={cvFile.href}
            download={cvFile.filename}
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#0a66c2] px-4 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 dark:bg-[#70b5f9] dark:text-zinc-950"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {t.nav.downloadCv}
          </a>
        </div>
      </div>
    </header>
  );
}
