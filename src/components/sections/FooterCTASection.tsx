"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

interface FooterCTASectionProps {
  onOpenConsultation: () => void;
}

export const FooterCTASection: React.FC<FooterCTASectionProps> = ({ onOpenConsultation }) => {
  return (
    <section className="relative bg-[#0A0A0A] border-t border-brand-border-dark overflow-hidden py-24 md:py-32 font-body text-white text-center select-none">
      
      {/* Premium subtle glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,110,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />
      
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col items-center justify-center">
        
        <div className="flex flex-col items-center max-w-2xl">
          {/* Eyebrow Label */}
          <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-brand-alternate mb-6 animate-fade-up">
            Ready to Take the First Step?
          </p>

          {/* Headline Display Heading (Didact Gothic) */}
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-white mb-6 text-balance animate-fade-up-delay-1">
            Manage Wealth. Build a Legacy.
          </h2>

          {/* Subtext Paragraph */}
          <p className="font-body text-sm md:text-base text-white/70 max-w-lg mb-10 leading-relaxed font-light text-balance animate-fade-up-delay-2">
            Invest with us to protect and grow your wealth across generations. Request a private session with our investment committee.
          </p>

          {/* Primary CTA Button */}
          <div className="w-full sm:w-auto animate-fade-up-delay-3">
            <Button
              variant="primary"
              onClick={onOpenConsultation}
              className="w-full sm:w-auto font-medium shadow-[0px_4px_12px_rgba(200,169,110,0.15)] hover:shadow-[0px_8px_24px_rgba(200,169,110,0.25)] text-brand-primary rounded-none px-10 py-4 text-sm"
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

FooterCTASection.displayName = "FooterCTASection";
