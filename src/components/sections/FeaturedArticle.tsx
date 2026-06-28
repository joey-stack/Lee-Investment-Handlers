import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { insights } from "@/lib/content/insights";

export const FeaturedArticle: React.FC = () => {
  // Find featured article
  const featured = insights.find((item) => item.featured) || insights[0];

  if (!featured) return null;

  return (
    <section className="bg-brand-bg-primary py-20 md:py-24 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Section Title */}
        <div className="mb-12">
          <span className="text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-2 block animate-fade-up">
            Featured Article
          </span>
        </div>

        {/* Large Featured Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column — Image */}
          <div className="lg:col-span-6 relative w-full aspect-[16/10] lg:aspect-auto lg:h-[400px] overflow-hidden rounded-[6px] border border-brand-border/40 shadow-sm animate-scale-in">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Right Column — Narrative text */}
          <div className="lg:col-span-6 flex flex-col items-start animate-fade-up-delay-2">
            {/* Meta Tags */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-brand-alternate/15 text-brand-primary text-xs font-semibold px-2.5 py-1 rounded-[2px] uppercase tracking-wider">
                {featured.category}
              </span>
              <span className="text-brand-secondary/60 text-xs font-medium font-body">
                {featured.date}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-heading text-2xl md:text-3xl font-normal leading-[1.2] tracking-tight text-brand-primary mb-4 text-balance hover:text-brand-alternate transition-colors duration-250">
              <Link href={`/insights/${featured.slug}`}>
                {featured.title}
              </Link>
            </h2>

            {/* Excerpt */}
            <p className="font-body text-sm md:text-base text-brand-secondary leading-relaxed mb-6">
              {featured.excerpt}
            </p>

            {/* Read Link */}
            <Link
              href={`/insights/${featured.slug}`}
              className="group inline-flex items-center gap-2 text-brand-alternate hover:text-brand-primary font-medium text-sm transition-colors duration-250"
            >
              <span>Read Full Article</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-250 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

FeaturedArticle.displayName = "FeaturedArticle";
