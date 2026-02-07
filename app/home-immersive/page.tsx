import HeroVideo from "@/components/HeroVideo";
import PopularDestinations from "@/components/PopularDestinations";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { logout } from "@/actions/auth";

export default async function HomeImmersive() {
  const destinations = await prisma.destination.findMany();
  const user = await getSession();

  return (
    <main className="bg-background-dark min-h-screen">
      {/* Transparent Floating Navigate (Simplified for Immersive view) */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center mix-blend-difference text-white">
        <div className="text-2xl font-black tracking-tighter">
          MALANG<span className="text-emerald-400">.</span>
        </div>
        <div className="hidden md:flex gap-8 font-medium text-sm tracking-widest uppercase">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Classic
          </Link>
          <Link href="#" className="text-emerald-400">
            Immersive
          </Link>
          <Link
            href="/home-adventure"
            className="hover:text-emerald-400 transition-colors"
          >
            Adventure
          </Link>
          <Link
            href="/home-luxury"
            className="hover:text-emerald-400 transition-colors"
          >
            Luxury
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="font-bold">{user.name}</span>
              <form action={logout}>
                <button className="text-sm font-bold border border-white/30 px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
                  LOGOUT
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="hidden md:block text-sm font-bold border border-white/30 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
            >
              LOGIN
            </Link>
          )}
          <button className="md:hidden">
            <span className="material-symbols-outlined text-3xl">
              menu_open
            </span>
          </button>
        </div>
      </nav>

      <HeroVideo />

      <div className="relative z-10 bg-background-light dark:bg-background-dark rounded-t-3xl -mt-10 pt-10 shadow-[0_-20px_40px_rgba(0,0,0,0.3)]">
        <div className="text-center py-10 px-6">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">
            Curated Collections
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-text-main dark:text-white mb-4">
            Cinematic Destinations
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-emerald-400 to-sky-400 mx-auto rounded-full"></div>
        </div>
        <PopularDestinations destinations={destinations} />
      </div>
    </main>
  );
}
