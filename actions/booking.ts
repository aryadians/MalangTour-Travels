"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function getUserBookings() {
  const session = await getSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: session.userId },
      include: {
        destination: true
      },
      orderBy: { createdAt: "desc" }
    });
    return { success: true, bookings };
  } catch (error) {
    return { success: false, error: "Failed to fetch bookings" };
  }
}

export async function getBookingById(id: string) {
  const session = await getSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        destination: true,
        user: { select: { name: true, email: true } }
      }
    });
    return { success: true, booking };
  } catch (error) {
    return { success: false, error: "Failed to fetch booking" };
  }
}
