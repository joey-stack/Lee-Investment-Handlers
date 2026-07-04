"use client";

import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { marqueeItems } from "@/lib/content/marquee";

interface IconRendererProps {
  iconName: string;
  className?: string;
}

// Type-safe lookup of Lucide icons to adhere strictly to the "No any types" rule
const IconRenderer: React.FC<IconRendererProps> = ({ iconName, className }) => {
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as 
    | React.ComponentType<React.ComponentProps<"svg">>
    | undefined;

  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

export const IndustriesMarquee: React.FC = () => {
  // Repeat items 4 times to ensure seamless infinite looping on wider displays.
  // Animating to -25% scrolls exactly one full iteration width (1/4 of total),
  // creating a perfect, visually uninterrupted loop.
  const repeatedItems = [
    ...marqueeItems,
    ...marqueeItems,
    ...marqueeItems,
    ...marqueeItems,
  ];

  return (
    <section className="bg-brand-bg-primary py-8 md:py-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="relative w-full overflow-hidden bg-brand-bg-alternate rounded-[6px] py-6 md:py-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] select-none">
          <div className="flex w-full overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-25%"] }}
              transition={{
                ease: "linear",
                duration: 25,
                repeat: Infinity,
              }}
              className="flex whitespace-nowrap gap-16 md:gap-24 shrink-0"
            >
              {repeatedItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-center gap-4 shrink-0"
                >
                  {/* Gold/Yellow Badge */}
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-[4px] bg-brand-alternate text-[#0A0A0A] flex items-center justify-center transition-transform duration-300 hover:scale-105">
                    <IconRenderer iconName={item.iconName} className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  {/* Text Label */}
                  <span className="font-body font-medium text-lg md:text-xl text-white uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

IndustriesMarquee.displayName = "IndustriesMarquee";
