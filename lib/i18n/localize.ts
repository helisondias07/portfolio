import { experiments } from "@/data/experiments";
import { projects, type Project } from "@/data/projects";
import { enProjects } from "./projects-en";
import type { Lang } from "./dict";
import { getLang } from "./store";

for (const project of projects) {
  if (!enProjects[project.id]) throw new Error(`Missing English copy for project "${project.id}"`);
}

export function localizeProject(project: Project, lang: Lang = getLang()): Project {
  const experiment = experiments.find((item) => item.id === project.id);
  if (experiment) {
    const copy = experiment[lang];
    return {
      ...project,
      name: copy.name,
      cat: copy.cat,
      eyebrow: copy.eyebrow,
      title: copy.title,
      association: copy.association,
      overview: copy.overview,
      contributionsTitle: copy.contributionsTitle,
      contributions: copy.contributions,
      limits: copy.limits,
      inspiration: copy.inspiration.href ? copy.inspiration : undefined,
      build: {
        problem: copy.problem || undefined,
        approach: copy.approach || undefined,
        learnings: copy.learnings.length ? copy.learnings : undefined,
      },
    };
  }
  if (lang !== "en") return project;
  const copy = enProjects[project.id];
  return copy ? { ...project, ...copy } : project;
}
