"use client";
import React, { useState } from "react";
import Link from "next/link";
import { logout } from "@/actions/auth";

interface NavbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string;
  } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full px-6 py-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group cursor-pointer relative z-50"
        >
          <div className="size-8 text-white bg-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 transition-transform group-hover:scale-105">
            <span
              className="material-symbols-outlined text-white"
              style={{ fontSize: "20px" }}
            >
              landscape
            </span>
          </div>
          <h1 className="text-white text-xl font-bold tracking-tight drop-shadow-md">
            MalangTravel
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-white/90 text-sm font-medium hover:text-white hover:underline decoration-primary decoration-2 underline-offset-8 transition-all drop-shadow-sm"
          >
            Home
          </Link>

          <div className="relative group">
            <button className="flex items-center gap-1 text-white/90 text-sm font-medium hover:text-white transition-all drop-shadow-sm focus:outline-none">
              Destinations
              <span className="material-symbols-outlined text-lg transition-transform duration-200 group-hover:rotate-180">
                expand_more
              </span>
            </button>

            {/* Dropdown - Added invisible bridge and better positioning */}
            <div className="absolute top-full left-0 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden ring-1 ring-black/5">
                <div className="py-2 flex flex-col">
                  <Link
                    href="#"
                    className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">
                      beach_access
                    </span>{" "}
                    Beaches
                  </Link>
                  <Link
                    href="#"
                    className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">
                      hiking
                    </span>{" "}
                    Mountains
                  </Link>
                  <Link
                    href="#"
                    className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">
                      location_city
                    </span>{" "}
                    City Tours
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="#"
            className="text-white/90 text-sm font-medium hover:text-white transition-all drop-shadow-sm"
          >
            Packages
          </Link>
          <Link
            href="#"
            className="text-white/90 text-sm font-medium hover:text-white transition-all drop-shadow-sm"
          >
            Contact
          </Link>
          {user?.role === "ADMIN" && (
            <Link
              href="/admin/destinations"
              className="text-emerald-400 text-sm font-bold hover:text-emerald-300 transition-all drop-shadow-sm"
            >
              Admin Dashboard
            </Link>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white/30">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="text-white text-sm font-medium pr-2 max-w-[100px] truncate">
                  {user.name?.split(" ")[0]}
                </span>
                <span className="material-symbols-outlined text-white text-sm">
                  expand_more
                </span>
              </button>

              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl overflow-hidden py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/bookings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:flex items-center justify-center px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-all active:scale-95"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50 text-white p-2"
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
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <Link
          href="/"
          className="text-white text-2xl font-bold"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </Link>
        {user ? (
          <>
            <Link href="/profile" className="text-white text-xl font-bold">
              My Profile
            </Link>
            <button
              onClick={() => logout()}
              className="text-red-400 text-xl font-bold"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="px-8 py-3 rounded-full bg-primary text-white text-lg font-bold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
