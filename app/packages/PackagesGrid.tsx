"use client";

import { useState } from "react";
import DestinationCard from "@/components/DestinationCard";

interface Destination {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  rating: number;
  category: string;
  images: string; // JSON string
  // Add other fields if strictly needed, but DestinationCard uses a subset.
}

interface PackagesGridProps {
  destinations: Destination[];
}

export default function PackagesGrid({ destinations }: PackagesGridProps) {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Nature", "Adventure", "Cultural", "Relaxation"];

  const filteredDestinations =
    filter === "All"
      ? destinations
      : destinations.filter((dest) => dest.category.includes(filter));

  return (
    <div className="flex flex-col gap-8">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              filter === category
                ? "bg-primary text-white shadow-lg scale-105"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {filteredDestinations.map((dest) => {
          let imageUrl = "/placeholder.jpg";
          try {
            const parsedImages = JSON.parse(dest.images);
            if (Array.isArray(parsedImages) && parsedImages.length > 0) {
              imageUrl = parsedImages[0];
            }
          } catch (e) {
            // keep placeholder
          }

          return (
            <DestinationCard
              key={dest.id}
              id={dest.id}
              image={imageUrl}
              name={dest.name}
              price={dest.price}
              category={dest.category}
              location={dest.location}
              rating={dest.rating}
              description={dest.description}
            />
          );
        })}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl font-medium">
            No packages found for this category.
          </p>
          <button
            onClick={() => setFilter("All")}
            className="mt-4 text-primary hover:underline"
          >
            View all packages
          </button>
        </div>
      )}
    </div>
  );
}
