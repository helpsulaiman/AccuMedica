'use client';

import { useCart, CartItem } from '@/context/CartContext';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';

interface AddToCartButtonProps {
    product: {
        id: string;
        name: string;
        price: number;
        image: string | null;
    };
    isBuyNow?: boolean;
}

export default function AddToCartButton({ product, isBuyNow = false }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const router = useRouter();
    const t = useTranslations('Products'); // Assuming common button labels are here or create new namespace

    const handleAction = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent linking if inside a Link
        e.stopPropagation();

        const item: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price || 0,
            image: product.image,
            quantity: 1
        };

        addToCart(item);

        if (isBuyNow) {
            router.push('/cart'); // Or checkout directly
        } else {
            // Optional: Show toast
            // alert('Added to cart!');
        }
    };

    return (
        <button
            onClick={handleAction}
            style={isBuyNow ? {
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--primary-color, #0070f3)',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                fontWeight: 600,
                cursor: 'pointer',
                flex: 1
            } : {
                padding: '0.5rem 1rem',
                backgroundColor: 'white',
                color: 'var(--primary-color, #0070f3)',
                border: '1px solid var(--primary-color, #0070f3)',
                borderRadius: '0.25rem',
                fontWeight: 600,
                cursor: 'pointer',
                flex: 1
            }}
        >
            {isBuyNow ? t('buyNow') : t('addToCart')}
        </button>
    );
}
