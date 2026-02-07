import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Help Center - Malang Travel",
  description: "Frequently asked questions and support for your journey.",
};

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I book a tour?",
      answer:
        "Navigate to any destination or package page, click 'Book Now', fill in your details, and proceed to payment. You will receive an instant confirmation via email.",
    },
    {
      question: "What is the cancellation policy?",
      answer:
        "We offer full refunds for cancellations made at least 48 hours before the trip. Cancellations within 48 hours are non-refundable but can be rescheduled.",
    },
    {
      question: "Is transport included?",
      answer:
        "Yes, all our Bromo and Batu tour packages include comfortable transport (Toyota HiAce or similar) with pickup/drop-off from your hotel or station in Malang.",
    },
    {
      question: "Do you provide English-speaking guides?",
      answer:
        "Absolutely! all our certified guides are fluent in English and Bahasa Indonesia. Other languages are available upon request.",
    },
    {
      question: "How do I use my promo code?",
      answer:
        "Enter your promo code at the checkout page in the 'Discount Code' field before making payment.",
    },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col pt-20">
      <main className="flex-1">
        <div className="bg-surface-light dark:bg-surface-dark py-20 px-6 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black text-text-main dark:text-white mb-6">
              How can we help?
            </h1>
            <div className="relative max-w-lg mx-auto">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">
                search
              </span>
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full pl-12 pr-6 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-text-main dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm"
              >
                <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-16 bg-primary/5 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-text-main dark:text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">
              Our support team is available 24/7 to assist you with your booking
              or itinerary planning.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors">
                Chat with Us
              </button>
              <button className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary text-gray-700 dark:text-white font-bold rounded-xl transition-colors">
                Email Support
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
