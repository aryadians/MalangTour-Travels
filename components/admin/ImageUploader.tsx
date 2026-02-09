"use client";

import React, { useState, useRef } from "react";
import toast from "react-hot-toast";

interface ImageUploaderProps {
  initialImages: string[];
  onChange: (images: string[]) => void;
}

export default function ImageUploader({ initialImages, onChange }: ImageUploaderProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [inputUrl, setInputUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddUrl = () => {
    if (!inputUrl.trim()) return;
    if (!inputUrl.startsWith("http")) {
      toast.error("Please enter a valid URL (starting with http)");
      return;
    }
    const newImages = [...images, inputUrl];
    setImages(newImages);
    onChange(newImages);
    setInputUrl("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      // Basic size validation (e.g. 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 2MB)`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImages(prev => {
          const updated = [...prev, base64String];
          onChange(updated);
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });
    
    // Clear input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onChange(newImages);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
          Gallery Management
        </label>
        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
          {images.length} Images
        </span>
      </div>
      
      {/* Visual Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group border border-slate-100 dark:border-slate-800 shadow-sm">
            <img src={img} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600 transition-all transform hover:scale-110"
                title="Remove Image"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
              <span className="text-[8px] text-white font-bold uppercase tracking-tighter bg-black/40 px-2 py-1 rounded">
                {img.startsWith('data:') ? 'Upload' : 'External'}
              </span>
            </div>
          </div>
        ))}
        
        {/* Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 gap-2 bg-slate-50 dark:bg-slate-900/50 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-500 transition-all group"
        >
          <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">add_photo_alternate</span>
          <span className="text-[10px] font-black uppercase tracking-widest">Upload File</span>
        </button>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden" 
        accept="image/*" 
        multiple
      />

      {/* URL Input Fallback */}
      <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Or add via URL</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-[10px] rounded-xl transition-all active:scale-95 shadow-lg"
          >
            Add URL
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
        <span className="material-symbols-outlined text-sm">info</span>
        <p className="text-[10px] font-medium leading-relaxed">
          Recommended: Ratio 4:3 or 1:1. Supported formats: JPG, PNG, WEBP. Max size 2MB per file.
        </p>
      </div>
    </div>
  );
}