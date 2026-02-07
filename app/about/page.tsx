import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export const metadata = {
  title: "About Us - Malang Travel",
  description:
    "Meet the local team behind your unforgettable Malang adventures.",
};

export default function AboutPage() {
  const team = [
    {
      name: "Budi Santoso",
      role: "Founder & Lead Guide",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Siti Rahma",
      role: "Operations Manager",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Agus Wijaya",
      role: "Senior Tour Leader",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Lina Putri",
      role: "Customer Success",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col pt-20">
      <main className="flex-1">
        {/* Story Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="flex-1">
              <span className="text-primary font-bold tracking-widest uppercase mb-4 block">
                Our Story
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-text-main dark:text-white mb-6 leading-tight">
                Authentic Malang, <br />
                From the Heart.
              </h1>
              <div className="space-y-6 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                <p>
                  Malang Travel was born from a simple passion: to show the
                  world the true beauty of our hometown. We noticed that many
                  travelers only saw the surface of Bromo and Batu, missing the
                  soul of the region.
                </p>
                <p>
                  We started as a small group of friends taking backpackers to
                  our favorite hidden waterfalls and warungs. Today, we are
                  Malang's premier tour operator, but our mission remains the
                  same:
                  <strong className="text-text-main dark:text-white">
                    {" "}
                    To connect you with the authentic spirit of East Java.
                  </strong>
                </p>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  className="rounded-2xl transform translate-y-8"
                  src="https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&q=80&w=600"
                  alt="Bromo"
                />
                <img
                  className="rounded-2xl"
                  src="https://images.unsplash.com/photo-1596402184320-417e4a7a0b43?auto=format&fit=crop&q=80&w=600"
                  alt="Tea Plantation"
                />
              </div>
              {/* Badge */}
              <div className="absolute -bottom-10 -left-10 bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-xl max-w-xs border border-gray-100 dark:border-gray-800">
                <div className="text-4xl font-black text-primary mb-1">
                  5+ Years
                </div>
                <div className="text-gray-500 text-sm">
                  Of delivering happiness and unforgettable journeys.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-6 bg-surface-light dark:bg-surface-dark">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-widest uppercase mb-2 block">
                Local Experts
              </span>
              <h2 className="text-4xl font-black text-text-main dark:text-white">
                Meet the Team
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, idx) => (
                <div key={idx} className="group">
                  <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/4]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <div className="flex gap-4">
                        <button className="text-white hover:text-primary">
                          <span className="material-symbols-outlined">
                            mail
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-text-main dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium text-sm">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
