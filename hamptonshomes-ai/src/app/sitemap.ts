import type { MetadataRoute } from "next";
import { areas } from "@/lib/areas";
import { blogPosts } from "@/lib/blog";

const baseUrl = "https://hamptonshomes.ai";

function validLastModified(date: string): string | undefined {
  return Number.isNaN(Date.parse(`${date}T00:00:00.000Z`)) ? undefined : date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const areaRoutes: MetadataRoute.Sitemap = areas.map((area) => ({
    url: `${baseUrl}/${area.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const lastModified = validLastModified(post.date);

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/sales`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/market`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/press`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.7 },
    ...areaRoutes,
    ...blogRoutes,
  ];
}
