import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="fixed inset-0 z-50 bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-100 font-display flex overflow-hidden">
      {/* Side Navigation */}
      <aside className="w-72 bg-surface-light dark:bg-surface-dark h-full flex flex-col border-r border-gray-100 dark:border-gray-800 shadow-sm z-20 hidden lg:flex">
        <div className="p-6 flex flex-col gap-8 h-full">
          {/* User Profile Snippet */}
          <div className="flex items-center gap-4 p-2 rounded-xl hover:bg-background-light dark:hover:bg-background-dark transition-colors cursor-pointer">
            <div className="relative">
              <div className="bg-center bg-no-repeat bg-cover rounded-full size-12 shadow-md" data-alt="Portrait of Sarah Jenkins" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCtXF4CWOybDDkQl9WJt9UUwPM-_lf_N-RhCcz0DenuyzwkFur-2iofWruE9PUkmUY0A716UcK_lvBA8FxbZ7UO7C_piMMvmo7UhnwyrjT_w2QIIH5q_XZz2zozWVIDA25Uojg7fBT23k3vQXlNzrJTMaH1LAtkTmIJ46zE8-JqcbZgrP-fhVoVBQ989qc6c7IXey1F_oafLuyD_cbFpwrRFcuq9o2QVekBFinQGDA2dYAzq4sU0_XjpnpnLkUCQxI9EnnndUcCGQ')"}}></div>
              <div className="absolute bottom-0 right-0 size-3 bg-primary border-2 border-white dark:border-surface-dark rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-bold leading-tight">Sarah Jenkins</h1>
              <p className="text-primary text-xs font-semibold tracking-wide uppercase">Traveler Lvl 2</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 flex-1">
            <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-primary/10 text-primary transition-all group">
              <span className="material-symbols-outlined icon-fill">dashboard</span>
              <span className="text-sm font-semibold">Dashboard</span>
            </Link>
            <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-background-light dark:hover:bg-background-dark text-gray-600 dark:text-gray-400 hover:text-primary transition-all group">
              <span className="material-symbols-outlined group-hover:text-primary">calendar_month</span>
              <span className="text-sm font-medium">My Bookings</span>
            </Link>
            <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-background-light dark:hover:bg-background-dark text-gray-600 dark:text-gray-400 hover:text-primary transition-all group">
              <span className="material-symbols-outlined group-hover:text-primary">favorite</span>
              <span className="text-sm font-medium">Wishlist</span>
              <span className="ml-auto bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">2</span>
            </Link>
            <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-background-light dark:hover:bg-background-dark text-gray-600 dark:text-gray-400 hover:text-primary transition-all group">
              <span className="material-symbols-outlined group-hover:text-primary">person</span>
              <span className="text-sm font-medium">Profile Settings</span>
            </Link>
          </nav>

          {/* Bottom Actions */}
          <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
            <Link href="/" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-all group">
              <span className="material-symbols-outlined group-hover:text-red-500">logout</span>
              <span className="text-sm font-medium">Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark shadow-sm sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10" data-alt="Portrait of Sarah Jenkins" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC1JppTFIq1cQP-zCzl2pz3gh_nlsp2QH9c5KfVzc8sYUEVCnJ3c8CTLF8J3DiZlmgskpDAf2Zm4KL3OxweQjCsNkGnY9zXhwiumevlY1AxlwukJ0WDZ4wzlkkyWNZvqOL5BFqtLqZedLLOHuATC6ljzZ7rwpJjiSRD2tHpmggMIkbRUKIV6NkCW0JlF2r7SlDXpYeCjkRNeh0to75-q95f0BKByfzM1eRhViyk7uZdhG5Ad7YBZt2b5wsn6QYRkIfvjctJWDlg6w')"}}></div>
            <span className="font-bold">Sarah J.</span>
          </div>
          <button className="text-gray-600">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>

        <div className="max-w-7xl mx-auto p-6 md:p-10 flex flex-col gap-8">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 animate-fade-in-up">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl md:text-4xl font-black text-[#111816] dark:text-white tracking-tight">
                Hello, <span className="text-primary">Sarah!</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Your next adventure to <strong className="text-[#111816] dark:text-gray-200">Bromo</strong> starts in <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded-md font-bold">5 days</span>.
              </p>
            </div>
            <button className="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 hover:border-primary text-gray-700 dark:text-gray-200 px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-sm transition-all">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Book New Trip
            </button>
          </div>

          {/* Active Booking Section */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#111816] dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">flight_takeoff</span>
                Active Booking
              </h2>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 md:p-5 shadow-soft border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>
              {/* Trip Image */}
              <div className="w-full md:w-1/3 aspect-video md:aspect-auto md:h-64 rounded-xl bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Mount Bromo landscape at sunrise with mist" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7ffNbaY9IXh7LqXslTPqOroutvbF5N9MJy2Oci0UwQLO2AuB27nfCdq8v9rJWF2krBvNhCv03LXH1mq8MG0RdppEhnYoWBuNKWzu8d_bEJoarZ4ryB-HBtvBb1sNL6TlZIj1Dj7-ZHalMf7qujudPuSVOru6tO03kh_SZB-mSFrQzzAkE2TK7V8759dMnrKLzo0X4Hhi5EIHNmDxT7MeyeWfZMlqeGQDSe73U4Y00AVn45qPXbF0KRPww_ZaP56cCforPeNzAig')"}}></div>
                <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                  Confirmed
                </div>
              </div>

              {/* Trip Details */}
              <div className="flex-1 flex flex-col justify-between z-10 py-2">
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#111816] dark:text-white mb-2">Bromo Midnight Private Tour</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                        <span>Oct 24, 2023</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">schedule</span>
                        <span>12:00 AM</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">group</span>
                        <span>2 Pax</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">person_pin</span>
                        <span>Guide: Agus</span>
                      </div>
                    </div>
                  </div>
                  {/* Timeline / Progress */}
                  <div className="flex items-center gap-2 w-full max-w-md">
                    <div className="h-1.5 flex-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-3/4 rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium text-primary">Ready to go</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary/25 transition-all active:scale-95">
                    <span className="material-symbols-outlined">qr_code_2</span>
                    View E-Ticket
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 hover:border-gray-300 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-xl font-semibold transition-all">
                    <span className="material-symbols-outlined text-[20px]">map</span>
                    View Itinerary
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Dashboard Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Wishlist Section */}
            <section className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#111816] dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-500 icon-fill">favorite</span>
                  Your Wishlist
                </h2>
                <Link className="text-sm font-semibold text-primary hover:text-primary-hover" href="#">View All</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card 1 */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-3 shadow-card hover:shadow-soft transition-shadow border border-gray-100 dark:border-gray-800 group">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" data-alt="Colorful painted houses in Jodipan Village Malang" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_E6r46XkI1Pha6wO06_oAILoTXeAMdbRFDB3yWUARw2Q5UxbSdyzcmYaglNuGRoJGY62ig2FrVV0IYlmMCIFTPRShG28YajZURXg2_7eSbyhC1ScGPx6_carTpAzpeeCjoW93FtFY11GTM0v4vAuKsqOFl9N-z4GkwAOydCcN-4Eifij9mjYtFUAXcUyewfLKHyRRmJ-EtYeit6UxV0DSFkj8hEVjWxFRMitAH_gMC_89X3su_yiKdHYtLBx4N1wNI-RabGfWQw')"}}></div>
                    <button className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 shadow-sm hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined icon-fill text-[20px]">favorite</span>
                    </button>
                  </div>
                  <div className="px-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg leading-tight truncate">Kampung Warna Warni</h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                        <span className="material-symbols-outlined text-yellow-500 icon-fill text-[14px]">star</span>
                        4.8
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">location_on</span> Malang City
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary font-bold">$15<span className="text-gray-400 text-xs font-normal">/pax</span></span>
                      <button className="text-sm font-semibold text-[#111816] dark:text-white hover:text-primary transition-colors">Book Now</button>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-3 shadow-card hover:shadow-soft transition-shadow border border-gray-100 dark:border-gray-800 group">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" data-alt="Vintage car exhibit at Museum Angkut" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAIfCzPjAm6TfC80kZKw_pqgXmbJ-ZDTS0RwqCPDyD4u_LKPDJvnIC8excZVAX4XQRf8720b_q5fx-yYE7GmYiNKo5OHB8_buA1IFuIyyLBmJrOr_0ITNri5TZ2dQ1-DSKgd5GQeUtXCV1-LsiGIve7iVyS2aIfJ_vgkTe08Fnaeyz8fwaaqr_8Ehw3NXJRUZ069sAxeSrRXI0tGRVKQaK4ndO0nDmx_-lHxBjpiAMKp4GyfCdVDt3x5-70PhEJ_QJ95-ttB-E0fg')"}}></div>
                    <button className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 shadow-sm hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined icon-fill text-[20px]">favorite</span>
                    </button>
                  </div>
                  <div className="px-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg leading-tight truncate">Museum Angkut VIP</h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                        <span className="material-symbols-outlined text-yellow-500 icon-fill text-[14px]">star</span>
                        4.9
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">location_on</span> Batu, Malang
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary font-bold">$22<span className="text-gray-400 text-xs font-normal">/pax</span></span>
                      <button className="text-sm font-semibold text-[#111816] dark:text-white hover:text-primary transition-colors">Book Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Profile Settings Quick Links */}
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-[#111816] dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-500">settings</span>
                Quick Settings
              </h2>
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-1 shadow-card border border-gray-100 dark:border-gray-800">
                <div className="flex flex-col">
                  {/* Link Item */}
                  <Link href="#" className="flex items-center gap-3 p-4 hover:bg-background-light dark:hover:bg-background-dark rounded-xl transition-colors group">
                    <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-2.5 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-sm font-bold text-[#111816] dark:text-gray-200">Password</span>
                      <span className="text-xs text-gray-500">Last changed 3mo ago</span>
                    </div>
                    <span className="material-symbols-outlined text-gray-400 text-[20px]">chevron_right</span>
                  </Link>
                  {/* Divider */}
                  <div className="h-px bg-gray-100 dark:bg-gray-800 mx-4"></div>
                  {/* Link Item */}
                  <Link href="#" className="flex items-center gap-3 p-4 hover:bg-background-light dark:hover:bg-background-dark rounded-xl transition-colors group">
                    <div className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 p-2.5 rounded-lg group-hover:bg-purple-100 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">credit_card</span>
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-sm font-bold text-[#111816] dark:text-gray-200">Payment Methods</span>
                      <span className="text-xs text-gray-500">Visa •••• 4242</span>
                    </div>
                    <span className="material-symbols-outlined text-gray-400 text-[20px]">chevron_right</span>
                  </Link>
                  {/* Divider */}
                  <div className="h-px bg-gray-100 dark:bg-gray-800 mx-4"></div>
                  {/* Link Item */}
                  <Link href="#" className="flex items-center gap-3 p-4 hover:bg-background-light dark:hover:bg-background-dark rounded-xl transition-colors group">
                    <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 p-2.5 rounded-lg group-hover:bg-orange-100 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-sm font-bold text-[#111816] dark:text-gray-200">Preferences</span>
                      <span className="text-xs text-gray-500">Email & Push ON</span>
                    </div>
                    <span className="material-symbols-outlined text-gray-400 text-[20px]">chevron_right</span>
                  </Link>
                </div>
              </div>

              {/* Promo Banner */}
              <div className="mt-2 bg-gradient-to-br from-primary to-[#0e8a73] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-1">Refer a friend</h3>
                  <p className="text-white/90 text-sm mb-3">Earn $20 credit for your next trip to Malang!</p>
                  <button className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors border border-white/30 backdrop-blur-sm">
                    Copy Link
                  </button>
                </div>
                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-[120px] text-white/10 rotate-12">loyalty</span>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
