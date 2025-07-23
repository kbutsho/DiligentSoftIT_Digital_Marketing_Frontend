import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewsletterSection from "@/components/NewsLetterSection";
import PageHeader from "@/components/PageHeader";
import ServiceSection from "@/components/ServiceSection";
import TestimonialSection from "@/components/TestimonialSection";
import Link from "next/link";

const ServicePage = () => {
    return (
        <div className="container-xxl bg-white p-0">
            <div className="container-xxl position-relative p-0">
                <Navbar />
                <PageHeader title="Service" />
                <ServiceSection />
                <NewsletterSection />
                <TestimonialSection />
                <Footer />
                <span className="btn btn-lg btn-secondary btn-lg-square back-to-top">
                    <i className="bi bi-arrow-up"></i>
                </span>
            </div>
        </div>
    );
};

export default ServicePage;