"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface AdminGuardProps {
  children: React.ReactNode;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg-primary flex flex-col items-center justify-center select-none font-body">
        {/* Fintech gold spinner */}
        <div className="h-10 w-10 border-2 border-brand-alternate/20 border-t-brand-alternate rounded-full animate-spin mb-4" />
        <span className="text-xs text-brand-secondary tracking-[0.2em] uppercase font-medium">
          Verifying Access...
        </span>
      </div>
    );
  }

  if (!user) {
    return null; // Redirecting...
  }

  return <>{children}</>;
};

AdminGuard.displayName = "AdminGuard";
