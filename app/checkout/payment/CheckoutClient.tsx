"use client";

import React, { useActionState, useState } from "react";
import { createBooking } from "../actions";

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
  // We don't use useActionState for the main form submission here typically if we want custom loading,
  // but let's use it for the server action.
  const [state, formAction, isPending] = useActionState(createBooking, {
    errors: {},
  });

  return (
    <div className="flex-1 p-8 flex flex-col bg-white dark:bg-[#1a2c26]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Select Payment
        </h2>
        <div className="flex items-center gap-2 text-sm font-medium">
          <div className="flex items-center gap-2 text-primary">
            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
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

        <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pr-2 pb-4">
          <label className="block group cursor-pointer relative">
            <input
              type="radio"
              name="payment_method"
              className="peer sr-only"
              checked={selectedMethod === "qris"}
              onChange={() => setSelectedMethod("qris")}
            />
            <div className="payment-card relative border-2 border-gray-100 dark:border-white/10 rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-primary/40">
              <div className="radio-circle-outer w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-500 flex items-center justify-center shrink-0 transition-colors">
                <div className="radio-circle-inner w-2.5 h-2.5 rounded-full bg-primary opacity-0 transform scale-0 transition-all duration-200" />
              </div>
              <div className="bg-white p-2 rounded-lg border border-gray-100 w-16 h-10 flex items-center justify-center shrink-0 shadow-sm">
                <img
                  alt="QRIS payment logo"
                  className="h-full w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvXbc14XeU97Db3x6vijxZsAZR9s9KapaF1ECKlFh6kH6gFC6XXQOObZuGBdQKsubj26LevI4HghTTm_837AS1ZEYy6E7iU1Yz5DRZwbs0-XvbD1Qj1Vlw_H-eoZRjVuc_cqHPgah_fItpiz_opyIYzRv0BLS5LehnC-GK0-gnfrT0o0I-oRLXHsAguZs7RhNUT9MWu6pYWuMtL7qbODBuEg_OIR6xAUg476dNnCFZ5lM6pdJfNXAhI7Lf6iCMX8SCKRk1LeJKtw"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    QRIS
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                    Recommended
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Scan with GoPay, OVO, ShopeePay, Dana
                </p>
              </div>
            </div>
          </label>

          {/* Credit Card Option - Simplified for brevity in this refactor, but kept struct */}
          <label className="block group cursor-pointer relative mt-4">
            <input
              type="radio"
              name="payment_method"
              className="peer sr-only"
              checked={selectedMethod === "cc"}
              onChange={() => setSelectedMethod("cc")}
            />
            <div className="payment-card relative border-2 border-gray-100 dark:border-white/10 rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-primary/40">
              <div className="radio-circle-outer w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-500 flex items-center justify-center shrink-0 transition-colors">
                <div className="radio-circle-inner w-2.5 h-2.5 rounded-full bg-primary opacity-0 transform scale-0 transition-all duration-200" />
              </div>
              <div className="bg-white p-1 rounded-lg border border-gray-100 w-16 h-10 flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-gray-600 text-[24px]">
                  credit_card
                </span>
              </div>
              <div className="flex-1">
                <span className="font-semibold text-gray-900 dark:text-white block">
                  Credit Card
                </span>
              </div>
            </div>
          </label>
        </div>

        <div className="pt-6 mt-2 border-t border-gray-100 dark:border-white/10">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary hover:bg-primary-dark cursor-pointer text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all duration-200 flex items-center justify-center gap-2 text-lg group active:scale-[0.99] active:shadow-md disabled:opacity-70"
          >
            {!isPending ? (
              <div className="default-state flex items-center gap-2">
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
              </div>
            ) : (
              <div className="loading-state flex items-center gap-2 animate-pulse">
                <span className="material-symbols-outlined animate-spin text-[20px]">
                  progress_activity
                </span>
                <span>Processing...</span>
              </div>
            )}
          </button>
        </div>
      </form>
      <style jsx>{`
        .peer:checked ~ .payment-card {
          border-color: #10b981;
          background-color: rgba(16, 185, 129, 0.02);
          box-shadow:
            0 4px 6px -1px rgba(16, 185, 129, 0.1),
            0 2px 4px -1px rgba(16, 185, 129, 0.06);
        }
        .peer:checked ~ .payment-card .radio-circle-inner {
          transform: scale(1);
          opacity: 1;
        }
        .peer:checked ~ .payment-card .radio-circle-outer {
          border-color: #10b981;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
}
