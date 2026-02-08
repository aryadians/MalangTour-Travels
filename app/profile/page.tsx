"use client";

import React, { useEffect, useState } from "react";
import { useTravel } from "@/context/TravelContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "@/actions/auth";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function ProfilePage() {
  const { user, setUser } = useTravel();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!user?.isLoggedIn) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!isMounted || !user || !user.isLoggedIn) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      setUser({
        name: "",
        points: 0,
        referralCode: "",
        isLoggedIn: false,
        email: "",
        role: "USER",
      });
      toast.success("Logged out successfully");
    } catch (e) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="bg-[#f0f4f3] dark:bg-slate-950 font-display text-slate-900 dark:text-white min-h-screen flex">
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-10"
        >
          {/* Profile Header Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-white dark:border-slate-800 overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
            <div className="px-10 pb-10">
              <div className="flex flex-col md:flex-row gap-8 items-start -mt-16">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-[2.5rem] bg-white dark:bg-slate-950 p-1.5 shadow-2xl transition-transform group-hover:scale-105">
                    <div className="w-full h-full rounded-[2rem] bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-4xl font-black text-emerald-600">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center border-4 border-white dark:border-slate-900 hover:bg-emerald-500 transition-all">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                </div>

                <div className="flex-1 pt-0 md:pt-20">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        {user.name}
                      </h1>
                      <p className="text-slate-400 font-medium flex items-center gap-2 mt-1">
                        <span className="material-symbols-outlined text-sm">mail</span>
                        {user.email}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center min-w-[100px]">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                        <p className="text-sm font-black text-slate-900 dark:text-white">{user.role}</p>
                      </div>
                      <div className="px-6 py-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl border border-yellow-100 dark:border-yellow-900/20 text-center min-w-[100px]">
                        <p className="text-[9px] font-black text-yellow-600 uppercase tracking-widest mb-1">Points</p>
                        <p className="text-sm font-black text-yellow-700 dark:text-yellow-500 flex items-center justify-center gap-1">
                          <span className="material-symbols-outlined text-xs filled">stars</span>
                          {user.points}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Referral Section */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                  <span className="material-symbols-outlined text-xl">redeem</span>
                </div>
                <h3 className="font-black text-slate-900 dark:text-white tracking-tight">Referral Program</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">
                Share your unique code with friends and earn 500 points for each successful booking.
              </p>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <code className="font-mono font-black text-xl text-slate-900 dark:text-white tracking-widest">{user.referralCode}</code>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(user.referralCode || "");
                    toast.success("Code copied!");
                  }}
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Travel Stats */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                  <span className="material-symbols-outlined text-xl">insights</span>
                </div>
                <h3 className="font-black text-slate-900 dark:text-white tracking-tight">Travel Statistics</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500 font-medium">Account Created</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Oct 2023</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500 font-medium">Total Adventures</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">12 Trips</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500 font-medium">Member Tier</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase">Silver</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Settings */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-2">
              {[
                { icon: "security", label: "Security & Password", color: "text-blue-500", bg: "bg-blue-50" },
                { icon: "notifications", label: "Notification Preferences", color: "text-orange-500", bg: "bg-orange-50" },
                { icon: "payments", label: "Payment Methods", color: "text-purple-500", bg: "bg-purple-50" },
                { icon: "help", label: "Support Center", color: "text-emerald-500", bg: "bg-emerald-50" },
              ].map((item, i) => (
                <button 
                  key={i}
                  className="w-full flex items-center gap-4 p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group text-left"
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} dark:bg-slate-800 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-[10px]">{item.label}</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}