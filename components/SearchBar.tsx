import React from "react";

export default function SearchBar() {
  return (
    <div className="relative z-30 px-6 -mt-16 md:-mt-20">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-3 md:p-4">
        <form className="flex flex-col md:flex-row items-center gap-3">
          {/* Location Input */}
          <div className="relative w-full md:flex-1 group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div className="flex flex-col w-full">
              <label className="sr-only" htmlFor="destination">
                Destination
              </label>
              <input
                className="w-full h-14 pl-14 pr-4 bg-gray-50 dark:bg-gray-700/50 border-transparent focus:border-primary/50 focus:bg-white focus:text-gray-900 focus:ring-0 rounded-xl text-text-main dark:text-white placeholder:text-gray-400 text-sm font-medium transition-colors"
                id="destination"
                placeholder="Where do you want to go?"
                type="text"
              />
            </div>
          </div>
          <div className="w-px h-10 bg-gray-200 hidden md:block"></div>
          {/* Category Select */}
          <div className="relative w-full md:w-1/4 group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
              <span className="material-symbols-outlined">category</span>
            </div>
            <select
              className="w-full h-14 pl-14 pr-10 bg-gray-50 dark:bg-gray-700/50 border-transparent focus:border-primary/50 focus:bg-white focus:text-gray-900 focus:ring-0 rounded-xl text-text-main dark:text-white text-sm font-medium appearance-none cursor-pointer transition-colors"
              defaultValue=""
            >
              <option disabled value="">
                Category
              </option>
              <option value="gunung">Mountain (Gunung)</option>
              <option value="pantai">Beach (Pantai)</option>
              <option value="kota">City (Kota)</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-sm">
                expand_more
              </span>
            </div>
          </div>
          <div className="w-px h-10 bg-gray-200 hidden md:block"></div>
          {/* Date Input */}
          <div className="relative w-full md:w-1/4 group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
            <input
              className="w-full h-14 pl-14 pr-4 bg-gray-50 dark:bg-gray-700/50 border-transparent focus:border-primary/50 focus:bg-white focus:text-gray-900 focus:ring-0 rounded-xl text-text-main dark:text-white text-sm font-medium cursor-pointer transition-colors"
              type="date"
            />
          </div>
          {/* Search Button */}
          <button
            className="w-full md:w-auto h-14 md:aspect-square flex items-center justify-center bg-primary hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>
      </div>
    </div>
  );
}
