// src/pages/home/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    FiArrowRight, 
    FiStar, 
    FiCheckCircle, 
    FiXCircle, 
    FiTrendingUp, 
    FiUsers, 
    FiAward, 
    FiCheck, 
    FiPlus, 
    FiActivity 
} from 'react-icons/fi';

import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import Section from '@components/ui/Section';
import { ANIMATION } from '../../constants';
import { VisitorService } from '@api/index';

// Module-level variable to guarantee the API is only called once per page load
let hasRecordedVisit = false;

interface HomePageProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

// Mini portfolio items for track record section
const featuredLogos = [
    { fileName: '1.Gems&Jewelry.jpg', title: 'She Shines' },
    { fileName: '2.Lottery Agent.jpg', title: 'Sky Moon' },
    { fileName: '3.Gems&Jewellery2.jpg', title: 'Her Precious' },
    { fileName: '4.Mini Mart3.png', title: 'Trust Royal' },
    { fileName: '6.Real Estate.png', title: 'Iron Gate' },
    { fileName: '9.Computer Training.png', title: 'Tech Nova' },
    { fileName: '8.Pre School2.jpg', title: 'Future Top' },
    { fileName: '10.Audit Firm2.png', title: 'Precision Partners' },
];

const HomePage: React.FC<HomePageProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    const [visitorCount, setVisitorCount] = useState<number | null>(null);

    useEffect(() => {
        if (!hasRecordedVisit) {
            hasRecordedVisit = true;
            VisitorService.recordVisit();
        }

        const fetchCount = async () => {
            const response = await VisitorService.getVisitorCount();
            if (response.success && response.data !== undefined) {
                setVisitorCount(response.data);
            }
        };

        fetchCount();
        const interval = setInterval(fetchCount, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />

            {/* SECTION 1: HERO (The Cosmic Hook) */}
            <section className="relative bg-gradient-to-br from-indigo-950 via-primary-950 to-purple-950 text-white pt-40 pb-24 px-6 md:px-12 overflow-hidden">
                {/* Space background elements */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 pointer-events-none" />

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-xs font-semibold uppercase tracking-widest mb-6 font-body"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <FiActivity className="animate-pulse" />
                        <span>Galaxy NameLab — Cosmic Naming Science™</span>
                    </motion.div>

                    <motion.h1
                        className="text-3xl md:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight max-w-5xl mx-auto font-display drop-shadow-2xl"
                        variants={ANIMATION.VARIANTS.FADE_UP}
                        initial="hidden"
                        animate="visible"
                    >
                        Your Name Must Match <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-purple-300 to-amber-300">
                            Your Birth Geometry.
                        </span>
                    </motion.h1>

                    <motion.h2
                        className="text-xl md:text-2xl lg:text-3xl font-bold mb-10 text-primary-200 max-w-3xl mx-auto font-display"
                        variants={ANIMATION.VARIANTS.FADE_UP}
                        initial="hidden"
                        animate="visible"
                        custom={0.1}
                    >
                        The Wrong Name Is Costing You More Than You Think.
                    </motion.h2>
                    
                    <motion.p
                        className="text-base md:text-lg lg:text-xl mb-12 text-primary-100 max-w-4xl mx-auto leading-relaxed font-body font-light"
                        variants={ANIMATION.VARIANTS.FADE_UP}
                        initial="hidden"
                        animate="visible"
                        custom={0.2}
                    >
                        Every person is born under unique planetary geometries, including a <span className="font-bold text-amber-300">60° Sextile</span> that shapes your natural flow, opportunities, and momentum. Your name must match that frequency. When it does, everything shifts.
                    </motion.p>

                    {/* Match & Clash Interactive Dashboard Panel */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12 bg-primary-900/30 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-primary-800 shadow-2xl relative overflow-hidden"
                        variants={ANIMATION.VARIANTS.FADE_UP}
                        initial="hidden"
                        animate="visible"
                        custom={0.3}
                    >
                        {/* Name Matched Panel */}
                        <div className="bg-emerald-950/10 border border-emerald-500/20 rounded-2xl p-6 text-left space-y-4">
                            <span className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider font-body">
                                Name Matched
                            </span>
                            <div className="grid grid-cols-2 gap-3 text-emerald-100 font-display font-bold text-base md:text-lg">
                                <div className="flex items-center gap-2">
                                    <FiCheckCircle className="text-emerald-400 flex-shrink-0" />
                                    <span>Clarity</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiCheckCircle className="text-emerald-400 flex-shrink-0" />
                                    <span>Confidence</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiCheckCircle className="text-emerald-400 flex-shrink-0" />
                                    <span>Momentum</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiCheckCircle className="text-emerald-400 flex-shrink-0" />
                                    <span>Recognition</span>
                                </div>
                            </div>
                        </div>

                        {/* Name Clashes Panel */}
                        <div className="bg-rose-950/10 border border-rose-500/20 rounded-2xl p-6 text-left space-y-4">
                            <span className="inline-block bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider font-body">
                                Name Clashes
                            </span>
                            <div className="grid grid-cols-2 gap-3 text-rose-100 font-display font-bold text-base md:text-lg">
                                <div className="flex items-center gap-2">
                                    <FiXCircle className="text-rose-400 flex-shrink-0" />
                                    <span>Friction</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiXCircle className="text-rose-400 flex-shrink-0" />
                                    <span>Confusion</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiXCircle className="text-rose-400 flex-shrink-0" />
                                    <span>Setbacks</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiXCircle className="text-rose-400 flex-shrink-0" />
                                    <span>Stagnation</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        variants={ANIMATION.VARIANTS.FADE_UP}
                        initial="hidden"
                        animate="visible"
                        custom={0.4}
                        className="space-y-4"
                    >
                        <Link 
                            to="/pricing" 
                            className="inline-flex items-center justify-center bg-gradient-to-r from-amber-400 to-orange-500 text-primary-950 font-extrabold text-lg py-4 px-10 rounded-full hover:from-amber-300 hover:to-orange-400 transition-all duration-300 shadow-xl shadow-amber-500/10 hover:shadow-amber-500/30 transform hover:-translate-y-1 font-body"
                        >
                            Begin Alignment Scan <FiArrowRight className="ml-2 font-extrabold" />
                        </Link>
                        <p className="text-xs text-primary-300 tracking-wider font-body block opacity-80">
                            Limited sessions per month — serious inquiries only.
                        </p>
                    </motion.div>
                </div>
            </section>


            {/* SECTION 2: WHY ALIGNMENT MATTERS (Dual Destinies) */}
            <Section variant="light" py="py-24" className="bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        variants={ANIMATION.VARIANTS.FADE_UP}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <span className="text-primary-600 text-xs font-bold tracking-widest uppercase mb-3 block font-body">Why Alignment Matters</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight font-display">
                            Two people. Same name. <br />
                            <span className="text-primary-600">Two completely different destinies.</span>
                        </h2>
                        <div className="w-24 h-1 bg-primary-500 mx-auto mb-8"></div>
                        <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-body font-light">
                            Why does one "Jack" build an empire while another "Jack" struggles for decades? It isn't luck. A name carries a frequency — and that frequency must align with the geometry your birth chart encodes. This is the foundation of <span className="font-semibold text-primary-900">Cosmic Naming Science™</span>.
                        </p>
                    </motion.div>

                    {/* Aligned vs Misaligned Contrast Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Aligned Card */}
                        <motion.div
                            className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 shadow-lg relative overflow-hidden group hover:border-emerald-400 transition-colors"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                            <h3 className="text-lg md:text-xl font-extrabold text-emerald-900 mb-6 flex items-center gap-3 font-display">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                    <FiCheck />
                                </div>
                                <span>Name + Geometry Aligned</span>
                            </h3>
                            <ul className="space-y-4 text-emerald-850 font-body font-medium text-sm md:text-base">
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <span>Life opens naturally</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <span>Doors appear before you knock</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <span>People trust you instinctively</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <span>Momentum builds without force</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Misaligned Card */}
                        <motion.div
                            className="bg-rose-50 border border-rose-200 rounded-3xl p-8 shadow-lg relative overflow-hidden group hover:border-rose-400 transition-colors"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
                            <h3 className="text-lg md:text-xl font-extrabold text-rose-900 mb-6 flex items-center gap-3 font-display">
                                <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-600">
                                    <FiPlus className="rotate-45" />
                                </div>
                                <span>Name + Geometry Misaligned</span>
                            </h3>
                            <ul className="space-y-4 text-rose-850 font-body font-medium text-sm md:text-base">
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                    <span>Life resists at every turn</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                    <span>Opportunities arrive then vanish</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                    <span>Effort multiplies, results don't</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                    <span>Recurring patterns of stagnation</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </Section>


            {/* SECTION 3: THE BLUEPRINT (What You Receive) */}
            <Section variant="dark" py="py-24" className="bg-primary-950">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary-300 text-xs font-bold tracking-widest uppercase mb-3 block font-body">What you receive</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white font-display">Your Name Alignment Blueprint</h2>
                        <div className="w-24 h-1 bg-primary-400 mx-auto mb-8"></div>
                        <p className="text-base md:text-lg lg:text-xl text-primary-200 max-w-3xl mx-auto leading-relaxed font-body font-light">
                            Before you choose a name — know exactly what your name must do. No guessing. No trial and error with your identity.
                        </p>
                    </motion.div>

                    {/* 8 Value Pillars Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            "Your birth geometry frequency",
                            "Your current name frequency",
                            "Whether they match or clash",
                            "Personal or business name direction",
                            "The frequency your new name must carry",
                            "Soft, strong, neutral, or radiant — the right tone",
                            "Masculine, feminine, or balanced energy",
                            "The identity role your name must support"
                        ].map((pillar, index) => (
                            <motion.div
                                key={index}
                                className="bg-primary-900/20 border border-primary-800/60 rounded-2xl p-6 flex flex-col justify-between hover:border-primary-500 transition-colors shadow-xl"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <div className="text-primary-300 font-extrabold text-2xl mb-4 font-display">0{index + 1}</div>
                                <p className="text-white text-base font-bold font-display leading-snug">
                                    {pillar}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>


            {/* SECTION 4: WHO THIS IS FOR (A Selection Protocol) */}
            <Section variant="light" py="py-24" className="bg-white">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary-600 text-xs font-bold tracking-widest uppercase mb-3 block font-body">Who this is for</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 font-display">We work only with people who are ready.</h2>
                        <div className="w-24 h-1 bg-primary-500 mx-auto mb-8"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                        {/* Ready list */}
                        <div className="space-y-6">
                            <h3 className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-wider font-body mb-4">You are ready if...</h3>
                            <ul className="space-y-4">
                                {[
                                    "You're launching a business or brand",
                                    "You need a new personal name",
                                    "You feel misaligned with your current name",
                                    "You want clarity before committing to a name",
                                    "You want power, flow, and recognition built in"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-700 font-body text-sm md:text-base">
                                        <FiCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Not ready list */}
                        <div className="space-y-6 bg-slate-50 border border-gray-100 rounded-3xl p-8">
                            <h3 className="text-base md:text-lg font-bold text-gray-500 uppercase tracking-wider font-body mb-4">This is not for you if…</h3>
                            <ul className="space-y-4">
                                {[
                                    "You don’t believe in the connection between name and destiny",
                                    "You're just exploring out of curiosity",
                                    "You don't need a name right now"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-500 font-body text-sm md:text-base">
                                        <FiXCircle className="text-rose-400 mt-1 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Section>


            {/* SECTION 5: TRACK RECORD & VISUAL PROOF */}
            <Section variant="dark" py="py-24" className="bg-primary-950 border-t border-b border-primary-900/60 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-900/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary-300 text-xs font-bold tracking-widest uppercase mb-3 block font-body">Track record</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white font-display">28 years. 7,000+ names. Results that speak.</h2>
                        <div className="w-24 h-1 bg-primary-400 mx-auto mb-8"></div>
                    </motion.div>

                    {/* Stats Dashboard */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16 text-center">
                        <div className="bg-primary-900/30 border border-primary-800/40 rounded-3xl p-8 backdrop-blur-sm">
                            <div className="text-5xl lg:text-6xl font-black text-primary-300 mb-2 font-display">28</div>
                            <p className="text-primary-100 text-base font-medium font-body">Years of practice</p>
                        </div>
                        <div className="bg-primary-900/30 border border-primary-800/40 rounded-3xl p-8 backdrop-blur-sm">
                            <div className="text-5xl lg:text-6xl font-black text-primary-300 mb-2 font-display">7,000+</div>
                            <p className="text-primary-100 text-base font-medium font-body">Names created</p>
                        </div>
                        <div className="bg-primary-900/30 border border-primary-800/40 rounded-3xl p-8 backdrop-blur-sm">
                            <div className="text-5xl lg:text-6xl font-black text-primary-300 mb-2 font-display">50</div>
                            <p className="text-primary-100 text-base font-medium font-body">Case studies, Multi-industry</p>
                        </div>
                    </div>

                    {/* Visual Proof Logo Tiles Grid (Placement Guide - Final Decision Requirement!) */}
                    <div className="space-y-8">
                        <h3 className="text-lg md:text-xl font-extrabold text-white text-center font-display mb-6">
                            A selection of our professionally aligned logos:
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 max-w-6xl mx-auto">
                            {featuredLogos.map((logo) => (
                                <div 
                                    key={logo.fileName}
                                    className="aspect-square bg-white rounded-2xl p-2 shadow-xl border border-primary-800 flex items-center justify-center relative overflow-hidden group hover:scale-105 hover:border-primary-400 transition-all duration-300"
                                >
                                    <img 
                                        src={`/portfolio/${logo.fileName}`} 
                                        alt={logo.title} 
                                        className="max-w-full max-h-full object-contain"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Logo';
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="text-center pt-4">
                            <Link 
                                to="/portfolios" 
                                className="inline-flex items-center text-primary-300 hover:text-primary-100 font-bold tracking-wide text-sm uppercase transition-colors font-body"
                            >
                                <span>View Full 50 Portfolios</span>
                                <FiArrowRight className="ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </Section>


            {/* SECTION 6: THREE MOST DOCUMENTED TRANSFORMATIONS (Teaser) */}
            <Section variant="light" py="py-24" className="bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary-600 text-xs font-bold tracking-widest uppercase mb-3 block font-body">Proven results</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 font-display">Three of our most documented transformations:</h2>
                        <div className="w-24 h-1 bg-primary-500 mx-auto mb-8"></div>
                    </motion.div>

                    {/* Top 3 Teasers */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* Teaser 1: She Shines */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-xl hover:border-primary-400/50 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <span className="text-primary-600 text-[10px] font-bold tracking-widest uppercase block mb-2 font-body">Gems & Jewellery</span>
                                <h4 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4 font-display">She Shines</h4>
                                <p className="text-gray-700 text-sm md:text-base leading-relaxed font-body font-light mb-6">
                                    From boutique startup overshadowed by corporate giants ➔ <span className="font-bold text-emerald-600">undisputed #1 luxury gem brand in the region</span> with 20+ years of market dominance.
                                </p>
                            </div>
                            <div className="aspect-square w-24 bg-white border border-gray-100 p-2 rounded-xl flex items-center justify-center">
                                <img src="/portfolio/1.Gems%26Jewelry.jpg" alt="She Shines Logo" className="max-w-full max-h-full object-contain" />
                            </div>
                        </div>

                        {/* Teaser 2: Iron Gate */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-xl hover:border-primary-400/50 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <span className="text-primary-600 text-[10px] font-bold tracking-widest uppercase block mb-2 font-body">Real Estate</span>
                                <h4 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4 font-display">Iron Gate</h4>
                                <p className="text-gray-700 text-sm md:text-base leading-relaxed font-body font-light mb-6">
                                    Stagnant first year. After CEO name realignment alongside brand rename ➔ <span className="font-bold text-emerald-600">66% growth in Year 2, 142% surge in Year 3</span>.
                                </p>
                            </div>
                            <div className="aspect-square w-24 bg-white border border-gray-100 p-2 rounded-xl flex items-center justify-center">
                                <img src="/portfolio/6.Real%20Estate.png" alt="Iron Gate Logo" className="max-w-full max-h-full object-contain" />
                            </div>
                        </div>

                        {/* Teaser 3: Tech Nova */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-xl hover:border-primary-400/50 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <span className="text-primary-600 text-[10px] font-bold tracking-widest uppercase block mb-2 font-body">Computer Training</span>
                                <h4 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4 font-display">Tech Nova</h4>
                                <p className="text-gray-700 text-sm md:text-base leading-relaxed font-body font-light mb-6">
                                    Goal was 20 students per month. Post-rename ➔ <span className="font-bold text-emerald-600">4 fully booked batches per week</span>, dominating the local tech-training sector.
                                </p>
                            </div>
                            <div className="aspect-square w-24 bg-white border border-gray-100 p-2 rounded-xl flex items-center justify-center">
                                <img src="/portfolio/9.Computer%20Training.png" alt="Tech Nova Logo" className="max-w-full max-h-full object-contain" />
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link 
                            to="/success-stories" 
                            className="inline-flex items-center text-primary-600 hover:text-primary-800 font-bold tracking-wide text-sm uppercase transition-colors font-body"
                        >
                            <span>View All 10 Success Stories</span>
                            <FiArrowRight className="ml-2" />
                        </Link>
                    </div>
                </div>
            </Section>


            {/* SECTION 7: FINAL CALL TO ACTION (Ready to Align?) */}
            <Section variant="dark" py="py-24" className="bg-gradient-to-br from-indigo-950 via-primary-950 to-purple-950 text-center border-t border-primary-900/60 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 to-transparent pointer-events-none" />

                <motion.div
                    variants={ANIMATION.VARIANTS.FADE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto relative z-10"
                >
                    <span className="text-primary-300 text-xs font-bold tracking-widest uppercase mb-3 block font-body">Ready to align?</span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-white font-display leading-tight">
                        One name. One shift. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-purple-300">Rewrite Your Story. Everything changes.</span>
                    </h2>
                    
                    <p className="text-base md:text-lg lg:text-xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed font-body font-light">
                        Your name is your identity frequency — the vibration that shapes your path, your confidence, your opportunities, and the way the world responds to you.
                    </p>

                    <div className="bg-primary-900/40 border border-primary-800/80 rounded-2xl p-6 mb-12 inline-block shadow-2xl backdrop-blur-sm">
                        <p className="text-lg md:text-xl text-primary-200 font-semibold italic font-display">
                            "We align your name. You bring the destiny."
                        </p>
                    </div>

                    <div>
                        <Link 
                            to="/pricing" 
                            className="inline-flex items-center justify-center bg-gradient-to-r from-amber-400 to-orange-500 text-primary-950 font-extrabold text-base md:text-lg py-4 px-10 rounded-full hover:from-amber-300 hover:to-orange-400 transition-all duration-300 shadow-xl shadow-amber-500/10 hover:shadow-amber-500/30 transform hover:-translate-y-1 font-body"
                        >
                            Begin Alignment Scan <FiArrowRight className="ml-2 font-extrabold" />
                        </Link>
                    </div>
                </motion.div>
            </Section>
        </PageWrapper>
    );
};

export default HomePage;