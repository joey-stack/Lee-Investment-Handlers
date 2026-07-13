import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "wealth-management",
    title: "Wealth Management",
    description:
      "Bespoke financial strategies and active portfolio management built for your family — not templates.",
    includes: [
      "Personalized financial planning",
      "Portfolio construction and ongoing management",
      "Regular performance reviews and strategy adjustments",
      "Coordination with your legal and tax advisors",
      "Long-term wealth preservation planning",
    ],
    icon: "briefcase",
    metrics: [
      { value: "98%", label: "client retention" },
      { value: "20+ Yrs", label: "advisory experience" },
    ],
  },
  {
    id: "portfolio-management",
    title: "Portfolio Management",
    description:
      "Research-driven portfolios managed by experts to deliver consistent, long-term growth for investments.",
    includes: [
      "Custom portfolio construction across investment classes",
      "Active monitoring and rebalancing",
      "Risk-adjusted return optimization",
      "Regular performance reporting",
      "Benchmark tracking and accountability",
    ],
    icon: "trending-up",
    metrics: [
      { value: "Good & Attractive", label: "investment rate" },
      { value: "Active", label: "rebalancing frequency" },
    ],
  },
  {
    id: "retirement-planning",
    title: "Retirement Planning",
    description:
      "Practical plans that give you the steady cash flow to retire on your terms forever.",
    includes: [
      "Retirement income modeling and projections",
      "Investment allocation strategies for pre- and post-retirement",
      "Withdrawal planning and sequencing",
      "Social security and pension optimization guidance",
      "Estate and legacy planning considerations",
    ],
    icon: "shield-check",
    metrics: [
      { value: "100%", label: "transition success" },
      { value: "Custom", label: "income modeling" },
    ],
  },
  {
    id: "institutional-investments",
    title: "Institutional Investments",
    description:
      "Disciplined investment management built for foundations, trusts, and pension funds.",
    includes: [
      "Investment policy statement development",
      "Investment allocation and manager selection",
      "Liability-driven investing strategies",
      "Governance and compliance reporting",
      "Long-term performance benchmarking",
    ],
    icon: "building-2",
    metrics: [
      { value: "Dual-hub", label: "Lagos & Venice offices" },
      { value: "Custom", label: "investment policies" },
    ],
  },
  {
    id: "alternative-investments",
    title: "Alternative Investments",
    description:
      "Access private equity, premium real estate, and high-yield vehicles beyond public stock markets.",
    includes: [
      "Private equity and private credit opportunities",
      "Real estate investment strategies",
      "Hedge fund access and evaluation",
      "Portfolio diversification through non-correlated investments",
      "Risk assessment and due diligence on alternative holdings",
    ],
    icon: "layers",
    metrics: [
      { value: "Private", label: "market investment access" },
      { value: "Fully", label: "diversified portfolios" },
    ],
  },
  {
    id: "risk-management",
    title: "Risk Management",
    description:
      "Continuous portfolio monitoring and capital preservation techniques that safeguard accumulated family wealth.",
    includes: [
      "Ongoing portfolio risk assessment",
      "Stress testing and scenario analysis",
      "Downside protection strategies",
      "Concentration risk monitoring",
      "Capital preservation planning",
    ],
    icon: "shield",
    metrics: [
      { value: "Downside", label: "protection focus" },
      { value: "Continuous", label: "scenario monitoring" },
    ],
  },
];

export interface ServicesPageHero {
  headline: string;
  subtext: string;
  bgImageUrl: string;
}

export interface ServicesPageCTA {
  headline: string;
  subtext: string;
  primaryBtnText: string;
  secondaryBtnText: string;
}

export const servicesPageHero: ServicesPageHero = {
  headline: "Wealth Plans Built On Facts",
  subtext: "We turn complex global market insights into disciplined, wealth-building strategies. Whether preserving family capital for your heirs or managing institutional funds, we promise our complete alignment and factual execution.",
  bgImageUrl: "https://labs.google/fx/api/og-image/shared/dcfa42a0-4430-4555-a2d2-6b18617845e9",
};

export const servicesPageCTA: ServicesPageCTA = {
  headline: "How Should You Begin Today?",
  subtext: "Our experienced financial advisors will guide you to start your investment journey today. Book a private consultation or contact our offices to discuss your strategic options.",
  primaryBtnText: "Schedule a Consultation",
  secondaryBtnText: "Contact Our Team",
};
