"use client";
import React, { useState } from "react";
import { Destination } from "@prisma/client";
import Link from "next/link";
import { deleteDestination } from "@/actions/destination";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

interface DestinationTableProps {
  destinations: Destination[];
}

export default function DestinationTable({
  destinations,
}: DestinationTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDestinations = destinations.filter((dest) =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this premium destination? This action cannot be undone.")) {
      try {
        await deleteDestination(id);
        toast.success("Destination removed successfully");
      } catch (e) {
        toast.error("Failed to delete destination");
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Inventory Management
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Control your curated tour packages and global destination data.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              search
            </span>
            <input
              type="text"
              placeholder="Filter by name..."
              className="pl-12 pr-6 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-bold shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all min-w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link
            href="/admin/destinations/new"
            className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            Add Package
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-white dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-50 dark:border-slate-800">
              <tr>
                <th className="px-8 py-6">Identity & Location</th>
                <th className="px-8 py-6">Category</th>
                <th className="px-8 py-6">Market Value</th>
                <th className="px-8 py-6">Quality</th>
                <th className="px-8 py-6 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              <AnimatePresence mode="popLayout">
                {filteredDestinations.map((dest) => {
                  let image = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000";
                  try {
                    const parsed = typeof dest.images === 'string' ? JSON.parse(dest.images) : dest.images;
                    if (Array.isArray(parsed) && parsed.length > 0) image = parsed[0];
                  } catch (e) {}

                  return (
                    <motion.tr
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={dest.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-5">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 shadow-inner">
                            <img
                              src={image}
                              alt={dest.name}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                            />
                          </div>
                          <div>
                            <p className="font-black text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                              {dest.name}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 mt-1">
                              <span className="material-symbols-outlined text-[12px]">location_on</span>
                              {dest.location}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800">
                          {dest.category}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <p className="font-black text-slate-900 dark:text-white">
                          Rp {dest.price.toLocaleString("id-ID")}
                        </p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">per booking</p>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className={`material-symbols-outlined text-sm ${i < Math.floor(dest.rating) ? 'text-yellow-400 filled' : 'text-slate-200 dark:text-slate-700'}`}
                            >
                              star
                            </span>
                          ))}
                          <span className="text-xs font-black text-slate-900 dark:text-white ml-2">{dest.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            href={`/admin/destinations/${dest.id}`}
                            className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all flex items-center justify-center shadow-sm"
                            title="Edit Record"
                          >
                            <span className="material-symbols-outlined text-xl">edit_square</span>
                          </Link>
                          <button
                            onClick={() => handleDelete(dest.id)}
                            className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center shadow-sm"
                            title="Purge Record"
                          >
                            <span className="material-symbols-outlined text-xl">delete_sweep</span>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {filteredDestinations.length === 0 && (
          <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">
            <span className="material-symbols-outlined text-4xl block mb-4 opacity-20">inventory</span>
            No matching inventory records found.
          </div>
        )}
      </div>
    </div>
  );
}