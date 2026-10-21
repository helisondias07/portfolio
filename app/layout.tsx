import type { Metadata, Viewport } from "next";
import LangMeta from "@/components/LangMeta";
import VisitBeacon from "@/components/VisitBeacon";
import { langBootScript } from "@/lib/i18n/boot";
import { dict } from "@/lib/i18n/dict";
import "./globals.css";

const description = dict.pt.meta.description;

export const metadata: Metadata = {
  metadataBase: new URL("https://helisondias.vercel.app"),
  title: dict.pt.meta.title,
  description,
  authors: [{ name: "Helison Dias" }],
  openGraph: {
    title: dict.pt.meta.title,
    description,
    url: "https://helisondias.vercel.app",
    siteName: "Helison Dias",
    images: [{ url: "/og-2026.png", width: 1200, height: 630, alt: "Helison Dias" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: dict.pt.meta.title, description, images: ["/og-2026.png"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { colorScheme: "light dark" };

// Runs before paint: stored choice, else system preference. Prevents a theme flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}})()`;
const langScript = langBootScript();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: langScript }} />
        <link rel="preload" href="/fonts/gs2.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/gs4.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/jb.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        {children}
        <LangMeta />
        <VisitBeacon />
      </body>
    </html>
  );
}
