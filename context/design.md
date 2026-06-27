# Design Context
> Extracted from insighter-consulting-template.webflow.io (live site + style guide)
> This is the reference design system for the LEE Investment Handlers website.
> All spacing, typography, color, motion, buttons, and component patterns are sourced directly from this template.
> Updated via `/imprint` after every UI session.

---

## Visual Direction & Atmosphere

Insighter embodies sophisticated minimalism with warm, organic undertones—a design language that conveys strategic expertise and approachable professionalism. The system prioritizes clarity and legibility through generous whitespace, deliberate color restraint, and confident typography. Warm earth tones pair with a striking golden accent, creating an elevated yet human aesthetic. This is a consulting-first design that balances authority with accessibility, designed for growth-stage businesses and advisory firms seeking credibility without coldness.

This is a LIGHT MODE design system. Background is white/off-white. Text is dark.

---

## Color System

> [!IMPORTANT]
> **Project Color Preservation Rule:**
> We maintain the colors already established in this project and ignore the alternative color hex codes in the raw Insighter extraction. Color variables are defined in `tailwind.config.ts` and mapped as follows:

```ts
// tailwind.config.ts → theme.extend.colors
colors: {
  brand: {
    // Primary — used for: primary background, dominant structural color, text on light surfaces
    primary:      '#0A0A0A',     // Near-black (Insighter text-color-primary)

    // Secondary — used for: body text, muted labels, paragraph text
    secondary:    '#4A4A4A',     // Dark grey (Insighter text-color-secondary)

    // Alternate — used for: eyebrow labels, accent links, active states, and Primary CTA buttons
    alternate:    '#C8A96E',     // Warm gold — LEE brand accent (replaces Insighter yellow)

    // Backgrounds
    'bg-primary':   '#FFFFFF',   // Pure white — main page background / primary surface
    'bg-secondary': '#F7F6F4',   // Off-white/warm grey — alternate sections / secondary surface
    'bg-alternate': '#0A0A0A',   // Near-black — dark CTA sections, footer, header navigation

    // Borders
    border:         '#E8E5E0',   // Warm light grey — input borders, subtle dividers, card borders
    'border-dark':  '#2A2A2A',   // Dark — borders on dark sections

    // Interactive Button States (Preserving existing tokens)
    'btn-primary':  '#C8A96E',   // Primary button background (Warm Gold)
    'btn-hover':    '#B8995E',   // Primary button hover (Darkened Gold)
    'btn-secondary-border': '#E8E5E0', // Secondary button border / light gray input border
  }
}
```

---

## Typography Rules

### Font Families

```ts
// next/font/google — loaded in root layout
fontFamily: {
  heading: ['var(--font-heading)', 'sans-serif'], // Didact Gothic — H1–H3 Display headings
  body:    ['var(--font-body)', 'sans-serif'],    // Geist — body, UI, forms, and buttons
}
```

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / H1 | Didact Gothic | 56px | 400 | 61.6px | 0px | Hero headlines, page titles, major sections |
| Heading 2 | Didact Gothic | 32px | 400 | 38.4px | 0px | Section headings, card titles |
| Heading 3 | Didact Gothic | 28px | 400 | 33.6px | 0px | Subsection headings, emphasis text |
| Body Text | Geist | 16px | 400 | 24px | 0px | Primary paragraph, card content, descriptions |
| Body Emphasis | Geist | 16px | 500 | 24px | 0px | Links, strong emphasis within body |
| Label / Form | Geist | 14.4px | 400 | 21.6px | 0px | Form labels, captions, small emphasis |
| Input Text | Geist | 14.4px | 500 | 21.6px | 0px | Form input content, field values |
| Navigation | Geist | 14px | 500 | 19.6px | 0px | Header navigation, link items |
| Caption / Small | Geist | 12px | 400 | 16.8px | 0px | Disclaimers, timestamps, meta information |

