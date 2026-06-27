"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Users, MessageSquare, Lock } from "lucide-react";

interface WhyChooseItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const items: WhyChooseItem[] = [
  {
    icon: <Target size={24} />,
    title: "Strategic Investment Approach",
    description:
      "Every decision is grounded in thorough research, data-driven analysis, and a long-term perspective — never short-term speculation.",
  },
  {
    icon: <Users size={24} />,
    title: "Client-Centered Service",
    description:
      "Your goals drive everything we do. We build strategies around your life, not a one-size-fits-all model.",
  },
  {
    icon: <MessageSquare size={24} />,
    title: "Transparent Communication",
    description:
      "No surprises, no jargon. You'll always know how your investments are performing — and why we're making the decisions we make.",
  },
  {
    icon: <Lock size={24} />,
    title: "Security & Compliance",
    description:
      "Your assets are held with institutional-grade custodians. We operate under strict regulatory oversight and robust compliance frameworks.",
  },
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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="bg-brand-bg-primary py-20 md:py-28 font-body">
      <div className="max-w-[1248px] mx-auto px-4 md:px-6">
        
        {/* Header Row (Flex on desktop) */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
        >
          <div className="max-w-[650px]">
            {/* Eyebrow Label */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-brand-alternate mb-4"
            >
              <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
              <span>Why Choose Us</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl md:text-[40px] font-normal leading-[1.2] tracking-tight text-brand-primary"
            >
              Experience. Discipline. Results.
            </motion.h2>
          </div>

          <motion.div variants={fadeUp} className="max-w-[450px]">
            <p className="text-sm md:text-base text-brand-secondary leading-relaxed">
              What separates LEE Investment Handlers from the rest isn't just what we do — it's how we do it. Here is what you can expect when you partner with us.
            </p>
          </motion.div>
        </motion.div>

        {/* 4-Column Horizontal Cards Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="bg-brand-bg-secondary border border-brand-border/40 rounded-[6px] p-6 md:p-8 flex flex-col justify-between hover:shadow-[0px_8px_24px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 min-h-[250px]"
            >
              <div className="flex flex-col gap-5">
                {/* Top Row: Index and Icon */}
                <div className="flex justify-between items-center w-full">
                  <span className="font-body text-xs font-semibold text-brand-alternate tracking-widest">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="h-8 w-8 flex items-center justify-center rounded-md bg-white border border-brand-border/30 text-brand-alternate shadow-sm">
                    {item.icon}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="font-heading text-lg font-normal text-brand-primary leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <p className="font-body text-xs md:text-sm text-brand-secondary leading-relaxed mt-4">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

WhyChooseUs.displayName = "WhyChooseUs";
