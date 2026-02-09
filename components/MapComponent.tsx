"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";

// Fix Leaflet default icon issue
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapProps {
  destinations: any[];
}

export default function MapComponent({ destinations }: MapProps) {
  // Malang Center
  const position: [number, number] = [-7.9666, 112.6326];

  return (
    <div className="h-[400px] w-full rounded-[3rem] overflow-hidden shadow-xl border border-white/20 relative z-0">
      <MapContainer 
        center={position} 
        zoom={10} 
        scrollWheelZoom={false} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {destinations.map((dest) => {
          // Mock coordinates based on location keywords if real coords missing
          // In production, add lat/lng to database
          let lat = -7.9 + (Math.random() - 0.5) * 0.5;
          let lng = 112.6 + (Math.random() - 0.5) * 0.5;

          if (dest.name.includes("Bromo")) { lat = -7.942; lng = 112.953; }
          if (dest.name.includes("Batu")) { lat = -7.871; lng = 112.527; }
          if (dest.name.includes("Pantai")) { lat = -8.389; lng = 112.686; }

          return (
            <Marker key={dest.id} position={[lat, lng]} icon={customIcon}>
              <Popup>
                <div className="min-w-[150px]">
                  <h3 className="font-bold text-sm mb-1">{dest.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{dest.category}</p>
                  <Link 
                    href={`/destinations/${dest.slug}`}
                    className="block text-center bg-emerald-500 text-white text-[10px] font-bold py-1 px-2 rounded hover:bg-emerald-600"
                  >
                    View Details
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
