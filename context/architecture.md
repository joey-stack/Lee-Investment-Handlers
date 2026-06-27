# Architecture Context

## Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 14 (App Router) | Static generation for all pages |
| Language | TypeScript strict | `strict: true` in tsconfig |
| Styling | Tailwind CSS v3 | Custom brand tokens in `tailwind.config.ts` |
| Animation | Framer Motion | Scroll reveals, hero entrance, tab switches, FAQ accordion |
| Forms | React Hook Form + Zod | Client-side validation |
| Email | Resend | Contact form → client inbox |
| Deployment | Vercel | Auto-deploy from main branch |
| Analytics | Vercel Analytics | Page views + form conversion events |
| CMS | None (Phase 1) | All content in `/lib/content/` as typed constants |

---

## Folder Structure

```
/src
├── app/
│   ├── layout.tsx                  # Root layout — Nav + Footer + fonts + analytics
│   ├── page.tsx                    # Home (/)
│   ├── about/page.tsx              # About Us (/about)
│   ├── services/page.tsx           # Services (/services)
│   ├── strategies/page.tsx         # Investment Strategies (/strategies)
│   ├── insights/page.tsx           # Insights (/insights)
│   ├── careers/page.tsx            # Careers (/careers)
│   ├── contact/page.tsx            # Contact (/contact)
│   └── api/
│       └── contact/
│           └── route.ts            # Contact form → Resend
│
├── components/
│   ├── ui/                         # Primitives — Button, Badge, SectionLabel, ChecklistItem, Card
│   ├── sections/                   # Page sections — one file per section
│   └── layout/                     # Nav, Footer, MobileMenu
│
├── lib/
│   ├── content/                    # ALL static copy — never inline in components
│   │   ├── services.ts             # 6 services
│   │   ├── pillars.ts              # 4 investment pillars
│   │   ├── team.ts                 # Team members
│   │   ├── testimonials.ts         # Testimonials
│   │   ├── stats.ts                # Stat items
│   │   ├── insights.ts             # Article cards
│   │   ├── faqs.ts                 # FAQ items
│   │   ├── performance.ts          # Performance bar data
│   │   ├── careers.ts              # Career values + positions
│   │   └── nav.ts                  # Nav links array
│   ├── schemas/
│   │   └── contactSchema.ts        # Zod form schema
│   └── utils.ts                    # cn() utility
│
├── services/
│   └── contactService.ts           # Resend email logic
│
├── hooks/
│   └── useScrollReveal.ts          # Shared Framer Motion scroll hook
│
└── types/
    └── index.ts                    # All shared TypeScript interfaces
```

---

## Boundary Rules

- `components/sections/` — props only. No data fetching. No Firebase. No API calls.
- `components/ui/` — zero business logic. Purely presentational.
- `lib/content/` — single source of all copy. Never write strings in JSX.
- `services/` — all external calls. No React imports.
- `app/api/` — server-side only. No React/UI imports.
- `hooks/` — shared logic only. No direct API calls.

---

## Data Models

```ts
// types/index.ts

interface Service {
  id: string;
  title: string;
  description: string;
  includes: string[];
  icon: string; // Lucide icon name
}

interface Pillar {
  id: string;
  title: string;
  body: string;
  icon?: string;
}

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  bioShort: string;
  image: string; // path in /public/team/
  linkedin?: string;
}

interface Testimonial {
  id: string;
  quote: string;
  attribution: string;
  role: string;
  rating: number;
  metric?: string;
  metricLabel?: string;
}

interface StatItem {
  value: string;
  label: string;
}

interface InsightArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  slug: string;
  featured?: boolean;
}

interface PerformanceBar {
  year: string;
  value: number; // percentage width 0–100
  label: string;
}

interface CareerValue {
  title: string;
  description: string;
}

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  investmentGoals: string;
  message: string;
}
```

---

## Environment Variables

```
RESEND_API_KEY=
CONTACT_EMAIL_TO=         # Client receiving email
NEXT_PUBLIC_SITE_URL=     # Production URL
```

---

## Approved Dependencies

```json
{
  "framework": "next@14",
  "language": "typescript",
  "styling": "tailwindcss",
  "animation": "framer-motion",
  "forms": "react-hook-form",
  "validation": "zod",
  "email": "resend",
  "icons": "lucide-react",
  "utilities": ["clsx", "tailwind-merge"],
  "analytics": "@vercel/analytics"
}
```

---

## Performance Targets

- LCP: < 2.5s on mobile
- CLS: 0 (no layout shifts from animation)
- Lighthouse Performance (mobile): > 90
- All images: `next/image`, WebP, explicit dimensions
- All fonts: `next/font/google` only — no external CDN calls
