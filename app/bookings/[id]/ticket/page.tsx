"use client";

import React, { use } from "react";
import { getUserBookingById } from "@/actions/booking";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [booking, setBooking] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchBooking() {
      const result = await getUserBookingById(id);
      if (result.success && result.booking) {
        setBooking(result.booking);
      } else {
        setBooking(null);
      }
      setLoading(false);
    }
    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-bold text-[10px] tracking-widest uppercase">Securing your pass...</p>
      </div>
    );
  }

  if (!booking) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center pt-32 pb-20 px-4">
      
      {/* 1. TOP INTERFACE (Screen Only) */}
      <div className="max-w-[850px] w-full no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl">
          <div>
            <Link href="/bookings" className="inline-flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-3 hover:gap-3 transition-all">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Wallet
            </Link>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Exploration Boarding Pass</h1>
            <p className="text-slate-500 text-sm">Official digital entry document for your upcoming trip.</p>
          </div>
          <button 
            onClick={() => window.print()}
            className="bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">print</span>
            Print Ticket
          </button>
        </div>
      </div>

      {/* 2. THE TICKET (Print and Screen) */}
      <div 
        id="printable-ticket" 
        className="bg-white text-black border-2 border-slate-200 rounded-[2.5rem] shadow-2xl overflow-hidden w-full max-w-[850px] flex flex-col md:flex-row relative print:border-black print:rounded-none"
      >
        {/* Main Section */}
        <div className="flex-[2.5] p-10 md:p-14 flex flex-col justify-between border-b md:border-b-0 md:border-r-2 border-dashed border-slate-300 print:border-black">
          <div>
            <div className="flex justify-between items-start mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-3xl">landscape</span>
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">Malang Travel</h2>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-1 print:text-black">Premium Exploration</p>
                </div>
              </div>
              <div className="px-4 py-1.5 border-2 border-black rounded-lg text-[10px] font-black uppercase">
                {booking.status}
              </div>
            </div>

            <div className="space-y-8 mb-10">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] print:text-black">Destination</p>
                <h3 className="text-4xl font-black tracking-tighter leading-tight">{booking.destination.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] print:text-black">Travel Date</p>
                  <p className="font-bold text-lg">
                    {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] print:text-black">Passenger Count</p>
                  <p className="font-bold text-lg">{booking.pax} Persons</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 print:border-black">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 print:text-black">Trip Description</p>
                <p className="text-xs font-medium text-slate-600 leading-relaxed italic print:text-black">
                  {booking.destination.description}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-dashed border-slate-200 flex items-center gap-4 print:border-black">
             <span className="material-symbols-outlined">verified_user</span>
             <p className="text-[9px] font-bold uppercase tracking-widest">Authorized Ticket - Present upon arrival at meeting point.</p>
          </div>
        </div>

        {/* Stub Section */}
        <div className="flex-1 bg-slate-50 p-10 md:p-14 flex flex-col items-center justify-center text-center print:bg-white">
          <div className="w-full mb-10">
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 print:text-black">Scan to Verify</p>
             <div className="bg-white p-4 rounded-2xl shadow-xl inline-block border-2 border-black">
                {/* SVG QR CODE - Fixed Black Fill */}
                <svg viewBox="0 0 100 100" className="w-32 h-32">
                  <path fill="#000000" d="M0,0h35v35h-35V0z M5,5v25h25v-25H5z M12,12h11v11h-11V12z" />
                  <path fill="#000000" d="M65,0h35v35h-35V0z M70,5v25h25v-25H70z M77,12h11v11h-11V12z" />
                  <path fill="#000000" d="M0,65h35v35h-35V65z M5,70v25h25v-25H5z M12,77h11v11h-11V77z" />
                  <path fill="#000000" d="M45,5h10v10h-10V5z M45,25h10v10h-10V25z M45,45h10v10h-10V45z M45,65h10v10h-10V65z M45,85h10v10h-10V85z" />
                  <path fill="#000000" d="M65,45h10v10h-10V45z M85,45h10v10h-10V45z M75,55h10v10h-10V55z M65,65h10v10h-10V65z M85,65h10v10h-10V65z M75,75h10v10h-10V75z M65,85h10v10h-10V85z M85,85h10v10h-10V85z" />
                </svg>
             </div>
          </div>

          <div className="space-y-1">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] print:text-black">Booking ID</p>
            <p className="font-mono font-black text-sm uppercase tracking-widest">#{booking.id.slice(0,12)}</p>
          </div>

          <div className="mt-12 pt-10 border-t border-slate-200 w-full print:border-black">
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] print:text-black">Passenger</p>
             <p className="text-sm font-black truncate uppercase mt-1 leading-tight">{booking.user.name}</p>
          </div>
        </div>
      </div>

      {/* 3. PRINT LOGIC (Anti-Blank Page) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          /* 1. Reset Page and Orientation */
          @page {
            size: landscape;
            margin: 0;
          }
          
          /* 2. Hide everything by default */
          body * {
            visibility: hidden;
          }
          
          /* 3. Force Ticket to be visible and at the top */
          #printable-ticket, #printable-ticket * {
            visibility: visible;
          }
          
          #printable-ticket {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            height: 100% !important;
            display: flex !important;
            flex-direction: row !important;
            border: 2px solid black !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }

          /* Reset layout proportions for print */
          .flex-\\[2\\.5\\] { flex: 2.5 !important; }
          .flex-1 { flex: 1 !important; }
          .bg-slate-50 { background-color: white !important; }
          
          /* Force colors and SVG to appear */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color: black !important;
          }
          
          svg {
            display: block !important;
            width: 50mm !important;
            height: 50mm !important;
          }

          /* Hide UI elements */
          .no-print {
            display: none !important;
          }
        }
      `}} />
    </div>
  );
}