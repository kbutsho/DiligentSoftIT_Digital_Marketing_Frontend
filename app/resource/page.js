import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import TestimonialSection from '@/components/TestimonialSection';
import React from 'react';

const ResourcePage = () => {
    return (
        <div>
            <Navbar />
            <PageHeader title="Resource" />
            <TestimonialSection />
            <Footer />
        </div>
    );
};

export default ResourcePage;