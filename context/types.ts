import { translations } from "@/lib/i18n";

export interface Destination {
  id: string | number;
  name: string;
  slug: string;
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

export interface User {
  name: string;
  points: number;
  referralCode: string;
  isLoggedIn: boolean;
  email?: string;
  role?: string;
}

export interface Booking {
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

export interface TravelContextType {
  destinations: Destination[];
  language: "ID" | "EN";
  setLanguage: (lang: "ID" | "EN") => void;
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
  t: (key: keyof typeof translations.ID) => string;
}
