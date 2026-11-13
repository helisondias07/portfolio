import { experiments } from "../../data/experiments";
import { publishedProjects } from "./catalog";

/** Homepage chapters, in the approved order. Everything else goes on the rail. */
export const FEATURED_ORDER = ["shopmind", "sneakers", "emporio", "webcine"] as const;

const RAIL_ORDER = [
  "kingimports",
  "fiturban",
  "venari",
  "viaveneto",
  "yamuna",
  "mckhome",
  "tubaraocenter",
  "lojaultra",
  "hotrio",
  "serralheria",
  "useloft",
  "loop",
  "brag",
  "critica",
  "timesheet",
  "benchmark",
] as const;

const KINDS: Record<string, [string, string]> = {
  yamuna: ["Tema Nuvemshop", "Nuvemshop theme"],
  loop: ["MVP · agentes", "MVP · agents"],
  critica: ["MVP · CLI", "MVP · CLI"],
  brag: ["MVP", "MVP"],
  timesheet: ["MVP", "MVP"],
  benchmark: ["MVP", "MVP"],
};

export type RailItem = {
  id: string;
  name: string;
  nameEn: string;
  kind: [string, string];
  img: string;
  href: string;
};

export function railItems(): RailItem[] {
  const featured = new Set<string>(FEATURED_ORDER);
  const byId = new Map(publishedProjects().filter((project) => !featured.has(project.id)).map((project) => [project.id, project]));
  const enName = new Map(experiments.map((item) => [item.id as string, item.en.name]));
  const ordered = [
    ...RAIL_ORDER.filter((id) => byId.has(id)),
    ...[...byId.keys()].filter((id) => !RAIL_ORDER.includes(id as (typeof RAIL_ORDER)[number])),
  ];
  return ordered.map((id) => {
    const project = byId.get(id)!;
    const kind = KINDS[id] ?? (project.tags.includes("ecommerce") ? ["Loja na Wake", "Wake store"] as [string, string] : ["Projeto", "Project"]);
    return {
      id,
      name: project.name,
      nameEn: enName.get(id) ?? project.name,
      kind,
      img: project.img,
      href: project.demo || project.url,
    };
  });
}
