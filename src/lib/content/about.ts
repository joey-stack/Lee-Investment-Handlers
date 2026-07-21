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
  body: "At LEE Investment Handlers, we know that managing wealth comes down to facts. It is about protecting your hard earned savings, securing what you built, and designing a portfolio that generates steady returns. With active teams in Lagos and Venice, we offer solid proof and clear financial guidance.",
  commitments: [
    {
      title: "Keep Capital",
      description: "Protect your money against inflation and market downturns.",
    },
    {
      title: "Compound Wealth",
      description: "Grow your capital using a proven and diversified investment plan.",
    },
    {
      title: "Reduce Risk",
      description: "Avoid financial loss by applying strict risk controls.",
    },
    {
      title: "Securing Legacies",
      description: "We design estate plans that protect your family heirs.",
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
  subtext: "We help you protect, organize, and double your family wealth. Operating from Lagos and Venice, we use hard facts and disciplined planning to make your money work harder.",
  bgImageUrl: "https://labs.google/fx/api/og-image/shared/fff194aa-b9e6-47e7-af76-2544c5119814",
};

export const ourStoryContent: OurStoryContent = {
  eyebrow: "Our History",
  headline: "How We Built Our Financial Reputation",
  paragraphs: [
    "We founded this firm to give private investors, wealthy families, and institutions clear, factual wealth management and total personal dedication.",
    "We started by focusing entirely on preserving client capital. Today, we offer complete portfolio strategies, private equity opportunities, and secure estate plans that safeguard your family wealth for generations.",
    "Operating offices in Lagos and Venice, we connect global markets with the thorough, personalized financial advice our clients expect."
  ],
  imageUrl: "/about-preview.png",
  imageAlt: "LEE Investment Handlers office meeting overlooking the city",
};

export const missionVisionContent: MissionVisionContent = {
  eyebrow: "Purpose",
  headline: "We Invest On Facts, Not Opinions",
  mission: {
    title: "Our Mission",
    description: "To provide factual wealth management services that protect investments and double capital, helping you build a lasting legacy for your family.",
  },
  vision: {
    title: "Our Vision",
    description: "To be the most trusted wealth management firm for serious investors across Africa and Europe, known for hard facts, integrity, and client growth.",
  },
};

export const aboutWhyChooseUsContent: AboutWhyChooseUsContent = {
  eyebrow: "Differentiators",
  headline: "Why Wealthy Families Partner With Us",
  description: "Successful investing is not about following market noise. It is about sound strategy, facts, and avoiding losses. Here is how we deliver.",
  items: [
    {
      number: "01",
      title: "Strategic Portfolio Construction",
      description: "We build personalized investment portfolios across global asset classes to match your family goals and grow your savings safely.",
    },
    {
      number: "02",
      title: "Dual Hub Perspective",
      description: "Operating from Lagos and Venice gives our research team deep insights into both fast growing emerging markets and stable global hubs.",
    },
    {
      number: "03",
      title: "Uncompromising Alignment",
      description: "We are fee only financial advisors. We never take commissions from third party brokers, ensuring our advice is always in your best interest.",
    },
    {
      number: "04",
      title: "Institutional Grade Risk Management",
      description: "We use thorough financial tests to analyze risk, stress test portfolios, and protect your capital from loss when markets go down.",
    },
  ],
};

export const aboutPillarsContent: AboutPillarsContent = {
  eyebrow: "Investment Philosophy",
  headline: "How We Protect And Multiply Your Wealth",
  description: "We build and manage portfolios based on four strict rules. These principles guide our research and every single transaction.",
};
