"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function getAllReviews() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") throw new Error("Unauthorized");

  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: { select: { name: true, email: true } },
        destination: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, reviews };
  } catch (error) {
    return { success: false, error: "Failed to fetch reviews" };
  }
}

export async function deleteReview(id: string) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return { success: false, error: "Unauthorized" };

  try {
    await prisma.review.delete({ where: { id } });
    revalidatePath("/admin/reviews");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete review" };
  }
}