### Typography Principles
- **Weight Discipline:** Only `400` (regular) and `500` (medium) weights are used. No bold weights are needed due to the typefaces' inherent geometric elegance.
- **Line Height Generosity:** 1.5x to 1.6x line heights ensure clean visual breathing room and legibility.
- **Hierarchy through Size:** Sizing is the primary hierarchy driver for headings (Didact Gothic), while Geist size and weight are used sparingly.
- **Didact Gothic Reserved for Headings:** Strictly used for headings H1–H3 to maintain distinct display voice.
- **Geist Fallback Stack:** `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

---

## Component Stylings

### Buttons

**Primary Button**
- Background: `#C8A96E` (Warm Gold)
- Text Color: `#0A0A0A` (Near-Black)
- Font: Geist, 16px, weight 500
- Padding: `16px 32px` (48px total height)
- Border Radius: `0px` (sharp geometric style)
- Border: `0px none`
- Hover State: Background shifts to `#B8995E` (slightly darker gold), text remains `#0A0A0A`
- Active State: Background darkens to `#A8894E`
- Disabled State: Background becomes `#D7CAC1` (Dust Beige), text becomes `#BFAB9C` (Soft Taupe)
- Usage: Reserved for primary CTAs and high-priority form submissions.

**Secondary Button (Outlined)**
- Background: `rgba(0, 0, 0, 0)` (transparent)
- Text Color: `#FFFFFF` (on dark backgrounds) or `#0A0A0A` (on light backgrounds)
- Font: Geist, 16px, weight 400
- Padding: `16px 32px`
- Border Radius: `0px`
- Border: `1px solid currentColor`
- Hover State: Background becomes `rgba(255, 255, 255, 0.1)` on dark, or `rgba(10, 10, 10, 0.05)` on light
- Active State: Background becomes `rgba(255, 255, 255, 0.2)` or `rgba(10, 10, 10, 0.1)`

**Ghost Button**
- Background: `rgba(0, 0, 0, 0)`
- Text Color: `#4A4A4A` (brand-secondary)
- Font: Geist, 16px, weight 500
- Padding: `0px` (text-only link)
- Border Radius: `0px`
- Border: `0px none`
- Hover State: Text color shifts to `#0A0A0A` (brand-primary)
- Active State: Text color becomes `#000000`

**Icon Button**
- Background: `rgba(0, 0, 0, 0)`
- Icon Color: `#FFFFFF` (on dark) or `#0A0A0A` (on light)
- Width: `32px` (extends to `44px` touch hit area on mobile)
- Height: `32px`
- Border Radius: `0px`
- Border: `0px none`
- Hover State: Icon color shifts 20% lighter on dark backgrounds, or darker on light backgrounds

---

### Cards & Containers

**Standard Card**
- Background: `#FFFFFF` (brand-bg-primary)
- Text Color: `#0A0A0A`
- Font: Geist, 16px, weight 400
- Padding: `16px`
- Border Radius: `6px`
- Border: `0px none`
- Box Shadow: `none` (flat design baseline)
- Hover State: Subtle shadow applied: `0px 8px 24px rgba(0, 0, 0, 0.08)` (Lift 2) + vertical translation `-2px`

**Case Study Card**
- Background: `#FFFFFF`
- Text Color: `#0A0A0A`
- Font: Geist, 16px, weight 400
- Padding: `16px`
- Border Radius: `6px`
- Border: `1px solid #E8E5E0` (brand-border)
- Box Shadow: `none`
- Image Header: Image fills card width, border-radius styled to `6px 6px 0px 0px`

**Feature Container**
- Background: `#0A0A0A` (brand-bg-alternate)
- Text Color: `#FFFFFF`
- Font: Geist, 16px, weight 400
- Padding: `48px`
- Border Radius: `6px`
- Border: `0px none`

---

### Inputs & Forms

**Text Input**
- Background: `#FFFFFF`
- Text Color: `#0A0A0A`
- Border: `1px solid #E8E5E0` (brand-border)
- Font: Geist, 14.4px, weight 500
- Padding: `14px 16px`
- Border Radius: `6px`
- Height: `48px`
- Focus State: Border color changes to `#0A0A0A`, outline: `none`
- Placeholder Color: `#BFAB9C` (soft taupe)
- Disabled State: Background `#F7F6F4`, text `#BFAB9C`, border `#E8E5E0`

