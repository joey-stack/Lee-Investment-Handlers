"use client";

import React from "react";
import { motion } from "framer-motion";
import { careerValues } from "@/lib/content/careers";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardFadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export const WhyJoinUsSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-primary py-20 md:py-24 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <span className="text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-3 block">
            Our Culture & Values
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-tight text-brand-primary">
            Why Join LEE Investment Handlers
          </h2>
        </div>

        {/* 4-Column Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {careerValues.map((value, index) => (
            <motion.div
              key={value.title}
              variants={cardFadeUp}
              whileHover={{ y: -4 }}
              className="bg-brand-bg-primary border border-brand-border/60 rounded-[6px] p-6 md:p-8 flex flex-col justify-between shadow-[0px_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0px_8px_24px_rgba(10,10,10,0.04)] transition-all duration-300 min-h-[220px]"
            >
              <div>
                {/* Index / Number indicator */}
                <span className="text-brand-alternate/20 font-body font-semibold text-3xl md:text-4xl block mb-4">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                
                {/* Title */}
                <h3 className="font-heading text-lg md:text-xl font-normal text-brand-primary mb-3">
                  {value.title}
                </h3>
                
                {/* Description (No motion/animation tags inside) */}
                <p className="font-body text-xs md:text-sm text-brand-secondary leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

WhyJoinUsSection.displayName = "WhyJoinUsSection";
