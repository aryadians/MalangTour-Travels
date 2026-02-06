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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSession();

  return (
    <html lang="en" className={`${inter.variable} light`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-display bg-background-light text-text-main dark:bg-background-dark dark:text-white antialiased overflow-x-hidden selection:bg-primary selection:text-white">
        {/* Note: Navbar is absolute/transparent by default, fits Home page.
            For other pages, we might need a wrapper or prop. */}
        <Navbar user={user} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
