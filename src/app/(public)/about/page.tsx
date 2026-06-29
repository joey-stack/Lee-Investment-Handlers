"use client";

import React, { useState } from "react";
import { AboutHeroSection } from "@/components/sections/AboutHeroSection";
import { OurStorySection } from "@/components/sections/OurStorySection";
import { AboutCommitmentsSection } from "@/components/sections/AboutCommitmentsSection";
import { AboutStatsSection } from "@/components/sections/AboutStatsSection";
import { AboutWhyChooseUsSection } from "@/components/sections/AboutWhyChooseUsSection";
import { AboutPillarsSection } from "@/components/sections/AboutPillarsSection";
import { AboutLeadershipSection } from "@/components/sections/AboutLeadershipSection";
import { FooterCTASection } from "@/components/sections/FooterCTASection";
import { ConsultationModal } from "@/components/sections/ConsultationModal";

export default function AboutPage() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const openConsultation = () => setIsConsultationModalOpen(true);
  const closeConsultation = () => setIsConsultationModalOpen(false);

  return (
    <main className="min-h-screen bg-brand-bg-primary text-brand-primary">
      {/* 1. Hero Section */}
      <AboutHeroSection />

      {/* 2. Our Story Block */}
      <OurStorySection />

      {/* 3. Commitments Checklist */}
      <AboutCommitmentsSection />

      {/* 4. Stats Section (NEW) */}
      <AboutStatsSection />

      {/* 5. Why Choose Us (Differentiators banner & cards) */}
      <AboutWhyChooseUsSection />

      {/* 6. Investment Philosophy (Expanded 4 pillars) */}
      <AboutPillarsSection />

      {/* 7. Full Leadership Team Grid */}
      <AboutLeadershipSection />

      {/* 8. Centered Footer CTA Banner */}
      <FooterCTASection onOpenConsultation={openConsultation} />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={closeConsultation}
      />
    </main>
  );
}

