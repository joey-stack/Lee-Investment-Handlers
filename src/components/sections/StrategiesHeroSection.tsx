"use client";

import React from "react";
import { motion } from "framer-motion";
import { strategiesPageHero } from "@/lib/content/strategies";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export const StrategiesHeroSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-secondary pt-32 pb-20 md:pt-40 md:pb-28 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl flex flex-col items-center text-center mx-auto"
        >
          {/* Eyebrow */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-6"
          >
            <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
            <span>Investment Approach</span>
          </motion.div>

          {/* Heading (Didact Gothic) */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.1] tracking-tight text-brand-primary mb-6 text-balance text-center"
          >
            {strategiesPageHero.headline}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="font-body text-base md:text-lg text-brand-secondary leading-relaxed max-w-2xl font-normal mx-auto text-balance"
          >
            {strategiesPageHero.subtext}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

StrategiesHeroSection.displayName = "StrategiesHeroSection";
