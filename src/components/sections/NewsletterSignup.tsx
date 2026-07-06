"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { newsletterCopy } from "@/lib/content/insights";
import { cn } from "@/lib/utils";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export const NewsletterSignup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<NewsletterFormData>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsLoading(true);
    try {
      const result = newsletterSchema.safeParse(data);
      if (!result.success) {
        setError("email", { message: result.error.issues[0]?.message });
        setIsLoading(false);
        return;
      }

      // Mock subscription request
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setIsSuccess(true);
      reset();
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setError("email", { message: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-brand-bg-alternate text-white py-20 md:py-24 border-b border-brand-border-dark select-none">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
        <div className="max-w-xl mx-auto flex flex-col items-center">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-6 animate-fade-up">
            <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
            <span>Newsletter</span>
          </div>

          {/* Headline */}
          <h2 className="font-heading text-3xl md:text-4xl font-normal leading-[1.2] tracking-tight text-white mb-6 text-balance animate-fade-up-delay-1">
            {newsletterCopy.headline}
          </h2>

          {/* Subtitle */}
          <p className="font-body text-base text-white/80 leading-relaxed max-w-md animate-fade-up-delay-2">
            {newsletterCopy.subtext}
          </p>

          {/* Form / Success state */}
          <div className="w-full max-w-md mt-8 animate-fade-up-delay-3">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/5 border border-brand-border-dark p-6 rounded-[6px] flex flex-col items-center justify-center text-center"
                >
                  <div className="h-12 w-12 bg-brand-alternate/10 text-brand-alternate flex items-center justify-center rounded-[2px] mb-4">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <h4 className="font-heading text-lg font-normal text-white mb-1">
                    Subscription Confirmed
                  </h4>
                  <p className="font-body text-xs md:text-sm text-white/60">
                    Thank you. You have been successfully added to our briefing list.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col sm:flex-row gap-3 items-stretch w-full"
                  noValidate
                >
                  <div className="flex-1 flex flex-col items-start min-w-0">
                    <input
                      type="email"
                      placeholder={newsletterCopy.placeholder}
                      className={cn(
                        "w-full h-12 px-4 bg-white/5 text-white border rounded-[6px] text-sm focus:outline-none focus:border-brand-alternate placeholder-white/20 transition-all duration-250",
                        errors.email ? "border-red-500 ring-1 ring-red-500" : "border-white/10"
                      )}
                      {...register("email")}
                    />
                    {errors.email && (
                      <span className="text-xs text-red-400 font-light mt-1.5 pl-1 block text-left">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="primary"
                    type="submit"
                    className="h-12 px-8 font-medium shadow-[0px_4px_12px_rgba(0,0,0,0.1)] text-brand-primary uppercase tracking-wider shrink-0 animate-fade-up-delay-3"
                    disabled={isLoading}
                  >
                    {isLoading ? "Subscribing..." : newsletterCopy.buttonText}
                  </Button>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

NewsletterSignup.displayName = "NewsletterSignup";
