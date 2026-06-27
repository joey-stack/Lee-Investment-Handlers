"use client";

import React from "react";
import { motion } from "framer-motion";
import { performanceBars, performanceSummary } from "@/lib/content/performance";
import { stats } from "@/lib/content/stats";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const barVariant = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export const PerformancePreview: React.FC = () => {
  // Map our stats array and add a 4th metric to round out the 2x2 grid
  const statsList = [
    {
      value: stats[0]?.value || "20+",
      label: stats[0]?.label || "Years of Experience",
      desc: "Delivering disciplined asset management and capital growth.",
    },
    {
      value: stats[1]?.value || "2",
      label: stats[1]?.label || "Global Hubs",
      desc: "Operating seamlessly in major markets of Lagos & Venice.",
    },
    {
      value: "98%",
      label: "Client Retention Rate",
      desc: "Building multi-generational relationships based on trust.",
    },
    {
      value: stats[2]?.value || "4",
      label: stats[2]?.label || "Structured Strategies",
      desc: "Built across diversified, research-backed investment assets.",
    },
  ];

  return (
    <section className="bg-brand-bg-secondary py-20 md:py-28 font-body">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-brand-alternate mb-4"
          >
            Performance & Track Record
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl md:text-[40px] font-normal leading-[1.2] tracking-tight text-brand-primary max-w-xl mx-auto"
          >
            Consistent Growth, Year After Year
          </motion.h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-stretch">
          
          {/* Left Large Bento Card: Performance Chart (Spans 7 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="lg:col-span-7 bg-brand-bg-primary border border-brand-border/40 rounded-[6px] p-6 md:p-10 flex flex-col justify-between hover:shadow-[0px_8px_32px_rgba(0,0,0,0.03)] transition-all duration-300"
          >
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8 border-b border-brand-border/40 pb-6">
                <div>
                  <h3 className="font-heading text-xl font-normal text-brand-primary mb-1">
                    Annual Growth Rate
                  </h3>
                  <p className="text-xs text-brand-secondary">
                    Performance track record from 2021 to 2025
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="font-heading text-4xl md:text-5xl font-normal text-brand-alternate leading-none block">
                    {performanceSummary.average}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-brand-secondary font-medium mt-1 block">
                    {performanceSummary.label}
                  </span>
                </div>
              </div>

              {/* Bar Chart Stack */}
              <div className="space-y-5">
                {performanceBars.map((bar) => (
                  <div key={bar.year} className="flex items-center gap-4">
                    <span className="font-body text-xs md:text-sm text-brand-secondary w-10 shrink-0 font-medium">
                      {bar.year}
                    </span>
                    <div className="flex-1 h-8 bg-brand-bg-secondary rounded-[2px] overflow-hidden relative border border-brand-border/30">
                      <motion.div
                        variants={barVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="h-full bg-brand-alternate rounded-[2px] origin-left"
                        style={{ width: `${bar.value}%` }}
                      />
                    </div>
                    <span className="font-body text-xs md:text-sm text-brand-primary font-medium w-16 text-right shrink-0">
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="font-body text-[10px] text-brand-secondary/60 leading-relaxed mt-8 border-t border-brand-border/30 pt-4">
              {performanceSummary.disclaimer}
            </p>
          </motion.div>

          {/* Right Bento Cards: 2x2 Grid of Stats (Spans 5 columns) */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch"
          >
            {statsList.map((stat, idx) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="bg-brand-bg-primary border border-brand-border/40 rounded-[6px] p-6 flex flex-col justify-between hover:shadow-[0px_8px_24px_rgba(0,0,0,0.03)] transition-all duration-300 min-h-[180px]"
              >
                <div>
                  <span className="font-heading text-3xl md:text-4xl font-normal text-brand-alternate leading-none mb-3 block">
                    {stat.value}
                  </span>
                  <h4 className="font-heading text-sm md:text-base font-normal text-brand-primary mb-1">
                    {stat.label}
                  </h4>
                </div>
                <p className="font-body text-[11px] md:text-xs text-brand-secondary leading-relaxed mt-4">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

PerformancePreview.displayName = "PerformancePreview";
