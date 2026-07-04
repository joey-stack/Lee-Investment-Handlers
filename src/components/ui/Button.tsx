import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BaseButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "icon";
  href?: string;
  children: React.ReactNode;
}

export type ButtonProps = BaseButtonProps & 
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps>;

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "primary", href, children, ...props }, ref) => {
    const baseStyles = "font-body inline-flex items-center justify-center transition-all duration-250 ease-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-alternate focus-visible:ring-offset-2 active:scale-[0.98] cursor-pointer select-none";
    
    const variants = {
      primary: "h-12 px-8 bg-brand-btn-primary hover:bg-brand-btn-hover text-[#0A0A0A] font-medium text-base border-0 rounded-none disabled:bg-[#D7CAC1] disabled:text-[#BFAB9C] disabled:cursor-not-allowed active:bg-[#A8894E]",
      secondary: "h-12 px-8 bg-transparent text-current font-normal text-base border border-current rounded-none hover:bg-brand-primary/5 dark:hover:bg-white/10 active:bg-brand-primary/10 dark:active:bg-white/20",
      ghost: "p-0 bg-transparent text-brand-secondary font-medium text-base border-0 rounded-none hover:text-brand-primary active:text-black",
      icon: "h-11 w-11 bg-transparent text-current border-0 rounded-none hover:bg-brand-primary/5 active:bg-brand-primary/10 min-h-[44px] min-w-[44px]",
    };

    const combinedClasses = cn(baseStyles, variants[variant], className);

    if (href) {
      return (
        <Link 
          href={href} 
          className={combinedClasses}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      );
    }

    return (
      <button 
        ref={ref as React.Ref<HTMLButtonElement>} 
        className={combinedClasses} 
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
