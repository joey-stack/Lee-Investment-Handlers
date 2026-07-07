"use client";

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getApprovedReviews } from "@/services/reviewService";
import { Testimonial } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const ratingFilters = ["All", "5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"];

interface ReviewsGridProps {
  onOpenReviewModal: () => void;
}

export const ReviewsGrid: React.FC<ReviewsGridProps> = ({ onOpenReviewModal }) => {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await getApprovedReviews();
        setReviews(data);
      } catch (err) {
        console.error("Failed to load reviews:", err);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  const filteredReviews = reviews.filter((review) => {
    if (activeFilter === "All") return true;
    const starCount = parseInt(activeFilter.charAt(0));
    return review.rating === starCount;
  });

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "—";

  return (
    <section className="bg-brand-bg-alternate py-20 md:py-24 border-b border-brand-border-dark/40">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">

        {/* Top Row — Title + Stats + CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <span className="text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-2 block animate-fade-up">
              Client Perspectives
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-normal tracking-tight text-white animate-fade-up-delay-1">
              All Client Reviews
            </h2>

            {/* Aggregate stats row */}
            {!loading && reviews.length > 0 && (
              <div className="flex items-center gap-4 mt-4 animate-fade-up-delay-2">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={16}
                      className="text-brand-alternate fill-brand-alternate"
                    />
                  ))}
                </div>
                <span className="text-white font-heading text-xl font-normal">{averageRating}</span>
                <span className="text-zinc-400 text-sm font-body">
                  — Based on {reviews.length} verified {reviews.length === 1 ? "review" : "reviews"}
                </span>
              </div>
            )}
          </div>

          {/* Write a Review CTA */}
          <Button
            variant="primary"
            onClick={onOpenReviewModal}
            className="flex items-center gap-2 h-12 font-medium shrink-0 animate-fade-up-delay-2"
          >
            <Star size={15} />
            <span>Write a Review</span>
          </Button>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 flex-wrap border-b border-brand-border-dark/60 pb-3 mb-10 animate-fade-up-delay-2">
          {ratingFilters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-2 text-xs md:text-sm font-body font-semibold tracking-wider uppercase transition-all duration-250 border-b-2 outline-none cursor-pointer",
                  isActive
                    ? "border-brand-alternate text-brand-alternate"
                    : "border-transparent text-zinc-400 hover:text-white"
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="py-24 text-center flex flex-col items-center justify-center">
            <div className="h-8 w-8 border-2 border-brand-alternate/20 border-t-brand-alternate rounded-full animate-spin mb-4" />
            <span className="text-xs text-zinc-500 tracking-widest uppercase">Loading reviews...</span>
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredReviews.length === 0 && (
          <div className="py-24 text-center">
            <Star className="mx-auto text-zinc-700 mb-4" size={40} strokeWidth={1.5} />
            <h3 className="font-heading text-lg font-normal text-white mb-2">
              {activeFilter === "All" ? "No reviews yet" : `No ${activeFilter} reviews`}
            </h3>
            <p className="font-body text-sm text-zinc-400 font-light max-w-sm mx-auto leading-relaxed">
              {activeFilter === "All"
                ? "Be the first to share your experience with LEE Investment Handlers."
                : "Try selecting a different star rating filter above."}
            </p>
            {activeFilter === "All" && (
              <button
                onClick={onOpenReviewModal}
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-alternate hover:text-white transition-colors cursor-pointer"
              >
                <Star size={13} className="fill-brand-alternate" />
                Write the First Review
              </button>
            )}
          </div>
        )}

        {/* Reviews Grid */}
        {!loading && filteredReviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-up-delay-4">
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((review) => (
                <motion.blockquote
                  layout
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="bg-[#0E0E0E] border border-zinc-900/60 rounded-[6px] p-6 md:p-8 flex flex-col justify-between hover:border-zinc-800/80 hover:shadow-[0px_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 min-h-[260px] hover:-translate-y-1"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={14} className="text-brand-alternate fill-brand-alternate" />
                      ))}
                      {Array.from({ length: 5 - review.rating }).map((_, i) => (
                        <Star key={i} size={14} className="text-zinc-700" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="font-body text-sm md:text-base text-zinc-200 leading-relaxed italic">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </div>

                  {/* Attribution */}
                  <footer className="border-t border-zinc-900 pt-4 mt-6">
                    <p className="font-body text-sm font-semibold text-white">
                      {review.attribution}
                    </p>
                  </footer>
                </motion.blockquote>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};

ReviewsGrid.displayName = "ReviewsGrid";
