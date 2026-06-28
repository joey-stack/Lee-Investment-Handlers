"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getPosts } from "@/services/blogService";
import { InsightArticle } from "@/types";
import { insights as staticInsights } from "@/lib/content/insights";
import { cn } from "@/lib/utils";

const categories = ["All", "Insights", "News"];

export const ArticlesGrid: React.FC = () => {
  const [articles, setArticles] = useState<InsightArticle[]>(staticInsights);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function loadLivePosts() {
      try {
        const data = await getPosts();
        setArticles(data);
      } catch (error) {
        console.error("Error loading articles in grid view:", error);
      }
    }
    loadLivePosts();
  }, []);

  // Filter articles based on activeCategory
  const filteredArticles = articles.filter((article) => {
    if (activeCategory === "All") return true;
    return article.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section className="bg-brand-bg-alternate py-20 md:py-24 border-b border-brand-border-dark/40">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Filters and Title Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-2 block animate-fade-up">
              Market Intelligence
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-normal tracking-tight text-white animate-fade-up-delay-1">
              All Research & Commentary
            </h2>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-2 border-b border-brand-border-dark/60 md:border-b-0 pb-3 md:pb-0 animate-fade-up-delay-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 text-xs md:text-sm font-body font-semibold tracking-wider uppercase transition-all duration-250 border-b-2 outline-none cursor-pointer",
                    isActive
                      ? "border-brand-alternate text-brand-alternate"
                      : "border-transparent text-zinc-400 hover:text-white"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up-delay-4">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article) => (
              <motion.div
                layout
                key={article.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="bg-[#0E0E0E] border border-zinc-900/60 rounded-[6px] overflow-hidden flex flex-col justify-between hover:border-zinc-800/80 hover:shadow-[0px_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 min-h-[380px] group hover:-translate-y-1.5"
              >
                {/* Cover Image Wrapper */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#161616] select-none">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 30vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Content Card Body */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Title */}
                    <h3 className="font-heading text-base md:text-lg font-normal leading-snug text-white mb-6 hover:text-brand-alternate transition-colors duration-250">
                      <Link href={`/insights/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                  </div>

                  {/* Bottom Row - Date & Arrow link */}
                  <div className="border-t border-zinc-900/80 pt-4 flex items-center justify-between">
                    <span className="text-zinc-500 text-xs font-medium font-body">
                      {article.date}
                    </span>
                    <Link
                      href={`/insights/${article.slug}`}
                      className="h-8 w-8 inline-flex items-center justify-center bg-zinc-950 border border-zinc-900 rounded-[2px] text-zinc-400 hover:bg-brand-alternate hover:text-brand-primary hover:border-transparent transition-all duration-300"
                    >
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

ArticlesGrid.displayName = "ArticlesGrid";
