import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
            <Link href="/" className="navbar-brand p-0">
                <h1 className="m-0">DGital</h1>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="fa fa-bars"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav mx-auto py-0">
                    <Link href="/" className="nav-item nav-link active">Home</Link>
                    <Link href="/about" className="nav-item nav-link">About</Link>
                    <Link href="/service" className="nav-item nav-link">Service</Link>
                    <Link href="/project" className="nav-item nav-link">Project</Link>
                    <div className="nav-item dropdown">
                        <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</span>
                        <div className="dropdown-menu m-0">
                            <Link href="/" className="dropdown-item">Our Team</Link>
                            <Link href="/" className="dropdown-item">Testimonial</Link>
                            <Link href="/" className="dropdown-item">404 Page</Link>
                        </div>
                    </div>
                    <Link href="/" className="nav-item nav-link">Contact</Link>
                </div>
                <Link href="/" className="btn rounded-pill py-2 px-4 ms-3 d-none d-lg-block">Get Started</Link>
            </div>
        </nav>

    );
};

export default Navbar;