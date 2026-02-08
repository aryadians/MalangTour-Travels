"use client";

import React, { useState } from "react";

interface ImageUploaderProps {
  initialImages: string[];
  onChange: (images: string[]) => void;
}

export default function ImageUploader({ initialImages, onChange }: ImageUploaderProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [inputUrl, setInputUrl] = useState("");

  const handleAdd = () => {
    if (!inputUrl.trim()) return;
    const newImages = [...images, inputUrl];
    setImages(newImages);
    onChange(newImages);
    setInputUrl("");
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
        Gallery Images
      </label>
      
      {/* Visual Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-200">
            <img src={img} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>
          </div>
        ))}
        
        {/* Add Button Placeholder (For future Drag & Drop) */}
        <div className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 gap-2 bg-gray-50">
          <span className="material-symbols-outlined text-3xl">cloud_upload</span>
          <span className="text-xs font-bold">Upload (Pro)</span>
        </div>
      </div>

      {/* URL Input Fallback */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Paste image URL here..."
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors"
        >
          Add
        </button>
      </div>
      <p className="text-xs text-gray-400">
        * Pro Tip: Use Unsplash or Cloudinary URLs for best performance.
      </p>
    </div>
  );
}
