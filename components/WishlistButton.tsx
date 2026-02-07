"use client";

import { useTransition, useState } from "react";
import { toggleWishlist } from "@/actions/wishlist";
import { useRouter } from "next/navigation";

export default function WishlistButton({
  destinationId,
  initialIsWishlisted,
  isLoggedIn,
}: {
  destinationId: number;
  initialIsWishlisted: boolean;
  isLoggedIn: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const router = useRouter();

  const handleToggle = () => {
    if (!isLoggedIn) {
      router.push("/auth/login"); // Redirect to login if not authenticated
      return;
    }

    // Optimistic UI update
    setIsWishlisted((prev) => !prev);

    startTransition(async () => {
      try {
        const result = await toggleWishlist(destinationId);
        if (result.error) {
          // Revert on error
          setIsWishlisted((prev) => !prev);
          console.error(result.error);
        }
      } catch (error) {
        setIsWishlisted((prev) => !prev);
        console.error("Failed to toggle wishlist");
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`p-3 rounded-xl border transition-all ${
        isWishlisted
          ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900 text-red-500"
          : "bg-surface-light dark:bg-surface-dark border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-500 hover:border-red-200"
      }`}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <span
        className={`material-symbols-outlined text-[24px] ${
          isWishlisted ? "icon-fill" : ""
        }`}
      >
        favorite
      </span>
    </button>
  );
}
