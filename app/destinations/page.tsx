"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTravel } from "@/context/TravelContext";

export default function DestinationsPage() {
  const { destinations, formatPrice } = useTravel();
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Gunung", "Pantai", "Kota"];

  const filtered = destinations.filter(
    (d) => filter === "All" || d.category === filter,
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Explore Destinations
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            From the volcanic majesty of Bromo to the crystal clear waters of
            Teluk Asmara. Find your perfect getaway.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                filter === cat
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={`/destination/${dest.id}`}
                className="group block h-full"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col group-hover:-translate-y-2">
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
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                        {dest.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mt-1 group-hover:text-emerald-600 transition-colors">
                        {dest.name}
                      </h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                      {dest.description}
                    </p>
                    <div className="mt-auto flex items-end justify-between border-t border-gray-50 pt-4">
                      <div>
                        <p className="text-xs text-gray-400">Start from</p>
                        <p className="text-lg font-black text-gray-900">
                          {formatPrice(dest.price)}
                        </p>
                      </div>
                      <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined">
                          arrow_forward
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
