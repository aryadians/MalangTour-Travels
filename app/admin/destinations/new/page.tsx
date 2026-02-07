import React from "react";
import DestinationForm from "@/components/admin/DestinationForm";

export default function NewDestinationPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8">
        Add New Destination
      </h1>
      <DestinationForm />
    </div>
  );
}
