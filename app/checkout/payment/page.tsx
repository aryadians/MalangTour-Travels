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
