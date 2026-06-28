import React from "react";
import { ourStoryContent } from "@/lib/content/about";

export const OurStorySection: React.FC = () => {
  return (
    <section className="bg-brand-bg-primary py-20 md:py-28 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-6 animate-fade-up">
            <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
            <span>{ourStoryContent.eyebrow}</span>
          </div>

          {/* Headline */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[40px] font-normal leading-[1.2] tracking-tight text-brand-primary mb-8 text-balance animate-fade-up-delay-1">
            {ourStoryContent.headline}
          </h2>

          {/* Paragraphs */}
          <div className="font-body text-base md:text-lg text-brand-secondary leading-relaxed max-w-2xl mx-auto animate-fade-up-delay-2">
            <p>{ourStoryContent.paragraphs.join(" ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

OurStorySection.displayName = "OurStorySection";

