"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTravel } from "@/context/TravelContext";

export default function Home() {
  const { destinations, formatPrice } = useTravel();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [weather, setWeather] = useState<{
    temp: number;
    condition: string;
  } | null>(null);

  // Fetch Real-time Weather for Bromo
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Coordinates for Mount Bromo
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-7.9425&longitude=112.9530&current=temperature_2m,weather_code",
        );
        const data = await res.json();
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: "Sunny", // Simplified mapping, or use weather_code for more detail
        });
      } catch (error) {
        console.error("Failed to fetch weather", error);
        setWeather({ temp: 12, condition: "Sunny" }); // Fallback
      }
    };
    fetchWeather();
  }, []);

  // Categories for Activity Chips
  const categories = ["All", "Gunung", "Pantai", "Kota", "Kuliner"];

  // Filter Logic
  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || dest.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=2000"
            alt="Mount Bromo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-gray-50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 md:px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-4xl"
          >
            {/* Weather Widget (Real-time) */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-white animate-in fade-in zoom-in duration-500">
              <span className="material-symbols-outlined text-yellow-400">
                {weather ? "sunny" : "cloud"}
              </span>
              <span className="text-sm font-semibold">Bromo, Malang</span>
              <span className="text-white/50">|</span>
              <span className="text-sm font-bold">
                {weather ? `${weather.temp}°C` : "Loading..."}
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight drop-shadow-2xl">
              DISCOVER <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                MALANG
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
              Explore the majestic Bromo sunrise, hidden beaches, and colorful
              villages with premium comfort.
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto w-full relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                  search
                </span>
              </div>
              <input
                type="text"
                placeholder="Where do you want to admit to?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-5 rounded-2xl bg-white/95 backdrop-blur-xl border-none shadow-2xl text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all text-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <span className="material-symbols-outlined text-4xl">
            keyboard_arrow_down
          </span>
        </div>
      </section>

      {/* 2. ACTIVITY CHIPS Filter */}
      <section className="py-10 px-4 md:px-6 max-w-7xl mx-auto -mt-20 relative z-10">
        <motion.div
          layout
          className="flex flex-wrap justify-center gap-3 bg-white p-4 rounded-3xl shadow-xl border border-gray-100 max-w-3xl mx-auto"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                activeCategory === cat
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* 3. DESTINATIONS GRID */}
      <section className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900">
              Popular Destinations
            </h2>
            <p className="text-gray-500 mt-2">
              Curated trips for your best experience
            </p>
          </div>
          <Link
            href="/destinations"
            className="hidden md:flex items-center gap-1 text-emerald-600 font-bold hover:gap-2 transition-all"
          >
            View All
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </Link>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredDestinations.map((dest) => (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/destination/${dest.id}`} className="group block">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
                        <span className="material-symbols-outlined text-yellow-500 text-sm">
                          star
                        </span>
                        {dest.rating}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-medium">
                        {dest.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                          {dest.name}
                        </h3>
                      </div>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                        {dest.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div>
                          <p className="text-xs text-gray-400 font-medium">
                            Start from
                          </p>
                          <p className="text-lg font-black text-emerald-600">
                            {formatPrice(dest.price)}
                          </p>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                          <span className="material-symbols-outlined">
                            arrow_outward
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl text-gray-400">
                search_off
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              No destinations found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </section>

      {/* 4. NEWSLETTER & CTA (Preserved/Simplified) */}
      <section className="py-20 bg-emerald-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-black mb-6">
            Ready for your next adventure?
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Get exclusive offers and travel tips directly to your inbox. Join
            over 10,000+ happy travelers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-xl bg-emerald-800/50 border border-emerald-700 text-white placeholder:text-emerald-400/70 focus:ring-2 focus:ring-emerald-400 outline-none w-full"
            />
            <button className="px-8 py-4 rounded-xl bg-white text-emerald-900 font-bold hover:bg-emerald-50 transition-colors shadow-lg shadow-white/10">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
