'use client';

import { logout } from '@/actions/auth';

export default function LogoutButton() {
    return (
        <button
            onClick={() => logout()}
            style={{
                background: '#ef4444',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.925rem',
                fontWeight: 600,
                textDecoration: 'none',
                padding: '0.5rem 1.25rem',
                borderRadius: '0.375rem',
                transition: 'background-color 0.2s',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
        >
            Logout
        </button>
    );
}
