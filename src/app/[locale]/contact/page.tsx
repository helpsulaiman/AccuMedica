import { getTranslations, setRequestLocale } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'ContactPage' });

    return (
        <div className="padded-section">
            <h1 className="heading-2 text-center mb-12">{t('title')}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                {/* Contact Details */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold text-teal-600 mb-4">{t('getInTouch')}</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {t('description')}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-teal-50 border border-teal-100">
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-100 text-teal-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{t('phone')}</h3>
                                <p className="text-gray-600" dir="ltr">+91 67663879</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-lg bg-teal-50 border border-teal-100">
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-100 text-teal-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{t('email')}</h3>
                                <p className="text-gray-600">info@accumedica.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
