// Demo dataset covering all 9 categories. Each post has:
// { id, slug, category, title, org, location, date (ISO), lastDate (ISO), excerpt, content (HTML),
//   applyLink, applyLinkLabel, tags[], vacancies, eligibility, fee, ageLimit, importantDates[] }

const d = (offset) => {
  const t = new Date();
  t.setDate(t.getDate() + offset);
  return t.toISOString();
};

const mk = (
  slug,
  category,
  title,
  org,
  extra = {}
) => ({
  id: `${category}-${slug}`,
  slug,
  category,
  title,
  org,
  location: extra.location || "All India",
  date: d(extra.dateOffset ?? -2),
  lastDate: d(extra.lastOffset ?? 21),
  excerpt:
    extra.excerpt ||
    `${org} has officially released the ${title} notification. Read eligibility, important dates, application fee, selection process and apply online before the last date.`,
  content:
    extra.content ||
    `<p><strong>${org}</strong> has officially released the notification for <strong>${title}</strong>. Interested and eligible candidates can go through the complete notification below and submit their online application form before the last date.</p>
<p>Below are the key highlights of this notification — please read the official PDF carefully before submitting your application.</p>
<h3>Overview</h3>
<ul><li>Organization: ${org}</li><li>Location: ${extra.location || "All India"}</li><li>Category: ${category}</li></ul>
<h3>How to Apply</h3>
<p>Visit the official portal, register with a valid email & mobile number, fill the application form, upload documents and pay the application fee before the last date.</p>
<h3>Important Note</h3>
<p>NaukariGPT provides curated links only. Please verify all details on the official website before applying.</p>`,
  applyLink: extra.applyLink || "https://example.com/apply",
  applyLinkLabel: extra.applyLinkLabel || "Apply Online",
  officialLink: extra.officialLink || "https://example.com/notification.pdf",
  tags: extra.tags || [category],
  vacancies: extra.vacancies || Math.floor(Math.random() * 4000) + 200,
  eligibility: extra.eligibility || "Graduate from a recognised university",
  fee: extra.fee || "General/OBC: Rs. 100 | SC/ST/PwD: Nil",
  ageLimit: extra.ageLimit || "18 – 32 years (age relaxation as per rules)",
  importantDates: extra.importantDates || [
    { label: "Notification Release", value: d(extra.dateOffset ?? -2).split("T")[0] },
    { label: "Online Apply Start", value: d((extra.dateOffset ?? -2) + 1).split("T")[0] },
    { label: "Online Apply Last Date", value: d(extra.lastOffset ?? 21).split("T")[0] },
    { label: "Exam Date", value: d((extra.lastOffset ?? 21) + 25).split("T")[0] },
  ],
  featured: !!extra.featured,
  isNew: (extra.dateOffset ?? -2) >= -3,
});

