"use client";

import React from "react";
import { motion } from "framer-motion";

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
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const AboutStatsSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-primary py-20 md:py-28 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Large Decorative Header */}
        <div className="text-center mb-16 select-none">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-4xl md:text-[56px] text-brand-secondary/15 font-normal leading-none tracking-tight text-balance uppercase"
          >
            Strategic Focus, Global Impact
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Stat 1 — Warm Beige Card */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="bg-brand-bg-secondary border-t-[3px] border-t-brand-alternate border-x border-b border-brand-border/40 rounded-b-[6px] p-8 md:p-12 flex flex-col items-start text-left min-h-[220px] transition-all duration-300 shadow-[0px_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0px_8px_24px_rgba(10,10,10,0.04)]"
          >
            <span className="font-heading text-6xl md:text-7xl lg:text-8xl font-normal text-brand-primary tracking-tight leading-none mb-4">
              20+ Years
            </span>
            <span className="font-body text-xs font-semibold text-brand-alternate uppercase tracking-wider mb-2">
              Track Record
            </span>
            <p className="font-body text-sm md:text-base text-brand-secondary leading-relaxed max-w-sm">
              Of capital preservation, portfolio construction, and advisory experience.
            </p>
          </motion.div>

          {/* Stat 2 — Light Blue-Gray Card */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="bg-[#EDF1F5] border-t-[3px] border-t-brand-alternate border-x border-b border-slate-200 rounded-b-[6px] p-8 md:p-12 flex flex-col items-start text-left min-h-[220px] transition-all duration-300 shadow-[0px_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0px_8px_24px_rgba(10,10,10,0.04)]"
          >
            <span className="font-heading text-6xl md:text-7xl lg:text-8xl font-normal text-brand-primary tracking-tight leading-none mb-4">
              2 Hubs
            </span>
            <span className="font-body text-xs font-semibold text-[#3B4C66] uppercase tracking-wider mb-2">
              Global Footprint
            </span>
            <p className="font-body text-sm md:text-base text-brand-secondary leading-relaxed max-w-sm">
              Dual-hub operating perspective bridging Lagos and Venice markets.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

AboutStatsSection.displayName = "AboutStatsSection";

