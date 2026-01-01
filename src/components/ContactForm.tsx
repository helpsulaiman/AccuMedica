'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
    const t = useTranslations('ContactForm');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            // Reset after 3 seconds
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>{t('name')}</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className={styles.input}
                    placeholder={t('namePlaceholder')}
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>{t('email')}</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={styles.input}
                    placeholder={t('emailPlaceholder')}
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="subject" className={styles.label}>{t('subject')}</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className={styles.input}
                    placeholder={t('subjectPlaceholder')}
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="body" className={styles.label}>{t('message')}</label>
                <textarea
                    id="body"
                    name="body"
                    required
                    className={styles.textarea}
                    placeholder={t('messagePlaceholder')}
                />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
                {status === 'submitting' ? t('sending') : status === 'success' ? t('sent') : t('submit')}
            </button>
        </form>
    );
}
