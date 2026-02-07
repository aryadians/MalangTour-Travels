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

export interface BookingHistoryItem {
  id: string;
  destinationName: string;
  date: string;
  price: number;
  status: "Completed" | "Upcoming" | "Cancelled";
  image: string;
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
  bookingHistory: BookingHistoryItem[];
  wishlist: string[];
  toggleWishlist: (id: string) => void;
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
      itinerary: [
        { time: "09:00", activity: "Perjalanan menuju Pantai Balekambang" },
        { time: "11:00", activity: "Tiba dan Eksplorasi Pura Ismoyo" },
        { time: "13:00", activity: "Makan Siang Seafood & Santai di Pantai" },
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
      itinerary: [
        { time: "08:00", activity: "Berkumpul di Stasiun Malang Kota Baru" },
        { time: "08:30", activity: "Jalan kaki menuju Kampung Warna Warni" },
        { time: "10:00", activity: "Foto-foto di Jembatan Kaca & Mural" },
      ],
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
      itinerary: [
        { time: "07:00", activity: "Perjalanan menuju Malang Selatan" },
        { time: "10:00", activity: "Snorkeling & Island Hopping" },
        { time: "12:00", activity: "Makan siang & santai di pinggir pantai" },
      ],
    },
  ]);

  // 3. USER & BOOKING STATE
  const [user, setUser] = useState<User>({
    name: "",
    points: 0,
    referralCode: "",
    isLoggedIn: false,
    email: "",
    role: "USER",
  });

  const [currentBooking, setCurrentBooking] = useState<Booking>({
    destinationId: null,
    pax: 1,
    date: "",
    totalPrice: 0,
  });

  // 3.5. BOOKING HISTORY & WISHLIST (MOCK)
  const [bookingHistory] = useState<BookingHistoryItem[]>([
    {
      id: "BK-2024001",
      destinationName: "Gunung Bromo Sunrise Tour",
      date: "2024-01-15",
      price: 350000,
      status: "Completed",
      image:
        "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: "BK-2024002",
      destinationName: "Kampung Warna Warni",
      date: "2024-02-10",
      price: 15000,
      status: "Completed",
      image:
        "https://images.unsplash.com/photo-1596401057633-56565377f06d?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: "BK-2024003",
      destinationName: "Pantai Balekambang",
      date: "2024-03-20",
      price: 50000,
      status: "Upcoming",
      image:
        "https://images.unsplash.com/photo-1602154663343-89fe0bf541ab?auto=format&fit=crop&q=80&w=200",
    },
  ]);

  const [wishlist, setWishlist] = useState<string[]>([
    "bromo-sunrise",
    "teluk-asmara",
  ]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

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
        bookingHistory,
        wishlist,
        toggleWishlist,
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
