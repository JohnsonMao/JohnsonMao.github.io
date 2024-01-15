import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, locales } from '~/data/i18n';
import getLocale from '@/utils/getLocale';

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocalePrefix = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocalePrefix) return;

  const acceptLanguage = request.headers.get('Accept-Language');
  const locale = getLocale(acceptLanguage, defaultLocale);
  const redirectURL = new URL(`/${locale}${pathname}`, request.url);

  if (locale !== defaultLocale) {
    return NextResponse.redirect(redirectURL);
  }

  return NextResponse.rewrite(redirectURL);
}

export const config = {
  matcher: [
    // Skip paths
    '/((?!api|_next/static|_next/image|static|feed|favicon.ico|sw.js).*)',
  ],
};
