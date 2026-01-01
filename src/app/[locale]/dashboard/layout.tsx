import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import styles from '@/components/Navigation.module.css'; // Reusing nav styles for consistent header
import LogoutButton from '@/components/LogoutButton';

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations('Navigation');
    const h = await getTranslations('HomePage');

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header className={styles.header} style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <div className={styles.container} style={{ maxWidth: '1400px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link href="/dashboard" className={styles.logo} style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--primary-color)' }}>AccuMedica</span>
                            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>Dashboard</span>
                        </Link>
                    </div>
                    <div className={styles.actions} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link
                            href="/"
                            style={{
                                textDecoration: 'none',
                                color: '#4b5563',
                                fontSize: '0.925rem',
                                fontWeight: 500,
                                padding: '0.5rem 1rem',
                                borderRadius: '0.375rem',
                                transition: 'background-color 0.2s',
                                border: '1px solid #e5e7eb'
                            }}
                        >
                            ← Back to Site
                        </Link>
                        <div style={{ transform: 'scale(0.95)' }}>
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            </header>
            <main style={{ flex: 1, padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                {children}
            </main>
        </div>
    );
}
