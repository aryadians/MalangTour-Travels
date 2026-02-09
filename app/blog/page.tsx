"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogPage() {
  const posts = [
    {
      title: "5 Tips for the Perfect Bromo Sunrise",
      cat: "Guide",
      date: "Oct 12, 2023",
      img: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80",
      desc: "Everything you need to know from what to wear to where to stand for the best view."
    },
    {
      title: "Malang Street Food: A Culinary Map",
      cat: "Kuliner",
      date: "Sep 28, 2023",
      img: "https://images.unsplash.com/photo-1510662145379-13537db782dc?w=800&q=80",
      desc: "Discover the best Bakso and hidden coffee spots in the heart of Malang city."
    },
    {
      title: "Hiking Tumpak Sewu Waterfall",
      cat: "Adventure",
      date: "Aug 15, 2023",
      img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
      desc: "A complete guide to exploring the most majestic waterfall in East Java safely."
    }
  ];

  return (
    <div className="bg-[#f8fafc] dark:bg-slate-950 font-display text-slate-900 dark:text-white min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-emerald-500 font-black text-xs tracking-[0.3em] uppercase mb-4 block">Travel Magazine</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">Journal & <br /> Stories.</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-sm">
            Exclusive insights and hidden gems from our local exploration team.
          </p>
        </div>

        {/* Featured Post */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="relative h-[500px] rounded-[3.5rem] overflow-hidden mb-20 group cursor-pointer shadow-2xl"
        >
          <img src={posts[0].img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-10 md:p-16 z-10 max-w-3xl">
            <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Featured Story</span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">{posts[0].title}</h2>
            <p className="text-white/70 text-lg font-medium leading-relaxed mb-8">{posts[0].desc}</p>
            <button className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-[10px] hover:text-emerald-400 transition-colors">
              Read Full Story <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </motion.div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-72 rounded-[2.5rem] overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all">
                <img src={post.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900">
                    {post.cat}
                  </span>
                </div>
              </div>
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">{post.date}</p>
              <h3 className="text-2xl font-black leading-tight tracking-tight mb-3 group-hover:text-emerald-500 transition-colors">{post.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed line-clamp-2">{post.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-32 bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-10 opacity-10">
             <span className="material-symbols-outlined text-[15rem]">mail</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 relative z-10">Fresh stories <br /> in your inbox.</h2>
          <p className="text-slate-400 font-medium mb-10 relative z-10 max-w-lg mx-auto text-lg">Join 5,000+ travelers. Get weekly tips, guides, and exclusive offers.</p>
          <div className="max-w-md mx-auto relative z-10 flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-8 py-4 bg-white/10 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-white font-medium"
            />
            <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl transition-all active:scale-95">
              Subscribe
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}