/** Lab scores measured with Lighthouse 12. Update after measuring the production URL. */
export type Device = "mobile" | "desktop";
type Scores = { performance: number; accessibility: number; "best-practices": number; seo: number };

export const lighthouse: Record<Device, Scores> & { measured: string } = {
  mobile: { performance: 98, accessibility: 97, "best-practices": 100, seo: 100 },
  desktop: { performance: 97, accessibility: 97, "best-practices": 100, seo: 100 },
  measured: "16/10/2026",
};
