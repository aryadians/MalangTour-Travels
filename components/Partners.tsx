"use client";

import React from "react";
import { motion } from "framer-motion";

// High-quality travel-related brand representation from Unsplash
const partnerImages = [
  { id: "v9F65Dszyas", name: "Airline Partner" },
  { id: "5AiWn2U10L8", name: "Luxury Hotel Group" },
  { id: "L8p5Cc-Zqc0", name: "Global Resorts" },
  { id: "m_HRfLhgABo", name: "Cruise Line" },
  { id: "2d4l2fL7Tww", name: "Travel Tech" },
  { id: "tH_9ImijyA4", name: "Adventure Org" },
];

export default function Partners() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden border-t border-slate-100 dark:border-white/5">
      <div className="container mx-auto px-6 mb-16 text-center">
        <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Trusted by Industry Leaders</span>
        <h3 className="text-slate-900 dark:text-white text-2xl font-black tracking-tight">Our Global Network</h3>
      </div>
      
      {/* Infinite Scroll Container */}
      <div className="relative flex overflow-x-hidden group">
        <motion.div 
          className="flex whitespace-nowrap gap-12 md:gap-24 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 35, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {/* Double the list for seamless looping */}
          {[...partnerImages, ...partnerImages].map((p, i) => (
            <div 
              key={i} 
              className="w-40 md:w-56 h-20 relative grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700 flex items-center justify-center"
            >
              <img 
                src={`https://images.unsplash.com/photo-${p.id}?w=400&h=150&fit=crop&q=80&auto=format`} 
                alt={p.name} 
                loading="lazy"
                className="max-w-full max-h-full object-contain rounded-xl shadow-sm border border-slate-100 dark:border-white/10"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=400&h=150&fit=crop";
                }}
              />
            </div>
          ))}
        </motion.div>

        {/* Gradient Overlays for high-end look */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-72 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 md:w-72 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
}
