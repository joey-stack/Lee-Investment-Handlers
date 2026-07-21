import { InsightArticle } from "@/types";

export const insights: InsightArticle[] = [
  {
    id: "scaling-tech-infrastructure",
    title: "Scaling Tech Infrastructure Without Overengineering It",
    excerpt:
      "Learn how to choose and implement systems that serve growth without slowing your team down.",
    category: "News",
    date: "February 26, 2026",
    slug: "scaling-tech-infrastructure",
    image: "/insights/scaling-tech.jpg",
    featured: true,
    author: "Excel Joel",
    readTime: "6 min read",
    content: [
      "In the early stages of growth, the temptation to build complex technology systems is immense. Growing firms often confuse scalability with complexity, investing in complicated architectures before they have established product market fit or a stable workflow. At LEE Investment Handlers, we advocate for a disciplined, practical approach: build what you need to support your current growth.",
      "Overengineering drains financial capital and consumes your team's focus. Every line of code written must be maintained and documented. When a team spends most of their time managing complex server setups that host minimal traffic, they are not building real product value. The key is to start simple, maintain clean boundaries, and scale up only when data demands it.",
      "First, prioritize simplicity. Choose reliable, proven technologies with strong documentation. Standard databases, robust server side frameworks, and managed hosting platforms can handle large traffic without requiring huge setup teams. Second, invest in visibility early. Knowing exactly how your application performs is far more valuable than guessing. Implement basic error tracking and performance monitoring from day one.",
      "Your technical setup is a tool to achieve business outcomes, not an end in itself. Keep your stack lean, make architectural changes based on hard data, and ensure your team stays fast. True engineering quality lies in solving business challenges with simple, robust systems."
    ]
  },
  {
    id: "why-strategy-fails",
    title: "Why Strategy Fails Without Execution Support",
    excerpt:
      "Even the best plans fall flat without clear ownership, tools, and follow through — here is how we solve for that.",
    category: "Insights",
    date: "February 26, 2026",
    slug: "why-strategy-fails",
    image: "/insights/strategy-execution.jpg",
    author: "Judith Okafor",
    readTime: "5 min read",
    content: [
      "A strategic plan is easy to outline. Boardrooms are often filled with five year growth targets and detailed market expansion roadmaps. Yet research shows that many corporate strategies fail during execution. The issue is rarely the quality of the strategy itself; it is turning abstract goals into daily operational actions.",
      "The primary cause of execution failure is a lack of clear ownership. When a goal is assigned to a broad group without a single accountable lead, it gets pushed aside by daily tasks. Every strategic initiative needs a designated lead with the authority and responsibility to drive it forward. This lead must set clear milestones and track progress weekly.",
      "Another key factor is aligning tools and resources with the new strategy. Organizations often declare a change in direction but fail to adjust budgets or staff allocations. If your firm plans to deliver high touch wealth advisory, but advisors are tied down by manual spreadsheets, progress will stall. Strategy execution requires intentional reallocation of resources to clear the path forward.",
      "Execution requires practice and discipline. It demands consistent follow through, operational clarity, and the flexibility to adjust when assumptions change. By establishing clear ownership and providing the right tools, organizations successfully bridge the gap between planning and results."
    ]
  },
  {
    id: "financial-modeling-decisions",
    title: "How to Build a Financial Model That Actually Supports Decisions",
    excerpt:
      "A practical guide to creating a model that goes beyond investor decks and helps you run your business smarter.",
    category: "News",
    date: "February 26, 2026",
    slug: "financial-modeling-decisions",
    image: "/insights/financial-modeling.jpg",
    author: "Osazuwa Omoregie",
    readTime: "8 min read",
    content: [
      "Too many financial models are built solely for pitch decks or bank loan applications. They are static spreadsheets filled with optimistic growth curves and complex formulas that hide real operations. Once funding is secured, these models are archived. This is a missed opportunity: a financial model should be a practical tool guiding daily business decisions.",
      "To build a model that supports decision making, shift your focus to verifiable operational drivers. An effective model uses realistic metrics rather than arbitrary growth percentages. For example, model your revenue based on lead generation channels, conversion rates, and contract values. By adjusting these levers, you can test realistic scenarios and understand what truly drives profit.",
      "A decision focused model must also track cash flow timing, not just accounting profits. Growing companies are often constrained by cash timing, such as long payment cycles or upfront costs. Your model must map cash inflows and outflows accurately, helping you forecast cash needs under different market conditions.",
      "At LEE Investment Handlers, our advisory approach is rooted in operational discipline. A financial model serves as a practical tool for your business, letting you stress test ideas, evaluate pricing, and plan expansion before spending capital. Keep your spreadsheets structured, separate inputs from calculations, and use them to guide sustainable growth."
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
  subtext: "Read economic analyses, strategic reports, and regular market updates written by our research teams in Lagos and Venice.",
};

export const newsletterCopy: NewsletterCopy = {
  headline: "Get Our Free Briefing",
  subtext: "Get weekly economic commentary and market briefings directly in your inbox. No spam. Unsubscribe anytime.",
  placeholder: "Enter your email address",
  buttonText: "Subscribe Now",
};
