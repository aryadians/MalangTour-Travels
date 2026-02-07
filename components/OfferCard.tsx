"use client";

import React, { useState } from "react";

interface OfferProps {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  validUntil: Date;
  image: string;
}

export default function OfferCard({
  title,
  description,
  discount,
  code,
  validUntil,
  image,
}: OfferProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md animate-bounce">
          {discount}
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
            <span>Valid until:</span>
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {new Date(validUntil).toLocaleDateString()}
            </span>
          </div>

          <div className="p-1 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-between border border-dashed border-gray-300 dark:border-gray-600">
            <div className="px-4 font-mono font-bold text-primary tracking-wider">
              {code}
            </div>
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                copied
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200"
              }`}
            >
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
