"use client";

import React, { useState } from "react";
import { Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  className?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ className }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 border border-brand-border rounded-[4px] font-body text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-250 cursor-pointer outline-none select-none",
        copied
          ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
          : "border-brand-border text-brand-secondary hover:text-brand-primary hover:border-brand-primary/40 bg-transparent active:scale-[0.98]"
      )}
      title="Copy link to clipboard"
    >
      {copied ? (
        <>
          <Check size={14} className="stroke-[2.5px]" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Link2 size={14} className="stroke-[2px]" />
          <span>Copy Link</span>
        </>
      )}
    </button>
  );
};

ShareButton.displayName = "ShareButton";
