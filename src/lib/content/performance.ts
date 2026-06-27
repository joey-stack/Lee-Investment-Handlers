import { PerformanceBar } from "@/types";

export const performanceBars: PerformanceBar[] = [
  { year: "2021", value: 42, label: "+12.4%" },
  { year: "2022", value: 55, label: "+14.8%" },
  { year: "2023", value: 68, label: "+16.2%" },
  { year: "2024", value: 80, label: "+17.5%" },
  { year: "2025", value: 95, label: "+18.7%" },
];

export const performanceSummary = {
  average: "+18.7%",
  label: "Average Annual Growth",
  disclaimer:
    "Past growth does not guarantee future profits. All investments carry risk. Individual client returns will vary.",
};
