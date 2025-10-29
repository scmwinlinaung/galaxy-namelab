import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import Button from '@components/ui/Button';
import '@styles/index.css';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (delay = 0) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay },
        }),
    };

    return (
        <PageWrapper>
            <Header />

            <section className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-rose-100 via-white to-blue-50 overflow-hidden">
                {/* Floating soft background shapes */}
                <motion.div
                    className="absolute top-20 left-1/4 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                    animate={{ y: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 8 }}
                />
                <motion.div
                    className="absolute bottom-20 right-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 10 }}
                />

                {/* Hero Content */}
                <motion.h1
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.2}
                    className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4"
                >
                    Discover the Meaning Behind Every Name
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.6}
                    className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8"
                >
                    Explore origins, meanings, and stories that make each name truly unique.
                </motion.p>

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                >
                    <Button
                        onClick={() => navigate('/explore')}
                        className="px-10 py-4 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
                    >
                        Start Exploring
                    </Button>
                </motion.div>
            </section>
        </PageWrapper>
    );
};

export default HomePage;
