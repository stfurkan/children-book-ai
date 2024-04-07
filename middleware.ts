
import { NextResponse } from 'next/server';
import { auth } from "./auth";

const publicRoutes = [
  '/',
  '/books',
  '/privacy-policy',
  '/terms-of-service',
];

export default auth((req) => {
  console.log('Middleware: ', req.nextUrl.pathname);
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Custom check for /book/[bookId] pattern
  const isBookRoute = req.nextUrl.pathname.startsWith('/book/')
    && (
      req.nextUrl.pathname.split('/').length === 3
      || req.nextUrl.pathname.split('/').length === 4
    );
  if (isBookRoute) {
    return NextResponse.next();
  }

  // Custom check for /books/[userId] pattern
  const isUserBooksRoute = req.nextUrl.pathname.startsWith('/books/')
    && req.nextUrl.pathname.split('/').length === 3;
  
  if (isUserBooksRoute) {
    return NextResponse.next();
  }

  if (req.auth?.user) {
    return NextResponse.next();
  } else {
    const url = req.nextUrl.clone();
    url.pathname = '/'; // Redirect to signin page
    return NextResponse.redirect(url)
  }
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
