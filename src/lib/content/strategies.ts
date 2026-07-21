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
  subtext: "We build and run portfolios that achieve steady long term growth. Our approach combines deep research, broad asset diversification, and strict risk controls to keep your money safe.",
};

export const strategiesIntro: StrategiesIntro = {
  eyebrow: "Philosophy",
  headline: "We Invest On Facts, Not Gossip",
  body: "Global financial markets are full of rumors, noise, and short term market swings. At LEE Investment Handlers, we ignore all market gossip. We build portfolios based on proven economic facts, broad asset diversification, and thorough stress testing. We construct portfolios that protect your savings and compound your wealth over generations.",
};

export const strategyBreakdownContent: StrategyBreakdownContent = {
  eyebrow: "Investment Allocations",
  headline: "Factual Investment Classes For Steady Growth",
  description: "We invest capital across two strategic areas. This balanced asset allocation protects your family money against market drops and inflation.",
  items: [
    {
      id: "fixed-income",
      title: "Fixed Income & Yield",
      description: "Your investment returns are clear and predictable. Built for stability, helping your money grow steadily without unnecessary risk.",
      iconName: "percent",
    },
    {
      id: "global-diversification",
      title: "Global Diversification",
      description: "Multi currency and global market distribution that protects your savings from local economic and currency changes.",
      iconName: "globe",
    },
  ],
};

export const riskFramework: RiskFramework = {
  eyebrow: "Risk Management",
  headline: "How We Stop Portfolio Losses",
  description: "Keeping your principal safe is the essential key to compounding wealth. Our risk controls work constantly to protect your portfolio.",
  items: [
    "Macroeconomic Stress Testing: We test market scenarios, currency movements, and inflation spikes so your portfolio stays safe under any condition.",
    "Concentration Limits: No single stock, credit issue, or niche sector is allowed to take up too much space in your portfolio.",
    "Liquidity Allocations: Portfolios maintain clear cash buffers so emergency cash needs can be met without selling investments early.",
    "Investment Liability Matching: We align investment timelines with your exact lifestyle, family, or trust cash needs."
  ],
};

export const strategiesCTA: StrategiesCTA = {
  headline: "Put Your Wealth In Order",
  subtext: "Talk directly to our advisors in Lagos or Venice to build a personalized strategy for your specific family goals.",
  primaryBtnText: "Schedule a Consultation",
  secondaryBtnText: "Talk to an Advisor",
};
