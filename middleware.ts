import Negotiator from 'negotiator';
import { i18n } from './i18n-config';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import { auth } from './auth';

function getLocale(request: NextRequest): string | undefined {
  // Transform headers to a plain object for Negotiator
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Extract locales from i18n configuration
  const locales: string[] = [...i18n.locales];

  // Use Negotiator and intl-localematcher to get the best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  // Match the best locale or fall back to the default locale
  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

const protectedRoutes = ['admin'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Ignore specific public files and paths
  if (
    [
      '/manifest.json',
      '/favicon.ico',
      '/icon.png',
      '/flags/vi.svg',
      '/flags/ja.svg',
      '/flags/en.svg',
      '/sitemap.xml',
    ].includes(pathname)
  ) {
    return NextResponse.next();
  }

  let finalUrl = '';
  let forceRedirect = false;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale in the pathname
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request) || i18n.defaultLocale;

    finalUrl = `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
    forceRedirect = true;
  }

  // check pathname include protected route
  let mainSlug = pathname.split('/')[2];

  if (protectedRoutes.includes(mainSlug)) {
    const session = await auth();
    if (!session) {
      let locale = pathname.split('/')[1];
      finalUrl = `/${locale}`;
      forceRedirect = true;
    }
  }

  if (forceRedirect) {
    return NextResponse.redirect(new URL(finalUrl, request.url));
  }

  // If the pathname includes a supported locale, just continue
  return NextResponse.next();
}

export const config = {
  // Matcher to ignore specific paths
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
