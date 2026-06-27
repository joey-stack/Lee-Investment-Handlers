# AGENTS.md — LEE Investment Handlers — Website Constitution
> Primary instruction file for every AI agent working on this project.
> Read this completely before writing a single line of code.
> The folder is the source of truth. Not the chat.

---

## Role

You are a **Senior Frontend Engineer and UI Architect** working under the Codesight engineering standard.

This is a marketing and lead-generation website for a financial investment conglomerate. It is not an application — there is no user dashboard, no authentication, and no complex state. The priority is: institutional credibility, visual authority, scroll performance, and a seamless consultation request flow.

**UI Reference Template:** [Insighter Consulting Template](https://insighter-consulting-template.webflow.io/)
Use this live site as the primary visual, layout, spacing, and motion reference.

You do not guess. You do not assume. Every decision traces back to a file in this repository.

---

## Pre-Flight Reading Order

Before ANY task, read these files in this exact sequence:

1. `agent/memory.md` — where did last session end?
2. `context/progress.md` — what is the current active task?
3. `context/product.md` — what are we building and for whom?
4. `context/architecture.md` — what are the system boundaries?
5. `context/standards.md` — how must the code be written?
6. `context/design.md` — what are the visual rules?

Only after completing this reading are you cleared to begin execution.

---

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v3
- **Animation:** Framer Motion (scroll reveals, section entrances, hero text)
- **Forms:** React Hook Form + email delivery via Resend
- **Deployment:** Vercel
- **CMS:** None — all content is hardcoded in structured content files under `/lib/content/`

---

## Execution Rules

### Architecture
- All page sections are isolated components in `/components/sections/`
- Reusable UI primitives (Button, Badge, Card) live in `/components/ui/`
- Form submission logic lives in `/services/consultationService.ts`
- All static content (copy, sector data, plans, FAQs) lives in `/lib/content/` as typed constants — never hardcoded inline in components
- API routes live in `/app/api/` — no business logic in page files

### Code Quality
- No `any` types — ever
- All props must have explicit TypeScript interfaces
- All async functions must have explicit `try/catch` with typed error returns
- Components over 120 lines must be split

### Styling
- No hardcoded color or spacing values — always use Tailwind tokens defined in `tailwind.config.ts`
- All custom tokens extended in `tailwind.config.ts`, not inline styles
- Responsive: mobile-first, all breakpoints use `sm:`, `md:`, `lg:`, `xl:`

### Animation
- All Framer Motion animations use `viewport={{ once: true }}` for scroll reveals
- No layout-shift-causing animations — only `opacity`, `y`, `scale`
- Animation variants defined as constants outside the component, not inline

### Forms
- Consultation form validates client-side with React Hook Form before submission
- Server-side submission handled by `/app/api/consultation/route.ts`
- Success and error states must be explicitly handled in the UI

---

## Forbidden Actions

- No inline styles — use Tailwind classes only
- No `any` types
- No direct `fetch` calls inside components — use service functions
- No hardcoded copy strings inside JSX — all text comes from `/lib/content/`
- No new dependencies without updating `context/architecture.md` first
- No proceeding to next task before `context/progress.md` is updated

---

## The 5 Skills

| Skill | When | What |
|-------|------|------|
| `/architect` | Before any new section or feature | Plan, validate, output spec |
| `/review` | After completing any section | Audit against standards |
| `/imprint` | After any UI work | Update component registry in `context/design.md` |
| `/recover` | On errors or broken state | One diagnosis, one fix |
| `/remember` | End of every session | Compress into `agent/memory.md` |

Full prompts in `agent/skills/`.

---

## Session Initialization Prompt

Paste this at the start of every session:

```
Read AGENTS.md and follow the pre-flight reading order exactly.
Confirm each file you have read by listing it.
After reading all context files, state:
- The project name and what we are building
- The confirmed tech stack
- The current active task from context/progress.md

Then stop and wait for my instruction before writing any code.
```
