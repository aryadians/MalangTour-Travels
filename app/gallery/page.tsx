"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function GalleryPage() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=1200",
      title: "Sunrise at Bromo",
      desc: "The golden hour at King Kong Hill",
    },
    {
      src: "https://images.unsplash.com/photo-1602154663343-89fe0bf541ab?auto=format&fit=crop&q=80&w=1200",
      title: "Balekambang Beach",
      desc: "The Tanah Lot of Malang",
    },
    {
      src: "https://images.unsplash.com/photo-1596401057633-56565377f06d?auto=format&fit=crop&q=80&w=1200",
      title: "Colorful Jodipan",
      desc: "Rainbow village in the city center",
    },
    {
      src: "https://images.unsplash.com/photo-1510662145379-13537db782dc?auto=format&fit=crop&q=80&w=1200",
      title: "Teluk Asmara",
      desc: "Crystal clear blue waters",
    },
    {
      src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=400",
      title: "Bromo Crater",
      desc: "Hiking to the smoking crater",
    },
    {
      src: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&q=80&w=600",
      title: "Teletubbies Hill",
      desc: "Green savanna in Bromo",
    },
    {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1200",
      title: "Happy Travelers",
      desc: "Our guests enjoying the trip",
    },
    {
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1200",
      title: "Local Guide",
      desc: "Our expert guiding the way",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Travel Gallery
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            See the world through our lens. Real photos from real trips.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setIndex(idx);
                setOpen(true);
              }}
              className="break-inside-avoid rounded-2xl overflow-hidden cursor-zoom-in relative group"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white flex-col p-4 text-center">
                <h3 className="font-bold text-lg">{img.title}</h3>
                <p className="text-sm text-gray-200">{img.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox is optional, using simple state if library not available, but 'yet-another-react-lightbox' is standard. 
            If not installed, we can remove it or just link the images. 
            For now assuming we want visual impact, I'll keep the structure but comment out the library dependency if it causes issues.
            Wait, I cannot use external libraries unless installed. I'll use a custom simple modal instead.
        */}
      </div>

      {/* Simple Custom Lightbox Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        >
          <button className="absolute top-6 right-6 text-white text-4xl hover:text-gray-300">
            &times;
          </button>
          <div className="max-w-5xl max-h-[90vh] relative">
            <img
              src={images[index].src}
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
              alt="Gallery Fullscreen"
            />
            <div className="absolute bottom-[-3rem] left-0 w-full text-center text-white">
              <p className="font-bold text-xl">{images[index].title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
