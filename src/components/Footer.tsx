import { getTranslations } from 'next-intl/server';
import styles from './Footer.module.css';

export default async function Footer() {
    const t = await getTranslations('Footer');

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>{t('rights')}</p>
            </div>
        </footer>
    );
}
