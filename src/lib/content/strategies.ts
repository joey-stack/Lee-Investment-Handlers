export interface StrategyItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface StrategiesPageHero {
  headline: string;
  subtext: string;
}

export interface StrategiesIntro {
  eyebrow: string;
  headline: string;
  body: string;
}

export interface StrategyBreakdownContent {
  eyebrow: string;
  headline: string;
  description: string;
  items: StrategyItem[];
}

export interface RiskFramework {
  eyebrow: string;
  headline: string;
  description: string;
  items: string[];
}

export interface StrategiesCTA {
  headline: string;
  subtext: string;
  primaryBtnText: string;
  secondaryBtnText: string;
}

export const strategiesPageHero: StrategiesPageHero = {
  headline: "How We Manage Your Capital",
  subtext: "We build and run portfolios that achieve consistent, long-term growth. Our process combines deep research, investment diversification, and strict risk controls to protect your capital.",
};

export const strategiesIntro: StrategiesIntro = {
  eyebrow: "Philosophy",
  headline: "We Invest On Facts — Not Gossip",
  body: "Global financial markets are full of rumors, panic, and daily ups and downs. At LEE Investment Handlers, we ignore all this gossip. We build portfolios based on sound economic facts, broad investment diversification, and strict stress-testing. We never chase past performance — we construct portfolios that protect client capital and double your wealth over generations.",
};

export const strategyBreakdownContent: StrategyBreakdownContent = {
  eyebrow: "Investment Allocations",
  headline: "Factual Investment Classes For Steady Growth",
  description: "We invest capital across two strategic areas. This balanced investment allocation protects your family money against market crashes and high inflation.",
  items: [
    {
      id: "fixed-income",
      title: "Fixed Income & Yield",
      description: "Your returns on investment are guaranteed. Built for stability, not guesswork. Designed to grow your money without sleepless nights.",
      iconName: "percent",
    },
    {
      id: "global-diversification",
      title: "Global Diversification",
      description: "Multi-currency and geographical distribution that protects your capital from local political, currency, and economic crashes.",
      iconName: "globe",
    },
  ],
};

export const riskFramework: RiskFramework = {
  eyebrow: "Risk Management",
  headline: "How We Stop Portfolio Losses",
  description: "Capital preservation is the absolute base of compound growth. Our risk controls operate daily to protect your portfolio from market crashes.",
  items: [
    "Macroeconomic Stress-Testing: We simulate recessions, currency crashes, and high inflation to ensure portfolios always remain within safe capital boundaries.",
    "Concentration Limits: No single stock, credit issue, or niche sector is allowed to dominate your portfolio risk parameters.",
    "Liquidity Allocations: Portfolios are built with liquid cash buffers to ensure emergency withdrawals can be executed without selling depressed investments.",
    "Investment-Liability Matching: We match investment durations with your exact lifestyle, business, or trust cash flow needs."
  ],
};

export const strategiesCTA: StrategiesCTA = {
  headline: "Put Your Wealth In Order",
  subtext: "Talk directly to our advisors in Lagos or Venice to build a personalized strategy for your specific family objectives.",
  primaryBtnText: "Schedule a Consultation",
  secondaryBtnText: "Talk to an Advisor",
};
