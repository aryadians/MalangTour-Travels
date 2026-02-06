"use client";

import React, { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { createBooking } from "@/actions/booking";

interface BookingFormProps {
  destinationId: number;
  pricePerPax: number;
  userId?: string;
}

export default function BookingForm({
  destinationId,
  pricePerPax,
  userId,
}: BookingFormProps) {
  const [pax, setPax] = useState(1);
  const [date, setDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(pricePerPax);
  const [state, action] = useFormState(createBooking, undefined);

  useEffect(() => {
    setTotalPrice(pax * pricePerPax);
  }, [pax, pricePerPax]);

  const incrementPax = () => setPax((prev) => prev + 1);
  const decrementPax = () => setPax((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="sticky top-24 rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col gap-6">
      <div className="flex items-end justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
        <div>
          <p className="text-sm text-gray-500 font-medium">Starting from</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-primary">
              IDR {pricePerPax.toLocaleString("id-ID")}
            </span>
            <span className="text-sm text-gray-500">/ pax</span>
          </div>
        </div>
        <div className="flex items-center text-primary text-sm font-bold bg-primary/10 px-2 py-1 rounded">
          <span className="material-symbols-outlined text-sm mr-1">bolt</span>
          Instant
        </div>
      </div>

      <form action={action} className="flex flex-col gap-4">
        <input type="hidden" name="destinationId" value={destinationId} />
        <input type="hidden" name="totalPrice" value={totalPrice} />

        {/* Date Picker */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold">Select Date</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-400">
                calendar_month
              </span>
            </div>
            <input
              required
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-text-main dark:text-white font-medium focus:ring-2 focus:ring-primary outline-none cursor-pointer"
              type="date"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          {state?.errors?.date && (
            <p className="text-red-500 text-xs">{state.errors.date}</p>
          )}
        </div>

        {/* Pax Counter */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold">Travelers</label>
          <input type="hidden" name="pax" value={pax} />
          <div className="flex items-center justify-between p-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
            <button
              type="button"
              onClick={decrementPax}
              className="w-10 h-10 flex items-center justify-center rounded-md bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:text-primary shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">remove</span>
            </button>
            <span className="text-base font-bold">{pax} Pax</span>
            <button
              type="button"
              onClick={incrementPax}
              className="w-10 h-10 flex items-center justify-center rounded-md bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:text-primary shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl flex flex-col gap-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{`IDR ${pricePerPax.toLocaleString("id-ID")} x ${pax}`}</span>
            <span>IDR {totalPrice.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Service Fee</span>
            <span className="text-primary font-medium">Free</span>
          </div>
          <div className="h-px bg-gray-200 dark:bg-gray-600 my-1"></div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Total Price</span>
            <span className="text-xl font-black text-primary">
              IDR {totalPrice.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {state?.message && (
          <p className="text-red-500 text-sm text-center font-bold">
            {state.message}
          </p>
        )}

        {/* CTA Button */}
        {userId ? (
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-primary hover:bg-emerald-600 text-white font-bold text-lg shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-transform transform active:scale-95"
          >
            <span>Book Trip Now</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        ) : (
          <a
            href="/login"
            className="w-full py-4 rounded-xl bg-gray-500 hover:bg-gray-600 text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-transform transform active:scale-95"
          >
            <span>Log in to Book</span>
            <span className="material-symbols-outlined">login</span>
          </a>
        )}

        <p className="text-center text-xs text-gray-400">
          Free cancellation up to 24 hours before trip
        </p>
      </form>
    </div>
  );
}
