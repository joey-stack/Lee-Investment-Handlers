"use client";

import React from "react";
import { motion } from "framer-motion";
import { ourStoryContent } from "@/lib/content/about";

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

export const OurStorySection: React.FC = () => {
  return (
    <section className="bg-brand-bg-primary py-20 md:py-28 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl mx-auto flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-6"
          >
            <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
            <span>{ourStoryContent.eyebrow}</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl md:text-4xl lg:text-[40px] font-normal leading-[1.2] tracking-tight text-brand-primary mb-8 text-balance"
          >
            {ourStoryContent.headline}
          </motion.h2>

          {/* Paragraphs — Static to comply with "No Animation on Body Text" Rule */}
          <div className="font-body text-base md:text-lg text-brand-secondary leading-relaxed max-w-2xl mx-auto">
            <p>{ourStoryContent.paragraphs.join(" ")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

OurStorySection.displayName = "OurStorySection";

