import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full px-6 py-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="size-8 text-white bg-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
            <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>landscape</span>
          </div>
          <h1 className="text-white text-xl font-bold tracking-tight drop-shadow-md">MalangTravel</h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-white/90 text-sm font-medium hover:text-white hover:underline decoration-primary decoration-2 underline-offset-8 transition-all drop-shadow-sm">Home</Link>
          <div className="relative group">
            <button className="flex items-center gap-1 text-white/90 text-sm font-medium hover:text-white transition-all drop-shadow-sm">
              Destinations
              <span className="material-symbols-outlined text-lg">expand_more</span>
            </button>
            {/* Dropdown */}
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-left">
              <div className="py-2 flex flex-col">
                <Link href="#" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">Beaches</Link>
                <Link href="#" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">Mountains</Link>
                <Link href="#" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">City Tours</Link>
              </div>
            </div>
          </div>
          <Link href="#" className="text-white/90 text-sm font-medium hover:text-white transition-all drop-shadow-sm">Packages</Link>
          <Link href="#" className="text-white/90 text-sm font-medium hover:text-white transition-all drop-shadow-sm">Contact</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:flex items-center justify-center px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-all">
            Login
          </Link>
          <button className="md:hidden text-white">
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
