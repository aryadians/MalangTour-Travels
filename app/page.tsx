import HeroVideo from "@/components/HeroVideo";
import PopularDestinations from "@/components/PopularDestinations";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export default async function Home() {
  const destinations = await prisma.destination.findMany({
    take: 4, // Limit for homepage
    orderBy: { rating: "desc" },
  });
  const user = await getSession();
  // Navbar user session is handled in layout.tsx effectively, or we can pass it if layout doesn't passes strictly.
  // Actually layout.tsx renders navbar. We don't need to render it here.

  return (
    <main className="bg-background-light dark:bg-background-dark min-h-screen">
      {/* Hero Section */}
      <HeroVideo />

      {/* Main Content with overlap effect */}
      <div className="relative z-10 bg-background-light dark:bg-background-dark">
        {/* Features / Why Choose Us */}
        <Features />

        {/* Popular Destinations */}
        <div id="destinations">
          <PopularDestinations destinations={destinations} />
        </div>

        {/* Testimonials */}
        <Testimonials />

        {/* Newsletter / CTA */}
        <Newsletter />
      </div>
    </main>
  );
}
