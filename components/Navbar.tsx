"use client";
import React, { useState, useEffect, useRef } from "react";
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
  const { user, setUser, language, setLanguage, t } = useTravel();

  const handleLogout = async () => {
    setUser({
      name: "",
      points: 0,
      referralCode: "",
      isLoggedIn: false,
      email: "",
      role: "USER",
    });
    await logout();
  };

  const activeUser = sessionUser
    ? { ...user, ...sessionUser }
    : user?.isLoggedIn && user?.email 
      ? user
      : null;

  const pathname = usePathname();
  const isHome = pathname === "/";
  
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return null;
  }

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: t("destinations"), href: "/destinations" },
    { name: t("packages"), href: "/packages" },
    { name: t("offers"), href: "/offers", badge: "Hot" },
    { name: t("about"), href: "/about" },
    { name: t("help"), href: "/help" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isTransparent = isHome && !isScrolled && !isMobileMenuOpen;

  return (
    <nav
      className={`fixed w-full z-[1000] transition-all duration-500 ${
        isTransparent
          ? "bg-transparent py-6"
          : "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg py-4 border-b border-slate-200/50 dark:border-slate-800/50"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-500/20">
              <span className="material-symbols-outlined text-white text-2xl font-icon">
                landscape
              </span>
            </div>
            <span
              className={`text-xl font-black tracking-tighter transition-colors duration-300 ${
                isTransparent
                  ? "text-white"
                  : "text-slate-900 dark:text-white"
              }`}
            >
              MalangTravel
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-bold transition-all hover:text-emerald-500 relative group ${
                  isTransparent
                    ? "text-white/90"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <div className={`flex bg-black/10 dark:bg-white/5 p-1 rounded-lg border border-white/10 ${isTransparent ? 'text-white' : 'text-slate-600'}`}>
              <button 
                onClick={() => setLanguage("ID")}
                className={`px-2 py-1 text-[10px] font-black rounded-md transition-all ${language === 'ID' ? 'bg-emerald-500 text-white shadow-sm' : 'opacity-50'}`}
              >
                ID
              </button>
              <button 
                onClick={() => setLanguage("EN")}
                className={`px-2 py-1 text-[10px] font-black rounded-md transition-all ${language === 'EN' ? 'bg-emerald-500 text-white shadow-sm' : 'opacity-50'}`}
              >
                EN
              </button>
            </div>

            {activeUser ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center gap-3 pl-2 pr-1 py-1 rounded-full border transition-all duration-300 ${
                    isTransparent
                      ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-emerald-500"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {activeUser.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col items-start leading-none gap-0.5">
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
                        {user.points} {t("points")}
                      </div>
                    </div>
                    {activeUser.role?.toUpperCase() === "ADMIN" ? (
                      <Link
                        href="/admin/dashboard"
                        className="block px-4 py-2 text-sm font-bold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                      >
                        Admin Dashboard
                      </Link>
                    ) : (
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        My Dashboard
                      </Link>
                    )}
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className={`hidden md:flex items-center justify-center px-5 py-2.5 rounded-xl border text-sm font-bold transition-all active:scale-95 ${
                  isTransparent
                    ? "bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                    : "bg-emerald-500 border-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-500/20"
                }`}
              >
                {t("login")}
              </Link>
            )}

            <button
              className={`lg:hidden relative z-50 p-2 ${
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
      </div>

      <div
        className={`fixed inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 lg:hidden ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-gray-900 dark:text-white text-xl font-bold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        
        {activeUser ? (
          <>
            {activeUser.role?.toUpperCase() === "ADMIN" ? (
              <Link
                href="/admin/dashboard"
                className="text-emerald-500 text-xl font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="text-gray-900 dark:text-white text-xl font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Dashboard ({user.points} Pts)
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="text-red-500 text-xl font-bold"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            href="/auth/login"
            className="px-8 py-3 rounded-full bg-emerald-500 text-white text-lg font-bold shadow-lg shadow-emerald-500/20"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("login")}
          </Link>
        )}
      </div>
    </nav>
  );
}
