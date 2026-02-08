"use client";

import React from "react";

export default function ForgotPasswordPage() {
  return (
    <div className="bg-[#f0f4f3] font-display text-slate-900 min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/p/AF1QipN3X-x2X2x2X2x2X2x2X2x2X2x2X2x2X2x2X2')",
        }}
      ></div>
      <div className="absolute inset-0 bg-[#0e1715]/70 backdrop-blur-sm z-0"></div>

      {/* Card */}
      <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <span className="material-symbols-outlined text-3xl">
              lock_reset
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#111816] mb-2">
            Forgot password?
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider"
            >
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">
                  mail
                </span>
              </div>
              <input
                id="email"
                type="email"
                className="block w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/30"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_back
            </span>
            Back to login
          </a>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-6 text-center w-full z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="material-symbols-outlined text-white/80 text-xl">
            landscape
          </span>
          <span className="text-white/90 font-bold text-sm tracking-wide">
            Malang Premium Tours
          </span>
        </div>
        <p className="text-white/50 text-xs">© 2023 All Rights Reserved</p>
      </div>
    </div>
  );
}
