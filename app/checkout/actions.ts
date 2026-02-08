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
