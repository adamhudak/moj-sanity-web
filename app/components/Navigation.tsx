"use client";

import Link from 'next/link';
import { usePathname, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { client } from "../lib/sanity"; 

interface MenuItem {
  label: string;
  slug: string;
}

export default function Navigation({ menuItems }: { menuItems: MenuItem[] }) {
  const pathname = usePathname();
  const params = useParams();
  
  const isStudio = pathname === "/studio" || pathname.startsWith("/studio/");
  const currentLocale = (params.locale as string) || "sk";
  const currentSlug = params.slug as string;

  const [translatedSlug, setTranslatedSlug] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTranslation() {
      if (!currentSlug) {
        setTranslatedSlug(null);
        return;
      }
      const targetLocale = currentLocale === "sk" ? "en" : "sk";
      const query = `*[_type == "translation.metadata" && references(*[slug.current == $currentSlug]._id)][0].translations[value->language == $targetLocale][0]{
        "slug": value->slug.current
      }`;

      try {
        const result = await client.fetch(query, { currentSlug, targetLocale });
        setTranslatedSlug(result?.slug || null);
      } catch (error) {
        console.error("Chyba pri hľadaní prekladu slugu:", error);
      }
    }
    fetchTranslation();
  }, [currentSlug, currentLocale]);

  if (isStudio) return null;

  // 1. OPRAVENÁ FUNKCIA PRE LINKY BEZ /SK
  const getTranslatablePath = (newLocale: string) => {
    // Ak prepíname na SK, výsledná URL nesmie mať prefix
    const prefix = newLocale === "sk" ? "" : `/${newLocale}`;
    
    if (currentSlug && translatedSlug) {
      return `${prefix}/${translatedSlug}`;
    }
    if (currentSlug) {
      return `${prefix}/${currentSlug}`;
    }
    return prefix || "/";
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO: Opravené na / alebo /en */}
        <Link href={currentLocale === "sk" ? "/" : "/en"} className="font-black text-xl text-slate-900 tracking-tighter">
          MOJ<span className="text-blue-600">WEB.</span>
        </Link>
        
        <div className="flex gap-8 items-center">
          {/* DYNAMICKÉ MENU */}
          {menuItems?.map((item) => {
            // Generovanie href bez /sk
            const href = currentLocale === "sk" ? `/${item.slug}` : `/en/${item.slug}`;
            
            // Aktívny stav - musíme porovnávať s pathname, ale pozor na to, že pathname môže byť /sk/nieco (pred redirectom)
            // Najistejšie je porovnať slug
            const isActive = currentSlug === item.slug;

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
            {["sk", "en"].map((lang) => (
              <Link
                key={lang}
                href={getTranslatablePath(lang)}
                className={`px-3 py-1 rounded-md text-xs font-bold uppercase transition-all ${
                  currentLocale === lang ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {lang}
              </Link>
            ))}
          </div>

          <Link href="/studio" className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs">
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}