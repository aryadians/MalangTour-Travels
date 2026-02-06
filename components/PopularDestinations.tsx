import React from "react";
import DestinationCard from "./DestinationCard";

const destinations = [
  {
    id: 1,
    name: "Pantai Balekambang",
    category: "Pantai",
    location: "Bantur, Kab. Malang",
    price: 50000,
    rating: 4.8,
    description:
      "Tanah Lot-nya Malang. Memiliki Pura di atas pulau karang yang terhubung jembatan panjang. Sunset di sini sangat ikonik.",
    image:
      "https://images.unsplash.com/photo-1602154663343-89fe0bf541ab?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Gunung Bromo",
    category: "Gunung",
    location: "Taman Nasional BTS",
    price: 350000,
    rating: 5.0,
    description:
      "Saksikan matahari terbit terbaik di Jawa. Paket tour Jeep 4x4 menuju Penanjakan dan Kawah Bromo.",
    image:
      "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Kampung Warna Warni Jodipan",
    category: "Kota",
    location: "Kota Malang",
    price: 15000,
    rating: 4.5,
    description:
      "Desa wisata penuh warna di bantaran sungai Brantas. Spot foto instagramable di tengah kota.",
    image:
      "https://images.unsplash.com/photo-1596401057633-56565377f06d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Teluk Asmara",
    category: "Pantai",
    location: "Sumbermanjing Wetan",
    price: 25000,
    rating: 4.7,
    description:
      "Sering disebut sebagai Raja Ampat-nya Malang. Gugusan pulau karang kecil yang indah dengan ombak tenang.",
    image:
      "https://images.unsplash.com/photo-1510662145379-13537db782dc?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    name: "Kayutangan Heritage",
    category: "Kota",
    location: "Jl. Basuki Rahmat, Kota Malang",
    price: 0,
    rating: 4.6,
    description:
      "Kawasan kota tua dengan nuansa vintage 1930-an. Nikmati kopi lokal dan suasana malam yang syahdu.",
    image:
      "https://images.unsplash.com/photo-1533158674514-6330554c0e64?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    name: "Air Terjun Coban Rondo",
    category: "Gunung",
    location: "Pujon, Malang",
    price: 40000,
    rating: 4.6,
    description:
      "Air terjun legendaris dengan wahana Taman Labirin yang seru. Udara sejuk dan asri.",
    image:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 7,
    name: "Malang Night Paradise",
    category: "Kota",
    location: "Singosari, Malang",
    price: 85000,
    rating: 4.5,
    description:
      "Wisata malam dengan lampion cantik dan wahana air Magic Journey seperti di Venesia.",
    image:
      "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 8,
    name: "Pantai Tiga Warna",
    category: "Pantai",
    location: "Clungup Mangrove Conservation",
    price: 100000,
    rating: 4.9,
    description:
      "Kawasan konservasi dengan gradasi air laut 3 warna. Wajib reservasi, cocok untuk snorkeling.",
    image:
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800",
  },
];

export default function PopularDestinations() {
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
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} {...destination} />
          ))}
        </div>
      </div>
    </section>
  );
}
