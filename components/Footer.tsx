import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="size-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20">
                <span className="material-symbols-outlined text-2xl">
                  landscape
                </span>
              </div>
              <span className="text-2xl font-black tracking-tight">
                MalangTravel
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm">
              Discover the beauty of East Java with premium comfort. From
              Bromo's sunrise to hidden beaches, we craft unforgettable
              journeys.
            </p>
            <div className="flex gap-4 pt-2">
              {["facebook", "instagram", "twitter", "youtube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all"
                >
                  <span className="material-symbols-outlined text-lg">
                    public
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  href="/destinations"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/offers"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2"
                >
                  Special Offers
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    HOT
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-emerald-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6">Stay Updated</h4>
            <div className="bg-gray-800 p-1 rounded-xl flex">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent px-4 py-2 text-sm text-white focus:outline-none w-full placeholder:text-gray-500"
              />
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                Join
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} MalangTravel. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-white transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
