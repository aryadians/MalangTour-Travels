"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CareersPage() {
  const positions = [
    { title: "Senior Tour Guide", type: "Full-time", location: "Malang", dept: "Operations" },
    { title: "Customer Experience", type: "Full-time", location: "Remote", dept: "Support" },
    { title: "Digital Marketer", type: "Full-time", location: "Malang/Hybrid", dept: "Marketing" },
    { title: "Professional Driver", type: "Contract", location: "Malang", dept: "Operations" },
  ];

  return (
    <div className="bg-[#f8fafc] dark:bg-slate-950 font-display text-slate-900 dark:text-white min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Hero */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-emerald-500 font-black text-xs tracking-[0.3em] uppercase mb-4 block"
          >
            We are Hiring
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6"
          >
            Craft the Future <br /> of Travel.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium"
          >
            Join our mission to connect world-class travelers with the authentic spirit of East Java. We value passion, adventure, and local wisdom.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: "paid", title: "Competitive Pay", desc: "Above market standard salary and performance bonuses." },
            { icon: "travel_explore", title: "Travel Perks", desc: "Free trips to all our destinations for you and your family." },
            { icon: "health_and_safety", title: "Health & Wellness", desc: "Comprehensive health insurance and wellness programs." }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <h3 className="font-black text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Positions */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tight">Open Positions</h2>
            <span className="text-[10px] font-black text-slate-400 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-3 py-1 rounded-full uppercase">
              {positions.length} Openings
            </span>
          </div>

          <div className="grid gap-4">
            {positions.map((p, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1 block">{p.dept}</span>
                  <h4 className="text-xl font-black group-hover:text-emerald-500 transition-colors">{p.title}</h4>
                  <div className="flex gap-4 mt-2">
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span> {p.type}
                    </span>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span> {p.location}
                    </span>
                  </div>
                </div>
                <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-32 bg-emerald-500 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
             <span className="material-symbols-outlined text-[15rem]">work</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-4 relative z-10">Don't see your fit?</h2>
          <p className="text-emerald-100 font-medium mb-10 relative z-10 max-w-lg mx-auto">We are always looking for passionate travelers and creators. Send your resume to talent@malangtour.com</p>
          <a href="mailto:talent@malangtour.com" className="px-10 py-4 bg-white text-emerald-600 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl transition-all hover:scale-105 inline-block relative z-10">
            Send General Application
          </a>
        </div>

      </div>
    </div>
  );
}