// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiBriefcase, FiGift, FiBox } from 'react-icons/fi';

import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import Button from '@components/ui/Button';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [placeholder, setPlaceholder] = useState("a futuristic tech startup...");
    const placeholders = [
        "a new coffee shop brand...",
        "a fantasy video game character...",
        "a baby girl's middle name...",
        "my new programming project...",
        "a creative YouTube channel...",
    ];

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % placeholders.length;
            setPlaceholder(placeholders[index]);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: (delay = 0) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay, ease: "easeOut" },
        }),
    };

    const handleNameGeneration = (e: React.FormEvent) => {
        e.preventDefault();
        const query = (e.currentTarget.querySelector('input') as HTMLInputElement).value;
        navigate(`/generate?q=${encodeURIComponent(query)}`);
    };

    return (
        <PageWrapper>
            <Header />

            <section className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-primary-700 via-primary-800 to-primary-950 text-white overflow-hidden">
                {/* Background Blobs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500 rounded-full mix-blend-screen blur-3xl opacity-30"
                    animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary rounded-full mix-blend-screen blur-3xl opacity-20"
                    animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
                />

                <div className="relative z-10 px-4">
                    <motion.h1
                        // @ts-ignore
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.2}
                        className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg"
                    >
                        Welcome to <span className="text-primary-200">Galaxy NameLab</span>
                    </motion.h1>

                    <motion.p
                        // @ts-ignore
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.4}
                        className="text-lg md:text-xl text-primary-50 max-w-3xl mb-10"
                    >
                        Instantly generate the perfect name for your business, your children, or your next big idea.
                    </motion.p>

                    <motion.form
                        onSubmit={handleNameGeneration}
                        // @ts-ignore
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.6}
                        className="w-full max-w-2xl mx-auto flex items-center bg-primary-900/40 border border-primary-700 rounded-full shadow-lg backdrop-blur-sm"
                    >
                        <input
                            type="text"
                            placeholder={`e.g., ${placeholder}`}
                            className="w-full bg-transparent text-white text-lg px-6 py-4 placeholder-primary-200 focus:outline-none"
                        />
                        <Button
                            type="submit"
                            className="m-2 px-6 py-3 text-lg font-semibold bg-primary-500 hover:bg-primary-400 text-white rounded-full flex items-center transition-all duration-300"
                        >
                            <FiSearch className="mr-2" />
                            Generate
                        </Button>
                    </motion.form>
                </div>
            </section>

        </PageWrapper>
    );
};

const CategoryButton = ({ icon, text, onClick }: { icon: React.ReactNode, text: string, onClick: () => void }) => (
    <motion.button
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        {icon}
        <span>{text}</span>
    </motion.button>
);

export default HomePage;
