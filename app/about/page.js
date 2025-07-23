import AboutSection from "@/components/AboutSection";
import FactSection from "@/components/FactSection";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TeamSection from "@/components/TeamSection";
import Link from "next/link";

const AboutPage = () => {
    return (
        <div className="container-xxl bg-white p-0">
            <div className="container-xxl position-relative p-0">
                <Navbar />
                <div className="container-xxl py-5 bg-primary hero-header">
                    <div className="container my-5 py-5 px-lg-5">
                        <div className="row g-5 py-5">
                            <div className="col-12 text-center">
                                <h1 className="text-white animated slideInDown">About Us</h1>
                                <hr className="bg-white mx-auto mt-0" style={{ width: "90px" }} />
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center">
                                        <li className="breadcrumb-item"><Link className="text-white" href="/">Home</Link></li>
                                        <li className="breadcrumb-item text-white active" aria-current="page">About</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <FeatureSection />
                <AboutSection />
                <FactSection />
                <TeamSection />
                <Footer />
            </div>
        </div>
    );
};

export default AboutPage;