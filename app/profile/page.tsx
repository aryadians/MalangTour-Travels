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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          {/* Header / Cover */}
          <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-400 relative">
            <div className="absolute -bottom-12 left-8 md:left-12">
              <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-center shadow-md">
                <span className="text-3xl font-bold text-emerald-600">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-16 pb-8 px-8 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                <div className="mt-2 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    {user.role}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">
                      stars
                    </span>
                    {user.points} Points
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold transition-colors"
              >
                Sign Out
              </button>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-400">
                    person
                  </span>
                  Account Details
                </h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-700 space-y-3">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">
                      Full Name
                    </p>
                    <p className="font-medium text-gray-700 dark:text-gray-200">
                      {user.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">
                      Email Address
                    </p>
                    <p className="font-medium text-gray-700 dark:text-gray-200">
                      {user.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">
                      Referral Code
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono font-bold text-gray-700 dark:text-gray-200 tracking-wider">
                        {user.referralCode}
                      </p>
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(user.referralCode || "")
                        }
                        className="text-xs text-emerald-500 font-bold hover:underline"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-400">
                    link
                  </span>
                  Quick Links
                </h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-2 border border-gray-100 dark:border-gray-700">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 p-3 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-all group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-sm">
                        dashboard
                      </span>
                    </span>
                    <span className="font-bold text-gray-700 dark:text-gray-200">
                      Go to Dashboard
                    </span>
                    <span className="material-symbols-outlined ml-auto text-gray-400">
                      chevron_right
                    </span>
                  </Link>
                  <Link
                    href="/bookings"
                    className="flex items-center gap-3 p-3 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-all group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-sm">
                        airplane_ticket
                      </span>
                    </span>
                    <span className="font-bold text-gray-700 dark:text-gray-200">
                      My Bookings
                    </span>
                    <span className="material-symbols-outlined ml-auto text-gray-400">
                      chevron_right
                    </span>
                  </Link>
                  <Link
                    href="/help"
                    className="flex items-center gap-3 p-3 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-all group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-sm">
                        support_agent
                      </span>
                    </span>
                    <span className="font-bold text-gray-700 dark:text-gray-200">
                      Help Center
                    </span>
                    <span className="material-symbols-outlined ml-auto text-gray-400">
                      chevron_right
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
