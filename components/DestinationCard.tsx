import Link from "next/link";

interface DestinationCardProps {
  id: number;
  image: string;
  name: string;
  price: number;
  category: string;
  location: string;
  rating: number;
  description: string;
}

export default function DestinationCard({
  id,
  image,
  name,
  price,
  category,
  location,
  rating,
  description,
}: DestinationCardProps) {
  return (
    <Link href={`/destinations/${id}`} className="block h-full">
      <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
        {/* Image Section */}
        <div className="relative h-72 overflow-hidden">
          <img
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          {/* Chips */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            IDR {price.toLocaleString("id-ID")}
          </div>
          <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md">
            {category}
          </div>
        </div>

        {/* Content Section Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-xl font-bold text-white leading-tight mb-1">
              {name}
            </h3>
            <div className="flex items-center text-accent text-xs bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "14px",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                star
              </span>
              <span className="text-white font-bold ml-1">{rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-gray-300 text-xs mb-3">
            <span className="material-symbols-outlined text-sm">
              location_on
            </span>
            {location}
          </div>

          <p className="text-gray-300 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 mb-4">
            {description}
          </p>

          <button className="w-full py-3 bg-primary hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
}
