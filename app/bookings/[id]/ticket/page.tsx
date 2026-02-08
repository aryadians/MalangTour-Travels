import React from "react";
import { getUserBookingById } from "@/actions/booking";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getUserBookingById(id);

  if (!result.success || !result.booking) {
    notFound();
  }

  const { booking } = result;
  
  let displayImage = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000";
  try {
    const parsed = typeof booking.destination.images === 'string' ? JSON.parse(booking.destination.images) : booking.destination.images;
    if (Array.isArray(parsed) && parsed.length > 0) displayImage = parsed[0];
  } catch (e) {}

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-6 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        {/* Navigation / Actions */}
        <div className="flex justify-between items-center mb-10 no-print">
          <Link href="/bookings" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Wallet
          </Link>
          <button 
            onClick={() => {
                if (typeof window !== 'undefined') window.print();
            }}
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:scale-105 transition-all"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            Print Ticket
          </button>
        </div>

        {/* THE TICKET */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row relative">
          
          {/* Main Ticket Area */}
          <div className="flex-1 p-10 md:p-12 space-y-10">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-500 text-4xl">landscape</span>
                <h2 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">Malang Premium</h2>
              </div>
              <div className="text-right">
                <span className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                  {booking.status}
                </span>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Boarding Pass</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Destination</p>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{booking.destination.name}</h1>
              <p className="text-emerald-500 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">location_on</span>
                {booking.destination.location}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</p>
                <p className="font-bold text-slate-900 dark:text-white">
                  {new Date(booking.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Travelers</p>
                <p className="font-bold text-slate-900 dark:text-white">{booking.pax} Persons</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Guest Name</p>
                <p className="font-bold text-slate-900 dark:text-white truncate">{booking.user.name}</p>
              </div>
            </div>

            <div className="pt-8 border-t border-dashed border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4 text-slate-400">
                <span className="material-symbols-outlined">info</span>
                <p className="text-xs font-medium italic">Please arrive at the pickup point 15 minutes before 03:00 AM.</p>
              </div>
            </div>
          </div>

          {/* Ticket Stub (QR Area) */}
          <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-800/50 p-10 md:p-12 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-dashed border-slate-200 dark:border-slate-700 text-center space-y-6">
            <div className="w-32 h-32 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-inner border border-slate-100 dark:border-slate-700 flex items-center justify-center">
              {/* Simulated QR Code */}
              <div className="grid grid-cols-4 gap-1 opacity-20">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-slate-900 dark:bg-white rounded-[2px]" />
                ))}
              </div>
              <span className="absolute material-symbols-outlined text-4xl text-slate-200 dark:text-slate-700">qr_code_2</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ticket ID</p>
              <p className="font-mono font-bold text-slate-900 dark:text-white text-xs break-all">#{booking.id.toUpperCase()}</p>
            </div>
            <div className="pt-4">
              <img 
                src={displayImage} 
                className="w-20 h-20 rounded-xl object-cover grayscale opacity-50" 
                alt="" 
              />
            </div>
          </div>

          {/* Decorative Circles for Ticket Rip Effect */}
          <div className="absolute hidden md:block w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-950 -left-4 top-1/2 -translate-y-1/2"></div>
          <div className="absolute hidden md:block w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-950 -right-4 top-1/2 -translate-y-1/2"></div>
        </div>

        {/* Policy Notice */}
        <div className="mt-12 text-center space-y-2 opacity-40">
          <p className="text-[9px] font-black uppercase tracking-widest">Digital Ticket - No physical copy required</p>
          <p className="text-[9px] font-medium italic">Terms and conditions apply. Contact support for cancellations.</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .min-h-screen { min-height: auto !important; padding: 0 !important; }
        }
      `}} />
    </div>
  );
}
