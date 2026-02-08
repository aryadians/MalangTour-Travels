"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { submitReview, getReviewsByDestination } from "@/actions/review";

interface Destination {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  rating: number;
  category: string;
  images: string[] | string;
  facilities: string[] | string | null;
  highlights: string[] | string | null;
  itinerary: any[] | string | null;
  openTime?: string | null;
  ticketPrice?: string | null;
}

interface DestinationDetailClientProps {
  destination: Destination;
  user?: any;
}

export default function DestinationDetailClient({
  destination,
  user,
}: DestinationDetailClientProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [starRating, setStarRating] = useState(5);

  useEffect(() => {
    setIsMounted(true);
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const result = await getReviewsByDestination(destination.id);
    if (result.success) setReviews(result.reviews || []);
  }

  const parseJSON = (data: any, fallback: any) => {
    if (typeof data === "string") {
      try {
        return JSON.parse(data);
      } catch (e) {
        return fallback;
      }
    }
    return data || fallback;
  };

  const images = parseJSON(destination.images, []);
  const facilities = parseJSON(destination.facilities, []);
  const highlights = parseJSON(destination.highlights, []);
  let itinerary = parseJSON(destination.itinerary, []);

  const getIcon = (name: string) => {
    const low = name.toLowerCase();
    if (low.includes("guide")) return "verified";
    if (low.includes("transport") || low.includes("car") || low.includes("jeep")) return "local_taxi";
    if (low.includes("photo") || low.includes("camera")) return "camera";
    if (low.includes("insurance")) return "security";
    if (low.includes("food") || low.includes("dinner") || low.includes("lunch")) return "restaurant";
    if (low.includes("hotel") || low.includes("villa") || low.includes("stay")) return "hotel";
    return "star";
  };

  const [paxCount, setPaxCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const pricePerPax = destination.price;
  const totalPrice = paxCount * pricePerPax;

  const handleBooking = () => {
    if (!selectedDate) {
      toast.error("Please select a travel date.");
      return;
    }
    
    setIsBooking(true);
    const params = new URLSearchParams({
      destinationId: destination.id.toString(),
      destinationName: destination.name,
      paxCount: paxCount.toString(),
      date: selectedDate,
      price: pricePerPax.toString(),
      image: Array.isArray(images) ? images[0] : "",
    });
    router.push(`/booking/payment?${params.toString()}`);
  };

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to leave a review.");
      return;
    }
    
    setIsSubmittingReview(true);
    const formData = new FormData(e.currentTarget);
    formData.append("destinationId", destination.id.toString());
    formData.append("rating", starRating.toString());

    const result = await submitReview(formData);
    if (result.success) {
      toast.success("Thank you for your review!");
      fetchReviews();
      (e.target as HTMLFormElement).reset();
      setStarRating(5);
    } else {
      toast.error(result.error || "Failed to submit review");
    }
    setIsSubmittingReview(false);
  };

  if (!isMounted) return null;

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen font-display pb-32">
      {/* 1. HERO HEADER */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        <img
          src={images[0] || "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80"}
          alt={destination.name}
          className="w-full h-full object-cover brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-24">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                {destination.category}
              </span>
              <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                {destination.name}
              </h1>
              <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold tracking-wide">
                <span className="material-symbols-outlined text-emerald-500">location_on</span>
                {destination.location}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. CONTENT GRID */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-8 space-y-20">
            <section className="space-y-6">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">The Experience.</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
                {destination.description}
              </p>
            </section>

            {/* Included Facilities */}
            <section className="space-y-8">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest">Included Facilities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {facilities.map((f: string, i: number) => (
                  <div key={i} className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center gap-3 transition-transform hover:scale-105">
                    <span className="material-symbols-outlined text-emerald-500 text-3xl">{getIcon(f)}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white leading-tight">{f}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Trip Highlights */}
            {highlights.length > 0 && (
              <section className="space-y-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest">Trip Highlights</h3>
                <ul className="space-y-4">
                  {highlights.map((h: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-emerald-500 mt-0.5">check_circle</span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* REVIEWS SECTION */}
            <section className="space-y-12 pt-10 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-end">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight text-left">Guest Reviews.</h2>
                <div className="text-right">
                  <p className="text-4xl font-black text-slate-900 dark:text-white">{destination.rating.toFixed(1)}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Average Rating</p>
                </div>
              </div>

              {/* Review Form */}
              {user ? (
                <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                  <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-sm text-left">Leave a Review</h4>
                  <form onSubmit={handleReviewSubmit} className="space-y-6">
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button 
                          key={s} 
                          type="button" 
                          onClick={() => setStarRating(s)}
                          className={`material-symbols-outlined text-2xl transition-colors ${s <= starRating ? 'text-yellow-400 filled' : 'text-slate-300'}`}
                        >
                          star
                        </button>
                      ))}
                    </div>
                    <textarea 
                      name="comment"
                      placeholder="Share your experience..."
                      className="w-full p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-900 dark:text-white min-h-[120px]"
                      required
                    ></textarea>
                    <button 
                      type="submit"
                      disabled={isSubmittingReview}
                      className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-[10px] rounded-xl hover:scale-105 transition-all disabled:opacity-50"
                    >
                      {isSubmittingReview ? "Posting..." : "Submit Review"}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-[2.5rem]">
                  <p className="text-slate-400 font-bold text-sm">Please login to share your travel story.</p>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-8">
                {reviews.length > 0 ? (
                  reviews.map((r, i) => (
                    <div key={i} className="flex gap-6 items-start pb-8 border-b border-slate-50 dark:border-slate-800">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center font-black text-emerald-600 shrink-0 uppercase">
                        {r.user.name?.charAt(0)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h5 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-tight">{r.user.name}</h5>
                          <div className="flex text-yellow-400">
                            {[...Array(r.rating)].map((_, i) => (
                              <span key={i} className="material-symbols-outlined text-[14px] filled">star</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">&quot;{r.comment}&quot;</p>
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{new Date(r.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-slate-400 py-10 font-bold italic text-sm">No reviews yet. Be the first to share!</p>
                )}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.08)] border border-slate-100 dark:border-slate-800 space-y-8">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Price per person</p>
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white font-serif italic">
                      Rp {pricePerPax.toLocaleString("id-ID")}
                    </h4>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-xl text-emerald-600 dark:text-emerald-400 font-black text-xs">
                    ★ {destination.rating.toFixed(1)}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Select Date</label>
                    <input
                      type="date"
                      className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white font-bold outline-none"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Guests</label>
                    <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-2 rounded-2xl">
                      <button onClick={() => setPaxCount(Math.max(1, paxCount - 1))} className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 font-black">-</button>
                      <span className="font-black text-lg">{paxCount}</span>
                      <button onClick={() => setPaxCount(paxCount + 1)} className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 font-black">+</button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 dark:border-slate-800 space-y-4 text-left">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-400 text-xs uppercase tracking-widest">Total</span>
                    <span className="text-2xl font-black text-emerald-500 text-left">Rp {totalPrice.toLocaleString("id-ID")}</span>
                  </div>
                  <button onClick={handleBooking} disabled={isBooking} className="w-full py-5 bg-emerald-500 text-slate-950 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl active:scale-95 disabled:opacity-50">
                    {isBooking ? "Confirming..." : "Book Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}