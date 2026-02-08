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
  const { user, setUser, language, setLanguage, currency, setCurrency } =
    useTravel();

  const handleLogout = async () => {
    // 1. Clear Client State
    setUser({
      name: "",
      points: 0,
      referralCode: "",
      isLoggedIn: false,
      email: "",
      role: "USER",
    });
    // 2. Call Server Action
    await logout();
  };

  // Merge session user with context user (Context user has points/loyalty data)
  // Logic: Session takes precedence for auth state.
  // If session exists, user is logged in.
  // If no session, check if context has explicit isLoggedIn=true (for client-side only flows if any)
  const activeUser = sessionUser
    ? { ...user, ...sessionUser }
    : user?.isLoggedIn && user?.email // Ensure we have at least an email if relying on context
      ? user
      : null;

  const pathname = usePathname();

  // Hide Navbar on Dashboard and Admin pages (they have their own layouts)
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return null;
  }

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
  const isTransparent =
    pathname === "/" && !isScrolled && !pathname.includes("/auth");

  const navClasses = `fixed top-0 left-0 right-0 z-[999] w-full px-6 py-4 ${
    isTransparent
      ? "bg-transparent text-white"
      : "bg-[#ffffff] shadow-md text-[#000000] border-b border-gray-200"
  }`;

  const linkClasses = `text-sm font-medium ${
    isTransparent
      ? "text-white/90 hover:text-white drop-shadow-sm"
      : "text-[#000000] hover:text-emerald-600"
  }`;

  const logoTextClasses = `text-xl font-bold tracking-tight ${
    isTransparent ? "text-white" : "text-[#047857]"
  }`;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Packages", href: "/packages" },
    { name: "Offers", href: "/offers", badge: "Hot" },
    { name: "About", href: "/about" },
    { name: "Help", href: "/help" },
  ];

  const profileRef = React.useRef<HTMLDivElement>(null);

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

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <span className="material-symbols-outlined text-white text-2xl">
                landscape
              </span>
            </div>
            <span
              className={`text-xl font-bold ${
                isScrolled || isMobileMenuOpen
                  ? "text-gray-900 dark:text-white"
                  : "text-white"
              }`}
            >
              MalangTravel
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-emerald-500 relative group ${
                  isScrolled
                    ? "text-gray-600 dark:text-gray-300"
                    : "text-gray-200"
                }`}
              >
                {link.name}
                {link.badge && (
                  <span className="absolute -top-3 -right-6 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full animate-bounce">
                    {link.badge}
                  </span>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth / Profile */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 mr-4 border-r border-gray-200/20 pr-4">
              <button
                onClick={() => setLanguage(language === "ID" ? "EN" : "ID")}
                className={`text-xs font-bold ${
                  isScrolled
                    ? "text-gray-600 dark:text-gray-300"
                    : "text-gray-200"
                } hover:text-emerald-500 transition-colors w-6`}
              >
                {language}
              </button>
              <div
                className={`w-px h-3 ${
                  isScrolled ? "bg-gray-300 dark:bg-gray-700" : "bg-white/20"
                }`}
              ></div>
              <button
                onClick={() => setCurrency(currency === "IDR" ? "USD" : "IDR")}
                className={`text-xs font-bold ${
                  isScrolled
                    ? "text-gray-600 dark:text-gray-300"
                    : "text-gray-200"
                } hover:text-emerald-500 transition-colors w-8`}
              >
                {currency}
              </button>
            </div>

            {activeUser ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center gap-3 pl-2 pr-1 py-1 rounded-full border transition-all ${
                    isScrolled
                      ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:border-emerald-500"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20"
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
                        {user.points} Travel Points
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
                    <div className="px-4 py-1 text-[10px] text-gray-400 font-mono uppercase border-t border-gray-50 dark:border-gray-800 mt-1">
                      Role: {activeUser.role}
                    </div>
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
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
