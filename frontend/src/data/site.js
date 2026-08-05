export const SITE = {
  name: "NaukariGPT",
  domain: "naukarigpt.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://naukarigpt.com",
  tagline: "India's premium hub for jobs, results & admit cards",
  description:
    "NaukariGPT is a modern portal for the latest sarkari job notifications, results, admit cards, admission alerts, scholarships, answer keys, tools & guides — curated for aspirants across India.",
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/naukarigpt",
  whatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ||
    "https://whatsapp.com/channel/0029VbD0hmB1t90ZOB0nLE3B",
  twitter: "https://twitter.com/naukarigpt",
  facebook: "https://facebook.com/naukarigpt",
  email: "contact@naukarigpt.com",
  wpUrl: process.env.NEXT_PUBLIC_WP_URL || "",
  formspree: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "",
  adsense: {
    client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
    // Optional named slots — if empty we use a default responsive slot.
    slots: {
      inFeed: process.env.NEXT_PUBLIC_ADSENSE_SLOT_INFEED || "",
      inArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE || "",
      sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || "",
      banner: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER || "",
    },
  },
};

export const CATEGORIES = [
  {
    slug: "latest-notifications",
    title: "Latest Notifications",
    short: "Notifications",
    icon: "Bell",
    description:
      "Freshly released government & private sector notifications curated every day.",
    accent: "blue",
    featured: true,
  },
  {
    slug: "jobs",
    title: "Jobs",
    short: "Jobs",
    icon: "Briefcase",
    description:
      "Active sarkari & private job openings with direct apply links and eligibility.",
    accent: "blue",
    featured: true,
  },
  {
    slug: "admit-card",
    title: "Admit Card",
    short: "Admit Card",
    icon: "IdCard",
    description: "Download hall tickets & admit cards for upcoming examinations.",
    accent: "cyan",
  },
  {
    slug: "results",
    title: "Results",
    short: "Results",
    icon: "Trophy",
    description: "Latest exam results, merit lists and cut-off updates.",
    accent: "blue",
  },
  {
    slug: "admission",
    title: "Admission",
    short: "Admission",
    icon: "GraduationCap",
    description:
      "University & institute admission alerts, entrance exams and counselling news.",
    accent: "cyan",
  },
  {
    slug: "scholarships",
    title: "Scholarships",
    short: "Scholarships",
    icon: "Coins",
    description: "Government & private scholarships open for students across India.",
    accent: "blue",
  },
  {
    slug: "answer-key",
    title: "Answer Key",
    short: "Answer Key",
    icon: "KeyRound",
    description: "Official & unofficial answer keys with response sheet links.",
    accent: "cyan",
  },
  {
    slug: "tools",
    title: "Tools",
    short: "Tools",
    icon: "Wrench",
    description: "Free utilities — age calculator, CGPA, salary and more.",
    accent: "blue",
  },
  {
    slug: "guides",
    title: "Guides",
    short: "Guides",
    icon: "BookOpen",
    description: "How-to guides, preparation strategies & career decisions.",
    accent: "cyan",
  },
];

export const getCategoryBySlug = (slug) =>
  CATEGORIES.find((c) => c.slug === slug) || null;

export const NAV_PAGES = [
  { slug: "about", title: "About Us" },
  { slug: "privacy-policy", title: "Privacy Policy" },
  { slug: "disclaimer", title: "Disclaimer" },
  { slug: "terms", title: "Terms & Conditions" },
  { slug: "report-bug", title: "Report a Bug" },
];
