"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";

// Fix Leaflet marker icon issue in Next.js
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Destination {
  id: number;
  name: string;
  slug: string;
  price: number;
  location: string;
  image: string;
}

export default function MapComponent({ destinations }: { destinations: Destination[] }) {
  // Center of Malang area
  const position: [number, number] = [-7.9666, 112.6326];

  // Helper for mock coordinates since we don't have lat/lng in DB
  const getCoords = (name: string): [number, number] => {
    if (name.includes("Bromo")) return [-7.9425, 112.9531];
    if (name.includes("Batu")) return [-7.8712, 112.5268];
    if (name.includes("Balekambang")) return [-8.4034, 112.5393];
    if (name.includes("Sempu")) return [-8.4447, 112.7077];
    if (name.includes("Tumpak Sewu")) return [-8.2306, 112.9161];
    return [-7.9819, 112.6265]; // Default Malang City
  };

  return (
    <div className="h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-900 z-10">
      <MapContainer center={position} zoom={10} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {destinations.map((dest) => (
          <Marker key={dest.id} position={getCoords(dest.name)} icon={customIcon}>
            <Popup className="custom-popup">
              <div className="w-48 overflow-hidden rounded-xl">
                <img src={dest.image} alt={dest.name} className="h-24 w-full object-cover rounded-t-xl" />
                <div className="p-3 bg-white">
                  <h4 className="font-black text-slate-900 text-xs uppercase leading-tight">{dest.name}</h4>
                  <p className="text-[10px] text-emerald-600 font-bold mt-1">IDR {dest.price.toLocaleString()}</p>
                  <Link href={`/destinations/${dest.slug}`} className="block mt-2 text-[8px] font-black text-white bg-slate-900 px-2 py-1.5 rounded-md text-center uppercase tracking-widest">
                    Explore Now
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <style jsx global>{`
        .leaflet-container { z-index: 1 !important; }
        .custom-popup .leaflet-popup-content-wrapper { padding: 0; border-radius: 1rem; overflow: hidden; }
        .custom-popup .leaflet-popup-content { margin: 0; width: 192px !important; }
      `}</style>
    </div>
  );
}