"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getDashboardStats } from "@/actions/admin";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getDashboardStats();
      if (result.success) {
        setData(result);
      } else {
        toast.error("Failed to fetch real-time data");
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Revenue",
      value: `Rp ${data?.stats.totalRevenue.toLocaleString("id-ID")}`,
      change: "Live Database Data",
      icon: "payments",
      color: "from-emerald-400 to-emerald-600",
    },
    {
      title: "Active Bookings",
      value: data?.stats.activeBookings.toString(),
      change: "Status: PENDING",
      icon: "book_online",
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Total Travelers",
      value: data?.stats.totalUsers.toString(),
      change: "Registered Members",
      icon: "groups",
      color: "from-purple-400 to-purple-600",
    },
    {
      title: "Avg. Rating",
      value: `${data?.stats.avgRating.toFixed(1)}/5.0`,
      change: "Customer Satisfaction",
      icon: "star",
      color: "from-yellow-400 to-orange-500",
    },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            System Overview
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">
            Real-time analytics from your premium tour database.
          </p>
        </div>
        <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-xl transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">download</span>
          Export
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/destinations"
          className="bg-emerald-500 hover:bg-emerald-600 transition-all p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-500/20 group"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md border border-white/20">
              <span className="material-symbols-outlined text-3xl">map</span>
            </div>
            <span className="material-symbols-outlined opacity-50 group-hover:translate-x-2 transition-transform">
              arrow_forward
            </span>
          </div>
          <h3 className="text-xl font-black uppercase tracking-tight">Destinations</h3>
          <p className="text-emerald-100 text-sm mt-2 font-medium">
            Manage your high-end inventory and tour packages.
          </p>
        </Link>

        <Link
          href="/admin/bookings"
          className="bg-slate-900 hover:bg-black transition-all p-8 rounded-[2.5rem] text-white shadow-xl shadow-black/10 group"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
              <span className="material-symbols-outlined text-3xl">confirmation_number</span>
            </div>
            <span className="material-symbols-outlined opacity-50 group-hover:translate-x-2 transition-transform">
              arrow_forward
            </span>
          </div>
          <h3 className="text-xl font-black uppercase tracking-tight">Reservations</h3>
          <p className="text-slate-400 text-sm mt-2 font-medium">
            Monitor and confirm incoming travel requests.
          </p>
        </Link>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 group relative overflow-hidden">
           <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400">
                  <span className="material-symbols-outlined text-3xl">verified_user</span>
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Security</h3>
              <p className="text-slate-400 text-sm mt-2 font-medium">
                System access and administrator logs.
              </p>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group"
          >
            <div className="relative z-10">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg mb-6`}
              >
                <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.title}</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                {stat.value}
              </h3>
              <p className="text-[10px] font-bold text-emerald-500 mt-4 flex items-center gap-1 uppercase tracking-widest">
                {stat.change}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              Recent Activity
            </h3>
            <Link
              href="/admin/bookings"
              className="text-emerald-500 text-xs font-black uppercase tracking-widest hover:underline"
            >
              Review All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-50 dark:border-slate-800">
                  <th className="pb-6 px-4">Guest</th>
                  <th className="pb-6 px-4">Destination</th>
                  <th className="pb-6 px-4 text-right">Revenue</th>
                  <th className="pb-6 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {data?.recentBookings.map((booking: any) => (
                  <tr key={booking.id} className="group">
                    <td className="py-6 px-4">
                      <p className="font-black text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors uppercase tracking-tight">{booking.user.name}</p>
                    </td>
                    <td className="py-6 px-4">
                      <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{booking.destination.name}</p>
                    </td>
                    <td className="py-6 px-4 text-right">
                      <p className="font-black text-slate-900 dark:text-white">Rp {booking.totalPrice.toLocaleString("id-ID")}</p>
                    </td>
                    <td className="py-6 px-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                        booking.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}