import React from "react";
import { Check } from "lucide-react";
import { careerQualities } from "@/lib/content/careers";

export const WhatWeLookForSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-secondary py-20 md:py-24 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column — Title & Subtext */}
          <div className="lg:col-span-5">
            <span className="text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-3 block animate-fade-up">
              Candidate Profile
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-tight text-brand-primary mb-6 animate-fade-up-delay-1">
              What We Look For
            </h2>
            <p className="font-body text-xs md:text-sm text-brand-secondary leading-relaxed max-w-md animate-fade-up-delay-2">
              We look for people who are not only exceptional at what they do, but who also share our commitment to integrity, long-term thinking, and excellence. We believe that team alignment and shared principles are key to delivering the best results for our clients.
            </p>
          </div>

          {/* Right Column — Qualities List */}
          <div className="lg:col-span-7 space-y-4 md:space-y-6">
            {careerQualities.map((quality) => (
              <div
                key={quality}
                className="bg-brand-bg-primary border border-brand-border/40 rounded-[6px] p-5 flex items-start gap-4 shadow-[0px_1px_4px_rgba(0,0,0,0.01)] hover:shadow-[0px_4px_12px_rgba(10,10,10,0.02)] transition-all duration-200 animate-fade-up-delay-4"
              >
                {/* Gold Check Circle */}
                <div className="flex-shrink-0 h-6 w-6 rounded-[2px] bg-brand-alternate/10 flex items-center justify-center mt-0.5">
                  <Check size={14} className="text-brand-alternate" />
                </div>
                
                {/* Content */}
                <span className="font-body text-sm md:text-base font-medium text-brand-primary">
                  {quality}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

WhatWeLookForSection.displayName = "WhatWeLookForSection";
