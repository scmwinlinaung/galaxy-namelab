import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';

import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import Section from '@components/ui/Section';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: "easeOut" as const },
    }),
};

interface HomePageProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

const HomePage: React.FC<HomePageProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    const navigate = useNavigate();

    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-32 px-4 md:px-8">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                    >
                        Engineer Your Luck.<br />
                        Design Your Destiny.
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl mb-12 text-purple-200 max-w-4xl mx-auto"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.2}
                    >
                        Unlock the hidden potential of your business and personal brand with "Stellar Fortune Names"—the proprietary naming architecture used by the world's most successful billionaires.
                    </motion.p>
                </div>
            </section>

            {/* Introduction Section */}
            <Section variant="light">
                <motion.div
                    className="flex flex-col md:flex-row items-center gap-12"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="md:w-1/2">
                        <img src="/Horoscope.jpg" alt="Astrology Chart" className="rounded-lg shadow-2xl w-full" />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-bold mb-4 text-gray-900">Beyond Numerology. Beyond Traditional Astrology.</h2>
                        <div className="w-20 h-1 bg-primary-500 mb-6"></div>
                        <p className="text-lg leading-relaxed text-gray-700">
                            At Galaxy NameLab, we don't just choose names that sound good; we construct names that vibrate with success.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-700 mt-4">
                            The Stellar Fortune Naming System is not a common astrological method. It is a proprietary research-based methodology developed exclusively by Galaxy NameLab. We analyze the geometric alignment of the stars to create a harmonic resonance between your identity and the universe.
                        </p>
                    </div>
                </motion.div>
            </Section>

            {/* The Methodology Section */}
            <Section variant="dark">
                <motion.div
                    className="text-center mb-16"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">The Science of the "Sextile Alignment"</h2>
                    <div className="w-32 h-1 bg-primary-400 mx-auto mb-8"></div>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-2 gap-12"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.2}
                >
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                        <h3 className="text-2xl font-bold mb-4 text-primary-300">3rd House (Enterprise)</h3>
                        <p className="text-lg leading-relaxed text-primary-100">
                            The energy of courage, innovation, strategy, and execution.
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                        <h3 className="text-2xl font-bold mb-4 text-primary-300">11th House (Fulfillment)</h3>
                        <p className="text-lg leading-relaxed text-primary-100">
                            The energy of immense wealth, realized gains, and the completion of desires.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="mt-12 text-center"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.4}
                >
                    <div className="bg-primary-400 text-primary-950 rounded-lg p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4">The Result:</h3>
                        <p className="text-lg leading-relaxed">
                            A name that ensures your hard work (3rd House) is always met with extraordinary rewards (11th House). It is the algorithm of "Effortless Success."
                        </p>
                    </div>
                </motion.div>
            </Section>

            {/* The Proof Section */}
            <Section variant="light">
                <motion.div
                    className="text-center mb-16"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">The Billionaire Benchmark: The 90% Rule</h2>
                    <div className="w-32 h-1 bg-primary-500 mx-auto mb-8"></div>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-2 gap-8 mb-12"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.2}
                >
                    <div className="bg-primary-100 border-2 border-primary-300 rounded-lg p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <FiTrendingUp className="text-primary-600 text-2xl" />
                            <h3 className="text-xl font-bold text-primary-800">90% Dominance</h3>
                        </div>
                        <p className="text-gray-700">
                            The vast majority of global giants possess the 3rd + 11th Sextile structure.
                        </p>
                    </div>
                    <div className="bg-primary-100 border-2 border-primary-300 rounded-lg p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <FiStar className="text-primary-600 text-2xl" />
                            <h3 className="text-xl font-bold text-primary-800">10% Minority</h3>
                        </div>
                        <p className="text-gray-700">
                            The remaining 10% utilize the 5th + 9th Trine structure. While this is also a powerful and auspicious alignment, it appears far less frequently at the billionaire level.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6 mb-12"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.4}
                >
                    <h3 className="text-xl font-bold text-primary-800 mb-2">The Dissonant Structures:</h3>
                    <p className="text-gray-700">
                        In stark contrast, struggling or failed businesses almost always lack these harmonic alignments. They typically fall into weak or dissonant structures—specifically the 2+12, 6+8, or the 4+7 Square alignments.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-gray-100 rounded-lg p-8 border border-gray-300"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.6}
                >
                    <img src="/Logos.jpg" alt="Stellar Fortune Brands" className="rounded-lg mb-6 w-full" />
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Stellar Fortune Names dominate the global market:</h3>
                    <p className="text-lg leading-relaxed text-gray-700">
                        Apple, Microsoft, Google, YouTube, TikTok, Tesla, Rolex, Mercedes, SpaceX, X, Dell, Amazon, Toyota, Samsung, Honda, Walmart, Facebook, Meta, Mitsubishi.
                    </p>
                    <p className="text-lg leading-relaxed mt-4 text-gray-700">
                        It's not just companies. The visionaries behind them—Elon Musk, Mark Zuckerberg, Bill Gates, Jeff Bezos, Larry Page, Sergey Brin, Michael Dell, Sam Walton, Warren Buffett, Tim Cook, Lee Byung-Chul, Soichiro Honda, Zhang Yiming, Kiichiro Toyota—also carry Stellar Fortune Names.
                    </p>
                </motion.div>
            </Section>

            {/* The Solution Section */}
            <Section variant="dark">
                <motion.div
                    className="flex flex-col md:flex-row items-center gap-12"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="md:w-1/2">
                        <img src="/People.jpg" alt="Business Success" className="rounded-lg shadow-2xl w-full" />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-bold mb-4">Serendipity vs. Design</h2>
                        <div className="w-20 h-1 bg-primary-400 mb-6"></div>
                        <p className="text-lg leading-relaxed mb-4 text-primary-200">
                            Did these billionaires consult astrologers? Likely not.
                        </p>
                        <p className="text-lg leading-relaxed mb-4 text-primary-200">
                            They were born with a powerful Cosmic Blueprint. Their past karma naturally attracted names that aligned with their destiny. This is the mystery of fortune—sometimes, a random choice becomes a legendary brand.
                        </p>
                        <p className="text-lg leading-relaxed mb-4 text-primary-200">
                            But here is the risk: Even with good karma, many entrepreneurs accidentally choose names that block their energy. A "misaligned" name can turn a brilliant business plan into an uphill struggle, making wealth accumulation difficult despite hard work.
                        </p>
                        <p className="text-lg leading-relaxed font-bold text-primary-300">
                            Don't leave your legacy to chance.
                        </p>
                        <p className="text-lg leading-relaxed text-primary-200">
                            Whether you are rebranding or launching a startup, Galaxy NameLab ensures your name is scientifically engineered for maximum prosperity.
                        </p>
                    </div>
                </motion.div>
            </Section>

            {/* Honest Disclaimer Section */}
            <Section variant="light">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">Defining Your Horizon</h2>
                    <div className="w-20 h-1 bg-primary-500 mb-6"></div>
                    <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4 text-primary-800">Important Note:</h3>
                        <p className="text-lg leading-relaxed text-gray-700 mb-4">
                            Acquiring a Stellar Fortune Name does not automatically guarantee you will become the next Elon Musk.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-700 mb-4">
                            A name is a powerful amplifier, but the scale of your success depends on your Cosmic Blueprint (your past karma).
                        </p>
                        <p className="text-lg leading-relaxed text-gray-700 mb-4">
                            Think of it this way: We build you the fastest, most aerodynamic vehicle possible. How far it travels depends on the fuel you brought with you.
                        </p>
                        <p className="text-lg leading-relaxed font-bold text-primary-800">
                            However, one thing is certain: With a Stellar Fortune Name, you will achieve the absolute maximum success allowed by your destiny.
                        </p>
                    </div>
                </motion.div>
            </Section>

            {/* Stellar Nickname Section */}
            <Section variant="dark">
                <motion.div
                    className="text-center mb-16"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Name is Your Mantra: The Power of a "Stellar Nickname"</h2>
                    <div className="w-32 h-1 bg-primary-400 mx-auto mb-8"></div>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-2 gap-12 items-center mb-16"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.2}
                >
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary-300">The Steve Jobs Paradox:</h3>
                        <p className="text-lg leading-relaxed mb-4 text-primary-200">
                            Steve Jobs created one of the most powerful brand names in history: Apple. It was a perfect Stellar Fortune Name. But his own name? It was a different story.
                        </p>
                        <p className="text-lg leading-relaxed text-primary-200">
                            While his company soared to trillion-dollar heights, his personal name carried a dissonant vibration—a "destructive alignment" that brought immense stress and health challenges, cutting short his time to enjoy the fruits of his success.
                        </p>
                    </div>
                    <div className="order-first md:order-last">
                        <img src="/IMG_5044.jpeg" alt="Stellar Nickname Concept" className="rounded-lg shadow-2xl w-full" />
                    </div>
                </motion.div>

                <motion.div
                    className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-16"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.3}
                >
                    <h3 className="text-xl font-bold mb-4 text-center text-white">The Problem:</h3>
                    <p className="text-lg mb-6 text-center text-primary-200">You cannot change your birth certificate or legal name easily.</p>

                    <h3 className="text-xl font-bold mb-4 text-center text-white">The Solution:</h3>
                    <p className="text-lg mb-6 text-center text-primary-200">You don't have to.</p>

                    <h3 className="text-2xl font-bold mt-8 mb-4 text-center text-primary-300">Introducing the "Stellar Fortune Nickname"</h3>
                    <p className="text-lg leading-relaxed text-center text-primary-200">
                        According to the Law of Cosmic Resonance, the universe responds to the sound that is most frequently used. If 10 times more people call you by your Nickname than your legal name, your destiny will shift to align with that new vibration.
                    </p>
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.4}
                >
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-6">Who Needs a Stellar Nickname?</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                            <FiCheckCircle className="text-3xl text-primary-400 mb-4" />
                            <h4 className="text-xl font-bold mb-2 text-white">Entrepreneurs & Business Owners</h4>
                            <p className="text-primary-200">
                                You might have the perfect business name, but YOU are the captain of the ship. If your personal vibration is weak or misaligned (like Steve Jobs), you become the "bottleneck" to your own company's growth.
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                            <FiCheckCircle className="text-3xl text-primary-400 mb-4" />
                            <h4 className="text-xl font-bold mb-2 text-white">Professionals & Employees</h4>
                            <p className="text-primary-200">
                                Shift your career trajectory from stagnant to soaring. Attract promotions, raises, and unexpected opportunities.
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                            <FiCheckCircle className="text-3xl text-primary-400 mb-4" />
                            <h4 className="text-xl font-bold mb-2 text-white">Personal Brands & Influencers</h4>
                            <p className="text-primary-200">
                                Create a handle or stage name that magnetizes followers and fame.
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                            <FiCheckCircle className="text-3xl text-primary-400 mb-4" />
                            <h4 className="text-xl font-bold mb-2 text-white">Children</h4>
                            <p className="text-primary-200">
                                Give your child a "head start" in life with a nickname that fosters intelligence, charisma, and harmony.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="mt-12 bg-primary-400 text-primary-950 rounded-lg p-8 text-center"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.6}
                >
                    <h3 className="text-xl font-bold mb-4">Important Timing:</h3>
                    <p className="text-lg leading-relaxed">
                        While a Stellar Nickname can benefit anyone, our data suggests the transformation is most potent and rapid for individuals under the age of 40. After 40, the karmic patterns become more rigid, though improvement is still possible.
                    </p>
                    <p className="text-2xl font-bold mt-6">Rewrite Your Story. One Name at a Time.</p>
                </motion.div>

                <motion.div
                    className="mt-16 text-center"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.8}
                >
                    <p className="text-lg text-primary-200">
                        With Metta & Cosmic Regards,<br />
                        <span className="text-xl font-bold">Galaxy NameLab</span>
                    </p>
                </motion.div>
            </Section>
        </PageWrapper>
    );
};

export default HomePage;