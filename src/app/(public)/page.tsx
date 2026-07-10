"use client";

import React, { useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StrategyBreakdownSection } from "@/components/sections/StrategyBreakdownSection";
import { IndustriesMarquee } from "@/components/sections/IndustriesMarquee";

import { PerformancePreview } from "@/components/sections/PerformancePreview";
import { ManagementDisciplines } from "@/components/sections/ManagementDisciplines";
import { LeadershipSnapshot } from "@/components/sections/LeadershipSnapshot";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { HomeFAQsSection } from "@/components/sections/HomeFAQsSection";
import { FooterCTASection } from "@/components/sections/FooterCTASection";
import { ConsultationModal } from "@/components/sections/ConsultationModal";
import { WriteReviewModal } from "@/components/sections/WriteReviewModal";

export default function Home() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const openConsultation = () => setIsConsultationModalOpen(true);
  const closeConsultation = () => setIsConsultationModalOpen(false);
  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);

  return (
    <main className="min-h-screen bg-brand-bg-primary text-brand-primary">
      {/* Centered Hero Section */}
      <HeroSection onOpenConsultation={openConsultation} />

      {/* 4-column Why Choose Us Differentiators */}
      <WhyChooseUs />

      {/* Vertical stacked Services Rows */}
      <ServicesGrid onOpenConsultation={openConsultation} />

      <div className="relative z-20 lg:-mt-[1020px] bg-brand-bg-primary">
        <StrategyBreakdownSection />
      </div>

      {/* Legacy Services as Core Expertise Disciplines (no buttons) */}
      <ManagementDisciplines />

      {/* Partners Marquee Banner */}
      <IndustriesMarquee />

      {/* Performance Chart & Bento Stats */}
      <PerformancePreview />

      {/* Leadership snapshot static grid */}
      <LeadershipSnapshot />

      {/* Testimonials 3-column grid */}
      <TestimonialsSection onOpenReviewModal={openReviewModal} />

      {/* Insights/Blog preview */}
      <InsightsPreview />

      {/* Accordion FAQ block */}
      <HomeFAQsSection />

      {/* Bottom centered dark banner CTA */}
      <FooterCTASection onOpenConsultation={openConsultation} />

      {/* Consultation Request Form Modal Popup */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={closeConsultation}
      />

      {/* Write Review Form Modal Popup */}
      <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={closeReviewModal}
      />
    </main>
  );
}
