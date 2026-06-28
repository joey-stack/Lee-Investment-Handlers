import React from "react";
import { strategiesPageHero } from "@/lib/content/strategies";

export const StrategiesHeroSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-secondary pt-32 pb-20 md:pt-40 md:pb-28 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="max-w-3xl flex flex-col items-center text-center mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-6 animate-fade-up">
            <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
            <span>Investment Approach</span>
          </div>

          {/* Heading (Didact Gothic) */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.1] tracking-tight text-brand-primary mb-6 text-balance text-center animate-fade-up-delay-1">
            {strategiesPageHero.headline}
          </h1>

          {/* Subtext */}
          <p className="font-body text-base md:text-lg text-brand-secondary leading-relaxed max-w-2xl font-normal mx-auto text-balance animate-fade-up-delay-2">
            {strategiesPageHero.subtext}
          </p>
        </div>
      </div>
    </section>
  );
};

StrategiesHeroSection.displayName = "StrategiesHeroSection";
