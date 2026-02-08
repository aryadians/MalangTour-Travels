"use client";

import React from "react";
import { useTravel } from "@/context/TravelContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "@/actions/auth";

export default function ProfilePage() {
  const { user, setUser } = useTravel();
  const router = useRouter();

  React.useEffect(() => {
    if (!user?.isLoggedIn) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user || !user.isLoggedIn) {
    return null; // Or a loading spinner
  }

  const handleLogout = async () => {
    setUser({
      name: "",
      points: 0,
      referralCode: "",
      isLoggedIn: false,
      email: "",
      role: "USER",
    });
    await logout();
  };

  const dashboardLink =
    user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* 1. New Clean Profile Header Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Cover Area */}
          <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-500"></div>

          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start -mt-12">
              {/* Avatar */}
              <div className="shrink-0 relative">
                <div className="w-24 h-24 rounded-2xl bg-white dark:bg-gray-900 p-1 shadow-lg">
                  <div className="w-full h-full rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-3xl font-black text-emerald-600">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
                {user.role === "ADMIN" && (
                  <div
                    className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-lg shadow-sm border-2 border-white dark:border-gray-800"
                    title="Admin"
                  >
                    <span className="material-symbols-outlined text-[14px] block">
                      verified_user
                    </span>
                  </div>
                )}
              </div>

              {/* Info & Stats */}
              <div className="flex-1 pt-0 md:pt-14 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                      {user.name}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span className="material-symbols-outlined text-[16px]">
                        mail
                      </span>
                      {user.email}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex gap-3">
                    <div className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 flex flex-col items-center min-w-[80px]">
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                        Role
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {user.role}
                      </span>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 flex flex-col items-center min-w-[80px]">
                      <span className="text-[10px] uppercase font-bold text-yellow-600/70 tracking-wider">
                        Points
                      </span>
                      <span className="text-sm font-bold text-yellow-700 dark:text-yellow-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] filled">
                          stars
                        </span>
                        {user.points}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Header Actions */}
              <div className="hidden md:flex items-end self-end pb-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 text-sm font-bold transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    logout
                  </span>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Actions (Span 2) */}
          <div className="md:col-span-2 space-y-6">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Link
                href={dashboardLink}
                className="group p-6 rounded-3xl bg-white dark:bg-gray-800 border-2 border-transparent hover:border-emerald-500/20 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">
                    space_dashboard
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Dashboard
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {user.role === "ADMIN"
                    ? "Manage system & users"
                    : "Overview of your trips"}
                </p>
              </Link>

              <Link
                href={user.role === "ADMIN" ? "/admin/bookings" : "/bookings"}
                className="group p-6 rounded-3xl bg-white dark:bg-gray-800 border-2 border-transparent hover:border-blue-500/20 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">
                    confirmation_number
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Bookings
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Check reservation status
                </p>
              </Link>
            </div>

            {/* Personal Info Box */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-400">
                  badge
                </span>
                Referral Program
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 items-center bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600">
                <div className="text-center sm:text-left flex-1">
                  <p className="text-xs text-gray-500 mb-1">
                    Your Referral Code
                  </p>
                  <p className="font-mono text-xl font-bold tracking-widest text-gray-900 dark:text-white">
                    {user.referralCode}
                  </p>
                </div>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(user.referralCode || "")
                  }
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm shadow-emerald-500/20"
                >
                  Copy Code
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Menu (Span 1) */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-2 shadow-sm border border-gray-100 dark:border-gray-700">
              <Link
                href="/settings"
                className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-2xl transition-colors group"
              >
                <span className="material-symbols-outlined text-gray-400 group-hover:text-blue-500 transition-colors">
                  settings
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    Preferences
                  </p>
                </div>
                <span className="material-symbols-outlined text-gray-300 text-sm">
                  chevron_right
                </span>
              </Link>
              <Link
                href="/security"
                className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-2xl transition-colors group"
              >
                <span className="material-symbols-outlined text-gray-400 group-hover:text-emerald-500 transition-colors">
                  lock
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    Security
                  </p>
                </div>
                <span className="material-symbols-outlined text-gray-300 text-sm">
                  chevron_right
                </span>
              </Link>
              <Link
                href="/help"
                className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-2xl transition-colors group"
              >
                <span className="material-symbols-outlined text-gray-400 group-hover:text-orange-500 transition-colors">
                  support_agent
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    Help Center
                  </p>
                </div>
                <span className="material-symbols-outlined text-gray-300 text-sm">
                  chevron_right
                </span>
              </Link>
            </div>

            {/* Mobile Logout (only visible on small screens) */}
            <button
              onClick={handleLogout}
              className="md:hidden w-full py-3 rounded-2xl bg-red-50 text-red-600 font-bold text-sm border border-red-100"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
