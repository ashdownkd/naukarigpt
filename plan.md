# plan.md — NaukariGPT.com (Next.js + Headless WordPress)

## 1) Objectives
- Deliver a modern, premium, **black-dominant + electric-blue accent** responsive portal for jobs/education content.
- Provide **9 category listing pages** + **post detail pages** + **static legal/info pages**.
- Support **Headless WordPress via WP REST API** (configurable by env), with **demo dataset fallback** so the site works without WP.
- Implement **subscribe popup after 12 seconds** with **Telegram + WhatsApp** CTAs and **localStorage persistence**:
  - Subscribe ⇒ never show again.
  - Dismiss ⇒ show again on next page navigation.
- Add floating **bottom-right chatbot** (no paid API) that answers by searching site content and returning clickable links.
- Ship SEO essentials: **JSON-LD schema**, OG/Twitter meta, **robots.txt**, **sitemap.xml**.
- Keep architecture compatible with **free hosting** (Vercel/Netlify) and minimal running costs.

**Current status:** Phase 2 (Main Build / MVP) is **completed**. Site is fully functional with demo content and ready for WP integration.

---

## 2) Implementation Steps

### Phase 1 — Core POC (Isolation)
**Goal:** Validate the high-risk pieces in isolation.

**Status:** ✅ *Effectively completed as part of Phase 2 implementation* (components built and verified).

1. **WP REST fetch POC**
   - Fetch posts from `NEXT_PUBLIC_WP_URL/wp-json/wp/v2/posts?...`.
   - Fallback to demo content when WP URL is missing/unreachable.
   - Normalize mapping: title, slug, date, excerpt/content, tags, and optional meta (applyLink, important dates, etc.).
   - **Implemented:** `src/lib/wp.js` (fetch + normalize) with demo fallback.

2. **Subscribe popup POC**
   - 12s timer modal.
   - localStorage logic:
     - `ngpt_subscribed=true` ⇒ never show.
     - `ngpt_subscribe_dismissed=true` ⇒ show again on next route change.
   - Buttons: Telegram + WhatsApp.
   - **Implemented:** `src/components/site/SubscribeModal.jsx`.
   - **Note:** React Strict Mode timing bug fixed (removed useRef guard approach; now robust in dev + prod).

3. **Chatbot POC**
   - Floating widget; simple search/scoring over demo content.
   - Returns top matches with clickable links.
   - No external APIs.
   - **Implemented:** `src/components/site/ChatWidget.jsx`.

4. **POC validation**
   - Manual verification completed:
     - Content loads.
     - Popup timing and persistence works.
     - Chat widget returns results and links correctly.

**User stories (Phase 1)**
1. ✅ As a visitor, I can open the site and see content even if WordPress is not connected yet.
2. ✅ As an admin, I can set `NEXT_PUBLIC_WP_URL` and see live WordPress content without code changes (integration is present; WP instance needed to fully confirm live data).
3. ✅ As a visitor, after 12 seconds I see a subscribe modal with Telegram/WhatsApp CTAs.
4. ✅ As a visitor, if I subscribe once, I never see the modal again on future visits.
5. ✅ As a visitor, I can search in the chatbot and get clickable results from the site.

---

### Phase 2 — V1 App Development (MVP)
**Goal:** Build the full site around proven components.

**Status:** ✅ **Completed**

1. **Project setup (replace CRA)**
   - ✅ Migrated `/app/frontend` from CRA to **Next.js 14 (App Router)**.
   - ✅ Tailwind CSS + Framer Motion + Lucide + shadcn/ui.
   - ✅ Supervisor runs Next dev server on port **3000**.
   - ✅ Added required configs:
     - `package.json`, `next.config.js`, `tailwind.config.js`, `postcss.config.js`, `jsconfig.json`, `.env.local`.

2. **Information architecture + routing**
   - ✅ Home: hero + bento categories + ticker + feed + trending + tools rail.
   - ✅ Categories: `/category/[slug]` for all 9 categories.
   - ✅ Post detail: `/category/[slug]/[postSlug]`.
   - ✅ Static pages: `/about`, `/privacy-policy`, `/disclaimer`, `/terms`, `/report-bug`.
   - ✅ Custom 404 (`not-found.js`).

3. **Data layer**
   - ✅ Demo dataset created: `src/data/demo.js` with **72 posts across 9 categories**.
   - ✅ Site config: `src/data/site.js`.
   - ✅ WP fetcher: `src/lib/wp.js` (ready for headless WP).

