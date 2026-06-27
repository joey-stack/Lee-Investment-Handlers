"use client";

import React from "react";
import { motion } from "framer-motion";
import { processSteps } from "@/lib/content/process";
import { contactProcessCopy } from "@/lib/content/contact";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export const ContactProcessSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-secondary py-20 md:py-24 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-3 block">
            {contactProcessCopy.subtitle}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-tight text-brand-primary">
            {contactProcessCopy.title}
          </h2>
        </div>

        {/* 3-Column Timeline Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {processSteps.map((stepItem) => (
            <motion.div
              key={stepItem.step}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-brand-bg-primary border border-brand-border/60 rounded-[6px] p-6 md:p-8 flex flex-col justify-between shadow-[0px_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0px_8px_24px_rgba(10,10,10,0.04)] transition-all duration-300 min-h-[240px] relative"
            >
              <div>
                {/* Gold Timeline step counter */}
                <span className="text-brand-alternate font-heading text-4xl block mb-6 font-normal">
                  {stepItem.step}
                </span>

                {/* Title */}
                <h3 className="font-heading text-lg md:text-xl font-normal text-brand-primary mb-3">
                  {stepItem.title}
                </h3>

                {/* Description (Static to avoid body motion issues) */}
                <p className="font-body text-xs md:text-sm text-brand-secondary leading-relaxed">
                  {stepItem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

ContactProcessSection.displayName = "ContactProcessSection";
