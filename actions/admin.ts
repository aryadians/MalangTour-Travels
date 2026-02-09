"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

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

export async function getDashboardStats() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    // 1. Total Revenue from CONFIRMED bookings
    const revenueData = await prisma.booking.aggregate({
      where: { status: "CONFIRMED" },
      _sum: { totalPrice: true }
    });

    // 2. Active Bookings count
    const activeBookings = await prisma.booking.count({
      where: { status: "PENDING" }
    });

    // 3. Total Unique Travelers (Users)
    const totalUsers = await prisma.user.count({
      where: { role: "USER" }
    });

    // 4. Average Rating of all destinations
    const avgRatingData = await prisma.destination.aggregate({
      _avg: { rating: true }
    });

    // 5. Recent Bookings for the list
    const recentBookings = await prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true } },
        destination: { select: { name: true } }
      }
    });

    return {
      success: true,
      stats: {
        totalRevenue: revenueData._sum.totalPrice || 0,
        activeBookings,
        totalUsers,
        avgRating: avgRatingData._avg.rating || 0
      },
      recentBookings
    };
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    return { success: false, error: "Failed to fetch statistics" };
  }
}