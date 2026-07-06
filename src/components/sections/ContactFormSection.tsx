"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Check } from "lucide-react";
import { footerContent } from "@/lib/content/footer";
import { contactFormCopy } from "@/lib/content/contact";
import { contactSchema, investmentGoalOptions, type ContactFormData } from "@/lib/schemas/contactSchema";
import { submitConsultationRequest } from "@/services/consultationService";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const ContactFormSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      investmentGoals: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // Validate schema client-side
      const result = contactSchema.safeParse(data);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as keyof ContactFormData;
          setError(fieldName, { message: issue.message });
        });
        setIsLoading(false);
        return;
      }

      // Submit via decoupled client service function
      const response = await submitConsultationRequest(result.data);

      if (!response.success) {
        setServerError(response.error || "Failed to submit request. Please try again.");
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      reset();
    } catch (err) {
      console.error("Contact Form submit exception:", err);
      setServerError("A network error occurred. Please verify your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-brand-bg-primary py-20 md:py-24 border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column — Office details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-3 block animate-fade-up">
                Office Locations
              </span>
              <h2 className="font-heading text-2xl md:text-3xl font-normal tracking-tight text-brand-primary mb-6 animate-fade-up-delay-1">
                Our Corporate Offices
              </h2>
              <p className="font-body text-xs md:text-sm text-brand-secondary leading-relaxed mb-8 animate-fade-up-delay-2">
                For direct correspondence, partnership inquiries, or client visits, please contact our local operations teams in Lagos or Venice.
              </p>
            </div>

            {/* Office Cards List */}
            <div className="space-y-6 animate-fade-up-delay-4">
              {footerContent.offices.map((office) => (
                <div 
                  key={office.city}
                  className="bg-brand-bg-secondary border border-brand-border/60 rounded-[6px] p-6 hover:shadow-[0px_4px_12px_rgba(10,10,10,0.02)] transition-all duration-200"
                >
                  <h3 className="font-heading text-lg font-normal text-brand-primary mb-4 border-b border-brand-border/60 pb-2">
                    {office.city}
                  </h3>
                  
                  <div className="space-y-3 font-body text-xs md:text-sm text-[#BFAB9C]">
                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-brand-alternate mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{office.address}</span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-brand-alternate flex-shrink-0" />
                      <a href={`tel:${office.phone.replace(/\s+/g, "")}`} className="hover:text-brand-alternate hover:underline transition-colors duration-200">
                        {office.phone}
                      </a>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-brand-alternate flex-shrink-0" />
                      <a href={`mailto:${office.email}`} className="hover:text-brand-alternate hover:underline transition-colors duration-200">
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Consultation Form Container */}
          <div className="lg:col-span-7 bg-brand-bg-primary border border-brand-border/60 rounded-[6px] p-6 md:p-10 shadow-[0px_2px_8px_rgba(0,0,0,0.01)] animate-fade-up-delay-3">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-8">
                    <h3 className="font-heading text-xl md:text-2xl font-normal text-brand-primary mb-2">
                      Schedule a Private Consultation
                    </h3>
                    <p className="font-body text-xs md:text-sm text-brand-secondary leading-relaxed">
                      Please fill out the form below. An investment professional will review your requirements and reach out to schedule a private briefing.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block font-body text-xs md:text-sm font-normal text-brand-primary mb-2">
                        {contactFormCopy.labelName}
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        placeholder={contactFormCopy.placeholderName}
                        disabled={isLoading}
                        className={cn(
                          "w-full h-12 px-4 py-3 bg-brand-bg-primary border rounded-[6px] font-body text-sm font-medium text-brand-primary outline-hidden transition-all duration-200 focus:border-brand-primary placeholder-[#BFAB9C]/30 disabled:bg-brand-bg-secondary disabled:text-[#BFAB9C] disabled:border-brand-border",
                          errors.fullName ? "border-red-500 ring-1 ring-red-500 focus:border-red-500" : "border-brand-border"
                        )}
                        {...register("fullName")}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1.5 font-body">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block font-body text-xs md:text-sm font-normal text-brand-primary mb-2">
                          {contactFormCopy.labelEmail}
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder={contactFormCopy.placeholderEmail}
                          disabled={isLoading}
                          className={cn(
                            "w-full h-12 px-4 py-3 bg-brand-bg-primary border rounded-[6px] font-body text-sm font-medium text-brand-primary outline-hidden transition-all duration-200 focus:border-brand-primary placeholder-[#BFAB9C]/30 disabled:bg-brand-bg-secondary disabled:text-[#BFAB9C] disabled:border-brand-border",
                            errors.email ? "border-red-500 ring-1 ring-red-500 focus:border-red-500" : "border-brand-border"
                          )}
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1.5 font-body">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block font-body text-xs md:text-sm font-normal text-brand-primary mb-2">
                          {contactFormCopy.labelPhone}
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          placeholder={contactFormCopy.placeholderPhone}
                          disabled={isLoading}
                          className={cn(
                            "w-full h-12 px-4 py-3 bg-brand-bg-primary border rounded-[6px] font-body text-sm font-medium text-brand-primary outline-hidden transition-all duration-200 focus:border-brand-primary placeholder-[#BFAB9C]/30 disabled:bg-brand-bg-secondary disabled:text-[#BFAB9C] disabled:border-brand-border",
                            errors.phone ? "border-red-500 ring-1 ring-red-500 focus:border-red-500" : "border-brand-border"
                          )}
                          {...register("phone")}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1.5 font-body">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Investment Goals Select */}
                    <div>
                      <label htmlFor="investmentGoals" className="block font-body text-xs md:text-sm font-normal text-brand-primary mb-2">
                        {contactFormCopy.labelGoals}
                      </label>
                      <select
                        id="investmentGoals"
                        disabled={isLoading}
                        className={cn(
                          "w-full h-12 px-4 py-3 bg-brand-bg-primary border rounded-[6px] font-body text-sm font-medium text-brand-primary outline-hidden transition-all duration-200 focus:border-brand-primary placeholder-[#BFAB9C]/30 disabled:bg-brand-bg-secondary disabled:text-[#BFAB9C] disabled:border-brand-border appearance-none cursor-pointer",
                          errors.investmentGoals ? "border-red-500 ring-1 ring-red-500 focus:border-red-500" : "border-brand-border"
                        )}
                        {...register("investmentGoals")}
                      >
                        <option value="" disabled hidden>
                          {contactFormCopy.placeholderGoals}
                        </option>
                        {investmentGoalOptions.map((option) => (
                          <option key={option} value={option} className="text-brand-primary bg-brand-bg-primary">
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.investmentGoals && (
                        <p className="text-red-500 text-xs mt-1.5 font-body">
                          {errors.investmentGoals.message}
                        </p>
                      )}
                    </div>

                    {/* Message Area */}
                    <div>
                      <label htmlFor="message" className="block font-body text-xs md:text-sm font-normal text-brand-primary mb-2">
                        {contactFormCopy.labelMessage}
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder={contactFormCopy.placeholderMessage}
                        disabled={isLoading}
                        className="w-full min-h-[120px] px-4 py-3 bg-brand-bg-primary border border-brand-border rounded-[6px] font-body text-sm font-medium text-brand-primary outline-hidden transition-all duration-200 focus:border-brand-primary placeholder-[#BFAB9C]/30 disabled:bg-brand-bg-secondary disabled:text-[#BFAB9C] disabled:border-brand-border resize-y"
                        {...register("message")}
                      />
                    </div>

                    {/* Server Error Alert */}
                    {serverError && (
                      <div className="bg-red-950/20 border border-red-900/40 text-red-400 text-xs md:text-sm p-4 rounded-[6px] font-body leading-relaxed">
                        {serverError}
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        variant="primary"
                        className="w-full text-center"
                      >
                        {isLoading ? contactFormCopy.buttonLoading : contactFormCopy.buttonSubmit}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-view"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="py-12 md:py-16 text-center flex flex-col items-center"
                >
                  {/* Success Check Badge */}
                  <div className="h-16 w-16 rounded-[2px] bg-brand-alternate/10 text-brand-alternate flex items-center justify-center mb-8">
                    <Check size={28} />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-2xl md:text-3xl font-normal text-brand-primary mb-4 leading-tight">
                    {contactFormCopy.successTitle}
                  </h3>

                  {/* Text Description */}
                  <p className="font-body text-sm md:text-base text-brand-secondary leading-relaxed max-w-md">
                    {contactFormCopy.successText}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

ContactFormSection.displayName = "ContactFormSection";
