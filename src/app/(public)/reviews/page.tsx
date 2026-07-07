"use client";

import React, { useState } from "react";
import { ReviewsHeroSection } from "@/components/sections/ReviewsHeroSection";
import { ReviewsGrid } from "@/components/sections/ReviewsGrid";
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";
import { WriteReviewModal } from "@/components/sections/WriteReviewModal";

export default function ReviewsPage() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);

  return (
    <main className="min-h-screen bg-brand-bg-primary text-brand-primary">
      {/* Page Hero */}
      <ReviewsHeroSection />

      {/* All Reviews Grid with filters */}
      <ReviewsGrid onOpenReviewModal={openReviewModal} />

      {/* Newsletter Signup bottom panel */}
      <NewsletterSignup />

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={closeReviewModal}
      />
    </main>
  );
}
