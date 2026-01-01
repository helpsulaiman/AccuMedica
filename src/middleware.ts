import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the user is accessing dashboard routes
    // Regex matches /en/dashboard, /ar/dashboard, /dashboard, etc.
    const isDashboard = pathname.match(/^\/(en|ar)?\/dashboard/);

    if (isDashboard) {
        const hasSession = request.cookies.has('admin_session');

        if (!hasSession) {
            // Redirect to login page, preserving locale if present
            const locale = pathname.match(/^\/(en|ar)/)?.[1] || 'en';
            return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
        }
    }

    return intlMiddleware(request);
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(ar|en)/:path*']
};
