"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { navLinks } from "@/lib/content/nav";
import { cn } from "@/lib/utils";

export const Nav: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Floating navbar — outer header provides the gap from viewport edges */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 md:px-6">
        {/* Floating card */}
        <div className="max-w-[1200px] mx-auto bg-brand-bg-primary border border-brand-border rounded-none shadow-[0_4px_24px_rgba(0,0,0,0.08)] h-[64px] px-5 md:px-7 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/lee-logo.png"
              alt="LEE Investment Handlers Logo"
              width={130}
              height={36}
              className="h-[34px] w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-body text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors duration-200 py-1 relative",
                    isActive
                      ? "text-brand-alternate"
                      : "text-brand-secondary hover:text-brand-primary"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-brand-alternate rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="primary"
              href="/contact"
              className="text-[11px] font-semibold tracking-wide py-2 px-5 h-9"
            >
              Schedule Consultation
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="text-brand-primary p-1"
            >
              <Menu size={22} />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

Nav.displayName = "Nav";
