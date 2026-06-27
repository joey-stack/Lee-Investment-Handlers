"use client";

import React from "react";
import { motion } from "framer-motion";
import { missionVisionContent } from "@/lib/content/about";

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

export const MissionVisionSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-secondary py-20 md:py-28 border-b border-brand-border">
      <div className="max-w-[1248px] mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-4"
            >
              <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
              <span>{missionVisionContent.eyebrow}</span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl md:text-[32px] font-normal leading-[1.2] tracking-tight text-brand-primary text-balance"
            >
              {missionVisionContent.headline}
            </motion.h2>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Mission Card */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="bg-brand-bg-primary border border-brand-border/60 rounded-[6px] p-8 md:p-10 flex flex-col items-start shadow-[0px_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0px_8px_24px_rgba(10,10,10,0.04)] transition-all duration-300"
          >
            {/* Accent Border Indicator */}
            <div className="h-1.5 w-12 bg-brand-alternate mb-8" />
            <h3 className="font-heading text-2xl font-normal text-brand-primary mb-4">
              {missionVisionContent.mission.title}
            </h3>
            <p className="font-body text-base text-brand-secondary leading-relaxed">
              {missionVisionContent.mission.description}
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="bg-brand-bg-primary border border-brand-border/60 rounded-[6px] p-8 md:p-10 flex flex-col items-start shadow-[0px_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0px_8px_24px_rgba(10,10,10,0.04)] transition-all duration-300"
          >
            {/* Accent Border Indicator */}
            <div className="h-1.5 w-12 bg-brand-alternate mb-8" />
            <h3 className="font-heading text-2xl font-normal text-brand-primary mb-4">
              {missionVisionContent.vision.title}
            </h3>
            <p className="font-body text-base text-brand-secondary leading-relaxed">
              {missionVisionContent.vision.description}
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

MissionVisionSection.displayName = "MissionVisionSection";
