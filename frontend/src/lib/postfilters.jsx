// Pure, dependency-free filter helpers — safe to import from Client
// Components. (Kept separate from lib/posts.js, which uses next/headers
// and can only be imported by Server Components.)

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
