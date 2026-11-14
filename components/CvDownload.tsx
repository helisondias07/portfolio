import { dict } from "@/lib/i18n/dict";

const FILES = [
  {
    lang: "pt",
    href: "/cv/curriculo-helison-dias-pt.pdf",
    download: "curriculo-helison-dias-pt.pdf",
    label: dict.pt.contact.cv,
  },
  {
    lang: "en",
    href: "/cv/resume-helison-dias-en.pdf",
    download: "resume-helison-dias-en.pdf",
    label: dict.en.contact.cv,
  },
] as const;

/** Both files stay in the DOM. The language class shows the one that matches data-lang, including after the toggle. */
export default function CvDownload({ variant }: { variant: "hero" | "footer" }) {
  return FILES.map((file) =>
    variant === "hero" ? (
      <a key={file.lang} className={`btn i18n-${file.lang}`} href={file.href} download={file.download} data-cv>
        {file.label}
      </a>
    ) : (
      <a key={file.lang} className={`cvx i18n-${file.lang}`} href={file.href} download={file.download}>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
          <path d="M12 11v6" />
          <path d="m9 14.5 3 3 3-3" />
        </svg>
        <span>{file.label} <small>PDF</small></span>
      </a>
    ),
  );
}
