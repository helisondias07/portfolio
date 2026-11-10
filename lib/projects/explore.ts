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

type FilterButton = {
  dataset?: { f?: string };
  classList: { toggle(token: string, force?: boolean): unknown; contains(token: string): boolean };
  setAttribute(name: string, value: string): void;
  getAttribute(name: string): string | null;
  ariaPressed?: string | null;
};

function buttonFilterId(btn: FilterButton): string | null {
  return btn.dataset?.f ?? btn.getAttribute("data-f");
}

/** Keep visual `.on` and accessible `aria-pressed` in lockstep for every filter chip. */
export function syncFilterButtons(buttons: ArrayLike<FilterButton>, filter: string): FilterId {
  const next: FilterId = isFilterId(filter) ? filter : "*";
  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    const on = buttonFilterId(btn) === next;
    btn.classList.toggle("on", on);
    const value = on ? "true" : "false";
    btn.setAttribute("aria-pressed", value);
    btn.ariaPressed = value;
  }
  return next;
}

export function filterButtonSnapshot(buttons: ArrayLike<FilterButton>) {
  return Array.from({ length: buttons.length }, (_, i) => {
    const btn = buttons[i];
    return {
      id: buttonFilterId(btn),
      on: btn.classList.contains("on"),
      ariaPressed: btn.ariaPressed ?? btn.getAttribute("aria-pressed"),
    };
  });
}
