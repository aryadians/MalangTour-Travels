import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800 pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <span
                className="material-symbols-outlined text-white"
                style={{ fontSize: "20px" }}
              >
                landscape
              </span>
            </div>
            <span className="text-xl font-bold text-text-main dark:text-white tracking-tight">
              MalangTravel
            </span>
          </div>
          <p className="text-text-muted dark:text-gray-400 text-sm max-w-xs leading-relaxed">
            Discover the hidden paradise of East Java with our premium local
            tours.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-text-muted dark:text-gray-400">
          <Link
            href="#"
            className="hover:text-primary transition-colors hover:underline underline-offset-4"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="hover:text-primary transition-colors hover:underline underline-offset-4"
          >
            Destinations
          </Link>
          <Link
            href="#"
            className="hover:text-primary transition-colors hover:underline underline-offset-4"
          >
            Packages
          </Link>
          <Link
            href="#"
            className="hover:text-primary transition-colors hover:underline underline-offset-4"
          >
            Blog
          </Link>
          <Link
            href="#"
            className="hover:text-primary transition-colors hover:underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="hover:text-primary transition-colors hover:underline underline-offset-4"
          >
            Terms
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
        <p>© 2024 MalangTravel. All rights reserved.</p>
        <div className="flex gap-4">
          {/* Social placeholders */}
          <a href="#" className="hover:text-primary transition-colors">
            Instagram
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Twitter
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
