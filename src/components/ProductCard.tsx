import { useTranslations } from 'next-intl';
import React from 'react';
import styles from './ProductCard.module.css';
import { Product } from '@prisma/client';
import AddToCartButton from './AddToCartButton';
import { Link } from '@/i18n/routing';

interface ProductCardProps {
    product: Product; // Note: We might need to update this type if it comes from Prisma now
}

export default function ProductCard({ product }: ProductCardProps) {
    const t = useTranslations('Products');

    return (
        <article className={styles.card}>
            <div className={styles.imageContainer}>
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className={styles.placeholderImage} // Reusing class for dimensions
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                ) : (
                    <div className={`${styles.placeholderImage}`}>
                        📦
                    </div>
                )}
            </div>

            <div className={styles.content}>
                <div className={styles.category}>
                    {t.has(`categories.${product.category}`) ? t(`categories.${product.category}`) : product.category}
                </div>

                <h3 className={styles.title}>
                    {product.name}
                </h3>

                <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
                    {product.price ? `${product.price.toFixed(3)} ${t('currency')}` : t('contactForPrice')}
                </p>

                <p className={styles.description}>
                    {product.description}
                </p>

                <div className={styles.action}>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                        <AddToCartButton product={product} />
                    </div>

                    <Link href={`/products/${product.id}`} className={styles.link} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>
                        {t('viewDetails')}
                        <span className={styles.arrow}>→</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
