import React from "react";
import DestinationCard from "./DestinationCard";
import { Destination } from "@prisma/client";

interface PopularDestinationsProps {
  destinations: any[]; // Using any temporarily or better yet use Prisma types if possible, but for now allow any to avoid client import issues with Prisma types if strict
}

export default function PopularDestinations({
  destinations,
}: PopularDestinationsProps) {
  return (
    <section className="py-20 md:py-28 px-6 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white tracking-tight">
              Popular Destinations
            </h2>
            <p className="text-text-muted dark:text-gray-400 text-base max-w-lg">
              Curated selection of the most breathtaking spots in Malang
              Regency.
            </p>
          </div>
          <a
            className="flex items-center gap-1 text-primary font-bold hover:text-emerald-700 transition-colors"
            href="#"
          >
            View All
            <span className="material-symbols-outlined text-sm font-bold">
              arrow_forward
            </span>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => {
            // Parse images if it's a string (from DB), otherwise use as is (if already object)
            let image = "";
            if (typeof destination.images === "string") {
              try {
                const parsed = JSON.parse(destination.images);
                image = parsed[0] || "";
              } catch (e) {
                image = "";
              }
            } else if (Array.isArray(destination.images)) {
              image = destination.images[0];
            }

            return (
              <DestinationCard
                key={destination.id}
                {...destination}
                image={image}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
