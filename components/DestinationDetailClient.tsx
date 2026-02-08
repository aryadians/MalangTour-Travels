"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface Destination {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  rating: number;
  category: string;
  images: string[] | string;
  facilities: string[] | string | null;
  highlights: string[] | string | null;
  itinerary: any[] | string | null;
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
  const facilities = parseJSON(destination.facilities, []);
  const highlights = parseJSON(destination.highlights, []);
  let itinerary = parseJSON(destination.itinerary, []);

  // Map facilities to icons
  const getIcon = (name: string) => {
    const low = name.toLowerCase();
    if (low.includes("guide")) return "verified";
    if (low.includes("transport") || low.includes("car") || low.includes("jeep")) return "local_taxi";
    if (low.includes("photo") || low.includes("camera")) return "camera";
    if (low.includes("insurance")) return "security";
    if (low.includes("food") || low.includes("dinner") || low.includes("lunch")) return "restaurant";
    if (low.includes("hotel") || low.includes("villa") || low.includes("stay")) return "hotel";
    if (low.includes("wifi")) return "wifi";
    if (low.includes("ticket") || low.includes("entrance")) return "confirmation_number";
    return "star"; // fallback
  };

  const [paxCount, setPaxCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const pricePerPax = destination.price;
  const totalPrice = paxCount * pricePerPax;

  const handleBooking = () => {
    if (!selectedDate) {
      toast.error("Please select a travel date.");
      return;
    }
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  if (!isMounted) return null;

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen font-display pb-32">
      {/* 1. HERO HEADER */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        <img
          src={images[0] || "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80"}
          alt={destination.name}
          className="w-full h-full object-cover brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                {destination.category}
              </span>
              <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                {destination.name}
              </h1>
              <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold tracking-wide">
                <span className="material-symbols-outlined text-emerald-500">location_on</span>
                {destination.location}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. CONTENT GRID */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT SIDE: INFO */}
          <div className="lg:col-span-8 space-y-20">
            {/* Overview */}
            <section className="space-y-6">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">The Experience.</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
                {destination.description}
              </p>
            </section>

            {/* Dynamic Facilities Grid */}
            <section className="space-y-8">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest">Included Facilities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {facilities.length > 0 ? (
                  facilities.map((f: string, i: number) => (
                    <div key={i} className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center gap-3 transition-transform hover:scale-105">
                      <span className="material-symbols-outlined text-emerald-500 text-3xl">{getIcon(f)}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white leading-tight">{f}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm italic">Contact admin for facility details.</p>
                )}
              </div>
            </section>

            {/* Itinerary */}
            <section className="space-y-10">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Itinerary Plan.</h2>
              <div className="space-y-12 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                {itinerary.map((item: any, idx: number) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="relative pl-12 group"
                  >
                    <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center z-10 group-hover:border-emerald-500 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">{item.time || item.day || `Step ${idx+1}`}</span>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">{item.title || item.activity}</h3>
                      <p className="text-slate-500 dark:text-slate-400 font-medium">{item.description || item.activity}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Gallery Section */}
            <section className="space-y-10">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Visual Story.</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-[600px]">
                <div className="col-span-2 row-span-2 rounded-[2.5rem] overflow-hidden group">
                  <img src={images[1] || images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                </div>
                <div className="rounded-[2rem] overflow-hidden group">
                  <img src={images[2] || images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                </div>
                <div className="rounded-[2rem] overflow-hidden group">
                  <img src={images[3] || images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT SIDE: STICKY BOOKING CARD */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.08)] border border-slate-100 dark:border-slate-800 space-y-8">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Price per person</p>
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white font-serif italic">
                      Rp {pricePerPax.toLocaleString("id-ID")}
                    </h4>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-xl text-emerald-600 dark:text-emerald-400 font-black text-xs">
                    ★ {destination.rating.toFixed(1)}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Date Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Select Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none"
                        style={{ colorScheme: 'dark' }} // Force icons to show in dark mode if needed
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Guests Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Guests</label>
                    <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-2 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <button
                        onClick={() => setPaxCount(Math.max(1, paxCount - 1))}
                        className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-slate-900 dark:text-white font-black hover:bg-emerald-500 hover:text-white transition-all"
                      >
                        -
                      </button>
                      <span className="font-black text-slate-900 dark:text-white text-lg">{paxCount}</span>
                      <button
                        onClick={() => setPaxCount(paxCount + 1)}
                        className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-slate-900 dark:text-white font-black hover:bg-emerald-500 hover:text-white transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 dark:border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-400">Total Price</span>
                    <span className="text-2xl font-black text-emerald-500">Rp {totalPrice.toLocaleString("id-ID")}</span>
                  </div>
                  <button
                    onClick={handleBooking}
                    disabled={isBooking}
                    className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isBooking ? "Confirming..." : "Book This Experience"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[3rem] p-12 text-center shadow-2xl overflow-hidden border border-white/10"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
              <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                <span className="material-symbols-outlined text-5xl text-emerald-600 dark:text-emerald-400">task_alt</span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">Reservation Confirmed!</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
                Your journey to <strong className="text-slate-900 dark:text-white font-black">{destination.name}</strong> is ready. 
                Check your dashboard for ticket details.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-105 transition-all"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-4 text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-slate-900 dark:hover:text-white transition-all"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
