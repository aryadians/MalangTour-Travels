"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      q: "How do I download my tour itinerary?",
      a: "You can download your itinerary directly from the 'My Trip Wallet' section in your dashboard. A copy is also sent to your email after booking.",
      cat: "Booking"
    },
    {
      q: "Where is the AI Trip Planner?",
      a: "Navigate to /planner and select the 'AI Gemini' tab, or click 'Plan Your Trip' on the home page.",
      cat: "Features"
    },
    {
      q: "What is the cancellation policy?",
      a: "Free cancellation is available up to 24 hours before your trip. Cancellations within 24 hours are non-refundable.",
      cat: "Cancellation"
    },
    {
      q: "What should I wear for Bromo sunrise?",
      a: "Bromo can be very cold (5-10°C). We recommend a thick jacket, gloves, and comfortable hiking shoes.",
      cat: "Trip Prep"
    },
    {
      q: "How do I use my loyalty points?",
      a: "During checkout, you'll see an option to 'Use Points'. 10 points equals Rp 1,000 discount.",
      cat: "Payment"
    },
    {
      q: "Are the tours private or shared?",
      a: "We specialize in Premium Private Tours to ensure the best and most flexible experience for our guests.",
      cat: "Booking"
    },
    {
      q: "Is insurance included?",
      a: "Yes, basic travel insurance is included in all our premium tour packages for your safety.",
      cat: "Trip Prep"
    },
    {
      q: "Do you provide airport pickup?",
      a: "Yes, we provide pickup from Abdul Rachman Saleh Airport (MLG) or any hotel in Malang city center.",
      cat: "Trip Prep"
    },
    {
      q: "Can I pay using Credit Card?",
      a: "Absolutely. We accept QRIS, Credit Cards (Visa/Mastercard), and Virtual Accounts via Midtrans.",
      cat: "Payment"
    },
    {
      q: "How do I become a guide?",
      a: "Check our /careers page for open positions or send your CV to hr@malangtour.com.",
      cat: "Features"
    }
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter(f => 
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
      f.a.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col pt-20">
      <main className="flex-grow">
        <div className="max-w-[960px] mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-slate-900 dark:text-white font-medium">Help Center</span>
          </div>
        </div>

        <section className="px-4 pb-8">
          <div className="max-w-[960px] mx-auto">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 min-h-[320px] flex flex-col items-center justify-center text-center px-4 py-12 shadow-2xl">
              <div className="absolute inset-0 opacity-20">
                 <img src="https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="" />
              </div>
              <h1 className="text-white text-3xl md:text-5xl font-black mb-4 tracking-tight relative z-10">How can we help?</h1>
              <p className="text-slate-300 text-base md:text-lg max-w-xl mb-8 font-medium relative z-10">Search our expanded FAQ or browse categories below.</p>
              
              <div className="w-full max-w-[560px] relative group z-10">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 group-focus-within:text-emerald-500 transition-colors">search</span>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full h-14 pl-12 pr-4 rounded-xl border-0 focus:ring-4 focus:ring-emerald-500/20 shadow-lg bg-white text-slate-900 placeholder:text-slate-400 text-base transition-all"
                  placeholder="Search for topics (e.g., 'refunds', 'bromo')..."
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-8">
          <div className="max-w-[960px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Frequently Asked</h2>
              <span className="text-[10px] font-black text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full uppercase">{filteredFaqs.length} Articles</span>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800 overflow-hidden shadow-sm">
              <AnimatePresence mode="popLayout">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, i) => (
                    <motion.details 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={faq.q} 
                      className="group p-6 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-900 dark:text-white font-bold hover:text-emerald-500 transition-colors">
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded uppercase">{faq.cat}</span>
                          <span>{faq.q}</span>
                        </div>
                        <span className="material-symbols-outlined text-slate-400 transition group-open:-rotate-180">expand_more</span>
                      </summary>
                      <p className="mt-4 leading-relaxed text-slate-500 dark:text-slate-400 pl-4 border-l-2 border-emerald-500 ml-2 text-sm font-medium">
                        {faq.a}
                      </p>
                    </motion.details>
                  ))
                ) : (
                  <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                    No results found for &quot;{searchTerm}&quot;
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-4 py-12 mb-12">
          <div className="max-w-[960px] mx-auto">
            <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 to-transparent opacity-50"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-emerald-400 mb-8">
                  <span className="material-symbols-outlined text-4xl">support_agent</span>
                </div>
                <h2 className="text-3xl font-black mb-4 tracking-tight">Still can't find the answer?</h2>
                <p className="text-slate-400 mb-10 max-w-md mx-auto font-medium">Our premium support team is available 24/7 to help you with your trip to Malang.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="flex items-center justify-center gap-3 px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95">
                    <span className="material-symbols-outlined text-lg">chat</span>
                    WhatsApp
                  </button>
                  <button className="flex items-center justify-center gap-3 px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95">
                    <span className="material-symbols-outlined text-lg">mail</span>
                    Email Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
