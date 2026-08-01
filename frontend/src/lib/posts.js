// Live data layer — replaces the old static demo.js. Every function here
// fetches real posts from the FastAPI backend (routed via /api/jobs through
// vercel.json's rewrites). Server Components only (uses next/headers).

import { cache } from "react";
import { headers } from "next/headers";
import { SITE } from "@/data/site";

async function getBaseUrl() {
  try {
    const h = headers();
    const host = h.get("host");
    if (host) {
      const protocol = host.startsWith("localhost") ? "http" : "https";
      return `${protocol}://${host}`;
    }
  } catch (e) {
    // headers() isn't available outside a request context (e.g. some build steps)
  }
  return SITE.url;
}

// cache() dedupes this within a single request — calling getAllPosts() many
// times across a page only triggers one real network call.
export const getAllPosts = cache(async function getAllPosts() {
  try {
    const base = await getBaseUrl();
    const res = await fetch(`${base}/api/jobs?limit=500`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.warn("Failed to fetch posts from backend:", e?.message);
    return [];
  }
});

export async function getPostsByCategory(categorySlug) {
  const posts = await getAllPosts();
  return posts
    .filter((p) => p.category === categorySlug)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPostBySlug(categorySlug, postSlug) {
  const posts = await getAllPosts();
  return posts.find((p) => p.category === categorySlug && p.slug === postSlug) || null;
}

export async function getFeaturedPosts(limit = 6) {
  const posts = await getAllPosts();
  return posts.filter((p) => p.featured).slice(0, limit);
}

export async function getLatestPosts(limit = 12) {
  const posts = await getAllPosts();
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);
}

export async function getTrendingPosts(limit = 6) {
  const posts = await getAllPosts();
  return [...posts].sort((a, b) => (a.vacancies < b.vacancies ? 1 : -1)).slice(0, limit);
}

// ---- Filter helpers (unchanged logic from demo.js, operates on whatever
// array of posts you already fetched — no network call here) --------------

export const FILTER_OPTIONS = {
  state: [
    "All India", "Delhi", "Uttar Pradesh", "Rajasthan", "Bihar", "Madhya Pradesh",
    "Maharashtra", "Karnataka", "Tamil Nadu", "West Bengal", "Gujarat", "Haryana",
    "Punjab", "Odisha", "Kerala", "Assam", "Telangana", "Andhra Pradesh",
  ],
  department: [
    "SSC", "UPSC", "Railway", "Banking", "Insurance", "Police / Defence", "Teaching",
    "Medical", "Engineering", "Science & Research", "Management", "Law", "Private / IT",
    "Finance / Loans", "School", "General",
  ],
  qualification: ["10th Pass", "12th Pass", "Diploma / ITI", "Graduate", "Post Graduate", "Any"],
};

export const filterPosts = (posts, filters = {}) => {
  const norm = (v) => (v == null || v === "all" ? "" : String(v));
  const st = norm(filters.state);
  const dept = norm(filters.department);
  const qual = norm(filters.qualification);
  return posts.filter((p) => {
    if (st && p.state !== st) return false;
    if (dept && p.department !== dept) return false;
    if (qual && p.qualification !== qual) return false;
    return true;
  });
};
