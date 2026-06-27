import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Firm Insights & Market Intelligence | LEE Investment Handlers",
  description: "Stay informed with macroeconomic analysis, research commentary, and strategic investment articles from our wealth partners.",
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
