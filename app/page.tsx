import React from "react";
import HomeClient from "@/components/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Malang Premium Tours - Redefining Luxury Travel",
  description: "Experience the majestic Bromo sunrise and hidden gems of East Java with our curated premium tours.",
};

export default function Home() {
  return <HomeClient />;
}
