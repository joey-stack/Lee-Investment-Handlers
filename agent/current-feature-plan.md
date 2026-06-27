# Feature Plan: Phase 4 — About Us Page (`/about`)

Date: 2026-06-25

## What We're Building
We are implementing the `/about` page to establish institutional credibility and narrative. This page will feature a Hero section ("Built on Trust. Driven by Results."), an "Our Story" block with a 2-column layout (text + image), "Mission & Vision" cards, an expansion of the "Four Commitments", the "Investment Philosophy" (expanded 4 pillars), "Why Choose Us" (4 differentiators), a full "Leadership" section featuring extended team bios, and a final "Contact/Footer CTA" block prompting users to schedule a consultation.

## Files to Create
- [NEW] `src/app/about/page.tsx` — The main Next.js page component for the About Us route.
- [NEW] `src/components/sections/AboutHeroSection.tsx` — Hero component tailored for the About page.
- [NEW] `src/components/sections/OurStorySection.tsx` — 2-column text/image split section.
- [NEW] `src/components/sections/MissionVisionSection.tsx` — Grid for Mission & Vision statements.
- [NEW] `src/components/sections/AboutCommitmentsSection.tsx` — 4-item commitments layout.
- [NEW] `src/components/sections/AboutPillarsSection.tsx` — Expanded 4 pillars view.
- [NEW] `src/components/sections/AboutWhyChooseUsSection.tsx` — Expanded 4 differentiators grid.
- [NEW] `src/components/sections/AboutLeadershipSection.tsx` — Full team grid with extended bios.

## Files to Modify
- [MODIFY] `src/lib/content/about.ts` — Add new copy variables for Hero, Our Story, Mission & Vision, and Why Choose Us.
- [MODIFY] `context/progress.md` — Mark Phase 4 as in-progress.
- [MODIFY] `context/design.md` — Document new About page components.

## Data Flow
1. Static text content is sourced entirely from `/lib/content/about.ts`, `team.ts`, `pillars.ts`.
2. Page rendering happens on the server via Next.js App Router (SSG).
3. `framer-motion` hooks execute on the client to handle staggered entrance reveals for each section.
4. The Footer CTA uses the standard layout link to either the `/contact` page or opens the consultation modal.

## Acceptance Criteria
- [ ] `/about` route exists and renders without layout breaking.
- [ ] No hardcoded copy exists in the components; everything derives from `src/lib/content/`.
- [ ] All 8 designated sections (Hero, Story, Mission/Vision, Commitments, Philosophy, Why Us, Leadership, CTA) are implemented and responsive.
- [ ] Leadership bios fully expand on the shorter snippets used on the Home page.
- [ ] Animations trigger smoothly on scroll (using `once: true`).
- [ ] `pnpm build` finishes with no TypeScript or linting errors.

## Dependencies Added
- None
