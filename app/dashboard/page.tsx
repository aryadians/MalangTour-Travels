"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { logout, getMe } from "@/actions/auth";
import { getUserBookings } from "@/actions/booking";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getMe();
        if (!userData) {
          router.push("/auth/login");
          return;
        }
        setUser(userData);

        const bookingsData = await getUserBookings();
        if (bookingsData.success) {
          setBookings(bookingsData.bookings || []);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4f3] dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="bg-[#f0f4f3] dark:bg-slate-950 font-display text-slate-900 dark:text-white min-h-screen flex">
      <DashboardSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white dark:bg-[#1a2c26] border-b border-slate-200 dark:border-slate-700 h-16 flex items-center justify-between px-4 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl font-icon">
              landscape
            </span>
            <h2 className="text-lg font-bold">Malang Premium</h2>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-slate-900 dark:text-white p-2"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex-1 overflow-y-auto p-4 md:p-8"
        >
          {/* Welcome Section */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Welcome back, {user?.name?.split(' ')[0] || 'Traveler'}! 👋
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-lg">
                Here's what's happening with your travel plans.
              </p>
            </div>
            <Link href="/destinations" className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-primary/25 hover:scale-105 active:scale-95">
              <span className="material-symbols-outlined">add</span>
              Plan New Trip
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-[#1a2c26] p-6 rounded-3xl border border-white dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center gap-4 transition-transform hover:scale-[1.02]">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">flight_takeoff</span>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Trips</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{bookings.length}</h3>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a2c26] p-6 rounded-3xl border border-white dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center gap-4 transition-transform hover:scale-[1.02]">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">upcoming</span>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Upcoming</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {bookings.filter(b => new Date(b.date) > new Date()).length}
                </h3>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a2c26] p-6 rounded-3xl border border-white dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center gap-4 transition-transform hover:scale-[1.02]">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">monetization_on</span>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Spent</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  ${bookings.reduce((acc, b) => acc + b.totalPrice, 0).toLocaleString()}
                </h3>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a2c26] p-6 rounded-3xl border border-white dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center gap-4 transition-transform hover:scale-[1.02]">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">star</span>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Loyalty Points</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.points || 0}</h3>
              </div>
            </div>
          </motion.div>

          {/* Recent Trips & Upcoming */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Bookings (Left 2/3) */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Recent Bookings
                </h2>
                <Link href="/bookings" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                  View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <div className="bg-white dark:bg-[#1a2c26] rounded-3xl border border-white dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
                        <th className="py-5 px-6 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-widest">Destination</th>
                        <th className="py-5 px-6 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-widest">Date</th>
                        <th className="py-5 px-6 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-widest">Price</th>
                        <th className="py-5 px-6 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-widest">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      {bookings.length > 0 ? (
                        bookings.slice(0, 5).map((booking) => {
                          let displayImage = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000";
                          try {
                            const parsed = typeof booking.destination.images === 'string' ? JSON.parse(booking.destination.images) : booking.destination.images;
                            if (Array.isArray(parsed) && parsed.length > 0) displayImage = parsed[0];
                          } catch (e) {}

                          return (
                            <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-3">
                                  <div
                                    className="w-12 h-12 rounded-xl bg-cover bg-center shrink-0 shadow-sm"
                                    style={{ backgroundImage: `url('${displayImage}')` }}
                                  ></div>
                                  <span className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                                    {booking.destination.name}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300 font-medium">
                                {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </td>
                              <td className="py-4 px-6 text-sm text-slate-900 dark:text-white font-bold">
                                Rp {booking.totalPrice.toLocaleString('id-ID')}
                              </td>
                              <td className="py-4 px-6">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                                  booking.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                  booking.status === 'PENDING' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                }`}>
                                  {booking.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-12 text-center text-slate-500 dark:text-slate-400">
                            <div className="flex flex-col items-center gap-2">
                              <span className="material-symbols-outlined text-4xl opacity-20">inventory_2</span>
                              <p>No bookings found yet.</p>
                              <Link href="/destinations" className="text-primary font-bold hover:underline">Explore destinations</Link>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Next Trip Card (Right 1/3) */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Next Trip</h2>
              {(() => {
                const nextTrip = bookings.filter(b => new Date(b.date) >= new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
                
                if (nextTrip) {
                  const daysLeft = Math.ceil((new Date(nextTrip.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  let displayImage = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000";
                  try {
                    const parsed = typeof nextTrip.destination.images === 'string' ? JSON.parse(nextTrip.destination.images) : nextTrip.destination.images;
                    if (Array.isArray(parsed) && parsed.length > 0) displayImage = parsed[0];
                  } catch (e) {}

                  return (
                    <div className="bg-white dark:bg-[#1a2c26] rounded-3xl border border-white dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden p-6 relative group">
                      <div className="absolute inset-0 z-0">
                        <img src={displayImage} className="w-full h-full object-cover opacity-10 group-hover:scale-110 transition-transform duration-700" alt="" />
                      </div>
                      <div className="relative z-10">
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-black rounded-full mb-4 uppercase tracking-wider">
                          {daysLeft <= 0 ? "Today" : `In ${daysLeft} Days`}
                        </span>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
                          {nextTrip.destination.name}
                        </h3>
                        <div className="space-y-4 my-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                              <span className="material-symbols-outlined text-slate-400 text-sm">calendar_today</span>
                            </div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                              {new Date(nextTrip.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                              <span className="material-symbols-outlined text-slate-400 text-sm">group</span>
                            </div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{nextTrip.pax} Person(s)</span>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Link href="/bookings" className="flex-1 bg-primary hover:bg-primary/90 text-white py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-primary/20 text-center">
                            View Ticket
                          </Link>
                          <Link href={`/destinations/${nextTrip.destination.slug}`} className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-3.5 rounded-2xl font-bold text-sm transition-all text-center">
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="bg-white dark:bg-[#1a2c26] rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center">
                    <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-2">event_busy</span>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">No upcoming trips planned.</p>
                    <Link href="/destinations" className="inline-block bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm">
                      Book a Trip
                    </Link>
                  </div>
                );
              })()}

              {/* Referral Card */}
              <div className="bg-gradient-to-br from-primary to-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-primary/20">
                <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <h3 className="text-2xl font-black mb-2 relative z-10">Earn Points!</h3>
                <p className="text-white/80 text-sm mb-6 relative z-10 font-medium">
                  Invite your friends and get 500 points for each referral.
                </p>
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between mb-6 relative z-10 border border-white/20">
                  <span className="font-mono font-bold tracking-wider">{user?.referralCode || 'REF-12345'}</span>
                  <button onClick={() => {
                    navigator.clipboard.writeText(user?.referralCode || 'REF-12345');
                    toast.success("Code copied!");
                  }} className="text-xs bg-white text-primary px-3 py-1.5 rounded-lg font-black uppercase hover:bg-slate-100 transition-colors">Copy</button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}