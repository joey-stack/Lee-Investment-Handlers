"use client";

import React, { useState } from "react";
import { StrategiesHeroSection } from "@/components/sections/StrategiesHeroSection";
import { StrategiesIntroSection } from "@/components/sections/StrategiesIntroSection";
import { StrategiesPillarsSection } from "@/components/sections/StrategiesPillarsSection";
import { StrategyBreakdownSection } from "@/components/sections/StrategyBreakdownSection";
import { RiskManagementFrameworkSection } from "@/components/sections/RiskManagementFrameworkSection";
import { StrategiesPerformanceSection } from "@/components/sections/StrategiesPerformanceSection";
import { FooterCTASection } from "@/components/sections/FooterCTASection";
import { ConsultationModal } from "@/components/sections/ConsultationModal";

export default function StrategiesPage() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const openConsultation = () => setIsConsultationModalOpen(true);
  const closeConsultation = () => setIsConsultationModalOpen(false);

  return (
    <main className="min-h-screen bg-brand-bg-primary text-brand-primary">
      {/* Page Hero */}
      <StrategiesHeroSection />

      {/* Philosophy Intro */}
      <StrategiesIntroSection />

      {/* 4 Pillars Section */}
      <StrategiesPillarsSection />

      {/* Strategy Breakdown */}
      <StrategyBreakdownSection />

      {/* Risk Management Framework */}
      <RiskManagementFrameworkSection />

      {/* Historical Performance */}
      <StrategiesPerformanceSection />

      {/* Closing CTA */}
      <FooterCTASection onOpenConsultation={openConsultation} />

      {/* Consultation Request Form Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={closeConsultation}
      />
    </main>
  );
}
