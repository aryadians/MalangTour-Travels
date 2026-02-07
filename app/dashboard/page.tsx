"use client";

import React from "react";
import { useTravel } from "@/context/TravelContext";
import toast from "react-hot-toast";
import Link from "next/link";

export default function UserDashboard() {
  const { user } = useTravel();

  const handleCopyReferral = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      toast.success("Referral code copied!", { icon: "📋" });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <h2 className="text-xl font-bold text-gray-900">Please Log In</h2>
        <p className="text-gray-500">
          You need to be logged in to view your dashboard.
        </p>
        <Link
          href="/login"
          className="px-6 py-2 bg-emerald-500 text-white rounded-xl font-bold"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-gray-900">
            Welcome Back, {user.name?.split(" ")[0]}! 👋
          </h1>
          <p className="text-gray-500">
            Here is your travel summary and rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. POINTS CARD */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-white/10 transition-colors"></div>
            <div className="relative z-10">
              <p className="text-white/60 font-medium text-sm uppercase tracking-widest mb-1">
                Travel Points
              </p>
              <h2 className="text-5xl font-black mb-4 flex items-baseline gap-2">
                {user.points?.toLocaleString() || 0}
                <span className="text-xl font-medium text-yellow-400">Pts</span>
              </h2>
              <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                Redeem Rewards
              </button>
            </div>
          </div>

          {/* 2. REFERRAL CARD */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">
                    share
                  </span>
                </span>
                <h3 className="font-bold text-gray-900">Refer & Earn</h3>
              </div>
              <p className="text-gray-500 text-sm">Valid for new users only.</p>
            </div>
            <div
              onClick={handleCopyReferral}
              className="mt-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors group"
            >
              <span className="font-mono font-bold text-gray-800 tracking-wider">
                {user.referralCode || "Unknown"}
              </span>
              <span className="material-symbols-outlined text-gray-400 group-hover:text-emerald-500">
                content_copy
              </span>
            </div>
          </div>

          {/* 3. STATUS CARD */}
          <div className="bg-emerald-500 rounded-3xl p-6 text-white shadow-lg shadow-emerald-500/20 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-xl mb-1">Platinum Member</h3>
              <p className="text-emerald-100 text-sm">
                You verify for 15% discount on all mountain trips.
              </p>
            </div>
            <div className="h-2 bg-emerald-700/30 rounded-full mt-4 overflow-hidden">
              <div className="h-full w-3/4 bg-white/90 rounded-full"></div>
            </div>
            <p className="text-xs text-right mt-1 text-emerald-100">
              75% to Diamond
            </p>
          </div>
        </div>

        {/* REWARD CATALOG (Grid) */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-yellow-500">
              stars
            </span>
            Rewards Catalog
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="aspect-video bg-gray-100 rounded-xl mb-4 relative overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=400&h=300`}
                    className="w-full h-full object-cover"
                    alt="Reward"
                  />
                </div>
                <h4 className="font-bold text-gray-900">
                  Free Breakfast Voucher
                </h4>
                <p className="text-emerald-600 font-bold text-sm mt-1">
                  500 Pts
                </p>
                <button className="w-full mt-3 py-2 rounded-lg bg-gray-50 text-gray-900 font-bold text-xs hover:bg-gray-100">
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
