import React from "react";
import { performanceBars, performanceSummary } from "@/lib/content/performance";

export const StrategiesPerformanceSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-primary py-20 md:py-28 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left — Header + Stat */}
          <div>
            <div className="flex items-center gap-2 text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-4 animate-fade-up">
              <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
              <span>Historical Returns</span>
            </div>

            <h2 className="font-heading text-3xl md:text-[32px] font-normal leading-[1.2] tracking-tight text-brand-primary mb-6 animate-fade-up-delay-1">
              Consistent Growth, Year After Year
            </h2>

            <div className="mb-6 animate-fade-up-delay-2">
              <span className={`font-heading font-normal text-brand-alternate block ${
                performanceSummary.average.length > 10
                  ? "text-2xl md:text-3xl leading-tight"
                  : "text-5xl md:text-6xl leading-none"
              }`}>
                {performanceSummary.average}
              </span>
              <p className="font-body text-base text-brand-secondary mt-2">
                {performanceSummary.label}
              </p>
            </div>

            <p className="font-body text-xs text-brand-secondary/60 leading-relaxed max-w-md animate-fade-up-delay-3">
              {performanceSummary.disclaimer}
            </p>
          </div>

          {/* Right — Bar Chart */}
          <div className="space-y-5 animate-fade-up-delay-4">
            {performanceBars.map((bar) => (
              <div
                key={bar.year}
                className="flex items-center gap-4"
              >
                <span className="font-body text-sm text-brand-secondary w-12 shrink-0 font-medium">
                  {bar.year}
                </span>
                <div className="flex-1 h-10 bg-brand-bg-secondary rounded-[2px] overflow-hidden border border-brand-border/40 relative">
                  <div
                    className="h-full bg-brand-alternate rounded-[2px] origin-left animate-scale-x-in"
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
                <span className="font-body text-sm text-brand-primary font-medium w-16 text-right shrink-0">
                  {bar.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

StrategiesPerformanceSection.displayName = "StrategiesPerformanceSection";
