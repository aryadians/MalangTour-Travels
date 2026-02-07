import Link from "next/link";
import React from "react";

export default function Newsletter() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto bg-primary rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 max-w-xl">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Ready for your next adventure?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Join 10,000+ travelers getting exclusive offers and travel tips.
          </p>

          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-6 py-4 rounded-xl text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-white/50 w-full md:w-80"
            />
            <button className="px-8 py-4 rounded-xl bg-black/20 hover:bg-black/30 text-white font-bold backdrop-blur-sm transition-all border border-white/10">
              Subscribe
            </button>
          </form>
          <p className="text-white/60 text-xs mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>

        <div className="relative z-10 hidden md:block">
          {/* CTA Image or Graphic could go here */}
          <div className="size-64 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl skew-y-3 transform hover:skew-y-0 transition-all duration-500">
            <div className="text-center">
              <span className="block text-6xl font-black text-white">20%</span>
              <span className="block text-xl font-bold text-white/90 uppercase tracking-widest">
                OFF
              </span>
              <span className="block text-xs uppercase text-white/70 mt-1">
                First Booking
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