4. **UI components (premium)**
   - ✅ Top navigation with categories + search.
   - ✅ Footer with categories + pages + social links.
   - ✅ Post cards with badges + meta + CTAs.
   - ✅ Right-rail widgets (Trending + Tools).
   - ✅ Category bento tiles.

5. **Core features integration**
   - ✅ Subscribe popup (12s + persistence, Telegram + WhatsApp).
   - ✅ Floating chatbot with search results.
   - ✅ Social share on post detail: WhatsApp/Telegram/Facebook/Twitter/LinkedIn/Copy.
   - ✅ Sticky mobile apply bar on post pages.

6. **SEO + crawlability**
   - ✅ JSON-LD:
     - Organization + WebSite on root layout.
     - Article + JobPosting on post pages.
   - ✅ Metadata, OG/Twitter defaults.
   - ✅ `robots.txt` + `sitemap.xml` implemented via `app/robots.js` and `app/sitemap.js`.

7. **Report bug page**
   - ✅ Form implemented with **Formspree endpoint support** and **mailto fallback**.

8. **V1 testing**
   - ✅ Manual checks completed:
     - All routes return HTTP 200.
     - Mobile responsiveness confirmed.
     - sitemap + robots generated correctly.
     - Popup logic and chatbot validated.

**User stories (Phase 2)**
1. ✅ As a job seeker, I can browse Jobs and click an Apply link from a job detail page.
2. ✅ As a student, I can browse Admit Card/Results/Answer Key categories and open details quickly.
3. ✅ As a mobile user, I can navigate categories and read posts without layout issues.
4. ✅ As a visitor, I can share any post via WhatsApp/Telegram or copy link.
5. ✅ As a visitor, I can use site-wide search/chatbot to find relevant posts and open them.

---

### Phase 3 — Testing + Polish + Production Readiness
**Goal:** Run automated testing, fix issues, and harden WordPress compatibility for future use.

**Status:** ⏳ Next

1. **End-to-end verification (testing_agent_v3)**
   - Run full navigation and UI flow tests:
     - Home → category → post detail.
     - Popup timing + dismissal reappearance + subscribe persistence.
     - Chat widget query flow + result link navigation.
     - Social share links.
     - robots/sitemap availability.
     - Mobile + tablet layouts.

2. **Fix any issues found by automated testing**
   - UI regressions, missing test ids, broken links, edge-case navigation.
   - Ensure no console errors and acceptable performance.

3. **WordPress compatibility upgrades (optional but recommended)**
   - Expand WP mapping:
     - Map WP categories/tags to site categories.
     - Support ACF/meta fields: applyLink, vacancies, eligibility, dates, officialLink.
   - Add featured image support when WP has `featured_media`.

4. **Performance + UX polish**
   - Skeleton loaders.
   - Pagination or load-more for category pages.
   - Improve chatbot matching (tokenization/synonyms, typo tolerance) if needed.

5. **SEO hardening**
   - Breadcrumb JSON-LD (optional enhancement).
   - Canonical checks and structured data validation.

**User stories (Phase 3)**
1. As a visitor, I can navigate the full site without UI errors or broken interactions.
2. As a visitor, I see fast-loading pages with clear loading states.
3. As a search engine, I can crawl canonical URLs and understand structured data.
4. As a user, I get better chatbot matches even with partial/typo queries.
5. As a site owner, I can connect WordPress and see richer fields reflected in posts.

---

## 3) Next Actions
1. **Run testing_agent_v3** for end-to-end verification.
2. Fix issues found (if any), then re-run targeted tests.
3. (Optional) Improve WordPress mapping/ACF support and add featured image support.
4. Prepare deployment notes for free hosting:
   - Set env vars: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_TELEGRAM_URL`, `NEXT_PUBLIC_WHATSAPP_URL`, optional `NEXT_PUBLIC_WP_URL`, optional `NEXT_PUBLIC_FORMSPREE_ENDPOINT`.

---

## 4) Success Criteria
- ✅ All 9 categories have listing pages and working post detail pages with demo content.
- ✅ Subscribe popup behavior matches spec (12s delay, localStorage, reappears on next page if dismissed; never shows if subscribed).
- ✅ Chatbot returns relevant on-site results and opens correct links.
- ✅ Social share works on post pages (WhatsApp/Telegram + others + copy).
- ✅ `robots.txt` and `sitemap.xml` are available and include key routes.
- ✅ Responsive UI works on mobile/tablet/desktop.
- ⏳ Pass a full **testing_agent_v3** run with no critical issues.
- ⏳ WordPress integration confirmed against a live WP endpoint (when provided), with fallback preserved.
