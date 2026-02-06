import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="size-6 bg-primary rounded-md flex items-center justify-center">
            <span className="material-symbols-outlined text-white" style={{ fontSize: '16px' }}>landscape</span>
          </div>
          <span className="text-text-main dark:text-white font-bold">MalangTravel</span>
        </div>
        <div className="flex gap-8 text-sm text-text-muted dark:text-gray-400">
          <Link href="#" className="hover:text-primary transition-colors">About</Link>
          <Link href="#" className="hover:text-primary transition-colors">Destinations</Link>
          <Link href="#" className="hover:text-primary transition-colors">Blog</Link>
          <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
        </div>
        <div className="text-xs text-gray-400">
          © 2024 MalangTravel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
