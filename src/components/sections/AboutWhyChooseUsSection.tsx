"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { aboutWhyChooseUsContent } from "@/lib/content/about";

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

export const AboutWhyChooseUsSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-primary py-20 md:py-28 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Dark Banner Header Block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="bg-brand-bg-alternate text-white rounded-[6px] p-8 md:p-12 mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-4">
              <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
              <span>{aboutWhyChooseUsContent.eyebrow}</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-normal leading-[1.2] tracking-tight text-white text-balance">
              {aboutWhyChooseUsContent.headline}
            </h2>
          </div>
          <p className="font-body text-base text-white/70 leading-relaxed max-w-sm lg:mb-1">
            {aboutWhyChooseUsContent.description}
          </p>
        </motion.div>

        {/* Differentiators Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {aboutWhyChooseUsContent.items.map((item) => (
            <motion.div
              key={item.number}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="bg-brand-bg-secondary border border-brand-border/40 rounded-[6px] p-6 md:p-8 flex flex-col justify-between shadow-[0px_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0px_8px_24px_rgba(10,10,10,0.04)] transition-all duration-300 min-h-[220px]"
            >
              <div>
                {/* Header Icon + Number Row */}
                <div className="flex items-center justify-between mb-4 w-full">
                  <span className="h-6 w-6 rounded-[2px] bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="font-body text-[10px] font-semibold text-brand-secondary/40 tracking-wider">
                    ✦ {item.number}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="font-heading text-lg font-normal text-brand-primary mb-3">
                  {item.title}
                </h3>
                {/* Description */}
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

AboutWhyChooseUsSection.displayName = "AboutWhyChooseUsSection";

