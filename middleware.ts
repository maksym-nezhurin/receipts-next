import {NextRequest, NextResponse} from "next/server";

export function middleware(req: NextRequest) {
    const nextUrl = req.nextUrl;

    if (nextUrl.pathname === '/recipes') {
        const isAuthenticated = req.cookies.get('authenticated');
        if (isAuthenticated) {
            // If the cookie exists, allow the request to proceed
            return NextResponse.next();
        } else {
            // If the cookie doesn't exist, redirect the user to the login page
            return NextResponse.redirect('http://localhost:3000/signin');
        }
    }

    // If the request is not for the 'recipes' page, allow it to proceed
    return NextResponse.next();
}

export const config = {
    matcher: ['/recipes']
};