import React from "react";
import Image from "next/image";
import { team } from "@/lib/content/team";

export const LeadershipSnapshot: React.FC = () => {
  return (
    <section className="bg-brand-bg-primary py-20 md:py-28 font-body">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Eyebrow Label */}
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-brand-alternate mb-4 animate-fade-up">
            <span className="h-2.5 w-2.5 bg-brand-alternate inline-block" />
            <span>Leadership</span>
          </div>

          {/* Title */}
          <h2 className="font-heading text-3xl md:text-[40px] font-normal leading-[1.2] tracking-tight text-brand-primary animate-fade-up-delay-1">
            The People Behind Your Portfolio
          </h2>

          {/* Description */}
          <p className="font-body text-sm md:text-base text-brand-secondary leading-relaxed max-w-2xl mx-auto mt-4 text-balance animate-fade-up-delay-2">
            Meet the disciplined investment partners managing and protecting your wealth across generations.
          </p>
        </div>

        {/* 3-Column Static Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="relative w-full aspect-[3/4] overflow-hidden rounded-[6px] group cursor-pointer hover:shadow-[0px_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 select-none animate-fade-up-delay-4"
            >
              {/* Full-bleed photo */}
              <Image
                src={member.image}
                alt={`${member.name} — ${member.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />

              {/* Gradient vignette — always visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

              {/* Bottom-left identity badge */}
              <div className="absolute bottom-3 left-3 right-3 z-20 backdrop-blur-md bg-black/40 border border-white/10 rounded-[6px] p-3 select-none transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="font-heading text-sm md:text-base font-normal text-white leading-tight">
                  {member.name}
                </h3>
                <span className="font-body text-[10px] font-semibold text-brand-alternate uppercase tracking-wider block mt-1">
                  {member.title}
                </span>
              </div>

              {/* Hover bio overlay */}
              <div className="absolute inset-0 z-30 flex flex-col justify-end p-5 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/90 via-black/70 to-black/40">
                <p className="font-body text-xs md:text-sm text-white/90 leading-relaxed mb-4">
                  {member.bioShort}
                </p>
                {member.linkedin !== undefined && (
                  <a
                    href={member.linkedin || "https://linkedin.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xs font-medium"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

LeadershipSnapshot.displayName = "LeadershipSnapshot";
