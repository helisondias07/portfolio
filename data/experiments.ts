/**
 * Internal registry for authored experiments that are not public yet.
 * Do not import this into UI components. Public pages must go through
 * `publicExperiments()` — currently empty until Helison approves a release.
 *
 * Retired scopes (Fazenda / Caderno de Talhão, Counter-Strike) are omitted on purpose.
 */
export const EXPERIMENT_IDS = ["critica", "timesheet", "benchmark", "loop", "brag"] as const;
export type ExperimentId = (typeof EXPERIMENT_IDS)[number];

export type ExperimentRecord = {
  id: ExperimentId;
  name: { pt: string; en: string };
  /** Always false until an explicit public release. */
  public: false;
  github: null;
  demo: null;
  /** Internal validation note. Never render on the site. */
  limits: string;
};

export const experiments: readonly ExperimentRecord[] = [
  {
    id: "critica",
    name: { pt: "Crítica de planos", en: "Plan critique" },
    public: false,
    github: null,
    demo: null,
    limits: "Partial heuristic only; second LLM/hook not validated; v2 in development.",
  },
  {
    id: "timesheet",
    name: { pt: "Timesheet inteligente", en: "Smart timesheet" },
    public: false,
    github: null,
    demo: null,
    limits: "Integrity, docs, stills and logs only. GitHub/ClickUp integrations off. Synthetic data.",
  },
  {
    id: "benchmark",
    name: { pt: "Benchmark de serialização", en: "Serialization benchmark" },
    public: false,
    github: null,
    demo: null,
    limits: "Awaiting final delivery. No public numbers.",
  },
  {
    id: "loop",
    name: { pt: "Loop de agentes", en: "Agent loop" },
    public: false,
    github: null,
    demo: null,
    limits: "Awaiting final delivery.",
  },
  {
    id: "brag",
    name: { pt: "Brag semanal", en: "Weekly brag" },
    public: false,
    github: null,
    demo: null,
    limits: "Integrity, docs, stills and logs only. Integrations off. Synthetic data.",
  },
];

export function publicExperiments(): ExperimentRecord[] {
  return experiments.filter((item) => item.public && (item.github || item.demo));
}
