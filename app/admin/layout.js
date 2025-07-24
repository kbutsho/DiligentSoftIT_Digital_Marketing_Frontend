'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './admin.module.css';
import { FaTachometerAlt, FaCog, FaBars, FaPowerOff, FaUser, FaServicestack } from 'react-icons/fa';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CONFIG } from '@/configuration';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function AdminDashboardLayout({ children }) {
    const router = useRouter()
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [loading, setLoading] = useState(false)
    const pathname = usePathname();
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };
    const isActive = (href) => pathname === href;
    const sidebarLinks = [
        { label: 'Dashboard', href: '/admin/dashboard', icon: FaTachometerAlt },
        { label: 'Profile', href: '/admin/profile', icon: FaUser },
        { label: 'Service', href: '/admin/service', icon: FaServicestack },
        { label: 'Settings', href: '/admin/settings', icon: FaCog }

    ];
    const handleLogout = async () => {
        try {
            setLoading(true);
            const token = Cookies.get('token');

            const response = await axios.post(`${CONFIG.API}/auth/logout`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            if (response.data.success) {
                Cookies.remove('token');
                Cookies.remove('role');
                toast.success('Logout successful');
                router.push("/")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Logout failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.layoutContainer}>
            <div className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded}`}>

                <ul className="nav nav-pills flex-column mb-auto w-100">
                    <li className={`nav-item mb-3 d-flex me-2 ${isCollapsed ? 'justify-content-center' : 'justify-content-end'}`}>
                        <FaBars role="button" onClick={toggleSidebar} />
                    </li>


                    {sidebarLinks.map(({ label, href, icon: Icon }) => (
                        <li
                            key={href}
                            className={`nav-item mb-2 ${isActive(href)
                                ? isCollapsed
                                    ? styles.activeLinkCollapsed
                                    : styles.activeLink
                                : ''
                                }`}
                        >
                            <Link
                                href={href}
                                className="nav-link text-white d-flex align-items-center justify-content-start"
                            >
                                <Icon className="me-2" />
                                {!isCollapsed && label}
                            </Link>
                        </li>
                    ))}

                    <li className={`nav-item mb-2 ${styles.logoutBtn}`}>
                        <span onClick={handleLogout} className="nav-link text-danger d-flex align-items-center justify-content-start">
                            <FaPowerOff className="me-2" />
                            {!isCollapsed && (loading ? 'Logging out...' : 'Logout')}
                        </span>
                    </li>
                </ul>
            </div>

            <div className={styles.contentWrapper}>
                <Breadcrumbs />
                {children}
            </div>
        </div>
    );
}