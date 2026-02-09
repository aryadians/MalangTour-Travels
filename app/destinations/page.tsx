"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useTravel } from "@/context/TravelContext";

const MapComponent = dynamic(() => import("@/components/MapComponent"), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-slate-100 dark:bg-slate-800 rounded-[3rem] animate-pulse flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading Interactive Map...</div>
});

export default function DestinationsPage() {
  const { destinations, formatPrice, t } = useTravel();
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(10000000); // 10 Million max

  const categories = ["All", "Gunung", "Pantai", "Kota", "Honeymoon"];

  const filtered = destinations.filter((d) => {
    const matchesCategory = filter === "All" || d.category === filter;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         d.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = d.price <= priceRange;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-xl">
            <span className="text-emerald-500 font-black text-xs tracking-[0.3em] uppercase mb-4 block">{t("destinations")}</span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{t("exploreHotspots")}.</h1>
          </div>
          <p className="text-slate-400 font-medium text-lg max-w-sm">
            {t("curatedJourneys")}
          </p>
        </div>

        {/* Interactive Map */}
        <div className="mb-16">
           <MapComponent destinations={destinations} />
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 mb-16 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Search Input */}
            <div className="lg:col-span-5 relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">search</span>
              <input 
                type="text" 
                placeholder={t("searchPlaceholder")}
                className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="lg:col-span-4 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                    filter === cat
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg scale-105"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Price Filter */}
            <div className="lg:col-span-3 space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>{t("maxPrice")}</span>
                <span className="text-emerald-500">{formatPrice(priceRange)}</span>
              </div>
              <input 
                type="range" 
                min="100000" 
                max="15000000" 
                step="100000"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((dest) => (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  href={`/destinations/${dest.slug}`}
                  className="group block h-full"
                >
                  <div className="flex flex-col gap-6 h-full">
                    <div className="relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl group">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                            <span className="material-symbols-outlined font-black">arrow_outward</span>
                         </div>
                      </div>
                      <div className="absolute top-6 right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black flex items-center gap-2 shadow-xl">
                        <span className="material-symbols-outlined text-yellow-500 text-sm filled">star</span>
                        {dest.rating}
                      </div>
                      <div className="absolute bottom-6 left-6 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-xl">
                        {dest.category}
                      </div>
                    </div>
                    
                    <div className="px-2">
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-emerald-500 transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-slate-400 font-bold text-xs mt-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-500 text-lg">location_on</span>
                        {dest.location}
                      </p>
                      
                      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div>
                          <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">{t("startingFrom")}</p>
                          <p className="text-2xl font-black text-slate-900 dark:text-white">
                            {formatPrice(dest.price)}
                          </p>
                        </div>
                        <button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-lg active:scale-95">
                          {t("bookNow")}
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-40">
            <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">search_off</span>
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">{t("noDestinations")}</p>
          </div>
        )}
      </div>
    </div>
  );
}