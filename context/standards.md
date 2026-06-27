# Code Standards

## TypeScript

- `strict: true` in `tsconfig.json` — always
- No `any` types — use `unknown` + narrowing where truly needed
- All props: explicit interface
- All service returns: explicit typed response
- All async functions: explicit `try/catch` + typed error

```ts
// ✅ Correct
interface ConsultationResponse {
  success: boolean;
  error?: string;
}

async function submitConsultation(data: ConsultationFormData): Promise<ConsultationResponse> {
  try {
    await resend.emails.send({ ... });
    return { success: true };
  } catch (err) {
    console.error("submitConsultation failed:", err);
    return { success: false, error: "Unable to send your request. Please try again." };
  }
}

// ❌ Wrong
async function submitConsultation(data: any): Promise<any> { ... }
```

---

## Component Pattern

```tsx
// ✅ Section component — receives data as props, no fetching
interface SectorGridProps {
  sectors: Sector[];
}

export default function SectorGrid({ sectors }: SectorGridProps) {
  return (
    <section className="py-20 px-6 bg-brand-bg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sectors.map((sector) => (
          <SectorCard key={sector.id} sector={sector} />
        ))}
      </div>
    </section>
  );
}
```

**Rules:**
- Props only — no internal `fetch`, no `useEffect` data calls inside section components
- All text content passed as props sourced from `/lib/content/`
- Max ~120 lines per component file — split if longer

---

## Content Pattern

```ts
// ✅ /lib/content/sectors.ts
import { Sector } from "@/types";

export const sectors: Sector[] = [
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Strategic property investments across residential and commercial markets.",
    icon: "building",
    highlights: ["Portfolio diversification", "Capital appreciation", "Rental income streams"],
  },
  // ...
];

// ✅ Used in page file
// app/sectors/page.tsx
import { sectors } from "@/lib/content/sectors";
export default function SectorsPage() {
  return <SectorGrid sectors={sectors} />;
}
```

---

## Animation Pattern (Framer Motion)

```tsx
// ✅ Variants defined outside the component
const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ✅ Used in component
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
  {items.map((item) => (
    <motion.div key={item.id} variants={fadeUpVariants}>
      {/* content */}
    </motion.div>
  ))}
</motion.div>
```

---

## Form Pattern (React Hook Form + Zod)

```tsx
// ✅ Schema in /lib/schemas/consultationSchema.ts
import { z } from "zod";

export const consultationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone number required"),
  investmentRange: z.string().min(1, "Please select a range"),
  preferredTenure: z.enum(["6 months", "12 months", "24 months", "undecided"]),
  message: z.string().optional(),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;
```

---

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `HeroSection`, `SectorCard` |
| Hooks | `use` + PascalCase | `useScrollReveal` |
| Services | camelCase + `Service` | `consultationService` |
| Content files | camelCase | `sectors.ts`, `plans.ts` |
| Types | PascalCase | `Sector`, `InvestmentPlan` |
| Files | kebab-case | `sector-card.tsx`, `hero-section.tsx` |
| Tailwind classes | Tailwind conventions | `brand-accent`, `brand-bg` |

---

## API Route Pattern

```ts
// ✅ /app/api/consultation/route.ts
import { NextRequest, NextResponse } from "next/server";
import { consultationSchema } from "@/lib/schemas/consultationSchema";
import { submitConsultation } from "@/services/consultationService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = consultationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
    }

    const result = await submitConsultation(parsed.data);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
```

---

## SEO Pattern

Every page must export metadata:

```ts
// ✅ app/plans/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Plans | [Firm Name]",
  description: "Explore our Structured Investment Program — 6, 12, and 24 month tenures across Real Estate, Oil & Gas, Iron & Steel, and Forex.",
};
```
