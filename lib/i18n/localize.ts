import { projects, type Project } from "@/data/projects";
import { enProjects } from "./projects-en";
import type { Lang } from "./dict";
import { getLang } from "./store";

for (const project of projects) {
  if (!enProjects[project.id]) throw new Error(`Missing English copy for project "${project.id}"`);
}

export function localizeProject(project: Project, lang: Lang = getLang()): Project {
  if (lang !== "en") return project;
  const copy = enProjects[project.id];
  return copy ? { ...project, ...copy } : project;
}
