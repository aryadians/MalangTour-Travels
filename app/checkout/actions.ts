"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

import { sendTicketEmail } from "@/lib/services/mail";
import { revalidatePath } from "next/cache";

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

  let bookingId: string | null = null;

  try {
    // Fetch details for email
    const [destination, user] = await Promise.all([
      prisma.destination.findUnique({ where: { id: destinationId } }),
      prisma.user.findUnique({ where: { id: session.userId as string } }),
    ]);

    if (!destination || !user) {
      return { message: "Data not found" };
    }

    // Create Booking and Update User Points in a transaction
    const booking = await prisma.$transaction(async (tx) => {
      const b = await tx.booking.create({
        data: {
          userId: session.userId as string,
          destinationId,
          date: new Date(date),
          pax,
          totalPrice,
          status: "CONFIRMED",
        },
      });

      // Deduct used points and Add new points (1% of total price)
      const pointsToAdd = Math.floor(totalPrice / 100);
      await tx.user.update({
        where: { id: session.userId as string },
        data: {
          points: {
            decrement: usedPoints || 0,
            increment: pointsToAdd,
          }
        }
      });

      // Update voucher usage if applied
      if (voucherCode) {
        await tx.voucher.update({
          where: { code: voucherCode.toUpperCase() },
          data: { usageCount: { increment: 1 } }
        }).catch(() => {}); // Ignore if voucher logic fails
      }

      return b;
    });

    bookingId = booking.id;

    // Send E-Ticket Email (Async, non-blocking)
    if (user.email) {
      sendTicketEmail(user.email, {
        bookingId: booking.id,
        destinationName: destination.name,
        date: new Date(date).toDateString(),
        pax,
        totalPrice,
      }).catch((err) => console.error("Email failed:", err));
    }

    revalidatePath("/dashboard");
    revalidatePath("/bookings");
  } catch (error) {
    if ((error as any).digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Booking error:", error);
    return { message: "Failed to create booking" };
  }

  // Redirect to success page
  if (bookingId) {
    redirect(`/checkout/success?bookingId=${bookingId}`);
  }
}
