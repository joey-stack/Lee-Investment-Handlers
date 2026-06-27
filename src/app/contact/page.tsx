"use client";

import React from "react";
import { ContactHeroSection } from "@/components/sections/ContactHeroSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { ContactProcessSection } from "@/components/sections/ContactProcessSection";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-bg-primary text-brand-primary">
      {/* Contact Page Hero */}
      <ContactHeroSection />

      {/* Office Locations & Consultation Request Form */}
      <ContactFormSection />

      {/* Advisory Onboarding Onboarding Process */}
      <ContactProcessSection />
    </main>
  );
}
