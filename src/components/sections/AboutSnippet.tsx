import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { aboutSnippetContent } from "@/lib/content/about";

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
          <div className="lg:col-span-6 relative w-full aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px] overflow-hidden rounded-[6px] animate-scale-in-delay">
            {/* Meeting Photo */}
            <Image
              src={aboutSnippetContent.imageUrl}
              alt={aboutSnippetContent.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            {/* Overlaid Frosted Glass Marquee */}
            <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden w-full bg-black/40 backdrop-blur-md py-3 flex">
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
          </div>

          {/* Right Column — Copy & Commitment Cards */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2 text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-4 animate-fade-up">
              <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
              <span>About Us</span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-3xl md:text-[32px] font-normal leading-[1.2] tracking-tight text-white mb-6 text-balance animate-fade-up-delay-1">
              {aboutSnippetContent.headline}
            </h2>

            {/* Body Paragraph */}
            <p className="font-body text-base text-white/70 leading-relaxed mb-8 animate-fade-up-delay-2">
              {aboutSnippetContent.body}
            </p>

            {/* Checklist Commitment Cards */}
            <div className="grid grid-cols-1 gap-3 w-full mb-8 animate-fade-up-delay-4">
              {aboutSnippetContent.commitments.map((item) => (
                <div
                  key={item.title}
                  className="bg-white/5 border border-white/10 rounded-md p-3 md:p-3.5 flex items-center gap-4 animate-fade-up-delay-4"
                >
                  <span className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center bg-brand-alternate/10 text-brand-alternate">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <h4 className="font-body font-semibold text-sm md:text-base text-white">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="animate-fade-up-delay-3 w-full sm:w-auto">
              <Button
                variant="primary"
                href={aboutSnippetContent.ctaHref}
                className="w-full sm:w-auto font-medium shadow-[0px_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.25)] text-brand-primary"
              >
                {aboutSnippetContent.ctaText}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

AboutSnippet.displayName = "AboutSnippet";
