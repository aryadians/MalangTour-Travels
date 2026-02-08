"use client";

import React from "react";

export default function HelpCenterPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-background-dark border-b border-[#f0f4f3] dark:border-slate-800">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">
                landscape
              </span>
              <h2 className="text-[#111816] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                Malang Premium Tours
              </h2>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#"
                className="text-[#111816] dark:text-slate-200 text-sm font-medium hover:text-primary transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-[#111816] dark:text-slate-200 text-sm font-medium hover:text-primary transition-colors"
              >
                Destinations
              </a>
              <a
                href="#"
                className="text-[#111816] dark:text-slate-200 text-sm font-medium hover:text-primary transition-colors"
              >
                Packages
              </a>
              <a href="#" className="text-primary text-sm font-medium">
                Help Center
              </a>
            </nav>
            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="hidden md:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary text-white text-sm font-bold shadow-sm hover:bg-opacity-90 transition-all">
                <span className="truncate">Sign In</span>
              </button>
              {/* Mobile Menu Button */}
              <button className="md:hidden text-slate-900 dark:text-white">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="max-w-[960px] mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <a href="#" className="hover:text-primary">
              Home
            </a>
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
            <span className="text-slate-900 dark:text-white font-medium">
              Help Center
            </span>
          </div>
        </div>
        {/* Hero Search Section */}
        <section className="px-4 pb-8">
          <div className="max-w-[960px] mx-auto">
            <div
              className="relative overflow-hidden rounded-2xl bg-cover bg-center min-h-[320px] md:min-h-[400px] flex flex-col items-center justify-center text-center px-4 py-12"
              data-alt="Scenic view of Bromo mountain landscape with morning mist"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(16, 34, 28, 0.6), rgba(16, 34, 28, 0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBaTDFr7FflXPK8LskPz6WwjtsY61bG0gJw2Gk6PjPne3QkumvQuJoARNHrEYkdXz_YhhwF47Itfz20aRHRBeVruu_IEUicDY3zZZfq7NVAiqjuqo3Ax1XQIsfGYpwE7nVOObdJBwkUZwaurGgo-DzjFwYQpiuxG7FZHVL_56euGMHiFQ5ENe3Hy6qZsdIKAcrTxGVWATpYBq-sQGDvbFu5aOoI0HjdGY-9n9ofA2GGlxFg19v4lQnhPBPmKZ2pBUbMvXQ4T6nROw')",
              }}
            >
              <h1 className="text-white text-3xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-sm">
                How can we help you?
              </h1>
              <p className="text-slate-100 text-base md:text-lg max-w-xl mb-8 font-medium drop-shadow-sm">
                Your guide to exploring Malang with us. Search for answers
                below.
              </p>
              {/* Search Bar */}
              <div className="w-full max-w-[560px] relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400">
                    search
                  </span>
                </div>
                <input
                  type="text"
                  className="block w-full h-14 pl-12 pr-32 rounded-xl border-0 focus:ring-2 focus:ring-primary shadow-lg bg-white text-slate-900 placeholder:text-slate-400 text-base transition-all"
                  placeholder="Search for topics (e.g., 'refunds', 'baggage')"
                />
                <div className="absolute inset-y-0 right-1.5 flex items-center">
                  <button className="h-11 px-6 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-sm transition-colors">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Categories Grid */}
        <section className="px-4 py-8">
          <div className="max-w-[960px] mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category 1 */}
              <a
                href="#"
                className="group flex flex-col items-start p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">credit_card</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                  Booking &amp; Payment
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Reservations, invoices, and pricing guides.
                </p>
              </a>
              {/* Category 2 */}
              <a
                href="#"
                className="group flex flex-col items-start p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">
                    assignment_return
                  </span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                  Cancellation
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Refund policies and rescheduling trips.
                </p>
              </a>
              {/* Category 3 */}
              <a
                href="#"
                className="group flex flex-col items-start p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">luggage</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                  Trip Prep
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Packing lists, weather, and pickup spots.
                </p>
              </a>
              {/* Category 4 */}
              <a
                href="#"
                className="group flex flex-col items-start p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                  My Account
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Profile settings, history, and login help.
                </p>
              </a>
            </div>
          </div>
        </section>
        {/* Popular Articles */}
        <section className="px-4 py-8">
          <div className="max-w-[960px] mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Popular Articles
            </h2>
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700/50">
              <details className="group p-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-900 dark:text-white font-medium hover:text-primary transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">
                      article
                    </span>
                    <span>How do I download my tour itinerary?</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 transition group-open:-rotate-180">
                    expand_more
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-slate-500 dark:text-slate-400 pl-9 text-sm">
                  You can download your itinerary directly from the "My Trips"
                  section in your account dashboard. A PDF version is also sent
                  to your registered email immediately after booking
                  confirmation.
                </p>
              </details>
              <details className="group p-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-900 dark:text-white font-medium hover:text-primary transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">
                      article
                    </span>
                    <span>
                      What is the cancellation policy for Mt. Bromo tours?
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 transition group-open:-rotate-180">
                    expand_more
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-slate-500 dark:text-slate-400 pl-9 text-sm">
                  Cancellations made at least 48 hours before the scheduled
                  pickup time are eligible for a full refund. Cancellations
                  within 48 hours may incur a 50% fee. Please check your
                  specific package terms for exceptions.
                </p>
              </details>
              <details className="group p-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-900 dark:text-white font-medium hover:text-primary transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">
                      article
                    </span>
                    <span>Do I need to print my ticket?</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 transition group-open:-rotate-180">
                    expand_more
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-slate-500 dark:text-slate-400 pl-9 text-sm">
                  No, printing is not required. You can simply show the QR code
                  from your booking confirmation email or the mobile app to our
                  driver upon pickup.
                </p>
              </details>
              <details className="group p-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-900 dark:text-white font-medium hover:text-primary transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">
                      article
                    </span>
                    <span>What should I wear for the midnight tour?</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 transition group-open:-rotate-180">
                    expand_more
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-slate-500 dark:text-slate-400 pl-9 text-sm">
                  Temperatures can drop to 5-10°C. We highly recommend wearing a
                  thick jacket, gloves, a beanie, and comfortable trekking
                  shoes.
                </p>
              </details>
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section className="px-4 py-12 mb-12">
          <div className="max-w-[960px] mx-auto">
            <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 md:p-12 text-center border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                <span className="material-symbols-outlined text-3xl">
                  support_agent
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Still can't find the answer?
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
                Our premium support team is available 24/7 to help you with your
                trip to Malang.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">
                    chat
                  </span>
                  WhatsApp Support
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-transparent border border-slate-200 dark:border-slate-600 hover:border-primary text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary rounded-xl font-bold transition-all">
                  <span className="material-symbols-outlined text-[20px]">
                    mail
                  </span>
                  Email Us
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Simple Footer */}
      <footer className="bg-white dark:bg-surface-dark border-t border-slate-100 dark:border-slate-800 py-8">
        <div className="max-w-[960px] mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            © 2023 Malang Premium Tours. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
