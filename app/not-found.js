import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NotFoundSection from "@/components/NotFoundSection";
import PageHeader from "@/components/PageHeader";

const NotFound = () => {
    return (
        <div className="container-xxl bg-white p-0">
            <div className="container-xxl position-relative p-0">
                <Navbar />
                <PageHeader title="Not Found" />
                <NotFoundSection />
                <Footer />
            </div>
        </div>
    );
};

export default NotFound;