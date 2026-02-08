import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function BookingsPage() {
  const session = await getSession();

  if (!session || !session.userId) {
    redirect("/auth/login");
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

  return (
    <div className="bg-[#f0f4f3] dark:bg-slate-950 font-display text-slate-900 dark:text-white min-h-screen flex">
      {/* Sidebar Navigation (Could be a shared component, but copying structure for now for speed) */}
      <aside className="hidden lg:flex w-64 bg-white dark:bg-[#1a2c26] border-r border-slate-200 dark:border-slate-700 flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-500 text-3xl font-icon">
              landscape
            </span>
            <h2 className="text-[#111816] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              Malang Premium
            </h2>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Menu
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl font-medium transition-colors"
          >
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>
          <Link
            href="/bookings"
            className="flex items-center gap-3 px-4 py-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl font-medium transition-colors"
          >
            <span className="material-symbols-outlined">airplane_ticket</span>
            My Trips
          </Link>
          <Link
            href="/destinations"
            className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl font-medium transition-colors"
          >
            <span className="material-symbols-outlined">explore</span>
            Destinations
          </Link>
          <div className="px-4 py-2 mt-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Settings
          </div>
          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl font-medium transition-colors"
          >
            <span className="material-symbols-outlined">person</span>
            Profile
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl font-medium transition-colors border-t border-slate-100 dark:border-slate-800 mt-4"
          >
            <span className="material-symbols-outlined">home</span>
            Back to Home
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
              My Trip Wallet
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Access your tickets and travel itinerary.
            </p>
          </div>
          <Link
            href="/destinations"
            className="flex items-center gap-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined">add</span>
            Book New Trip
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800 text-center">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl text-slate-300">
                airplane_ticket
              </span>
            </div>
            <h2 className="text-xl font-bold mb-2">Your wallet is empty</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8">
              Looks like you haven&apos;t booked your next adventure yet. Let&apos;s change that!
            </p>
            <Link
              href="/destinations"
              className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Explore Destinations
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => {
              let displayImage = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000";
              try {
                const parsed = typeof booking.destination.images === 'string' ? JSON.parse(booking.destination.images) : booking.destination.images;
                if (Array.isArray(parsed) && parsed.length > 0) displayImage = parsed[0];
              } catch (e) {}

              return (
                <div
                  key={booking.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row gap-6 group"
                >
                  {/* Ticket Stub Visual (Left) */}
                  <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden shrink-0 relative">
                    <img
                      src={displayImage}
                      alt={booking.destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-[10px] font-black uppercase tracking-widest bg-emerald-500 w-fit px-2 py-0.5 rounded mb-1">
                        {booking.status}
                      </p>
                      <p className="font-bold text-lg leading-tight">
                        {booking.destination.name}
                      </p>
                    </div>
                    {/* Perforated Edge Visual */}
                    <div className="absolute right-0 top-0 bottom-0 w-4 bg-[url('/ticket-rip.svg')] bg-contain bg-repeat-y opacity-50 hidden md:block"></div>
                  </div>

                  {/* Ticket Details (Right) */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">
                          Date
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                          <span className="material-symbols-outlined text-emerald-500 text-sm">
                            calendar_today
                          </span>
                          {new Date(booking.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">
                          Guests
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                          <span className="material-symbols-outlined text-emerald-500 text-sm">
                            group
                          </span>
                          {booking.pax} Pax
                        </span>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">
                          Booking ID
                        </span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                          #{booking.id.slice(0, 8).toUpperCase()}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">
                          Total Paid
                        </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          IDR {(booking.totalPrice / 1000).toFixed(0)}k
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6 pt-6 border-t border-dashed border-slate-200 dark:border-slate-800">
                      <Link
                        href={`/destinations/${booking.destination.slug || booking.destination.id}`} // Use slug preferably
                        className="flex-1 py-3 text-center border-2 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:border-emerald-500 hover:text-emerald-500 transition-colors text-sm"
                      >
                        View Details
                      </Link>
                      <button className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-sm">
                        <span className="material-symbols-outlined text-lg">
                          download
                        </span>
                        E-Ticket
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