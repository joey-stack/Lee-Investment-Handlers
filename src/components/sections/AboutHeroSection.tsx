import React from "react";
import Image from "next/image";
import { aboutHeroContent } from "@/lib/content/about";

export const AboutHeroSection: React.FC = () => {
  return (
    <section className="bg-brand-bg-primary pt-32 pb-4 md:pt-36 md:pb-6">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="relative w-full min-h-[380px] md:min-h-[440px] flex items-center justify-center overflow-hidden rounded-none bg-brand-bg-alternate select-none border border-brand-border-dark/30 shadow-lg">
          {/* Background Cover Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/why-choose-meeting.png"
              alt="LEE Investment Handlers team consulting meeting"
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
            <div className="max-w-3xl flex flex-col items-center text-center mx-auto">
              {/* Eyebrow */}
              <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-6 animate-fade-up">
                <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
                <span>About the Firm</span>
              </div>

              {/* Heading */}
              <h1 className="font-heading text-3xl md:text-4xl lg:text-[48px] font-normal leading-[1.15] tracking-tight text-white mb-6 text-balance text-center animate-fade-up-delay-1">
                {aboutHeroContent.headline}
              </h1>

              {/* Subtext */}
              <p className="font-body text-sm md:text-base text-white/80 leading-relaxed max-w-2xl font-normal mx-auto text-balance animate-fade-up-delay-2">
                {aboutHeroContent.subtext}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AboutHeroSection.displayName = "AboutHeroSection";
