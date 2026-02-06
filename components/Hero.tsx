import React from "react";

export default function Hero() {
  return (
    <header
      className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed group pb-20"
      data-alt="Sunrise over Mount Bromo with mist filling the volcanic caldera"
      style={{
        backgroundImage:
          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAeHxLJbKMNKHcD3feHFBNhzkghb72lE6O24pnh-gh0Ts2LDWmGjoV1BdaEH37yJP-E9PPCuTwhPXm0YLB_vDIGCoIOEwQ7vPlHsKzt1imMN1AqtxZlfLwMEEtdnpXW_ZKjSAJ_mHbm1xWnprf-5TXNCAWmUniHKarxzCcA-47L7mZg8FeQUOZCWiV2zcxiFb3lML3pxR0kdYHQcT1w68mugNXbaInP6KHcGDgM3nF6eB_b7317JhpnUadxDNGXeD05yIKpau_QFA')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center gap-6 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium uppercase tracking-wider mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          Premium Tours in East Java
        </div>
        <h2 className="text-white text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight drop-shadow-2xl max-w-4xl">
          Explore the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-200 to-primary animate-text-gradient">
            Hidden Gems
          </span>{" "}
          of Malang
        </h2>
        <p className="text-white/90 text-lg md:text-xl font-normal leading-relaxed max-w-2xl drop-shadow-lg">
          Experience the majestic Bromo sunrise, the colorful villages, and the
          crystal clear southern beaches.
        </p>
        <button className="mt-4 flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white text-base font-bold shadow-glow hover:shadow-[0_0_30px_-5px_rgba(16,183,127,0.8)] transition-all transform hover:-translate-y-1">
          <span>Start Exploring</span>
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </button>
      </div>
    </header>
  );
}
