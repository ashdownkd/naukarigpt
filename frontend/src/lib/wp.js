// Optional WordPress REST API integration. When NEXT_PUBLIC_WP_URL is set, we
// fetch from the headless WP instance; otherwise we return demo data. Both
// shapes are normalised to the same Post interface used by the UI.

import { SITE } from "@/data/site";
import { POSTS as DEMO_POSTS } from "@/data/demo";

const WP = SITE.wpUrl;

const stripHtml = (s = "") =>
  s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const normaliseWp = (wpPost) => {
  const meta = wpPost?.meta || {};
  return {
    id: `wp-${wpPost.id}`,
    slug: wpPost.slug,
    category: (wpPost._embedded?.["wp:term"]?.[0]?.[0]?.slug) || "jobs",
    title: stripHtml(wpPost.title?.rendered || ""),
    org: meta?.org || "NaukariGPT",
    location: meta?.location || "All India",
    date: wpPost.date,
    lastDate: meta?.last_date || wpPost.date,
    excerpt: stripHtml(wpPost.excerpt?.rendered || "").slice(0, 220),
    content: wpPost.content?.rendered || "",
    applyLink: meta?.apply_link || "#",
    applyLinkLabel: meta?.apply_link_label || "Apply Online",
    officialLink: meta?.official_link || "#",
    tags: (wpPost._embedded?.["wp:term"]?.[1] || []).map((t) => t.slug),
    vacancies: meta?.vacancies || 0,
    eligibility: meta?.eligibility || "",
    fee: meta?.fee || "",
    ageLimit: meta?.age_limit || "",
    importantDates: meta?.important_dates || [],
    featured: !!meta?.featured,
    isNew: false,
  };
};

export async function fetchAllPosts() {
  if (!WP) return DEMO_POSTS;
  try {
    const res = await fetch(
      `${WP}/wp-json/wp/v2/posts?per_page=100&_embed=1`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) throw new Error(`WP status ${res.status}`);
    const data = await res.json();
    return data.map(normaliseWp);
  } catch (e) {
    console.warn("WP fetch failed, falling back to demo:", e?.message);
    return DEMO_POSTS;
  }
}
