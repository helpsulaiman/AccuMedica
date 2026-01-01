'use client';

import { login } from '@/actions/auth';
import { useActionState } from 'react';

// Simple client component wrapper for the form to handle state
export default function LoginPage() {
    // @ts-ignore - useActionState types can be tricky in some next versions
    const [state, formAction, isPending] = useActionState(login, null);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Admin Login</h1>
                <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            placeholder="admin@accumedica.com"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #ddd',
                                borderRadius: '0.25rem'
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #ddd',
                                borderRadius: '0.25rem'
                            }}
                        />
                    </div>

                    {state?.error && (
                        <p style={{ color: 'red', fontSize: '0.875rem' }}>{state.error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        style={{
                            padding: '0.75rem',
                            backgroundColor: 'var(--primary-color, #0070f3)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.25rem',
                            fontWeight: 'bold',
                            cursor: isPending ? 'not-allowed' : 'pointer',
                            opacity: isPending ? 0.7 : 1
                        }}
                    >
                        {isPending ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
