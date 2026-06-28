import React from "react";
import Image from "next/image";
import { riskFramework } from "@/lib/content/strategies";

export const RiskManagementFrameworkSection: React.FC = () => {
  return (
    <section className="relative bg-brand-bg-alternate text-white py-20 md:py-28 border-b border-brand-border-dark overflow-hidden select-none">

      {/* Subtle background texture image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="/why-choose-meeting.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column — Eyebrow, Headline, Description */}
          <div className="lg:col-span-4 flex flex-col items-start w-full">
            <div className="flex items-center gap-2 text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-6 animate-fade-up">
              <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
              <span>{riskFramework.eyebrow}</span>
            </div>

            <h2 className="font-heading text-3xl md:text-[34px] font-normal leading-[1.18] tracking-tight text-white mb-6 text-balance animate-fade-up-delay-1">
              {riskFramework.headline}
            </h2>

            <div className="w-10 h-[2px] bg-brand-alternate mb-6 animate-fade-up-delay-1" />

            <p className="font-body text-base text-white/70 leading-relaxed animate-fade-up-delay-2">
              {riskFramework.description}
            </p>
          </div>

          {/* Right Column — Numbered Risk Parameter Cards */}
          <div className="lg:col-span-8 flex flex-col gap-3 w-full">
            {riskFramework.items.map((item, index) => {
              const [title, desc] = item.split(":");
              return (
                <div
                  key={index}
                  className="border border-white/10 bg-white/[0.04] backdrop-blur-sm p-5 md:p-6 rounded-[6px] flex items-start gap-5 hover:border-brand-alternate/40 hover:bg-white/[0.08] transition-all duration-300 animate-fade-up-delay-4"
                >
                  <span className="font-body text-xs font-bold text-brand-alternate tracking-widest shrink-0 mt-0.5 w-6">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    {title && (
                      <h4 className="font-heading text-[15px] font-normal text-white mb-1 leading-tight">
                        {title}
                      </h4>
                    )}
                    {desc && (
                      <p className="font-body text-sm text-white/55 leading-relaxed">
                        {desc.trim()}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

RiskManagementFrameworkSection.displayName = "RiskManagementFrameworkSection";
