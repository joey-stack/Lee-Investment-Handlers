"use client";

import React from "react";
import { AdminGuard } from "@/components/layout/AdminGuard";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminGuard>
      <AdminSidebar>
        {children}
      </AdminSidebar>
    </AdminGuard>
  );
}
