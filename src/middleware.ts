import { NextRequest, NextResponse } from 'next/server';
import { locales } from '~/i18n';
import getLocale from '@/utils/getLocale';

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocalePrefix = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocalePrefix) return;

  const acceptLanguage = request.headers.get('Accept-Language');
  const locale = getLocale(acceptLanguage);
  const redirectURL = new URL(`/${locale}${pathname}`, request.url);

  if (locale !== 'zh-TW') {
    return NextResponse.redirect(redirectURL);
  }

  return NextResponse.rewrite(redirectURL);
}

export const config = {
  matcher: [
    // Skip paths
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
};
