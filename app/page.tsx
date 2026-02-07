"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTravel } from "@/context/TravelContext";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  const { destinations, formatPrice } = useTravel();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [weather, setWeather] = useState<{
    temp: number;
    condition: string;
  } | null>(null);

  // Fetch Real-time Weather for Bromo
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-7.9425&longitude=112.9530&current=temperature_2m,weather_code",
        );
        const data = await res.json();
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: "Sunny",
        });
      } catch (error) {
        console.error("Failed to fetch weather", error);
        setWeather({ temp: 12, condition: "Sunny" });
      }
    };
    fetchWeather();
  }, []);

  // EXTENDED CATEGORIES (Service Menu)
  const services = [
    {
      icon: "landscape",
      name: "Open Trip",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: "family_restroom",
      name: "Family",
      color: "bg-orange-100 text-orange-600",
    },
    { icon: "favorite", name: "Honeymoon", color: "bg-pink-100 text-pink-600" },
    {
      icon: "groups",
      name: "Corporate",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: "directions_car",
      name: "Car Rental",
      color: "bg-emerald-100 text-emerald-600",
    },
    { icon: "hotel", name: "Staycation", color: "bg-cyan-100 text-cyan-600" },
  ];

  const promos = [
    {
      title: "Gajian Sale",
      desc: "Diskon up to 50% ke Bromo",
      code: "GAJIAN50",
      bg: "bg-gradient-to-r from-emerald-500 to-teal-500",
      image:
        "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Pantai Seru",
      desc: "Hemat 20% explore Malang Selatan",
      code: "PANTAI20",
      bg: "bg-gradient-to-r from-blue-500 to-indigo-500",
      image:
        "https://images.unsplash.com/photo-1510662145379-13537db782dc?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Staycation",
      desc: "Free Breakfast + Late Checkout",
      code: "SANTUY",
      bg: "bg-gradient-to-r from-orange-500 to-red-500",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400",
    },
  ];

  // Filter Logic
  const categories = ["All", "Gunung", "Pantai", "Kota", "Kuliner"];
  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || dest.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=2000"
            alt="Mount Bromo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-gray-50/90"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 md:px-6 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-4xl w-full"
          >
            {/* Weather Widget */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-white animate-pulse">
              <span className="material-symbols-outlined text-yellow-400">
                {weather ? "sunny" : "cloud"}
              </span>
              <span className="text-sm font-semibold">Bromo, Malang</span>
              <span className="text-white/50">|</span>
              <span className="text-sm font-bold">
                {weather ? `${weather.temp}°C` : "--°C"}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-2xl">
              EXPLORE{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                EAST JAVA
              </span>
            </h1>

            <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              #1 Premium Travel Agent in Malang. Trusted by 50,000+ happy
              travelers.
            </p>

            {/* BIG SEARCH BAR */}
            <div className="bg-white p-2 rounded-[2rem] shadow-2xl max-w-3xl mx-auto flex items-center gap-2 transform translate-y-8">
              <div className="flex-1 flex items-center px-6 gap-3 border-r border-gray-100">
                <span className="material-symbols-outlined text-gray-400 text-2xl">
                  location_on
                </span>
                <div className="text-left w-full">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase">
                    Destinasi
                  </label>
                  <input
                    type="text"
                    placeholder="Mau kemana hari ini?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent outline-none font-bold text-gray-900 placeholder:text-gray-300"
                  />
                </div>
              </div>
              <div className="hidden md:flex flex-1 items-center px-6 gap-3 border-r border-gray-100">
                <span className="material-symbols-outlined text-gray-400 text-2xl">
                  calendar_month
                </span>
                <div className="text-left">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase">
                    Tanggal
                  </label>
                  <span className="block font-bold text-gray-500 text-sm">
                    Any Date
                  </span>
                </div>
              </div>
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-3xl px-8 py-4 font-bold shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">search</span>
                Cari
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. SERVICE MENU (The "Popular App" look) */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 relative z-10 mb-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
          {services.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center gap-3 cursor-pointer group"
            >
              <div
                className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all`}
              >
                <span className="material-symbols-outlined text-2xl">
                  {item.icon}
                </span>
              </div>
              <span className="text-xs font-bold text-gray-600 group-hover:text-emerald-600 text-center">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. PROMO CAROUSEL */}
      <section className="mb-20 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500">
              local_fire_department
            </span>
            Hot Deals
          </h2>
          <a
            href="/offers"
            className="text-emerald-600 font-bold text-sm hover:underline"
          >
            See All Promos
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((promo, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-3xl overflow-hidden shadow-lg h-48 flex items-center cursor-pointer group`}
            >
              <img
                src={promo.image}
                className="absolute inset-0 w-full h-full object-cover"
                alt={promo.title}
              />
              <div
                className={`absolute inset-0 ${promo.bg} opacity-90 mix-blend-multiply`}
              ></div>
              <div className="relative z-10 p-6 text-white w-full">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block border border-white/30">
                  Limited Offer
                </span>
                <h3 className="text-2xl font-black mb-1">{promo.title}</h3>
                <p className="text-white/90 text-sm font-medium mb-4">
                  {promo.desc}
                </p>
                <div className="flex justify-between items-center bg-white/10 p-2 rounded-xl border border-dashed border-white/30">
                  <span className="font-mono text-sm font-bold tracking-widest">
                    {promo.code}
                  </span>
                  <span className="material-symbols-outlined text-sm">
                    content_copy
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. DESTINATIONS GRID */}
      <section className="py-12 bg-white rounded-[3rem] mb-20 shadow-sm border border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900">
              Popular Destinations
            </h2>
            <p className="text-gray-500 mt-2">Curated by our local experts</p>

            {/* Category Filters Center */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${
                    activeCategory === cat
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredDestinations.map((dest) => (
                <motion.div
                  key={dest.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Link href={`/destinations/${dest.id}`} className="group">
                    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all h-[320px] relative">
                      <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-yellow-500 text-sm">
                          star
                        </span>
                        {dest.rating}
                      </div>
                      <img
                        src={dest.image}
                        className="w-full h-1/2 object-cover"
                        alt={dest.name}
                      />
                      <div className="p-4 flex flex-col justify-between h-1/2">
                        <div>
                          <span className="text-xs font-bold text-emerald-600">
                            {dest.category}
                          </span>
                          <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight mt-1">
                            {dest.name}
                          </h3>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1">
                            Start from
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-black text-emerald-600">
                              {formatPrice(dest.price)}
                            </p>
                            <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                              <span className="material-symbols-outlined text-sm">
                                arrow_forward
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="text-center mt-12">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-gray-200 font-bold text-gray-600 hover:border-emerald-500 hover:text-emerald-600 transition-all"
            >
              View All Destinations
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="absolute -inset-4 bg-emerald-100 rounded-[3rem] -rotate-3"></div>
            <img
              src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800"
              className="relative rounded-[2.5rem] shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500"
              alt="Happy Traveler"
            />
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm bg-emerald-50 px-3 py-1 rounded-full">
              Why Choose Us
            </span>
            <h2 className="text-4xl font-black text-gray-900 leading-tight">
              We Make Your Trip <br />{" "}
              <span className="text-emerald-500">Fun & Worry-Free</span>
            </h2>
            <p className="text-gray-500 text-lg">
              We are an official partner of Pesona Indonesia with 10+ years of
              experience in managing premium tours in East Java.
            </p>

            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  title: "Best Price Guarantee",
                  desc: "Found cheaper? We match it.",
                  icon: "sell",
                },
                {
                  title: "Professional Local Guide",
                  desc: "Certified and English speaking guides.",
                  icon: "person_pin_circle",
                },
                {
                  title: "24/7 Support",
                  desc: "We are here for you, anytime.",
                  icon: "support_agent",
                },
              ].map((feat, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start p-4 hover:bg-white hover:shadow-lg rounded-2xl transition-all cursor-default group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">
                      {feat.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      {feat.title}
                    </h4>
                    <p className="text-gray-500">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5.5. TESTIMONIALS */}
      <Testimonials />

      {/* 6. NEWSLETTER & CTA */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600 rounded-full blur-[150px] opacity-20 translate-x-1/3 -translate-y-1/3"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 w-full">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready for your next adventure?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Get exclusive offers and travel tips directly to your inbox. Join
            over 10,000+ happy travelers in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-emerald-500 outline-none w-full backdrop-blur-sm"
            />
            <button className="px-8 py-4 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-900/50 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
