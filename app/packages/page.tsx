import { prisma } from "@/lib/prisma";
import PackagesGrid from "./PackagesGrid";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Tour Packages - Malang Travel",
  description:
    "Explore our curated selection of tour packages in Malang and Batu.",
};

export default async function PackagesPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: {
      rating: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Reusing existing Navbar structure/logic if needed, or simply importing it */}
      {/* Assuming Navbar handles session internally or we need to pass it. 
          The previous analysis showed Navbar fetches session in some contexts, 
          but usually `page.tsx` fetches it.
          Let's check Navbar.tsx usage in other pages. 
          Actually, `app/layout.tsx` or specific pages use Navbar using session passed from server component.
          Let's verify Navbar usage quickly. 
          Wait, I can just fetch data here and pass it.
      */}
      <Navbar />

      <main className="flex flex-col">
        {/* Simple Hero */}
        <div className="relative bg-primary/10 dark:bg-primary/5 py-20 px-6 md:px-10 lg:px-20 flex flex-col items-center justify-center text-center gap-6">
          <h1 className="text-4xl md:text-6xl font-black text-[#111816] dark:text-white tracking-tight">
            Curated <span className="text-primary">Tour Packages</span>
          </h1>
          <p className="text-lg md:text-xl text-text-muted dark:text-gray-300 max-w-2xl">
            Discover the best of Malang with our hand-picked itineraries
            designed for every type of traveler.
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-12 md:py-20">
          <PackagesGrid destinations={destinations as any} />
          {/* Casting to any to avoid strict type checks on Date vs String serialization if needed, 
               though Prisma types should match generally. images is string in DB. */}
        </div>
      </main>

      <Footer />
    </div>
  );
}
