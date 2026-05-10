import type { Metadata } from "next";
import { Bebas_Neue, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-project-heading",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://helisondias.vercel.app"),
  applicationName: "Helison Dias Portfolio",
  title: {
    default: "Helison Dias | Fullstack Developer",
    template: "%s | Helison Dias",
  },
  description:
    "Desenvolvedor Fullstack com experiência em React, Next.js, TypeScript, Vue.js, Angular, Node.js, Wake Platform e automação com IA. Baseado em Nova Friburgo, RJ.",
  keywords: [
    "desenvolvedor frontend",
    "react developer",
    "next.js",
    "typescript",
    "fullstack",
    "wake platform",
    "nova friburgo",
    "open to work",
  ],
  authors: [{ name: "Helison Dias" }],
  creator: "Helison Dias",
  category: "portfolio",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Helison Dias | Fullstack Developer",
    description:
      "Portfólio de Helison Dias - React, Next.js, TypeScript, Vue.js, Node.js, Wake Platform e automação com IA.",
    url: "https://helisondias.vercel.app",
    siteName: "Helison Dias",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Helison Dias" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helison Dias | Fullstack Developer",
    description:
      "Portfólio de Helison Dias - React, Next.js, TypeScript, Vue.js, Node.js.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakarta.variable} ${bebasNeue.variable} scroll-smooth antialiased`}
    >
      <body>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
