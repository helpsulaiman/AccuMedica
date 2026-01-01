import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function OrderSuccessPage({ params }: { params: Promise<{ orderId: string }> }) {
    const t = await getTranslations('OrderSuccess');
    const { orderId } = await params;

    return (
        <div style={{ padding: '4rem 1rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{
                backgroundColor: '#e8f5e9',
                color: '#2e7d32',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem',
                fontSize: '3rem'
            }}>
                ✓
            </div>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1a1a1a' }}>{t('title')}</h1>
            <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
                {t('message')}
            </p>
            <div style={{
                backgroundColor: '#f5f5f5',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                marginBottom: '2rem',
                display: 'inline-block'
            }}>
                <span style={{ color: '#666', display: 'block', marginBottom: '0.5rem' }}>{t('orderId')}</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'monospace' }}>{orderId}</span>
            </div>
            <div>
                <Link
                    href="/products"
                    style={{
                        display: 'inline-block',
                        padding: '1rem 2rem',
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 600,
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        textDecoration: 'none'
                    }}
                >
                    {t('continueShopping')}
                </Link>
            </div>
        </div>
    );
}
