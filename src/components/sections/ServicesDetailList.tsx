import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cooperations } from "@/lib/content/cooperations";

interface ServicesDetailListProps {
  onOpenConsultation: () => void;
}

const imageMap: Record<string, string> = {
  "real-estate-holdings": "/services/institutional-investments.png",
  "iron-steel-operations": "/services/iron-steel-operations.png",
  "oil-gas-investments": "/services/oil-gas-investments.png",
  "forex-strategies": "/services/forex-strategies.png",
};

export const ServicesDetailList: React.FC<ServicesDetailListProps> = ({ onOpenConsultation }) => {
  return (
    <section className="bg-brand-bg-primary py-20 md:py-28 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Section Heading */}
        <div className="mb-12">
          <span className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-brand-alternate mb-4 block">
            Primary Sectors
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-normal text-brand-primary">
            Our Cooperations
          </h2>
        </div>

        {/* 2-Column or 3-Column Cooperations Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-4">
          {cooperations.map((coop, index) => {
            const img = imageMap[coop.id] || "/services/wealth-management.png";
            
            return (
              <div
                key={coop.id}
                className="bg-brand-bg-secondary border border-brand-border/40 rounded-[6px] overflow-hidden flex flex-col justify-between shadow-[0px_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0px_8px_32px_rgba(10,10,10,0.04)] transition-all duration-300 min-h-[500px] hover:-translate-y-1"
              >
                {/* 1. Card Top Cover Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-brand-bg-primary border-b border-brand-border/20 select-none">
                  <Image
                    src={img}
                    alt={coop.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 20vw"
                    className="object-cover hover:scale-[1.02] transition-transform duration-700 ease-out"
                    priority={index < 4}
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/[0.03] pointer-events-none" />
                </div>

                {/* Card Content Wrapper */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    {/* 2. Gold Eyebrow Service Label */}
                    <span className="text-[10px] md:text-xs font-body font-semibold tracking-[0.2em] uppercase text-brand-alternate mb-2.5 block">
                      SECTOR {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* 3. Heading (Service Title) */}
                    <h3 className="font-heading text-lg md:text-xl font-normal text-brand-primary mb-3 leading-snug">
                      {coop.title}
                    </h3>

                    {/* 4. Description Paragraph */}
                    <p className="font-body text-xs md:text-sm text-brand-secondary leading-relaxed mb-6">
                      {coop.description}
                    </p>
                  </div>

                  <div>
                    {/* 5. Metrics Grid (2 Columns) */}
                    {coop.metrics && coop.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 border-t border-brand-border/40 pt-4 mb-6 select-none">
                        {coop.metrics.map((metric, mIdx) => (
                          <div key={mIdx} className="flex flex-col">
                            <span className="font-heading text-xl md:text-2xl font-normal text-brand-primary leading-none mb-1">
                              {metric.value}
                            </span>
                            <span className="font-body text-[9px] md:text-[10px] text-brand-secondary/60 font-semibold uppercase tracking-wider leading-tight">
                              {metric.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 6. Action CTA Button at Bottom */}
                    <Button
                      variant="secondary"
                      onClick={onOpenConsultation}
                      className="w-full text-center text-xs font-semibold uppercase tracking-wider py-3.5 border-brand-border hover:border-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 rounded-none"
                    >
                      Schedule Consultation
                    </Button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

ServicesDetailList.displayName = "ServicesDetailList";