export const POSTS = [
  // JOBS
  mk("ssc-cgl-2025", "jobs", "SSC CGL 2025 — 17,727 Vacancies", "Staff Selection Commission", { vacancies: 17727, featured: true, tags: ["jobs", "ssc", "graduate"], location: "All India" }),
  mk("ibps-po-2025", "jobs", "IBPS PO 2025 Notification — 5,208 Posts", "Institute of Banking Personnel Selection", { vacancies: 5208, tags: ["jobs", "banking"] }),
  mk("upsc-cse-2025", "jobs", "UPSC Civil Services Exam 2025", "Union Public Service Commission", { vacancies: 979, tags: ["jobs", "upsc"] }),
  mk("rrb-ntpc-2025", "jobs", "RRB NTPC 2025 — 11,558 Vacancies", "Railway Recruitment Board", { vacancies: 11558, tags: ["jobs", "railway"] }),
  mk("delhi-police-constable", "jobs", "Delhi Police Constable 2025", "Delhi Police", { vacancies: 7565, tags: ["jobs", "police"] }),
  mk("bank-of-baroda-so", "jobs", "Bank of Baroda SO Recruitment 2025", "Bank of Baroda", { vacancies: 1000, tags: ["jobs", "banking"] }),
  mk("tcs-nqt-2025", "jobs", "TCS NQT 2025 — Off Campus Drive", "Tata Consultancy Services", { vacancies: 40000, tags: ["jobs", "private", "it"] }),
  mk("isro-scientist-engineer", "jobs", "ISRO Scientist / Engineer SC 2025", "Indian Space Research Organisation", { vacancies: 63, tags: ["jobs", "isro"] }),

  // LATEST NOTIFICATIONS
  mk("ssc-mts-2025-notification", "latest-notifications", "SSC MTS 2025 Notification Released", "Staff Selection Commission", { featured: true, tags: ["notification", "ssc"] }),
  mk("neet-pg-2025-notification", "latest-notifications", "NEET PG 2025 Notification Out", "National Board of Examinations", { tags: ["notification", "medical"] }),
  mk("cbse-ctet-notification", "latest-notifications", "CBSE CTET 2025 Notification Released", "CBSE", { tags: ["notification", "teaching"] }),
  mk("cuet-ug-2026-notification", "latest-notifications", "CUET UG 2026 Notification Announced", "NTA", { tags: ["notification", "admission"] }),
  mk("lic-aao-notification", "latest-notifications", "LIC AAO 2025 Notification Released", "Life Insurance Corporation", { tags: ["notification", "insurance"] }),
  mk("reet-notification", "latest-notifications", "REET 2025 Rajasthan Teacher Notification", "BSER Rajasthan", { tags: ["notification", "teaching"] }),
  mk("sbi-clerk-notification", "latest-notifications", "SBI Clerk 2025 Notification Released", "State Bank of India", { tags: ["notification", "banking"] }),
  mk("aiims-nursing-officer", "latest-notifications", "AIIMS Nursing Officer Notification 2025", "AIIMS Delhi", { tags: ["notification", "medical"] }),

  // ADMIT CARD
  mk("ssc-chsl-admit-card", "admit-card", "SSC CHSL 2025 Tier-I Admit Card", "Staff Selection Commission", { featured: true, tags: ["admit-card", "ssc"], applyLinkLabel: "Download Admit Card" }),
  mk("upsc-prelims-admit-card", "admit-card", "UPSC Prelims 2025 e-Admit Card", "UPSC", { tags: ["admit-card", "upsc"], applyLinkLabel: "Download Admit Card" }),
  mk("neet-ug-admit-card", "admit-card", "NEET UG 2025 Admit Card Released", "NTA", { tags: ["admit-card", "medical"], applyLinkLabel: "Download Admit Card" }),
  mk("cat-2025-admit-card", "admit-card", "CAT 2025 Admit Card Available", "IIM Ahmedabad", { tags: ["admit-card", "mba"], applyLinkLabel: "Download Admit Card" }),
  mk("jee-main-admit-card", "admit-card", "JEE Main 2026 Session-1 Admit Card", "NTA", { tags: ["admit-card", "engineering"], applyLinkLabel: "Download Admit Card" }),
  mk("ibps-clerk-admit", "admit-card", "IBPS Clerk Prelims Admit Card 2025", "IBPS", { tags: ["admit-card", "banking"], applyLinkLabel: "Download Admit Card" }),
  mk("reet-admit-card", "admit-card", "REET 2025 Admit Card Released", "BSER", { tags: ["admit-card", "teaching"], applyLinkLabel: "Download Admit Card" }),
  mk("ctet-admit-card", "admit-card", "CTET December 2025 Admit Card", "CBSE", { tags: ["admit-card", "teaching"], applyLinkLabel: "Download Admit Card" }),

  // RESULTS
  mk("ssc-cgl-result", "results", "SSC CGL 2024 Final Result Declared", "SSC", { featured: true, tags: ["result"], applyLinkLabel: "Check Result" }),
  mk("upsc-cse-result", "results", "UPSC CSE 2024 Final Result Released", "UPSC", { tags: ["result"], applyLinkLabel: "Check Result" }),
  mk("neet-ug-result", "results", "NEET UG 2025 Result Announced", "NTA", { tags: ["result", "medical"], applyLinkLabel: "Check Result" }),
  mk("cbse-10th-result", "results", "CBSE 10th Class Result 2025", "CBSE", { tags: ["result", "school"], applyLinkLabel: "Check Result" }),
  mk("cbse-12th-result", "results", "CBSE 12th Class Result 2025", "CBSE", { tags: ["result", "school"], applyLinkLabel: "Check Result" }),
  mk("ibps-po-result", "results", "IBPS PO 2024 Final Result Out", "IBPS", { tags: ["result", "banking"], applyLinkLabel: "Check Result" }),
  mk("jee-main-result", "results", "JEE Main 2025 Session-2 Result Declared", "NTA", { tags: ["result", "engineering"], applyLinkLabel: "Check Result" }),
  mk("ctet-result", "results", "CTET July 2025 Result Released", "CBSE", { tags: ["result", "teaching"], applyLinkLabel: "Check Result" }),

  // ADMISSION
  mk("du-ug-admission", "admission", "Delhi University UG Admission 2025", "University of Delhi", { featured: true, tags: ["admission"], applyLinkLabel: "Apply for Admission" }),
  mk("jnu-ug-admission", "admission", "JNU UG Admission 2025 Through CUET", "JNU", { tags: ["admission"], applyLinkLabel: "Apply for Admission" }),
  mk("iit-jam-admission", "admission", "IIT JAM 2026 MSc Admission Open", "IIT Delhi", { tags: ["admission", "pg"], applyLinkLabel: "Apply for Admission" }),
  mk("nit-bhu-mtech", "admission", "NIT / IIT-BHU M.Tech Admission 2025", "IIT BHU", { tags: ["admission", "pg"], applyLinkLabel: "Apply for Admission" }),
  mk("aiims-mbbs", "admission", "AIIMS MBBS 2025 Counselling Notice", "AIIMS Delhi", { tags: ["admission", "medical"], applyLinkLabel: "Counselling Portal" }),
  mk("iim-pgp-admission", "admission", "IIM PGP 2026 Admission Notification", "IIM Bangalore", { tags: ["admission", "mba"], applyLinkLabel: "Apply for Admission" }),
  mk("nlsiu-clat", "admission", "NLSIU CLAT PG 2026 Admissions Open", "NLSIU Bangalore", { tags: ["admission", "law"], applyLinkLabel: "Apply for Admission" }),
  mk("bhu-ug", "admission", "BHU UG Admission 2025 Through CUET", "Banaras Hindu University", { tags: ["admission"], applyLinkLabel: "Apply for Admission" }),

  // SCHOLARSHIPS
  mk("pmss-scholarship", "scholarships", "PM Scholarship Scheme (PMSS) 2025", "Kendriya Sainik Board", { featured: true, tags: ["scholarship", "defence"], applyLinkLabel: "Apply for Scholarship" }),
  mk("national-means-scholarship", "scholarships", "National Means-cum-Merit Scholarship 2025", "MoE", { tags: ["scholarship"], applyLinkLabel: "Apply for Scholarship" }),
  mk("inspire-scholarship", "scholarships", "INSPIRE Scholarship 2025 for BSc Students", "DST", { tags: ["scholarship", "science"], applyLinkLabel: "Apply for Scholarship" }),
  mk("post-matric-sc", "scholarships", "Post-Matric Scholarship for SC Students 2025", "MoSJE", { tags: ["scholarship"], applyLinkLabel: "Apply for Scholarship" }),
  mk("minorities-scholarship", "scholarships", "Minorities Pre-Matric Scholarship 2025", "Ministry of Minority Affairs", { tags: ["scholarship"], applyLinkLabel: "Apply for Scholarship" }),
  mk("vidya-lakshmi-education-loan", "scholarships", "Vidya Lakshmi Education Loan Portal 2025", "Govt. of India", { tags: ["scholarship", "loan"], applyLinkLabel: "Apply Now" }),
  mk("reliance-foundation-scholarship", "scholarships", "Reliance Foundation UG Scholarship 2025", "Reliance Foundation", { tags: ["scholarship", "private"], applyLinkLabel: "Apply for Scholarship" }),
  mk("tata-scholarship", "scholarships", "Tata Trusts Scholarship 2025 for UG", "Tata Trusts", { tags: ["scholarship", "private"], applyLinkLabel: "Apply for Scholarship" }),

  // ANSWER KEY
  mk("ssc-cgl-answer-key", "answer-key", "SSC CGL 2025 Tier-I Answer Key", "SSC", { featured: true, tags: ["answer-key"], applyLinkLabel: "Download Answer Key" }),
  mk("upsc-prelims-answer-key", "answer-key", "UPSC Prelims 2025 Answer Key (Unofficial)", "NaukariGPT Editorial", { tags: ["answer-key", "upsc"], applyLinkLabel: "View Answer Key" }),
  mk("neet-ug-answer-key", "answer-key", "NEET UG 2025 Provisional Answer Key", "NTA", { tags: ["answer-key", "medical"], applyLinkLabel: "Download Answer Key" }),
  mk("jee-main-answer-key", "answer-key", "JEE Main 2026 Session-1 Answer Key", "NTA", { tags: ["answer-key", "engineering"], applyLinkLabel: "Download Answer Key" }),
  mk("ctet-answer-key", "answer-key", "CTET 2025 Official Answer Key Released", "CBSE", { tags: ["answer-key", "teaching"], applyLinkLabel: "Download Answer Key" }),
  mk("ibps-clerk-answer-key", "answer-key", "IBPS Clerk Prelims Answer Key 2025", "IBPS", { tags: ["answer-key", "banking"], applyLinkLabel: "Download Answer Key" }),
  mk("cat-answer-key", "answer-key", "CAT 2025 Response Sheet & Answer Key", "IIM Ahmedabad", { tags: ["answer-key", "mba"], applyLinkLabel: "Download Answer Key" }),
  mk("reet-answer-key", "answer-key", "REET 2025 Official Answer Key", "BSER", { tags: ["answer-key", "teaching"], applyLinkLabel: "Download Answer Key" }),

  // TOOLS
  mk("age-calculator", "tools", "Age Calculator — Exact Age in Years / Months / Days", "NaukariGPT Tools", { featured: true, tags: ["tool"], applyLink: "/category/tools/age-calculator", applyLinkLabel: "Open Tool" }),
  mk("cgpa-percentage", "tools", "CGPA to Percentage Converter", "NaukariGPT Tools", { tags: ["tool"], applyLink: "/category/tools/cgpa-percentage", applyLinkLabel: "Open Tool" }),
  mk("salary-calculator", "tools", "7th Pay Commission Salary Calculator", "NaukariGPT Tools", { tags: ["tool"], applyLink: "/category/tools/salary-calculator", applyLinkLabel: "Open Tool" }),
  mk("typing-test", "tools", "Free Online Typing Test (English & Hindi)", "NaukariGPT Tools", { tags: ["tool"], applyLink: "/category/tools/typing-test", applyLinkLabel: "Open Tool" }),
  mk("eligibility-checker", "tools", "Government Job Eligibility Checker", "NaukariGPT Tools", { tags: ["tool"], applyLink: "/category/tools/eligibility-checker", applyLinkLabel: "Open Tool" }),
  mk("pdf-compressor", "tools", "PDF Compressor for Government Forms", "NaukariGPT Tools", { tags: ["tool"], applyLink: "/category/tools/pdf-compressor", applyLinkLabel: "Open Tool" }),
  mk("photo-signature-resizer", "tools", "Photo & Signature Resizer", "NaukariGPT Tools", { tags: ["tool"], applyLink: "/category/tools/photo-signature-resizer", applyLinkLabel: "Open Tool" }),
  mk("result-percentile", "tools", "Percentile Calculator for Competitive Exams", "NaukariGPT Tools", { tags: ["tool"], applyLink: "/category/tools/result-percentile", applyLinkLabel: "Open Tool" }),

  // GUIDES
  mk("how-to-crack-ssc-cgl", "guides", "How to Crack SSC CGL in Your First Attempt", "NaukariGPT Editorial", { featured: true, tags: ["guide", "ssc"], applyLinkLabel: "Read Guide" }),
  mk("upsc-preparation-strategy", "guides", "UPSC Prelims Preparation Strategy for Working Professionals", "NaukariGPT Editorial", { tags: ["guide", "upsc"], applyLinkLabel: "Read Guide" }),
  mk("bank-po-vs-clerk", "guides", "Bank PO vs Clerk — Which Should You Choose?", "NaukariGPT Editorial", { tags: ["guide", "banking"], applyLinkLabel: "Read Guide" }),
  mk("resume-for-government-jobs", "guides", "How to Write a Resume for Government Jobs", "NaukariGPT Editorial", { tags: ["guide", "career"], applyLinkLabel: "Read Guide" }),
  mk("top-books-ssc", "guides", "Top 10 Books for SSC & Banking Exams in 2025", "NaukariGPT Editorial", { tags: ["guide", "books"], applyLinkLabel: "Read Guide" }),
  mk("english-tips-competitive", "guides", "Master English Section in Competitive Exams", "NaukariGPT Editorial", { tags: ["guide", "english"], applyLinkLabel: "Read Guide" }),
  mk("quant-shortcuts", "guides", "Quantitative Aptitude Shortcuts You Must Know", "NaukariGPT Editorial", { tags: ["guide", "quant"], applyLinkLabel: "Read Guide" }),
  mk("government-jobs-after-12th", "guides", "Best Government Jobs After 12th Class 2025", "NaukariGPT Editorial", { tags: ["guide", "career"], applyLinkLabel: "Read Guide" }),
];

export const getPostsByCategory = (categorySlug) =>
  POSTS.filter((p) => p.category === categorySlug).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

export const getPostBySlug = (categorySlug, postSlug) =>
  POSTS.find((p) => p.category === categorySlug && p.slug === postSlug) || null;

export const getFeaturedPosts = (limit = 6) =>
  POSTS.filter((p) => p.featured).slice(0, limit);

export const getLatestPosts = (limit = 12) =>
  [...POSTS]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);

export const getTrendingPosts = (limit = 6) =>
  [...POSTS]
    .sort((a, b) => (a.vacancies < b.vacancies ? 1 : -1))
    .slice(0, limit);

export const searchPosts = (query, limit = 8) => {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const scored = POSTS.map((p) => {
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
};
