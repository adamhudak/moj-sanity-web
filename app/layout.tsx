"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  // Kontrola, či sa nachádzame v Sanity Studiu
  const isStudio = pathname.startsWith("/studio");

  return (
    <html lang="sk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}
        suppressHydrationWarning={true} 
      >
        
        {/* Navigácia sa zobrazí iba ak NIE SME v studiu */}
        {!isStudio && (
          <header className="sticky top-0 z-50 bg-white/100 backdrop-blur-md border-b border-slate-100">
            <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="font-black text-xl text-slate-900 tracking-tighter">
                MOJ<span className="text-blue-600">WEB.</span>
              </Link>

              {/* Menu linky */}
              <div className="flex gap-8 items-center">
                <Link 
                  href="/" 
                  className={`text-sm font-semibold transition-colors ${pathname === '/' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
                >
                  Domov
                </Link>
                <Link 
                  href="/about" 
                  className={`text-sm font-semibold transition-colors ${pathname === '/about' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
                >
                  O nás
                </Link>
                <Link 
                  href="/studio" 
                  className="text-xs font-bold bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all shadow-sm"
                >
                  Admin
                </Link>
              </div>
            </nav>
          </header>
        )}

        {/* Samotný obsah stránky */}
        <div className={isStudio ? "" : "min-h-[calc(100vh-128px)]"}>
          {children}
        </div>

        {/* Footer sa tiež v studiu skryje */}
        {!isStudio && (
          <footer className="py-12 border-t border-slate-200 text-center text-slate-400 text-sm bg-white">
            © 2026 Tvoj Projekt. Vytvorené v Next.js & Sanity.
          </footer>
        )}
      </body>
    </html>
  );
}