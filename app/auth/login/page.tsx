"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTravel } from "@/context/TravelContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useTravel();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API Login
    setTimeout(() => {
      setUser({
        name: "Petualang Malang",
        points: 2500,
        referralCode: "MALANGTOP2024",
        isLoggedIn: true,
        email: "user@example.com",
        role: "USER",
      });
      toast.success("Welcome back!", {
        icon: "👋",
      });
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side - Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-10">
            <Link href="/" className="flex items-center gap-2 mb-8 group w-fit">
              <div className="size-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-xl">
                  landscape
                </span>
              </div>
              <span className="font-bold text-gray-900 tracking-tight">
                MalangTravel
              </span>
            </Link>
            <h1 className="text-3xl font-black text-gray-900 mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-500">
              Enter your details to access your account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-xs font-bold text-gray-700 uppercase">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-bold text-emerald-600 hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                placeholder="••••••••"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-xl active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-emerald-600 font-bold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block relative bg-emerald-900">
          <img
            src="https://images.unsplash.com/photo-1596401057633-56565377f06d?auto=format&fit=crop&q=80&w=1000"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
            alt="Malang Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 to-transparent flex flex-col justify-end p-12 text-white">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-2xl text-white">
                format_quote
              </span>
            </div>
            <h3 className="text-2xl font-bold leading-relaxed mb-2">
              "The journey of a thousand miles begins with a single step."
            </h3>
            <p className="text-emerald-200">– Lao Tzu</p>
          </div>
        </div>
      </div>
    </div>
  );
}
