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
