"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Percent, Layers, Building2, Globe } from "lucide-react";
import { strategyBreakdownContent } from "@/lib/content/strategies";

const iconMap: Record<string, React.ReactNode> = {
  "trending-up": <TrendingUp size={20} />,
  percent: <Percent size={20} />,
  layers: <Layers size={20} />,
  "building-2": <Building2 size={20} />,
  globe: <Globe size={20} />,
};

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
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export const StrategyBreakdownSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-primary py-20 md:py-28 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">

        {/* Section Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-14"
        >
          <div className="flex flex-col items-start">
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 text-xs font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-5"
            >
              <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
              <span>{strategyBreakdownContent.eyebrow}</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl md:text-[36px] font-normal leading-[1.15] tracking-tight text-brand-primary text-balance"
            >
              {strategyBreakdownContent.headline}
            </motion.h2>
          </div>

          <motion.p variants={fadeUp} className="font-body text-base text-brand-secondary leading-relaxed">
            {strategyBreakdownContent.description}
          </motion.p>
        </motion.div>

        {/* Strategy Cards Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {strategyBreakdownContent.items.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              className="bg-brand-bg-secondary border border-brand-border/60 rounded-[6px] p-8 flex flex-col gap-5 hover:border-brand-alternate/30 hover:shadow-[0_8px_32px_rgba(10,10,10,0.05)] transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="h-11 w-11 flex items-center justify-center rounded-[2px] bg-brand-alternate/10 text-brand-alternate group-hover:bg-brand-alternate/20 transition-colors duration-300">
                {iconMap[item.iconName] || <TrendingUp size={20} />}
              </div>

              <div>
                <h3 className="font-heading text-lg font-normal text-brand-primary mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-brand-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

StrategyBreakdownSection.displayName = "StrategyBreakdownSection";
