"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { careerQualities } from "@/lib/content/careers";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export const WhatWeLookForSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-secondary py-20 md:py-24 border-b border-brand-border">
      <div className="max-w-[1248px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column — Title & Subtext */}
          <div className="lg:col-span-5">
            <span className="text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-3 block">
              Candidate Profile
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-tight text-brand-primary mb-6">
              What We Look For
            </h2>
            <p className="font-body text-xs md:text-sm text-brand-secondary leading-relaxed max-w-md">
              We look for people who are not only exceptional at what they do, but who also share our commitment to integrity, long-term thinking, and excellence. We believe that team alignment and shared principles are key to delivering the best results for our clients.
            </p>
          </div>

          {/* Right Column — Qualities List */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-7 space-y-4 md:space-y-6"
          >
            {careerQualities.map((quality) => (
              <motion.div
                key={quality}
                variants={fadeUp}
                className="bg-brand-bg-primary border border-brand-border/40 rounded-[6px] p-5 flex items-start gap-4 shadow-[0px_1px_4px_rgba(0,0,0,0.01)] hover:shadow-[0px_4px_12px_rgba(10,10,10,0.02)] transition-all duration-200"
              >
                {/* Gold Check Circle */}
                <div className="flex-shrink-0 h-6 w-6 rounded-[2px] bg-brand-alternate/10 flex items-center justify-center mt-0.5">
                  <Check size={14} className="text-brand-alternate" />
                </div>
                
                {/* Content */}
                <span className="font-body text-sm md:text-base font-medium text-brand-primary">
                  {quality}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

WhatWeLookForSection.displayName = "WhatWeLookForSection";
