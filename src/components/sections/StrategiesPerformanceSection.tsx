"use client";

import React from "react";
import { motion } from "framer-motion";
import { performanceBars, performanceSummary } from "@/lib/content/performance";

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
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const barVariant = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export const StrategiesPerformanceSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-primary py-20 md:py-28 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left — Header + Stat */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="flex items-center gap-2 text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-4">
              <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
              <span>Historical Returns</span>
            </div>

            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl md:text-[32px] font-normal leading-[1.2] tracking-tight text-brand-primary mb-6"
            >
              Consistent Growth, Year After Year
            </motion.h2>

            <motion.div variants={fadeUp} className="mb-6">
              <span className="font-heading text-5xl md:text-6xl font-normal text-brand-alternate leading-none">
                {performanceSummary.average}
              </span>
              <p className="font-body text-base text-brand-secondary mt-2">
                {performanceSummary.label}
              </p>
            </motion.div>

            <p className="font-body text-xs text-brand-secondary/60 leading-relaxed max-w-md">
              {performanceSummary.disclaimer}
            </p>
          </motion.div>

          {/* Right — Bar Chart */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-5"
          >
            {performanceBars.map((bar) => (
              <motion.div
                key={bar.year}
                variants={fadeUp}
                className="flex items-center gap-4"
              >
                <span className="font-body text-sm text-brand-secondary w-12 shrink-0 font-medium">
                  {bar.year}
                </span>
                <div className="flex-1 h-10 bg-brand-bg-secondary rounded-[2px] overflow-hidden border border-brand-border/40 relative">
                  <motion.div
                    variants={barVariant}
                    className="h-full bg-brand-alternate rounded-[2px] origin-left"
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
                <span className="font-body text-sm text-brand-primary font-medium w-16 text-right shrink-0">
                  {bar.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

StrategiesPerformanceSection.displayName = "StrategiesPerformanceSection";
