import React from "react";
import { getDestinationBySlug } from "@/actions/destination";
import DestinationDetailClient from "@/components/DestinationDetailClient";
import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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