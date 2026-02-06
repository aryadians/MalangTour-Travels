import Link from "next/link";

export default function TourDetail() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111816] dark:text-white transition-colors duration-200 min-h-screen flex flex-col">
      {/* Top Navigation - Specific to Tour Detail */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f0f4f3] dark:border-[#1e3a34] bg-white/80 dark:bg-[#10221c]/90 backdrop-blur-md px-6 lg:px-10 py-3">
        <div className="flex items-center gap-4 text-[#111816] dark:text-white">
          <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg text-primary">
            <span className="material-symbols-outlined text-xl">landscape</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
            Malang Travel
          </h2>
        </div>
        <div className="hidden md:flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <Link
              href="#"
              className="text-[#111816] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors"
            >
              Destinations
            </Link>
            <Link
              href="#"
              className="text-[#111816] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors"
            >
              Tours
            </Link>
            <Link
              href="#"
              className="text-[#111816] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </Link>
          </div>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-primary hover:bg-primary/90 transition-colors text-white text-sm font-bold shadow-sm shadow-primary/20">
            <span className="truncate">Login</span>
          </button>
        </div>
        <button className="md:hidden p-2 text-gray-600 dark:text-gray-300">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>

      <main className="flex-grow layout-container flex flex-col items-center w-full px-4 md:px-10 lg:px-40 py-6 md:py-10">
        <div className="w-full max-w-[1200px] flex flex-col gap-8">
          {/* Breadcrumb / Back */}
          <div className="flex justify-start">
            <Link
              href="/"
              className="group flex items-center gap-2 text-[#61897c] dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium"
            >
              <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              <span>Back to Destinations</span>
            </Link>
          </div>

          {/* Hero Section */}
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              data-alt="Stunning sunrise view over Mount Bromo volcano with mist in the caldera"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBPJ3BT5Um04JhADTTmj3_7ZBYhRZCxSJpb1O_L9rPoNdPRx0EXnAExmnt2UWVxKN8-7m3XwTFUTrg8HL4Akh1KMG4DKHJ5vdTLdMPVpWMvBZLPHFhrGkdGyZcxw1JIQNU7KBHREXnedlNpO45XJ1Dz5ynahqsISlc99Qf5yJCGm3OKIVQAnqCapASHyRbsaAX9CgGOnJDEkzGlAQ3nBtGv8C9bm1caV5_YIwIgXT4ZjlixDkM28hMt0Jh8tih3ybKXFtZvtaXZ9g')",
              }}
            ></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20 w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                    Most Popular
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      directions_car
                    </span>{" "}
                    4x4 Experience
                  </span>
                </div>
                <h1 className="text-white text-3xl md:text-5xl font-black tracking-tight mb-2 text-shadow-sm">
                  Gunung Bromo Sunrise Tour
                </h1>
                <div className="flex items-center text-white/90 gap-2 text-sm md:text-base font-medium">
                  <span className="material-symbols-outlined text-[20px]">
                    location_on
                  </span>
                  <span>Taman Nasional Bromo Tengger Semeru, East Java</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <span
                  className="material-symbols-outlined text-yellow-400"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="text-white font-bold text-lg">5.0</span>
                <span className="text-white/70 text-sm">(124 Reviews)</span>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Left Column: Details & Itinerary */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              {/* Description */}
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-[#111816] dark:text-white">
                  About this trip
                </h3>
                <p className="text-[#61897c] dark:text-gray-300 leading-relaxed text-base md:text-lg">
                  Experience the magic of East Java with our premium Gunung Bromo
                  Sunrise Tour. Your journey begins in the early hours with a
                  thrilling 4x4 Jeep ride through the sea of sand. Witness the
                  world-famous "Golden Sunrise" from the Penanjakan View Point,
                  revealing the majestic volcanic landscape bathed in morning
                  light. Afterwards, trek across the caldera to peer directly into
                  the smoking crater of Mount Bromo.
                </p>
                {/* Highlights Icons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {[
                    { icon: "wb_twilight", label: "Golden Sunrise" },
                    { icon: "airport_shuttle", label: "Jeep 4x4" },
                    { icon: "hiking", label: "Crater Trek" },
                    { icon: "photo_camera", label: "Photography" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col gap-2 p-4 rounded-xl bg-white dark:bg-[#1e3a34] border border-gray-100 dark:border-gray-700"
                    >
                      <span className="material-symbols-outlined text-primary text-3xl">
                        {item.icon}
                      </span>
                      <span className="text-sm font-semibold dark:text-white">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full h-px bg-gray-100 dark:bg-gray-700"></div>
              {/* Itinerary */}
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold text-[#111816] dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    timeline
                  </span>{" "}
                  Itinerary
                </h3>
                <div className="relative pl-4 space-y-8 before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-gray-200 before:to-gray-200 dark:before:via-gray-700 dark:before:to-gray-700 before:rounded-full">
                  {[
                    {
                      time: "03:00 AM",
                      title: "Pick up by Jeep 4x4",
                      desc: "Driver pick up from your hotel in Malang or Tumpang area. Briefing and departure.",
                    },
                    {
                      time: "04:30 AM",
                      title: "Penanjakan View Point",
                      desc: "Arrival at the view point. Enjoy hot coffee while waiting for the spectacular sunrise.",
                    },
                    {
                      time: "06:00 AM",
                      title: "Trek to Bromo Crater",
                      desc: "Cross the Sea of Sand by Jeep, then hike or ride a horse to the crater rim.",
                    },
                    {
                      time: "09:00 AM",
                      title: "Breakfast & Return",
                      desc: "Simple breakfast with a view before heading back to Malang city.",
                      inactive: true,
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="relative flex items-start group">
                      <div
                        className={`absolute left-0 -ml-1.5 h-3 w-3 rounded-full border-2 border-white dark:border-[#10221c] ${
                          item.inactive
                            ? "bg-gray-300 dark:bg-gray-600"
                            : "bg-primary"
                        } shadow`}
                      ></div>
                      <div className="pl-8 w-full">
                        <span
                          className={`text-xs font-bold ${
                            item.inactive
                              ? "text-gray-500 dark:text-gray-400"
                              : "text-primary"
                          } tracking-wider uppercase`}
                        >
                          {item.time}
                        </span>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                          {item.title}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Image Gallery */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 h-48 md:h-64">
                {[
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuA2NjmxiFV27EzkbO9uQNbNcSrpj_-ydnXLtQfdlb2j8iBPaT7drIodbys50W1aCiF8DkpLZV3zfRqBhRFKzMjhI02cj_Igs3kE4wiEQFBkrSkJhn6Vg9gTehZtiA93FLBzlZKlTIOgf3teLF4Nr3sU1dpnAxWoORQTO7xxGPAIyqo90rESeYJ9mGm-RalZd0FxmuLoudofDxXkcEHOveIndIO1cfRuYtwfamcX4_UifhY1MujZqiRAlMvR3mDj037Ziwm0y8w7DQ",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuDUR7xmyEoU8fAEr7HpMrrJ5ScnG4Pcl8QOxu_G5qaLgpkrucplhCyO6LyYGKU9icgHNJnyyVhAGenQT4cj5uAtLV54osSBmedNShknXEEQfGa7W2h9oG0hZHXxRFoDzXexKcRLmI02OAjOU4zBlZfnM72OmaF-v3L9X5z0uXkP1qAoaQgMKch-xygi7laocqAc0l_X2WiIvi1DEUfoH9GY3PaBfaQWIccN6zi_MF02sGACvy3z9iy1gq7E7i3Es_13AS5m40cZNw",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuC5v4kP8QIThpyBAlA_I_8JFYCjHoNE0bmBjIc2imtRlRm2mfK6127SIgZ_c9iJXVO86g3GNxGAgbw7VtxtyLh-bMM2AndURP2MDIpyb3l5NScJJc99WhO0o2xoW10hYukjJ_iex_aBsboY4rUhYjMwznY02oeWnIH2jVSk8PH4rrWCyMqgMMYYDlAYDhYVN6AGRYFC_AfLt1XNgMmMXX6BIsgKrOlpRPTF7OUsN26jgPL-rUOKN7i35HdDyUoRl3rBSSqNQ-EKYg",
                ].map((src, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl overflow-hidden relative h-full bg-gray-100 dark:bg-gray-800 ${
                      idx === 2 ? "hidden md:block" : ""
                    }`}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url('${src}')` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right Column: Sticky Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl bg-white dark:bg-[#1e3a34] p-6 shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col gap-6">
                <div className="flex items-end justify-between border-b border-gray-100 dark:border-gray-600 pb-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Starting from
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-[#111816] dark:text-white">
                        Rp 350.000
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        / pax
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-primary text-sm font-bold bg-primary/10 px-2 py-1 rounded">
                    <span className="material-symbols-outlined text-sm mr-1">
                      bolt
                    </span>{" "}
                    Instant Confirmation
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {/* Date Picker Mock */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#111816] dark:text-white">
                      Select Date
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400">
                          calendar_month
                        </span>
                      </div>
                      <input
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-[#10221c] text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-primary focus:border-transparent outline-none cursor-pointer transition-shadow hover:shadow-sm"
                        readOnly
                        type="text"
                        value="Sat, 14 Oct 2023"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400">
                          expand_more
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Pax Counter */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#111816] dark:text-white">
                      Travelers
                    </label>
                    <div className="flex items-center justify-between p-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-[#10221c]">
                      <button className="w-10 h-10 flex items-center justify-center rounded-md bg-white dark:bg-[#1e3a34] text-gray-600 dark:text-gray-300 hover:text-primary shadow-sm transition-colors disabled:opacity-50">
                        <span className="material-symbols-outlined text-sm">
                          remove
                        </span>
                      </button>
                      <span className="text-base font-bold text-[#111816] dark:text-white">
                        2 Pax
                      </span>
                      <button className="w-10 h-10 flex items-center justify-center rounded-md bg-white dark:bg-[#1e3a34] text-gray-600 dark:text-gray-300 hover:text-primary shadow-sm transition-colors">
                        <span className="material-symbols-outlined text-sm">
                          add
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Pricing Breakdown */}
                <div className="bg-background-light dark:bg-[#10221c] p-4 rounded-xl flex flex-col gap-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Rp 350.000 x 2 Pax</span>
                    <span>Rp 700.000</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Service Fee</span>
                    <span className="text-primary font-medium">Free</span>
                  </div>
                  <div className="h-px bg-gray-200 dark:bg-gray-600 my-1"></div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#111816] dark:text-white">
                      Total Price
                    </span>
                    <span className="text-xl font-black text-primary">
                      Rp 700.000
                    </span>
                  </div>
                </div>
                {/* CTA Button */}
                <Link
                  href="/booking/payment"
                  className="w-full py-4 rounded-xl bg-primary text-[#111816] dark:text-[#10221c] hover:bg-primary/90 transition-all transform active:scale-[0.98] font-bold text-lg shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
                >
                  <span>Book Trip Now</span>
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </Link>
                <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                  Free cancellation up to 24 hours before the trip
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
