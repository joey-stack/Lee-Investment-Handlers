"use client";

import React from "react";
import { CareersHeroSection } from "@/components/sections/CareersHeroSection";
import { WhyJoinUsSection } from "@/components/sections/WhyJoinUsSection";
import { WhatWeLookForSection } from "@/components/sections/WhatWeLookForSection";
import { OpenPositionsSection } from "@/components/sections/OpenPositionsSection";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-brand-bg-primary text-brand-primary">
      {/* Careers Hero */}
      <CareersHeroSection />

      {/* Why Join Us — Values Card Grid */}
      <WhyJoinUsSection />

      {/* What We Look For — Candidate Qualities Checklist */}
      <WhatWeLookForSection />

      {/* Open Positions empty state and general Application mailto CTA */}
      <OpenPositionsSection />
    </main>
  );
}
