"use client";

import React, { useState, useEffect } from "react";
import { X, Check, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { submitReview } from "@/services/reviewService";
import { cn } from "@/lib/utils";

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ name?: string; comment?: string }>({});

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setErrorMsg(null);
      setName("");
      setRating(5);
      setComment("");
      setValidationErrors({});
    }
  }, [isOpen]);

  const validate = () => {
    const errors: { name?: string; comment?: string } = {};
    if (!name.trim()) {
      errors.name = "Full name is required";
    } else if (name.trim().length < 2) {
      errors.name = "Full name must be at least 2 characters";
    }
    if (!comment.trim()) {
      errors.comment = "Review comment is required";
    } else if (comment.trim().length < 10) {
      errors.comment = "Review comment must be at least 10 characters";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      await submitReview(name.trim(), rating, comment.trim());
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err: any) {
      console.error("Error submitting review:", err);
      setErrorMsg(err.message || "Failed to submit your review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative bg-brand-bg-secondary w-full max-w-lg rounded-[6px] shadow-[0px_24px_64px_rgba(0,0,0,0.4)] overflow-hidden z-10 flex flex-col text-brand-primary"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-brand-secondary hover:text-brand-primary p-1 transition-colors cursor-pointer select-none"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="p-6 md:p-8 pb-4 border-b border-brand-border">
              <h2 className="font-heading text-2xl font-normal tracking-tight text-brand-primary">
                Write a Client Review
              </h2>
              <p className="font-body text-xs md:text-sm text-brand-secondary mt-1 font-light leading-relaxed">
                Provide your rating and experience below. All submissions are moderated before going live.
              </p>
            </div>

            {/* Modal Body / Form */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[70vh]">
              {isSuccess ? (
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <div className="h-16 w-16 bg-brand-alternate/10 text-brand-alternate flex items-center justify-center rounded-none mb-6">
                    <Check size={32} />
                  </div>
                  <h3 className="font-heading text-xl font-normal text-brand-primary mb-2">
                    Review Submitted Successfully
                  </h3>
                  <p className="font-body text-sm text-brand-secondary max-w-xs leading-relaxed font-light">
                    Thank you for your feedback! We appreciate your partnership. Your review has been sent for moderator approval.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {errorMsg && (
                    <div className="p-4 bg-red-950/20 border border-red-900/40 text-red-400 text-xs rounded-[6px] font-light">
                      {errorMsg}
                    </div>
                  )}

                  {/* Star Rating Selector */}
                  <div className="space-y-2">
                    <span className="block font-body text-xs md:text-sm font-normal text-brand-primary">
                      Overall Rating
                    </span>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((index) => {
                        const isFilled = hoveredRating !== null ? index <= hoveredRating : index <= rating;
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHoveredRating(index)}
                            onMouseLeave={() => setHoveredRating(null)}
                            className="p-1 text-brand-alternate hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star
                              size={28}
                              className={cn(
                                "transition-all duration-150",
                                isFilled ? "fill-brand-alternate text-brand-alternate" : "text-brand-border"
                              )}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block font-body text-xs md:text-sm font-normal text-brand-primary">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className={cn(
                        "w-full h-12 px-4 bg-brand-bg-primary text-brand-primary border rounded-[6px] text-sm font-medium focus:outline-none focus:border-brand-alternate placeholder-[#BFAB9C]/30 transition-all duration-250",
                        validationErrors.name ? "border-red-500 ring-1 ring-red-500" : "border-brand-border"
                      )}
                    />
                    {validationErrors.name && (
                      <p className="text-xs text-red-500 font-light mt-1">
                        {validationErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Review Text */}
                  <div className="space-y-1.5">
                    <label htmlFor="comment" className="block font-body text-xs md:text-sm font-normal text-brand-primary">
                      Your Review
                    </label>
                    <textarea
                      id="comment"
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share details of your investment experience with our firm..."
                      className={cn(
                        "w-full h-32 px-4 py-3 bg-brand-bg-primary text-brand-primary border rounded-[6px] text-sm font-medium focus:outline-none focus:border-brand-alternate placeholder-[#BFAB9C]/30 transition-all duration-250 resize-none font-body",
                        validationErrors.comment ? "border-red-500 ring-1 ring-red-500" : "border-brand-border"
                      )}
                    />
                    {validationErrors.comment && (
                      <p className="text-xs text-red-500 font-light mt-1">
                        {validationErrors.comment}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-full font-medium h-12 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] select-none mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting Review..." : "Submit Review"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

WriteReviewModal.displayName = "WriteReviewModal";
