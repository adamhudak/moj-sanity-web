import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/studio') || pathname.startsWith('/api') || pathname.includes('.')) {
    return;
  }

  // Ak adresa začína na /sk, odstránime to z URL (redirect na verziu bez prefixu)
  if (pathname.startsWith('/sk/') || pathname === '/sk') {
    const newPathname = pathname.replace(/^\/sk/, '') || '/';
    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  const pathnameIsMissingLocale = !pathname.startsWith('/en/') && pathname !== '/en';

  // Ak chýba prefix a nie je to EN, interne to Nextu podstrčíme ako SK (rewrite)
  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(new URL(`/sk${pathname}`, request.url));
  }
}