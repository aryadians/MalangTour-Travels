"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/auth";
import { getDashboardStats } from "@/actions/admin";
import toast from "react-hot-toast";

export default function AdminLayoutClient({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);

  React.useEffect(() => {
    async function fetchStats() {
      const result = await getDashboardStats();
      if (result.success) {
        setPendingCount(result.stats.activeBookings);
      }
    }
    fetchStats();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = () => {
    if (pendingCount > 0) {
      toast(`You have ${pendingCount} pending bookings to review!`, {
        icon: '🔔',
        duration: 4000,
      });
    } else {
      toast("No new notifications", { icon: '📭' });
    }
  };

  const menuItems = [
    { name: "Overview", icon: "dashboard", href: "/admin/dashboard" },
    { name: "Destinations", icon: "map", href: "/admin/destinations" },
    { name: "Bookings", icon: "book_online", href: "/admin/bookings" },
    { name: "Reviews", icon: "reviews", href: "/admin/reviews" },
    { name: "Vouchers", icon: "confirmation_number", href: "/admin/vouchers" },
    { name: "Users", icon: "group", href: "/admin/users" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-sans text-slate-800 dark:text-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col z-20`}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="material-symbols-outlined text-emerald-500 text-3xl">
              landscape
            </span>
            {isSidebarOpen && (
              <span className="font-bold text-lg tracking-tight dark:text-white">
                Admin<span className="text-emerald-500">Panel</span>
              </span>
            )}
          </Link>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {isSidebarOpen && <span className="text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <form action={logout}>
            <button className="flex items-center gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 w-full px-3 py-2 rounded-lg transition-colors">
              <span className="material-symbols-outlined">logout</span>
              {isSidebarOpen && (
                <span className="font-medium text-sm">Logout</span>
              )}
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 shadow-sm z-10">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleNotificationClick}
              className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all active:scale-90"
            >
              <span className="material-symbols-outlined">notifications</span>
              {pendingCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-gray-800">
                  {pendingCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {user?.name || "Admin"}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
