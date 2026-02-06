"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const BookingSchema = z.object({
  destinationId: z.number(),
  date: z.coerce
    .date()
    .min(new Date(), { message: "Date must be in the future." }),
  pax: z.number().min(1, { message: "At least 1 traveler is required." }),
  totalPrice: z.number().positive(),
});

export async function createBooking(prevState: any, formData: FormData) {
  const session = await getSession();

  if (!session || !session.userId) {
    return {
      message: "You must be logged in to book a trip.",
    };
  }

  const validatedFields = BookingSchema.safeParse({
    destinationId: Number(formData.get("destinationId")),
    date: formData.get("date"),
    pax: Number(formData.get("pax")),
    totalPrice: Number(formData.get("totalPrice")),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid booking details.",
    };
  }

  const { destinationId, date, pax, totalPrice } = validatedFields.data;

  try {
    await prisma.booking.create({
      data: {
        userId: session.userId,
        destinationId,
        date,
        pax,
        totalPrice,
        status: "CONFIRMED", // Auto-confirm for now as we don't have payment gateway
      },
    });
  } catch (error) {
    console.error("Booking error:", error);
    return {
      message: "Failed to create booking. Please try again.",
    };
  }

  revalidatePath("/bookings");
  redirect("/bookings");
}
