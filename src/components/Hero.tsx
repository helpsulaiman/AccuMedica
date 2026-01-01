import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import styles from './Hero.module.css';

export default async function Hero() {
    const t = await getTranslations('HomePage');

    return (
        <section className={styles.section}>
            <div className={styles.overlay}></div>

            <div className={styles.content}>
                <h1 className={styles.title}>
                    {t('heroTitle')}
                </h1>
                <p className={styles.subtitle}>
                    {t('heroSubtitle')}
                </p>
                <Link
                    href="/products"
                    className={styles.button}
                >
                    {t('cta')}
                </Link>
            </div>

            {/* Decorative Elements */}
            <div className={styles.decoration}>
                <div className={styles.blob1}></div>
                <div className={styles.blob2}></div>
            </div>
        </section>
    );
}
