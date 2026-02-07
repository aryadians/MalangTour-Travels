"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  // Mock Data for Premium Feel
  const stats = [
    {
      title: "Total Revenue",
      value: "Rp 156.450.000",
      change: "+12.5% vs last month",
      icon: "payments",
      color: "from-emerald-400 to-emerald-600",
    },
    {
      title: "Active Bookings",
      value: "24",
      change: "+4 new today",
      icon: "book_online",
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Total Travelers",
      value: "1,240",
      change: "+18% vs last month",
      icon: "groups",
      color: "from-purple-400 to-purple-600",
    },
    {
      title: "Avg. Rating",
      value: "4.9/5.0",
      change: "Top Rated Agency",
      icon: "star",
      color: "from-yellow-400 to-orange-500",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      user: "Sarah Wijaya",
      destination: "Bromo Sunrise",
      date: "2 mins ago",
      status: "PENDING",
      price: "Rp 350.000",
    },
    {
      id: 2,
      user: "Budi Santoso",
      destination: "Malang Night Paradise",
      date: "1 hour ago",
      status: "CONFIRMED",
      price: "Rp 150.000",
    },
    {
      id: 3,
      user: "John Doe",
      destination: "Tumpak Sewu Waterfall",
      date: "3 hours ago",
      status: "CONFIRMED",
      price: "Rp 600.000",
    },
    {
      id: 4,
      user: "Linda Kusuma",
      destination: "Batu Secret Zoo",
      date: "5 hours ago",
      status: "CANCELLED",
      price: "Rp 120.000",
    },
    {
      id: 5,
      user: "Ahmad Rizky",
      destination: "Semeru Trekking",
      date: "1 day ago",
      status: "CONFIRMED",
      price: "Rp 1.250.000",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back, Administrator. Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">download</span>
          Download Report
        </button>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/destinations"
          className="bg-emerald-500 hover:bg-emerald-600 transition-colors p-6 rounded-3xl text-white shadow-lg shadow-emerald-500/20 group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <span className="material-symbols-outlined text-2xl">map</span>
            </div>
            <span className="material-symbols-outlined opacity-50 group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
          <h3 className="text-lg font-bold">Manage Destinations</h3>
          <p className="text-emerald-100 text-sm mt-1">
            Add, edit, or remove tour packages.
          </p>
        </Link>

        <Link
          href="/admin/bookings"
          className="bg-blue-500 hover:bg-blue-600 transition-colors p-6 rounded-3xl text-white shadow-lg shadow-blue-500/20 group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <span className="material-symbols-outlined text-2xl">
                book_online
              </span>
            </div>
            <span className="material-symbols-outlined opacity-50 group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
          <h3 className="text-lg font-bold">Manage Bookings</h3>
          <p className="text-blue-100 text-sm mt-1">
            View and update customer reservations.
          </p>
        </Link>

        <div className="bg-purple-500 hover:bg-purple-600 transition-colors p-6 rounded-3xl text-white shadow-lg shadow-purple-500/20 group cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <span className="material-symbols-outlined text-2xl">group</span>
            </div>
            <span className="material-symbols-outlined opacity-50 group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
          <h3 className="text-lg font-bold">User Management</h3>
          <p className="text-purple-100 text-sm mt-1">
            Manage registered users (Coming Soon).
          </p>
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
            className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
          >
            <div className="relative z-10">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg mb-4`}
              >
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <p className="text-sm font-medium text-gray-400">{stat.title}</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {stat.value}
              </h3>
              <p className="text-xs font-bold text-emerald-500 mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  trending_up
                </span>
                {stat.change}
              </p>
            </div>
            {/* Decoration */}
            <div
              className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}
            ></div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Section (Simulated) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Revenue Analytics
            </h3>
            <select className="bg-gray-50 border-none rounded-lg text-xs font-bold text-gray-500 outline-none p-2">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>

          {/* Simple CSS Chart Mockup */}
          <div className="h-64 flex items-end justify-between gap-2 md:gap-4 pt-10 border-b border-gray-100 dark:border-gray-700 relative">
            <div className="absolute inset-x-0 bottom-0 h-full flex flex-col justify-between text-xs text-gray-300 pointer-events-none">
              <span>Rp 500k</span>
              <span>Rp 250k</span>
              <span>0</span>
            </div>
            {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
              <div
                key={i}
                className="w-full bg-emerald-100 dark:bg-emerald-900/30 rounded-t-xl relative group z-10 transition-all hover:bg-emerald-200 dark:hover:bg-emerald-900/50"
                style={{ height: `${h}%` }}
              >
                <div
                  className="absolute bottom-0 w-full bg-emerald-500 rounded-t-xl transition-all duration-1000"
                  style={{ height: `${h * 0.7}%` }}
                ></div>
                <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded shadow-lg transition-opacity whitespace-nowrap">
                  Rp {h * 10}.000
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs font-bold text-gray-400 uppercase">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Recent Bookings List */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Activity
            </h3>
            <Link
              href="/admin/bookings"
              className="text-emerald-500 text-xs font-bold hover:underline"
            >
              See All
            </Link>
          </div>

          <div className="space-y-6">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold bg-gray-100 text-gray-600`}
                >
                  {booking.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    {booking.user}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    booked{" "}
                    <span className="text-emerald-600">
                      {booking.destination}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-900 dark:text-white">
                    {booking.price}
                  </p>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      booking.status === "CONFIRMED"
                        ? "bg-emerald-100 text-emerald-600"
                        : booking.status === "PENDING"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 transition-colors">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
