"use client";

import React from "react";
import { AdminGuard } from "@/components/layout/AdminGuard";
import { BlogEditor } from "@/components/sections/BlogEditor";

export default function NewPostPage() {
  return (
    <AdminGuard>
      <main className="min-h-screen bg-brand-bg-secondary text-brand-primary pb-24">
        {/* Navigation header */}
        <header className="bg-brand-bg-primary border-b border-brand-border sticky top-0 z-40">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
            <span className="font-heading text-lg tracking-wider text-brand-primary uppercase">
              New Insight Article
            </span>
          </div>
        </header>
        
        <BlogEditor />
      </main>
    </AdminGuard>
  );
}
