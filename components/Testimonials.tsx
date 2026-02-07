import React from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Travel Blogger",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      quote:
        "The Bromo sunrise tour was absolutely magical! The guide was knowledgeable and the service was top-notch.",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "Photographer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      quote:
        "I captured the best shots of my life at Tumpak Sewu. Malang Tour made the logistics seamless.",
      rating: 5,
    },
    {
      name: "Amanda Pratama",
      role: "Family Traveler",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
      quote:
        "Traveled with 2 kids and it was a breeze. They customized the itinerary to be kid-friendly. Highly recommended!",
      rating: 4,
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 bg-background-light dark:bg-background-dark relative z-0 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2 block">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-text-main dark:text-white tracking-tight">
              Trusted by Travelers
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg transition-all">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button className="w-12 h-12 rounded-full bg-primary text-white border border-primary flex items-center justify-center hover:bg-primary-hover hover:shadow-lg shadow-primary/20 transition-all">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card hover:shadow-xl transition-all duration-300 flex flex-col gap-6"
            >
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined icon-fill text-lg"
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed italic">
                &quot;{t.quote}&quot;
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-text-main dark:text-white leading-tight">
                    {t.name}
                  </h4>
                  <span className="text-xs text-text-muted font-medium">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
