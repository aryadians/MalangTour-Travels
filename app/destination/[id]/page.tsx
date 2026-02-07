"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTravel } from "@/context/TravelContext";
import toast from "react-hot-toast";

export default function DestinationDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { destinations, formatPrice, updateBooking, currency } = useTravel();

  // Find destination from Context
  const destination = destinations.find((d) => d.id === id);

  const [pax, setPax] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  // If not found, show loading or not found
  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Destination Not Found
          </h1>
          <button
            onClick={() => router.push("/")}
            className="mt-4 text-emerald-600 font-bold hover:underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const basePrice = destination.price;
  const totalPrice = basePrice * pax;

  const handleBooking = () => {
    setIsBooking(true);

    // Simulate API processing
    setTimeout(() => {
      updateBooking({
        destinationId: destination.id,
        pax: pax,
        date: new Date().toISOString(),
        totalPrice: totalPrice,
      });

      toast.success("Trip added to itinerary!", {
        icon: "🎒",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      router.push("/checkout");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 1. IMMERSIVE HERO */}
      <div className="relative h-[60vh] w-full">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-24 left-6 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40 transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
              {destination.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-2 drop-shadow-lg">
              {destination.name}
            </h1>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-yellow-400">
                  star
                </span>
                <span className="font-bold">{destination.rating}</span>
                <span className="text-sm">({destination.reviews} reviews)</span>
              </div>
              <span className="text-white/40">|</span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-emerald-400">
                  location_on
                </span>
                <span>{destination.location}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* 2. MAIN CONTENT */}
        <div className="space-y-8">
          {/* Description Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About the Trip
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {destination.description}
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 gap-4">
            {destination.features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3 shadow-sm"
              >
                <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">check</span>
                </span>
                <span className="font-semibold text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* Itinerary */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Itinerary</h2>
            <div className="space-y-6 relative border-l-2 border-dashed border-gray-200 ml-4 pl-8">
              {destination.itinerary.map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white shadow-md"></div>
                  <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded mb-1 inline-block">
                    {item.time}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.activity}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. BOOKING SIDEBAR (Sticky) */}
        <div className="relative">
          <div className="sticky top-28 bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Make Booking</h3>
              <div className="text-right">
                <p className="text-xs text-gray-400">Price per pax</p>
                <p className="text-2xl font-black text-gray-900">
                  {formatPrice(basePrice)}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Date Picker (Mock) */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Select Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Pax Counter */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Number of Pax
                </label>
                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-2 border border-gray-200">
                  <button
                    onClick={() => setPax(Math.max(1, pax - 1))}
                    className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="text-xl font-bold text-gray-900">{pax}</span>
                  <button
                    onClick={() => setPax(pax + 1)}
                    className="w-10 h-10 rounded-lg bg-emerald-500 shadow-emerald-500/20 shadow-lg flex items-center justify-center text-white hover:bg-emerald-600 transition-colors"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200 my-4"></div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Total Price</span>
                <span className="text-2xl font-black text-emerald-600">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <button
                onClick={handleBooking}
                disabled={isBooking}
                className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-black transition-all shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isBooking ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Processing...
                  </>
                ) : (
                  "Book Trip Now"
                )}
              </button>

              <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-sm">lock</span>
                Secure payment powered by Midtrans
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
