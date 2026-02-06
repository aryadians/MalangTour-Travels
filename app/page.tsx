import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import PopularDestinations from "@/components/PopularDestinations";

export default function Home() {
  return (
    <main>
      <Hero />
      <SearchBar />
      <PopularDestinations />
    </main>
  );
}
