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
    <main className="min-h-screen bg-background-light dark:bg-background-dark pb-20 pt-24">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-text-main dark:text-white mb-4">
          Curated Tour Packages
        </h1>
        <p className="text-text-muted dark:text-gray-400 max-w-2xl mx-auto">
          Explore our handpicked selection of premium experiences in Malang and
          East Java.
        </p>
      </div>

      <PackagesGrid destinations={destinations} />
    </main>
  );
}
