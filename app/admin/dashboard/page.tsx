import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  // Fetch real data
  const totalRevenue = await prisma.booking.aggregate({
    _sum: { totalPrice: true },
    where: { status: "CONFIRMED" },
  });

  const activeBookingsCount = await prisma.booking.count({
    where: { status: { in: ["PENDING", "CONFIRMED"] } },
  });

  const newUsersCount = await prisma.user.count();

  // Get recent bookings
  const recentBookings = await prisma.booking.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      destination: true,
    },
  });

  const stats = [
    {
      title: "Total Revenue",
      value: `Rp ${(totalRevenue._sum.totalPrice || 0).toLocaleString("id-ID")}`,
      change: "+Today", // Dynamic diff would require more queries
      icon: "payments",
      color: "bg-emerald-500",
    },
    {
      title: "Active Bookings",
      value: activeBookingsCount.toString(),
      change: "Active",
      icon: "book_online",
      color: "bg-blue-500",
    },
    {
      title: "Total Users",
      value: newUsersCount.toString(),
      change: "All time",
      icon: "group",
      color: "bg-purple-500",
    },
    {
      title: "Pending Status",
      value: (
        await prisma.booking.count({ where: { status: "PENDING" } })
      ).toString(),
      change: "Action needed",
      icon: "pending_actions",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard Overview
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <h3
                  className="text-lg font-black text-gray-800 dark:text-white truncate max-w-[150px]"
                  title={stat.value}
                >
                  {stat.value}
                </h3>
              </div>
              <div
                className={`p-3 rounded-lg ${stat.color} text-white shadow-lg shadow-gray-200 dark:shadow-none`}
              >
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="font-bold text-emerald-500">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 dark:text-white">
              Recent Bookings
            </h3>
            <Link
              href="/admin/bookings"
              className="text-sm text-emerald-500 font-bold hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentBookings.length === 0 ? (
              <p className="text-gray-500 text-sm">No bookings yet.</p>
            ) : (
              recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-500 uppercase">
                      {booking.user?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 dark:text-white">
                        {booking.user?.name || "Unknown User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {booking.destination.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        booking.status === "PENDING"
                          ? "bg-blue-100 text-blue-600"
                          : booking.status === "CONFIRMED"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
