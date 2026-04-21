import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar, FiCheckCircle, FiTrendingUp, FiUsers, FiPlay } from 'react-icons/fi';

import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import Section from '@components/ui/Section';
import { ANIMATION, IMAGES, CELEBRITY_IMAGES } from '../../constants';
import { STORAGE_KEYS } from '@constants/api';
import { AuthService, VisitorService } from '@api/index';

// Module-level variable to guarantee the API is only called once per page load
let hasRecordedVisit = false;

interface HomePageProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

const HomePage: React.FC<HomePageProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [visitorCount, setVisitorCount] = useState<number | null>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlayVideo = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsVideoPlaying(true);
        }
    };

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

    useEffect(() => {
        const token = searchParams.get('token');
        const userId = searchParams.get('userId');

        if (token && userId) {
            AuthService.getUserById(userId, token)
                .then((userData) => {
                    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
                    localStorage.setItem(STORAGE_KEYS.USER_NAME, userData?.data?.name || "");
                    localStorage.setItem(STORAGE_KEYS.USER_EMAIL, userData?.data?.email || "");
                    localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
                    localStorage.removeItem(STORAGE_KEYS.USER_PASSWORD);
                    window.dispatchEvent(new CustomEvent('authChange', { detail: { isAuthenticated: true } }));
                    window.history.replaceState({}, '', '/');
                })
                .catch((error) => {
                    console.error('Failed to fetch user data:', error);
                    window.dispatchEvent(new CustomEvent('authChange', { detail: { isAuthenticated: true } }));
                    navigate('/', { replace: true });
                });

            localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
            localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
            localStorage.removeItem(STORAGE_KEYS.USER_PASSWORD);
            window.dispatchEvent(new CustomEvent('authChange', { detail: { isAuthenticated: true } }));
            window.history.replaceState({}, '', '/');
        }
    }, [searchParams]);

    // Gather celebrity images for a grid display
    const celebrityImagesList = [
        CELEBRITY_IMAGES.ELON_MUSK,
        CELEBRITY_IMAGES.MARK_ZUCKERBERG,
        CELEBRITY_IMAGES.BILL_GATES,
        CELEBRITY_IMAGES.STEVE_JOBS,
        CELEBRITY_IMAGES.JEFF_BEZOS,
        CELEBRITY_IMAGES.TIM_COOK,
    ];

    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />

            {/* Section 1: The Hook (Hero Section) */}
            <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white pt-32 pb-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto text-center mt-12 md:mt-16">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-5xl mx-auto"
                        variants={ANIMATION.VARIANTS.FADE_UP}
                        initial="hidden"
                        animate="visible"
                    >
                        Why do 90% of Global Giants share the same hidden naming code?
                    </motion.h1>
                    
                    <motion.p
                        className="text-lg md:text-xl mb-10 text-purple-200 max-w-3xl mx-auto"
                        variants={ANIMATION.VARIANTS.FADE_UP}
                        initial="hidden"
                        animate="visible"
                        custom={0.2}
                    >
                        From Apple to Tesla, the world’s most successful brands weren't named by chance. They were engineered. Unlock the proprietary naming architecture used by the world’s billionaires.
                    </motion.p>

                    {/* Video Container */}
                    <motion.div
                        className="relative max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-2xl border border-white/20"
                        variants={ANIMATION.VARIANTS.FADE_UP}
                        initial="hidden"
                        animate="visible"
                        custom={0.3}
                    >
                        {/* Video Element */}
                        <video 
                            ref={videoRef}
                            className="w-full h-auto aspect-video object-cover bg-black"
                            controls={isVideoPlaying}
                            onPause={() => setIsVideoPlaying(false)}
                            onPlay={() => setIsVideoPlaying(true)}
                            preload="auto"
                        >
                            <source src="/home_page.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Custom Play Button Overlay (Disappears when playing) */}
                        {!isVideoPlaying && (
                            <div 
                                className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer transition-opacity hover:bg-black/30"
                                onClick={handlePlayVideo}
                            >
                                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/50 transform transition-transform hover:scale-110">
                                    <FiPlay className="text-white text-4xl ml-1" />
                                </div>
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        variants={ANIMATION.VARIANTS.FADE_UP}
                        initial="hidden"
                        animate="visible"
                        custom={0.4}
                    >
                        <Link 
                            to="/check-your-name" 
                            className="inline-flex items-center justify-center bg-primary-400 text-primary-950 font-bold text-lg py-4 px-8 rounded-full hover:bg-primary-300 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Get Your Free Stellar Audit Now <FiArrowRight className="ml-2" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Visitor Counter Section */}
            <Section variant="dark" py="py-8" className="border-b border-white/10 bg-primary-950">
                <motion.div
                    className="flex flex-col items-center justify-center text-center"
                    variants={ANIMATION.VARIANTS.FADE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-2 bg-primary-400 rounded-full text-primary-950">
                            <FiUsers className="text-xl md:text-2xl" />
                        </div>
                        <h2 className="text-2xl md:text-4xl font-bold text-white tabular-nums">
                            {visitorCount !== null ? visitorCount.toLocaleString() : '...'}
                        </h2>
                    </div>
                    <p className="text-md md:text-lg text-primary-200 font-medium">
                        Total individuals whose destinies have been touched by Galaxy NameLab
                    </p>
                </motion.div>
            </Section>

            {/* Section 2: Visual Proof (The Billionaire Benchmark) */}
            <Section variant="light">
                <motion.div
                    className="text-center mb-16"
                    variants={ANIMATION.VARIANTS.FADE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">The 90% Rule of Global Dominance</h2>
                    <div className="w-32 h-1 bg-primary-500 mx-auto mb-8"></div>
                    <p className="text-xl leading-relaxed text-gray-700 max-w-4xl mx-auto mb-12">
                        Our research into the top 100 global companies reveals a startling truth: the vast majority possess a specific celestial alignment in their names. It’s not just business : it’s Harmonic Resonance.
                    </p>
                </motion.div>

                <motion.div
                    variants={ANIMATION.VARIANTS.FADE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.2}
                    className="mb-16"
                >
                    <img src={IMAGES.LOGOS} alt="Successful Brand Names and Billionaire Brand Secrets" className="w-full max-w-4xl mx-auto rounded-xl shadow-xl mb-8 object-cover border border-gray-200" />
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
                        {celebrityImagesList.map((img, index) => {
                            const altTexts = [
                                "Elon Musk - Successful Brand Names",
                                "Mark Zuckerberg - Wealth Manifestation Names",
                                "Bill Gates - Lucky Business Names",
                                "Steve Jobs - Vibrationally Aligned Names",
                                "Jeff Bezos - Spiritual Business Naming",
                                "Tim Cook - Billionaire Brand Secrets"
                            ];
                            return (
                                <div key={index} className="aspect-square rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center">
                                    <img src={img} alt={altTexts[index]} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Leader' }} />
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </Section>

            {/* Section 3: The Revelation (Beyond Luck) */}
            <Section variant="dark">
                <motion.div
                    className="flex flex-col md:flex-row items-center gap-12"
                    variants={ANIMATION.VARIANTS.FADE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="md:w-1/2">
                        <img src={IMAGES.HOROSCOPE} alt="Astrology for Branding and Vibrationally Aligned Names" className="rounded-lg shadow-2xl w-full border border-primary-800" />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Beyond Numerology. Beyond Traditional Astrology.</h2>
                        <div className="w-20 h-1 bg-primary-400 mb-8"></div>
                        <p className="text-xl leading-relaxed text-primary-100 mb-6">
                            Most entrepreneurs leave their legacy to chance. At Galaxy NameLab, we don't just choose names that sound good; we construct names that vibrate with success.
                        </p>
                        <p className="text-xl leading-relaxed text-primary-100 font-medium">
                            We bridge the gap between your hard work and extraordinary rewards.
                        </p>
                    </div>
                </motion.div>
            </Section>

            {/* Section 4: The Secret Sauce (The Methodology) */}
            <Section variant="light">
                <motion.div
                    className="text-center mb-16"
                    variants={ANIMATION.VARIANTS.FADE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">The Science of "Sextile Alignment"</h2>
                    <div className="w-32 h-1 bg-primary-500 mx-auto mb-8"></div>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto"
                    variants={ANIMATION.VARIANTS.FADE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.2}
                >
                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <FiTrendingUp className="text-3xl text-primary-600" />
                            <h3 className="text-2xl font-bold text-primary-900">The 3rd House</h3>
                        </div>
                        <p className="text-primary-800 font-medium mb-2 uppercase tracking-wide text-sm">Enterprise</p>
                        <p className="text-lg text-gray-700">
                            The energy of courage, innovation, and execution.
                        </p>
                    </div>
                    
                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <FiStar className="text-3xl text-primary-600" />
                            <h3 className="text-2xl font-bold text-primary-900">The 11th House</h3>
                        </div>
                        <p className="text-primary-800 font-medium mb-2 uppercase tracking-wide text-sm">Fulfillment</p>
                        <p className="text-lg text-gray-700">
                            The energy of immense wealth and realized gains.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="mt-12"
                    variants={ANIMATION.VARIANTS.FADE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.4}
                >
                    <div className="bg-gray-900 text-white rounded-2xl p-10 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-4 text-primary-300 flex items-center gap-2">
                                <FiCheckCircle /> The Result
                            </h3>
                            <p className="text-xl leading-relaxed">
                                A <span className="font-bold text-primary-400">3rd + 11th Sextile</span> structure ensures your effort (3rd House) translates directly into massive success (11th House). This is the algorithm of Effortless Success.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </Section>

            {/* Section 5: The Steve Jobs Paradox (Nicknames) */}
            <Section variant="dark">
                <motion.div
                    className="grid md:grid-cols-2 gap-16 items-center"
                    variants={ANIMATION.VARIANTS.FADE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="order-2 md:order-1">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Your Name is Your Mantra</h2>
                        <div className="w-20 h-1 bg-primary-400 mb-8"></div>
                        
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-3 text-primary-300">The Steve Jobs Paradox</h3>
                            <p className="text-lg leading-relaxed text-primary-100">
                                Even with a perfect business name, YOU are the captain. If your personal vibration is misaligned : like Steve Jobs : you become the bottleneck to your own growth.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-2 text-white flex items-center gap-2">
                                <FiStar className="text-primary-400" /> The Solution
                            </h3>
                            <p className="text-lg text-primary-100">
                                A <span className="font-bold text-primary-300">Stellar Nickname</span> ensures your personal energy is strong enough to carry your empire.
                            </p>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary-500 rounded-2xl transform rotate-3 opacity-20"></div>
                            <img src={CELEBRITY_IMAGES.STEVE_JOBS} alt="Steve Jobs - Brand Identity Consultant & Business Numerology" className="relative z-10 rounded-2xl shadow-2xl w-full object-cover border border-white/10" style={{maxHeight: '500px'}} />
                        </div>
                    </div>
                </motion.div>
            </Section>

            {/* Section 6: Final Call to Action */}
            <Section variant="light" className="text-center" py="py-24">
                <motion.div
                    variants={ANIMATION.VARIANTS.FADE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900">Rewrite Your Story.<br/><span className="text-primary-600">One Name at a Time.</span></h2>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12 inline-block">
                        <p className="text-lg text-gray-600 font-medium">
                            <span className="font-bold text-gray-900">Disclaimer:</span> We build the aerodynamic vehicle. Your karma is the fuel. Let’s ensure you travel as far as your destiny allows.
                        </p>
                    </div>

                    <div>
                        <Link 
                            to="/check-your-name" 
                            className="inline-flex items-center justify-center bg-gray-900 text-white font-bold text-xl py-5 px-10 rounded-full hover:bg-primary-600 transition-colors duration-300 shadow-xl transform hover:-translate-y-1"
                        >
                            Audit Your Brand Name for Free <FiArrowRight className="ml-2" />
                        </Link>
                    </div>
                </motion.div>
            </Section>
        </PageWrapper>
    );
};

export default HomePage;