import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <div className="container-fluid bg-primary text-light footer wow fadeIn" data-wow-delay="0.1s">
            <div className="container py-5 px-lg-5">
                <div className="row g-5">
                    <div className="col-md-6 col-lg-3">
                        <p className="section-title text-white h5 mb-4">Address<span></span></p>
                        <p><i className="fa fa-map-marker-alt me-2"></i>
                            <small>House-186(1st Floor), Road-06, Mohammadia Housing Society, Mohammadpur, Dhaka, Bangladesh</small></p>
                        <p><a className='text-white' href="tel:+8801919385680" target="_blank" rel="noopener noreferrer">
                            <i className=" fa fa-phone-alt me-2"></i><small>+8801919385680</small>
                        </a></p>
                        <p><a className="text-white" href="mailto:differentdigitalbd@gmail.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-envelope me-2"></i><small>differentdigitalbd@gmail.com</small></a>
                        </p>
                        <div className="d-flex pt-2">
                            <a className="btn btn-outline-light btn-social" href="" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-outline-light btn-social" href="https://www.facebook.com/differentdigitalmarketing" target="_blank" rel="noopener noreferrer" ><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-outline-light btn-social" href="" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                            <a className="btn btn-outline-light btn-social" href="" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <p className="section-title text-white h5 mb-4">Quick Link<span></span></p>
                        <Link className="btn btn-link" href="/about">About Us</Link>
                        <Link className="btn btn-link" href="/contact">Contact Us</Link>
                        <Link className="btn btn-link" href="/privacy-policy">Privacy Policy</Link>
                        <Link className="btn btn-link" href="/terms-conditions">Terms & Condition</Link>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <p className="section-title text-white h5 mb-4">Gallery<span></span></p>
                        <div className="row g-2">
                            <div className="col-4">
                                <Image className="img-fluid" src="/images/portfolio-1.jpg" alt="Image" width={80} height={80} />
                            </div>
                            <div className="col-4">
                                <Image className="img-fluid" src="/images/portfolio-2.jpg" alt="Image" width={80} height={80} />
                            </div>
                            <div className="col-4">
                                <Image className="img-fluid" src="/images/portfolio-3.jpg" alt="Image" width={80} height={80} />
                            </div>
                            <div className="col-4">
                                <Image className="img-fluid" src="/images/portfolio-4.jpg" alt="Image" width={80} height={80} />
                            </div>
                            <div className="col-4">
                                <Image className="img-fluid" src="/images/portfolio-5.jpg" alt="Image" width={80} height={80} />
                            </div>
                            <div className="col-4">
                                <Image className="img-fluid" src="/images/portfolio-6.jpg" alt="Image" width={80} height={80} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <p className="section-title text-white h5 mb-4">Newsletter<span></span></p>
                        <p>Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit
                            non vulpu</p>
                        <div className="position-relative w-100 mt-3">
                            <input className="form-control border-0 rounded-pill w-100 ps-4 pe-5" type="text"
                                placeholder="Your Email" style={{ height: "48px" }} />
                            <button type="button" className="btn shadow-none position-absolute top-0 end-0 mt-1 me-2"><i
                                className="fa fa-paper-plane text-primary fs-4"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container px-lg-5">
                <div className="copyright">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            &copy; <a className="border-bottom" href="#">Your Site Name</a>, All Right Reserved.

                            Designed By <a className="border-bottom" href="https://kbutsho.vercel.app/">kbutsho</a>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <div className="footer-menu">
                                <a href="">Home</a>
                                <a href="">Cookies</a>
                                <a href="">Help</a>
                                <a href="">FQAs</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;