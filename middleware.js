// middleware.js
import { NextResponse } from 'next/server';
import { ROLE } from './constant/role';

const protectedAdminPaths = [
    '/admin',
    '/admin/dashboard',
    '/admin/profile',
    '/admin/settings',
    '/admin/service',
    '/admin/team',
];

export function middleware(req) {
    const { pathname } = req.nextUrl;

    if (protectedAdminPaths.some(path => pathname.startsWith(path))) {

        const token = req.cookies.get('token');
        const role = req.cookies.get('role');

        if (!token) {
            const url = req.nextUrl.clone();
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
        if (protectedAdminPaths.some(path => pathname.startsWith(path)) && role.value !== ROLE.ADMIN) {
            const url = req.nextUrl.clone();
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
