import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

async function middleWare(req) {

  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  // Allow the requests if the following is true
  // 1. It's a request for next-auth session & provider is fetching
  // 2. the token exists

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // Redirect to login page if the user does not have a token
  // and are requesting a protected route
  if (!token && pathname !== 'login') {
    // return NextResponse.redirect('localhost:3000/login');
    return NextResponse.rewrite(new URL('/login', req.url));
  }
};

export default middleWare;