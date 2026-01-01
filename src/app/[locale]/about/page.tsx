import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'AboutPage' });

    return (
        <div className="padded-section">
            <h1 className="heading-2">{t('title')}</h1>
            <p className="text-muted">{t('description')}</p>
        </div>
    );
}
