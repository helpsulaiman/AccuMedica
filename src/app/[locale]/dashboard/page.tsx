import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function DashboardPage() {
    const t = useTranslations('Dashboard');

    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{t('title')}</h1>
            <p style={{ marginBottom: '2rem', color: '#666' }}>{t('welcome')}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                <Link
                    href="/dashboard/orders"
                    style={{
                        padding: '2rem',
                        border: '1px solid #ddd',
                        borderRadius: '0.5rem',
                        textDecoration: 'none',
                        color: 'inherit',
                        backgroundColor: '#fff',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                >
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{t('orders')}</h2>
                    <p style={{ color: '#666' }}>{t('viewOrders')}</p>
                </Link>

                <Link
                    href="/dashboard/products"
                    style={{
                        padding: '2rem',
                        border: '1px solid #ddd',
                        borderRadius: '0.5rem',
                        textDecoration: 'none',
                        color: 'inherit',
                        backgroundColor: '#fff',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                >
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{t('manageProducts')}</h2>
                    <p style={{ color: '#666' }}>{t('manageProductsDesc')}</p>
                </Link>
            </div>
        </div>
    );
}
