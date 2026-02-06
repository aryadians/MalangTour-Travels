import React from "react";

interface DestinationCardProps {
  image: string;
  imageAlt: string;
  price: string;
  category: string;
  title: string;
  location: string;
  rating: number;
  label: string;
}

export default function DestinationCard({
  image,
  imageAlt,
  price,
  category,
  title,
  location,
  rating,
  label,
}: DestinationCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <img
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          data-alt={imageAlt}
          src={image}
        />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
          {price}
        </div>
        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md">
          {category}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-text-main dark:text-white leading-tight mb-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-1 text-text-muted dark:text-gray-400 text-xs">
              <span className="material-symbols-outlined text-sm">
                location_on
              </span>
              {location}
            </div>
          </div>
          <div className="flex text-yellow-400 text-xs">
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "16px",
                fontVariationSettings: "'FILL' 1",
              }}
            >
              star
            </span>
            <span className="text-text-main dark:text-white font-bold ml-1">
              {rating}
            </span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <span className="text-xs text-text-muted dark:text-gray-500">
            {label}
          </span>
          <button className="text-sm font-bold text-primary hover:text-emerald-700 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
