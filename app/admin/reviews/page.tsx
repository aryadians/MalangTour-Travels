"use client";

import React, { useEffect, useState } from "react";
import { getAllReviews, deleteReview } from "@/actions/review";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    setIsLoading(true);
    const result = await getAllReviews();
    if (result.success) {
      setReviews(result.reviews);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Delete this review?")) {
      const result = await deleteReview(id);
      if (result.success) {
        toast.success("Review deleted");
        fetchReviews();
      } else {
        toast.error("Failed to delete");
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Review Moderation</h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Manage customer feedback and maintain service quality.</p>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="p-20 text-center text-slate-400">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="p-20 text-center text-slate-400">No reviews found.</div>
        ) : (
          <AnimatePresence>
            {reviews.map((rev) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex justify-between items-start group"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-bold uppercase">
                    {rev.user.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-black text-slate-900 dark:text-white">{rev.user.name}</h4>
                      <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md uppercase">
                        {rev.destination.name}
                      </span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`material-symbols-outlined text-xs ${i < rev.rating ? 'text-yellow-400 filled' : 'text-slate-200'}`}>star</span>
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 italic">"{rev.comment}"</p>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">{new Date(rev.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(rev.id)}
                  className="p-2 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
