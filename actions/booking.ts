"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllBookings() {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        destination: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, bookings };
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return { success: false, error: "Failed to fetch bookings" };
  }
}

export async function updateBookingStatus(
  bookingId: string,
  newStatus: "PENDING" | "CONFIRMED" | "CANCELLED",
) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: newStatus },
    });

    revalidatePath("/admin/bookings");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to update booking status:", error);
    return { success: false, error: "Failed to update booking status" };
  }
}

export async function createBooking(prevState: any, formData: FormData) {
  const session = await getSession();

  if (!session || !session.userId) {
    return { message: "You must be logged in to book a trip." };
  }

  const destinationId = parseInt(formData.get("destinationId") as string);
  const dateStr = formData.get("date") as string;
  const pax = parseInt(formData.get("pax") as string);
  const totalPrice = parseFloat(formData.get("totalPrice") as string);

  if (!dateStr) {
    return { errors: { date: "Please select a date" } };
  }

  try {
    const booking = await prisma.booking.create({
      data: {
        userId: session.userId,
        destinationId,
        date: new Date(dateStr),
        pax,
        totalPrice,
        status: "PENDING",
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin/bookings");
    redirect("/dashboard?booking=success");
  } catch (error) {
    console.error("Booking error:", error);
    return { message: "Failed to create booking. Please try again." };
  }
}