**Form Label**
- Text Color: `#0A0A0A`
- Font: Geist, 14.4px, weight 400
- Line Height: `21.6px`
- Margin Bottom: `8px`

**Checkbox / Radio**
- Border: `1px solid #E8E5E0` (brand-border)
- Border Radius: `2px` (checkbox) or `50%` (radio)
- Checked Background: `#C8A96E` (Warm Gold)
- Checked Border: `1px solid #C8A96E`
- Focus Ring: `2px solid #0A0A0A` (offset `2px`)

---

### Navigation

**Header Navigation**
- Background: `#0A0A0A` (on dark/hero) or `transparent` (scroll transition state)
- Text Color: `#FFFFFF` (on dark) or `#0A0A0A` (on light)
- Font: Geist, 14px, weight 500
- Padding: `28px 16px` (vertical)
- Height: `75px` total header height
- Alignment: Vertically centered elements
- Hover State: Nav links shift to opacity `0.8` or `#C8A96E`
- Active State: Border-bottom `2px solid #C8A96E` or text becomes `#C8A96E`

**Footer Navigation**
- Background: `#0A0A0A` (brand-bg-alternate)
- Text Color: `#FFFFFF`
- Font: Geist, 14px, weight 500
- Padding: `40px 0px`
- Link Hover: Text color shifts to `#C8A96E`

**Breadcrumb**
- Text Color: `#BFAB9C` (soft taupe)
- Font: Geist, 12px, weight 400
- Separator: `/` in `#BFAB9C`
- Active Item: Text becomes `#0A0A0A`

---

### Badges & Labels

**Badge - Accent**
- Background: `rgba(200, 169, 110, 0.15)` (Light Warm Gold overlay) or `#F7F6F4`
- Text Color: `#0A0A0A`
- Font: Geist, 12px, weight 500
- Padding: `6px 12px`
- Border Radius: `2px`
- Border: `0px none`

**Badge - Muted**
- Background: `#E8E5E0` (brand-border)
- Text Color: `#BFAB9C` (soft taupe)
- Font: Geist, 12px, weight 400
- Padding: `6px 12px`
- Border Radius: `2px`
- Border: `0px none`

---

### Links & Text Links

**Text Link - Dark Background**
- Text Color: `#FFFFFF`
- Font: Geist, 14px, weight 500
- Hover State: Opacity `0.8`, text decoration `underline`

**Text Link - Light Background**
- Text Color: `#4A4A4A` (brand-secondary)
- Font: Geist, 16px, weight 500
- Hover State: Text color becomes `#0A0A0A`, text-decoration becomes `underline`

---

## Layout Principles

### Spacing System

**Base Unit:** `4px`

**Scale:**
- `4px` — micro gaps, icon spacing
- `8px` — tight spacing, small component gaps
- `12px` — compact spacing, field spacing
- `16px` — standard padding, element spacing
- `20px` — comfortable spacing, section gutters
- `24px` — generous spacing, component separation
- `28px` — header/footer internal spacing
- `32px` — medium section spacing
- `40px` — large section separation
- `48px` — container padding for premium content
- `80px` — major section breaks
- `88px` — page section margin

**Usage Context:**
- **Buttons:** `16px 32px` horizontal, `12px` vertical (48px total height)
- **Cards:** `16px` uniform padding
- **Inputs:** `14px 16px` vertical/horizontal padding (48px total height)
- **Section Gutters:** `40px` to `80px` between major content blocks
- **Container Margins:** `88px` top/bottom for page sections

### Grid & Container

**Max Width:** `1400px` for primary content containers

**Column Strategy:**
- Desktop: 12-column grid with `20px` gutter
- Tablet: 8-column grid with `16px` gutter
- Mobile: 4-column grid with `12px` gutter

**Section Layout Patterns:**
- Full-bleed hero: edge-to-edge, `80px` vertical padding
- Content sections: centered max-width container with `88px` top/bottom margin
- Card grids: 3 columns (desktop), 2 columns (tablet), 1 column (mobile), `32px` gap
- Sidebar layouts: 70/30 split with `40px` gap

### Whitespace Philosophy

