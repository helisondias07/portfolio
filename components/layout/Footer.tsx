"use client";

import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-[#dfdeda] bg-transparent px-4 py-8 text-center sm:px-5 sm:py-10 dark:border-zinc-800">
      <p className="mx-auto max-w-xs text-sm font-medium leading-6 text-zinc-700 sm:max-w-2xl dark:text-zinc-200">
        {t.footer.availabilityPrefix}{" "}
        <span className="font-semibold text-[#0a66c2] dark:text-[#70b5f9]">
          {t.footer.role}
        </span>{" "}
        {t.footer.availabilitySuffix}
      </p>

      <p className="mt-2 text-xs font-medium leading-5 text-zinc-500 dark:text-zinc-400">
        {t.footer.response}
      </p>

      <p className="mx-auto mt-7 max-w-xs text-xs leading-5 text-zinc-400 dark:text-zinc-600">
        © {new Date().getFullYear()} Helison Dias · {t.footer.madeWith}
      </p>
    </footer>
  );
}
