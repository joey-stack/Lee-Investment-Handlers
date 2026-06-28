import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/content/services";

interface ServicesDetailListProps {
  onOpenConsultation: () => void;
}

const imageMap: Record<string, string> = {
  "wealth-management": "/services/wealth-management.png",
  "portfolio-management": "/services/portfolio-management.png",
  "retirement-planning": "/services/retirement-planning.png",
  "institutional-investments": "/services/institutional-investments.png",
  "alternative-investments": "/services/alternative-investments.png",
  "risk-management": "/services/risk-management.png",
};

export const ServicesDetailList: React.FC<ServicesDetailListProps> = ({ onOpenConsultation }) => {
  return (
    <section className="bg-brand-bg-primary py-20 md:py-28 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* 3-Column Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const img = imageMap[service.id] || "/services/wealth-management.png";
            
            return (
              <div
                key={service.id}
                className="bg-brand-bg-secondary border border-brand-border/40 rounded-[6px] overflow-hidden flex flex-col justify-between shadow-[0px_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0px_8px_32px_rgba(10,10,10,0.04)] transition-all duration-300 min-h-[500px] animate-fade-up-delay-4 hover:-translate-y-1"
              >
                {/* 1. Card Top Cover Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-brand-bg-primary border-b border-brand-border/20 select-none">
                  <Image
                    src={img}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover hover:scale-[1.02] transition-transform duration-700 ease-out"
                    priority={index < 3}
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/[0.03] pointer-events-none" />
                </div>

                {/* Card Content Wrapper */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    {/* 2. Gold Eyebrow Service Label */}
                    <span className="text-[10px] md:text-xs font-body font-semibold tracking-[0.2em] uppercase text-brand-alternate mb-2.5 block">
                      SERVICE {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* 3. Heading (Service Title) */}
                    <h3 className="font-heading text-lg md:text-xl font-normal text-brand-primary mb-3 leading-snug">
                      {service.title}
                    </h3>

                    {/* 4. Description Paragraph */}
                    <p className="font-body text-xs md:text-sm text-brand-secondary leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div>
                    {/* 5. Metrics Grid (2 Columns) */}
                    {service.metrics && service.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 border-t border-brand-border/40 pt-4 mb-6 select-none">
                        {service.metrics.map((metric, mIdx) => (
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

                    {/* 6. Flat Action CTA Button at Bottom */}
                    <Button
                      variant="secondary"
                      onClick={onOpenConsultation}
                      className="w-full text-center text-xs font-semibold uppercase tracking-wider py-3.5 border-brand-border hover:border-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 rounded-none animate-fade-up-delay-3"
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
