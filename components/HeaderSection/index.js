import Image from 'next/image';
import Link from 'next/link';

const HeaderSection = () => {
    return (
        <div className="container-xxl bg-primary hero-header">
            <div className="container px-lg-5">
                <div className="row g-5 align-items-end">
                    <div className="col-lg-6 text-center text-lg-start">
                        <h1 className="text-white mb-4 animated slideInDown">A Digital Agency Of Inteligents & Creative
                            People</h1>
                        <p className="text-white pb-3 animated slideInDown">Tempor rebum no at dolore lorem clita rebum
                            rebum ipsum rebum stet dolor sed justo kasd. Ut dolor sed magna dolor sea diam. Sit diam
                            sit justo amet ipsum vero ipsum clita lorem</p>
                        <Link href="/about"
                            className="btn btn-secondary py-sm-3 px-sm-5 rounded-pill me-3 animated slideInLeft">Read
                            More</Link>
                        <Link href="/contact" className="btn btn-light py-sm-3 px-sm-5 rounded-pill animated slideInRight">Contact
                            Us</Link>
                    </div>
                    <div className="col-lg-6 text-center text-lg-start">
                        <Image className="img-fluid animated zoomIn" src="/images/hero.png" alt="" width={600} height={600} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderSection;