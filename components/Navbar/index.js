"use client"

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/service', label: 'Service' },
        { href: '/project', label: 'Project' },
        { href: '/resource', label: 'Resource' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contact' },
    ];
    return (
        <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
            <Link href="/" className="navbar-brand p-0">
                <Image src="/images/logo.png" alt="logo" width={160} height={50} />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="fa fa-bars"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav mx-auto py-0">
                    {navLinks.map(({ href, label }) => (
                        <Link key={href} href={href} className={`nav-item nav-link ${pathname === href ? 'active' : ''}`}>
                            {label}
                        </Link>
                    ))}
                </div>
                <a href="https://wa.me/8801919385680"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn rounded-pill py-2 px-4 ms-3 d-none d-lg-block">
                    Get Started
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
