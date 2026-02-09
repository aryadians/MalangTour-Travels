"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTravel } from "@/context/TravelContext";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/MapComponent"), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-slate-100 dark:bg-slate-800 rounded-[3rem] animate-pulse flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading Interactive Map...</div>
});

export default function HomeClient() {
  const { destinations, formatPrice, t } = useTravel();
  const [activeCategory, setActiveCategory] = useState("All");
  
  const resultsRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [weather, setWeather] = useState<{
    temp: number;
    condition: string;
  } | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-7.9425&longitude=112.9530&current=temperature_2m,weather_code",
        );
        const data = await res.json();
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: "Clear Sky",
        });
      } catch (error) {
        setWeather({ temp: 18, condition: "Sunny" });
      }
    };
    fetchWeather();
  }, []);

  const featuredPreviews = [
    { name: "Bromo Sunrise", img: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=400&q=80", tag: "Most Popular" },
    { name: "Ijen Blue Fire", img: "https://images.unsplash.com/photo-1626245914933-9f0940cc0603?w=400&q=80", tag: "Exclusive" },
    { name: "Hidden Waterfalls", img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=400&q=80", tag: "Hidden Gem" },
  ];

  const quickMenu = [
    { icon: "landscape", name: "Bromo Tour", desc: "Sunrise & Milky Way", color: "bg-blue-500" },
    { icon: "hotel", name: "Resorts", desc: "Handpicked Luxury", color: "bg-emerald-500" },
    { icon: "directions_car", name: "Premium Car", desc: "Alphard & Hiace", color: "bg-orange-500" },
    { icon: "restaurant", name: "Fine Dining", desc: "Local Authentic", color: "bg-rose-500" },
    { icon: "confirmation_number", name: "Attractions", desc: "Skip the line", color: "bg-indigo-500" },
    { icon: "more_horiz", name: "Custom Trip", desc: "Tailored for you", color: "bg-slate-500" },
  ];

  const categories = ["All", "Gunung", "Pantai", "Kota", "Kuliner"];
  
  const filteredDestinations = destinations.filter((dest) => {
    const matchesCategory = activeCategory === "All" || dest.category === activeCategory;
    return matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 font-display">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen min-h-[800px] w-full flex flex-col items-center justify-center z-10 overflow-visible">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div style={{ y: backgroundY }} className="w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=2000"
              alt="Bromo"
              className="w-full h-full object-cover brightness-[0.4] scale-105"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-[#f8fafc] dark:to-slate-950"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center flex-1">
          <motion.div style={{ opacity: heroOpacity }} className="text-center">
            {/* Weather Pill */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[11px] font-black tracking-[0.2em] uppercase mb-8 shadow-2xl"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {weather ? `MALANG LIVE: ${weather.temp}°C` : "Premium Escapes"}
            </motion.div>

            <h1 className="text-6xl md:text-[9rem] font-black text-white tracking-tighter mb-8 leading-[0.8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] uppercase">
              {t("heroTitle")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300 italic font-serif pr-4 text-7xl md:text-[10rem]">
                Travel.
              </span>
            </h1>

            <p className="text-white/70 text-lg md:text-2xl font-medium max-w-2xl mx-auto tracking-wide mb-4 leading-relaxed drop-shadow-lg">
              {t("heroSubtitle")}
            </p>
          </motion.div>
        </div>

        {/* 2. FLOATING FEATURED CARDS */}
        <div className="absolute bottom-0 left-0 right-0 z-[100] container mx-auto px-4 translate-y-1/2">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredPreviews.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1), duration: 0.8 }}
                whileHover={{ y: -15, transition: { duration: 0.3 } }}
                className="group relative h-56 md:h-72 rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.25)] border-4 border-white dark:border-slate-800 cursor-pointer bg-white dark:bg-slate-900"
              >
                <img src={p.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={p.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">{p.tag}</span>
                  <h4 className="text-2xl font-black text-white tracking-tight">{p.name}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. QUICK ACCESS PREMIUM CARDS */}
      <section className="pt-48 md:pt-64 pb-24 container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
           <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4">{t("ourSpecialities")}</span>
           <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight text-center">Full-Service Luxury.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {quickMenu.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-50 dark:border-slate-800 group cursor-pointer flex flex-col items-center text-center transition-all duration-500"
            >
              <div className={`w-16 h-16 ${item.color} rounded-3xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                <span className="material-symbols-outlined text-3xl font-icon">{item.icon}</span>
              </div>
              <h4 className="font-black text-slate-900 dark:text-white text-sm mb-2">{item.name}</h4>
              <p className="text-[10px] text-slate-400 font-medium leading-tight">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div>
              <span className="text-emerald-500 font-black text-xs tracking-[0.2em] uppercase mb-4 block">Our Philosophy</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter text-left">We Don't Just Travel, <br /> We Craft Stories.</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed text-left">
              Discover East Java through the eyes of locals. We provide exclusive access to hidden spots, premium logistics, and certified guides to ensure your journey is flawless.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "24/7 Concierge", desc: "Always available for you", icon: "support_agent" },
                { title: "Premium Fleet", desc: "Travel in maximum comfort", icon: "verified" }
              ].map((feat, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 shrink-0">
                    <span className="material-symbols-outlined font-icon">{feat.icon}</span>
                  </div>
                  <div className="text-left">
                    <h5 className="font-black text-slate-900 dark:text-white mb-1">{feat.title}</h5>
                    <p className="text-xs text-slate-400 font-medium">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-emerald-500/10 rounded-[4rem] blur-3xl"></div>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <img src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-2xl translate-y-10" alt="" />
              <img src="https://images.unsplash.com/photo-1510662145379-13537db782dc?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-2xl" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. POPULAR DESTINATIONS */}
      <section ref={resultsRef} className="py-32 bg-slate-900 rounded-[4rem] mx-4 md:mx-10 my-20 shadow-2xl overflow-hidden relative border border-white/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-emerald-400 font-black text-xs tracking-[0.3em] uppercase mb-4 block text-center">The Collection</span>
            <h2 className="text-4xl md:text-7xl font-black text-white mb-12 tracking-tighter leading-none text-center">Curated <br /> Hotspots.</h2>
            
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${
                    activeCategory === c 
                      ? "bg-emerald-500 text-slate-900 shadow-xl scale-110" 
                      : "bg-white/5 text-white/40 hover:bg-white/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredDestinations.map((dest) => (
                <motion.div
                  key={dest.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <Link href={`/destinations/${dest.slug}`} className="group block h-full">
                    <div className="bg-slate-800/50 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-emerald-500/30 transition-all duration-500 h-full flex flex-col shadow-2xl">
                      <div className="relative h-64 overflow-hidden">
                        <img src={dest.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-75 group-hover:brightness-100" alt="" />
                        <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black flex items-center gap-2 text-white shadow-xl">
                          <span className="material-symbols-outlined text-yellow-400 text-sm filled font-icon">star</span>
                          {dest.rating}
                        </div>
                      </div>
                      <div className="p-8 flex-1 flex flex-col justify-between">
                        <div className="text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 block text-left">{dest.category}</span>
                          <h3 className="text-xl font-black text-white mt-2 leading-tight group-hover:text-emerald-400 transition-colors text-left">{dest.name}</h3>
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
                           <div className="flex items-center justify-between">
                              <div className="text-left">
                                 <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1 text-left">{t("startingFrom")}</p>
                                 <p className="text-2xl font-black text-white text-left">{formatPrice(dest.price)}</p>
                              </div>
                              <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-500">
                                 <span className="material-symbols-outlined font-icon">arrow_forward</span>
                              </div>
                           </div>
                           <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
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
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">Explore the Region.</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto uppercase tracking-widest text-[10px]">Find your next adventure geographically curated for premium comfort.</p>
          </div>
          <MapComponent destinations={destinations as any} />
        </div>
      </section>

      {/* 6. EXPERT TRAVEL GUIDE */}
      <section className="py-32 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl text-left">
            <span className="text-emerald-500 font-black text-xs tracking-[0.2em] uppercase mb-4 block text-left">Travel Insights</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter text-left">{t("latestStories")}</h2>
          </div>
          <Link href="/blog" className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-emerald-500 transition-colors border-b border-slate-200 dark:border-slate-800 pb-2">Read All Guides</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: "Bromo Survival Guide", date: "Aug 24, 2023", img: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=600" },
            { title: "Hidden Waterfall Map", date: "Sep 02, 2023", img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600" },
            { title: "Culinary Hotspots", date: "Oct 12, 2023", img: "https://images.unsplash.com/photo-1510662145379-13537db782dc?auto=format&fit=crop&q=80&w=600" }
          ].map((blog, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="group cursor-pointer">
              <div className="h-80 rounded-[2.5rem] overflow-hidden mb-6 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <img src={blog.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
              </div>
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2 text-left">{blog.date}</p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-tight text-left">{blog.title}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      <Testimonials />
      <Partners />

      {/* 8. IMMERSIVE CTA */}
      <section className="py-60 bg-slate-950 text-white relative overflow-hidden text-center px-6 rounded-t-[5rem] -mt-10 shadow-[0_-40px_100px_rgba(0,0,0,0.5)] border-t border-white/5">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-emerald-500/20 rounded-full blur-[150px]"></div>
         </div>
         <div className="container mx-auto relative z-10 text-center">
            <h2 className="text-7xl md:text-[12rem] font-black tracking-tighter leading-[0.8] mb-20 uppercase text-center">UNFOLD YOUR <br /> <span className="text-white/10 italic font-serif">Destiny.</span></h2>
            <div className="flex flex-col sm:flex-row justify-center gap-8 items-center">
               <Link href="/destinations" className="px-16 py-8 bg-emerald-500 text-slate-950 rounded-full font-black uppercase tracking-[0.3em] text-sm hover:bg-white transition-all hover:scale-105 shadow-2xl shadow-emerald-500/40">
                  {t("planTrip")}
               </Link>
               <Link href="/help" className="px-16 py-8 border-2 border-white/10 text-white rounded-full font-black uppercase tracking-[0.3em] text-sm hover:bg-white/5 transition-all">
                  {t("consultExpert")}
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
