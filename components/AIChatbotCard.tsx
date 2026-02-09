"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generalChat } from "@/actions/ai";

export default function AIChatbotCard() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi! I'm your Malang Travel Assistant. Ask me anything about your next trip!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    const result = await generalChat(userMsg);
    if (result.success) {
      setMessages(prev => [...prev, { role: "ai", text: result.text || "" }]);
    } else {
      setMessages(prev => [...prev, { role: "ai", text: "Sorry, I'm having trouble connecting. Please try again." }]);
    }
    setIsLoading(false);
  };

  return (
    <section className="py-20 container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-[1fr_400px]">
          
          {/* Chat Side */}
          <div className="flex flex-col h-[500px]">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                  <span className="material-symbols-outlined">smart_toy</span>
                </div>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">Gemini Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              {messages.map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-emerald-500 text-white rounded-tr-none shadow-lg' 
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none border border-slate-100 dark:border-slate-700'
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none animate-pulse flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-50 dark:border-slate-800">
              <div className="relative group">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Bromo, Batu, or local food..."
                  className="w-full pl-6 pr-16 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg active:scale-95 disabled:opacity-50 transition-all"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>

          {/* Info Side */}
          <div className="hidden lg:flex bg-slate-900 p-10 flex-col justify-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
               <span className="material-symbols-outlined text-[15rem]">explore</span>
            </div>
            <div className="relative z-10 space-y-6">
              <span className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em]">Smart Concierge</span>
              <h2 className="text-3xl font-black tracking-tight leading-none">Instant Travel Advice.</h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Our AI-powered assistant is trained on local Malang knowledge to provide you with instant answers about weather, routes, and best times to visit.
              </p>
              <div className="space-y-4 pt-4">
                {["Bromo best time?", "What to wear in Ijen?", "Halal food in Malang"].map((q, i) => (
                  <button 
                    key={i}
                    onClick={() => setInput(q)}
                    className="flex items-center gap-3 w-full p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-emerald-400 text-sm">tips_and_updates</span>
                    <span className="text-xs font-bold text-slate-300">{q}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
