"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/auth";
import { useTravel } from "@/context/TravelContext";

interface NavbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string;
  } | null;
}

export default function Navbar({ user: sessionUser }: NavbarProps) {
  const { user, language, setLanguage, currency, setCurrency } = useTravel();

  // Merge session user with context user (Context user has points/loyalty data)
  // If sessionUser exists, we use its name/email/role but overlay the context points
  const activeUser = sessionUser ? { ...user, ...sessionUser } : null;

  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic styling based on route and scroll state
  const isTransparent = isHome && !isScrolled;

  const navClasses = `fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 transition-all duration-300 ${
    isTransparent
      ? "bg-transparent text-white"
      : "bg-white/90 backdrop-blur-md shadow-sm text-gray-900 dark:bg-gray-900/90 dark:text-white border-b border-gray-100 dark:border-gray-800"
  }`;

  const linkClasses = `text-sm font-medium transition-all ${
    isTransparent
      ? "text-white/90 hover:text-white drop-shadow-sm"
      : "text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
  }`;

  const logoTextClasses = `text-xl font-bold tracking-tight ${
    isTransparent ? "text-white" : "text-emerald-600 dark:text-white"
  }`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group cursor-pointer relative z-50"
        >
          <div
            className={`size-8 rounded-lg flex items-center justify-center border transition-transform group-hover:scale-105 ${
              isTransparent
                ? "bg-primary/20 backdrop-blur-sm border-white/20 text-white"
                : "bg-emerald-100 border-emerald-200 text-emerald-600 dark:bg-emerald-900 dark:border-emerald-700 dark:text-emerald-400"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "20px" }}
            >
              landscape
            </span>
          </div>
          <h1 className={logoTextClasses}>MalangTravel</h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className={linkClasses}>
            Home
          </Link>
          <Link href="/packages" className={linkClasses}>
            Packages
          </Link>
          <Link
            href="/offers"
            className={`${linkClasses} flex items-center gap-1`}
          >
            Offers
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
              Hot
            </span>
          </Link>
          <Link href="/about" className={linkClasses}>
            About
          </Link>
          <Link href="/help" className={linkClasses}>
            Help
          </Link>

          {activeUser?.role === "ADMIN" && (
            <Link
              href="/admin/destinations"
              className="text-emerald-500 text-sm font-bold hover:text-emerald-600 transition-all"
            >
              Admin Dashboard
            </Link>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Currency & Language Switcher (Desktop) */}
          <div className="hidden md:flex items-center gap-2 mr-2">
            <button
              onClick={() => setLanguage(language === "ID" ? "EN" : "ID")}
              className={`text-xs font-bold px-2 py-1 rounded-md transition-all ${
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {language}
            </button>
            <div
              className={`h-4 w-[1px] ${isTransparent ? "bg-white/30" : "bg-gray-300"}`}
            ></div>
            <button
              onClick={() => setCurrency(currency === "IDR" ? "USD" : "IDR")}
              className={`text-xs font-bold px-2 py-1 rounded-md transition-all ${
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {currency}
            </button>
          </div>

          {activeUser ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
                  isTransparent
                    ? "bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 text-white"
                    : "bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white/30">
                  {activeUser.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex flex-col items-start leading-none pr-2">
                  <span className="text-xs font-medium max-w-[80px] truncate">
                    {activeUser.name?.split(" ")[0]}
                  </span>
                  <span className="text-[10px] opacity-80 font-bold text-yellow-500 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[10px]">
                      stars
                    </span>
                    {user.points} Pts
                  </span>
                </div>
                <span className="material-symbols-outlined text-sm">
                  expand_more
                </span>
              </button>

              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden py-1 z-50 animate-in fade-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-800">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                      {activeUser.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {activeUser.email}
                    </p>
                    <div className="mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md inline-block">
                      {user.points} Travel Points
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/rewards"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Reward Catalog
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className={`hidden md:flex items-center justify-center px-5 py-2.5 rounded-xl border text-sm font-bold transition-all active:scale-95 ${
                isTransparent
                  ? "bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                  : "bg-emerald-500 border-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-500/20"
              }`}
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden relative z-50 p-2 ${
              isTransparent ? "text-white" : "text-gray-900 dark:text-white"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <Link
          href="/"
          className="text-gray-900 dark:text-white text-xl font-bold"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/packages"
          className="text-gray-900 dark:text-white text-xl font-bold"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Packages
        </Link>
        <Link
          href="/offers"
          className="text-gray-900 dark:text-white text-xl font-bold"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Offers
        </Link>
        <Link
          href="/about"
          className="text-gray-900 dark:text-white text-xl font-bold"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          About
        </Link>
        <Link
          href="/help"
          className="text-gray-900 dark:text-white text-xl font-bold"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Help
        </Link>
        {activeUser ? (
          <>
            <Link
              href="/dashboard"
              className="text-gray-900 dark:text-white text-xl font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard ({user.points} Pts)
            </Link>
            <button
              onClick={() => logout()}
              className="text-red-500 text-xl font-bold"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="px-8 py-3 rounded-full bg-emerald-500 text-white text-lg font-bold shadow-lg shadow-emerald-500/20"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
