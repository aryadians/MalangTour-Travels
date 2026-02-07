import React from "react";
import Link from "next/link";

export default function HeroVideo() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        poster="https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=1920"
      >
        <source
          // High quality aerial video of a volcanic landscape (Bromo-esque)
          src="https://videos.pexels.com/video-files/4629766/4629766-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-6 animate-fade-in-up">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-sky-300">
            Discover
          </span>
          The Hidden Magic
        </h1>
        <p className="text-lg md:text-2xl font-light max-w-2xl mb-10 opacity-90 leading-relaxed">
          Embark on a journey beyond the ordinary. Experience Malang&apos;s
          breathtaking landscapes like never before.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <Link
            href="/planner"
            className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white font-bold hover:bg-white hover:text-black transition-all duration-300"
          >
            Plan Your Journey
          </Link>
          <Link
            href="/destinations/2" // Leading to Bromo
            className="px-8 py-4 bg-primary hover:bg-emerald-600 rounded-full text-white font-bold shadow-lg shadow-emerald-500/30 transition-all duration-300 flex items-center gap-2"
          >
            <span className="material-symbols-outlined">play_circle</span>
            Watch Full Film
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <span className="material-symbols-outlined text-white text-3xl opacity-70">
          keyboard_arrow_down
        </span>
      </div>
    </div>
  );
}
