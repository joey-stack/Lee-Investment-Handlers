import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About Us | LEE Investment Handlers",
  description: "Learn more about our legacy, core commitments, investment philosophy, and the experienced partners managing your portfolio.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
