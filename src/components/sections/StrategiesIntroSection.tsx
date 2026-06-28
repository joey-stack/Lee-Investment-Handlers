import React from "react";
import { strategiesIntro } from "@/lib/content/strategies";

export const StrategiesIntroSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-secondary py-20 md:py-28 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">

        {/* Top eyebrow — centered */}
        <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-8 animate-fade-up">
          <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
          <span>{strategiesIntro.eyebrow}</span>
        </div>

        {/* Two-column: Large headline left, body text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.12] tracking-tight text-brand-primary text-balance animate-fade-up-delay-1">
            {strategiesIntro.headline}
          </h2>

          <div className="flex flex-col justify-end animate-fade-up-delay-2">
            <p className="font-body text-base md:text-lg text-brand-secondary leading-relaxed">
              {strategiesIntro.body}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

StrategiesIntroSection.displayName = "StrategiesIntroSection";
