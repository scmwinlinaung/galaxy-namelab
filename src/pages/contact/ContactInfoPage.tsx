import React from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import { FiStar, FiUsers, FiTrendingUp, FiAward, FiClock } from 'react-icons/fi';

interface ContactInfoPageProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

const ContactInfoPage: React.FC<ContactInfoPageProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
            <main className="min-h-screen w-full bg-primary-950 text-primary-50">
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-primary-900/70"></div>

                <motion.div
                    className="relative z-10 container mx-auto px-6 py-24"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Page Title */}
                    {/* @ts-ignore */}
                    <motion.div className="text-center mb-16" variants={itemVariants}>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-primary-50 mb-4 drop-shadow-lg">
                            The <span className="text-primary-300">Legacy</span>. The <span className="text-primary-300">Science</span>. The <span className="text-primary-300">Result</span>.
                        </h1>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-200 mb-4">About Galaxy NameLab</h2>
                    </motion.div>

                    {/* The Architect Section */}
                    {/* @ts-ignore */}
                    <motion.div className="max-w-4xl mx-auto mb-20" variants={itemVariants}>
                        <div className="bg-primary-900/50 border border-primary-800 p-8 rounded-3xl">
                            <h3 className="text-2xl font-bold text-primary-50 mb-4">The Architect Behind the System</h3>
                            <p className="text-primary-100 leading-relaxed mb-4">
                                Galaxy NameLab is led by a Master Astrologer and Scholar with over <span className="text-primary-300 font-bold">46 years of esoteric experience</span>. He is a published author of authoritative texts on astrological naming sciences and has dedicated nearly half a century to decoding the relationship between cosmic vibrations and human success.
                            </p>
                            <p className="text-primary-100 leading-relaxed">
                                Founded in <span className="text-primary-300 font-bold">1998</span>, Galaxy NameLab has stood the test of time for <span className="text-primary-300 font-bold">27 years</span>. We are not a new startup experimenting with trends; we are a deeply established institution with a massive empirical dataset.
                            </p>
                        </div>
                    </motion.div>

                    {/* Impact Numbers */}
                    {/* @ts-ignore */}
                    <motion.div className="mb-20" variants={itemVariants}>
                        <h3 className="text-3xl font-bold text-primary-50 text-center mb-12">Our Impact by the Numbers</h3>
                        <p className="text-primary-100 text-center mb-12 max-w-3xl mx-auto text-lg">
                            Over nearly three decades, we have engineered the destiny of:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {/* @ts-ignore */}
                            <motion.div className="bg-primary-900/50 border border-primary-800 p-8 rounded-2xl text-center" variants={itemVariants}>
                                <FiUsers className="text-5xl text-primary-300 mx-auto mb-4" />
                                <h4 className="text-4xl font-bold text-primary-50 mb-2">300,000+</h4>
                                <p className="text-primary-200">Individuals: Helping people align with their true purpose</p>
                            </motion.div>
                            {/* @ts-ignore */}
                            <motion.div className="bg-primary-900/50 border border-primary-800 p-8 rounded-2xl text-center" variants={itemVariants}>
                                <FiTrendingUp className="text-5xl text-primary-300 mx-auto mb-4" />
                                <h4 className="text-4xl font-bold text-primary-50 mb-2">7,000+</h4>
                                <p className="text-primary-200">Businesses: Ranging from SMEs to large corporations</p>
                            </motion.div>
                            {/* @ts-ignore */}
                            <motion.div className="bg-primary-900/50 border border-primary-800 p-8 rounded-2xl text-center" variants={itemVariants}>
                                <FiAward className="text-5xl text-primary-300 mx-auto mb-4" />
                                <h4 className="text-4xl font-bold text-primary-50 mb-2">307,000+</h4>
                                <p className="text-primary-200">Total Impact: Names crafted and delivered</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Success Rate Section */}
                    {/* @ts-ignore */}
                    <motion.div className="mb-20" variants={itemVariants}>
                        <h3 className="text-3xl font-bold text-primary-50 text-center mb-12">The Success Rate: Radical Honesty</h3>
                        <div className="max-w-4xl mx-auto bg-primary-900/50 border border-primary-800 p-8 rounded-3xl">
                            <p className="text-primary-100 leading-relaxed mb-6">
                                We believe in transparency. Based on our <span className="text-primary-300 font-bold">27 years of data</span>, businesses utilizing our <span className="text-primary-300 font-bold">Stellar Fortune Names</span> show a remarkable success rate:
                            </p>
                            <div className="text-center mb-8">
                                <div className="inline-block">
                                    <h4 className="text-5xl font-bold text-primary-300 mb-2">80%</h4>
                                    <p className="text-primary-200 text-lg">Success Rate: Approximately 8 out of 10 businesses achieve stability and profit</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <h4 className="text-2xl font-bold text-primary-300 mb-2">The "Wildly Successful" Tier</h4>
                                <p className="text-primary-200">Out of those, about <span className="text-primary-300 font-bold">30%</span> achieve explosive, market-dominating success.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Why Others Fail Section */}
                    {/* @ts-ignore */}
                    <motion.div className="mb-20" variants={itemVariants}>
                        <div className="max-w-4xl mx-auto bg-red-900/20 border border-red-800 p-8 rounded-3xl">
                            <h3 className="text-2xl font-bold text-primary-50 mb-4">Why do the other 20% fail?</h3>
                            <p className="text-primary-100 leading-relaxed mb-4">
                                Even a powerful name cannot override two critical errors:
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-lg font-semibold">1</span>
                                    <div>
                                        <h4 className="text-primary-300 font-bold mb-1">Karmic Mismatch</h4>
                                        <p className="text-primary-200">Engaging in a business industry that fundamentally contradicts the owner's birth chart.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-lg font-semibold">2</span>
                                    <div>
                                        <h4 className="text-primary-300 font-bold mb-1">Wrong Timing</h4>
                                        <p className="text-primary-200">Launching the business during a "prohibited astrological period" of the owner's life.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-primary-800/50 rounded-xl border border-primary-700">
                                <p className="text-primary-100 italic">
                                    <span className="text-primary-300 font-bold">Note:</span> If these two negative factors are present, even a Stellar Fortune Name has limits. We advise checking these factors before branding.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Methodology Section */}
                    {/* @ts-ignore */}
                    <motion.div className="mb-20" variants={itemVariants}>
                        <h3 className="text-3xl font-bold text-primary-50 text-center mb-12">About Our Methodology: The "Hidden Code"</h3>
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-primary-900/50 border border-primary-800 p-8 rounded-3xl mb-8">
                                <h4 className="text-xl font-bold text-primary-300 mb-4">The Stellar Fortune Naming System</h4>
                                <p className="text-primary-100 leading-relaxed">
                                    The Stellar Fortune Naming System is a <span className="text-primary-300 font-bold">proprietary methodology unique to Galaxy NameLab</span>.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {/* @ts-ignore */}
                                <motion.div className="bg-red-900/20 border border-red-800 p-6 rounded-2xl" variants={itemVariants}>
                                    <h4 className="text-lg font-bold text-red-300 mb-3">What It Is NOT:</h4>
                                    <ul className="text-primary-200 space-y-2">
                                        <li>• It is NOT Numerology</li>
                                        <li>• It is NOT Western Tropical Astrology</li>
                                        <li>• It is NOT standard Eastern Sidereal Astrology</li>
                                    </ul>
                                </motion.div>
                                {/* @ts-ignore */}
                                <motion.div className="bg-green-900/20 border border-green-800 p-6 rounded-2xl" variants={itemVariants}>
                                    <h4 className="text-lg font-bold text-green-300 mb-3">What It Is:</h4>
                                    <p className="text-primary-200 leading-relaxed">
                                        It is an advanced evolution of a guarded esoteric tradition from a specific lineage of Eastern Wisdom. We have upgraded this ancient secret to match the modern commercial world.
                                    </p>
                                </motion.div>
                            </div>

                            <div className="bg-primary-900/50 border border-primary-800 p-8 rounded-3xl">
                                <h4 className="text-xl font-bold text-primary-300 mb-4">The Core Algorithm:</h4>
                                <p className="text-primary-100 leading-relaxed mb-4">
                                    We calculate the <span className="text-primary-300 font-bold">"Sextile Alignment"</span> between the <span className="text-primary-300 font-bold">3rd House</span> (Effort/Enterprise) and the <span className="text-primary-300 font-bold">11th House</span> (Gains/Fulfillment). We construct names using only the alphabets commanded by the stars in these specific geometric positions.
                                </p>
                                <p className="text-primary-100 leading-relaxed">
                                    This method has been reverse-engineered and verified against hundreds of global billionaires, showing a <span className="text-primary-300 font-bold">90% accuracy match</span> with their success patterns.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Critical Requirement */}
                    {/* @ts-ignore */}
                    <motion.div className="mb-20" variants={itemVariants}>
                        <div className="max-w-4xl mx-auto bg-yellow-900/20 border border-yellow-800 p-8 rounded-3xl">
                            <h3 className="text-2xl font-bold text-primary-50 mb-4 flex items-center">
                                <FiClock className="text-yellow-300 mr-3" />
                                A Critical Requirement
                            </h3>
                            <p className="text-primary-100 leading-relaxed">
                                Because this system relies on precise planetary geometry, we require your <span className="text-yellow-300 font-bold">EXACT Birth Time (Hour and Minute)</span>. Without the birth time, the Stellar Fortune calculation is mathematically impossible.
                            </p>
                        </div>
                    </motion.div>

                    {/* Galaxy NameLab Footer */}
                    {/* @ts-ignore */}
                    <motion.div className="text-center" variants={itemVariants}>
                        <div className="inline-flex items-center space-x-2">
                            <FiStar className="text-3xl text-primary-300" />
                            <h2 className="text-4xl font-bold text-primary-50">Galaxy NameLab</h2>
                            <FiStar className="text-3xl text-primary-300" />
                        </div>
                    </motion.div>

                </motion.div>
            </main>
        </PageWrapper>
    );
};

export default ContactInfoPage;
