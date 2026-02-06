import React from "react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "Rp 125.5M",
      change: "+12.5%",
      icon: "payments",
      color: "bg-emerald-500",
    },
    {
      title: "Active Bookings",
      value: "84",
      change: "+5.2%",
      icon: "book_online",
      color: "bg-blue-500",
    },
    {
      title: "New Users",
      value: "1,240",
      change: "+18.2%",
      icon: "group_add",
      color: "bg-purple-500",
    },
    {
      title: "Pending Reviews",
      value: "12",
      change: "-2.5%",
      icon: "reviews",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard Overview
        </h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 shadow-sm">
            Export Report
          </button>
        </div>
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
                <h3 className="text-2xl font-black text-gray-800 dark:text-white">
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
              <span
                className={`font-bold ${stat.change.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}
              >
                {stat.change}
              </span>
              <span className="text-gray-400 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
        {/* Revenue Chart (Mock) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-800 dark:text-white mb-6">
            Revenue Analytics
          </h3>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[40, 65, 45, 80, 55, 90, 75, 85, 60, 95, 80, 100].map((h, i) => (
              <div
                key={i}
                className="w-full bg-emerald-100 dark:bg-emerald-900/30 rounded-t-lg relative group"
              >
                <div
                  style={{ height: `${h}%` }}
                  className="bg-emerald-500 absolute bottom-0 w-full rounded-t-lg group-hover:bg-emerald-400 transition-colors"
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-400 font-medium">
            <span>Jan</span>
            <span>Fab</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <h3 className="font-bold text-gray-800 dark:text-white mb-6">
            Recent Bookings
          </h3>
          <div className="space-y-4">
            {[
              {
                user: "Sarah J.",
                dest: "Bromo Sunrise",
                time: "2m ago",
                status: "New",
              },
              {
                user: "Budi Santoso",
                dest: "Tumpak Sewu",
                time: "15m ago",
                status: "Confirmed",
              },
              {
                user: "Michael Chen",
                dest: "Ijen Crater",
                time: "1h ago",
                status: "Pending",
              },
              {
                user: "Jessica W.",
                dest: "Malang City",
                time: "3h ago",
                status: "Confirmed",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-500">
                    {item.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-white">
                      {item.user}
                    </p>
                    <p className="text-xs text-gray-500">{item.dest}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                      item.status === "New"
                        ? "bg-blue-100 text-blue-600"
                        : item.status === "Confirmed"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {item.status}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
