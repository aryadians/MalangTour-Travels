"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

import { sendTicketEmail } from "@/lib/services/mail";
import { revalidatePath } from "next/cache";

import { createTransactionToken } from "@/lib/services/midtrans";

const bookingSchema = z.object({
  destinationId: z.coerce.number(),
  date: z.string(),
  pax: z.coerce.number(),
  totalPrice: z.coerce.number(),
  usedPoints: z.coerce.number().optional(),
  voucherCode: z.string().optional(),
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

  const { destinationId, date, pax, totalPrice, usedPoints, voucherCode } = result.data;

  // Generate a temporary Order ID
  const orderId = `TRV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  try {
    const user = await prisma.user.findUnique({ where: { id: session.userId as string } });
    if (!user) return { message: "User not found" };

    // 1. Get Midtrans Token
    const snapToken = await createTransactionToken(orderId, totalPrice, {
      firstName: user.name || "Guest",
      email: user.email,
    });

    // 2. Return the token to the client so they can open the payment popup
    // We do NOT create the booking in DB yet. We wait for payment success.
    // Ideally, we create a "PENDING_PAYMENT" booking record here.
    
    // For this flow, let's create a PENDING booking
    await prisma.booking.create({
      data: {
        id: orderId, // Use consistent ID
        userId: session.userId as string,
        destinationId,
        date: new Date(date),
        pax,
        totalPrice,
        status: "PENDING_PAYMENT", // New status
      },
    });

    return { success: true, snapToken, orderId };

  } catch (error) {
    console.error("Payment init error:", error);
    return { message: "Failed to initialize payment" };
  }
}

export async function verifyPayment(orderId: string) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: orderId },
      include: { destination: true, user: true }
    });

    if (!booking) return { success: false, error: "Booking not found" };
    if (booking.status === "CONFIRMED") return { success: true, booking };

    // Update to CONFIRMED and award points
    const updatedBooking = await prisma.$transaction(async (tx) => {
      const b = await tx.booking.update({
        where: { id: orderId },
        data: { status: "CONFIRMED" }
      });

      // Award points: 1% of total price
      const pointsToAdd = Math.floor(b.totalPrice / 100);
      await tx.user.update({
        where: { id: b.userId },
        data: {
          points: {
            increment: pointsToAdd,
          }
        }
      });

      return b;
    });

    // Send Email
    if (booking.user.email) {
      sendTicketEmail(booking.user.email, {
        bookingId: booking.id,
        destinationName: booking.destination.name,
        date: new Date(booking.date).toDateString(),
        pax: booking.pax,
        totalPrice: booking.totalPrice,
      }).catch(err => console.error("Email fail", err));
    }

    return { success: true, booking: updatedBooking };
  } catch (error) {
    return { success: false, error: "Verification failed" };
  }
}
