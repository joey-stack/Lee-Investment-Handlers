"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/content/nav";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
} as const;

const menuContainerVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.35, 
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.05,
      delayChildren: 0.1,
    } 
  },
  exit: { 
    opacity: 0, 
    y: -16, 
    transition: { duration: 0.2, ease: "easeIn" } 
  },
} as const;

const linkVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
} as const;

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Prevent body scroll when menu is open
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

  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-brand-bg-alternate flex flex-col"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header Bar */}
          <div className="h-[75px] px-6 flex items-center justify-between border-b border-brand-border-dark">
            <Link href="/" onClick={onClose} className="flex items-center">
              <Image
                src="/lee-logo.png"
                alt="LEE Investment Handlers Logo"
                width={200}
                height={56}
                className="h-[56px] w-auto object-contain brightness-200"
                priority
              />
            </Link>
            <Button
              variant="icon"
              onClick={onClose}
              aria-label="Close menu"
              className="text-white"
            >
              <X size={24} />
            </Button>
          </div>

          {/* Navigation Links List */}
          <motion.div 
            className="flex-1 px-8 py-12 flex flex-col justify-between overflow-y-auto"
            variants={menuContainerVariants}
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.href} variants={linkVariants}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        "font-heading text-3xl tracking-wide transition-colors duration-200 block py-2",
                        isActive 
                          ? "text-brand-alternate" 
                          : "text-white hover:text-brand-alternate"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* CTA Button at Bottom */}
            <motion.div variants={linkVariants} className="mt-8">
              <Button
                variant="primary"
                href="/contact" // Redirecting to Contact for Consultation request in MVP
                onClick={onClose}
                className="w-full text-center"
              >
                Schedule a Consultation
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

MobileMenu.displayName = "MobileMenu";
