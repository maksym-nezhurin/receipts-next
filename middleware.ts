import {NextRequest, NextResponse} from "next/server";

export function middleware(req: NextRequest) {
    const nextUrl = req.nextUrl;

    if (nextUrl.pathname === '/recipes') {
        console.log('auth middleware', req.cookies);
        if (req.cookies.get('authenticated')) {
            return NextResponse.rewrite(new URL('/recipes', req.url));
        } else {
            return NextResponse.rewrite(new URL('/auth', req.url));
        }
    }
}