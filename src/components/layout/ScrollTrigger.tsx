"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export const ScrollTrigger: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Set class to indicate JS is active, enabling progressive enhancement fallback
    document.documentElement.classList.add("js-enabled");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
};

ScrollTrigger.displayName = "ScrollTrigger";
