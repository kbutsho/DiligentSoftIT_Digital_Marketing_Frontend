import AboutSection from "@/components/AboutSection";
import FactSection from "@/components/FactSection";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import TeamSection from "@/components/TeamSection";
import Link from "next/link";

const AboutPage = () => {
    return (
        <div className="container-xxl bg-white p-0">
            <div className="container-xxl position-relative p-0">
                <Navbar />
                <PageHeader title="About" />
                <FeatureSection />
                <AboutSection />
                <FactSection />
                <TeamSection />
                <Footer />
                <span className="btn btn-lg btn-secondary btn-lg-square back-to-top">
                    <i className="bi bi-arrow-up"></i>
                </span>
            </div>
        </div>
    );
};

export default AboutPage;