import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSession } from "@/lib/session";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Malang Travel - Explore Hidden Gems",
  description:
    "Experience the majestic Bromo sunrise, the colorful villages, and the crystal clear southern beaches.",
};

import { TravelProvider } from "@/context/TravelProvider";
import { Toaster } from "react-hot-toast";
import LayoutTransition from "@/components/LayoutTransition";
import AIChatbotCard from "@/components/AIChatbotCard";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Try to get session but handle potential errors or mismatches
  let user = null;
  try {
    user = await getSession();
  } catch (e) {
    console.error("Session fetch failed in layout", e);
  }

  return (
    <html lang="en" className={`${inter.variable} light`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MalangTour" />
        <link rel="apple-touch-icon" href="/globe.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-display bg-background-light text-text-main dark:bg-background-dark dark:text-white antialiased overflow-x-hidden selection:bg-primary selection:text-white">
        <TravelProvider>
          {/* Note: Navbar is handled inside pages or components now using Context if customized */}
          <Navbar user={user} />
          <main>
            <LayoutTransition>
              {children}
            </LayoutTransition>
          </main>
          <Footer />
          <AIChatbotCard />
          <Toaster position="top-center" reverseOrder={false} />
        </TravelProvider>
      </body>
    </html>
  );
}
