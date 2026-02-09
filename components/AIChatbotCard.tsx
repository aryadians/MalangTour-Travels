"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generalChat } from "@/actions/ai";

export default function AIChatbotCard() {
  const [isOpen, setIsOpen] = useState(false);
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
  }, [messages, isOpen]);

  const handleSend = async () => {
    console.log("handleSend called with input:", input);
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      console.log("Calling generalChat server action...");
      const result = await generalChat(userMsg);
      console.log("generalChat result:", result);
      if (result.success) {
        setMessages(prev => [...prev, { role: "ai", text: result.text || "" }]);
      } else {
        setMessages(prev => [...prev, { role: "ai", text: result.error || "Sorry, I'm having trouble connecting. Please try again." }]);
      }
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: "ai", text: "Error: Could not reach the AI server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] no-print">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[350px] sm:w-[400px] bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-lg">smart_toy</span>
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-tight">Gemini Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">Live Advice</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/30 dark:bg-transparent">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-medium leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-emerald-500 text-white rounded-tr-none shadow-md' 
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none border border-slate-100 dark:border-slate-700 shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 flex gap-1">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-50 dark:border-slate-800">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-emerald-500 text-white rounded-lg flex items-center justify-center shadow-lg active:scale-95 disabled:opacity-50 transition-all"
                >
                  <span className="material-symbols-outlined text-lg">send</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen ? 'bg-slate-900 rotate-90' : 'bg-emerald-500'
        }`}
      >
        <span className="material-symbols-outlined text-white text-3xl">
          {isOpen ? 'close' : 'smart_toy'}
        </span>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-950 animate-bounce"></span>
        )}
      </motion.button>
    </div>
  );
}