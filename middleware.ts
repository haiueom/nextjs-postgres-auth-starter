import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!session) {
        return NextResponse.redirect(new URL('/login', req.url));
    } else if (session) {
        return NextResponse.redirect(new URL('/admin', req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
}
