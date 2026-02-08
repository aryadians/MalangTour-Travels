"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllBookings() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") throw new Error("Unauthorized");

  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: { select: { name: true, email: true } },
        destination: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, bookings };
  } catch (error) {
    return { success: false, error: "Failed to fetch bookings" };
  }
}

export async function getUserBookings() {
  const session = await getSession();
  if (!session || !session.userId) return { success: false, error: "Unauthorized" };

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: session.userId },
      include: {
        destination: {
          select: {
            name: true,
            slug: true,
            images: true, // Sesuai schema Prisma
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, bookings };
  } catch (error) {
    return { success: false, error: "Failed to fetch user bookings" };
  }
}

export async function getUserBookingById(id: string) {
  const session = await getSession();
  if (!session || !session.userId) return { success: false, error: "Unauthorized" };

  try {
    const booking = await prisma.booking.findUnique({
      where: { 
        id,
        userId: session.userId // Security: Ensure user owns this booking
      },
      include: {
        destination: true,
        user: { select: { name: true, email: true } }
      },
    });
    
    if (!booking) return { success: false, error: "Booking not found" };
    
    return { success: true, booking };
  } catch (error) {
    return { success: false, error: "Failed to fetch booking details" };
  }
}

import { sendTicketEmail } from "@/lib/services/mail";

export async function createBooking(data: {
  destinationId: number;
  date: string;
  pax: number;
  totalPrice: number;
}) {
  const session = await getSession();
  if (!session || !session.userId) return { success: false, error: "Unauthorized" };

  try {
    const booking = await prisma.booking.create({
      data: {
        userId: session.userId,
        destinationId: data.destinationId,
        date: new Date(data.date),
        pax: data.pax,
        totalPrice: data.totalPrice,
        status: "CONFIRMED", // Simulating instant confirmation via Midtrans
      },
      include: {
        destination: { select: { name: true } },
        user: { select: { email: true } }
      }
    });

    // Send E-Ticket Email (Async, non-blocking)
    if (booking.user.email) {
      sendTicketEmail(booking.user.email, {
        bookingId: booking.id,
        destinationName: booking.destination.name,
        date: booking.date.toDateString(),
        pax: booking.pax,
        totalPrice: booking.totalPrice
      }).catch(err => console.error("Email failed:", err));
    }

    revalidatePath("/dashboard");
    revalidatePath("/bookings");
    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error("Booking error:", error);
    return { success: false, error: "Failed to create booking" };
  }
}

export async function updateBookingStatus(
  bookingId: string,
  newStatus: "PENDING" | "CONFIRMED" | "CANCELLED",
) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: newStatus },
    });

    revalidatePath("/admin/bookings");
    revalidatePath("/admin/dashboard");
    revalidatePath("/dashboard");
    revalidatePath("/bookings");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update booking status:", error);
    return { success: false, error: "Failed to update booking status" };
  }
}