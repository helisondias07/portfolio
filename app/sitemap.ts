import type { MetadataRoute } from "next";
import { publishedProjectIds } from "@/lib/projects/catalog";

const origin = "https://helisondias.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: origin,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...publishedProjectIds().map((id) => ({
      url: `${origin}/projetos/${id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
