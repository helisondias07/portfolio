import type { Metadata, Viewport } from "next";
import VisitBeacon from "@/components/VisitBeacon";
import "./globals.css";

const description =
  "Helison Dias — desenvolvedor frontend em e-commerce (Wake, Nuvemshop) e automação com IA. React, Next.js, Vue.js e TypeScript. Nova Friburgo, RJ — remoto.";

export const metadata: Metadata = {
  metadataBase: new URL("https://helisondias.vercel.app"),
  title: "Helison Dias — Frontend Dev",
  description,
  authors: [{ name: "Helison Dias" }],
  openGraph: {
    title: "Helison Dias — Frontend Dev",
    description,
    url: "https://helisondias.vercel.app",
    siteName: "Helison Dias",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Helison Dias" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Helison Dias — Frontend Dev", description, images: ["/og-image.png"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { colorScheme: "light dark" };

// Runs before paint: stored choice, else system preference. Prevents a theme flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preload" href="/fonts/gs2.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/gs4.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/jb.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        {children}
        <VisitBeacon />
      </body>
    </html>
  );
}
