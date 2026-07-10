import React from "react";
import {
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Building2,
  Layers,
  Droplet,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cooperations } from "@/lib/content/cooperations";
import Image from "next/image";

interface ServicesGridProps {
  onOpenConsultation: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  "building-2": <Building2 size={12} />,
  layers: <Layers size={12} />,
  droplet: <Droplet size={12} />,
  "trending-up": <TrendingUp size={12} />,
};

const imageMap: Record<string, string> = {
  "real-estate-holdings": "/services/institutional-investments.png",
  "iron-steel-operations": "/services/iron-steel-operations.png",
  "oil-gas-investments": "/services/oil-gas-investments.png",
  "forex-strategies": "/services/forex-strategies.png",
};

const getMetricIcon = (value: string, label: string) => {
  const lbl = label.toLowerCase();
  if (lbl.includes("yield") || lbl.includes("rate") || lbl.includes("growth")) {
    return <TrendingUp size={12} className="text-brand-alternate" />;
  }
  if (lbl.includes("exposure") || lbl.includes("integrity")) {
    return <ShieldCheck size={12} className="text-brand-alternate" />;
  }
  if (lbl.includes("value") || lbl.includes("portfolio")) {
    return <Briefcase size={12} className="text-brand-alternate" />;
  }
  return <Layers size={12} className="text-brand-alternate" />;
};

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onOpenConsultation }) => {
  return (
    <section className="bg-brand-bg-primary py-20 md:py-28 font-body">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative pb-12 lg:pb-[750px]">
        
        {/* Sticky Header Wrapper to align unlock boundaries */}
        <div className="relative lg:sticky lg:top-[130px] lg:z-30 lg:h-[1010px] bg-transparent pointer-events-none w-full">
          {/* Header Row Content */}
          <div className="relative pt-4 pb-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 bg-brand-bg-primary pointer-events-auto w-full">
            <div className="max-w-[650px]">
              <span className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-brand-alternate mb-4 block">
                Cooperations
              </span>
              <h2 className="font-heading text-3xl md:text-[40px] font-normal leading-[1.2] tracking-tight text-brand-primary text-balance">
                Strategic sectors where we direct capital and oversee operations.
              </h2>
            </div>
            <div className="max-w-[450px]">
              <p className="text-sm md:text-base text-brand-secondary leading-relaxed">
                We manage high-value direct investments and enterprises to generate sustainable, long-term yields.
              </p>
            </div>
          </div>
        </div>

        {/* Cards loop as direct siblings of Header Row inside max-width wrapper */}
        {cooperations.map((coop, index) => {
          const img = imageMap[coop.id] || "/services/wealth-management.png";
          return (
            <motion.div
              key={coop.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
              className={`relative lg:sticky lg:top-[340px] lg:h-[450px] bg-brand-bg-secondary border border-brand-border/40 rounded-[6px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 hover:shadow-[0px_8px_32px_rgba(0,0,0,0.03)] transition-shadow duration-300 mb-12 md:mb-16 lg:mb-[350px] last:mb-0 lg:last:mb-[350px] ${
                index === 0 ? "lg:-mt-[800px]" : ""
              }`}
              style={{
                zIndex: 10 + index,
              }}
            >
              {/* Left Column: Text Content and Badges */}
              <div className="lg:col-span-7 p-8 md:p-12 lg:p-14 flex flex-col justify-center min-h-[380px] lg:h-full">
                {/* Top Content Block */}
                <div className="space-y-4">
                  {/* Eyebrow Badge */}
                  <div className="bg-brand-bg-primary border border-brand-border/60 rounded-[2px] px-3.5 py-1 inline-flex items-center gap-1.5 text-[10px] font-semibold text-brand-secondary uppercase tracking-[0.15em] w-fit">
                    <span className="text-brand-alternate flex items-center justify-center">
                      {iconMap[coop.icon] || <Briefcase size={12} />}
                    </span>
                    <span>SECTOR {String(index + 1).padStart(2, "0")}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-2xl md:text-3xl font-normal text-brand-primary leading-tight">
                    {coop.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-sm md:text-base text-brand-secondary leading-relaxed max-w-xl text-balance">
                    {coop.description}
                  </p>
                </div>

                {/* Bottom Content Block */}
                <div className="mt-8 space-y-6">
                  {/* Metrics Badges Row */}
                  <div className="flex flex-wrap gap-2">
                    {coop.metrics?.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="bg-brand-bg-primary border border-brand-border/60 rounded-full px-4 py-1.5 inline-flex items-center gap-2 text-[11px] font-medium text-brand-primary shadow-sm"
                      >
                        {getMetricIcon(metric.value, metric.label)}
                        <span>
                          {metric.value} {metric.label}
                        </span>
                      </div>
                    ))}
                    {/* 3rd Standard Badge (Fiduciary Standard) */}
                    <div className="bg-brand-bg-primary border border-brand-border/60 rounded-full px-4 py-1.5 inline-flex items-center gap-2 text-[11px] font-medium text-brand-primary shadow-sm">
                      <ShieldCheck size={12} className="text-brand-alternate" />
                      <span>Fiduciary Standard</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant="primary"
                    onClick={onOpenConsultation}
                    className="w-full sm:w-auto font-medium rounded-none shadow-sm"
                  >
                    Schedule Consultation
                  </Button>
                </div>
              </div>

              {/* Right Column: Edge-to-Edge Image Container */}
              <div className="lg:col-span-5 relative w-full min-h-[280px] lg:h-full aspect-[4/3] lg:aspect-auto">
                <Image
                  src={img}
                  alt={coop.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-103"
                  priority={index === 0}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

ServicesGrid.displayName = "ServicesGrid";
