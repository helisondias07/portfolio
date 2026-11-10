export const PROJECT_LAYOUTS = ["a", "b", "c", "d", "e"] as const;
export type ProjectLayoutId = (typeof PROJECT_LAYOUTS)[number] | "current";

export function parseProjectLayout(value: string | string[] | undefined): ProjectLayoutId {
  const raw = Array.isArray(value) ? value[0] : value;
  const id = (raw ?? "").toLowerCase();
  return PROJECT_LAYOUTS.includes(id as (typeof PROJECT_LAYOUTS)[number]) ? (id as ProjectLayoutId) : "current";
}

export const LAYOUT_SWITCH = [
  { id: "current" as const, href: "/projetos", pt: "Atual", en: "Current" },
  { id: "a" as const, href: "/projetos?layout=a", pt: "A · Editorial", en: "A · Editorial" },
  { id: "b" as const, href: "/projetos?layout=b", pt: "B · Índice", en: "B · Index" },
  { id: "c" as const, href: "/projetos?layout=c", pt: "C · Bento", en: "C · Bento" },
  { id: "d" as const, href: "/projetos?layout=d", pt: "D · Duas colunas", en: "D · Two columns" },
  { id: "e" as const, href: "/projetos?layout=e", pt: "E · Carrossel", en: "E · Carousel" },
];
