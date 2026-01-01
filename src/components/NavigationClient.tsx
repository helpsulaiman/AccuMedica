'use client';

import { Link } from '@/i18n/routing';
import { useState } from 'react';
import LocaleSwitcher from './LocaleSwitcher';
import styles from './Navigation.module.css';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

interface NavigationClientProps {
    locale: string;
    messages: {
        products: string;
        about: string;
        contact: string;
        dashboard: string;
        cart: string;
    };
    isLoggedIn: boolean;
}

export default function NavigationClient({ locale, messages, isLoggedIn }: NavigationClientProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { cartCount } = useCart();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path: string) => pathname === `/${locale}${path}`;

    return (
        <nav className={styles.nav} dir="ltr">
            <div className={styles.logo}>
                <Link href="/">AccuMedica</Link>
            </div>

            <button
                className={styles.hamburger}
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
            >
                <span className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`}></span>
                <span className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`}></span>
                <span className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`}></span>
            </button>

            <ul className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
                <li>
                    <Link href="/products" className={isActive('/products') ? styles.active : ''}>
                        {messages.products}
                    </Link>
                </li>
                <li>
                    <Link href="/about" className={isActive('/about') ? styles.active : ''}>
                        {messages.about}
                    </Link>
                </li>
                <li>
                    <Link href="/contact" className={isActive('/contact') ? styles.active : ''}>
                        {messages.contact}
                    </Link>
                </li>
                {isLoggedIn && (
                    <li>
                        <Link href="/dashboard" className={isActive('/dashboard') ? styles.active : ''}>
                            {messages.dashboard}
                        </Link>
                    </li>
                )}
                <li>
                    <Link href="/cart" className={styles.cartLink} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>🛒</span>
                        <span>{messages.cart}</span>
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                backgroundColor: 'red',
                                color: 'white',
                                borderRadius: '50%',
                                padding: '2px 6px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold'
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </li>
                <li className={styles.localeSwitcher}>
                    <LocaleSwitcher />
                </li>
            </ul>

            {/* Overlay for mobile menu */}
            <div
                className={`${styles.overlay} ${isMenuOpen ? styles.visible : ''}`}
                onClick={() => setIsMenuOpen(false)}
            ></div>
        </nav>
    );
}
