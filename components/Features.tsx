import React from "react";

export default function Features() {
  const features = [
    {
      icon: "verified_user",
      title: "Trusted & Secure",
      description:
        "Official partner of Malang Tourism. Secure payments and verified local guides for your peace of mind.",
    },
    {
      icon: "diversity_3",
      title: "Local Expertise",
      description:
        "Our guides are born and raised in Malang, ready to show you the hidden gems only locals know.",
    },
    {
      icon: "support_agent",
      title: "24/7 Support",
      description:
        "We are here for you around the clock. From planning to your return home, we've got your back.",
    },
    {
      icon: "savings",
      title: "Best Price Guarantee",
      description:
        "We offer the best prices for premium experiences. No hidden fees, just honest travel.",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2 block">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-text-main dark:text-white mb-4 tracking-tight">
            Experience Malang <br />
            <span className="text-primary">Like Never Before</span>
          </h2>
          <p className="text-gray-500 text-lg">
            We don&apos;t just sell tours; we craft unforgettable memories with a
            touch of local hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-3xl bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-750 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <div className="size-14 rounded-2xl bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-6">
                <span className="material-symbols-outlined text-3xl">
                  {feature.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
