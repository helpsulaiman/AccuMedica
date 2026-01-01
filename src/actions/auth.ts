'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function login(prevState: any, formData: FormData) {
    const email = formData.get('email') as string; // Changed from password-only to email+password
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'Please provide both email and password' };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (!user) {
            return { error: 'Invalid credentials' };
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return { error: 'Invalid credentials' };
        }

        // Set cookie manually
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        const locale = await getLocale();
        // Use localized redirect
        redirect(`/${locale}/dashboard`);

    } catch (error) {
        // Next.js redirects throw error, so we must rethrow them
        if ((error as Error).message === 'NEXT_REDIRECT') {
            throw error;
        }
        console.error('Login error:', error);
        return {
            error: `Login failed: ${(error as Error).message}`,
            debug: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
        };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/');
}
