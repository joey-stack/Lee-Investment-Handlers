"use client";

import React from "react";
import { Briefcase } from "lucide-react";
import { openPositionsCopy, careersCTA } from "@/lib/content/careers";
import { Button } from "@/components/ui/Button";

export const OpenPositionsSection: React.FC = () => {
  const mailtoUrl = `mailto:${careersCTA.email}?subject=${encodeURIComponent("General Application - LEE Investment Handlers")}`;

  return (
    <section className="bg-brand-bg-primary py-20 md:py-24">
      <div className="max-w-[1248px] mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-3 block">
            {openPositionsCopy.subtitle}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-tight text-brand-primary">
            {openPositionsCopy.title}
          </h2>
        </div>

        {/* Empty State Card */}
        <div className="max-w-3xl mx-auto bg-brand-bg-secondary border border-dashed border-brand-border rounded-[6px] p-8 md:p-12 text-center flex flex-col items-center">
          {/* Icon */}
          <div className="h-12 w-12 rounded-[2px] bg-brand-alternate/10 flex items-center justify-center mb-6 text-brand-alternate">
            <Briefcase size={20} />
          </div>

          {/* Title */}
          <h3 className="font-heading text-xl md:text-2xl font-normal text-brand-primary mb-4">
            {openPositionsCopy.emptyStateTitle}
          </h3>

          {/* Explanation */}
          <p className="font-body text-sm md:text-base text-brand-secondary leading-relaxed max-w-lg mb-8">
            {openPositionsCopy.emptyStateText}
          </p>

          {/* Sub CTA details */}
          <div className="border-t border-brand-border/60 pt-8 w-full max-w-md">
            <h4 className="font-heading text-lg font-normal text-brand-primary mb-2">
              {careersCTA.headline}
            </h4>
            <p className="font-body text-xs md:text-sm text-brand-secondary leading-relaxed mb-6">
              {careersCTA.subtext}
            </p>
            
            {/* Action Mailto Button */}
            <Button
              href={mailtoUrl}
              variant="primary"
              className="w-full sm:w-auto"
            >
              {careersCTA.buttonText}
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

OpenPositionsSection.displayName = "OpenPositionsSection";
