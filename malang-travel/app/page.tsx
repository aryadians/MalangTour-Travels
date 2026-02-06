import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <header
        className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed group"
        data-alt="Sunrise over Mount Bromo with mist filling the volcanic caldera"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAeHxLJbKMNKHcD3feHFBNhzkghb72lE6O24pnh-gh0Ts2LDWmGjoV1BdaEH37yJP-E9PPCuTwhPXm0YLB_vDIGCoIOEwQ7vPlHsKzt1imMN1AqtxZlfLwMEEtdnpXW_ZKjSAJ_mHbm1xWnprf-5TXNCAWmUniHKarxzCcA-47L7mZg8FeQUOZCWiV2zcxiFb3lML3pxR0kdYHQcT1w68mugNXbaInP6KHcGDgM3nF6eB_b7317JhpnUadxDNGXeD05yIKpau_QFA')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>
        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center gap-6 mt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Premium Tours in East Java
          </div>
          <h2 className="text-white text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight drop-shadow-2xl max-w-4xl">
            Explore the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-teal-200">
              Hidden Gems
            </span>{" "}
            of Malang
          </h2>
          <p className="text-white/90 text-lg md:text-xl font-normal leading-relaxed max-w-2xl drop-shadow-lg">
            Experience the majestic Bromo sunrise, the colorful villages, and the
            crystal clear southern beaches.
          </p>
          <button className="mt-4 flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white text-base font-bold shadow-glow hover:shadow-[0_0_30px_-5px_rgba(16,183,127,0.8)] transition-all transform hover:-translate-y-1">
            <span>Start Exploring</span>
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </button>
        </div>
      </header>

      {/* Floating Search Bar */}
      <div className="relative z-30 px-6 -mt-16 md:-mt-20">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-3 md:p-4">
          <form className="flex flex-col md:flex-row items-center gap-3">
            {/* Location Input */}
            <div className="relative w-full md:flex-1 group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div className="flex flex-col w-full">
                <label className="sr-only" htmlFor="destination">
                  Destination
                </label>
                <input
                  className="w-full h-14 pl-12 pr-4 bg-gray-50 dark:bg-gray-700/50 border-transparent focus:border-primary/50 focus:bg-white focus:ring-0 rounded-xl text-text-main dark:text-white placeholder:text-gray-400 text-sm font-medium transition-colors"
                  id="destination"
                  placeholder="Where do you want to go?"
                  type="text"
                />
              </div>
            </div>
            <div className="w-px h-10 bg-gray-200 hidden md:block"></div>
            {/* Category Select */}
            <div className="relative w-full md:w-1/4 group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                <span className="material-symbols-outlined">category</span>
              </div>
              <select className="w-full h-14 pl-12 pr-10 bg-gray-50 dark:bg-gray-700/50 border-transparent focus:border-primary/50 focus:bg-white focus:ring-0 rounded-xl text-text-main dark:text-white text-sm font-medium appearance-none cursor-pointer transition-colors">
                <option disabled defaultValue="">
                  Category
                </option>
                <option value="gunung">Mountain (Gunung)</option>
                <option value="pantai">Beach (Pantai)</option>
                <option value="kota">City (Kota)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <span className="material-symbols-outlined text-sm">
                  expand_more
                </span>
              </div>
            </div>
            <div className="w-px h-10 bg-gray-200 hidden md:block"></div>
            {/* Date Input */}
            <div className="relative w-full md:w-1/4 group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
              </div>
              <input
                className="w-full h-14 pl-12 pr-4 bg-gray-50 dark:bg-gray-700/50 border-transparent focus:border-primary/50 focus:bg-white focus:ring-0 rounded-xl text-text-main dark:text-white text-sm font-medium cursor-pointer transition-colors"
                type="date"
              />
            </div>
            {/* Search Button */}
            <button
              className="w-full md:w-auto h-14 md:aspect-square flex items-center justify-center bg-primary hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined">search</span>
            </button>
          </form>
        </div>
      </div>

      {/* Destinations Grid Section */}
      <section className="py-20 md:py-28 px-6 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white tracking-tight">
                Popular Destinations
              </h2>
              <p className="text-text-muted dark:text-gray-400 text-base max-w-lg">
                Curated selection of the most breathtaking spots in Malang
                Regency.
              </p>
            </div>
            <a
              className="flex items-center gap-1 text-primary font-bold hover:text-emerald-700 transition-colors"
              href="#"
            >
              View All
              <span className="material-symbols-outlined text-sm font-bold">
                arrow_forward
              </span>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1: Bromo */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <img
                  alt="Jeep driving on the sand sea of Mount Bromo"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  data-alt="Jeep adventure on Mount Bromo volcanic sand sea"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL8WFCFnCE04dyLtJe4zJ1FBPMarxb_UQYc2W4GEjvU9YS2KBi-E2QreXFxEQTOYWVMwSK09okNE9CPpNwK0IuqQK8hMQT7ap5ueYOmjpmkyFr7PowQIovczDgdztE23RuQUmDGPVtD22q3rsXR9HeHYjh28UZjBEyqQrCBrr6KHjjzQ9Cnb2ho_H74Cfcpa-9p7h1lvJyURS5yV0b6iUNIcikEBMUNnhlqFKNtEiH8M5yw3qIIVCxw6pHw8nWOGDHrlz-8HzNOg"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  IDR 350k
                </div>
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md">
                  Mountain
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-text-main dark:text-white leading-tight mb-1 group-hover:text-primary transition-colors">
                      Mount Bromo
                    </h3>
                    <div className="flex items-center gap-1 text-text-muted dark:text-gray-400 text-xs">
                      <span className="material-symbols-outlined text-sm">
                        location_on
                      </span>
                      Probolinggo/Malang
                    </div>
                  </div>
                  <div className="flex text-yellow-400 text-xs">
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "16px",
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      star
                    </span>
                    <span className="text-text-main dark:text-white font-bold ml-1">
                      4.9
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <span className="text-xs text-text-muted dark:text-gray-500">
                    1 Day Trip
                  </span>
                  <button className="text-sm font-bold text-primary hover:text-emerald-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
            {/* Card 2: Balekambang */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <img
                  alt="Temple on a rock formation in the ocean at Balekambang beach"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  data-alt="Pura Luhur Amertha Jati temple on rock island"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWIYG3iRxEwDqOuwFbjTL6x9S99K6XNsSqshrsrvtMZZzAhbH3RTvW_zyr8J7aE3M2wAKwfNLQI3bdzp-salVF7gCO3mJc2lh7BD4sYRgmTsvazZKoQkGlqOoZ9hL94xPLdz0VB4PdXwiHio5OqTLxTLzje6LUjLmI2uvSdgzt0mTjs-1jkS98YkE_XNN6mXm48jl7OBDRvPOROUoJpCtCWVVioLU3kbNIVcq6uMjsbsMEOhsvczb05cjIpnXvnJ3UI1o7SujrjQ"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  IDR 50k
                </div>
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md">
                  Beach
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-text-main dark:text-white leading-tight mb-1 group-hover:text-primary transition-colors">
                      Balekambang Beach
                    </h3>
                    <div className="flex items-center gap-1 text-text-muted dark:text-gray-400 text-xs">
                      <span className="material-symbols-outlined text-sm">
                        location_on
                      </span>
                      Bantur, Malang
                    </div>
                  </div>
                  <div className="flex text-yellow-400 text-xs">
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "16px",
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      star
                    </span>
                    <span className="text-text-main dark:text-white font-bold ml-1">
                      4.7
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <span className="text-xs text-text-muted dark:text-gray-500">
                    Entry Ticket
                  </span>
                  <button className="text-sm font-bold text-primary hover:text-emerald-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
            {/* Card 3: Jodipan */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <img
                  alt="Colorful houses in Jodipan village Malang"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  data-alt="Rainbow colored houses at Jodipan Village"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL2lBFJU32MSHd452j18IrCtPwW8U54Zvy-yF1oW1yypBBIpcV5_l9TSE4c9um9awzla0AB2hko2luiCb-254i3VcSxxWfBwxnDNNXOFrQzljg6aqox7oDj_OrS-xMFyWULprr9KPeVylbfMIrTeKCftXkUGyj7RPR2bPDco_KbuGzZLnquKbL1laLXVz6Bf5687h5rtKzr2KUh2yy-eNz-U7qKcmwlOrpeAG3PryUl4iIsqMbHN8FEz3OdE1ADRWsAjuMMD3NNA"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  IDR 15k
                </div>
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md">
                  City
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-text-main dark:text-white leading-tight mb-1 group-hover:text-primary transition-colors">
                      Kampung Warna Warni
                    </h3>
                    <div className="flex items-center gap-1 text-text-muted dark:text-gray-400 text-xs">
                      <span className="material-symbols-outlined text-sm">
                        location_on
                      </span>
                      Jodipan, Malang City
                    </div>
                  </div>
                  <div className="flex text-yellow-400 text-xs">
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "16px",
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      star
                    </span>
                    <span className="text-text-main dark:text-white font-bold ml-1">
                      4.5
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <span className="text-xs text-text-muted dark:text-gray-500">
                    Walking Tour
                  </span>
                  <button className="text-sm font-bold text-primary hover:text-emerald-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
            {/* Card 4: Teluk Asmara */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <img
                  alt="Aerial view of small islands in blue water, similar to Raja Ampat but in Malang"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  data-alt="Turquoise waters and green islands of Teluk Asmara"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvHJBBraWoVxbbZqPu9SFj1eDgR_R14vAbcDJuklSzF9RRz1sy4L_ZfAF4fUhnmuslvG0KnoGbJsMm742RMK_6r63z3c6DD-hIAjDmmI2V-lBlvvXl0ky4ft4W4I9-Nc82TbvaAtSuwVmEIqoi8As-Yu-sQwyIvhnvVU3NvojYjRds-xAOVlfKwaTW2ORznwySfA-ImPmXaKGxh_aTO2d3mm9MH7Pg97q8n86Tqy2UPRXRduq04rSYXaOHvxpc79W96jgnMBvRXw"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  IDR 25k
                </div>
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md">
                  Beach
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-text-main dark:text-white leading-tight mb-1 group-hover:text-primary transition-colors">
                      Teluk Asmara
                    </h3>
                    <div className="flex items-center gap-1 text-text-muted dark:text-gray-400 text-xs">
                      <span className="material-symbols-outlined text-sm">
                        location_on
                      </span>
                      Southern Malang
                    </div>
                  </div>
                  <div className="flex text-yellow-400 text-xs">
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "16px",
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      star
                    </span>
                    <span className="text-text-main dark:text-white font-bold ml-1">
                      4.8
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <span className="text-xs text-text-muted dark:text-gray-500">
                    Entry Ticket
                  </span>
                  <button className="text-sm font-bold text-primary hover:text-emerald-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
