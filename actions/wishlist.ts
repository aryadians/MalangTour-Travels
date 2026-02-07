"use server";

import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleWishlist(destinationId: number) {
  const session = await getSession();

  if (!session || !session.userId) {
    return { error: "Unauthorized" };
  }

  try {
    const existingEntry = await prisma.wishlist.findFirst({
      where: {
        userId: session.userId,
        destinationId: destinationId,
      },
    });

    if (existingEntry) {
      // Remove from wishlist
      await prisma.wishlist.delete({
        where: {
          id: existingEntry.id,
        },
      });
      revalidatePath("/dashboard");
      return { isWishlisted: false };
    } else {
      // Add to wishlist
      await prisma.wishlist.create({
        data: {
          userId: session.userId,
          destinationId: destinationId,
        },
      });
      revalidatePath("/dashboard");
      return { isWishlisted: true };
    }
  } catch (error) {
    console.error("Failed to toggle wishlist", error);
    return { error: "Failed to update wishlist" };
  }
}