The design system treats whitespace as a first-class citizen. Breathing room creates visual hierarchy and reduces cognitive load. Every section is separated by minimum `80px` vertical whitespace; nested components use `32px`. Cards and containers maintain minimum `16px` internal padding. This creates a premium, uncluttered aesthetic where content feels intentional rather than crowded.

### Border Radius Scale

- `0px` — buttons, navigation, hero containers, typography-heavy sections
- `2px` — badges, small indicators, form checkboxes
- `6px` — input fields, standard cards, secondary containers
- `100%` — circular avatars, image overlays (full circle)

---

## Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow | Base cards, form inputs, backgrounds, typography |
| Lift 1 | `0px 4px 12px rgba(0, 0, 0, 0.04)` | Hovered cards, subtle elevation, secondary surfaces |
| Lift 2 | `0px 8px 24px rgba(0, 0, 0, 0.08)` | Modals, popovers, elevated interactive elements |
| Lift 3 | `0px 16px 40px rgba(0, 0, 0, 0.12)` | Dropdowns, overlays, floating actions |
| Lift 4 | `0px 24px 64px rgba(0, 0, 0, 0.16)` | Dialogs, full-screen overlays, top-level modals |

**Shadow Philosophy:**
Insighter employs a restrained shadow system with low opacity (4–16%) and soft blur radii. Shadows enhance interaction feedback and spatial hierarchy without introducing visual noise. The default state uses no shadow; elevation is reserved for active, hovered, or modal states.

---

## Motion & Animation System

All animations must be functional, subtle, and scroll-triggered—never purely decorative. 

> [!IMPORTANT]
> **Animation Rules:**
> 1. **No Animation on Body Text:** Do NOT apply motion/entrance animations to body paragraphs (`text-size-medium`, `text-size-small`). This reduces cognitive fatigue, preserves readability, and avoids layout shifts.
> 2. **Scroll Reveals:** All entrance reveals must run once (`viewport={{ once: true }}`) and use clean opacity/slide translation combinations.
> 3. **Staggered Reveals:** Multi-item grids (cards, lists) use stagger effects to structure the loading order.
> 4. **No Layout-Shift Animations:** Limit animations to `opacity`, `y` translation (slight), and `scale` on hover. Never animate properties that trigger browser reflows (e.g. `width`, `height`, `margin`).

Derived from Insighter's scroll-triggered animations:

### Standard Scroll Reveal (fade + rise)
```tsx
// All section content — standard entrance
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
}

// Trigger:
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
/>
```

### Stagger Children
```tsx
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
}

// Parent wraps children, each child uses fadeUp variant
```

### Hero Entrance (faster, no delay)
```tsx
const heroFade = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}
// Eyebrow → Headline → Subtext → CTA buttons — stagger 0.12s
```

### Tab Switch (content panels)
```tsx
// AnimatePresence + opacity only — no slide
<AnimatePresence mode="wait">
  <motion.div
    key={activeTab}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
  />
</AnimatePresence>
```

---

## Do's and Don'ts

### Do
- **Emphasize Whitespace:** Use generous padding and margins to create visual breathing room.
- **Lead with Typography:** Rely on Didact Gothic's display qualities for headline hierarchy; avoid decorative clutter.
- **Use Warm Gold Strategically:** Reserve `#C8A96E` for primary CTAs and critical highlights.
- **Maintain Consistent Card Padding:** Apply `16px` as the baseline for standard card and container interiors.
- **Prioritize Contrast:** Ensure text-to-background contrast meets WCAG AA standards.
- **Apply Shadows on Interaction:** Use shadows only on hover/active/modal states; keep default surfaces flat.
- **Stack Components with 32px Gaps:** Maintain breathing room between adjacent sections.
- **Respect Border Radius Scale:** Maintain strict sharp corners (`0px`) on buttons and nav bars, and `6px` on input fields/cards.

