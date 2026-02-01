import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip middleware for login page and API routes
  if (pathname === '/admin/login' || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Check if accessing admin routes
  if (pathname.startsWith('/admin')) {
    // Client-side will handle token check, allow passage
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
