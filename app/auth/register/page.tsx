"use client";

import React, { useActionState, useEffect } from "react";
import Link from "next/link";
import { signup } from "@/actions/auth";
import toast from "react-hot-toast";

const initialState: { message?: string; errors?: any } = {
  message: "",
  errors: {},
};

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(signup, initialState);

  useEffect(() => {
    if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

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
      <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <span className="material-symbols-outlined text-3xl">
              person_add
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#111816] mb-2">
            Create your account
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Join thousands of travelers exploring Malang.
          </p>
        </div>

        <form action={formAction} className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider"
            >
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">
                  person
                </span>
              </div>
              <input
                id="name"
                name="name"
                type="text"
                className="block w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                placeholder="e.g. John Doe"
                required
              />
            </div>
            {state.errors?.name && (
              <p className="text-red-500 text-xs mt-1">{state.errors.name}</p>
            )}
          </div>

          {/* Email Address */}
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
                name="email"
                type="email"
                className="block w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                placeholder="e.g. name@example.com"
                required
              />
            </div>
            {state.errors?.email && (
              <p className="text-red-500 text-xs mt-1">{state.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider"
            >
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">
                  lock
                </span>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                className="block w-full h-12 pl-12 pr-12 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => {
                  const input = document.getElementById(
                    "password",
                  ) as HTMLInputElement;
                  if (input) {
                    input.type =
                      input.type === "password" ? "text" : "password";
                  }
                }}
              >
                <span className="material-symbols-outlined text-[20px]">
                  visibility_off
                </span>
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Must be at least 8 characters.
            </p>
            {state.errors?.password && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.password}
              </p>
            )}
          </div>

          {/* Referral Code (Optional) */}
          <div>
            <label
              htmlFor="referralCode"
              className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider"
            >
              Referral Code (Optional)
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">
                  redeem
                </span>
              </div>
              <input
                id="referralCode"
                name="referralCode"
                type="text"
                className="block w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all font-mono text-sm uppercase"
                placeholder="e.g. ABCDEF"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/30 mt-2 disabled:opacity-70"
          >
            {isPending ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
              Or sign up with
            </span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 h-12 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors bg-white">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="font-bold text-slate-600 text-sm">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 h-12 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors bg-white">
            <svg
              className="w-5 h-5 text-[#1877F2]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="font-bold text-slate-600 text-sm">Facebook</span>
          </button>
        </div>

        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-primary font-bold hover:underline"
          >
            Log in here
          </Link>
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
