export const FILTERS = ["*", "ecommerce", "front", "pessoais"] as const;
export type FilterId = (typeof FILTERS)[number];

export function isFilterId(value: string | null | undefined): value is FilterId {
  return value != null && (FILTERS as readonly string[]).includes(value);
}

export function filterProjectIndexes<T extends { tags: readonly string[] }>(projects: readonly T[], filter: FilterId): number[] {
  return projects.map((_, i) => i).filter((i) => filter === "*" || projects[i].tags.includes(filter));
}

/** `#projetos/emporio` selects a case. Other hashes (`#contato`, `#projetos`) are left alone. */
export function projectIdFromHash(hash: string, ids: readonly string[]): string | null {
  const raw = hash.replace(/^#/, "").replace(/\/$/, "");
  const match = /^projetos\/([a-z0-9-]+)$/i.exec(raw);
  if (!match) return null;
  const id = match[1].toLowerCase();
  return ids.includes(id) ? id : null;
}

export function projectHash(id: string): string {
  return `#projetos/${id}`;
}

export function isGithubUrl(url: string): boolean {
  try {
    return new URL(url).hostname === "github.com" || new URL(url).hostname.endsWith(".github.com");
  } catch {
    return false;
  }
}
