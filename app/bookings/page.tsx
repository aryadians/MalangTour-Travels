import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

export default async function BookingsPage() {
  const session = await getSession();

  if (!session || !session.userId) {
    redirect("/login");
  }

  const bookings = await prisma.booking.findMany({
    where: {
      userId: session.userId,
    },
    include: {
      destination: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Calculate stats
  const totalSpent = bookings.reduce((acc, b) => acc + b.totalPrice, 0);
  const totalTrips = bookings.length;

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-main dark:text-white pb-20">
      <Navbar user={session} />

      <main className="container mx-auto px-6 pt-28">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">My Bookings</h1>
            <p className="text-text-muted dark:text-gray-400">
              Manage your upcoming and past adventures.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <p className="text-xs text-text-muted dark:text-gray-500 uppercase tracking-wider font-bold">
                Total Trips
              </p>
              <p className="text-2xl font-black text-primary">{totalTrips}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <p className="text-xs text-text-muted dark:text-gray-500 uppercase tracking-wider font-bold">
                Total Spent
              </p>
              <p className="text-2xl font-black text-primary">
                IDR {(totalSpent / 1000).toFixed(0)}k
              </p>
            </div>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm text-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl text-gray-400">
                confirmation_number
              </span>
            </div>
            <h2 className="text-xl font-bold mb-2">No bookings found</h2>
            <p className="text-text-muted dark:text-gray-400 max-w-md mb-8">
              You haven&apos;t booked any trips yet. Explore our destinations and
              start your journey!
            </p>
            <Link
              href="/"
              className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-primary/20"
            >
              Explore Destinations
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => {
              let image = "/placeholder.jpg";
              try {
                const parsedImages = JSON.parse(booking.destination.images);
                if (Array.isArray(parsedImages) && parsedImages.length > 0)
                  image = parsedImages[0];
              } catch (e) {}

              return (
                <div
                  key={booking.id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6"
                >
                  {/* Image */}
                  <div className="w-full md:w-48 h-48 md:h-32 rounded-xl overflow-hidden shrink-0 relative">
                    <img
                      src={image}
                      alt={booking.destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/80 backdrop-blur text-xs font-bold px-2 py-1 rounded text-text-main dark:text-white">
                      {booking.status}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">
                          {booking.destination.name}
                        </h3>
                        <p className="text-lg font-black text-primary">
                          IDR {booking.totalPrice.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-text-muted dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-lg">
                            calendar_month
                          </span>
                          <span>
                            {new Date(booking.date).toLocaleDateString(
                              "id-ID",
                              { dateStyle: "long" },
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-lg">
                            group
                          </span>
                          <span>{booking.pax} Travelers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-lg">
                            location_on
                          </span>
                          <span>{booking.destination.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                      <Link
                        href={`/destinations/${booking.destinationId}`}
                        className="text-sm font-bold text-primary hover:underline"
                      >
                        View Destination
                      </Link>
                      <span className="text-gray-300">|</span>
                      <button className="text-sm font-bold text-gray-500 hover:text-text-main transition-colors">
                        Download Ticket
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
