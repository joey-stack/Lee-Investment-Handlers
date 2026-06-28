import React from "react";
import { Search, PieChart, Target, BarChart2 } from "lucide-react";
import { pillars } from "@/lib/content/pillars";

const iconMap: Record<string, React.ReactNode> = {
  search: <Search size={20} />,
  "pie-chart": <PieChart size={20} />,
  target: <Target size={20} />,
  "bar-chart-2": <BarChart2 size={20} />,
};

export const StrategiesPillarsSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-primary py-20 md:py-28 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-16">
          <h2 className="font-heading text-3xl md:text-[36px] font-normal leading-[1.15] tracking-tight text-brand-primary text-balance animate-fade-up-delay-1">
            The Four Foundations of Our Framework
          </h2>
          <div className="flex items-center gap-2 text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate lg:justify-end animate-fade-up">
            <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
            <span>Investment Pillars</span>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border">
          {pillars.map((pillar, index) => {
            const isPerformance = pillar.id === "performance";
            return (
              <div
                key={pillar.id}
                className={`flex flex-col justify-between p-8 min-h-[300px] transition-all duration-300 animate-fade-up-delay-4 ${
                  isPerformance
                    ? "bg-brand-alternate"
                    : "bg-brand-bg-primary hover:bg-brand-bg-secondary"
                }`}
              >
                <div>
                  {/* Icon */}
                  <div
                    className={`h-10 w-10 flex items-center justify-center rounded-[2px] mb-8 ${
                      isPerformance
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "bg-brand-alternate/10 text-brand-alternate"
                    }`}
                  >
                    {iconMap[pillar.icon || ""] || <Target size={20} />}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-[17px] font-normal mb-3 text-brand-primary leading-tight">
                    {pillar.title}
                  </h3>

                  {/* Body */}
                  <p
                    className={`font-body text-sm leading-relaxed ${
                      isPerformance ? "text-brand-primary/75" : "text-brand-secondary"
                    }`}
                  >
                    {pillar.body}
                  </p>
                </div>

                {/* Index */}
                <span
                  className={`font-body text-[11px] tracking-[0.18em] uppercase mt-8 block font-semibold ${
                    isPerformance ? "text-brand-primary/35" : "text-brand-alternate/60"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

StrategiesPillarsSection.displayName = "StrategiesPillarsSection";
