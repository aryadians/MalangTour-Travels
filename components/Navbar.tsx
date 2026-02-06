"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden md:flex items-center justify-center px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-all active:scale-95"
          >
            Login
          </Link>

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
        <Link
          href="#"
          className="text-white text-2xl font-bold"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Destinations
        </Link>
        <Link
          href="#"
          className="text-white text-2xl font-bold"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Packages
        </Link>
        <Link
          href="#"
          className="text-white text-2xl font-bold"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Contact
        </Link>
        <Link
          href="/login"
          className="px-8 py-3 rounded-full bg-primary text-white text-lg font-bold"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
