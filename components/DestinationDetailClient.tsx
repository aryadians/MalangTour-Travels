"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Types matching Prisma + extensions
interface Destination {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  rating: number;
  category: string;
  images: string[] | string; // Handled in parsing
  facilities: string[] | string | null;
  highlights: string[] | string | null;
  itinerary: any[] | string | null; // Complex object or string
  openTime?: string | null;
  ticketPrice?: string | null;
}

interface DestinationDetailClientProps {
  destination: Destination;
  user?: any;
}

export default function DestinationDetailClient({
  destination,
  user,
}: DestinationDetailClientProps) {
  const router = useRouter();

  // Parse JSON fields
  const parseJSON = (data: any, fallback: any) => {
    if (typeof data === "string") {
      try {
        return JSON.parse(data);
      } catch (e) {
        return fallback;
      }
    }
    return data || fallback;
  };

  const images = parseJSON(destination.images, []);
  const highlights = parseJSON(destination.highlights, []);

  // Itinerary might be specialized for Bromo as requested or generic
  // If Bromo (id 2 usually), we might want to ensure it matches the prompt's specific request if the DB data is lackluster.
  // For now, we try to use DB data, but if it's empty, we might fallback for Bromo.
  let itinerary = parseJSON(destination.itinerary, []);

  // Fallback for Bromo if itinerary is empty (Just to ensure the prompt's "Specific time" requirement is met if data is missing)
  if (destination.name.includes("Bromo") && itinerary.length === 0) {
    itinerary = [
      {
        time: "03:00 AM",
        title: "Pickup in Malang",
        description: "Start the journey.",
      },
      {
        time: "05:00 AM",
        title: "Sunrise at Penanjakan",
        description: "Witness the golden hour.",
      },
      {
        time: "07:00 AM",
        title: "Bromo Crater Hike",
        description: "Trek to the volcano rim.",
      },
      {
        time: "09:00 AM",
        title: "Teletubbies Savanna",
        description: "Explore the green expanse.",
      },
      {
        time: "11:00 AM",
        title: "Return Trip",
        description: "Head back to Malang.",
      },
    ];
  }

  // State
  const [paxCount, setPaxCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Dynamic Pricing
  const pricePerPax = destination.price;
  const totalPrice = paxCount * pricePerPax;

  const handleBooking = () => {
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }

    setIsBooking(true);

    // Simulation
    setTimeout(() => {
      setIsBooking(false);
      setShowSuccessModal(true);
    }, 1000);
  };

  // Features (Icon Mapping)
  const features = [
    { icon: "schedule", label: "Sunrise", value: "03:00 AM" },
    { icon: "directions_car", label: "Jeep", value: "4x4 Included" },
    { icon: "hiking", label: "Trekking", value: "Moderate" },
    { icon: "photo_camera", label: "Photos", value: "Best Spots" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      {/* 1. Hero Section */}
      <div className="relative w-full max-w-[1400px] mx-auto pt-6 px-4 md:px-6">
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl group">
          <img
            src={
              images[0] ||
              "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80"
            }
            alt={destination.name}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

          {/* Top Left Badges */}
          <div className="absolute top-6 left-6 flex flex-col gap-3">
            <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-emerald-500/20 backdrop-blur-md animate-fade-in-down">
              Most Popular
            </span>
            <span className="bg-black/50 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-sm font-semibold animate-fade-in-down delay-100">
              4x4 Jeep Experience
            </span>
          </div>

          {/* Bottom Left Title */}
          <div className="absolute bottom-8 left-6 md:left-10 animate-fade-in-up">
            <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg mb-2">
              {destination.name}
            </h1>
            <div className="flex items-center gap-2 text-white/90">
              <span className="material-symbols-outlined text-emerald-400">
                location_on
              </span>
              {destination.location}
            </div>
          </div>

          {/* Bottom Right Rating */}
          <div className="absolute bottom-8 right-6 md:right-10 hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-lg">
            <span
              className="text-yellow-400 material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="text-white font-bold text-lg">
              {destination.rating.toFixed(1)}
            </span>
            <span className="text-white/70 text-sm">| 124 Reviews</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 mt-12 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
        {/* 2. Main Content (Left) */}
        <div className="space-y-12">
          {/* Feature Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-2"
              >
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full mb-1">
                  <span className="material-symbols-outlined">{f.icon}</span>
                </div>
                <span className="text-sm font-bold text-gray-800">
                  {f.label}
                </span>
                <span className="text-xs text-gray-500">{f.value}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              About this Trip
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {destination.description}
            </p>
          </div>

          {/* Itinerary */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Itinerary</h2>
            <div className="relative pl-8 border-l-2 border-dashed border-gray-300 space-y-8">
              {itinerary.map((item: any, idx: number) => (
                <div key={idx} className="relative group">
                  {/* Dot */}
                  <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-white shadow-sm group-hover:scale-125 transition-transform" />

                  <div className="flex flex-col gap-1">
                    <span className="text-emerald-600 font-bold text-sm tracking-wide">
                      {item.time}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery (Masonry-ish) */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-96 md:h-80">
              <div className="md:col-span-2 h-full rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <img
                  src={images[1] || images[0]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Gallery 1"
                />
              </div>
              <div className="hidden md:flex flex-col gap-4 h-full">
                <div className="flex-1 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <img
                    src={images[2] || images[0]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="Gallery 2"
                  />
                </div>
                <div className="flex-1 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <img
                    src={images[3] || images[0]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="Gallery 3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Sticky Sidebar (Right) */}
        <div className="relative">
          <div className="sticky top-24 bg-white p-6 rounded-3xl border border-gray-100 shadow-xl space-y-6">
            <div className="flex justify-between items-end border-b border-gray-100 pb-6">
              <div>
                <span className="text-gray-400 text-sm block mb-1">
                  Starting from
                </span>
                <span className="text-3xl font-bold text-gray-900">
                  Rp {pricePerPax.toLocaleString("id-ID")}
                </span>
                <span className="text-gray-400 text-sm"> /pax</span>
              </div>
              <div className="text-right">
                <div className="flex items-center text-yellow-500 text-sm font-bold gap-1">
                  <span
                    className="material-symbols-outlined text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  5.0
                </div>
              </div>
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500">
                  calendar_today
                </span>
                Select Date
              </label>
              <input
                type="date"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            {/* Pax Counter */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500">
                  group
                </span>
                Guests
              </label>
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded-xl border border-gray-200">
                <button
                  onClick={() => setPaxCount(Math.max(1, paxCount - 1))}
                  className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-emerald-600 font-bold transition-colors"
                >
                  -
                </button>
                <span className="font-bold text-lg">{paxCount}</span>
                <button
                  onClick={() => setPaxCount(paxCount + 1)}
                  className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-emerald-600 font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price & CTA */}
            <div className="pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                <span>Total</span>
                <span className="text-emerald-600">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>

              <button
                onClick={handleBooking}
                disabled={isBooking}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isBooking ? (
                  <span className="animate-spin material-symbols-outlined">
                    progress_activity
                  </span>
                ) : (
                  <>
                    <span>Book Trip Now</span>
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
              <p className="text-xs text-center text-gray-400">
                No payment required today.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all scale-100 animate-in zoom-in-95 duration-300 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl text-emerald-600">
                check_circle
              </span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              Booking Successful!
            </h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Your trip to <strong className="text-gray-800">Bromo</strong> for{" "}
              <strong className="text-gray-800">{paxCount} people</strong> on{" "}
              <strong className="text-gray-800">
                {new Date(selectedDate).toLocaleDateString()}
              </strong>{" "}
              is confirmed.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                router.push("/dashboard"); // Redirect to dashboard or just close
              }}
              className="w-full py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-colors"
            >
              View Ticket in Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
