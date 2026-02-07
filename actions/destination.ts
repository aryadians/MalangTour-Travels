"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

// Schema for validation
const DestinationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(0, "Price must be positive"),
  location: z.string().min(3, "Location is required"),
  rating: z.coerce.number().min(0).max(5).default(0),
  category: z.string().min(3, "Category is required"),
  // These will be passed as JSON strings from the form
  images: z.string().min(2, "At least one image is required"),
  facilities: z.string().optional(),
  highlights: z.string().optional(),
  itinerary: z.string().optional(),
  openTime: z.string().optional(),
  ticketPrice: z.string().optional(),
});

export async function createDestination(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return { message: "Unauthorized" };
  }

  const validatedFields = DestinationSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    location: formData.get("location"),
    rating: formData.get("rating"),
    category: formData.get("category"),
    images: formData.get("images"),
    facilities: formData.get("facilities"),
    highlights: formData.get("highlights"),
    itinerary: formData.get("itinerary"),
    openTime: formData.get("openTime"),
    ticketPrice: formData.get("ticketPrice"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  try {
    await prisma.destination.create({
      data: {
        name: validatedFields.data.name,
        description: validatedFields.data.description,
        price: validatedFields.data.price,
        location: validatedFields.data.location,
        rating: validatedFields.data.rating,
        category: validatedFields.data.category,
        images: validatedFields.data.images,
        facilities: validatedFields.data.facilities || "[]",
        highlights: validatedFields.data.highlights || "[]",
        itinerary: validatedFields.data.itinerary || "[]",
        openTime: validatedFields.data.openTime,
        ticketPrice: validatedFields.data.ticketPrice,
      },
    });
  } catch (error) {
    return { message: "Database Error: Failed to Create Destination." };
  }

  revalidatePath("/admin/destinations");
  revalidatePath("/destinations");
  revalidatePath("/");
  redirect("/admin/destinations");
}

export async function updateDestination(
  id: number,
  prevState: any,
  formData: FormData,
) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return { message: "Unauthorized" };
  }

  const validatedFields = DestinationSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    location: formData.get("location"),
    rating: formData.get("rating"),
    category: formData.get("category"),
    images: formData.get("images"),
    facilities: formData.get("facilities"),
    highlights: formData.get("highlights"),
    itinerary: formData.get("itinerary"),
    openTime: formData.get("openTime"),
    ticketPrice: formData.get("ticketPrice"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  try {
    await prisma.destination.update({
      where: { id },
      data: {
        name: validatedFields.data.name,
        description: validatedFields.data.description,
        price: validatedFields.data.price,
        location: validatedFields.data.location,
        rating: validatedFields.data.rating,
        category: validatedFields.data.category,
        images: validatedFields.data.images,
        facilities: validatedFields.data.facilities || "[]",
        highlights: validatedFields.data.highlights || "[]",
        itinerary: validatedFields.data.itinerary || "[]",
        openTime: validatedFields.data.openTime,
        ticketPrice: validatedFields.data.ticketPrice,
      },
    });
  } catch (error) {
    return { message: "Database Error: Failed to Update Destination." };
  }

  revalidatePath("/admin/destinations");
  revalidatePath("/destinations");
  redirect("/admin/destinations");
}

export async function deleteDestination(id: number) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return { message: "Unauthorized" };
  }

  try {
    await prisma.destination.delete({
      where: { id },
    });
    revalidatePath("/admin/destinations");
    return { message: "Destination deleted" };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Destination." };
  }
}
