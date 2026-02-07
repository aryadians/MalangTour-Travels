import Link from "next/link";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

async function getDashboardData(userId: string) {
  const activeBooking = await prisma.booking.findFirst({
    where: {
      userId: userId,
      status: "CONFIRMED",
      date: {
        gte: new Date(), // Future bookings only
      },
    },
    include: {
      destination: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  const wishlistItems = await prisma.wishlist.findMany({
    where: {
      userId: userId,
    },
    include: {
      destination: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const tripCount = await prisma.booking.count({
    where: {
      userId: userId,
      status: "CONFIRMED",
    },
  });

  return { activeBooking, wishlistItems, tripCount };
}

export default async function DashboardPage() {
  const session = await getSession();

  if (!session || !session.userId) {
    redirect("/login");
  }

  const { activeBooking, wishlistItems, tripCount } = await getDashboardData(
    session.userId,
  );

  // Helper to format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-100 font-display flex overflow-hidden">
      {/* Side Navigation */}
      <aside className="w-72 bg-surface-light dark:bg-surface-dark h-full flex flex-col border-r border-gray-100 dark:border-gray-800 shadow-sm z-20 hidden lg:flex">
        <div className="p-6 flex flex-col gap-8 h-full">
          {/* User Profile Snippet */}
          <div className="flex items-center gap-4 p-2 rounded-xl hover:bg-background-light dark:hover:bg-background-dark transition-colors cursor-pointer">
            <div className="relative">
              <div className="bg-primary/10 rounded-full size-12 shadow-md flex items-center justify-center text-primary font-bold text-xl">
                {session.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="absolute bottom-0 right-0 size-3 bg-primary border-2 border-white dark:border-surface-dark rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-bold leading-tight">
                {session.name || "User"}
              </h1>
              <p className="text-primary text-xs font-semibold tracking-wide uppercase">
                Traveler Lvl {Math.floor(tripCount / 3) + 1}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 flex-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-4 px-4 py-3 rounded-xl bg-primary/10 text-primary transition-all group"
            >
              <span className="material-symbols-outlined icon-fill">
                dashboard
              </span>
              <span className="text-sm font-semibold">Dashboard</span>
            </Link>
            <Link
              href="/bookings"
              className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-background-light dark:hover:bg-background-dark text-gray-600 dark:text-gray-400 hover:text-primary transition-all group"
            >
              <span className="material-symbols-outlined group-hover:text-primary">
                calendar_month
              </span>
              <span className="text-sm font-medium">My Bookings</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-background-light dark:hover:bg-background-dark text-gray-600 dark:text-gray-400 hover:text-primary transition-all group"
            >
              <span className="material-symbols-outlined group-hover:text-primary">
                favorite
              </span>
              <span className="text-sm font-medium">Wishlist</span>
              <span className="ml-auto bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                {wishlistItems.length}
              </span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-background-light dark:hover:bg-background-dark text-gray-600 dark:text-gray-400 hover:text-primary transition-all group"
            >
              <span className="material-symbols-outlined group-hover:text-primary">
                person
              </span>
              <span className="text-sm font-medium">Profile Settings</span>
            </Link>
          </nav>

          {/* Bottom Actions */}
          <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
            <form action="/auth/logout" method="post">
              <button className="flex w-full items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-all group">
                <span className="material-symbols-outlined group-hover:text-red-500">
                  logout
                </span>
                <span className="text-sm font-medium">Logout</span>
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark shadow-sm sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-full size-10 flex items-center justify-center text-primary font-bold">
              {session.name?.[0]?.toUpperCase() || "U"}
            </div>
            <span className="font-bold">{session.name || "User"}</span>
          </div>
          <button className="text-gray-600">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>

        <div className="max-w-7xl mx-auto p-6 md:p-10 flex flex-col gap-8">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 animate-fade-in-up">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl md:text-4xl font-black text-[#111816] dark:text-white tracking-tight">
                Hello,{" "}
                <span className="text-primary">
                  {session.name?.split(" ")[0]}!
                </span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {activeBooking ? (
                  <>
                    Your next adventure to{" "}
                    <strong className="text-[#111816] dark:text-gray-200">
                      {activeBooking.destination.name}
                    </strong>{" "}
                    is coming up!
                  </>
                ) : (
                  "Ready to explore the hidden gems of Malang?"
                )}
              </p>
            </div>
            <Link
              href="/"
              className="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 hover:border-primary text-gray-700 dark:text-gray-200 px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              Book New Trip
            </Link>
          </div>

          {/* Active Booking Section */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#111816] dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  flight_takeoff
                </span>
                Active Booking
              </h2>
            </div>
            {activeBooking ? (
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 md:p-5 shadow-soft border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>
                {/* Trip Image */}
                <div className="w-full md:w-1/3 aspect-video md:aspect-auto md:h-64 rounded-xl bg-gray-200 relative overflow-hidden">
                  {/* Parsing images JSON safely */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${(() => {
                        try {
                          const parsed = JSON.parse(
                            activeBooking.destination.images,
                          );
                          return Array.isArray(parsed) && parsed.length > 0
                            ? parsed[0]
                            : "/placeholder.jpg";
                        } catch {
                          return "/placeholder.jpg";
                        }
                      })()}')`,
                    }}
                  ></div>
                  <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                    Confirmed
                  </div>
                </div>

                {/* Trip Details */}
                <div className="flex-1 flex flex-col justify-between z-10 py-2">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-[#111816] dark:text-white mb-2">
                        {activeBooking.destination.name}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[18px]">
                            calendar_today
                          </span>
                          <span>
                            {new Date(activeBooking.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[18px]">
                            schedule
                          </span>
                          <span>
                            {activeBooking.destination.openTime || "08:00 AM"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[18px]">
                            group
                          </span>
                          <span>{activeBooking.pax} Pax</span>
                        </div>
                      </div>
                    </div>
                    {/* Timeline / Progress */}
                    <div className="flex items-center gap-2 w-full max-w-md">
                      <div className="h-1.5 flex-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-3/4 rounded-full"></div>
                      </div>
                      <span className="text-xs font-medium text-primary">
                        Ready to go
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary/25 transition-all active:scale-95">
                      <span className="material-symbols-outlined">
                        qr_code_2
                      </span>
                      View E-Ticket
                    </button>
                    <Link
                      href={`/destinations/${activeBooking.destinationId}`}
                      className="flex items-center justify-center gap-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 hover:border-gray-300 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-xl font-semibold transition-all"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        map
                      </span>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-8 text-center border border-gray-100 dark:border-gray-800">
                <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">
                  airplane_ticket
                </span>
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                  No Active Trips
                </h3>
                <p className="text-gray-500 mb-6">
                  You don't have any upcoming trips scheduled.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-primary-hover transition-colors"
                >
                  <span className="material-symbols-outlined">explore</span>
                  Find a Destination
                </Link>
              </div>
            )}
          </section>

          {/* Dashboard Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Wishlist Section */}
            <section className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#111816] dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-500 icon-fill">
                    favorite
                  </span>
                  Your Wishlist
                </h2>
                {wishlistItems.length > 0 && (
                  <Link
                    className="text-sm font-semibold text-primary hover:text-primary-hover"
                    href="#"
                  >
                    View All
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wishlistItems.length > 0 ? (
                  wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-surface-light dark:bg-surface-dark rounded-2xl p-3 shadow-card hover:shadow-soft transition-shadow border border-gray-100 dark:border-gray-800 group"
                    >
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                        {/* Parsing images JSON safely */}
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{
                            backgroundImage: `url('${(() => {
                              try {
                                const parsed = JSON.parse(
                                  item.destination.images,
                                );
                                return Array.isArray(parsed) &&
                                  parsed.length > 0
                                  ? parsed[0]
                                  : "/placeholder.jpg";
                              } catch {
                                return "/placeholder.jpg";
                              }
                            })()}')`,
                          }}
                        ></div>
                        <button className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 shadow-sm hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined icon-fill text-[20px]">
                            favorite
                          </span>
                        </button>
                      </div>
                      <div className="px-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-lg leading-tight truncate">
                            {item.destination.name}
                          </h3>
                          <div className="flex items-center gap-1 text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                            <span className="material-symbols-outlined text-yellow-500 icon-fill text-[14px]">
                              star
                            </span>
                            {item.destination.rating}
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">
                            location_on
                          </span>{" "}
                          {item.destination.location}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-primary font-bold">
                            {formatPrice(item.destination.price)}
                            <span className="text-gray-400 text-xs font-normal">
                              /pax
                            </span>
                          </span>
                          <Link
                            href={`/destinations/${item.destinationId}`}
                            className="text-sm font-semibold text-[#111816] dark:text-white hover:text-primary transition-colors"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-10 text-center text-gray-500">
                    <p>Your wishlist is empty. Start exploring!</p>
                  </div>
                )}
              </div>
            </section>

            {/* Profile Settings Quick Links */}
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-[#111816] dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-500">
                  settings
                </span>
                Quick Settings
              </h2>
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-1 shadow-card border border-gray-100 dark:border-gray-800">
                <div className="flex flex-col">
                  {/* Link Item */}
                  <Link
                    href="#"
                    className="flex items-center gap-3 p-4 hover:bg-background-light dark:hover:bg-background-dark rounded-xl transition-colors group"
                  >
                    <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-2.5 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        lock_reset
                      </span>
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-sm font-bold text-[#111816] dark:text-gray-200">
                        Password
                      </span>
                      <span className="text-xs text-gray-500">
                        Last changed 3mo ago
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-gray-400 text-[20px]">
                      chevron_right
                    </span>
                  </Link>
                  {/* Divider */}
                  <div className="h-px bg-gray-100 dark:bg-gray-800 mx-4"></div>
                  {/* Link Item */}
                  <Link
                    href="#"
                    className="flex items-center gap-3 p-4 hover:bg-background-light dark:hover:bg-background-dark rounded-xl transition-colors group"
                  >
                    <div className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 p-2.5 rounded-lg group-hover:bg-purple-100 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        credit_card
                      </span>
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-sm font-bold text-[#111816] dark:text-gray-200">
                        Payment Methods
                      </span>
                      <span className="text-xs text-gray-500">
                        Visa •••• 4242
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-gray-400 text-[20px]">
                      chevron_right
                    </span>
                  </Link>
                  {/* Divider */}
                  <div className="h-px bg-gray-100 dark:bg-gray-800 mx-4"></div>
                  {/* Link Item */}
                  <Link
                    href="#"
                    className="flex items-center gap-3 p-4 hover:bg-background-light dark:hover:bg-background-dark rounded-xl transition-colors group"
                  >
                    <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 p-2.5 rounded-lg group-hover:bg-orange-100 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        notifications_active
                      </span>
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-sm font-bold text-[#111816] dark:text-gray-200">
                        Preferences
                      </span>
                      <span className="text-xs text-gray-500">
                        Email & Push ON
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-gray-400 text-[20px]">
                      chevron_right
                    </span>
                  </Link>
                </div>
              </div>

              {/* Promo Banner */}
              <div className="mt-2 bg-gradient-to-br from-primary to-[#0e8a73] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-1">Refer a friend</h3>
                  <p className="text-white/90 text-sm mb-3">
                    Earn $20 credit for your next trip to Malang!
                  </p>
                  <button className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors border border-white/30 backdrop-blur-sm">
                    Copy Link
                  </button>
                </div>
                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-[120px] text-white/10 rotate-12">
                  loyalty
                </span>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
