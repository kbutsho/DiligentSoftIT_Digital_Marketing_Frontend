import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import FactSection from '@/components/FactSection';
import FeatureSection from '@/components/FeatureSection';
import Footer from '@/components/Footer';
import HeaderSection from '@/components/HeaderSection';
import Navbar from '@/components/Navbar';
import NewsletterSection from '@/components/NewsLetterSection';
import ProjectSection from '@/components/ProjectSection';
import ServiceSection from '@/components/ServiceSection';
import TeamSection from '@/components/TeamSection';
import Test from '@/components/Test/Test';
import TestimonialSection from '@/components/TestimonialSection';

const HomePage = () => {
  return (
    <div className='container-xxl bg-white p-0'>
      <div className="container-xxl position-relative p-0">
        <Navbar />
        <HeaderSection />
      </div>
      {/* <FeatureSection /> */}
      <AboutSection />
      <Test />
      <FactSection />
      <ServiceSection />
      <NewsletterSection />
      <ProjectSection />
      <TestimonialSection />
      <TeamSection />
      <ContactSection />
      <Footer />
      <span className="btn btn-lg btn-secondary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </span>
    </div>
  );
};

export default HomePage;