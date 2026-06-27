import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Schedule a Consultation | LEE Investment Handlers",
  description: "Get in touch with LEE Investment Handlers. Reach out to our advisory teams in Lagos and Venice, learn about our onboarding process, and schedule a private consultation.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
