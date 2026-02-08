import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const destination = await prisma.destination.findFirst({
    where: { slug },
  });

  if (!destination) {
    notFound();
  }

  // Parse JSON fields
  const images = JSON.parse((destination.images as string) || "[]");
  const facilities = JSON.parse((destination.facilities as string) || "[]");
  const highlights = JSON.parse((destination.highlights as string) || "[]");
  const itinerary = JSON.parse((destination.itinerary as string) || "[]");

  // Server Action to handle booking navigation
  async function bookPackage(formData: FormData) {
    "use server";
    const date = formData.get("date");
    const guests = 2; // Fixed for honeymoon for now, or get from form
    // In a real app we'd get guests from form

    if (date) {
      redirect(
        `/checkout/payment?packageId=${destination?.id}&date=${date}&pax=${guests}`,
      );
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main font-display antialiased min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Floral Background Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-floral-pattern z-0 opacity-100" />

      {/* Main Content Wrapper */}
      <main className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-10">
        {/* Hero Section */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl mb-12 group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

          <div className="h-[500px] w-full relative">
            <Image
              src={images[0] || ""}
              alt={destination.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>
          <div className="absolute top-6 left-6 z-20">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="material-symbols-outlined text-sm icon-filled text-yellow-400">
                workspace_premium
              </span>
              {destination.category} Series
            </span>
          </div>
          <div className="absolute bottom-0 left-0 p-8 sm:p-12 z-20 max-w-3xl">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight mb-4 drop-shadow-lg">
              {destination.name}
            </h1>
            <p className="text-white/90 text-lg sm:text-xl font-medium max-w-xl drop-shadow-md">
              {destination.description}
            </p>
          </div>
        </div>

        {/* Two Column Layout: Content + Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
          {/* Left Column: Details */}
          <div className="flex flex-col gap-16">
            {/* Highlights Bar */}
            <section>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-3xl font-bold text-text-main">
                    Package Highlights
                  </h2>
                  <p className="text-text-muted text-lg">
                    Curated experiences for the perfect romantic getaway.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Highlights Dynamic Mapping */}
                  {highlights.map((highlight: string, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center p-5 bg-white border border-[#edf2f0] rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="p-3 bg-primary/10 text-primary rounded-full mb-3">
                        <span className="material-symbols-outlined">star</span>
                      </div>
                      <h3 className="font-bold text-text-main text-sm">
                        {highlight}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Gallery */}
            <section>
              <h2 className="text-3xl font-bold text-text-main mb-6">
                Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map((img: string, idx: number) => (
                  <div
                    key={idx}
                    className={`relative group rounded-2xl overflow-hidden cursor-zoom-in h-64 ${idx === 0 ? "sm:col-span-2 h-96" : ""}`}
                  >
                    <Image
                      src={img}
                      alt={`Gallery image ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section>
              <h2 className="text-3xl font-bold text-text-main mb-8">
                Itinerary Timeline
              </h2>
              <div className="relative pl-4 border-l-2 border-[#dbe6e2] ml-4 space-y-12">
                {itinerary.map((item: any, index: number) => (
                  <div key={index} className="relative pl-8 group">
                    <div className="absolute -left-[25px] top-0 flex items-center justify-center size-12 bg-white border-2 border-primary rounded-full z-10 shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary">
                        {index === 0
                          ? "flight_land"
                          : index === itinerary.length - 1
                            ? "flight_takeoff"
                            : "explore"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xl font-bold text-text-main">
                        Day {item.day}: {item.title}
                      </h3>
                      <p className="text-text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions */}
            <section className="bg-white rounded-2xl p-8 border border-[#edf2f0] shadow-sm">
              <h2 className="text-2xl font-bold text-text-main mb-6">
                Facilities
              </h2>
              <ul className="space-y-3">
                {facilities.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5">
                      check_circle
                    </span>
                    <span className="text-text-main text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Sticky Booking Sidebar */}
          <aside id="booking-form" className="relative h-full">
            <div className="sticky top-24 flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-xl border border-[#edf2f0] p-6 overflow-hidden">
                {/* Header */}
                <div className="border-b border-[#f0f4f3] pb-4 mb-4">
                  <p className="text-text-muted text-sm font-medium">
                    Starting from
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-text-main text-primary">
                      {formatCurrency(destination.price)}
                    </h3>
                  </div>
                </div>
                {/* Booking Form */}
                <form action={bookPackage} className="flex flex-col gap-4">
                  {/* Date Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-text-main tracking-wider">
                      Travel Dates
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-text-muted">
                          calendar_today
                        </span>
                      </div>
                      <input
                        type="date"
                        name="date"
                        required
                        className="block w-full pl-10 pr-3 py-2.5 bg-[#f0f4f3] border-transparent rounded-lg text-text-main focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all text-sm font-sans"
                      />
                    </div>
                  </div>
                  {/* Guests (Fixed for Couple) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-text-main tracking-wider">
                      Guests
                    </label>
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#f0f4f3] rounded-lg">
                      <span className="text-sm font-medium">2 Adults</span>
                      <input type="hidden" name="pax" value="2" />
                      <span className="material-symbols-outlined text-text-muted text-sm">
                        group
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-primary/30 transition-all transform active:scale-95 flex items-center justify-center gap-2 mt-2"
                  >
                    <span className="material-symbols-outlined">favorite</span>
                    Book This Trip
                  </button>
                  <p className="text-center text-xs text-text-muted mt-2 flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      lock
                    </span>
                    Secure payment
                  </p>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer (Simplified) */}
      <footer className="bg-background-dark text-white pt-16 pb-8 mt-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-xs">
            © 2023 Malang Premium Tours. All rights reserved.
          </p>
        </div>
      </footer>
      <style>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        .icon-filled {
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>

      {/* Mobile Sticky Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 lg:hidden z-50 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Starting from</span>
          <span className="text-lg font-bold text-emerald-600">
            {formatCurrency(destination.price)}
          </span>
        </div>
        <a
          href="#booking-form"
          className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg active:scale-95 transition-transform"
        >
          Book Now
        </a>
      </div>
    </div>
  );
}