### Don't
- **Avoid Bright or Saturated Colors:** Keep palette warm and earthy; do not add random accent colors.
- **Don't Overuse Didact Gothic:** Reserve it strictly for headings; all body copy must use Geist.
- **Never Remove Padding from Inputs:** Maintain `14px 16px` padding and `48px` height for touch targets.
- **Avoid Shadows on Default States:** Keep base card layouts flat.
- **Don't Reduce Spacing Aggressively:** Maintain `80px` section breaks even on mobile layouts.
- **Don't Apply Border Radius to Buttons:** Buttons must maintain sharp `0px` radius.
- **Don't use white text on light backgrounds:** Keep text in `#0A0A0A` or `#4A4A4A` for readability.
- **Don't Animate Body Paragraphs:** Keep body text animations turned off to maintain reading comfort and performance.

---

## Responsive Behavior & Touch Targets

### Breakpoints

| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Mobile | 320px – 639px | Single column, `12px` gutter, 16px padding, stacked cards |
| Tablet | 640px – 1023px | 2-column grid, `16px` gutter, 24px padding, 8-column layout |
| Desktop | 1024px – 1279px | 3-column grid, `20px` gutter, 32px padding, 12-column layout |
| Large Desktop | 1280px+ | Max-width `1200px` centered, 3-column grid, `32px` gutter |

### Touch Targets
- **Minimum Interactive Area:** `44px × 44px` for buttons, links, form inputs.
- **Spacing Between Targets:** `8px` minimum, `16px` recommended.
- **Button Height on Mobile:** `48px` minimum.
- **Form Inputs:** `48px` minimum height on all devices.

---

## Component Registry

> Updated via `/imprint` after every UI session.

| Component | File | Status |
|-----------|------|--------|
| `Button` | `components/ui/Button.tsx` | ✅ |
| `Badge` | `components/ui/Badge.tsx` | ⬜ |
| `SectionLabel` | `components/ui/SectionLabel.tsx` | ⬜ |
| `ChecklistItem` | `components/ui/ChecklistItem.tsx` | ⬜ |
| `Nav` | `components/layout/Nav.tsx` | ✅ |
| `Footer` | `components/layout/Footer.tsx` | ✅ |
| `HeroSection` | `components/sections/HeroSection.tsx` | ✅ |
| `AboutSnippet` | `components/sections/AboutSnippet.tsx` | ✅ |
| `ServicesGrid` | `components/sections/ServicesGrid.tsx` | ✅ |
| `WhyChooseUs` | `components/sections/WhyChooseUs.tsx` | ✅ |
| `InvestmentPhilosophy` | `components/sections/InvestmentPhilosophy.tsx` | ✅ |
| `PerformancePreview` | `components/sections/PerformancePreview.tsx` | ✅ |
| `LeadershipSnapshot` | `components/sections/LeadershipSnapshot.tsx` | ✅ |
| `InsightsPreview` | `components/sections/InsightsPreview.tsx` | ✅ |
| `TestimonialsSection` | `components/sections/TestimonialsSection.tsx` | ✅ |
| `ContactSnippet` | `components/sections/ContactSnippet.tsx` | ✅ |
| `ConsultationModal` | `components/sections/ConsultationModal.tsx` | ✅ |
| `AboutHeroSection` | `components/sections/AboutHeroSection.tsx` | ✅ |
| `OurStorySection` | `components/sections/OurStorySection.tsx` | ✅ |
| `MissionVisionSection` | `components/sections/MissionVisionSection.tsx` | ✅ |
| `AboutCommitmentsSection` | `components/sections/AboutCommitmentsSection.tsx` | ✅ |
| `AboutPillarsSection` | `components/sections/AboutPillarsSection.tsx` | ✅ |
| `AboutWhyChooseUsSection` | `components/sections/AboutWhyChooseUsSection.tsx` | ✅ |
| `AboutLeadershipSection` | `components/sections/AboutLeadershipSection.tsx` | ✅ |
| `ServicesHeroSection` | `components/sections/ServicesHeroSection.tsx` | ✅ |
| `ServicesDetailList` | `components/sections/ServicesDetailList.tsx` | ✅ |
| `ServicesCTASection` | `components/sections/ServicesCTASection.tsx` | ✅ |
| `StrategiesHeroSection` | `components/sections/StrategiesHeroSection.tsx` | ✅ |
| `StrategiesIntroSection` | `components/sections/StrategiesIntroSection.tsx` | ✅ |
| `StrategiesPillarsSection` | `components/sections/StrategiesPillarsSection.tsx` | ✅ |
| `StrategyBreakdownSection` | `components/sections/StrategyBreakdownSection.tsx` | ✅ |
| `RiskManagementFrameworkSection` | `components/sections/RiskManagementFrameworkSection.tsx` | ✅ |
| `StrategiesPerformanceSection` | `components/sections/StrategiesPerformanceSection.tsx` | ✅ |
| `StrategiesCTASection` | `components/sections/StrategiesCTASection.tsx` | ✅ |
| `InsightsHeroSection` | `components/sections/InsightsHeroSection.tsx` | ✅ |
| `FeaturedArticle` | `components/sections/FeaturedArticle.tsx` | ✅ |
| `ArticlesGrid` | `components/sections/ArticlesGrid.tsx` | ✅ |
| `NewsletterSignup` | `components/sections/NewsletterSignup.tsx` | ✅ |
| `CareersHeroSection` | `components/sections/CareersHeroSection.tsx` | ✅ |
| `WhyJoinUsSection` | `components/sections/WhyJoinUsSection.tsx` | ✅ |
| `WhatWeLookForSection` | `components/sections/WhatWeLookForSection.tsx` | ✅ |
| `OpenPositionsSection` | `components/sections/OpenPositionsSection.tsx` | ✅ |
| `ContactHeroSection` | `components/sections/ContactHeroSection.tsx` | ✅ |
| `ContactFormSection` | `components/sections/ContactFormSection.tsx` | ✅ |
| `ContactProcessSection` | `components/sections/ContactProcessSection.tsx` | ✅ |
| `AboutStatsSection` | `src/components/sections/AboutStatsSection.tsx` | ✅ |

