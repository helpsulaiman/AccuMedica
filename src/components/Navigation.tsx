import { getTranslations, getLocale } from 'next-intl/server';
import NavigationClient from './NavigationClient';

export default async function Navigation() {
    const t = await getTranslations('Navigation');
    const h = await getTranslations('HomePage');
    const locale = await getLocale();

    const messages = {
        products: t('products'),
        about: t('about'),
        contact: t('contact'),
        dashboard: t('dashboard'),
        cart: t('cart'),
    };

    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const isLoggedIn = cookieStore.has('admin_session');

    return <NavigationClient locale={locale} messages={messages} isLoggedIn={isLoggedIn} />;
}
