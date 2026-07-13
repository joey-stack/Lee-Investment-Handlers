export interface CommitmentItem {
  title: string;
  description: string;
}

export interface AboutSnippetContent {
  headline: string;
  body: string;
  commitments: CommitmentItem[];
  ctaText: string;
  ctaHref: string;
  imageUrl: string;
  imageAlt: string;
  marqueeItems: string[];
}

export const aboutSnippetContent: AboutSnippetContent = {
  headline: "How To Choose A Trusted Partner For Your Wealth",
  body: "At LEE Investment Handlers, we know that wealth management is about facts — it is about protecting your hard-earned cash, securing what you built, and designing a portfolio that makes money. With offices in Lagos and Venice, we offer solid proof and expert advice.",
  commitments: [
    {
      title: "Keep Capital",
      description: "How to protect your money against inflation and risk.",
    },
    {
      title: "Compound Wealth",
      description: "Multiply your capital with a factual, diversified investment program.",
    },
    {
      title: "Reduce Risk",
      description: "Avoid loss by using our strict risk controls.",
    },
    {
      title: "Securing Legacies",
      description: "We design estate plans that protect your heirs.",
    },
  ],
  ctaText: "Read Our Full Story",
  ctaHref: "/about",
  imageUrl: "/about-preview.png",
  imageAlt: "LEE Investment Handlers — professional consultation meeting in a modern office",
  marqueeItems: [
    "Lagos, Nigeria",
    "Venice, Italy",
    "Capital Preservation",
    "Securing Heirs",
    "State Advisory",
    "Portfolio Construction",
  ],
};

// --- About Page Content Types ---

export interface AboutHeroContent {
  headline: string;
  subtext: string;
  bgImageUrl: string;
}

export interface OurStoryContent {
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  imageUrl: string;
  imageAlt: string;
}

export interface MissionVisionItem {
  title: string;
  description: string;
}

export interface MissionVisionContent {
  eyebrow: string;
  headline: string;
  mission: MissionVisionItem;
  vision: MissionVisionItem;
}

export interface WhyChooseCard {
  number: string;
  title: string;
  description: string;
}

export interface AboutWhyChooseUsContent {
  eyebrow: string;
  headline: string;
  description: string;
  items: WhyChooseCard[];
}

export interface AboutPillarsContent {
  eyebrow: string;
  headline: string;
  description: string;
}

// --- About Page Content Constants ---

export const aboutHeroContent: AboutHeroContent = {
  headline: "Invest On Facts. Grow By Results.",
  subtext: "We help you preserve, structure, and double your family wealth. Operating from Lagos and Venice, we apply hard facts and total discipline to make your cash work much harder.",
  bgImageUrl: "https://labs.google/fx/api/og-image/shared/fff194aa-b9e6-47e7-af76-2544c5119814",
};

export const ourStoryContent: OurStoryContent = {
  eyebrow: "Our History",
  headline: "How We Built Our Financial Reputation",
  paragraphs: [
    "We founded this firm to give serious private investors, wealthy families, and institutions the finest, most factual wealth management service and absolute dedication.",
    "We started by focusing entirely on preserving client capital. Today, we also offer complete portfolio strategies, private equity deals, and secure estate plans that protect your family wealth forever.",
    "Operating offices in Lagos and Venice, we connect global markets with the thorough, bespoke financial advice that our serious clients demand from us."
  ],
  imageUrl: "/about-preview.png", // Reuse existing preview image
  imageAlt: "LEE Investment Handlers office meeting overlooking the city",
};

export const missionVisionContent: MissionVisionContent = {
  eyebrow: "Purpose",
  headline: "We Invest On Facts, Not Opinions",
  mission: {
    title: "Our Mission",
    description: "To provide factual wealth management services that preserve investments and double capital, helping you build a lasting legacy for your children.",
  },
  vision: {
    title: "Our Vision",
    description: "To be the most trusted wealth management firm for serious investors across Africa and Europe, famous for our hard facts, integrity, and client profits.",
  },
};

export const aboutWhyChooseUsContent: AboutWhyChooseUsContent = {
  eyebrow: "Differentiators",
  headline: "Why Wealthy Families Partner With Us",
  description: "Successful investing is not about choosing hot tips. It is about strategy, facts, and avoiding losses. Here is how we do it.",
  items: [
    {
      number: "01",
      title: "Strategic Portfolio Construction",
      description: "We construct personalized investment portfolios across global investment classes to match your family objectives and grow your wealth safely.",
    },
    {
      number: "02",
      title: "Dual-Hub Perspective",
      description: "Operating from Lagos and Venice gives our research experts unique macro and micro insights into both emerging and stable global markets.",
    },
    {
      number: "03",
      title: "Uncompromising Alignment",
      description: "We are fee-only financial advisors. We never accept commissions from third-party brokers, ensuring our advice is always in your best interest.",
    },
    {
      number: "04",
      title: "Institutional-Grade Risk Management",
      description: "We use rigorous financial tests to analyze risk, stress-test portfolios, and protect your capital from loss during market downturns.",
    },
  ],
};

export const aboutPillarsContent: AboutPillarsContent = {
  eyebrow: "Investment Philosophy",
  headline: "How We Protect And Multiply Your Wealth",
  description: "We build and run portfolios based on four strict rules. These factual principles guide our research and every single transaction.",
};
