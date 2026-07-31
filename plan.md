# plan.md — NaukariGPT.com (Next.js + Headless WordPress)

## 1) Objectives
- Deliver a modern, premium, black-dominant + blue-accent responsive portal for jobs/education content.
- Provide 9 category listing pages + post detail pages + static legal/info pages.
- Integrate headless WordPress via WP REST API (configurable), with demo JSON fallback.
- Implement 12s subscribe popup (Telegram + WhatsApp CTA) with localStorage behavior.
- Add floating bottom-right chatbot that searches site content and returns relevant links.
- Ship SEO essentials: JSON-LD schema, OG/Twitter meta, robots.txt, sitemap.xml.
- Ensure deployability to free hosting (Vercel/Netlify), no custom paid backend.

## 2) Implementation Steps

### Phase 1 — Core POC (Isolation)
**Goal:** Prove the 2 risk areas work end-to-end before building full UI.
1. **WP REST fetch POC**
   - Create minimal Next.js route/page that fetches posts from `NEXT_PUBLIC_WP_URL/wp-json/wp/v2/...`.
   - Add fallback to local demo JSON when WP URL missing/unreachable.
   - Verify mapping: title, slug, date, excerpt/content, featured image (optional), applyLink (via custom field or content parsing).
2. **Subscribe popup POC**
   - Implement 12s timer modal.
   - localStorage logic:
     - `subscribed=true` => never show.
     - `dismissed=true` => show again on next route change (not immediately).
   - Buttons: Telegram (given link) + WhatsApp (configurable link).
3. **Chatbot POC**
   - Build simple floating widget that indexes demo data and returns top matches (title + category + URL) from keyword search.
   - Confirm it works without external APIs.
4. **POC validation**
   - Manual: verify data loads (WP or fallback), popup logic matches spec, chatbot returns useful matches.
   - Do not proceed until these 3 are stable.

**User stories (Phase 1)**
1. As a visitor, I can open the site and see content even if WordPress is not connected yet.
2. As an admin, I can set `NEXT_PUBLIC_WP_URL` and see live WordPress content without code changes.
3. As a visitor, after 12 seconds I see a subscribe modal with Telegram/WhatsApp CTAs.
4. As a visitor, if I subscribe once, I never see the modal again on future visits.
5. As a visitor, I can search in the chatbot and get clickable results from the site.

---

### Phase 2 — V1 App Development (MVP)
**Goal:** Build the full site around proven POC components.
1. **Project setup (replace CRA)**
   - Replace `/app/frontend` with Next.js 14+ (App Router).
   - Tailwind CSS + typography, Framer Motion, Lucide icons.
   - Configure supervisor to run Next dev server on port **3000**.
2. **Information architecture + routing**
   - Home: hero, category grid, latest feed, trending blocks.
   - Categories: `/category/[slug]` listing pages for all 9 categories.
   - Post detail: `/category/[slug]/[postSlug]` with share + apply CTA where relevant.
   - Static pages: `/about`, `/privacy-policy`, `/disclaimer`, `/terms`, `/report-bug`.
3. **Data layer**
   - `lib/wp.ts`: fetch categories/posts/single post; normalize to a common `Post` shape.
   - `data/demo/*.json`: 8–12 demo items per category.
   - Caching: basic fetch caching (Next `revalidate`) for WP mode.
4. **UI components (premium)**
   - Header: logo, nav, search.
   - Footer: category links, static pages, socials.
   - Cards: consistent listing cards with tags/date.
   - Sidebar blocks: “Latest”, “Popular”, “Tools”.
5. **Core features integration**
   - Subscribe popup component added globally (layout-level) with the Phase 1 logic.
   - Floating chatbot added globally; search includes posts + guides + tools.
   - Social share component on post detail (WhatsApp/Telegram/Facebook/Twitter/LinkedIn/Copy).
6. **SEO + crawlability**
   - JSON-LD: Organization + WebSite on home; Article on posts; JobPosting on job posts.
   - Metadata: titles/descriptions, OG + Twitter cards.
   - `app/robots.ts` and `app/sitemap.ts` (dynamic; includes category + post URLs).
7. **Report bug page**
   - Simple form via formsubmit.co (config via env) or mailto fallback.
8. **V1 testing**
   - Run one round with testing_agent_v3: navigation, responsive layout, popup logic, share links, chatbot, sitemap/robots.

**User stories (Phase 2)**
1. As a job seeker, I can browse Jobs and click an Apply link from a job detail page.
2. As a student, I can browse Admit Card/Results/Answer Key categories and open details quickly.
3. As a mobile user, I can navigate categories and read posts without layout issues.
4. As a visitor, I can share any post via WhatsApp/Telegram or copy link.
5. As a visitor, I can use site-wide search/chatbot to find relevant posts and open them.

---

### Phase 3 — Hardening + Content/SEO polish
1. **WordPress compatibility upgrades**
   - Support WP categories/tags mapping to site categories.
   - Optional: support ACF fields (applyLink, importantDates, eligibility) when present.
2. **Performance + UX**
   - Skeleton loaders, image optimization, pagination/infinite scroll on category pages.
   - Better search indexing for chatbot (tokenization, synonyms, category boost).
3. **SEO improvements**
   - Canonicals, breadcrumb schema, improved JobPosting schema fields.
   - Validate with structured data testing.
4. **Second testing pass**
   - testing_agent_v3: regression + mobile/tablet checks + sitemap coverage.

**User stories (Phase 3)**
1. As a visitor, I can paginate category listings without losing my place.
2. As a visitor, I see fast-loading pages with clear loading states.
3. As a search engine, I can crawl canonical URLs and understand breadcrumbs.
4. As a user, I get better chatbot matches even with partial/typo queries.
5. As a site owner, I can add ACF fields in WP and see them reflected on the site.

---

## 3) Next Actions
1. Scaffold Next.js app in `/app/frontend` and ensure it runs on port 3000.
2. Implement Phase 1 POC pages/components: WP fetch + fallback, popup, chatbot.
3. Validate POC manually; iterate until stable.
4. Proceed to Phase 2 full site build and run testing_agent_v3.

## 4) Success Criteria
- All 9 categories have listing pages and working post detail pages with demo content.
- WP integration works by setting `NEXT_PUBLIC_WP_URL`; fallback works when unset.
- Subscribe popup behavior matches spec (12s delay, localStorage, shows on next page if dismissed).
- Chatbot returns relevant on-site results and opens correct links.
- Social share works on post pages (WhatsApp/Telegram + others + copy).
- `robots.txt` and `sitemap.xml` available and include key routes.
- Responsive UI works on mobile/tablet/desktop and passes a full testing_agent_v3 run.
