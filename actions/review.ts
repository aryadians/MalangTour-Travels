"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function submitReview(formData: FormData) {
  const session = await getSession();
  if (!session || !session.userId) {
    return { success: false, error: "You must be logged in to post a review." };
  }

  const destinationId = parseInt(formData.get("destinationId") as string);
  const rating = parseInt(formData.get("rating") as string);
  const comment = formData.get("comment") as string;

  if (!comment || comment.length < 5) {
    return { success: false, error: "Comment must be at least 5 characters long." };
  }

  try {
    // 1. Create the review
    await prisma.review.create({
      data: {
        userId: session.userId,
        destinationId,
        rating,
        comment,
      },
    });

    // 2. Update the average rating for the destination
    const allReviews = await prisma.review.findMany({
      where: { destinationId },
      select: { rating: true }
    });

    const avgRating = allReviews.reduce((acc, curr) => acc + curr.rating, 0) / allReviews.length;

    await prisma.destination.update({
      where: { id: destinationId },
      data: { rating: avgRating }
    });

    revalidatePath(`/destinations`); // Update list
    revalidatePath(`/`); // Update home
    
    return { success: true };
  } catch (error) {
    console.error("Review submission error:", error);
    return { success: false, error: "Failed to submit review." };
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
    return { success: false, error: "Failed to fetch reviews." };
  }
}
