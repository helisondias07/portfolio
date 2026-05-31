import type { Language } from "@/lib/i18n";

const cvFiles = {
  pt: {
    href: "/cv/helison-dias-curriculo-pt.docx",
    filename: "helison-dias-curriculo-pt.docx",
  },
  en: {
    href: "/cv/helison-dias-resume-en.docx",
    filename: "helison-dias-resume-en.docx",
  },
} as const satisfies Record<Language, { href: string; filename: string }>;

export function getCvFile(language: Language) {
  return cvFiles[language];
}
