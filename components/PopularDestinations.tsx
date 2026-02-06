import React from "react";
import DestinationCard from "./DestinationCard";

const destinations = [
  {
    id: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCL8WFCFnCE04dyLtJe4zJ1FBPMarxb_UQYc2W4GEjvU9YS2KBi-E2QreXFxEQTOYWVMwSK09okNE9CPpNwK0IuqQK8hMQT7ap5ueYOmjpmkyFr7PowQIovczDgdztE23RuQUmDGPVtD22q3rsXR9HeHYjh28UZjBEyqQrCBrr6KHjjzQ9Cnb2ho_H74Cfcpa-9p7h1lvJyURS5yV0b6iUNIcikEBMUNnhlqFKNtEiH8M5yw3qIIVCxw6pHw8nWOGDHrlz-8HzNOg",
    imageAlt: "Jeep driving on the sand sea of Mount Bromo",
    price: "IDR 350k",
    category: "Mountain",
    title: "Mount Bromo",
    location: "Probolinggo/Malang",
    rating: 4.9,
    label: "1 Day Trip",
  },
  {
    id: 2,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWIYG3iRxEwDqOuwFbjTL6x9S99K6XNsSqshrsrvtMZZzAhbH3RTvW_zyr8J7aE3M2wAKwfNLQI3bdzp-salVF7gCO3mJc2lh7BD4sYRgmTsvazZKoQkGlqOoZ9hL94xPLdz0VB4PdXwiHio5OqTLxTLzje6LUjLmI2uvSdgzt0mTjs-1jkS98YkE_XNN6mXm48jl7OBDRvPOROUoJpCtCWVVioLU3kbNIVcq6uMjsbsMEOhsvczb05cjIpnXvnJ3UI1o7SujrjQ",
    imageAlt: "Temple on a rock formation in the ocean at Balekambang beach",
    price: "IDR 50k",
    category: "Beach",
    title: "Balekambang Beach",
    location: "Bantur, Malang",
    rating: 4.7,
    label: "Entry Ticket",
  },
  {
    id: 3,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBL2lBFJU32MSHd452j18IrCtPwW8U54Zvy-yF1oW1yypBBIpcV5_l9TSE4c9um9awzla0AB2hko2luiCb-254i3VcSxxWfBwxnDNNXOFrQzljg6aqox7oDj_OrS-xMFyWULprr9KPeVylbfMIrTeKCftXkUGyj7RPR2bPDco_KbuGzZLnquKbL1laLXVz6Bf5687h5rtKzr2KUh2yy-eNz-U7qKcmwlOrpeAG3PryUl4iIsqMbHN8FEz3OdE1ADRWsAjuMMD3NNA",
    imageAlt: "Colorful houses in Jodipan village Malang",
    price: "IDR 15k",
    category: "City",
    title: "Kampung Warna Warni",
    location: "Jodipan, Malang City",
    rating: 4.5,
    label: "Walking Tour",
  },
  {
    id: 4,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvHJBBraWoVxbbZqPu9SFj1eDgR_R14vAbcDJuklSzF9RRz1sy4L_ZfAF4fUhnmuslvG0KnoGbJsMm742RMK_6r63z3c6DD-hIAjDmmI2V-lBlvvXl0ky4ft4W4I9-Nc82TbvaAtSuwVmEIqoi8As-Yu-sQwyIvhnvVU3NvojYjRds-xAOVlfKwaTW2ORznwySfA-ImPmXaKGxh_aTO2d3mm9MH7Pg97q8n86Tqy2UPRXRduq04rSYXaOHvxpc79W96jgnMBvRXw",
    imageAlt:
      "Aerial view of small islands in blue water, similar to Raja Ampat but in Malang",
    price: "IDR 25k",
    category: "Beach",
    title: "Teluk Asmara",
    location: "Southern Malang",
    rating: 4.8,
    label: "Entry Ticket",
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
