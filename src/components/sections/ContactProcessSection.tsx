import React from "react";
import { processSteps } from "@/lib/content/process";
import { contactProcessCopy } from "@/lib/content/contact";

export const ContactProcessSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-secondary py-20 md:py-24 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-3 block animate-fade-up">
            {contactProcessCopy.subtitle}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-tight text-brand-primary animate-fade-up-delay-1">
            {contactProcessCopy.title}
          </h2>
        </div>

        {/* 3-Column Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processSteps.map((stepItem) => (
            <div
              key={stepItem.step}
              className="bg-brand-bg-primary border border-brand-border/60 rounded-[6px] p-6 md:p-8 flex flex-col justify-between shadow-[0px_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0px_8px_24px_rgba(10,10,10,0.04)] transition-all duration-300 min-h-[240px] relative animate-fade-up-delay-4 hover:-translate-y-1"
            >
              <div>
                {/* Gold Timeline step counter */}
                <span className="text-brand-alternate font-heading text-4xl block mb-6 font-normal">
                  {stepItem.step}
                </span>

                {/* Title */}
                <h3 className="font-heading text-lg md:text-xl font-normal text-brand-primary mb-3">
                  {stepItem.title}
                </h3>

                {/* Description */}
                <p className="font-body text-xs md:text-sm text-brand-secondary leading-relaxed">
                  {stepItem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

ContactProcessSection.displayName = "ContactProcessSection";
