import Link from "next/link";
import DestinationCard from "@/components/DestinationCard";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { logout } from "@/actions/auth";

export default async function HomeAdventure() {
  const destinations = await prisma.destination.findMany();
  const mountainDestinations = destinations.filter(
    (d) => d.category === "Gunung" || d.category === "Pantai",
  );
  const user = await getSession();

  return (
    <main className="bg-[#0f172a] text-slate-200 font-sans selection:bg-orange-500 selection:text-white">
      {/* Adventure Nav */}
      <nav className="sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="material-symbols-outlined text-orange-500 text-3xl group-hover:rotate-12 transition-transform">
            hiking
          </span>
          <span className="font-black text-xl tracking-tighter italic text-white">
            WILD<span className="text-orange-500">MALANG</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-bold text-orange-500 hidden sm:inline">
                {user.name}
              </span>
              <form action={logout}>
                <button className="text-sm font-bold text-white hover:text-orange-500 transition-colors uppercase">
                  Log Out
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="font-bold text-sm text-white hover:text-orange-500 transition-colors uppercase mr-4"
            >
              Log In
            </Link>
          )}
          <Link
            href="/planner"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-2.5 rounded-full transform -skew-x-12 transition-all"
          >
            <span className="transform skew-x-12 inline-block">
              START ADVENTURE
            </span>
          </Link>
        </div>
      </nav>

      {/* Hero Adventure */}
      <header className="relative py-20 px-6 md:px-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-orange-400 font-bold tracking-widest uppercase text-sm mb-4 border border-orange-500/30 px-3 py-1 rounded-sm">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              Live on the Edge
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] mb-6 italic">
              DO IT
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">
                WHILE YOU
              </span>
              <br />
              CAN.
            </h1>
            <p className="text-slate-400 text-lg max-w-md mb-8">
              Extreme jeep tours, hidden waterfalls, and midnight trekking. This
              isn't just a holiday, it's a challenge.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-black font-black px-8 py-4 rounded-sm hover:translate-x-1 hover:-translate-y-1 transition-transform border-b-4 border-gray-400 active:border-b-0 active:translate-y-0">
                EXPLORE GUNUNG BROMO
              </button>
              <button className="px-8 py-4 rounded-sm border-2 border-slate-700 text-white font-bold hover:bg-slate-800 transition-colors">
                WATCH REEL
              </button>
            </div>
          </div>

          {/* Dynamic Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 translate-y-8">
              <div className="h-64 rounded-xl overflow-hidden bg-gray-800 relative group">
                <img
                  src="https://images.unsplash.com/photo-1534234828569-fa33213c32fc?auto=format&fit=crop&q=80&w=400"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  alt="Jeep"
                />
              </div>
              <div className="h-40 rounded-xl overflow-hidden bg-gray-800 relative group">
                <img
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  alt="Snorkeling"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-40 rounded-xl overflow-hidden bg-gray-800 relative group">
                <img
                  src="https://images.unsplash.com/photo-1518709414768-a88986a45d5a?auto=format&fit=crop&q=80&w=400"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  alt="Waterfall"
                />
              </div>
              <div className="h-64 rounded-xl overflow-hidden bg-gray-800 relative group">
                <img
                  src="https://images.unsplash.com/photo-1605218427368-35b84d4360e2?auto=format&fit=crop&q=80&w=400"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  alt="Running"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Activity Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-black italic">
            POPULAR <span className="text-orange-500">QUESTS</span>
          </h2>
          <Link
            href="/"
            className="text-sm font-bold text-orange-500 hover:text-white transition-colors"
          >
            BACK TO CLASSIC VIEW &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mountainDestinations.map((dest) => (
            <div key={dest.id} className="relative group">
              <DestinationCard {...dest} />
              {/* Add visual badge for adventure mode */}
              <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rotate-12 shadow-lg z-20 group-hover:rotate-0 transition-transform">
                HARDCORE
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
