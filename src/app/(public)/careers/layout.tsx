import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Careers | LEE Investment Handlers",
  description: "Join our team of disciplined professionals at LEE Investment Handlers. Explore our core values, candidate qualities, and submit your application for future openings.",
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
