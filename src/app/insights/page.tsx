"use client";

import React from "react";
import { InsightsHeroSection } from "@/components/sections/InsightsHeroSection";
import { ArticlesGrid } from "@/components/sections/ArticlesGrid";
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-brand-bg-primary text-brand-primary">
      {/* Page Hero */}
      <InsightsHeroSection />

      {/* Articles Grid List with dynamic filters */}
      <ArticlesGrid />

      {/* Newsletter Signup panel */}
      <NewsletterSignup />
    </main>
  );
}

