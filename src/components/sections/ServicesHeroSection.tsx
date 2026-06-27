"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { servicesPageHero } from "@/lib/content/services";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export const ServicesHeroSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-primary pt-32 pb-4 md:pt-36 md:pb-6">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="relative w-full min-h-[380px] md:min-h-[440px] flex items-center justify-center overflow-hidden rounded-none bg-brand-bg-alternate select-none border border-brand-border-dark/30 shadow-lg">
          {/* Background Cover Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/services/wealth-management.png"
              alt="Investment Services"
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center"
            />
            {/* Dark Vignette Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35 z-10" />
          </div>

          {/* Centered Content Container */}
          <div className="relative z-20 w-full px-6 py-12 md:py-16 flex flex-col items-center justify-center text-white text-center">
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
                <span>Our Services</span>
              </motion.div>

              {/* Headline (Didact Gothic) */}
              <motion.h1
                variants={itemVariants}
                className="font-heading text-3xl md:text-4xl lg:text-[48px] font-normal leading-[1.15] tracking-tight text-white mb-6 text-balance text-center"
              >
                {servicesPageHero.headline}
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={itemVariants}
                className="font-body text-sm md:text-base text-white/80 leading-relaxed max-w-2xl font-normal mx-auto mb-10 text-balance"
              >
                {servicesPageHero.subtext}
              </motion.p>

              {/* CTA Button */}
              <motion.div variants={itemVariants} className="w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-brand-alternate text-brand-primary font-body font-semibold text-sm px-8 py-4 hover:bg-brand-btn-hover transition-all duration-200 group rounded-none w-full sm:w-auto shadow-[0px_4px_12px_rgba(200,169,110,0.15)] hover:shadow-[0px_8px_24px_rgba(200,169,110,0.25)]"
                >
                  Schedule a Consultation
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

ServicesHeroSection.displayName = "ServicesHeroSection";
