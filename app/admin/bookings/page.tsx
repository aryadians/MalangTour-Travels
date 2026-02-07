"use client";

import React, { useEffect, useState } from "react";
import { getAllBookings, updateBookingStatus } from "@/actions/booking";
import toast from "react-hot-toast";

interface Booking {
  id: string;
  user: {
    name: string | null;
    email: string;
  };
  destination: {
    name: string;
  };
  date: Date;
  pax: number;
  totalPrice: number;
  status: string;
  createdAt: Date;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = React.useCallback(async () => {
    setIsLoading(true);
    const result = await getAllBookings();
    if (result.success && result.bookings) {
      setBookings(result.bookings as any);
    } else {
      toast.error("Failed to load bookings");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleStatusChange = async (
    id: string,
    status: "PENDING" | "CONFIRMED" | "CANCELLED",
  ) => {
    const promise = updateBookingStatus(id, status);
    toast.promise(promise, {
      loading: "Updating status...",
      success: "Booking status updated!",
      error: "Failed to update status",
    });

    await promise;
    fetchBookings(); // Refresh data
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            Manage Bookings
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            View and manage all customer reservations.
          </p>
        </div>
        <button
          onClick={fetchBookings}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <span className="material-symbols-outlined text-gray-600">
            refresh
          </span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No bookings found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-xs uppercase font-bold">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Destination</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Pax</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {booking.user.name || "Unknown"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {booking.user.email}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                      {booking.destination.name}
                    </td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                      {booking.pax}
                    </td>
                    <td className="p-4 font-bold text-emerald-600">
                      Rp {booking.totalPrice.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          booking.status === "CONFIRMED"
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                            : booking.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                              : "bg-red-100 text-red-700 border border-red-200"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {booking.status === "PENDING" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(booking.id, "CONFIRMED")
                              }
                              className="p-2 rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors tooltip"
                              title="Approve"
                            >
                              <span className="material-symbols-outlined text-sm font-bold">
                                check
                              </span>
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(booking.id, "CANCELLED")
                              }
                              className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors tooltip"
                              title="Reject"
                            >
                              <span className="material-symbols-outlined text-sm font-bold">
                                close
                              </span>
                            </button>
                          </>
                        )}
                        {booking.status !== "PENDING" && (
                          <span className="text-xs text-gray-400 italic">
                            No actions
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
