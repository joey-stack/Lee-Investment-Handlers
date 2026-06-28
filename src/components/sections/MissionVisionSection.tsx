import React from "react";
import { missionVisionContent } from "@/lib/content/about";

export const MissionVisionSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-secondary py-20 md:py-28 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex flex-col items-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-4 animate-fade-up">
              <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
              <span>{missionVisionContent.eyebrow}</span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-3xl md:text-[32px] font-normal leading-[1.2] tracking-tight text-brand-primary text-balance animate-fade-up-delay-1">
              {missionVisionContent.headline}
            </h2>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div
            className="bg-brand-bg-primary border border-brand-border/60 rounded-[6px] p-8 md:p-10 flex flex-col items-start shadow-[0px_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0px_8px_24px_rgba(10,10,10,0.04)] transition-all duration-300 animate-fade-up-delay-4 hover:-translate-y-1"
          >
            {/* Accent Border Indicator */}
            <div className="h-1.5 w-12 bg-brand-alternate mb-8" />
            <h3 className="font-heading text-2xl font-normal text-brand-primary mb-4">
              {missionVisionContent.mission.title}
            </h3>
            <p className="font-body text-base text-brand-secondary leading-relaxed">
              {missionVisionContent.mission.description}
            </p>
          </div>

          {/* Vision Card */}
          <div
            className="bg-brand-bg-primary border border-brand-border/60 rounded-[6px] p-8 md:p-10 flex flex-col items-start shadow-[0px_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0px_8px_24px_rgba(10,10,10,0.04)] transition-all duration-300 animate-fade-up-delay-4 hover:-translate-y-1"
          >
            {/* Accent Border Indicator */}
            <div className="h-1.5 w-12 bg-brand-alternate mb-8" />
            <h3 className="font-heading text-2xl font-normal text-brand-primary mb-4">
              {missionVisionContent.vision.title}
            </h3>
            <p className="font-body text-base text-brand-secondary leading-relaxed">
              {missionVisionContent.vision.description}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

MissionVisionSection.displayName = "MissionVisionSection";
