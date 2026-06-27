# Progress Tracker

> One task active at a time. Mark `[~]` when in progress, `[x]` when done.
> Run `/remember` at end of every session to sync `agent/memory.md`.
> Run `/architect` before starting any new section or page.

---

## Phase 1 — Foundation & Setup

### 1.1 Project Initialization
- [ ] `npx create-next-app@latest` — TypeScript, Tailwind, App Router, src/ directory
- [ ] Configure `tsconfig.json` strict mode
- [ ] Configure `tailwind.config.ts` — brand color tokens (primary, secondary, alternate, bg-primary, bg-secondary, bg-alternate, border) + font families
- [ ] Install dependencies: `framer-motion`, `react-hook-form`, `zod`, `resend`, `lucide-react`, `clsx`, `tailwind-merge`
- [ ] Set up `.env.local` — `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `NEXT_PUBLIC_SITE_URL`
- [ ] Create `src/lib/utils.ts` with `cn()` utility
- [ ] Load fonts via `next/font/google` — Bricolage Grotesque (heading) + Inter (body)
- [ ] Set up `globals.css` — CSS variables, base resets, font assignments, scrollbar-hide utility
- [ ] Deploy empty shell to Vercel — confirm CI/CD pipeline

### 1.2 Type Definitions & Content Files
- [x] `src/types/index.ts` — Service, Pillar, TeamMember, Testimonial, StatItem, InsightArticle, FAQ, ProcessStep, CareerValue
- [x] `src/lib/content/services.ts` — 6 services with full copy
- [x] `src/lib/content/pillars.ts` — 4 investment pillars (Research, Diversification, Discipline, Performance)
- [x] `src/lib/content/team.ts` — David Lee, Sarah Mitchell, Michael Chen + placeholder slots
- [x] `src/lib/content/testimonials.ts` — 2 testimonials with metric + quote + attribution
- [x] `src/lib/content/stats.ts` — stat items
- [x] `src/lib/content/insights.ts` — 3 article cards (static)
- [x] `src/lib/content/faqs.ts` — FAQ items
- [x] `src/lib/content/performance.ts` — performance bar data (2021–2025)
- [x] `src/lib/content/careers.ts` — values, what we look for, open positions (placeholder)
- [x] `src/lib/schemas/contactSchema.ts` — Zod validation schema

---

## Phase 2 — Layout Shell

### 2.1 Navigation
- [x] `/architect` — Nav
- [x] Build `Nav` — Logo (lee-logo.png), links (Home, About Us, Services, Investment Strategies, Insights, Careers, Contact), [Client Portal] CTA button (top right)
- [x] Scroll behavior: transparent → white + border-bottom on scroll (Framer Motion useScroll)
- [x] Mobile menu — hamburger → full overlay
- [x] `/review` + `/imprint`

### 2.2 Footer
- [x] Build `Footer` — Logo, tagline, full nav links, legal links (Privacy, Terms, Compliance), social icons (LinkedIn, Instagram, X), copyright
- [x] `/review` + `/imprint`

---

## Phase 3 — Home Page (`/`)

### 3.1 Hero
- [x] `/architect` — Hero
- [x] Background video (autoplay, muted, loop) + dark overlay
- [x] Headline: "Managing Wealth. Building Legacies."
- [x] Subtext + two CTAs: [Schedule a Consultation] [Explore Our Services]
- [x] Trust line below: "Trusted by investors across Lagos, Venice, and beyond."
- [x] Framer Motion entrance: eyebrow → headline → subtext → CTAs, stagger 0.12s
- [x] `/review` + `/imprint`

### 3.2 About Snippet
- [x] Two-column layout: text left, image right
- [x] Headline: "A Partner You Can Trust With Your Financial Future"
- [x] Body paragraph + 4 checklist items (Preserve Capital, Sustainable Growth, Manage Risk, Multi-Generational Wealth)
- [x] [Learn More About Us] link
- [x] `/imprint`

### 3.3 Services Overview Grid
- [x] Eyebrow: "Our Investment Solutions"
- [x] Headline: "Whatever your financial goals, we have the expertise and the tools to help you get there."
- [x] 6-card grid (3 cols desktop, 2 tablet, 1 mobile): Wealth Management, Portfolio Management, Retirement Planning, Institutional Investments, Alternative Investments, Risk Management
- [x] Each card: icon + title + one-line description
- [x] [View All Services] CTA link
- [x] `/review` + `/imprint`

### 3.4 Why Choose Us
- [x] Headline: "Experience. Discipline. Results."
- [x] Subtext paragraph
- [x] 4-item grid: Strategic Investment Approach, Client-Centered Service, Transparent Communication, Security & Compliance
- [x] `/imprint`

### 3.5 Investment Philosophy (4 Pillars)
- [x] Eyebrow: "Investment Philosophy"
- [x] Headline: "The Four Pillars We Never Compromise On"
- [x] 4 items: Research, Diversification, Discipline, Performance — title + description each
- [x] `/imprint`

### 3.6 Performance Preview
- [x] Headline: "Consistent Growth, Year After Year"
- [x] Visual bar chart — 2021–2025 horizontal bars (static, CSS/SVG)
- [x] "+18.7% Average Annual Growth" stat
- [x] Disclaimer text below
- [x] `/imprint`

### 3.7 Leadership Snapshot
- [x] Eyebrow: "Leadership"
- [x] Headline: "The People Behind Your Portfolio"
- [x] 3-column team grid: David Lee, Sarah Mitchell, Michael Chen — photo + name + title + bio snippet
- [x] [Meet the Full Team] link
- [x] `/imprint`

### 3.8 Insights Preview
- [x] Eyebrow: "Insights"
- [x] Headline: "What We're Watching Right Now"
- [x] 3 article cards: title + category tag + [Read Article] link
- [x] [View All Insights] CTA
- [x] `/imprint`

### 3.9 Testimonials
- [x] 2 testimonial cards: star rating + quote + attribution
- [x] Carousel or static 2-column grid
- [x] `/imprint`

### 3.10 Contact Snippet + Footer CTA
- [x] Dark section: "Ready to Take the First Step?"
- [x] Office details (Lagos + Venice placeholder) + email + phone
- [x] [Schedule a Consultation] CTA button
- [x] `/review`

### 3.11 Assemble Home Page
- [x] Wire all sections into `app/page.tsx` in correct order
- [x] `/review`

---

## Phase 4 — About Us Page (`/about`)

- [x] `/architect` — About page redesign aligning with the reference mockup layout
- [x] Hero: Full-bleed image background, bottom-aligned white text overlay
- [x] Our Story: Centered typography layout (image removed for whitespace balance)
- [x] Commitments: 4-card grid with index-based asymmetric backgrounds
- [x] Stats Section: [NEW] Centered layout with 2 large stat callouts ("20+ Years", "2 Hubs")
- [x] Why Choose Us: Dark banner header with 4 differentiator cards below it
- [x] Investment Philosophy: Expanded 4 pillars bento grid
- [x] Leadership: Full leadership partners grid with frosted glass details
- [x] Footer CTA & Consultation Modal integration
- [x] `/review` + `/imprint`


---

## Phase 5 — Services Page (`/services`)

- [x] `/architect`
- [x] Hero: "Investment Solutions Built Around You"
- [x] Intro paragraph
- [x] 6 service sections — each with: headline, body, bulleted "What this includes" checklist
  - [x] Wealth Management
  - [x] Portfolio Management
  - [x] Retirement Planning
  - [x] Institutional Investments
  - [x] Alternative Investments
  - [x] Risk Management
- [x] Closing CTA: "Not Sure Where to Start?" + [Schedule a Consultation] [Contact Us]
- [x] Redesigned service cards on Home and Services pages matching visual mock, adding CTA buttons connecting to the consultation modal
- [x] `/review` + `/imprint`

---

## Phase 6 — Investment Strategies Page (`/strategies`)

- [x] `/architect`
- [x] Hero: "How We Invest Your Wealth"
- [x] Philosophy intro: "We Invest With Conviction — Not Noise"
- [x] 4 Pillars expanded (Research, Diversification, Discipline, Performance — full paragraph each)
- [x] Strategy Breakdown: 5 strategies (Equity, Fixed Income, Alternative Assets, Real Estate, Global Diversification)
- [x] Risk Management Framework section
- [x] Performance section (same chart as Home)
- [x] CTA: [Talk to an Advisor] [Schedule a Consultation]
- [x] `/review` + `/imprint`

---

## Phase 7 — Insights Page (`/insights`)

- [x] `/architect`
- [x] Hero: "Market Intelligence. Financial Perspective."
- [x] Featured article card (large, full-width)
- [x] Article grid (2–3 cards)
- [x] Category filter tags (static in Phase 1)
- [x] Newsletter signup: email input + [Subscribe] button
- [x] `/review` + `/imprint`

---

## Phase 8 — Careers Page (`/careers`)

- [x] Hero: "Build Something That Matters"
- [x] Why Join us — 4 reasons
- [x] What We Look For — checklist items
- [x] Open Positions — placeholder section (pending from client)
- [x] CTA: [Submit Your Application] (mailto link)
- [x] `/review` + `/imprint`

---

## Phase 9 — Contact Page (`/contact`)

- [x] `/architect`
- [x] Hero: "Your Financial Future Starts With a Conversation"
- [x] Contact form: Full Name, Email, Phone, Investment Goals (select), Message
- [x] Form validation (React Hook Form + Zod)
- [x] Loading / success / error states
- [x] API route: `/app/api/contact/route.ts` → Resend
- [x] Office details: Lagos + Venice (addresses pending)
- [x] "What Happens After You Reach Out?" — 3-step process
- [x] End-to-end test
- [x] `/review`

---

## Phase 10 — SEO, Performance & QA

- [x] `metadata` export on all 7 pages
- [x] OpenGraph metadata + og:image
- [x] `app/sitemap.ts` + `app/robots.ts`
- [x] Lighthouse audit all pages — target > 90 mobile
- [x] CLS = 0 on all animated sections
- [x] All images: `next/image` with explicit dimensions
- [x] All fonts: `next/font` only
- [x] Test all pages at 375px, 768px, 1280px
- [x] Test contact form on mobile
- [x] Move Asset Allocations (`StrategyBreakdownSection`) to Homepage after "Our Investment Solutions"
- [x] Redesign Insights page to boxed hero + dark 3-column layout with share-arrow cards
- [x] Subpage Hero background image enhancements for Careers, Insights, and Contact page heroes

---

## Phase 11 — Handover

- [ ] Production domain live on Vercel
- [ ] `.env` variables documented and handed over securely
- [ ] Client briefed on content update process (`/lib/content/` files)
- [ ] Pending items list given to client (photos, addresses, phone numbers)
- [ ] Loom walkthrough recorded
- [ ] `/remember` — final session snapshot
