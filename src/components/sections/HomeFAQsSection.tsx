"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/content/faqs";

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

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border border-brand-border/40 bg-brand-bg-secondary rounded-[6px] overflow-hidden mb-4 transition-all duration-300 hover:border-brand-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left p-5 md:p-6 font-body font-semibold text-brand-primary text-sm md:text-base cursor-pointer select-none outline-none group"
      >
        <span className="group-hover:text-brand-alternate transition-colors duration-250 pr-4">
          {question}
        </span>
        <span
          className={`shrink-0 flex items-center justify-center h-6 w-6 rounded-full border border-brand-border bg-white text-brand-secondary transition-transform duration-300 ${
            isOpen ? "rotate-180 text-brand-alternate border-brand-alternate/40" : ""
          }`}
        >
          <ChevronDown size={14} />
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 md:px-6 md:pb-6 font-body text-xs md:text-sm text-brand-secondary leading-relaxed border-t border-brand-border/20 pt-4 bg-white">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const HomeFAQsSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-brand-bg-primary py-20 md:py-28 font-body">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading and info */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28"
          >
            {/* Eyebrow Label */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-brand-alternate mb-4"
            >
              <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
              <span>FAQ</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl md:text-[40px] font-normal leading-[1.2] tracking-tight text-brand-primary mb-6"
            >
              Got Questions? We Have Answers.
            </motion.h2>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              className="font-body text-sm md:text-base text-brand-secondary leading-relaxed max-w-sm"
            >
              If you have any other questions regarding our investment process, fees, or custom services, please do not hesitate to contact our advisory team.
            </motion.p>
          </motion.div>

          {/* Right Column: Accordions list */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-7 w-full"
          >
            {faqs.map((faq) => (
              <FAQItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openId === faq.id}
                onToggle={() => toggleFAQ(faq.id)}
              />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

HomeFAQsSection.displayName = "HomeFAQsSection";
