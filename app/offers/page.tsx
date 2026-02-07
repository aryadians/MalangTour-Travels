import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OfferCard from "@/components/OfferCard";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Special Offers - Malang Travel",
  description: "Exclusive deals and promo codes for your next trip to Malang.",
};

export default async function OffersPage() {
  // Fetch offers from DB
  // Since we might not have run 'prisma db push' successfully yet,
  // we'll handle the potential empty state or error gracefully or Mock data if needed for initial display.
  // Ideally we use Prisma.

  let offers = [];
  try {
    offers = await prisma.offer.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.warn("Failed to fetch offers, likely due to migration pending.");
    // Fallback mock data for display purposes if DB isn't ready
    offers = [
      {
        id: "mock-1",
        title: "Early Bird Summer Sale",
        description:
          "Book 30 days in advance and get a massive discount on all Bromo packages.",
        discount: "20% OFF",
        code: "SUMMER20",
        validUntil: new Date("2026-06-30"),
        image:
          "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1000",
      },
      {
        id: "mock-2",
        title: "Family Bundle",
        description:
          "Kids travel free! Valid for families of 4 or more on selected customized tours.",
        discount: "Kids Free",
        code: "FAMILYFUN",
        validUntil: new Date("2026-12-31"),
        image:
          "https://images.unsplash.com/photo-1596423736783-cd55ce852c02?auto=format&fit=crop&q=80&w=1000",
      },
      {
        id: "mock-3",
        title: "Honeymoon Special",
        description:
          "Additional romantic dinner included for Batu honeymoon packages.",
        discount: "Free Dinner",
        code: "HONEYMOON",
        validUntil: new Date("2026-08-31"),
        image:
          "https://images.unsplash.com/photo-1510414842594-a61c69b5ae9e?auto=format&fit=crop&q=80&w=1000",
      },
    ];
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col pt-20">
      <main className="flex-1">
        {/* Header */}
        <div className="bg-primary/5 py-16 md:py-24 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-black text-text-main dark:text-white mb-4 tracking-tight">
            Exclusive <span className="text-primary">Deals</span>
          </h1>
          <p className="text-lg text-text-muted dark:text-gray-400 max-w-2xl mx-auto">
            Save big on your next adventure with our limited-time promotions.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <OfferCard key={offer.id} {...offer} />
            ))}
          </div>

          {offers.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <p>No active offers at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
