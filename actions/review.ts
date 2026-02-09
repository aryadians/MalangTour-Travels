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

export async function getReviewsByDestination(destinationId: number) {
  try {
    const reviews = await prisma.review.findMany({
      where: { destinationId },
      include: {
        user: { select: { name: true } }
      },
      orderBy: { createdAt: "desc" }
    });
    return { success: true, reviews };
  } catch (error) {
    return { success: false, error: "Failed to fetch reviews" };
  }
}

export async function submitReview(formData: FormData) {
  const session = await getSession();
  if (!session) return { success: false, error: "Please login to submit a review" };

  const destinationId = parseInt(formData.get("destinationId") as string);
  const rating = parseInt(formData.get("rating") as string);
  const comment = formData.get("comment") as string;

  try {
    await prisma.review.create({
      data: {
        userId: session.userId,
        destinationId,
        rating,
        comment
      }
    });

    // Update the average rating for the destination
    const allReviews = await prisma.review.findMany({
      where: { destinationId },
      select: { rating: true }
    });

    const avgRating = allReviews.reduce((acc, curr) => acc + curr.rating, 0) / allReviews.length;

    await prisma.destination.update({
      where: { id: destinationId },
      data: { rating: avgRating }
    });

    revalidatePath(`/destinations/[slug]`, "page");
    return { success: true };
  } catch (error) {
    console.error("Submit review error:", error);
    return { success: false, error: "Failed to submit review" };
  }
}