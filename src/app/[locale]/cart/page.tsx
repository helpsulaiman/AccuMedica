'use client';

import { useCart } from '@/context/CartContext';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const t = useTranslations('Cart'); // Ensure you have translations for Cart or fallback to English if not set up

    if (items.length === 0) {
        return (
            <div style={{ padding: '4rem 1rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{t('empty')}</h1>
                <p style={{ marginBottom: '2rem', color: '#666' }}>{t('emptyMessage')}</p>
                <Link href="/products" style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: '0.25rem',
                    textDecoration: 'none'
                }}>
                    {t('browse')}
                </Link>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{t('title')}</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
                {/* Cart Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {items.map(item => (
                        <div key={item.id} style={{
                            display: 'flex',
                            gap: '1rem',
                            padding: '1rem',
                            border: '1px solid #eee',
                            borderRadius: '0.5rem',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem'
                            }}>
                                {item.image ? (
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem' }} />
                                ) : '📦'}
                            </div>

                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.name}</h3>
                                <p style={{ color: '#666' }}>{item.price.toFixed(3)} {t('currency')}</p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    style={{ padding: '0.25rem 0.5rem', border: '1px solid #ddd', borderRadius: '0.25rem' }}
                                >
                                    -
                                </button>
                                <span style={{ width: '30px', textAlign: 'center' }}>{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    style={{ padding: '0.25rem 0.5rem', border: '1px solid #ddd', borderRadius: '0.25rem' }}
                                >
                                    +
                                </button>
                            </div>

                            <div style={{ fontWeight: 600, minWidth: '80px', textAlign: 'right' }}>
                                {(item.price * item.quantity).toFixed(3)} {t('currency')}
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', padding: '0.5rem' }}
                                aria-label="Remove item"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={clearCart}
                        style={{ alignSelf: 'flex-start', color: '#666', border: 'none', background: 'none', cursor: 'pointer', textDecoration: 'underline', marginTop: '1rem' }}
                    >
                        {t('clear')}
                    </button>
                </div>

                {/* Summary */}
                <div style={{
                    padding: '1.5rem',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '0.5rem',
                    height: 'fit-content'
                }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{t('summary')}</h2>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>{t('subtotal')}</span>
                        <span>{cartTotal.toFixed(3)} {t('currency')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#666' }}>
                        <span>{t('shipping')}</span>
                        <span>{t('free')}</span>
                    </div>

                    <div style={{ borderTop: '1px solid #ddd', paddingTop: '1rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.125rem' }}>
                        <span>{t('total')}</span>
                        <span>{cartTotal.toFixed(3)} {t('currency')}</span>
                    </div>

                    <Link href="/checkout" style={{
                        display: 'block',
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        textAlign: 'center',
                        borderRadius: '0.5rem',
                        marginTop: '1.5rem',
                        fontWeight: 600,
                        textDecoration: 'none'
                    }}>
                        {t('checkout')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
