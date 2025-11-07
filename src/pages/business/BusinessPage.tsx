// src/pages/business/BusinessPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiMapPin } from 'react-icons/fi';

import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: "easeOut" as const },
    }),
};

const businesses = [
    {
        name: "Ya Kun Kaya Toast",
        type: "Local Business",
        location: "Singapore",
        description: "Iconic Singaporean breakfast chain serving traditional kaya toast, soft-boiled eggs, and kopi since 1944.",
        website: "https://yakun.com",
        color: "from-amber-600 to-orange-700"
    },
    {
        name: "BreadTalk",
        type: "Local Business",
        location: "Singapore",
        description: "Award-winning bakery chain that revolutionized bread-making with creative, Asian-inspired pastries.",
        website: "https://breadtalk.com",
        color: "from-rose-600 to-pink-700"
    },
    {
        name: "Apple Inc.",
        type: "World Business",
        location: "Global",
        description: "Technology giant known for iPhone, Mac, and innovative consumer electronics that changed the world.",
        website: "https://apple.com",
        color: "from-slate-600 to-gray-800"
    },
    {
        name: "Tesla",
        type: "World Business",
        location: "Global",
        description: "Revolutionary electric vehicle and clean energy company accelerating sustainable transportation.",
        website: "https://tesla.com",
        color: "from-red-600 to-red-800"
    },
    {
        name: "Amazon",
        type: "World Business",
        location: "Global",
        description: "E-commerce and cloud computing giant that transformed online shopping and digital services.",
        website: "https://amazon.com",
        color: "from-orange-600 to-yellow-700"
    },
    {
        name: "Microsoft",
        type: "World Business",
        location: "Global",
        description: "Software and technology corporation leading in operating systems, cloud services, and productivity tools.",
        website: "https://microsoft.com",
        color: "from-blue-600 to-cyan-700"
    },
    {
        name: "Google",
        type: "World Business",
        location: "Global",
        description: "Technology company specializing in Internet services, search engines, and digital advertising.",
        website: "https://google.com",
        color: "from-green-600 to-emerald-700"
    },
    {
        name: "Meta",
        type: "World Business",
        location: "Global",
        description: "Social media and technology company building the future of social connection and metaverse.",
        website: "https://meta.com",
        color: "from-purple-600 to-indigo-700"
    }
];

interface BusinessPageProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

const BusinessPage: React.FC<BusinessPageProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />

            <section className="relative w-full min-h-screen flex flex-col items-center justify-start text-center bg-gradient-to-b from-primary-700 via-primary-800 to-primary-950 text-white overflow-hidden px-4 py-12">
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

                {/* Page Title */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.1}
                    className="w-full max-w-5xl mb-12 mt-10 bg-primary-900/30 backdrop-blur-md rounded-3xl p-8 border border-primary-600/30"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-primary-100">
                        Famous Businesses
                    </h1>
                    <p className="text-lg text-primary-200 leading-relaxed">
                        Discover inspiring businesses that have made their mark on the world.
                        From local Singaporean gems to global tech giants, these companies showcase
                        the power of great branding and vision.
                    </p>
                </motion.div>

                {/* Business Grid */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.3}
                    className="w-full max-w-7xl mb-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {businesses.map((business, index) => (
                            <motion.div
                                key={index}
                                className="perspective-1000"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                custom={0.5 + index * 0.1}
                            >
                                <div className="relative w-full h-80 group cursor-pointer preserve-3d">
                                    {/* Front of card */}
                                    <motion.div
                                        className={`absolute inset-0 backface-hidden bg-gradient-to-br ${business.color} rounded-2xl p-6 flex flex-col justify-between shadow-2xl border border-white/10`}
                                        whileHover={{ rotateY: 180 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <div>
                                            <div className="text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">
                                                {business.type}
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-3">
                                                {business.name}
                                            </h3>
                                            <div className="w-12 h-1 bg-white/50 mb-4"></div>
                                            <p className="text-white/90 text-sm leading-relaxed">
                                                {business.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 text-xs text-white/60">
                                                <FiMapPin className="w-3 h-3" />
                                                <span>{business.location}</span>
                                            </div>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                                className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Back of card */}
                                    <motion.div
                                        className={`absolute inset-0 backface-hidden bg-gradient-to-tl ${business.color} rounded-2xl p-6 flex flex-col items-center justify-center shadow-2xl border border-white/10`}
                                        initial={{ rotateY: -180 }}
                                        whileHover={{ rotateY: 0 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <div className="text-center">
                                            <h4 className="text-xl font-bold text-white mb-6">Visit Website</h4>
                                            <a
                                                href={business.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors duration-300 shadow-lg"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <FiExternalLink className="w-4 h-4" />
                                                {business.website.replace('https://', '')}
                                            </a>
                                            <p className="mt-6 text-white/80 text-sm">
                                                Click to explore more
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Additional Info Section */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={1.5}
                    className="w-full max-w-5xl mb-12 bg-primary-900/30 backdrop-blur-md rounded-3xl p-8 border border-primary-600/30"
                >
                    <h2 className="text-3xl font-bold text-primary-100 mb-4">
                        Business Naming Inspiration
                    </h2>
                    <p className="text-primary-200 leading-relaxed mb-6">
                        Great business names often have a story behind them. Whether it's a personal name,
                        a descriptive term, or a completely invented word, the most memorable names resonate
                        with customers and reflect the company's values and mission.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="bg-primary-800/40 rounded-2xl p-6 border border-primary-600/30">
                            <h3 className="text-xl font-bold text-primary-100 mb-3">🎯 Local Businesses</h3>
                            <p className="text-primary-200">
                                Local businesses like Ya Kun and BreadTalk show how cultural heritage and
                                authenticity can create powerful brand identities that resonate with communities.
                            </p>
                        </div>
                        <div className="bg-primary-800/40 rounded-2xl p-6 border border-primary-600/30">
                            <h3 className="text-xl font-bold text-primary-100 mb-3">🌍 Global Giants</h3>
                            <p className="text-primary-200">
                                Global corporations demonstrate how simple, memorable names can become
                                household brands when backed by innovation, quality, and consistent vision.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>
        </PageWrapper>
    );
};

export default BusinessPage;