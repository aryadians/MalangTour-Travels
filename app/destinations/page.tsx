import React from "react";
import DestinationsClient from "@/components/DestinationsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Destinations - Malang Premium Tours",
  description: "Discover the best travel hotspots in Malang, East Java. From Bromo sunrise to hidden waterfalls.",
};

export default function DestinationsPage() {
  return <DestinationsClient />;
}
