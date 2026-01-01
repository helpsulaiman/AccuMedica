import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useLocale } from 'next-intl';
import AddToCartButton from '@/components/AddToCartButton';

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }) {
    const { id, locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Products' });

    // We can fetch product here for dynamic metadata if we want, 
    // but for now let's use the ID or generic title to save a DB call if not cached setup
    // Actually, good SEO requires fetching name.
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
        return { title: 'Product Not Found' };
    }

    return {
        title: `${product.name} | AccuMedica`,
        description: product.description,
    };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
    const { id, locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Products');

    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) {
        notFound();
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
            <Link href="/products" style={{ display: 'inline-block', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                ← {t('backToProducts')}
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginTop: '2rem' }}>
                {/* Image Section */}
                <div style={{
                    backgroundColor: '#f5f5f5',
                    borderRadius: '1rem',
                    aspectRatio: '1/1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem'
                }}>
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }}
                        />
                    ) : (
                        <span>📦</span>
                    )}
                </div>

                {/* Details Section */}
                <div>
                    <div style={{
                        textTransform: 'uppercase',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--primary-color)',
                        marginBottom: '0.5rem'
                    }}>
                        {/* Fallback to raw category if translation missing */}
                        {t.has(`categories.${product.category}`) ? t(`categories.${product.category}`) : product.category}
                    </div>

                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.2 }}>
                        {product.name}
                    </h1>

                    <p style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem' }}>
                        {product.price ? `${product.price.toFixed(3)} ${t('currency')}` : t('contactForPrice')}
                    </p>

                    <p style={{ fontSize: '1.125rem', lineHeight: 1.6, color: 'var(--text-color)', opacity: 0.9, marginBottom: '2.5rem' }}>
                        {product.description}
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                        <AddToCartButton product={product} isBuyNow={true} />
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}
