import React from "react";
import { prisma } from "@/lib/prisma";
import BookingTable from "./BookingTable";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      destination: true,
    },
  });

  return <BookingTable bookings={bookings} />;
}
