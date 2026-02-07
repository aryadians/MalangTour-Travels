"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HelpCenterPage() {
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([
    {
      role: "bot",
      text: "Hello! I am your MalangTravel AI Assistant. How can I help you today? 🤖",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");

    // Simulate Bot Response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Thanks for asking! Our support team is currently online. You can also contact us via WhatsApp at +62 812-3456-7890.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Help Center
          </h1>
          <p className="text-gray-500">We are here to assist your journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FAQ Application */}
          <div className="space-y-4">
            <h2 className="font-bold text-xl text-gray-900">
              Frequently Asked Questions
            </h2>
            {[
              "How do I reschedule my trip?",
              "What payment methods do you accept?",
              "Is there a refund policy?",
              "How do I use my travel points?",
            ].map((q, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-emerald-200 cursor-pointer transition-colors group"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 group-hover:text-emerald-600">
                    {q}
                  </span>
                  <span className="material-symbols-outlined text-gray-400">
                    add
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chatbot */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-[500px]">
            <div className="bg-emerald-600 p-4 text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="material-symbols-outlined">smart_toy</span>
              </div>
              <div>
                <h3 className="font-bold">Travel Assistant</h3>
                <p className="text-xs text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Online
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                        msg.role === "user"
                          ? "bg-emerald-500 text-white rounded-br-none"
                          : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <form
              onSubmit={handleSend}
              className="p-4 bg-white border-t border-gray-100 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <button
                type="submit"
                className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white hover:bg-emerald-600 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
