import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BookingForm from "@/components/BookingForm";
import { getSession } from "@/lib/session";
import WishlistButton from "@/components/WishlistButton";

// Generate static params (fetch IDs from DB)
export async function generateStaticParams() {
  const destinations = await prisma.destination.findMany({
    select: { id: true },
  });
  return destinations.map((dest) => ({
    id: dest.id.toString(),
  }));
}

export default async function DestinationDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();

  const destination = await prisma.destination.findUnique({
    where: { id },
  });

  if (!destination) {
    notFound();
  }

  const session = await getSession();

  let isWishlisted = false;
  if (session && session.userId) {
    const wishlistEntry = await prisma.wishlist.findFirst({
      where: {
        userId: session.userId,
        destinationId: id,
      },
    });
    isWishlisted = !!wishlistEntry;
  }

  // Parse JSON fields
  let images: string[] = [];
  try {
    images =
      typeof destination.images === "string"
        ? JSON.parse(destination.images)
        : [];
  } catch (e) {
    images = [];
  }

  let highlights: any[] = [];
  try {
    highlights =
      typeof destination.highlights === "string"
        ? JSON.parse(destination.highlights)
        : [];
  } catch (e) {
    highlights = [];
  }

  let itinerary: any[] = [];
  try {
    itinerary =
      typeof destination.itinerary === "string"
        ? JSON.parse(destination.itinerary)
        : [];
  } catch (e) {
    itinerary = [];
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main dark:text-white transition-colors duration-200 min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-background-dark/90 backdrop-blur-md px-6 lg:px-10 py-3">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-xl">landscape</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight">
            Malang Travel
          </h2>
        </Link>
        <div className="hidden md:flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Destinations
            </Link>
            <Link
              href="/packages"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Packages
            </Link>
            <Link
              href="/help"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>
          {session ? (
            <Link
              href="/bookings"
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors text-sm font-bold"
            >
              My Bookings
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-primary hover:bg-emerald-600 transition-colors text-white text-sm font-bold shadow-sm shadow-primary/20"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center w-full px-4 md:px-10 lg:px-20 py-6 md:py-10">
        <div className="w-full max-w-7xl flex flex-col gap-8">
          {/* Breadcrumb / Back */}
          <div className="flex justify-start">
            <Link
              href="/"
              className="group flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-sm font-medium"
            >
              <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Hero Section */}
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
            <img
              src={images[0] || ""}
              alt={destination.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20 w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                    {destination.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      verified
                    </span>{" "}
                    Certified Dest.
                  </span>
                </div>
                <h1 className="text-white text-3xl md:text-5xl font-black tracking-tight mb-2 text-shadow-sm">
                  {destination.name}
                </h1>
                <div className="flex items-center text-white/90 gap-2 text-sm md:text-base font-medium">
                  <span className="material-symbols-outlined text-[20px]">
                    location_on
                  </span>
                  <span>{destination.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <WishlistButton
                  destinationId={destination.id}
                  initialIsWishlisted={isWishlisted}
                  isLoggedIn={!!session?.userId}
                />
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                  <span
                    className="material-symbols-outlined text-accent"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-white font-bold text-lg">
                    {destination.rating}
                  </span>
                  <span className="text-white/70 text-sm">(Verified)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Left Column: Details & Itinerary */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              {/* Description */}
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold">About this destination</h3>
                <p className="text-text-muted dark:text-gray-300 leading-relaxed text-base md:text-lg">
                  {destination.description}
                </p>
                {/* Highlights Icons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {highlights.map((highlight: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex flex-col gap-2 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="material-symbols-outlined text-primary text-3xl">
                        {highlight.icon}
                      </span>
                      <span className="text-sm font-semibold">
                        {highlight.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full h-px bg-gray-100 dark:bg-gray-700"></div>

              {/* Itinerary */}
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    timeline
                  </span>{" "}
                  Itinerary Highlight
                </h3>
                <div className="relative pl-4 space-y-8 before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-gray-200 before:to-gray-200 before:rounded-full">
                  {itinerary.map((item: any, idx: number) => (
                    <div key={idx} className="relative flex items-start group">
                      <div className="absolute left-0 -ml-1.5 h-3 w-3 rounded-full border-2 border-white dark:border-background-dark bg-primary shadow"></div>
                      <div className="pl-8 w-full">
                        <span className="text-xs font-bold text-primary tracking-wider uppercase">
                          {item.time}
                        </span>
                        <h4 className="text-lg font-bold mt-1">{item.title}</h4>
                        <p className="text-text-muted dark:text-gray-400 text-sm mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 h-48 md:h-64">
                {images.map((src: string, idx: number) => (
                  <div
                    key={idx}
                    className={`rounded-xl overflow-hidden relative h-full bg-gray-100 dark:bg-gray-800 ${
                      idx > 2 ? "hidden lg:block" : ""
                    }`}
                  >
                    <img
                      src={src}
                      alt={`Gallery ${idx + 1}`}
                      className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Sticky Booking Card - Using Client Component */}
            <div className="lg:col-span-1">
              <BookingForm
                destinationId={destination.id}
                pricePerPax={destination.price}
                userId={session?.userId}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
