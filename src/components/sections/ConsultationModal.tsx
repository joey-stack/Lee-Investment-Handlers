"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { contactSchema, investmentGoalOptions, type ContactFormData } from "@/lib/schemas/contactSchema";
import { cn } from "@/lib/utils";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    clearErrors,
  } = useForm<ContactFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      investmentGoals: "",
      message: "",
    },
  });

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
      setServerError(null);
      reset();
      clearErrors();
    }
  }, [isOpen, reset, clearErrors]);

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // Validate schema on submit
      const result = contactSchema.safeParse(data);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as keyof ContactFormData;
          setError(fieldName, { message: issue.message });
        });
        setIsLoading(false);
        return;
      }

      // Submit to Next.js API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Capture validation errors from backend
        if (responseData.errors) {
          Object.entries(responseData.errors).forEach(([field, msg]) => {
            setError(field as keyof ContactFormData, { message: msg as string });
          });
        } else {
          setServerError(responseData.error || "Failed to submit request. Please try again.");
        }
        setIsLoading(false);
        return;
      }

      // Success state
      setIsSuccess(true);
      reset();
      
      // Auto close after 2.5 seconds
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err) {
      console.error("Consultation form submission error:", err);
      setServerError("A network error occurred. Please check your connection and try again.");
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
                Schedule a Consultation
              </h2>
              <p className="font-body text-xs md:text-sm text-brand-secondary mt-1 font-light leading-relaxed">
                Provide your details below, and an investment advisor will contact you within 24 hours.
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
                    Request Received Successfully
                  </h3>
                  <p className="font-body text-sm text-brand-secondary max-w-xs leading-relaxed font-light">
                    Thank you for reaching out. We have logged your request and will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  {serverError && (
                    <div className="p-4 bg-red-950/20 border border-red-900/40 text-red-400 text-xs rounded-[6px] font-light">
                      {serverError}
                    </div>
                  )}

                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className="block font-body text-xs md:text-sm font-normal text-brand-primary">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="e.g. David Lee"
                      className={cn(
                        "w-full h-12 px-4 bg-brand-bg-primary text-brand-primary border rounded-[6px] text-sm font-medium focus:outline-none focus:border-brand-alternate placeholder-[#BFAB9C]/50 transition-all duration-250",
                        errors.fullName ? "border-red-500 ring-1 ring-red-500" : "border-brand-border"
                      )}
                      {...register("fullName")}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 font-light mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block font-body text-xs md:text-sm font-normal text-brand-primary">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="e.g. client@domain.com"
                        className={cn(
                          "w-full h-12 px-4 bg-brand-bg-primary text-brand-primary border rounded-[6px] text-sm font-medium focus:outline-none focus:border-brand-alternate placeholder-[#BFAB9C]/50 transition-all duration-250",
                          errors.email ? "border-red-500 ring-1 ring-red-500" : "border-brand-border"
                        )}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 font-light mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="block font-body text-xs md:text-sm font-normal text-brand-primary">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="e.g. +234 800 123 4567"
                        className={cn(
                          "w-full h-12 px-4 bg-brand-bg-primary text-brand-primary border rounded-[6px] text-sm font-medium focus:outline-none focus:border-brand-alternate placeholder-[#BFAB9C]/50 transition-all duration-250",
                          errors.phone ? "border-red-500 ring-1 ring-red-500" : "border-brand-border"
                        )}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 font-light mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Investment Goals Select */}
                  <div className="space-y-1.5">
                    <label htmlFor="investmentGoals" className="block font-body text-xs md:text-sm font-normal text-brand-primary">
                      Primary Investment Goal
                    </label>
                    <div className="relative">
                      <select
                        id="investmentGoals"
                        className={cn(
                          "w-full h-12 px-4 bg-brand-bg-primary text-brand-primary border rounded-[6px] text-sm font-medium focus:outline-none focus:border-brand-alternate transition-all duration-250 appearance-none cursor-pointer",
                          errors.investmentGoals ? "border-red-500 ring-1 ring-red-500" : "border-brand-border"
                        )}
                        {...register("investmentGoals")}
                      >
                        <option value="" disabled className="text-[#BFAB9C]">
                          Select your primary investment goal
                        </option>
                        {investmentGoalOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-brand-secondary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                    {errors.investmentGoals && (
                      <p className="text-xs text-red-500 font-light mt-1">
                        {errors.investmentGoals.message}
                      </p>
                    )}
                  </div>

                  {/* Optional Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block font-body text-xs md:text-sm font-normal text-brand-primary">
                      Message <span className="text-brand-secondary text-xs font-light">(Optional)</span>
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Tell us more about your investment profile, timelines, or questions..."
                      className={cn(
                        "w-full h-24 px-4 py-3 bg-brand-bg-primary text-brand-primary border border-brand-border rounded-[6px] text-sm font-medium focus:outline-none focus:border-brand-alternate placeholder-[#BFAB9C]/50 transition-all duration-250 resize-none font-body",
                        errors.message ? "border-red-500 ring-1 ring-red-500" : "border-brand-border"
                      )}
                      {...register("message")}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-full font-medium h-12 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] select-none mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending Request..." : "Send Request"}
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

ConsultationModal.displayName = "ConsultationModal";
