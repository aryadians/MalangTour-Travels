"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTravel } from "@/context/TravelContext";

export default function PackagesPage() {
  const { destinations, formatPrice } = useTravel();

  // Create packages based on destinations + extras
  const packages = destinations.map((dest) => ({
    ...dest,
    duration: "3 Days 2 Nights",
    inclusions: ["Hotel 4*", "Private Transport", "Meals", "Guide"],
    type: "Private Trip",
  }));

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Curated Tour Packages
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            All-in-one vacation bundles designed for your comfort. Hotels,
            transport, and adventures included.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="space-y-8">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all border border-gray-100 group"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Image */}
                <div className="w-full md:w-1/3 h-64 md:h-80 rounded-[2rem] overflow-hidden relative">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-wider">
                    {pkg.type}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 w-full space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {pkg.name}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-500 mt-2 font-medium">
                        <span className="material-symbols-outlined text-emerald-500">
                          schedule
                        </span>
                        {pkg.duration}
                      </div>
                    </div>
                    <div className="hidden md:block text-right">
                      <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-bold text-sm">
                        Best Seller
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-500 leading-relaxed pt-2 border-t border-gray-50">
                    {pkg.description} Enjoy a hassle-free journey with our
                    comprehensive service.
                  </p>

                  <div className="flex flex-wrap gap-3 py-2">
                    {pkg.inclusions.map((inc, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"
                      >
                        <span className="material-symbols-outlined text-emerald-500 text-sm">
                          check_circle
                        </span>
                        {inc}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <p className="text-gray-400 text-xs uppercase font-bold">
                        Package Price
                      </p>
                      <p className="text-2xl md:text-3xl font-black text-gray-900">
                        {formatPrice(pkg.price * 1.5)}
                      </p>
                    </div>
                    <Link
                      href={`/destination/${pkg.id}`}
                      className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-emerald-500 transition-colors shadow-lg active:scale-95"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
