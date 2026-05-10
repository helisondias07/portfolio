import type { Language } from "@/lib/i18n";

const cvFiles = {
  pt: {
    href: "/cv/helison-dias-cv.pdf",
    filename: "helison-dias-cv.pdf",
  },
  en: {
    href: "/cv/helison-dias-cv.pdf",
    filename: "helison-dias-cv.pdf",
  },
} as const satisfies Record<Language, { href: string; filename: string }>;

export function getCvFile(language: Language) {
  return cvFiles[language];
}
