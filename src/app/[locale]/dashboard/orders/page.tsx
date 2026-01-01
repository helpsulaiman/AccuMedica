import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function OrdersPage() {
    const t = await getTranslations('Dashboard');
    const tCommon = await getTranslations('Checkout'); // Reuse currency

    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: { items: true }
    });

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem' }}>{t('ordersTitle')}</h1>
                <Link href="/dashboard" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>
                    {t('backToDashboard')}
                </Link>
            </div>

            {orders.length === 0 ? (
                <p>{t('noOrders')}</p>
            ) : (
                <div style={{ overflowX: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '0.5rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
                        <thead style={{ backgroundColor: '#f3f4f6' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>{t('orderId')}</th>
                                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>{t('date')}</th>
                                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>{t('customer')}</th>
                                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>{t('status')}</th>
                                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>{t('total')}</th>
                                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>{t('items')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '1rem', fontFamily: 'monospace' }}>{order.id.substring(0, 8)}...</td>
                                    <td style={{ padding: '1rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: 'bold' }}>{order.customerName}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{order.customerEmail}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.85rem',
                                            backgroundColor: order.status === 'PENDING' ? '#fef3c7' : '#d1fae5',
                                            color: order.status === 'PENDING' ? '#92400e' : '#065f46',
                                            fontWeight: 600
                                        }}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                                        {order.total.toFixed(3)} {tCommon('currency')}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {order.items.length} items
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
