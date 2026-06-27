"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, PieChart, Target, BarChart2 } from "lucide-react";
import { pillars } from "@/lib/content/pillars";
import { aboutPillarsContent } from "@/lib/content/about";

const iconMap: Record<string, React.ReactNode> = {
  search: <Search size={24} />,
  "pie-chart": <PieChart size={24} />,
  target: <Target size={24} />,
  "bar-chart-2": <BarChart2 size={24} />,
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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const AboutPillarsSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-primary py-20 md:py-28 border-b border-brand-border">
      <div className="max-w-[1248px] mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-start"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-4"
            >
              <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
              <span>{aboutPillarsContent.eyebrow}</span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl md:text-[32px] font-normal leading-[1.2] tracking-tight text-brand-primary mb-4 text-balance"
            >
              {aboutPillarsContent.headline}
            </motion.h2>

            <p className="font-body text-base text-brand-secondary leading-relaxed">
              {aboutPillarsContent.description}
            </p>
          </motion.div>
        </div>

        {/* Pillars Bento Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
        >
          {pillars.map((pillar, index) => {
            const isWide = index === 0 || index === 3;
            const isHighlighted = index === 3; // Highlight Performance card in gold
            const colSpanClass = isWide ? "md:col-span-7" : "md:col-span-5";

            return (
              <motion.div
                key={pillar.id}
                variants={fadeUp}
                className={`border p-6 md:p-8 rounded-[6px] transition-all duration-300 flex flex-col justify-between min-h-[260px] ${colSpanClass} ${
                  isHighlighted
                    ? "bg-brand-alternate border-brand-alternate text-brand-primary shadow-[0_4px_24px_rgba(200,169,110,0.15)]"
                    : "bg-brand-bg-secondary border-brand-border/40 text-brand-primary hover:border-brand-alternate/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
                }`}
              >
                <div>
                  {/* Icon Badge */}
                  <div className={`h-10 w-10 flex items-center justify-center rounded-md mb-6 ${
                    isHighlighted 
                      ? "bg-brand-primary/10 text-brand-primary" 
                      : "bg-brand-alternate/10 text-brand-alternate"
                  }`}>
                    {iconMap[pillar.icon || ""] || <Target size={24} />}
                  </div>
                  {/* Title */}
                  <h3 className="font-heading text-xl font-normal mb-3 text-brand-primary">
                    {pillar.title}
                  </h3>
                  {/* Body Copy */}
                  <p className={`font-body text-sm leading-relaxed ${
                    isHighlighted ? "text-brand-primary/80 font-medium" : "text-brand-secondary"
                  }`}>
                    {pillar.body}
                  </p>
                </div>
                {/* Numeric Index */}
                <span className={`font-body text-xs tracking-wider uppercase mt-6 block self-end ${
                  isHighlighted ? "text-brand-primary/40 font-semibold" : "text-brand-alternate"
                }`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

AboutPillarsSection.displayName = "AboutPillarsSection";
