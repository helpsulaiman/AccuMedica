import { getTranslations, setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('HomePage');

  return (
    <div className="home-page">
      <Hero />

      <main className="padded-section">

      </main>
    </div>
  );
}