---

## Component Registry Update — 2026-06-26

### New Components Added
| Component | File | Pattern Notes |
|-----------|------|---------------|
| `AboutStatsSection` | `src/components/sections/AboutStatsSection.tsx` | Centered display block displaying key stats ("20+ Years", "2 Hubs") in flat, clean bordered boxes under a large, low-opacity uppercase display title. |

### Redesigned Components
- `AboutHeroSection` — Reconstructed as a full-bleed aspect image banner (`h-[70vh]`) with bottom-aligned stacked text overlay and a custom vignette gradient.
- `OurStorySection` — Simplified into a single centered column layout with restricted paragraph widths to maximize whitespace and narrative clarity.
- `AboutCommitmentsSection` — Standardized into a 4-column desktop grid using index-based asymmetric backgrounds (beige, blue-gray, dark, beige) and custom icon mappings.
- `AboutWhyChooseUsSection` — Upgraded with a dark background banner header block (`bg-brand-bg-alternate` with white/gold text) and 4 checkmarked differentiator cards below it.
- `ServicesDetailList` — Upgraded to a 2-column alternating split layout where each row consists of a highly rounded image (`rounded-[24px]`) side-by-side with a white rounded card block (`rounded-[24px]` container with shadow/border) containing details and a primary capsule CTA button.
- `ServicesGrid` — Redesigned scrollable home page service overview card elements to feature a vertically stacked card structure with top-rounded images, bottom white cards, and capsule CTA buttons.

### New Patterns Captured
- **Full-Bleed Cover Image Hero Layout:** Bottom-aligned stacked content container aligned using flexbox directly within an image-filled viewport wrapper.
- **Asymmetric Card Treatment Grid:** A grid of cards where specific index values map to distinct background tones (beige, blue-gray, and deep dark theme highlights) to create visual rhythm.
- **Header Banner Block with Flat Cards Grid:** A layout pattern containing a wide dark banner block on top and a row of clean, checkmarked info cards below it.
- **Horizontal & Vertical Split Cards:** Side-by-side layout (or vertical stack) of highly rounded aspect images and rounded white background container cards to represent premium service listings.

### Flags
- *None.* Spacing scales, borders, and fonts adhere fully to the Insighter guidelines. All button styles maintain sharp geometric corners (`0px`) border radius, except for the capsule CTA buttons explicitly requested to match the user's reference mockup.
