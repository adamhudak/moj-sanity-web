"use client";

import Link from 'next/link';
import { usePathname } from "next/navigation";

// Definujeme, ako vyzerá jedna položka menu
interface MenuItem {
  label: string;
  slug: string;
}

export default function Navigation({ menuItems }: { menuItems: MenuItem[] }) {
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
          {/* Dynamické menu zo Sanity */}
          {menuItems?.map((item) => (
            <Link 
              key={item.slug} 
              href={`/${item.slug}`}
              className={pathname === `/${item.slug}` ? 'text-blue-600 font-medium' : 'text-slate-600 hover:text-blue-500'}
            >
              {item.label}
            </Link>
          ))}

          <Link href="/studio" className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs">
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}