"use client";

import React from "react";

export default function CommunityPage() {
  return (
    <div className="bg-[#f8fafc] font-display text-slate-900 min-h-screen">
      {/* Navigation (Simplified) */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">
                landscape
              </span>
              <span className="font-bold text-xl tracking-tight">
                Malang Premium Tours
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-slate-500 hover:text-slate-900 font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-slate-900 font-medium transition-colors"
              >
                Packages
              </a>
              <a
                href="#"
                className="text-primary font-bold border-b-2 border-primary h-full flex items-center"
              >
                Community
              </a>
            </div>
            <div className="flex items-center">
              <button className="bg-primary text-white px-5 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-primary/90 transition-all">
                Box a Trip
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white pb-12 pt-8 md:pt-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Traveler Stories &amp; Reviews
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover real experiences from fellow travelers who have explored
            the beauty of Malang with us. Share your own journey!
          </p>
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">
                search
              </span>
            </div>
            <input
              type="text"
              className="block w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 text-lg transition-all shadow-sm"
              placeholder="Search reviews (e.g., 'Bromo sunrise', 'Guide')"
            />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed (Left 2/3) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                Latest Stories
              </h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors">
                  Most Popular
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-md hover:bg-primary/90 transition-colors">
                  Newest
                </button>
              </div>
            </div>

            {/* Post 1 */}
            <article className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                      <img
                        src="https://lh3.googleusercontent.com/a/ACg8ocIq8d1-1234567890" // Placeholder avatar
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://ui-avatars.com/api/?name=Sarah+J&background=random";
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">
                        Sarah Jenkins
                      </h3>
                      <p className="text-xs text-slate-500">
                        San Francisco, USA • 2 days ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    <span className="material-symbols-outlined text-sm fill-current">
                      star
                    </span>
                    <span className="material-symbols-outlined text-sm fill-current">
                      star
                    </span>
                    <span className="material-symbols-outlined text-sm fill-current">
                      star
                    </span>
                    <span className="material-symbols-outlined text-sm fill-current">
                      star
                    </span>
                    <span className="material-symbols-outlined text-sm fill-current">
                      star
                    </span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  Unforgettable Sunrise at Mount Bromo!
                </h4>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The jeep ride was bumpy but totally worth it. Our driver,
                  Budi, was amazing and knew exactly where to park for the best
                  photos. The view when the sun started rising... I have no
                  words. Highly recommend the private tour option if you want to
                  go at your own pace.
                </p>
                {/* Images Grid */}
                <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden mb-4 h-64">
                  <div
                    className="bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/p/AF1QipN3X-x2X2x2X2x2X2x2X2x2X2x2X2x2X2x2X2')",
                    }}
                  ></div>
                  <div
                    className="bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/p/AF1QipN3X-x2X2x2X2x2X2x2X2x2X2x2X2x2X2x2X2')",
                    }}
                  ></div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors text-sm font-medium">
                      <span className="material-symbols-outlined text-[18px]">
                        thumb_up
                      </span>
                      Helpful (24)
                    </button>
                    <button className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors text-sm font-medium">
                      <span className="material-symbols-outlined text-[18px]">
                        comment
                      </span>
                      Comment (3)
                    </button>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Post 2 */}
            <article className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                      <img
                        src="https://ui-avatars.com/api/?name=David+L&background=random"
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">David Lee</h3>
                      <p className="text-xs text-slate-500">
                        Singapore • 5 days ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    <span className="material-symbols-outlined text-sm fill-current">
                      star
                    </span>
                    <span className="material-symbols-outlined text-sm fill-current">
                      star
                    </span>
                    <span className="material-symbols-outlined text-sm fill-current">
                      star
                    </span>
                    <span className="material-symbols-outlined text-sm fill-current">
                      star
                    </span>
                    <span className="material-symbols-outlined text-sm">
                      star
                    </span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  Tumpak Sewu is a hidden gem
                </h4>
                <p className="text-slate-600 leading-relaxed mb-4">
                  I didn't expect the hike to be so intense, but the waterfall
                  is absolutely majestic. Bring water shoes! The guide was very
                  helpful in helping us cross the river.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors text-sm font-medium">
                      <span className="material-symbols-outlined text-[18px]">
                        thumb_up
                      </span>
                      Helpful (12)
                    </button>
                    <button className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors text-sm font-medium">
                      <span className="material-symbols-outlined text-[18px]">
                        comment
                      </span>
                      Comment (0)
                    </button>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Load More */}
            <div className="text-center pt-4">
              <button className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-all">
                Load More Stories
              </button>
            </div>
          </div>

          {/* Sidebar (Right 1/3) */}
          <div className="space-y-8">
            {/* CTA Card */}
            <div className="bg-primary rounded-2xl p-6 text-white text-center shadow-lg shadow-primary/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <span className="material-symbols-outlined text-9xl text-white">
                  edit_note
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 relative z-10">
                Share Your Experience
              </h3>
              <p className="text-white/80 text-sm mb-6 relative z-10">
                Did you enjoy your trip? Write a review and earn loyalty points!
              </p>
              <button className="w-full bg-white text-primary font-bold py-3 rounded-xl shadow-sm hover:bg-slate-50 transition-colors relative z-10">
                Write a Review
              </button>
            </div>

            {/* Top Destinations */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">
                Trending Destinations
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div
                    className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/p/AF1QipN3X-x2X2x2X2x2X2x2X2x2X2x2X2x2X2x2X2')",
                    }}
                  ></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">
                      Mount Bromo
                    </h4>
                    <p className="text-xs text-slate-500">1.2k Reviews</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div
                    className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/p/AF1QipN3X-x2X2x2X2x2X2x2X2x2X2x2X2x2X2x2X2')",
                    }}
                  ></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">
                      Ijen Crater
                    </h4>
                    <p className="text-xs text-slate-500">850 Reviews</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div
                    className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/p/AF1QipN3X-x2X2x2X2x2X2x2X2x2X2x2X2x2X2x2X2')",
                    }}
                  ></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">
                      Tumpak Sewu
                    </h4>
                    <p className="text-xs text-slate-500">620 Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
