"use client";

import React, { useState, useEffect } from "react";
import { getDestinations } from "@/actions/destination";
import { getMe } from "@/actions/auth";
import { getWishlist, toggleWishlist as toggleWishlistAction } from "@/actions/wishlist";
import { translations } from "@/lib/i18n";
import { TravelContext } from "./TravelContext";
import { Destination, User, Booking, BookingHistoryItem } from "./types";

export const TravelProvider = ({ children }: { children: React.ReactNode }) => {
  // 1. GLOBAL SETTINGS STATE
  const [language, setLanguage] = useState<"ID" | "EN">("ID");
  const [currency, setCurrency] = useState("IDR");
  const [exchangeRate] = useState(15500);

  const t = (key: keyof typeof translations.ID) => {
    return translations[language][key] || key;
  };

  // 2. DESTINATIONS STATE
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
          reviews: Math.floor(Math.random() * 200) + 50,
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

  const [bookingHistory] = useState<BookingHistoryItem[]>([]);
  const [wishlist, setWishlist] = useState<(string | number)[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user.isLoggedIn) {
        const items = await getWishlist();
        setWishlist(items);
      } else {
        setWishlist([]);
      }
    };
    fetchWishlist();
  }, [user.isLoggedIn]);

  const toggleWishlist = async (id: string | number) => {
    if (!user.isLoggedIn) return;

    const isAdding = !wishlist.includes(id);
    setWishlist((prev) =>
      isAdding ? [...prev, id] : prev.filter((item) => item !== id),
    );

    const result = await toggleWishlistAction(Number(id));
    if (result.error) {
      setWishlist((prev) =>
        isAdding ? prev.filter((item) => item !== id) : [...prev, id],
      );
    }
  };

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
        t,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};
