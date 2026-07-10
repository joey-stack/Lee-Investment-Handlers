import React from "react";
import {
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Building2,
  Layers,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import { services } from "@/lib/content/services";

const iconMap: Record<string, React.ReactNode> = {
  briefcase: <Briefcase size={18} className="text-brand-alternate" />,
  "trending-up": <TrendingUp size={18} className="text-brand-alternate" />,
  "shield-check": <ShieldCheck size={18} className="text-brand-alternate" />,
  "building-2": <Building2 size={18} className="text-brand-alternate" />,
  layers: <Layers size={18} className="text-brand-alternate" />,
  shield: <Shield size={18} className="text-brand-alternate" />,
};

export const ManagementDisciplines: React.FC = () => {
  return (
    <section className="bg-brand-bg-secondary py-20 md:py-28 font-body border-t border-b border-brand-border/40">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Header Block */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-[650px]">
            <span className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-brand-alternate mb-4 block">
              Our Expertise
            </span>
            <h2 className="font-heading text-3xl md:text-[40px] font-normal leading-[1.2] tracking-tight text-brand-primary">
              Management Disciplines
            </h2>
          </div>
          <div className="max-w-[450px]">
            <p className="text-sm md:text-base text-brand-secondary leading-relaxed">
              The professional frameworks and rigorous oversight standards we apply to protect, structure, and grow wealth.
            </p>
          </div>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                className="bg-brand-bg-primary border border-brand-border/50 rounded-[6px] p-8 flex flex-col justify-between hover:shadow-[0px_8px_32px_rgba(10,10,10,0.03)] hover:-translate-y-1 transition-all duration-300 min-h-[320px]"
              >
                <div>
                  {/* Card Header: Icon & Index */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-brand-bg-secondary p-3 rounded-none inline-flex items-center justify-center">
                      {iconMap[service.icon] || <Briefcase size={18} />}
                    </div>
                    <span className="text-[10px] font-semibold text-brand-secondary/40 uppercase tracking-widest font-mono">
                      DISCIPLINE {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-normal text-brand-primary mb-3 leading-snug">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-xs md:text-sm text-brand-secondary leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Metrics Callout at Bottom (No Buttons) */}
                {service.metrics && service.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 border-t border-brand-border/40 pt-5 mt-auto">
                    {service.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="flex flex-col">
                        <span className="font-heading text-lg md:text-xl font-normal text-brand-primary leading-none mb-1">
                          {metric.value}
                        </span>
                        <span className="font-body text-[9px] md:text-[10px] text-brand-secondary/50 font-semibold uppercase tracking-wider leading-tight">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

ManagementDisciplines.displayName = "ManagementDisciplines";
