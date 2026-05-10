"use client";

import { Languages } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle({ onChange }: { onChange?: () => void }) {
  const { language, setLanguage } = useI18n();

  return (
    <div
      className="inline-flex h-10 items-center gap-1 rounded-md border border-zinc-200 bg-white p-1 text-xs font-bold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
      aria-label="Language selector"
    >
      <Languages className="ml-1 h-4 w-4 text-[#0a66c2]" aria-hidden="true" />
      {(["pt", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => {
            setLanguage(option);
            onChange?.();
          }}
          className={cn(
            "h-7 rounded px-2 uppercase transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2",
            language === option
              ? "bg-[#0a66c2] text-white dark:bg-[#70b5f9] dark:text-zinc-950"
              : "hover:bg-[#e8f3ff] hover:text-[#0a66c2] dark:hover:bg-zinc-900 dark:hover:text-[#70b5f9]",
          )}
          aria-pressed={language === option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
