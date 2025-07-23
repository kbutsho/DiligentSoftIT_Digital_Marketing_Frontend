'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './admin.module.css';
import { FaTachometerAlt, FaCog, FaBars, FaPowerOff, FaUser } from 'react-icons/fa';
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

                    <li className={`nav-item mb-2 ${isActive('/admin/dashboard')
                        ? isCollapsed
                            ? styles.activeLinkCollapsed
                            : styles.activeLink
                        : ''
                        }`}>
                        <Link
                            href="/admin/dashboard"
                            className="nav-link text-white d-flex align-items-center justify-content-start">
                            <FaTachometerAlt className="me-2" />
                            {!isCollapsed && 'Dashboard'}
                        </Link>
                    </li>

                    <li className={`nav-item mb-2 ${isActive('/admin/profile')
                        ? isCollapsed
                            ? styles.activeLinkCollapsed
                            : styles.activeLink
                        : ''
                        }`}>
                        <Link href="/admin/profile" className="nav-link text-white d-flex align-items-center justify-content-start">
                            <FaUser className="me-2" />
                            {!isCollapsed && 'Profile'}
                        </Link>
                    </li>

                    <li className={`nav-item mb-2 ${isActive('/admin/settings')
                        ? isCollapsed
                            ? styles.activeLinkCollapsed
                            : styles.activeLink
                        : ''
                        }`}>
                        <Link href="/admin/settings" className="nav-link text-white d-flex align-items-center justify-content-start">
                            <FaCog className="me-2" />
                            {!isCollapsed && 'Settings'}
                        </Link>
                    </li>

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