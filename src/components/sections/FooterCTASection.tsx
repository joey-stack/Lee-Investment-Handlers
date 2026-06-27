"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface FooterCTASectionProps {
  onOpenConsultation: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
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

export const FooterCTASection: React.FC<FooterCTASectionProps> = ({ onOpenConsultation }) => {
  return (
    <section className="relative bg-[#0A0A0A] border-t border-brand-border-dark overflow-hidden py-24 md:py-32 font-body text-white text-center select-none">
      
      {/* Premium subtle glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,110,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />
      
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col items-center justify-center">
        
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center max-w-2xl"
        >
          {/* Eyebrow Label */}
          <motion.p
            variants={fadeUp}
            className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-brand-alternate mb-6"
          >
            Ready to Take the First Step?
          </motion.p>

          {/* Headline Display Heading (Didact Gothic) */}
          <motion.h2
            variants={fadeUp}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-white mb-6 text-balance"
          >
            Manage Wealth. Build a Legacy.
          </motion.h2>

          {/* Subtext Paragraph */}
          <motion.p
            variants={fadeUp}
            className="font-body text-sm md:text-base text-white/70 max-w-lg mb-10 leading-relaxed font-light text-balance"
          >
            Partner with us to protect and grow your wealth across generations. Request a private session with our investment committee.
          </motion.p>

          {/* Primary CTA Button */}
          <motion.div variants={fadeUp} className="w-full sm:w-auto">
            <Button
              variant="primary"
              onClick={onOpenConsultation}
              className="w-full sm:w-auto font-medium shadow-[0px_4px_12px_rgba(200,169,110,0.15)] hover:shadow-[0px_8px_24px_rgba(200,169,110,0.25)] text-brand-primary rounded-none px-10 py-4 text-sm"
            >
              Schedule a Consultation
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

FooterCTASection.displayName = "FooterCTASection";
