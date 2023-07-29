import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, locales } from './i18n';

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // e.g. incoming request is /posts
    // Tell Next.js it should pretend it's /{defaultLocale}/posts
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip paths
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
};
