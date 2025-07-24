import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";

const PrivacyPolicyPage = () => {
    return (
        <div className="container-xxl bg-white p-0">
            <div className="container-xxl position-relative p-0">
                <Navbar />
                <PageHeader title="Privacy Policy" />
                <Footer />
                <span className="btn btn-lg btn-secondary btn-lg-square back-to-top">
                    <i className="bi bi-arrow-up"></i>
                </span>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;