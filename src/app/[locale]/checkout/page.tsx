'use client';

import { useCart } from '@/context/CartContext';
import { placeOrder } from '@/actions/shop';
import { useRouter } from '@/i18n/routing';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '', // In a real app, populate from session if logged in
        address: '',
        city: '',
        paymentMethod: 'COD'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (items.length === 0) return;

        setIsSubmitting(true);
        setError(null);

        const fullAddress = `${formData.address}, ${formData.city}`;

        try {
            const result = await placeOrder(items, cartTotal, {
                name: formData.name,
                email: formData.email,
                address: fullAddress,
                paymentMethod: formData.paymentMethod
            });

            if (result.error) {
                setError(result.error);
                setIsSubmitting(false);
            } else if (result.success) {
                clearCart();
                router.push(`/checkout/success/${result.orderId}`);
            }
        } catch (e) {
            setError('An unexpected error occurred.');
            setIsSubmitting(false);
        }
    };

    const t = useTranslations('Checkout');

    // ... (handlers remain the same)

    if (items.length === 0) {
        return (
            <div className="p-8 text-center" style={{ padding: '4rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t('empty')}</h2>
                <button onClick={() => router.push('/products')} style={{ textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--primary-color)' }}>
                    {t('backToProducts')}
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{t('title')}</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Form Section */}
                <div>
                    <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t('fullName')}</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t('email')}</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t('address')}</label>
                            <textarea
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleInputChange}
                                rows={3}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ccc', fontFamily: 'inherit' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t('city')}</label>
                            <input
                                type="text"
                                name="city"
                                required
                                value={formData.city}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t('paymentMethod')}</label>
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                            >
                                <option value="COD">{t('cod')}</option>
                                <option value="KNET">{t('knet')}</option>
                                <option value="CREDIT_CARD">{t('creditCard')}</option>
                            </select>
                        </div>

                        {error && (
                            <div style={{ padding: '1rem', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '0.25rem' }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                backgroundColor: 'var(--primary-color)',
                                color: 'white',
                                fontSize: '1.125rem',
                                fontWeight: 600,
                                border: 'none',
                                borderRadius: '0.5rem',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                opacity: isSubmitting ? 0.7 : 1,
                                marginTop: '1rem'
                            }}
                        >
                            {isSubmitting ? t('processing') : `${t('placeOrder')} - ${cartTotal.toFixed(3)} ${t('currency')}`}
                        </button>
                    </form>
                </div>

                {/* Summary Section */}
                <div style={{ height: 'fit-content', padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '1rem' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{t('summary')}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {items.map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                <span>{item.quantity}x {item.name}</span>
                                <span>{(item.price * item.quantity).toFixed(3)} {t('currency')}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ borderTop: '1px solid #ddd', marginTop: '1rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                        <span>{t('summary')}</span>
                        <span>{cartTotal.toFixed(3)} {t('currency')}</span>
                    </div>
                    <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#666' }}>
                        {t('shippingNote')}
                    </div>
                </div>
            </div>
        </div>
    );
}
