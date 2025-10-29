import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import your consistent components
import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import Button from '@components/ui/Button'; // Assuming you have this from the home page

const AboutPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <PageWrapper>
            {/* Use the new, consistent header */}
            <Header />

            {/* Main Section with a professional background and layout */}
            <main className="min-h-screen w-full bg-gray-900 text-white flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-40"></div> {/* Optional overlay */}

                <motion.div
                    className="relative z-10 container mx-auto px-6 py-24 max-w-3xl text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Page Title */}
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-cyan-400 drop-shadow-lg">
                        About Us
                    </h1>

                    {/* Introductory Paragraph */}
                    <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
                        Welcome to <strong>MyApp</strong>! We are dedicated to providing solutions that empower your dreams, from securing your family's future with financial planning to achieving your goals with smart investments.
                    </p>

                    {/* Mission Statement */}
                    <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed">
                        Our mission is to help you build a stable and prosperous life through innovative services and personalized support. Discover how we can help you protect what matters most.
                    </p>

                    {/* Call to Action Button */}
                    <Button
                        onClick={() => navigate('/contact')} // Assuming you might add a contact page later
                        className="px-8 py-3 text-lg font-semibold bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                        Contact Us
                    </Button>
                </motion.div>
            </main>
        </PageWrapper>
    );
};

export default AboutPage;