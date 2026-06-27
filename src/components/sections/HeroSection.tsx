"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { heroContent } from "@/lib/content/hero";

interface HeroSectionProps {
  onOpenConsultation: () => void;
}

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
      ease: [0.25, 0.1, 0.25, 1] as const, // Cubic bezier easing
    },
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultation }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play workaround for browsers that block autoplay
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay blocked by browser. Showing video controls fallback or thumbnail.", err);
      });
    }
  }, []);

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0A0A0A] select-none">
      {/* 1. Fallback / Underlay Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={heroContent.fallbackImageUrl}
          alt="LEE Investment Handlers Hero Backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
      </div>

      {/* 2. Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        webkit-playsinline="true"
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 hidden sm:block"
        poster={heroContent.fallbackImageUrl}
      >
        <source src={heroContent.videoUrl} type="video/mp4" />
      </video>

      {/* 3. Dark Overlay Layer for Text Contrast */}
      <div className="absolute inset-0 bg-black/65 z-10" />

      {/* 4. Centered Hero Content Container */}
      <div className="relative z-20 w-full max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col items-center justify-center h-full text-white text-center pt-20 pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-4xl"
        >
          {/* Eyebrow Label */}
          <motion.p
            variants={itemVariants}
            className="text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-6"
          >
            {heroContent.eyebrow}
          </motion.p>

          {/* Headline Display Heading (Didact Gothic) */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[1.1] tracking-tight text-balance mb-6"
          >
            {heroContent.headline}
          </motion.h1>

          {/* Subtext Paragraph */}
          <motion.p
            variants={itemVariants}
            className="font-body text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed font-light text-balance"
          >
            {heroContent.subtext}
          </motion.p>

          {/* CTAs Buttons Group */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16"
          >
            <Button
              variant="primary"
              onClick={onOpenConsultation}
              className="w-full sm:w-auto font-medium shadow-[0px_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.25)] text-brand-primary rounded-none"
            >
              {heroContent.ctaPrimaryText}
            </Button>
            <Button
              variant="secondary"
              href="/services"
              className="w-full sm:w-auto text-white border-white hover:bg-white/10 rounded-none"
            >
              {heroContent.ctaSecondaryText}
            </Button>
          </motion.div>
        </motion.div>

        {/* Bottom Trust/Locations bar (Absolute position at bottom) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-8 sm:bottom-12 left-6 right-6 z-20 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/60 font-body font-medium"
        >
          <span className="hover:text-white transition-colors duration-300">Lagos, Nigeria</span>
          <span className="hidden sm:block w-[1px] h-3.5 bg-white/20" />
          <span className="hover:text-white transition-colors duration-300">Venice, Italy</span>
          <span className="hidden sm:block w-[1px] h-3.5 bg-white/20" />
          <span className="hover:text-white transition-colors duration-300">Capital Preservation</span>
        </motion.div>
      </div>
    </section>
  );
};

HeroSection.displayName = "HeroSection";
