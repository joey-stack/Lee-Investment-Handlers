"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { aboutSnippetContent } from "@/lib/content/about";

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

export const AboutSnippet: React.FC = () => {
  // Duplicate marquee items for seamless loop scrolling
  const doubleMarqueeItems = [
    ...aboutSnippetContent.marqueeItems,
    ...aboutSnippetContent.marqueeItems,
  ];

  return (
    <section className="bg-brand-bg-alternate py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column — Image with Overlaid Scrolling Marquee */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="lg:col-span-6 relative w-full aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px] overflow-hidden rounded-[6px]"
          >
            {/* Meeting Photo */}
            <Image
              src={aboutSnippetContent.imageUrl}
              alt={aboutSnippetContent.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            {/* Overlaid Frosted Glass Marquee */}
            <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden w-full bg-black/40 backdrop-blur-md border-t border-white/10 py-3 flex">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 18, repeat: Infinity }}
                className="flex whitespace-nowrap gap-8 shrink-0 pr-8"
              >
                {doubleMarqueeItems.map((item, index) => (
                  <span key={index} className="flex items-center gap-2 text-white text-xs md:text-sm font-body font-medium uppercase tracking-wider select-none">
                    <span className="text-brand-alternate font-bold">✦</span>
                    <span>{item}</span>
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column — Copy & Commitment Cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Eyebrow Label */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-4"
            >
              <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
              <span>About Us</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl md:text-[32px] font-normal leading-[1.2] tracking-tight text-white mb-6 text-balance"
            >
              {aboutSnippetContent.headline}
            </motion.h2>

            {/* Body Paragraph — Static to comply with "No Animation on Body Text" Rule */}
            <p className="font-body text-base text-white/70 leading-relaxed mb-8">
              {aboutSnippetContent.body}
            </p>

            {/* Checklist Commitment Cards */}
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 gap-3 w-full mb-8"
            >
              {aboutSnippetContent.commitments.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="bg-white/5 border border-white/10 rounded-md p-3 md:p-3.5 flex items-center gap-4"
                >
                  <span className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center bg-brand-alternate/10 text-brand-alternate">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <h4 className="font-body font-semibold text-sm md:text-base text-white">
                    {item.title}
                  </h4>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={fadeUp}>
              <Button
                variant="primary"
                href={aboutSnippetContent.ctaHref}
                className="w-full sm:w-auto font-medium shadow-[0px_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.25)] text-brand-primary"
              >
                {aboutSnippetContent.ctaText}
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

AboutSnippet.displayName = "AboutSnippet";
