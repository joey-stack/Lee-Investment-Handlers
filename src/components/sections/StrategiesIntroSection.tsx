"use client";

import React from "react";
import { motion } from "framer-motion";
import { strategiesIntro } from "@/lib/content/strategies";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const StrategiesIntroSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-secondary py-20 md:py-28 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">

        {/* Top eyebrow — centered */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center justify-center gap-2 text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-8"
        >
          <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
          <span>{strategiesIntro.eyebrow}</span>
        </motion.div>

        {/* Two-column: Large headline left, body text right */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end"
        >
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.12] tracking-tight text-brand-primary text-balance"
          >
            {strategiesIntro.headline}
          </motion.h2>

          <div className="flex flex-col justify-end">
            <p className="font-body text-base md:text-lg text-brand-secondary leading-relaxed">
              {strategiesIntro.body}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

StrategiesIntroSection.displayName = "StrategiesIntroSection";
