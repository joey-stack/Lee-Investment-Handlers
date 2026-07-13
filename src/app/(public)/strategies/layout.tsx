import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Investment Strategies | LEE Investment Handlers",
  description: "Explore our disciplined investment allocations, four core investment pillars, risk management frameworks, and historical performance tracking.",
};

export default function StrategiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
