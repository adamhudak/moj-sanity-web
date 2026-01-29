"use client";

import Link from 'next/link';
import { usePathname } from "next/navigation";

interface MenuItem {
  label: string;
  slug: string;
}

export default function Navigation({ menuItems }: { menuItems: MenuItem[] }) {
  const pathname = usePathname();
  const isStudio = pathname === "/studio" || pathname.startsWith("/studio/");

  if (isStudio) return null;

  // Rozbijeme cestu (napr. "/sk/kontakt" -> ["", "sk", "kontakt"])
  const segments = pathname.split("/");
  const currentLocale = segments[1] || "sk"; // predpokladáme sk ako základ
  
  // Funkcia na vygenerovanie novej URL pri zmene jazyka
  const getTranslatablePath = (newLocale: string) => {
    const newSegments = [...segments];
    newSegments[1] = newLocale;
    return newSegments.join("/") || "/";
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/${currentLocale}`} className="font-black text-xl text-slate-900 tracking-tighter">
          MOJ<span className="text-blue-600">WEB.</span>
        </Link>
        
        <div className="flex gap-8 items-center">
          {/* Dynamické menu */}
          {menuItems?.map((item) => {
            // Cesta v menu musí obsahovať aktuálny locale
            const href = `/${currentLocale}/${item.slug}`;
            const isActive = pathname === href;

            return (
              <Link 
                key={item.slug} 
                href={href}
                className={isActive ? 'text-blue-600 font-medium' : 'text-slate-600 hover:text-blue-500'}
              >
                {item.label}
              </Link>
            );
          })}

          {/* PREPÍNAČ JAZYKOV */}
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <Link
              href={getTranslatablePath("sk")}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                currentLocale === "sk" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              SK
            </Link>
            <Link
              href={getTranslatablePath("en")}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                currentLocale === "en" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              EN
            </Link>
          </div>

          <Link href="/studio" className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs">
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}