"use client";

import React, { useState } from "react";
import { updateBookingStatus } from "@/actions/admin";

interface Booking {
  id: string;
  totalPrice: number;
  status: string;
  pax: number;
  date: Date;
  user: { name: string | null; email: string };
  destination: { name: string };
}

export default function BookingTable({ bookings }: { bookings: Booking[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings.filter(
    (b) =>
      b.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.destination.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateBookingStatus(id, newStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Bookings Management
          </h2>
          <p className="text-text-muted text-sm">
            View and manage all user reservations.
          </p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by user or destination..."
            className="pl-4 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">
                  User
                </th>
                <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">
                  Destination
                </th>
                <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">
                  Date
                </th>
                <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">
                  Total (IDR)
                </th>
                <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800 dark:text-white">
                        {b.user.name || "Unknown"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {b.user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      {b.destination.name}
                      <div className="text-xs text-gray-500">{b.pax} Pax</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {new Date(b.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-bold text-emerald-600">
                      {b.totalPrice.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                          b.status === "CONFIRMED"
                            ? "bg-emerald-100 text-emerald-600 border-emerald-200"
                            : b.status === "PENDING"
                              ? "bg-blue-100 text-blue-600 border-blue-200"
                              : "bg-red-100 text-red-600 border-red-200"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {b.status === "PENDING" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(b.id, "CONFIRMED")
                              }
                              className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-xs font-bold transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(b.id, "CANCELLED")
                              }
                              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs font-bold transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {b.status === "CONFIRMED" && (
                          <button
                            onClick={() =>
                              handleStatusChange(b.id, "CANCELLED")
                            }
                            className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                            title="Cancel Booking"
                          >
                            <span className="material-symbols-outlined text-lg">
                              cancel
                            </span>
                          </button>
                        )}
                        {/* Add more actions if needed */}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
