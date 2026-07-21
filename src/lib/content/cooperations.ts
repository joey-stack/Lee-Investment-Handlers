import { Service } from "@/types";

export const cooperations: Service[] = [
  {
    id: "real-estate-holdings",
    title: "Real Estate Holdings",
    description:
      "Buying, managing, and developing high yield commercial and residential properties in prime cities and growing economic hubs.",
    includes: [
      "Prime commercial office developments",
      "Residential joint venture property projects",
      "Investment valuation and portfolio optimization",
      "High yield leasehold structures",
      "Long term capital growth strategies",
    ],
    icon: "building-2",
    metrics: [
      { value: "₦50B+", label: "property value managed" },
      { value: "18.5%", label: "average rental yield" },
    ],
  },
  {
    id: "iron-steel-operations",
    title: "Iron & Steel Operations",
    description:
      "Direct management and capital partnerships in raw material processing, foundry logistics, and structural steel manufacturing.",
    includes: [
      "Foundry and refining infrastructure partnerships",
      "Supply chain distribution agreements",
      "Industrial fabrication and machining services",
      "Raw material sourcing and logistics management",
      "Structural steel manufacturing partnerships",
    ],
    icon: "layers",
    metrics: [
      { value: "Active", label: "manufacturing hubs" },
      { value: "100%", label: "supply chain integrity" },
    ],
  },
  {
    id: "oil-gas-investments",
    title: "Oil & Gas Strategic Investments",
    description:
      "Targeted investments in midstream distribution systems, transport logistics, and energy infrastructure.",
    includes: [
      "Upstream oil block development partnerships",
      "Midstream transport and storage logistics",
      "Downside protected energy hedging strategies",
      "Sustainable production infrastructure investments",
      "Refined product trading and distribution networks",
    ],
    icon: "droplet",
    metrics: [
      { value: "Diversified", label: "energy portfolio" },
      { value: "Fiduciary", label: "capital allocation" },
    ],
  },
  {
    id: "forex-strategies",
    title: "Forex Management Strategies",
    description:
      "Currency protection, liquidity management, and foreign exchange strategies designed to keep your money safe across global markets.",
    includes: [
      "Multi currency liquidity optimization",
      "Cross border transaction risk hedging",
      "Global currency market analysis",
      "Capital preservation treasury models",
      "Active international market monitoring",
    ],
    icon: "trending-up",
    metrics: [
      { value: "Good & Attractive", label: "investment rate" },
      { value: "Continuous", label: "exposure monitoring" },
    ],
  },
];
