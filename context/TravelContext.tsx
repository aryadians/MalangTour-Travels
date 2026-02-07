"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getDestinations } from "@/actions/destination";
import { getMe } from "@/actions/auth";

// Define Types
export interface Destination {
  id: string | number;
  name: string;
  category: string;
  location: string;
  price: number;
  rating: number;
  reviews?: number;
  image: string;
  images?: string[];
  description: string;
  features?: string[];
  highlights?: any[];
  itinerary: any[];
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
  wishlist: (string | number)[];
  toggleWishlist: (id: string | number) => void;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export const TravelProvider = ({ children }: { children: React.ReactNode }) => {
  // 1. GLOBAL SETTINGS STATE
  const [language, setLanguage] = useState("ID"); // ID or EN
  const [currency, setCurrency] = useState("IDR"); // IDR or USD
  const [exchangeRate] = useState(15500); // Simple mock rate for USD

  // 2. DESTINATIONS STATE (Fetched from DB)
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      const data = await getDestinations();
      const mappedDestinations: Destination[] = data.map((d: any) => {
        let images = [];
        try {
          images = typeof d.images === "string" ? JSON.parse(d.images) : d.images;
        } catch (e) {
          images = [];
        }

        let itinerary = [];
        try {
          itinerary = typeof d.itinerary === "string" ? JSON.parse(d.itinerary) : d.itinerary;
        } catch (e) {
          itinerary = [];
        }

        return {
          ...d,
          image: images[0] || "",
          images: images,
          itinerary: itinerary,
          reviews: Math.floor(Math.random() * 200) + 50, // Mock reviews since not in DB
        };
      });
      setDestinations(mappedDestinations);
    };

    fetchDestinations();
  }, []);

  // 3. USER & BOOKING STATE
  const [user, setUser] = useState<User>({
    name: "",
    points: 0,
    referralCode: "",
    isLoggedIn: false,
    email: "",
    role: "USER",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getMe();
      if (userData) {
        setUser({
          name: userData.name || "",
          points: userData.points || 0,
          referralCode: userData.referralCode || "",
          isLoggedIn: true,
          email: userData.email,
          role: userData.role,
        });
      }
    };
    fetchUser();
  }, []);

  const [currentBooking, setCurrentBooking] = useState<Booking>({
    destinationId: null,
    pax: 1,
    date: "",
    totalPrice: 0,
  });

  // 3.5. BOOKING HISTORY & WISHLIST (MOCK)
  const [bookingHistory] = useState<BookingHistoryItem[]>([]);

  const [wishlist, setWishlist] = useState<(string | number)[]>([]);

  const toggleWishlist = (id: string | number) => {
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
