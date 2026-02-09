"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const posts = [
  {
    slug: "bromo-sunrise-guide",
    title: "Bromo Sunrise: The Ultimate 2024 Survival Guide",
    category: "Adventure",
    date: "Feb 10, 2026",
    image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=1000",
    excerpt: "Everything you need to know about catching the perfect sunrise at King Kong Hill, from clothing to Jeep rentals."
  },
  {
    slug: "batu-culinary-spots",
    title: "5 Hidden Culinary Spots in Batu You Must Visit",
    category: "Food",
    date: "Feb 08, 2026",
    image: "https://images.unsplash.com/photo-1510662145379-13537db782dc?auto=format&fit=crop&q=80&w=1000",
    excerpt: "Forget the tourist traps. We explore the authentic local flavors that Batu locals keep to themselves."
  },
  {
    slug: "tumpak-sewu-photography",
    title: "Photography Tips for Tumpak Sewu Waterfall",
    category: "Photography",
    date: "Feb 05, 2026",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1000",
    excerpt: "Learn how to capture the 'Thousand Waterfalls' without getting your gear soaked or slipping on the rocks."
  }
];

export default function BlogPage() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen font-display pb-32">
      {/* Header */}
      <header className="pt-32 pb-20 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-6">
          <span className="text-emerald-500 font-black text-xs tracking-[0.4em] uppercase">Travel Insights</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">The Adventure <br /> Journal.</h1>
          <p className="text-slate-500 font-medium text-lg">Curated stories, expert guides, and local secrets from the heart of East Java.</p>
        </motion.div>
      </header>

      {/* Featured Post */}
      <section className="px-6 mb-20">
        <div className="max-w-7xl mx-auto">
          <Link href="/blog/bromo-sunrise-guide" className="group">
            <div className="relative h-[60vh] rounded-[3.5rem] overflow-hidden shadow-2xl">
              <img src={posts[0].image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-16 space-y-4">
                <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{posts[0].category}</span>
                <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight max-w-4xl leading-none">{posts[0].title}</h2>
                <p className="text-white/60 font-medium text-lg max-w-2xl">{posts[0].excerpt}</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.slice(1).map((post, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="group">
              <Link href={`/blog/${post.slug}`}>
                <div className="h-80 rounded-[2.5rem] overflow-hidden mb-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
                  <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-500 font-black text-[10px] uppercase tracking-widest">{post.category}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-emerald-500 transition-colors">{post.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Stay Inspired.</h2>
            <p className="text-white/50 font-medium max-w-xl mx-auto">Join 10,000+ travelers getting our monthly curated guides and exclusive offers.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Your email address" className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-emerald-500 transition-colors" />
              <button className="px-8 py-4 bg-emerald-500 text-slate-950 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white transition-all">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
