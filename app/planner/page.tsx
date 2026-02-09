"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useTravel } from "@/context/TravelContext";
import { motion, AnimatePresence } from "framer-motion";
import { generateItinerary, savePlan } from "@/actions/ai";
import toast from "react-hot-toast";

export default function PlannerPage() {
  const { destinations, t } = useTravel();
  const [activeTab, setActiveTab] = useState<"manual" | "ai">("manual");

  // Manual States
  const [selectedItems, setSelectedItems] = useState<(number | string)[]>([]);
  const [days, setDays] = useState(1);
  const [pax, setPax] = useState(2);

  // AI States
  const [preferences, setPreferences] = useState("");
  const [budget, setBudget] = useState(2000000);
  const [aiPlan, setAiPlan] = useState<any>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Manual logic
  const toggleDestination = (id: number | string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const manualTotalPrice = useMemo(() => {
    const destinationsCost = selectedItems.reduce((acc: number, id) => {
      const dest = destinations.find((d) => d.id === id);
      const price = dest ? Number(dest.price) : 0;
      return acc + price;
    }, 0);
    return destinationsCost * pax + 250000 * days;
  }, [selectedItems, pax, days, destinations]);

  // AI logic
  const handleGenerateAI = async () => {
    if (!preferences.trim()) {
      toast.error(t("aiPlaceholder"));
      return;
    }
    setIsAiLoading(true);
    setAiPlan(null);
    const result = await generateItinerary(preferences, budget, days);
    if (result.success) {
      setAiPlan(result.data);
      toast.success("Itinerary Generated!");
    } else {
      toast.error(result.error || "Failed to generate plan");
    }
    setIsAiLoading(false);
  };

  const handleSavePlan = async () => {
    if (!aiPlan) return;
    setIsSaving(true);
    try {
      const result = await savePlan(aiPlan, preferences);
      if (result.success) {
        const url = `${window.location.origin}/plan/share/${result.id}`;
        await navigator.clipboard.writeText(url);
        toast.success("Link copied!");
      } else {
        toast.error("Failed to save.");
      }
    } catch (err) {
      toast.error("Error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="bg-gray-50 dark:bg-slate-950 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full hover:bg-emerald-500 hover:text-white transition-all">
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </Link>
            <h1 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t("tripPlanner")}</h1>
          </div>
          
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab("manual")}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'manual' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-sm' : 'text-slate-400'}`}
            >
              {t("manualTab")}
            </button>
            <button 
              onClick={() => setActiveTab("ai")}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'ai' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-sm' : 'text-slate-400'}`}
            >
              <span className="material-symbols-outlined text-sm">magic_button</span>
              {t("aiTab")}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full p-4 md:p-8 gap-8">
        
        {activeTab === "manual" ? (
          <>
            {/* Left: Manual Destination List */}
            <div className="w-full md:w-2/3 space-y-6">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{t("selectDestinations")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {destinations.map((dest) => {
                  const isSelected = selectedItems.includes(dest.id);
                  return (
                    <div
                      key={dest.id}
                      onClick={() => toggleDestination(dest.id)}
                      className={`relative cursor-pointer group rounded-3xl overflow-hidden border-2 transition-all duration-300 ${isSelected ? "border-emerald-500 ring-4 ring-emerald-500/10 scale-[0.98]" : "border-transparent bg-white dark:bg-slate-900 hover:border-slate-200 shadow-sm"}`}
                    >
                      <div className="relative h-40">
                        <img src={dest.image} className="w-full h-full object-cover" alt={dest.name} />
                        {isSelected && (
                          <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[2px] flex items-center justify-center">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl">
                              <span className="material-symbols-outlined text-emerald-500 font-black">check</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-black text-slate-900 dark:text-white leading-tight">{dest.name}</h3>
                        </div>
                        <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest">IDR {dest.price.toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Manual Summary */}
            <div className="w-full md:w-1/3">
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 sticky top-24">
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-500">analytics</span>
                  {t("itineraryEstimate")}
                </h3>

                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{t("durationDays")}</label>
                    <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 p-1 rounded-xl">
                      <button onClick={() => setDays(Math.max(1, days - 1))} className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-lg shadow-sm text-slate-600 dark:text-slate-300">-</button>
                      <span className="font-black w-4 text-center dark:text-white">{days}</span>
                      <button onClick={() => setDays(days + 1)} className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-lg shadow-sm text-slate-600 dark:text-slate-300">+</button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{t("travelersPax")}</label>
                    <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 p-1 rounded-xl">
                      <button onClick={() => setPax(Math.max(1, pax - 1))} className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-lg shadow-sm text-slate-600 dark:text-slate-300">-</button>
                      <span className="font-black w-4 text-center dark:text-white">{pax}</span>
                      <button onClick={() => setPax(pax + 1)} className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-lg shadow-sm text-slate-600 dark:text-slate-300">+</button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-8 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                  {selectedItems.map((id) => {
                    const dest = destinations.find((d) => d.id === id);
                    return (
                      <div key={id} className="flex justify-between text-sm animate-in fade-in slide-in-from-left-2">
                        <span className="text-slate-600 dark:text-slate-400 font-medium truncate w-2/3">{dest?.name}</span>
                        <span className="text-slate-900 dark:text-white font-bold">IDR {dest?.price.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-800/50">
                  <div className="flex justify-between items-end">
                    <span className="text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-widest">{t("totalEstimate")}</span>
                    <div className="text-right">
                      <span className="block text-2xl font-black text-emerald-700 dark:text-emerald-400">IDR {manualTotalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                  {t("bookCustom")}
                </button>
              </div>
            </div>
          </>
        ) : (
          /* AI PLANNER VIEW */
          <div className="w-full flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/3 space-y-6">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-500">psychology</span>
                  {t("aiPreferences")}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 block">{t("aiQuestion")}</label>
                    <textarea 
                      className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm font-medium"
                      placeholder={t("aiPlaceholder")}
                      rows={4}
                      value={preferences}
                      onChange={(e) => setPreferences(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 block">{t("maxPrice")} (IDR)</label>
                    <input 
                      type="range" min="500000" max="10000000" step="500000"
                      className="w-full accent-emerald-500"
                      value={budget}
                      onChange={(e) => setBudget(parseInt(e.target.value))}
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs font-bold text-slate-400">500k</span>
                      <span className="text-sm font-black text-emerald-500">IDR {budget.toLocaleString()}</span>
                      <span className="text-xs font-bold text-slate-400">10M</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleGenerateAI}
                    disabled={isAiLoading}
                    className="w-full py-4 bg-emerald-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isAiLoading ? "Dreaming up your trip..." : t("generateMagic")}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <AnimatePresence mode="wait">
                {isAiLoading ? (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-slate-900 rounded-[3rem]"
                  >
                    <div className="w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-6" />
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Gemini is Crafting...</h3>
                    <p className="text-slate-400 mt-2 font-medium">Selecting the best spots based on your mood.</p>
                  </motion.div>
                ) : aiPlan ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div className="bg-emerald-500 p-10 rounded-[3rem] text-white shadow-2xl shadow-emerald-500/20 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-10 opacity-10">
                        <span className="material-symbols-outlined text-[12rem]">auto_awesome</span>
                      </div>
                      <div className="flex justify-between items-start relative z-10">
                        <div>
                          <h2 className="text-4xl font-black tracking-tight">{aiPlan.title}</h2>
                          <p className="text-emerald-100 font-medium mt-4 text-lg max-w-xl">{aiPlan.summary}</p>
                        </div>
                        <button 
                          onClick={handleSavePlan}
                          disabled={isSaving}
                          className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl disabled:opacity-50"
                        >
                          <span className="material-symbols-outlined text-sm">{isSaving ? 'sync' : 'share'}</span>
                          {isSaving ? 'Saving...' : t("saveShare")}
                        </button>
                      </div>
                      <div className="mt-8 flex items-center gap-4 relative z-10">
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-xs font-black uppercase">{t("totalEstimate")} IDR {aiPlan.estimatedTotal.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="grid gap-6">
                      {aiPlan.days.map((day: any, i: number) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex flex-col items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700">
                            <span className="text-[10px] font-black text-slate-400 uppercase">Day</span>
                            <span className="text-2xl font-black text-emerald-500">{day.day}</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">{day.plan}</h4>
                            <div className="flex flex-wrap gap-2">
                              {day.items.map((item: string, j: number) => (
                                <span key={j} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded-lg">{item}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-[3.5rem]">
                    <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">temp_preferences_custom</span>
                    <h3 className="text-xl font-black text-slate-300 uppercase tracking-widest">Ready to plan</h3>
                    <p className="text-slate-400 mt-2 font-medium">Fill in your preferences and let Gemini do the work.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}