// middleware.ts or middleware.js
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Edge logic here
  // Redirect or check authentication without Prisma
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
}
