"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { newsletterSchema, type NewsletterFormData } from "@/lib/schemas/newsletterSchema";
import { footerContent } from "@/lib/content/footer";
import { navLinks, footerLegalLinks } from "@/lib/content/nav";
import { cn } from "@/lib/utils";

export const Footer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<NewsletterFormData>();

  const onSubmit = async (data: NewsletterFormData) => {
    setIsLoading(true);
    try {
      // Validate schema compliance in handler
      const result = newsletterSchema.safeParse(data);
      if (!result.success) {
        result.error.issues.forEach((err) => {
          if (err.path[0] === "email") {
            setError("email", { message: err.message });
          }
        });
        setIsLoading(false);
        return;
      }

      // Simulate API submit delay (e.g. form capture only)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsSubscribed(true);
      reset();
    } catch {
      setError("email", { message: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[18px] h-[18px]"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        );
      case "instagram":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[18px] h-[18px]"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        );
      case "x":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const currentYear = new Date().getFullYear();
  const copyrightText = footerContent.copyrightTemplate.replace("{year}", currentYear.toString());

  return (
    <footer className="bg-brand-bg-alternate text-white border-t border-brand-border-dark font-body">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20">
        {/* Top Section: 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 pb-12 md:pb-16 border-b border-brand-border-dark">
          
          {/* Column 1: Brand Info & Socials */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/lee-logo.png"
                alt="LEE Investment Handlers Logo"
                width={140}
                height={40}
                className="h-[40px] w-auto object-contain brightness-0 invert"
                priority
              />
            </Link>
            <p className="text-sm font-semibold text-brand-alternate tracking-wide uppercase">
              {footerContent.tagline}
            </p>
            <p className="text-sm text-white/60 leading-relaxed font-light">
              {footerContent.description}
            </p>
            <div className="flex items-center gap-4 pt-2">
              {footerContent.socialLinks.map((social) => (
                <Link
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 border border-brand-border-dark rounded-none flex items-center justify-center text-white/60 hover:text-brand-alternate hover:border-brand-alternate transition-all duration-250"
                  aria-label={`Follow us on ${social.platform}`}
                >
                  {getSocialIcon(social.platform)}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-6 lg:pl-8">
            <h4 className="font-heading text-lg text-white font-medium tracking-wide">
              Navigation
            </h4>
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-brand-alternate transition-colors duration-250 self-start py-0.5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Offices & Legal Links */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="font-heading text-lg text-white font-medium tracking-wide">
                Our Offices
              </h4>
              {footerContent.offices.map((office) => (
                <div key={office.city} className="text-sm space-y-1">
                  <p className="font-medium text-white/90">{office.city}</p>
                  <p className="text-white/60 font-light leading-relaxed">{office.address}</p>
                  <p className="text-white/60 font-light">{office.phone}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 pt-2">
              <h5 className="font-heading text-sm text-white font-medium uppercase tracking-wider">
                Legal & Compliance
              </h5>
              <nav className="flex flex-col space-y-2">
                {footerLegalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs text-white/60 hover:text-brand-alternate transition-colors duration-250 self-start"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="space-y-6">
            <h4 className="font-heading text-lg text-white font-medium tracking-wide">
              {footerContent.newsletter.title}
            </h4>
            <p className="text-sm text-white/60 leading-relaxed font-light">
              {footerContent.newsletter.description}
            </p>

            {isSubscribed ? (
              <div className="p-4 bg-brand-alternate/10 border border-brand-alternate/20 text-brand-alternate text-sm leading-relaxed rounded-none">
                {footerContent.newsletter.successMessage}
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
                <div className="flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder={footerContent.newsletter.placeholder}
                    className={cn(
                      "h-12 px-4 bg-brand-bg-primary text-brand-primary border rounded-[6px] text-sm font-medium focus:outline-none focus:border-brand-alternate placeholder-[#BFAB9C]/50 w-full transition-all duration-250",
                      errors.email ? "border-red-500 ring-1 ring-red-500" : "border-brand-border"
                    )}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    className="h-12 w-full font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : footerContent.newsletter.buttonText}
                  </Button>
                </div>
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1 font-light">
                    {errors.email.message}
                  </p>
                )}
              </form>
            )}
          </div>

        </div>

        {/* Bottom Section: Compliance Disclosure & Copyright */}
        <div className="pt-8 md:pt-10 flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center text-xs text-white/40 leading-relaxed font-light">
          <p className="max-w-[750px]">
            {footerContent.complianceDisclaimer}
          </p>
          <p className="shrink-0 pt-2 lg:pt-0">
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
