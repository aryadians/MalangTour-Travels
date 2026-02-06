import React from "react";
import DestinationTable from "./DestinationTable";
import { prisma } from "@/lib/prisma";

export default async function AdminDestinations() {
  const destinations = await prisma.destination.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <DestinationTable destinations={destinations} />;
}
