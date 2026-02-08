"use client";

import React, { useActionState, useState } from "react";
import { createBooking } from "../actions";
import { motion, AnimatePresence } from "framer-motion";

interface CheckoutClientProps {
  destination: any;
  date: string;
  pax: number;
  totalPrice: number;
}

export default function CheckoutClient({
  destination,
  date,
  pax,
  totalPrice,
}: CheckoutClientProps) {
  const [selectedMethod, setSelectedMethod] = useState("qris");
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  // We don't use useActionState for the main form submission here typically if we want custom loading,
  // but let's use it for the server action.
  const [state, formAction, isPending] = useActionState(createBooking, {
    errors: {},
  });

  const handleApplyCoupon = (e: React.MouseEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "PROMO") {
      setIsCouponApplied(true);
    } else {
      // Shake animation or error toast could go here
    }
  };

  return (
    <div className="flex-1 p-8 flex flex-col bg-white dark:bg-[#1a2c26]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          Select Payment
          <span className="text-xs font-normal text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-full">
            Secure SSL
          </span>
        </h2>
        <div className="flex items-center gap-2 text-sm font-medium">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-sm shadow-emerald-200">
              1
            </div>
            <span>Select</span>
          </div>
          <div className="w-8 h-px bg-gray-200 dark:bg-gray-700" />
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs">
              2
            </div>
            <span>Pay</span>
          </div>
          <div className="w-8 h-px bg-gray-200 dark:bg-gray-700" />
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs">
              3
            </div>
            <span>Success</span>
          </div>
        </div>
      </div>

      <form action={formAction} className="flex-1 flex flex-col h-full">
        <input type="hidden" name="destinationId" value={destination.id} />
        <input type="hidden" name="date" value={date} />
        <input type="hidden" name="pax" value={pax} />
        <input type="hidden" name="totalPrice" value={totalPrice} />

        <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-2 pb-4">
          {/* Payment Methods */}
          <div className="grid gap-4">
            {[
              {
                id: "qris",
                label: "QRIS",
                desc: "Scan with GoPay, OVO, ShopeePay, Dana",
                recommend: true,
                icon: (
                  <img
                    alt="QRIS payment logo"
                    className="h-full w-auto object-contain"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvXbc14XeU97Db3x6vijxZsAZR9s9KapaF1ECKlFh6kH6gFC6XXQOObZuGBdQKsubj26LevI4HghTTm_837AS1ZEYy6E7iU1Yz5DRZwbs0-XvbD1Qj1Vlw_H-eoZRjVuc_cqHPgah_fItpiz_opyIYzRv0BLS5LehnC-GK0-gnfrT0o0I-oRLXHsAguZs7RhNUT9MWu6pYWuMtL7qbODBuEg_OIR6xAUg476dNnCFZ5lM6pdJfNXAhI7Lf6iCMX8SCKRk1LeJKtw"
                  />
                ),
              },
              {
                id: "cc",
                label: "Credit Card",
                desc: "Visa, Mastercard, JCB",
                icon: (
                  <span className="material-symbols-outlined text-gray-600 text-[24px]">
                    credit_card
                  </span>
                ),
              },
              {
                id: "va",
                label: "Virtual Account",
                desc: "BCA, Mandiri, BNI, BRI",
                icon: (
                  <span className="material-symbols-outlined text-gray-600 text-[24px]">
                    account_balance
                  </span>
                ),
              },
            ].map((method) => (
              <label
                key={method.id}
                className="group cursor-pointer relative block"
              >
                <input
                  type="radio"
                  name="payment_method"
                  className="peer sr-only"
                  checked={selectedMethod === method.id}
                  onChange={() => setSelectedMethod(method.id)}
                />
                <motion.div
                  className={`relative border-2 rounded-xl p-4 flex items-center gap-4 transition-all duration-300 ${
                    selectedMethod === method.id
                      ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10 shadow-md ring-1 ring-emerald-500/20"
                      : "border-gray-100 dark:border-white/10 hover:border-emerald-200 dark:hover:border-emerald-500/30 hover:shadow-sm"
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  layout
                >
                  {selectedMethod === method.id && (
                    <motion.div
                      layoutId="selected-indicator"
                      className="absolute inset-0 rounded-xl border-2 border-emerald-500 pointer-events-none"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}

                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      selectedMethod === method.id
                        ? "border-emerald-500"
                        : "border-gray-300 dark:border-gray-500"
                    }`}
                  >
                    {selectedMethod === method.id && (
                      <motion.div
                        className="w-2.5 h-2.5 rounded-full bg-emerald-500"
                        layoutId="radio-inner"
                      />
                    )}
                  </div>

                  <div className="bg-white p-2 rounded-lg border border-gray-100 w-14 h-10 flex items-center justify-center shrink-0 shadow-sm">
                    {method.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900 dark:text-white">
                        {method.label}
                      </span>
                      {method.recommend && (
                        <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {method.desc}
                    </p>
                  </div>
                </motion.div>
              </label>
            ))}
          </div>

          {/* Promo Code Section */}
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/10">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Have a Promo Code?
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[18px]">
                  sell
                </span>
                <input
                  type="text"
                  placeholder="Enter code (e.g. TRAVEL10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={isCouponApplied}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-mono text-sm uppercase placeholder:normal-case"
                />
              </div>
              <button
                type="button"
                onClick={handleApplyCoupon}
                disabled={!couponCode || isCouponApplied}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                  isCouponApplied
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-emerald-600 hover:shadow-lg active:scale-95"
                }`}
              >
                {isCouponApplied ? "Applied" : "Apply"}
              </button>
            </div>
            {isCouponApplied && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-xs text-emerald-600 font-bold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">
                  check_circle
                </span>
                Code Applied! Discount calculation coming soon.
              </motion.div>
            )}
          </div>
        </div>

        <div className="pt-6 mt-2 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#1a2c26] z-10">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 flex items-center justify-center gap-2 text-lg group active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden relative"
          >
            <AnimatePresence mode="wait">
              {!isPending ? (
                <motion.div
                  key="pay-text"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <span>
                    Pay{" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(totalPrice)}
                  </span>
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="loading-spinner"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="material-symbols-outlined animate-spin">
                    progress_activity
                  </span>
                  <span>Processing...</span>
                </motion.div>
              )}
            </AnimatePresence>
            {isPending && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-white/30"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "linear" }}
              />
            )}
          </button>
          <p className="text-center text-[10px] text-gray-400 mt-3 flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-[12px]">lock</span>
            Payments are secure and encrypted
          </p>
        </div>
      </form>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
