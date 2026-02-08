"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  // In a real app, we might fetch booking details using an ID from params
  // const bookingId = searchParams.get("bookingId");

  return (
    <div className="min-h-screen bg-white dark:bg-[#10221c] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-[#1a2c26] rounded-3xl shadow-2xl overflow-hidden text-center relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />

        <div className="p-8 pt-12">
          {/* Animated Checkmark */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center relative"
            >
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping opacity-75" />
              <motion.span
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="material-symbols-outlined text-6xl text-emerald-600 dark:text-emerald-400"
              >
                check_circle
              </motion.span>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight"
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-500 dark:text-gray-400 mb-8"
          >
            Your booking has been confirmed. Get ready for your adventure!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10 mb-8 text-left"
          >
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              Booking Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Status
                </span>
                <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                  CONFIRMED
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Payment Method
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  QRIS / Virtual Account
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Confirmation Sent to
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[150px]">
                  Email
                </span>
              </div>
            </div>
          </motion.div>

          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="block w-full py-4 rounded-xl bg-gray-900 dark:bg-emerald-600 text-white font-bold hover:shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="block w-full py-4 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white font-bold bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
