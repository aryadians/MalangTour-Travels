"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBookingById } from "@/actions/booking";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TicketPage() {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getBookingById(id as string).then(res => {
        if (res.success && res.booking) {
          setBooking(res.booking);
        } else {
          router.push("/profile");
        }
        setIsLoading(false);
      });
    }
  }, [id, router]);

  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading Ticket...</div>;
  if (!booking) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-12 flex flex-col items-center">
      <div className="max-w-xl w-full no-print mb-8 flex justify-between items-center">
        <Link href="/profile" className="flex items-center gap-2 text-slate-500 hover:text-emerald-500 font-bold text-sm transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Profile
        </Link>
        <button 
          onClick={() => window.print()}
          className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">print</span>
          Print Ticket
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800"
      >
        {/* Header */}
        <div className="bg-emerald-500 p-8 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight">E-Ticket</h1>
            <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mt-1">Malang Premium Tours</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Order ID</p>
            <p className="font-mono text-sm font-black">{booking.id.substring(0, 8).toUpperCase()}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-10 space-y-8">
          <div className="flex justify-between gap-8">
            <div className="flex-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Destination</label>
              <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">{booking.destination.name}</h2>
              <p className="text-sm text-slate-500 font-medium mt-1">{booking.destination.location}</p>
            </div>
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center p-2">
              {/* Dummy QR Code */}
              <div className="grid grid-cols-4 gap-1 opacity-20">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className={`w-3 h-3 bg-slate-900 dark:bg-white ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 py-8 border-y border-dashed border-slate-200 dark:border-slate-800">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Traveler Name</label>
              <p className="font-bold text-slate-900 dark:text-white">{booking.user.name}</p>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Departure Date</label>
              <p className="font-bold text-slate-900 dark:text-white">{new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Guests</label>
              <p className="font-bold text-slate-900 dark:text-white">{booking.pax} Person(s)</p>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Total Paid</label>
              <p className="font-bold text-emerald-600">IDR {booking.totalPrice.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Important Notes</h4>
            <ul className="text-xs text-slate-500 space-y-2 font-medium">
              <li className="flex gap-2">
                <span className="text-emerald-500 font-black">•</span>
                Please arrive at the pickup point 15 minutes before departure.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500 font-black">•</span>
                Show this digital or printed ticket to our guide.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500 font-black">•</span>
                Tickets are non-refundable but can be rescheduled 48h prior.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Enjoy Your Premium Adventure</p>
        </div>
      </motion.div>
    </div>
  );
}