// ============================================================
// src/lib/content/services.ts
// ============================================================

import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "wealth-management",
    title: "Wealth Management",
    description:
      "Tailored financial planning and portfolio management built around your life — not a template.",
    includes: [
      "Personalized financial planning",
      "Portfolio construction and ongoing management",
      "Regular performance reviews and strategy adjustments",
      "Coordination with your legal and tax advisors",
      "Long-term wealth preservation planning",
    ],
    icon: "briefcase",
  },
  {
    id: "portfolio-management",
    title: "Portfolio Management",
    description:
      "Actively managed, research-driven portfolios designed to deliver strong risk-adjusted returns over time.",
    includes: [
      "Custom portfolio construction across investment classes",
      "Active monitoring and rebalancing",
      "Risk-adjusted return optimization",
      "Regular performance reporting",
      "Benchmark tracking and accountability",
    ],
    icon: "trending-up",
  },
  {
    id: "retirement-planning",
    title: "Retirement Planning",
    description:
      "Strategies that give you the confidence to retire on your terms — and stay there.",
    includes: [
      "Retirement income modeling and projections",
      "Investment allocation strategies for pre- and post-retirement",
      "Withdrawal planning and sequencing",
      "Social security and pension optimization guidance",
      "Estate and legacy planning considerations",
    ],
    icon: "shield-check",
  },
  {
    id: "institutional-investments",
    title: "Institutional Investments",
    description:
      "Institutional-grade investment management for organizations, foundations, trusts, and pension funds.",
    includes: [
      "Investment policy statement development",
      "Investment allocation and manager selection",
      "Liability-driven investing strategies",
      "Governance and compliance reporting",
      "Long-term performance benchmarking",
    ],
    icon: "building-2",
  },
  {
    id: "alternative-investments",
    title: "Alternative Investments",
    description:
      "Access to private markets, real estate opportunities, and investment vehicles beyond the traditional.",
    includes: [
      "Private equity and private credit opportunities",
      "Real estate investment strategies",
      "Hedge fund access and evaluation",
      "Portfolio diversification through non-correlated investments",
      "Risk assessment and due diligence on alternative holdings",
    ],
    icon: "layers",
  },
  {
    id: "risk-management",
    title: "Risk Management",
    description:
      "Proactive portfolio monitoring and capital preservation strategies that protect what you've built.",
    includes: [
      "Ongoing portfolio risk assessment",
      "Stress testing and scenario analysis",
      "Downside protection strategies",
      "Concentration risk monitoring",
      "Capital preservation planning",
    ],
    icon: "shield",
  },
];


// ============================================================
// src/lib/content/pillars.ts
// ============================================================

import { Pillar } from "@/types";

export const pillars: Pillar[] = [
  {
    id: "research",
    title: "Research",
    body: "We go beyond headlines. Our team conducts thorough market, economic, and sector analysis to inform every investment decision. We never invest on gut feel — before any capital is deployed, we understand the opportunity and the risk.",
    icon: "search",
  },
  {
    id: "diversification",
    title: "Diversification",
    body: "We spread risk intelligently across investment classes, sectors, and geographies — so your portfolio is never dependent on one outcome. A well-diversified portfolio isn't just about owning many things. It's about owning the right mix.",
    icon: "pie-chart",
  },
  {
    id: "discipline",
    title: "Discipline",
    body: "Markets fluctuate. Our process doesn't. The biggest investment mistakes are made in moments of fear or euphoria. We stay the course through volatility with consistent, principled decision-making — never chasing short-term performance at the expense of long-term results.",
    icon: "target",
  },
  {
    id: "performance",
    title: "Performance",
    body: "We measure ourselves by your results. We set clear performance benchmarks, track them rigorously, and communicate transparently. Our clients receive regular reporting on how their investments are performing — and why. We don't hide behind averages. We own our results.",
    icon: "bar-chart-2",
  },
];


// ============================================================
// src/lib/content/team.ts
// ============================================================

import { TeamMember } from "@/types";

export const team: TeamMember[] = [
  {
    id: "david-lee",
    name: "David Lee",
    title: "Founder & Chief Investment Officer",
    bioShort:
      "With over 20 years in investment management, David built LEE Investment Handlers on a single principle: clients first, always.",
    bio: "David brings over 20 years of investment management experience to every client relationship. A specialist in portfolio construction and wealth preservation, he founded LEE Investment Handlers with the conviction that disciplined, personalized investment management should be accessible to more than just the ultra-wealthy. His leadership sets the standard for everything the firm does.",
    image: "/team/david-lee.jpg",
    linkedin: "",
  },
  {
    id: "sarah-mitchell",
    name: "Sarah Mitchell",
    title: "Chief Financial Strategist",
    bioShort:
      "Sarah specializes in retirement planning and institutional investment — bringing clarity to some of the most complex financial decisions.",
    bio: "Sarah is one of the most sought-after retirement and institutional investment specialists in the field. She excels at translating complex financial landscapes into clear, actionable strategies — helping clients from individuals approaching retirement to large institutional funds achieve their long-term objectives.",
    image: "/team/sarah-mitchell.jpg",
    linkedin: "",
  },
  {
    id: "michael-chen",
    name: "Michael Chen",
    title: "Head of Research",
    bioShort:
      "Michael leads our market intelligence operation, ensuring every investment decision is rooted in rigorous, current analysis.",
    bio: "Michael leads LEE's market intelligence function, overseeing the economic analysis and investment research that underpins every portfolio decision. His work ensures that our investment team is always operating with the most current, most rigorous data available.",
    image: "/team/michael-chen.jpg",
    linkedin: "",
  },
];


