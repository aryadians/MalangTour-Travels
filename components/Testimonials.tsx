"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Travel Blogger",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      quote: "The Bromo sunrise tour was absolutely magical! The level of detail and premium service is unmatched in East Java.",
      tag: "Verified Traveler"
    },
    {
      name: "David Chen",
      role: "Photographer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      quote: "Logistics for Tumpak Sewu were seamless. As a photographer, having a team that understands light and timing is crucial.",
      tag: "Verified Traveler"
    },
    {
      name: "Amanda Pratama",
      role: "Family Traveler",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
      quote: "They customized the entire Bromo itinerary to be kid-friendly. Truly a worry-free experience for our family.",
      tag: "Verified Traveler"
    },
  ];

  return (
    <section className="py-32 px-6 bg-slate-950 relative overflow-hidden">
      {/* Editorial Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-emerald-400 font-black text-xs tracking-[0.3em] uppercase mb-4 block"
          >
            Social Proof
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter"
          >
            Voices of the <span className="text-white/20 italic font-serif">Curious.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group relative"
            >
              {/* Quote Mark */}
              <div className="absolute -top-6 -left-4 text-emerald-500/20 text-8xl font-serif select-none pointer-events-none group-hover:text-emerald-500/40 transition-colors">
                &ldquo;
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 h-full flex flex-col shadow-2xl">
                <div className="mb-8">
                  <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/20">
                    {t.tag}
                  </span>
                </div>

                <p className="text-white/80 text-xl font-medium leading-relaxed mb-10 italic leading-snug">
                  &quot;{t.quote}&quot;
                </p>

                <div className="flex items-center gap-5 mt-auto pt-8 border-t border-white/5">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 shadow-xl border border-white/10">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-black text-white tracking-wide text-lg">
                      {t.name}
                    </h4>
                    <span className="text-xs text-white/40 font-bold uppercase tracking-widest">
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
