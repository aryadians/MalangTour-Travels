import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-100 font-display min-h-screen flex flex-col antialiased selection:bg-primary/30">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-white/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-3 lg:px-10 lg:py-4">
        <div className="flex items-center gap-4 text-[#111816] dark:text-white">
          <Link href="/" className="size-8 text-primary">
            {/* Brand Logo (SVG from prompt) */}
            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" fill="currentColor"></path>
              <path clipRule="evenodd" d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </Link>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] hidden sm:block">Malang Premium Tours</h2>
        </div>
        <div className="flex items-center gap-6 lg:gap-8">
          <nav className="hidden md:flex items-center gap-6 lg:gap-9">
            <Link href="#" className="text-[#111816] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors">Destinations</Link>
            <Link href="#" className="text-[#111816] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors">Packages</Link>
            <Link href="#" className="text-[#111816] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors">About Us</Link>
            <Link href="#" className="text-[#111816] dark:text-gray-200 text-sm font-medium leading-normal hover:text-primary transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 md:hidden">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <button className="hidden md:flex items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary hover:bg-primary/90 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">My Bookings</span>
            </button>
            <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden cursor-pointer border border-white dark:border-white/10" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC5ggQKIpEph4eZYyeTaTsXEQdT0piDRPUwwdA51p7KWjZN3z6nFnzKT_-_xOj0DGgbXwlIb14u6yEUxuSMEM0zUAIiR6LSWTBcnDuNsM9Av34JiS6qWStUooMD10qFL9AT2dYSyPon4ly6BLbMMNrg_NvawrQPGtWTKyCrlL5yALNEbLW4gKsbW0dXwdV2JtyUXhJNqp79-nGDjyYksw4dkQmke0kAGeTol3NzOXVuSv8Rtw9aZbT0HOSetVMWRPNpLH1XqF-fVQ')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow relative flex items-center justify-center py-12 px-4 overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute inset-0 z-0">
          {/* Scenic Image with blur */}
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-cWIzmKSlJL0boAbzTlY-2TAggR9AUPbbcWC2jRzXooxk4mRwNVB5ZArgy1ABnkvkJSfBS6-6sUD1zF0xw9rGLc8miSYMxIzMnnCfHTxgaVMzNnLnxpRQtQloR6iSYmgzIeMTPY90RjPa97Ae59x60flASpFWBnpeoCUBT_LVMNwiKKxAKvnCC_C0Ywpg8Fx_I4iSnrnyWx_3H8yLzNKh5ysZ6e6mmJ3WJ2Rjlok7ZgFRyxV_TzkLGL9e5GhphFkuFusz58vuAQ')", filter: 'blur(8px)', opacity: 0.15}}>
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background-light/50 via-background-light/80 to-background-light dark:from-background-dark/50 dark:via-background-dark/80 dark:to-background-dark"></div>
          {/* Dot Pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{backgroundImage: "radial-gradient(#10b77f 1px, transparent 1px)", backgroundSize: "24px 24px"}}></div>
        </div>

        {/* Success Card */}
        <div className="relative z-10 w-full max-w-[520px] bg-surface-light dark:bg-surface-dark rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] p-8 md:p-12 border border-slate-100 dark:border-white/5 animate-fade-in-up flex flex-col items-center text-center">
          {/* Confetti Decoration (CSS only) */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl pointer-events-none">
            <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-yellow-400 opacity-60 animate-bounce"></div>
            <div className="absolute top-20 right-20 w-3 h-3 rounded-full bg-primary opacity-40 animate-pulse"></div>
            <div className="absolute bottom-32 left-16 w-2 h-2 rounded-full bg-blue-400 opacity-50"></div>
          </div>

          {/* Success Icon Animation Wrapper */}
          <div className="mb-8 relative group">
            <div className="absolute inset-0 bg-primary/20 dark:bg-primary/10 rounded-full blur-xl transform group-hover:scale-110 transition-transform duration-500"></div>
            <div className="relative w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-scale-in">
              <span className="material-symbols-outlined text-[48px] text-primary">check_circle</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#111816] dark:text-white">
              Payment Successful!
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-[400px] mx-auto">
              Your adventure to <span className="font-semibold text-primary">Gunung Bromo</span> is confirmed. Check your email for the e-ticket.
            </p>
          </div>

          {/* Booking ID Badge */}
          <div className="mb-10 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-primary/30 transition-colors cursor-default">
            <span className="material-symbols-outlined text-slate-400 text-[20px]">receipt_long</span>
            <div className="flex flex-col items-start leading-none gap-0.5 sm:flex-row sm:items-center sm:gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Booking ID</span>
              <span className="text-sm font-bold text-[#111816] dark:text-white tracking-wide">#MLG-88291</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-3">
            <button className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-primary hover:bg-primary/90 text-white text-base font-bold tracking-[0.015em] transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98]">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Download E-Ticket
            </button>
            <Link href="/" className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-transparent border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-[#111816] dark:text-white text-base font-bold tracking-[0.015em] transition-all duration-200 active:scale-[0.98]">
              Back to Home
            </Link>
          </div>

          {/* Help Link */}
          <div className="mt-8">
            <Link href="#" className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">help</span>
              Need help with your booking?
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-6 px-5 py-10 text-center border-t border-slate-100 dark:border-white/5 bg-white dark:bg-background-dark relative z-20">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
          <Link href="#" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors text-sm font-medium">Privacy Policy</Link>
          <Link href="#" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors text-sm font-medium">Terms of Service</Link>
          <Link href="#" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors text-sm font-medium">Help Center</Link>
        </div>
        <p className="text-slate-400 dark:text-slate-600 text-sm font-normal">© 2023 Malang Premium Tours. All rights reserved.</p>
      </footer>
    </div>
  );
}
