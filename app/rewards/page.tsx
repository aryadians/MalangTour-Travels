import React from "react";
import Link from "next/link";

export default function RewardsPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
          <span className="material-symbols-outlined text-4xl">loyalty</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Rewards Program
        </h1>
        <p className="text-gray-600 mb-8">
          Our rewards program is coming soon! Earn points on every booking and redeem them for exclusive discounts.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
