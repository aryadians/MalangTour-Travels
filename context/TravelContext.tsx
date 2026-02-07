"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Define Types
interface Destination {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  features: string[];
  itinerary: { time: string; activity: string }[];
}

interface User {
  name: string;
  points: number;
  referralCode: string;
  isLoggedIn: boolean;
  email?: string;
  role?: string;
}

interface Booking {
  destinationId: string | null;
  pax: number;
  date: string;
  totalPrice: number;
}

interface TravelContextType {
  destinations: Destination[];
  language: string;
  setLanguage: (lang: string) => void;
  currency: string;
  setCurrency: (curr: string) => void;
  formatPrice: (amount: number) => string;
  user: User;
  setUser: (user: User) => void;
  currentBooking: Booking;
  updateBooking: (data: Partial<Booking>) => void;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export const TravelProvider = ({ children }: { children: React.ReactNode }) => {
  // 1. GLOBAL SETTINGS STATE
  const [language, setLanguage] = useState("ID"); // ID or EN
  const [currency, setCurrency] = useState("IDR"); // IDR or USD
  const [exchangeRate] = useState(15500); // Simple mock rate for USD

  // 2. DUMMY DESTINATIONS DATA (Data Inti Malang - Matched with Prompt)
  const [destinations] = useState<Destination[]>([
    {
      id: "bromo-sunrise",
      name: "Gunung Bromo Sunrise Tour",
      category: "Gunung",
      location: "Taman Nasional Bromo Tengger Semeru",
      price: 350000,
      rating: 5.0,
      reviews: 124,
      image:
        "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=1200",
      description:
        "Saksikan matahari terbit terbaik di Jawa dengan paket tour Jeep 4x4. Pengalaman magis melintasi lautan pasir menuju kawah aktif.",
      features: ["Jeep 4x4", "Local Guide", "Sunrise View", "Trekking"],
      itinerary: [
        { time: "03:00", activity: "Penjemputan & Menuju Penanjakan" },
        { time: "04:30", activity: "Menikmati Sunrise di Bromo" },
        { time: "06:00", activity: "Eksplorasi Kawah & Pasir Berbisik" },
      ],
    },
    {
      id: "balekambang-beach",
      name: "Pantai Balekambang",
      category: "Pantai",
      location: "Bantur, Kab. Malang",
      price: 50000,
      rating: 4.8,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1602154663343-89fe0bf541ab?auto=format&fit=crop&q=80&w=1200",
      description:
        "Dikenal sebagai Tanah Lot-nya Malang. Terdapat pura di atas pulau karang yang dihubungkan dengan jembatan panjang yang ikonik.",
      features: [
        "Pura Ismoyo",
        "Sunset View",
        "Camping Area",
        "Kuliner Seafood",
      ],
    },
    {
      id: "jodipan-colorful",
      name: "Kampung Warna Warni Jodipan",
      category: "Kota",
      location: "Kota Malang",
      price: 15000,
      rating: 4.5,
      reviews: 210,
      image:
        "https://images.unsplash.com/photo-1596401057633-56565377f06d?auto=format&fit=crop&q=80&w=1200",
      description:
        "Destinasi hits penuh warna di bantaran sungai Brantas. Spot foto instagramable paling populer di tengah kota Malang.",
      features: ["Jembatan Kaca", "Street Art", "Souvenir Lokal"],
    },
    {
      id: "teluk-asmara",
      name: "Pantai Teluk Asmara",
      category: "Pantai",
      location: "Sumbermanjing Wetan",
      price: 25000,
      rating: 4.7,
      reviews: 56,
      image:
        "https://images.unsplash.com/photo-1510662145379-13537db782dc?auto=format&fit=crop&q=80&w=1200",
      description:
        "Raja Ampat-nya Malang. Gugusan pulau karang kecil dengan air jernih dan ombak yang sangat tenang.",
      features: ["Snorkeling", "Island Hopping", "Pantai Bersih"],
    },
  ]);

  // 3. USER & BOOKING STATE
  const [user, setUser] = useState<User>({
    name: "Petualang Malang",
    points: 2500,
    referralCode: "MALANGTOP2024",
    isLoggedIn: true,
    email: "user@example.com",
    role: "USER",
  });

  const [currentBooking, setCurrentBooking] = useState<Booking>({
    destinationId: null,
    pax: 1,
    date: "",
    totalPrice: 0,
  });

  // 4. HELPER FUNCTIONS
  const formatPrice = (amount: number) => {
    if (currency === "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount / exchangeRate);
    }
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const updateBooking = (data: Partial<Booking>) => {
    setCurrentBooking((prev) => ({ ...prev, ...data }));
  };

  return (
    <TravelContext.Provider
      value={{
        destinations,
        language,
        setLanguage,
        currency,
        setCurrency,
        formatPrice,
        user,
        setUser,
        currentBooking,
        updateBooking,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (context === undefined) {
    throw new Error("useTravel must be used within a TravelProvider");
  }
  return context;
};
