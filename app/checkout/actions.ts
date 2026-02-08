"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

const bookingSchema = z.object({
  destinationId: z.coerce.number(),
  date: z.string(),
  pax: z.coerce.number(),
  totalPrice: z.coerce.number(),
});

export async function createBooking(prevState: any, formData: FormData) {
  const session = await verifySession();
  if (!session || !session.userId) {
    redirect("/auth/login");
  }

  const result = bookingSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { destinationId, date, pax, totalPrice } = result.data;

  // Create Booking
  const booking = await prisma.booking.create({
    data: {
      userId: session.userId as string,
      destinationId,
      date: new Date(date),
      pax,
      totalPrice,
      status: "CONFIRMED", // Immediate confirmation for MVP
    },
  });

  // Redirect to success page
  redirect("/checkout/success");
}
