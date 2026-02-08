"use client";

import React from "react";

export default function DestinationDetailPage() {
  return (
    <div className="bg-white font-display text-slate-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] lg:h-[70vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/p/AF1QipN3X-x2X2x2X2x2X2x2X2x2X2x2X2x2X2x2X2')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 text-white">
          <div className="max-w-[1200px] mx-auto">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/30">
              East Java, Indonesia
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-lg leading-tight">
              Mount Bromo
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl font-medium drop-shadow-md">
              Witness the unearthly beauty of an active volcano in a sea of
              sand.
            </p>
          </div>
        </div>
        {/* Back Button */}
        <button className="absolute top-6 left-6 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content (Left 2/3) */}
          <div className="lg:col-span-2 space-y-12">
            {/* About Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  info
                </span>
                About the Destination
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">
                Mount Bromo is an active somma volcano and part of the Tengger
                massif, in East Java, Indonesia. At 2,329 meters (7,641 ft), it
                is not the highest peak of the massif, but the most famous. The
                whole area is a protected nature reserve since 1919.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                The best way to visit Mount Bromo is from the nearby village of
                Cemoro Lawang. From there it is possible to walk to the volcano
                in about 45 minutes, but it is also possible to take an
                organized jeep tour, which includes a stop at the viewpoint on
                Mount Penanjakan (2,770 m or 9,088 ft).
              </p>
            </section>

            {/* Essential Info Grid */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Essential Info</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-surface-light border border-slate-100 flex items-start gap-4">
                  <span className="material-symbols-outlined text-3xl text-primary">
                    thermometer
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">
                      Weather &amp; Climate
                    </h3>
                    <p className="text-sm text-slate-500">
                      Cold at night (5-10°C), pleasant during the day. Best time
                      to visit: Dry season (April - October).
                    </p>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-surface-light border border-slate-100 flex items-start gap-4">
                  <span className="material-symbols-outlined text-3xl text-primary">
                    hiking
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">
                      Difficulty Level
                    </h3>
                    <p className="text-sm text-slate-500">
                      Moderate. Requires some walking and climbing stairs to the
                      crater rim. Jeep accessible.
                    </p>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-surface-light border border-slate-100 flex items-start gap-4">
                  <span className="material-symbols-outlined text-3xl text-primary">
                    payments
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">
                      Entrance Fees
                    </h3>
                    <p className="text-sm text-slate-500">
                      Weekdays: IDR 220k (Foreigner), IDR 29k (Local). Weekends:
                      IDR 320k (Foreigner), IDR 34k (Local).
                    </p>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-surface-light border border-slate-100 flex items-start gap-4">
                  <span className="material-symbols-outlined text-3xl text-primary">
                    checkroom
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">
                      What to Wear
                    </h3>
                    <p className="text-sm text-slate-500">
                      Warm jacket, gloves, beanie, and comfortable trekking
                      shoes are essential.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery (Mini) */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-64 md:h-80">
                <div
                  className="col-span-2 row-span-2 rounded-2xl bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/p/AF1QipN3X-x2X2x2X2x2X2x2X2x2X2x2X2x2X2x2X2')",
                  }}
                ></div>
                <div
                  className="rounded-2xl bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/p/AF1QipN3X-x2X2x2X2x2X2x2X2x2X2x2X2x2X2x2X2')",
                  }}
                ></div>
                <div
                  className="rounded-2xl bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/p/AF1QipN3X-x2X2x2X2x2X2x2X2x2X2x2X2x2X2x2X2')",
                  }}
                ></div>
                <div
                  className="rounded-2xl bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/p/AF1QipN3X-x2X2x2X2x2X2x2X2x2X2x2X2x2X2x2X2')",
                  }}
                ></div>
                <div className="rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold cursor-pointer hover:bg-slate-200 transition-colors">
                  +12 More
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar (Right 1/3) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Available Packages Widget */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                <h3 className="font-bold text-lg mb-4 text-slate-900">
                  Available Packages
                </h3>
                <div className="space-y-4">
                  {/* Package Card 1 */}
                  <div className="group border border-slate-200 rounded-xl p-3 hover:border-primary cursor-pointer transition-all hover:shadow-md">
                    <div className="flex gap-3">
                      <div
                        className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0"
                        style={{
                          backgroundImage:
                            "url('https://lh3.googleusercontent.com/p/AF1QipN3X-x2X2x2X2x2X2x2X2x2X2x2X2x2X2x2X2')",
                        }}
                      ></div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                          Bromo Sunrise &amp; Secret Savannah Private Tour
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                          <span className="material-symbols-outlined text-[14px]">
                            schedule
                          </span>
                          12 Hours
                        </div>
                        <div className="font-bold text-primary text-sm">
                          IDR 750k
                          <span className="text-slate-400 font-normal text-xs ml-1">
                            /pax
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Package Card 2 */}
                  <div className="group border border-slate-200 rounded-xl p-3 hover:border-primary cursor-pointer transition-all hover:shadow-md">
                    <div className="flex gap-3">
                      <div
                        className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0"
                        style={{
                          backgroundImage:
                            "url('https://lh3.googleusercontent.com/p/AF1QipN3X-x2X2x2X2x2X2x2X2x2X2x2X2x2X2x2X2')",
                        }}
                      ></div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                          Open Trip Bromo Midnight Adventure
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                          <span className="material-symbols-outlined text-[14px]">
                            schedule
                          </span>
                          12 Hours
                        </div>
                        <div className="font-bold text-primary text-sm">
                          IDR 350k
                          <span className="text-slate-400 font-normal text-xs ml-1">
                            /pax
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-xl transition-all">
                  View All Packages
                </button>
              </div>

              {/* Location Map Widget */}
              <div className="bg-slate-100 rounded-2xl h-64 relative overflow-hidden group">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
                  style={{
                    backgroundImage:
                      "url('https://maps.googleapis.com/maps/api/staticmap?center=-7.942493,112.953012&zoom=11&size=600x300&maptype=roadmap&key=YOUR_API_KEY')",
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white px-4 py-2 rounded-full font-bold text-sm shadow-md hover:scale-105 transition-transform text-slate-900">
                    View on Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Mobile Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 pb-6 z-50 flex items-center justify-between shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <div>
          <p className="text-xs text-slate-500 font-medium">Starting from</p>
          <p className="text-lg font-bold text-primary">
            IDR 350k
            <span className="text-sm font-normal text-slate-400">/pax</span>
          </p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/30">
          See Packages
        </button>
      </div>
    </div>
  );
}
