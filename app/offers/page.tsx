"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OffersPage() {
  const offers = [
    {
      id: "bromo-summer",
      title: "Bromo Summer Sale",
      description:
        "Get 30% OFF for sunrise jeep tour packages during the dry season. Best view guaranteed!",
      discount: "30% OFF",
      code: "BROMO30",
      valid: "Valid until 30 June 2024",
      color: "bg-orange-500",
      image:
        "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "honeymoon-batu",
      title: "Romantic Batu Escape",
      description:
        "Special honeymoon package including 5-star hotel, romantic dinner, and private transport.",
      discount: "Free Upgrade",
      code: "LOVEBATU",
      valid: "Valid until 31 Dec 2024",
      color: "bg-pink-500",
      image:
        "https://images.unsplash.com/photo-1596423736783-cd55ce852c02?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "group-fun",
      title: "Group Adventure",
      description:
        "Book for 5 people or more and get 1 pax for FREE. Perfect for friends and family.",
      discount: "Pay 5 Get 6",
      code: "SQUADGOALS",
      valid: "Valid always on weekdays",
      color: "bg-blue-500",
      image:
        "https://images.unsplash.com/photo-1510662145379-13537db782dc?auto=format&fit=crop&q=80&w=800",
    },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    // In a real app we'd show a toast here, but for simplicity
    alert(`Copied: ${code}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Limited Time Deals
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Special Offers
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Save big on your next adventure with our exclusive promo codes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, idx) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col"
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute top-4 right-4 ${offer.color} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}
                >
                  {offer.discount}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 flex-grow">
                  {offer.description}
                </p>

                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400 font-bold uppercase">
                      Promo Code
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {offer.valid}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 font-mono font-bold text-gray-800 text-center tracking-widest">
                      {offer.code}
                    </div>
                    <button
                      onClick={() => handleCopy(offer.code)}
                      className="px-3 rounded-lg bg-gray-900 text-white hover:bg-emerald-500 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">
                        content_copy
                      </span>
                    </button>
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
