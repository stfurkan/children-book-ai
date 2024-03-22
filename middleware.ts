
import { NextResponse } from 'next/server';
import { auth } from "./auth";

const publicRoutes = ['/']

export default auth((req) => {
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next()
  }

  if (req.auth?.user) {
    return NextResponse.next()
  } else {
    const url = req.nextUrl.clone();
    url.pathname = '/'; // Redirect to signin page
    return NextResponse.redirect(url)
  }
})

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}