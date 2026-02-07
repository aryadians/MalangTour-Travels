import React from "react";
import DestinationForm from "@/components/admin/DestinationForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditDestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params first (Next.js 15+ requirement pattern, though id is string in URL, prisma id is Int)
  const { id } = await params;

  const destination = await prisma.destination.findUnique({
    where: { id: parseInt(id) },
  });

  if (!destination) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8">
        Edit Destination
      </h1>
      <DestinationForm destination={destination} />
    </div>
  );
}