// ============================================================
// src/lib/content/testimonials.ts
// ============================================================

import { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    quote:
      "Lee Investment Handlers completely transformed how we think about wealth management. Their guidance has been exceptional — strategic, clear, and always in our best interest.",
    attribution: "Private Investor",
    role: "Private Investor",
    rating: 5,
  },
  {
    id: "testimonial-2",
    quote:
      "Their disciplined approach gave us the confidence we needed. We've consistently hit our long-term financial objectives since partnering with them.",
    attribution: "Institutional Client",
    role: "Institutional Client",
    rating: 5,
  },
];


// ============================================================
// src/lib/content/stats.ts
// ============================================================

import { StatItem } from "@/types";

export const stats: StatItem[] = [
  { value: "20+", label: "Years of Experience" },
  { value: "2", label: "Global Offices" },
  { value: "4", label: "Investment Strategies" },
];


// ============================================================
// src/lib/content/insights.ts
// ============================================================

import { InsightArticle } from "@/types";

export const insights: InsightArticle[] = [
  {
    id: "navigating-market-volatility-2026",
    title: "Navigating Market Volatility in 2026",
    excerpt:
      "Uncertainty creates opportunity — if you know where to look. Here's our current perspective on what's driving volatility and how disciplined investors can find opportunity within the noise.",
    category: "Market Analysis",
    date: "2026-01-15",
    slug: "navigating-market-volatility-2026",
    featured: true,
    image: "/insights/scaling-tech.jpg",
  },
  {
    id: "building-resilient-portfolios",
    title: "Building Resilient Investment Portfolios",
    excerpt:
      "The strategies that separate portfolios that survive downturns from those that don't — and what you can do to strengthen yours.",
    category: "Wealth Planning",
    date: "2026-01-08",
    slug: "building-resilient-portfolios",
    image: "/insights/strategy-execution.jpg",
  },
  {
    id: "future-of-alternative-investments",
    title: "The Future of Alternative Investments",
    excerpt:
      "Private markets and real investments are opening up. What that means for your portfolio and how we're positioning client investments in response.",
    category: "Alternative Investments",
    date: "2025-12-20",
    slug: "future-of-alternative-investments",
    image: "/insights/financial-modeling.jpg",
  },
];


// ============================================================
// src/lib/content/performance.ts
// ============================================================

import { PerformanceBar } from "@/types";

export const performanceBars: PerformanceBar[] = [
  { year: "2021", value: 42, label: "+12.4%" },
  { year: "2022", value: 55, label: "+14.8%" },
  { year: "2023", value: 68, label: "+16.2%" },
  { year: "2024", value: 80, label: "+17.5%" },
  { year: "2025", value: 95, label: "+18.7%" },
];

export const performanceSummary = {
  average: "+18.7%",
  label: "Average Annual Growth",
  disclaimer:
    "Past performance does not guarantee future results. All investments carry risk. Individual client results may vary.",
};


// ============================================================
// src/lib/content/careers.ts
// ============================================================

import { CareerValue } from "@/types";

export const careerValues: CareerValue[] = [
  {
    title: "Purpose-Driven Work",
    description:
      "Every role at LEE Investment Handlers contributes directly to our clients' financial futures. The work we do here matters — and you'll feel that from day one.",
  },
  {
    title: "A Culture of Excellence",
    description:
      "We hold ourselves to a high standard — in our investment process, our client relationships, and our internal culture. We hire people who take that seriously and thrive because of it.",
  },
  {
    title: "Room to Grow",
    description:
      "We're a growing firm with global ambitions. For the right people, that means real opportunities to take on more responsibility, expand your expertise, and grow your career alongside the business.",
  },
  {
    title: "Collaborative Team",
    description:
      "Our team is small enough that your contributions are visible and large enough that you're always learning from people who are exceptional at what they do.",
  },
];

export const careerQualities = [
  "Analytical rigor and attention to detail",
  "Clear, honest communication",
  "A long-term mindset — in investing and in careers",
  "Ownership and accountability",
  "Collaboration without ego",
];

export const openPositions: never[] = [];
// Positions pending from client — will be populated when provided


// ============================================================
// src/lib/content/nav.ts
// ============================================================

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Investment Strategies", href: "/strategies" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Compliance Disclosure", href: "/compliance" },
];


// ============================================================
// src/lib/schemas/contactSchema.ts
// ============================================================

import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Phone number is required"),
  investmentGoals: z.string().min(1, "Please select your primary investment goal"),
  message: z.string().optional(),
});



export const investmentGoalOptions = [
  "Wealth Preservation",
  "Long-Term Growth",
  "Retirement Planning",
  "Institutional Investment Management",
  "Alternative Investments",
  "Risk Management",
  "Not sure yet — I'd like guidance",
];



