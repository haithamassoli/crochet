import type { MetadataRoute } from "next";
import { getLessons, REFERENCE_TOPICS } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/learn`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/reference`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/resources`, changeFrequency: "monthly", priority: 0.8 },
    ...getLessons().map((l) => ({
      url: `${SITE_URL}/learn/${l.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...REFERENCE_TOPICS.map((t) => ({
      url: `${SITE_URL}/reference/${t.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
