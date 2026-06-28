import React from "react";
import { Star, ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/content/testimonials";

interface TestimonialsSectionProps {
  onOpenConsultation: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section className="bg-brand-bg-secondary py-20 md:py-28 font-body">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-brand-alternate mb-4 animate-fade-up">
            Client Perspectives
          </p>
          <h2 className="font-heading text-3xl md:text-[40px] font-normal leading-[1.2] tracking-tight text-brand-primary max-w-xl mx-auto animate-fade-up-delay-1">
            Trusted by Families & Institutions
          </h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.id}
              className="bg-brand-bg-primary border border-brand-border/40 p-6 md:p-8 rounded-[6px] flex flex-col justify-between hover:shadow-[0px_8px_24px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 transition-all duration-300 min-h-[300px] animate-fade-up-delay-4"
            >
              <div>
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-brand-alternate fill-brand-alternate"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-body text-sm md:text-base text-brand-primary leading-relaxed italic mb-8">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              {/* Attribution */}
              <footer className="border-t border-brand-border/40 pt-5 mt-auto">
                <p className="font-body text-sm font-semibold text-brand-primary">
                  {testimonial.attribution}
                </p>
                <p className="font-body text-xs text-brand-secondary mt-0.5">
                  {testimonial.role}
                </p>
              </footer>
            </blockquote>
          ))}

          {/* Column 3: Highlights CTA Card */}
          <div className="bg-brand-bg-alternate border border-brand-border-dark p-6 md:p-8 rounded-[6px] flex flex-col justify-between text-white min-h-[300px] hover:shadow-[0px_8px_32px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all duration-300 animate-fade-up-delay-4">
            <div>
              <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-brand-alternate mb-4 block">
                Next Steps
              </span>
              <h3 className="font-heading text-xl md:text-2xl font-normal text-white mb-3 leading-tight">
                Ready to Build Your Legacy?
              </h3>
              <p className="font-body text-xs md:text-sm text-white/70 leading-relaxed">
                Schedule a private consultation with our investment committee in Lagos or Venice to discuss your financial goals.
              </p>
            </div>

            <button
              onClick={onOpenConsultation}
              className="group flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-wider text-brand-alternate hover:text-white transition-colors duration-300 text-left mt-8 w-fit cursor-pointer animate-fade-up-delay-3"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

TestimonialsSection.displayName = "TestimonialsSection";
