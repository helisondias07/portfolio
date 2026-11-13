import { Archivo, Syne, Young_Serif } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  variable: "--f-syne",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["800", "900"],
  style: ["italic"],
  display: "swap",
  variable: "--f-archivo",
});

const young = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--f-young",
});

/** Self-hosted chapter faces. The class belongs on an ancestor of `.c2`. */
export const chapterFonts = `${syne.variable} ${archivo.variable} ${young.variable}`;
