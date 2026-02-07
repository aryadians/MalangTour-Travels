"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="bg-white rounded-[40px] p-8 md:p-12 max-w-md w-full shadow-2xl text-center border border-gray-100"
      >
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full h-full rounded-full border-4 border-emerald-500 absolute animate-ping opacity-20"
          ></motion.div>
          <span className="material-symbols-outlined text-5xl text-emerald-600">
            check_circle
          </span>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Your adventure is booked. We have sent the e-ticket to your email
          address.
        </p>

        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="block w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/30 transition-all"
          >
            View My Ticket
          </Link>
          <Link
            href="/"
            className="block w-full py-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-2xl transition-all"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
