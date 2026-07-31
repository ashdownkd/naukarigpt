import { SITE, CATEGORIES } from "@/data/site";
import { POSTS } from "@/data/demo";

export default function sitemap() {
  const base = SITE.url;
  const now = new Date().toISOString();
  const routes = [
    { url: `${base}/`, lastModified: now, priority: 1.0 },
    { url: `${base}/about`, lastModified: now, priority: 0.5 },
    { url: `${base}/privacy-policy`, lastModified: now, priority: 0.3 },
    { url: `${base}/disclaimer`, lastModified: now, priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, priority: 0.3 },
    { url: `${base}/report-bug`, lastModified: now, priority: 0.3 },
  ];
  const categoryUrls = CATEGORIES.map((c) => ({
    url: `${base}/category/${c.slug}`,
    lastModified: now,
    priority: 0.8,
  }));
  const postUrls = POSTS.map((p) => ({
    url: `${base}/category/${p.category}/${p.slug}`,
    lastModified: p.date,
    priority: 0.7,
  }));
  return [...routes, ...categoryUrls, ...postUrls];
}
