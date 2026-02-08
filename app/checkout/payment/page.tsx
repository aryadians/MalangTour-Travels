import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

import { verifySession } from "@/lib/session";
import CheckoutClient from "./CheckoutClient";
import Image from "next/image";

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const packageId = params.packageId as string;
  const date = params.date as string;
  const pax = Number(params.pax) || 2;

  if (!packageId || !date) {
    redirect("/packages"); // Redirect if missing params
  }

  // Verify Session
  const session = await verifySession();
  if (!session?.isAuth) {
    redirect(
      `/auth/login?callbackUrl=/checkout/payment?packageId=${packageId}&date=${date}&pax=${pax}`,
    );
  }

  const destination = await prisma.destination.findUnique({
    where: { id: Number(packageId) },
  });

  if (!destination) {
    notFound();
  }

  // Calculate Total Price (Simple calculation for MVP)
  const totalPrice = destination.price; // * pax if per person, but current schema/data implies package price

  // Parse images
  const images = JSON.parse((destination.images as string) || "[]");

  return (
    <div className="bg-background-light dark:bg-background-dark font-sans antialiased min-h-screen relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />

        <Image
          alt={destination.name}
          fill
          className="object-cover"
          priority
          src={
            images[0] ||
            "https://lh3.googleusercontent.com/p/AF1QipN3X-x2X2x2X2x2X2x2X2x2X2x2X2x2X2x2X2"
          }
        />
      </div>

      <div className="relative z-20 w-full max-w-5xl bg-white dark:bg-[#1a2c26] shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[720px]">
        {/* Order Summary Sidebar */}
        <div className="w-full md:w-[400px] bg-gray-50 dark:bg-[#152620] border-r border-gray-100 dark:border-white/5 p-8 flex flex-col">
          <div className="mb-6">
            <h3 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">
              Order Summary
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Order ID #TRV-{destination.id}-{Date.now().toString().slice(-4)}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar pr-2">
            <div className="bg-white dark:bg-white/5 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 mb-6">
              <div className="aspect-video w-full rounded-md bg-gray-200 mb-3 overflow-hidden relative group">
                <Image
                  alt={destination.name}
                  src={images[0]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h4 className="text-gray-900 dark:text-white font-semibold text-lg leading-tight mb-1">
                {destination.name}
              </h4>
              <p className="text-primary text-sm font-medium mb-3">
                {destination.category} •{" "}
                {new Date(date).toLocaleDateString("en-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px]">
                    group
                  </span>
                  <span>{pax} Pax</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <span className="material-symbols-outlined text-[18px]">
                    schedule
                  </span>
                  <span>{destination.openTime || "1 Day"}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t border-gray-200 dark:border-white/10 pt-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Subtotal ({pax} Pax)</span>
                <span>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Service Fee</span>
                <span>Rp 0</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Tax (Included)</span>
                <span>Rp 0</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/10">
            <div className="flex justify-between items-end">
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Total Due
              </span>
              <span className="text-gray-900 dark:text-white text-2xl font-bold tracking-tight">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(totalPrice)}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-400 justify-center bg-gray-100 dark:bg-white/5 py-2 rounded-md">
              <span className="material-symbols-outlined text-[14px]">
                lock
              </span>
              Secure Payment by Midtrans
            </div>
          </div>
        </div>

        {/* Client Component for Interaction */}
        <CheckoutClient
          destination={destination}
          date={date}
          pax={pax}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
}
