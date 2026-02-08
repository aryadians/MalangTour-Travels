"use client";

import React from "react";

export default function DashboardPage() {
  return (
    <div className="bg-[#f0f4f3] dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-surface-dark border-r border-slate-200 dark:border-slate-700 hidden lg:flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">
              landscape
            </span>
            <h2 className="text-[#111816] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              Malang Premium Tours
            </h2>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Menu
          </div>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl font-medium transition-colors"
          >
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl font-medium transition-colors"
          >
            <span className="material-symbols-outlined">airplane_ticket</span>
            My Trips
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl font-medium transition-colors"
          >
            <span className="material-symbols-outlined">favorite</span>
            Wishlist
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl font-medium transition-colors"
          >
            <span className="material-symbols-outlined">reviews</span>
            My Reviews
          </a>
          <div className="px-4 py-2 mt-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Settings
          </div>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl font-medium transition-colors"
          >
            <span className="material-symbols-outlined">person</span>
            Profile
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl font-medium transition-colors"
          >
            <span className="material-symbols-outlined">settings</span>
            Preferences
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl font-medium transition-colors"
          >
            <span className="material-symbols-outlined">credit_card</span>
            Payment Methods
          </a>
        </nav>
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl font-medium transition-colors"
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </a>
        </div>
      </aside>
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-700 h-16 flex items-center justify-between px-4 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">
              landscape
            </span>
            <h2 className="text-lg font-bold">Malang Premium Tours</h2>
          </div>
          <button className="text-slate-900 dark:text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Welcome back, Alex! 👋
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Here's what's happening with your travel plans.
              </p>
            </div>
            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm shadow-primary/20">
              <span className="material-symbols-outlined">add</span>
              Plan New Trip
            </button>
          </div>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined">
                  flight_takeoff
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Total Trips
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  12
                </h3>
              </div>
            </div>
            <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined">upcoming</span>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Upcoming
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  2
                </h3>
              </div>
            </div>
            <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                <span className="material-symbols-outlined">
                  monetization_on
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Total Spent
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  $4,250
                </h3>
              </div>
            </div>
            <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                <span className="material-symbols-outlined">star</span>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Loyalty Points
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  850
                </h3>
              </div>
            </div>
          </div>
          {/* Recent Trips & Upcoming */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Bookings (Left 2/3) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Recent Bookings
                </h2>
                <a
                  href="#"
                  className="text-primary font-medium text-sm hover:underline"
                >
                  View All
                </a>
              </div>
              <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
                        <th className="py-4 px-6 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                          Destination
                        </th>
                        <th className="py-4 px-6 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                          Date
                        </th>
                        <th className="py-4 px-6 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                          Price
                        </th>
                        <th className="py-4 px-6 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                          Status
                        </th>
                        <th className="py-4 px-6 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-lg bg-cover bg-center shrink-0"
                              style={{
                                backgroundImage:
                                  "url('https://lh3.googleusercontent.com/p/AF1QipN3X-x2X2x2X2x2X2x2X2x2X2x2X2x2X2x2X2')",
                              }}
                            ></div>
                            <span className="font-medium text-slate-900 dark:text-white">
                              Mount Bromo Sunrise
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300">
                          Aug 24, 2023
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-900 dark:text-white font-medium">
                          $120.00
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Confirmed
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button className="text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">
                              more_vert
                            </span>
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-lg bg-cover bg-center shrink-0"
                              style={{
                                backgroundImage:
                                  "url('https://lh3.googleusercontent.com/p/AF1QipN3X-x2X2x2X2x2X2x2X2x2X2x2X2x2X2x2X2')",
                              }}
                            ></div>
                            <span className="font-medium text-slate-900 dark:text-white">
                              Tumpak Sewu Waterfall
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300">
                          Sep 02, 2023
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-900 dark:text-white font-medium">
                          $85.00
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                            Pending
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button className="text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">
                              more_vert
                            </span>
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-lg bg-cover bg-center shrink-0"
                              style={{
                                backgroundImage:
                                  "url('https://lh3.googleusercontent.com/p/AF1QipN3X-x2X2x2X2x2X2x2X2x2X2x2X2x2X2x2X2')",
                              }}
                            ></div>
                            <span className="font-medium text-slate-900 dark:text-white">
                              Malang City Tour
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300">
                          Jul 15, 2023
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-900 dark:text-white font-medium">
                          $45.00
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                            Completed
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button className="text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">
                              more_vert
                            </span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Next Trip Card (Right 1/3) */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Next Trip
              </h2>
              <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden p-6 relative">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <span className="material-symbols-outlined text-9xl text-primary">
                    flight_takeoff
                  </span>
                </div>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-4">
                  In 3 Days
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  Mount Bromo Sunrise
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                  Experience the magical sunrise over the volcanic landscape.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">
                      calendar_today
                    </span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Aug 24, 2023 • 11:30 PM
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">
                      location_on
                    </span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Malang City Center Pickup
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">
                      group
                    </span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      2 Adults
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-sm">
                    View Ticket
                  </button>
                  <button className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-3 rounded-xl font-bold text-sm transition-all">
                    Details
                  </button>
                </div>
              </div>
              {/* Promotion / Upsell */}
              <div
                className="rounded-2xl p-6 text-white relative overflow-hidden flex flex-col justify-end min-h-[200px]"
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('https://lh3.googleusercontent.com/p/AF1QipN3X-x2X2x2X2x2X2x2X2x2X2x2X2x2X2x2X2')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h3 className="text-xl font-bold mb-2 relative z-10">
                  Explore Ijen Crater
                </h3>
                <p className="text-sm text-slate-200 mb-4 relative z-10">
                  Witness the blue fire phenomenon. Book now for 10% off.
                </p>
                <button className="bg-white text-slate-900 py-2 px-4 rounded-lg font-bold text-sm self-start hover:bg-slate-100 transition-colors relative z-10">
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
