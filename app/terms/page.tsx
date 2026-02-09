import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-black mb-8 text-center">Terms of Service</h1>
      <div className="prose prose-slate">
        <p>By using our services, you agree to these terms.</p>
        <h2 className="text-2xl font-bold mt-6">Booking Policy</h2>
        <p>All bookings are subject to availability and confirmation.</p>
      </div>
    </div>
  );
}
