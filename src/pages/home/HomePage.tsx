import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiBriefcase, FiGift, FiBox } from 'react-icons/fi';

// Assuming these components are correctly set up
import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import Button from '@components/ui/Button';

// Assuming your global styles are imported in main.tsx or a similar entry point
// import '@styles/index.css';

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
        }, 3000); // Change placeholder every 3 seconds

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
        // Here you would navigate to your name generation results page
        // For now, let's navigate to a placeholder '/generate' route
        const query = (e.currentTarget.querySelector('input') as HTMLInputElement).value;
        navigate(`/generate?q=${encodeURIComponent(query)}`);
    };

    return (
        <PageWrapper>
            <Header />

            <section className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-white overflow-hidden">
                {/* Subtle animated background elements */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"
                        animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
                        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"
                        animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
                    />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 px-4">
                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.2}
                        className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg"
                    >
                        Welcome to <span className="text-cyan-400">Galaxy NameLab</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.4}
                        className="text-lg md:text-xl text-gray-300 max-w-3xl mb-10"
                    >
                        Instantly generate the perfect name for your business, your children, or your next big idea.
                    </motion.p>

                    {/* Interactive Name Generation Form */}
                    <motion.form
                        onSubmit={handleNameGeneration}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.6}
                        className="w-full max-w-2xl mx-auto flex items-center bg-white/10 border border-white/20 rounded-full shadow-lg backdrop-blur-sm"
                    >
                        <input
                            type="text"
                            placeholder={`e.g., ${placeholder}`}
                            className="w-full bg-transparent text-white text-lg px-6 py-4 placeholder-gray-400 focus:outline-none"
                        />
                        <Button
                            type="submit"
                            className="m-2 px-6 py-3 text-lg font-semibold bg-cyan-500 hover:bg-cyan-600 text-white rounded-full flex items-center transition-all duration-300"
                        >
                            <FiSearch className="mr-2" />
                            Generate
                        </Button>
                    </motion.form>

                    {/* Use Case Categories */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.8}
                        className="mt-16 flex flex-wrap items-center justify-center gap-4 text-gray-300"
                    >
                        <p className="text-lg mr-4">Or try one of our popular categories:</p>
                        <div className="flex flex-wrap gap-4">
                            <CategoryButton icon={<FiBriefcase />} text="Business" onClick={() => navigate('/generate?category=business')} />
                            <CategoryButton icon={<FiGift />} text="Children" onClick={() => navigate('/generate?category=children')} />
                            <CategoryButton icon={<FiBox />} text="Projects" onClick={() => navigate('/generate?category=projects')} />
                        </div>
                    </motion.div>
                </div>
            </section>
        </PageWrapper>
    );
};

// A helper component for the category buttons to keep the main component clean
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