"use client"; // Klientska logika patrí sem

import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const isStudio = pathname === "/studio" || pathname.startsWith("/studio/");

  if (isStudio) return null;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-black text-xl text-slate-900 tracking-tighter">
          MOJ<span className="text-blue-600">WEB.</span>
        </Link>
        <div className="flex gap-8 items-center">
          <Link href="/" className={pathname === '/' ? 'text-blue-600' : 'text-slate-600'}>Domov</Link>
          <Link href="/studio" className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs">Admin</Link>
        </div>
      </nav>
    </header>
  );
}