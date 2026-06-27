"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, ShieldCheck, Sparkles } from "lucide-react";
import { aboutSnippetContent } from "@/lib/content/about";

const iconMap = [
  <ArrowUpRight key="arrow" size={20} />,
  <TrendingUp key="trending" size={20} />,
  <ShieldCheck key="shield" size={20} />,
  <Sparkles key="sparkles" size={20} />,
];

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

export const AboutCommitmentsSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-primary pt-20 pb-20 md:pt-28 md:pb-28 lg:pt-32 lg:pb-36 border-b border-brand-border">
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
              <span>Our Commitments</span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl md:text-[32px] font-normal leading-[1.2] tracking-tight text-brand-primary text-balance"
            >
              Unwavering Principles in Action
            </motion.h2>
          </motion.div>
        </div>

        {/* Commitments Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {aboutSnippetContent.commitments.map((item, index) => {
            // Apply asymmetric backgrounds matching the reference mockup
            let cardBg = "bg-brand-bg-secondary border border-brand-border/40 text-brand-primary";
            let iconContainerBg = "bg-brand-alternate/10 text-brand-alternate";
            let titleColor = "text-brand-primary";
            let descColor = "text-brand-secondary";

            if (index === 1) {
              // Light blue-gray card
              cardBg = "bg-[#EDF1F5] border border-slate-200 text-brand-primary";
              iconContainerBg = "bg-brand-primary/10 text-brand-primary";
            } else if (index === 2) {
              // Dark accent card
              cardBg = "bg-brand-bg-alternate border-0 text-white shadow-[0_12px_24px_rgba(0,0,0,0.15)]";
              iconContainerBg = "bg-brand-alternate/20 text-brand-alternate";
              titleColor = "text-white";
              descColor = "text-white/70";
            }

            // Determine desktop vertical offset class (concave wave shape)
            const offsetClass = index === 0 || index === 3 
              ? "lg:-translate-y-8 transition-transform duration-500" 
              : "lg:translate-y-8 transition-transform duration-500";

            return (
              <div key={item.title} className={`${offsetClass} w-full flex`}>
                <motion.div
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className={`rounded-[6px] p-6 md:p-8 flex flex-col items-start min-h-[260px] justify-between transition-all duration-300 w-full ${cardBg}`}
                >
                  <div className="flex flex-col items-start w-full">
                    {/* Card Icon */}
                    <span className={`h-10 w-10 rounded-[2px] flex items-center justify-center mb-8 ${iconContainerBg}`}>
                      {iconMap[index] || iconMap[0]}
                    </span>
                    
                    {/* Card content */}
                    <h3 className={`font-heading text-xl font-normal mb-3 ${titleColor}`}>
                      {item.title}
                    </h3>
                    <p className={`font-body text-sm leading-relaxed ${descColor}`}>
                      {item.description}
                    </p>
                  </div>

                  {/* Index marker */}
                  <span className={`font-body text-[10px] tracking-widest uppercase mt-6 block ${index === 2 ? "text-brand-alternate" : "text-brand-secondary/40"}`}>
                    ✦ {(index + 1).toString().padStart(2, "0")}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

AboutCommitmentsSection.displayName = "AboutCommitmentsSection";

