import { NextRequest, NextResponse } from 'next/server';
import { Locale, defaultLocale, locales } from '~/i18n';

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('Accept-Language');

  if (!acceptLanguage) return defaultLocale;

  // match accept language
  // e.g. zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7 => [ 'zh-TW', 'zh', 'en-US', 'en' ]
  const languageReg = /([\w]{2,3}-?[\w]{0,3})/gm;
  const languages = acceptLanguage.match(languageReg);
  const selectedLocale = languages?.find((language) =>
    locales.includes(language as Locale)
  );

  return selectedLocale || defaultLocale;
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // e.g. incoming request is /posts
    // Tell Next.js it should pretend it's /{defaultLocale}/posts
    const locale = getLocale(request);

    return NextResponse.rewrite(new URL(`/${locale}${pathname}`, request.url));
  }
}

export const config = {
  matcher: [
    // Skip paths
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
};
