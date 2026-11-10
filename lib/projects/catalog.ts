import { experiments, publicExperiments } from "../../data/experiments";
import { projects, type Project } from "../../data/projects";
import { isFilterId, type FilterId } from "./explore";

export type Lane = "storefront" | "authored";

export function projectLane(project: Project): Lane {
  return project.tags.includes("pessoais") ? "authored" : "storefront";
}

export function publishedProjects(): Project[] {
  return projects;
}

export function publishedProjectIds(): string[] {
  return publishedProjects().map((project) => project.id);
}

export function projectById(id: string): Project | undefined {
  return publishedProjects().find((project) => project.id === id);
}

export function isPublishedProjectId(id: string): boolean {
  return publishedProjects().some((project) => project.id === id);
}

export function filterPublished(list: readonly Project[], filter: FilterId): Project[] {
  if (filter === "*") return [...list];
  return list.filter((project) => project.tags.includes(filter));
}

export function casePath(id: string): string {
  return `/projetos/${id}`;
}

export function galleryPath(filter: FilterId = "*"): string {
  const lane = filter === "*" ? "" : `?lane=${filter}`;
  return `/${lane}#projetos`;
}

export function laneFromSearch(search: string): FilterId {
  const value = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search).get("lane");
  return isFilterId(value) ? value : "*";
}

export function unpublishedExperimentIds(): string[] {
  return experiments.filter((item) => !item.public).map((item) => item.id);
}

export function publicExperimentCount(): number {
  return publicExperiments().length;
}

export function catalogBlob(): string {
  return JSON.stringify({
    published: publishedProjectIds(),
    experiments: experiments.map((item) => item.id),
  });
}
