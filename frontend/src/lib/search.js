// Pure search-scoring function, unchanged from the old demo.js logic — now
// takes the posts array as an argument instead of reading a static import,
// so it works with live data fetched from the backend.

export function searchPosts(posts, query, limit = 8) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const scored = posts
    .map((p) => {
      const hay = `${p.title} ${p.org} ${p.excerpt} ${(p.tags || []).join(" ")} ${p.category}`.toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (hay.includes(t)) score += 2;
        if (p.title.toLowerCase().includes(t)) score += 3;
        if (p.category.includes(t)) score += 1;
      }
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
  return scored;
}
