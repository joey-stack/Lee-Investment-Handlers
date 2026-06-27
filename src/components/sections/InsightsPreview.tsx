"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { insights } from "@/lib/content/insights";

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

export const InsightsPreview: React.FC = () => {
  return (
    <section className="bg-brand-bg-primary py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div className="max-w-[650px]">
            {/* Eyebrow Label */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 text-brand-alternate mb-4 uppercase tracking-[0.2em] font-body text-xs md:text-sm font-semibold"
            >
              <span className="w-1.5 h-1.5 bg-brand-alternate shrink-0" />
              Blog
            </motion.div>
            
            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              className="font-heading text-4xl md:text-[56px] font-normal leading-[1.1] tracking-tight text-brand-primary mb-4"
            >
              News & Insights
            </motion.h2>
            
            {/* Sub-heading */}
            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg text-brand-secondary leading-relaxed"
            >
              Fresh thinking and real-world advice to help you scale smarter, faster, and with more clarity
            </motion.p>
          </div>

          {/* Right Action Button */}
          <motion.div variants={fadeUp} className="shrink-0">
            <Button
              variant="secondary"
              href="/insights"
              className="rounded-[6px] border border-brand-primary hover:border-brand-primary text-brand-primary hover:bg-brand-primary/5 px-6 h-[44px] text-sm font-medium"
            >
              View Blog
            </Button>
          </motion.div>
        </motion.div>

        {/* Article Cards Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {insights.map((article) => (
            <Link
              href={`/insights/${article.slug}`}
              key={article.id}
              className="group flex flex-col h-full"
            >
              <motion.article
                variants={fadeUp}
                className="bg-brand-bg-secondary rounded-[6px] overflow-hidden flex flex-col h-full hover:shadow-[0px_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 border border-transparent hover:border-brand-border/40"
              >
                {/* Image Header */}
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-[6px]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    priority={article.featured}
                  />
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="font-heading text-xl md:text-[22px] font-normal text-brand-primary mb-3 leading-snug group-hover:text-brand-alternate transition-colors duration-250">
                    {article.title}
                  </h3>

                  <p className="font-body text-sm text-brand-secondary leading-relaxed mb-6 flex-1">
                    {article.excerpt}
                  </p>

                  {/* Metadata Footer */}
                  <div className="mt-auto flex items-center justify-between text-xs tracking-wider uppercase font-body font-medium text-brand-secondary/80 pt-6 border-t border-brand-border/40">
                    <div className="flex items-center gap-2">
                      {/* Gold Square Bullet */}
                      <span className="w-1.5 h-1.5 bg-brand-alternate shrink-0" />
                      <span>{article.category}</span>
                    </div>
                    <div>
                      {article.date.toUpperCase()}
                    </div>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

InsightsPreview.displayName = "InsightsPreview";
