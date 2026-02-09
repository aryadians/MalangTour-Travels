import React from "react";
import Link from "next/link";

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-black mb-8 text-center">Sitemap</h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-emerald-600 font-bold">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/destinations">Destinations</Link></li>
        <li><Link href="/packages">Packages</Link></li>
        <li><Link href="/offers">Offers</Link></li>
        <li><Link href="/about">About Us</Link></li>
        <li><Link href="/help">Help Center</Link></li>
        <li><Link href="/gallery">Gallery</Link></li>
      </ul>
    </div>
  );
}
