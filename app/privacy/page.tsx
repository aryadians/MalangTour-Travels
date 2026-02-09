import React from "react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-black mb-8 text-center">Privacy Policy</h1>
      <div className="prose prose-slate">
        <p>Your privacy is important to us. This policy explains how we handle your data.</p>
        <h2 className="text-2xl font-bold mt-6">Data Collection</h2>
        <p>We collect information you provide when booking or registering.</p>
      </div>
    </div>
  );
}
