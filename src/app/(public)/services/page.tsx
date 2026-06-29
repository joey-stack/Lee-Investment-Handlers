"use client";

import React, { useState } from "react";
import { ServicesHeroSection } from "@/components/sections/ServicesHeroSection";
import { ServicesDetailList } from "@/components/sections/ServicesDetailList";
import { RiskManagementFrameworkSection } from "@/components/sections/RiskManagementFrameworkSection";
import { StrategiesPerformanceSection } from "@/components/sections/StrategiesPerformanceSection";
import { FooterCTASection } from "@/components/sections/FooterCTASection";
import { ConsultationModal } from "@/components/sections/ConsultationModal";

export default function ServicesPage() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const openConsultation = () => setIsConsultationModalOpen(true);
  const closeConsultation = () => setIsConsultationModalOpen(false);

  return (
    <main className="min-h-screen bg-brand-bg-primary text-brand-primary">
      {/* Page Hero */}
      <ServicesHeroSection />

      {/* Alternating Services Detail Rows */}
      <ServicesDetailList onOpenConsultation={openConsultation} />

      {/* Investment Strategies — Risk Management Framework */}
      <RiskManagementFrameworkSection />

      {/* Investment Strategies — Historical Performance */}
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
