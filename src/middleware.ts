import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, locales } from '@/i18n';

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  // Check if the default locale is in the pathname
  if (pathname.startsWith(`/${defaultLocale}`)) {
    // e.g. incoming request is /en/products
    // The new URL is now /products
    return NextResponse.redirect(
      new URL(pathname.replace(`/${defaultLocale}`, ''), request.url)
    );
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}`)
  );

  if (pathnameIsMissingLocale) {
    // We are on the default locale
    // Rewrite so Next.js understands

    // e.g. incoming request is /products
    // Tell Next.js it should pretend it's /en/products
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
};
