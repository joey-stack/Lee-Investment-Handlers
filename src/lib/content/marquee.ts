export interface MarqueeItem {
  id: string;
  label: string;
  iconName: string;
}

export const marqueeItems: MarqueeItem[] = [
  { id: "private-equity", label: "Private Capital", iconName: "Briefcase" },
  { id: "venture-capital", label: "Growth Equity", iconName: "TrendingUp" },
  { id: "real-estate", label: "Property Deals", iconName: "Building2" },
  { id: "alternative-assets", label: "Alternative Deals", iconName: "Layers" },
  { id: "global-equities", label: "World Stocks", iconName: "BarChart2" },
  { id: "fixed-income", label: "Secure Bonds", iconName: "Shield" },
];
