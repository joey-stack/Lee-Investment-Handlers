import { InsightArticle } from "@/types";

export const insights: InsightArticle[] = [
  {
    id: "scaling-tech-infrastructure",
    title: "Scaling Tech Infrastructure Without Overengineering It",
    excerpt:
      "Learn how to choose and implement systems that serve growth—without slowing your team down",
    category: "News",
    date: "February 26, 2026",
    slug: "scaling-tech-infrastructure",
    image: "/insights/scaling-tech.jpg",
    featured: true,
    author: "Excel Joel",
    readTime: "6 min read",
    content: [
      "In the early stages of growth, the temptation to build institutional-grade, highly complex technology systems is immense. Startups and scaling firms often confuse scalability with complexity, investing heavily in distributed architectures, microservices, and specialized tooling before they have established product-market fit or a stable operational workflow. At LEE Investment Handlers, we advocate for a disciplined, pragmatic approach to engineering: build only what you need to survive the next phase of growth.",
      "Overengineering not only drains vital financial capital but also consumes your engineering team's most valuable investment: focus. Every line of code written must be maintained, debugged, and documented. When a team spends 80% of their bandwidth managing complex container orchestrations or shifting distributed databases that host minimal traffic, they are not building product value. The key is to start monolithic, maintain clean module boundaries, and scale horizontally only when bottleneck metrics demand it.",
      "First, prioritize simplicity. Choose reliable, boring technologies with mature ecosystems and extensive documentation. PostgreSQL, robust server-side frameworks, and managed hosting platforms (like Vercel or cloud run instances) can comfortably handle millions of daily requests without requiring a dedicated infrastructure team. Second, invest in observability early. Knowing exactly where your application spends time is far more valuable than blindly optimizing database queries. Implement basic logging, error tracking, and performance monitoring from day one.",
      "Ultimately, your technical infrastructure is a tool to achieve business outcomes, not an end in itself. Keep your stack lean, make architecture changes based on hard data rather than trends, and ensure your development speed remains high. True engineering excellence lies in solving complex business problems with simple, robust systems."
    ]
  },
  {
    id: "why-strategy-fails",
    title: "Why Strategy Fails Without Execution Support",
    excerpt:
      "Even the best plans fall flat without clear ownership, tools, and follow-through—here's how we solve for that",
    category: "Insights",
    date: "February 26, 2026",
    slug: "why-strategy-fails",
    image: "/insights/strategy-execution.jpg",
    author: "Judith Okafor",
    readTime: "5 min read",
    content: [
      "A beautiful strategy deck is easy to produce. Boardrooms are filled with elaborate five-year growth plans, digital transformation roadmaps, and detailed market expansion strategies. Yet, research consistently shows that over 70% of corporate strategies fail during the execution phase. The bottleneck is rarely the quality of the strategy itself; it is the friction of transforming abstract goals into daily operational actions.",
      "The primary culprit of execution failure is a lack of clear ownership. When a strategic goal is assigned to 'the team' or shared across multiple departments without a single accountable lead, it inevitably gets pushed aside by daily fires. Every major strategic initiative requires a designated owner who has both the authority and the responsibility to drive it forward. This owner must establish clear, measurable milestones (such as OKRs or KPIs) and check in on progress weekly, not quarterly.",
      "Another critical factor is aligning resources and tooling with the new strategy. Organizations often declare a shift in strategy but fail to adjust their budgets, staff allocation, or internal tools. If your firm plans to pivot to a high-touch wealth advisory model, but your client relation managers are still bogged down by legacy spreadsheet systems and manual reporting, the strategy will stall. Strategy execution requires an intentional re-allocation of both capital and human resources to clear the path for execution.",
      "Execution is a muscle that must be trained. It requires disciplined follow-through, operational transparency, and the willingness to pivot when initial assumptions are proven wrong. By establishing absolute ownership, aligning day-to-day tools with strategic objectives, and maintaining a relentless cadence of accountability, organizations can bridge the gap between planning and reality."
    ]
  },
  {
    id: "financial-modeling-decisions",
    title: "How to Build a Financial Model That Actually Supports Decisions",
    excerpt:
      "A practical guide to creating a model that goes beyond investor decks—and helps you run your business smarter",
    category: "News",
    date: "February 26, 2026",
    slug: "financial-modeling-decisions",
    image: "/insights/financial-modeling.jpg",
    author: "Osazuwa Omoregie",
    readTime: "8 min read",
    content: [
      "Too many financial models are built solely to appease venture capitalists or satisfy bank loan officers. They are static spreadsheets, packed with optimistic assumptions, hockey-stick growth curves, and formulas that hide the underlying operational realities. Once the funding is secured, these models are archived, never to be opened again. This is a massive missed opportunity: a financial model should be a living, breathing operational tool that guides strategic business decisions.",
      "To build a model that supports decision-making, you must shift your focus from outputs to inputs (or drivers). An effective model is built on granular, verifiable operational drivers rather than arbitrary percentage growth rates. For example, instead of assuming revenue grows by 5% month-over-month, model your revenue based on lead generation channels, conversion rates, average contract value, and customer churn. By adjusting these operational levers, you can simulate realistic scenarios and understand the exact levers that drive profitability.",
      "Furthermore, a decision-focused model must account for cash flow dynamics, not just accounting profits. Growing companies are often killed by working capital constraints: long payment cycles, inventory prepayments, or upfront client acquisition costs. Your model must map the timing of cash inflows and outflows with precision. This allows you to forecast cash runways under varying market conditions, indicating exactly when you need to raise capital, hire key personnel, or scale back marketing spend.",
      "At LEE Investment Handlers, our approach to wealth management and advisory is rooted in this level of operational discipline. A financial model should serve as a digital sandbox for your business, allowing you to stress-test ideas, evaluate pricing changes, and model expansion costs before committing real capital. Build your spreadsheets with clear structures, separate your inputs from calculations, and use them weekly to steer your organization toward sustainable growth."
    ]
  },
];

export interface InsightsPageHero {
  headline: string;
  subtext: string;
}

export interface NewsletterCopy {
  headline: string;
  subtext: string;
  placeholder: string;
  buttonText: string;
}

export const insightsPageHero: InsightsPageHero = {
  headline: "Market Facts. Financial Advice.",
  subtext: "Read the economic analyses, strategic reports, and regular market updates written by our research team in Lagos and Venice.",
};

export const newsletterCopy: NewsletterCopy = {
  headline: "Get Our Free Briefing",
  subtext: "Get weekly economic commentary and market briefings directly in your inbox. No spam. Unsubscribe anytime.",
  placeholder: "Enter your email address",
  buttonText: "Subscribe Now",
};
