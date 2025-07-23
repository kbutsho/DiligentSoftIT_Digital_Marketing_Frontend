import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className='container-xxl bg-white p-0'>

            <div id="spinner"
                className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                <div className="spinner-grow text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>

            <div className="container-xxl position-relative p-0">
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
                            <Link href="/" className="nav-item nav-link">About</Link>
                            <Link href="/" className="nav-item nav-link">Service</Link>
                            <Link href="/" className="nav-item nav-link">Project</Link>
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

                <div className="container-xxl bg-primary hero-header">
                    <div className="container px-lg-5">
                        <div className="row g-5 align-items-end">
                            <div className="col-lg-6 text-center text-lg-start">
                                <h1 className="text-white mb-4 animated slideInDown">A Digital Agency Of Inteligents & Creative
                                    People</h1>
                                <p className="text-white pb-3 animated slideInDown">Tempor rebum no at dolore lorem clita rebum
                                    rebum ipsum rebum stet dolor sed justo kasd. Ut dolor sed magna dolor sea diam. Sit diam
                                    sit justo amet ipsum vero ipsum clita lorem</p>
                                <a href=""
                                    className="btn btn-secondary py-sm-3 px-sm-5 rounded-pill me-3 animated slideInLeft">Read
                                    More</a>
                                <a href="" className="btn btn-light py-sm-3 px-sm-5 rounded-pill animated slideInRight">Contact
                                    Us</a>
                            </div>
                            <div className="col-lg-6 text-center text-lg-start">
                                <Image className="img-fluid animated zoomIn" src="/images/hero.png" alt="" width={600} height={600} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`

            :root {
    --primary: #6222CC;
    --secondary: #FBA504;
    --light: #F6F4F9;
    --dark: #04000B;
}


/*** Spinner ***/
#spinner {
    opacity: 0;
    visibility: hidden;
    transition: opacity .5s ease-out, visibility 0s linear .5s;
    z-index: 99999;
}

#spinner.show {
    transition: opacity .5s ease-out, visibility 0s linear 0s;
    visibility: visible;
    opacity: 1;
}

.back-to-top {
    position: fixed;
    display: none;
    right: 45px;
    bottom: 45px;
    z-index: 99;
}


/*** Heading ***/
h1,
h2,
.fw-bold {
    font-weight: 700 !important;
}

h3,
h4,
.fw-semi-bold {
    font-weight: 600 !important;
}

h5,
h6,
.fw-medium {
    font-weight: 500 !important;
}


/*** Button ***/
.btn {
    font-weight: 500;
    transition: .5s;
}

.btn:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, .5);
}

.btn-square {
    width: 38px;
    height: 38px;
}

.btn-sm-square {
    width: 32px;
    height: 32px;
}

.btn-lg-square {
    width: 48px;
    height: 48px;
}

.btn-square,
.btn-sm-square,
.btn-lg-square {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: normal;
    border-radius: 50px;
}
                .navbar .dropdown-toggle::after {
    border: none;
    content: "\f067";
    font-family: "Font Awesome 5 Free";
    font-size: 10px;
    font-weight: bold;
    vertical-align: middle;
    margin-left: 8px;
}

.navbar-light .navbar-nav .nav-link {
    position: relative;
    margin-right: 25px;
    padding: 35px 0;
    font-family: 'Jost', sans-serif;
    font-size: 18px;
    font-weight: 500;
    color: var(--light) !important;
    outline: none;
    transition: .5s;
}

.sticky-top.navbar-light .navbar-nav .nav-link {
    padding: 20px 0;
    color: var(--dark) !important;
}

.navbar-light .navbar-nav .nav-link:hover,
.navbar-light .navbar-nav .nav-link.active {
    color: var(--secondary) !important;
}

.navbar-light .navbar-brand h1 {
    color: #FFFFFF;
}

.navbar-light .navbar-brand img {
    max-height: 60px;
    transition: .5s;
}

.sticky-top.navbar-light .navbar-brand img {
    max-height: 45px;
}

@media (max-width: 991.98px) {
    .sticky-top.navbar-light {
        position: relative;
        background: #FFFFFF;
    }

    .navbar-light .navbar-collapse {
        margin-top: 15px;
        border-top: 1px solid #DDDDDD;
    }

    .navbar-light .navbar-nav .nav-link,
    .sticky-top.navbar-light .navbar-nav .nav-link {
        padding: 10px 0;
        margin-left: 0;
        color: var(--dark) !important;
    }

    .navbar-light .navbar-brand h1 {
        color: var(--primary);
    }

    .navbar-light .navbar-brand img {
        max-height: 45px;
    }
}

@media (min-width: 992px) {
    .navbar-light {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        border-bottom: 1px solid rgba(256, 256, 256, .1);
        z-index: 999;
    }
    
    .sticky-top.navbar-light {
        position: fixed;
        background: #FFFFFF;
    }

    .sticky-top.navbar-light .navbar-brand h1 {
        color: var(--primary);
    }

    .navbar-light .navbar-nav .nav-item .dropdown-menu {
        display: block;
        border: none;
        margin-top: 0;
        top: 150%;
        opacity: 0;
        visibility: hidden;
        transition: .5s;
    }

    .navbar-light .navbar-nav .nav-item:hover .dropdown-menu {
        top: 100%;
        visibility: visible;
        transition: .5s;
        opacity: 1;
    }

    .navbar-light .btn {
        color: var(--dark);
        background: #FFFFFF;
    }

    .sticky-top.navbar-light .btn {
        color: var(--dark);
        background: var(--secondary);
    }
    /*** Hero Header ***/
.hero-header {
    margin-bottom: 6rem;
    padding: 18rem 0;
    background:
        url(/images/blob-top-left.png),
        url(/images/blob-top-right.png),
        url(/images/blob-bottom-left.png),
        url(/images/blob-bottom-right.png),
        url(/images/blob-center.png),
        url(/images/bg-bottom.png);
    background-position:
        left 0px top 0px,
        right 0px top 0px,
        left 0px bottom 0px,
        right 0px bottom 0px,
        center center,
        center bottom;
    background-repeat: no-repeat;
}

@media (max-width: 991.98px) {
    .hero-header {
        padding: 6rem 0 9rem 0;
    }
}


/*** Section Title ***/
.section-title {
    position: relative;
    display: flex;
    align-items: center;
    font-weight: 500;
    text-transform: uppercase;
}

.section-title span:first-child,
.section-title span:last-child {
    position: relative;
    display: inline-block;
    margin-right: 30px;
    width: 30px;
    height: 2px;
}

.section-title span:last-child {
    margin-right: 0;
    margin-left: 30px;
}

.section-title span:first-child::after,
.section-title span:last-child::after {
    position: absolute;
    content: "";
    width: 15px;
    height: 2px;
    top: 0;
    right: -20px;
}

.section-title span:last-child::after {
    right: auto;
    left: -20px;
}

.section-title.text-primary span:first-child,
.section-title.text-primary span:last-child,
.section-title.text-primary span:first-child::after,
.section-title.text-primary span:last-child::after {
    background: var(--primary);
}

.section-title.text-secondary span:first-child,
.section-title.text-secondary span:last-child,
.section-title.text-secondary span:first-child::after,
.section-title.text-secondary span:last-child::after {
    background: var(--secondary);
}

.section-title.text-white span:first-child,
.section-title.text-white span:last-child,
.section-title.text-white span:first-child::after,
.section-title.text-white span:last-child::after {
    background: #FFFFFF;
}
}
      `}</style>
        </div>

    );
};

export default Navbar;