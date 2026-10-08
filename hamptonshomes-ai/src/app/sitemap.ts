import type { MetadataRoute } from "next";
import { areas } from "@/lib/areas";
import { blogPosts } from "@/lib/blog";

const baseUrl = "https://hamptonshomes.ai";

/** Last substantive update to the site's core pages and village pages. */
const SITE_UPDATED = "2026-10-07";
const LEGAL_UPDATED = "2026-10-07";

function validLastModified(date: string): string | undefined {
  return Number.isNaN(Date.parse(`${date}T00:00:00.000Z`)) ? undefined : date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const areaRoutes: MetadataRoute.Sitemap = areas.map((area) => ({
    url: `${baseUrl}/${area.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const lastModified = validLastModified(post.dateModified ?? post.date);

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  const latestPost = blogPosts.reduce((latest, post) => {
    const d = post.dateModified ?? post.date;
    return d > latest ? d : latest;
  }, SITE_UPDATED);

  return [
    { url: baseUrl, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/sales`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/market`, lastModified: latestPost, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/press`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.3 },
    ...areaRoutes,
    ...blogRoutes,
  ];
}
