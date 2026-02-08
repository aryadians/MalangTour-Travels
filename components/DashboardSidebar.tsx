"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/auth";
import toast from "react-hot-toast";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (e) {
      toast.error("Logout failed");
    }
  };

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "My Trips", href: "/bookings", icon: "airplane_ticket" },
    { name: "Destinations", href: "/destinations", icon: "explore" },
    { name: "Profile", href: "/profile", icon: "person" },
  ];

  return (
    <aside className="hidden lg:flex w-64 bg-white dark:bg-[#1a2c26] border-r border-slate-200 dark:border-slate-700 flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <Link href="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-500 text-3xl font-icon">
            landscape
          </span>
          <h2 className="text-[#111816] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            Malang Premium
          </h2>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Menu
        </div>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              {link.name}
            </Link>
          );
        })}
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl font-medium transition-colors border-t border-slate-100 dark:border-slate-800 mt-4 pt-4"
        >
          <span className="material-symbols-outlined">home</span>
          Back to Home
        </Link>
      </nav>
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl font-medium transition-colors"
        >
          <span className="material-symbols-outlined">logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
