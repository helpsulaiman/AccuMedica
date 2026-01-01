import { getTranslations, setRequestLocale } from 'next-intl/server';
import ProductCard from '@/components/ProductCard';
import styles from './products.module.css';
import { prisma } from '@/lib/prisma';

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'ProductsPage' });

    const products = await prisma.product.findMany();

    return (
        <div className="padded-section">
            <div className="text-center mb-12">
                <h1 className="heading-2 mb-4">{t('title')}</h1>
                <p className="text-muted max-w-2xl mx-auto">{t('description')}</p>
            </div>

            <div className={styles.grid}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
