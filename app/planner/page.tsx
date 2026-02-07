"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useTravel } from "@/context/TravelContext";

export default function PlannerPage() {
  const { destinations } = useTravel();
  const [selectedItems, setSelectedItems] = useState<(number | string)[]>([]);
  const [days, setDays] = useState(1);
  const [pax, setPax] = useState(2);

  // Toggle selection
  const toggleDestination = (id: number | string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Calculate total price
  const totalPrice = useMemo(() => {
    const destinationsCost = selectedItems.reduce((acc, id) => {
      const dest = destinations.find((d) => d.id === id);
      return acc + (dest ? dest.price : 0);
    }, 0);

    // Simple logic: Base fee + (Destination Cost * Pax)
    // Note: Actual implementation might be more complex (e.g., jeep is per car not per pax)
    return destinationsCost * pax + 250000 * days; // Added driver/car base fee per day
  }, [selectedItems, pax, days]);

  return (
    <main className="bg-gray-50 dark:bg-[#10221c] min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-[#1e3a34] border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">
                arrow_back
              </span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Trip Planner
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden md:block">
              {selectedItems.length} destinations selected
            </span>
            <button className="bg-primary hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-emerald-500/20 text-sm transition-colors">
              Save Itinerary
            </button>
          </div>
        </div>
      </header>

      <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full p-4 md:p-8 gap-8 overflow-hidden">
        {/* Left: Destination List */}
        <div className="w-full md:w-2/3 overflow-y-auto pr-2 custom-scrollbar">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Choose Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {destinations.map((dest) => {
              const isSelected = selectedItems.includes(dest.id);
              return (
                <div
                  key={dest.id}
                  onClick={() => toggleDestination(dest.id)}
                  className={`relative cursor-pointer group rounded-xl overflow-hidden border-2 transition-all duration-200 ${isSelected ? "border-primary ring-2 ring-primary/20 scale-[0.98]" : "border-transparent hover:border-gray-200 dark:hover:border-gray-600"}`}
                >
                  <div className="relative h-40">
                    <img
                      src={dest.images[0]}
                      className="w-full h-full object-cover"
                      alt={dest.name}
                    />
                    <div
                      className={`absolute inset-0 bg-black/40 transition-opacity ${isSelected ? "opacity-20" : "opacity-0 group-hover:opacity-10"}`}
                    ></div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm animate-scale-in">
                        <span className="material-symbols-outlined text-lg">
                          check
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">
                        {dest.name}
                      </h3>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        IDR {dest.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                      {dest.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Summary Panel */}
        <div className="w-full md:w-1/3">
          <div className="bg-white dark:bg-[#1e3a34] rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                receipt_long
              </span>
              Your Estimate
            </h3>

            {/* Controls */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Duration (Days)
                </label>
                <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-600">
                  <button
                    onClick={() => setDays(Math.max(1, days - 1))}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"
                  >
                    -
                  </button>
                  <span className="font-bold w-4 text-center text-sm dark:text-white">
                    {days}
                  </span>
                  <button
                    onClick={() => setDays(days + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Travelers (Pax)
                </label>
                <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-600">
                  <button
                    onClick={() => setPax(Math.max(1, pax - 1))}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"
                  >
                    -
                  </button>
                  <span className="font-bold w-4 text-center text-sm dark:text-white">
                    {pax}
                  </span>
                  <button
                    onClick={() => setPax(pax + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100 dark:bg-gray-700 mb-6"></div>

            {/* Selected List */}
            <div className="mb-6 max-h-40 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {selectedItems.length === 0 ? (
                <p className="text-center text-sm text-gray-400 italic py-4">
                  No destinations selected
                </p>
              ) : (
                selectedItems.map((id) => {
                  const dest = destinations.find((d) => d.id === id);
                  return (
                    <div key={id} className="flex justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300 truncate w-2/3">
                        {dest?.name}
                      </span>
                      <span className="text-gray-500 font-medium">
                        IDR {dest?.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Total */}
            <div className="bg-primary/5 dark:bg-black/20 p-4 rounded-xl border border-primary/10">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  Base Driver/Car
                </span>
                <span className="text-gray-900 dark:text-white text-sm font-medium">
                  IDR {(250000 * days).toLocaleString("id-ID")}
                </span>
              </div>
              <div className="h-px bg-primary/10 my-2"></div>
              <div className="flex justify-between items-end">
                <span className="text-gray-900 dark:text-white font-bold">
                  Total Estimate
                </span>
                <div className="text-right">
                  <span className="block text-2xl font-black text-primary">
                    IDR {totalPrice.toLocaleString("id-ID")}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                    Approximate Cost
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
