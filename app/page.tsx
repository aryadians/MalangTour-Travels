import HeroVideo from "@/components/HeroVideo";
import PopularDestinations from "@/components/PopularDestinations";
import Navbar from "@/components/Navbar";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const destinations = await prisma.destination.findMany();

  return (
    <main className="bg-background-light dark:bg-background-dark min-h-screen">
      <Navbar />
      <HeroVideo />

      <div className="relative z-20 bg-background-light dark:bg-background-dark -mt-6 pt-10 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <PopularDestinations destinations={destinations} />
      </div>
    </main>
  );
}
