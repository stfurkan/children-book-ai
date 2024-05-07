
import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { auth } from "./auth";

import { intlConfig } from "@/messages/config";
const { locales, defaultLocale, localePrefix } = intlConfig;

/*
const publicRoutes = [
  '/',
  '/books',
  '/privacy-policy',
  '/terms-of-service',
  '/signin',
];
*/

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix
});

/*
const authMiddleware = auth((req) => {
  // private routes here
  const session = req.auth

  if (session) {
    return intlMiddleware(req)
  } else {
    // Determine the locale for redirection
    const url = req.nextUrl.clone();
    const localePath = url.locale ? `/${url.locale}` : '';
    const signInPath = `${localePath}/signin`;
    url.pathname = signInPath;

    // Redirect to the localized sign-in page if no session is found
    return NextResponse.redirect(url);
  }
})
*/

export default function middleware(req: NextRequest) {
  /*
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(/book/[^/]+|/book/[^/]+/summary|/book/[^/]+/read|/books/[^/]+|${publicRoutes.flatMap((p) => {
      if (p === "/") {
        return ["", "/"]; // Root path handled separately for optional trailing slash
      }
      // Ensure all other routes and their trailing slash variations are matched
      return [p, `${p}/?`]; 
    }).join("|")})/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    return intlMiddleware(req)
  } else {
    return (authMiddleware as any)(req)
  }
  */

  return intlMiddleware(req)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // '/book/:bookId',
    // '/book/:bookId/summary',
    // '/book/:bookId/read',
    // '/books/:userId',
  ],
}
