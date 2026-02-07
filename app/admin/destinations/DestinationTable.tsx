"use client";
import React, { useState } from "react";
import { Destination } from "@prisma/client";
import Link from "next/link";
import { deleteDestination } from "@/actions/destination";
import toast from "react-hot-toast";

interface DestinationTableProps {
  destinations: Destination[];
}

export default function DestinationTable({
  destinations,
}: DestinationTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDestinations = destinations.filter((dest) =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this destination?")) {
      await deleteDestination(id);
      toast.success("Destination deleted");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Destinations
          </h2>
          <p className="text-gray-500 text-sm">
            Manage your tour locations and packages.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              search
            </span>
            <input
              type="text"
              placeholder="Search destination..."
              className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link
            href="/admin/destinations/new"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Add New
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">
                  Destination
                </th>
                <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">
                  Category
                </th>
                <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">
                  Price
                </th>
                <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">
                  Rating
                </th>
                <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredDestinations.map((dest) => {
                let image = "";
                try {
                  image = JSON.parse(dest.images as string)[0];
                } catch (e) {
                  image = ""; // Fallback or placeholder
                }

                return (
                  <tr
                    key={dest.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={image}
                            alt={dest.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 dark:text-white">
                            {dest.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {dest.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                        {dest.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">
                      Rp {dest.price.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-yellow-500 text-xs font-bold">
                        <span className="material-symbols-outlined text-sm mr-1">
                          star
                        </span>
                        {dest.rating}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/destinations/${dest.id}`}
                          className="p-2 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">
                            edit
                          </span>
                        </Link>
                        <button
                          onClick={() => handleDelete(dest.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredDestinations.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No destinations found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
