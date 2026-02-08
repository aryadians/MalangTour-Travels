import React from "react";
import { getDestinationBySlug } from "@/actions/destination";
import DestinationDetailClient from "@/components/DestinationDetailClient";
import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// SEO: Generate Metadata Dynamically
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    return {
      title: "Destination Not Found",
    };
  }

  // Parse images securely
  let imageUrl = "https://malangtour.com/default-og.jpg";
  try {
    const images = JSON.parse(destination.images);
    if (Array.isArray(images) && images.length > 0) imageUrl = images[0];
  } catch (e) {}

  return {
    title: `${destination.name} - Premium Malang Tour`,
    description: destination.description.substring(0, 160),
    openGraph: {
      images: [imageUrl],
      title: destination.name,
      description: destination.description.substring(0, 160),
    },
  };
}

export default async function DestinationDetailPage({
  params,
}: Props) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  const session = await getSession();

  if (!destination) {
    notFound();
  }

  return (
    <DestinationDetailClient 
      destination={destination as any} 
      user={session}
    />
  );
}