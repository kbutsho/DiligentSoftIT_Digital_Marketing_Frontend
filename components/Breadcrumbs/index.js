'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './breadcrumbs.module.css';

export default function Breadcrumbs() {
    const pathname = usePathname();

    const segments = pathname.split('/').filter(Boolean);

    const crumbs = segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
            <li key={href} className={styles.breadcrumbItem}>
                <Link href={href} className={styles.breadcrumbLink}>
                    {label}
                </Link>
                {index < segments.length - 1 && <span className={styles.separator}>/</span>}
            </li>
        );
    });

    return (
        <nav aria-label="breadcrumb">
            <ul className={styles.breadcrumbList}>
                <li className={styles.breadcrumbItem}>
                    <Link href="/" className={styles.breadcrumbLink}>Home</Link>
                    {segments.length > 0 && <span className={styles.separator}>/</span>}
                </li>
                {crumbs}
            </ul>
        </nav>
    );
}
