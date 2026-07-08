"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  User,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  matchExact?: boolean;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
    matchExact: true,
  },
  {
    label: "All Posts",
    href: "/admin/dashboard",
    icon: <FileText size={20} />,
    matchExact: true,
  },
  {
    label: "New Post",
    href: "/admin/dashboard/new",
    icon: <PlusCircle size={20} />,
  },
];

const bottomNavItems: NavItem[] = [
  {
    label: "View Site",
    href: "/",
    icon: <ExternalLink size={20} />,
  },
];

interface AdminSidebarProps {
  children: React.ReactNode;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (item: NavItem): boolean => {
    if (item.matchExact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <div className="flex min-h-screen bg-[#0F0F0F]">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen flex flex-col bg-[#0A0A0A] border-r border-white/8 transition-all duration-300 ease-in-out select-none ${
          collapsed ? "w-[68px]" : "w-[240px]"
        }`}
      >
        {/* Brand header */}
        <div className={`h-16 flex items-center border-b border-white/8 shrink-0 ${
          collapsed ? "justify-center px-2" : "px-5"
        }`}>
          <div className={`flex items-center gap-2.5 overflow-hidden ${collapsed ? "justify-center" : ""}`}>
            <div className="h-8 w-8 bg-brand-alternate/15 text-brand-alternate flex items-center justify-center rounded-[4px] border border-brand-alternate/20 shrink-0">
              <Settings size={16} />
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-heading text-xs tracking-[0.15em] text-white uppercase truncate">
                  LEE Admin
                </span>
                <span className="text-[10px] text-white/30 font-body font-light truncate">
                  Content Management
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Primary nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={`group flex items-center gap-3 rounded-[6px] transition-all duration-200 font-body text-[13px] font-medium ${
                  collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
                } ${
                  active
                    ? "bg-brand-alternate/12 text-brand-alternate"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-white/8 px-2 py-3 space-y-1">
          {/* View Site Link */}
          {bottomNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              className={`group flex items-center gap-3 rounded-[6px] text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-200 font-body text-[13px] font-medium ${
                collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <span className="shrink-0">{item.icon}</span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          ))}

          {/* User info & logout */}
          <div className={`flex items-center gap-3 rounded-[6px] bg-white/[0.03] transition-all duration-200 ${
            collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
          }`}>
            <div className="h-7 w-7 bg-brand-alternate/10 text-brand-alternate flex items-center justify-center rounded-full shrink-0">
              <User size={14} />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <span className="block text-[11px] text-white/70 font-body font-medium truncate">
                  {user?.email || "Admin"}
                </span>
                <button
                  onClick={logout}
                  className="text-[10px] text-red-400/70 hover:text-red-400 font-body font-medium transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}
            {collapsed && (
              <button
                onClick={logout}
                className="sr-only"
                aria-label="Sign Out"
              >
                Sign Out
              </button>
            )}
          </div>

          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`flex items-center gap-3 w-full rounded-[6px] text-white/30 hover:text-white/60 hover:bg-white/5 transition-all duration-200 font-body text-[13px] font-medium cursor-pointer ${
              collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
            }`}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span className="shrink-0">
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </span>
            {!collapsed && <span className="truncate">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          collapsed ? "ml-[68px]" : "ml-[240px]"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

AdminSidebar.displayName = "AdminSidebar";
