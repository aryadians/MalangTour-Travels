import React from "react";
import { getSavedPlan } from "@/actions/ai";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function SharedPlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plan = await getSavedPlan(id);

  if (!plan) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-emerald-500 transition-colors font-bold text-sm">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </Link>
          <div className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
            Shared Itinerary
          </div>
        </div>

        <div className="bg-emerald-500 p-10 md:p-16 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <span className="material-symbols-outlined text-[15rem]">auto_awesome</span>
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-none">{plan.title}</h1>
            <p className="text-emerald-100 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">{plan.summary}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 text-sm font-black uppercase">
                Est. IDR {plan.estimatedTotal.toLocaleString()}
              </div>
              {plan.preferences && (
                <div className="px-6 py-3 bg-black/10 backdrop-blur-md rounded-2xl border border-white/5 text-xs font-bold italic">
                  &quot;{plan.preferences}&quot;
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          {plan.days.map((day: any, i: number) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-20 h-20 rounded-[2rem] bg-slate-50 dark:bg-slate-800 flex flex-col items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700 shadow-inner">
                <span className="text-[10px] font-black text-slate-400 uppercase">Day</span>
                <span className="text-3xl font-black text-emerald-500">{day.day}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{day.plan}</h3>
                <div className="flex flex-wrap gap-2">
                  {day.items.map((item: string, j: number) => (
                    <span key={j} className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest rounded-xl border border-emerald-100 dark:border-emerald-800">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-12 text-center space-y-6 text-white shadow-2xl relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-50"></div>
           <h2 className="text-3xl font-black tracking-tight relative z-10">Want a custom plan like this?</h2>
           <p className="text-slate-400 font-medium relative z-10">Join thousands of travelers who use our AI to craft perfect journeys.</p>
           <div className="pt-4 relative z-10">
             <Link href="/planner" className="px-10 py-4 bg-emerald-500 hover:bg-white hover:text-emerald-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl inline-block">
               Create My Own Itinerary
             </Link>
           </div>
        </div>
      </div>
    </main>
  );
}
