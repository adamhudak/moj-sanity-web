import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Ak si v Studiu alebo na API, nič nerob
  if (pathname.startsWith('/studio') || pathname.startsWith('/api') || pathname.includes('.')) {
    return;
  }

  const pathnameIsMissingLocale = !pathname.startsWith('/sk/') && pathname !== '/sk' && 
                                   !pathname.startsWith('/en/') && pathname !== '/en';

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/sk${pathname}`, request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};