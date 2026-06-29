import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Investment Services | LEE Investment Handlers",
  description: "Explore our personalized and institutional-grade wealth solutions, including Wealth Management, Portfolio Management, and Risk Management.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
