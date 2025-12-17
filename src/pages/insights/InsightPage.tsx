// src/pages/insights/InsightPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiTrendingUp, FiAward, FiTarget } from 'react-icons/fi';

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


// Billionaire data with analysis content
const billionaires = [
    {
        name: "Elon Musk",
        title: "The Architect of the Future",
        entities: "Tesla, SpaceX, X",
        netWorth: "$460.4 Billion",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: "/elon_musk.jpg",
        color: "from-blue-600 to-purple-700",
        analysis: {
            blueprint: "Born under Capricorn Ascendant with chart ruler Saturn in 3rd House. Exalted Jupiter aspects Saturn, creating massive expansion of efforts.",
            name: "Planetary Sequence: Sun + Mercury + Jupiter + Mars. Forms perfect 'Sextile Alignment' (3rd + 11th House) converting ideas to wealth.",
            companies: {
                tesla: "Saturn + Mars + Mercury - Perfect 3rd + 11th Sextile Chain granting resilience and innovation.",
                spacex: "Mars + Jupiter + Mars - Golden Sextile for conquering aggressive frontiers.",
                x: "Sun + Mars - 3rd + 11th Stellar Fortune structure."
            }
        }
    },
    {
        name: "Jeff Bezos",
        title: "The Master of Commerce",
        entities: "Amazon",
        netWorth: "$241.5 Billion",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: "/jeff_bezos.jpg",
        color: "from-orange-600 to-amber-700",
        analysis: {
            blueprint: "Capricorn Ascendant. 2nd Lord Saturn in 9th House aspects 11th House, creating 'Dhana Yoga' connecting wealth with divine luck.",
            name: "Rare Trine Structure - Moon + Jupiter + Mars forms 5th + 9th Trine Alignment for divine creativity and luck.",
            companies: {
                amazon: "Sun + Jupiter + Mars - Perfect 3rd + 11th Sextile Chain designed for velocity and scale."
            }
        }
    },
    {
        name: "Bill Gates",
        title: "The Phenomenon of Double Resonance",
        entities: "Microsoft",
        netWorth: "$104.5 Billion",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: "/bill_gates.jpg",
        color: "from-cyan-600 to-blue-700",
        analysis: {
            blueprint: "Cancer Ascendant. Moon and Venus in 'Parivartana' (exchange) creating infinite wealth loop. Fortuner Planet in 9th House.",
            name: "'Twin Vibration' - Personal name and company name carry identical Jupiter + Moon + Mars vibration.",
            companies: {
                microsoft: "Jupiter + Moon + Mars - Identical to personal name, creating zero friction between founder and company."
            }
        }
    },
    {
        name: "Michael Dell",
        title: "The Pioneer of Personal Branding",
        entities: "Dell Technologies",
        netWorth: "$146.5 Billion",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: "/michael_dell.jpg",
        color: "from-green-600 to-emerald-700",
        analysis: {
            blueprint: "Virgo Ascendant. Venus in 11th House forms 'Dhana Yoga' with Mars. Fortuner Planet in 11th House.",
            name: "Jupiter + Moon + Saturn - First and last letters create perfect 3rd + 11th Sextile Alignment.",
            companies: {
                dell: "Saturn-ruled name forms 3rd + 11th Stellar Fortune loop, turning name into money-making machine."
            }
        }
    },
    {
        name: "Larry Page",
        title: "The Architect of Information",
        entities: "Google, YouTube",
        netWorth: "$265 Billion",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: "/larry_page.jpg",
        color: "from-red-600 to-pink-700",
        analysis: {
            blueprint: "Cancer Ascendant. Exalted Jupiter on Ascendant (Hamsa Yoga). Fortuner Planet in 11th House.",
            name: "Mercury + Mercury + Jupiter + Moon - First and last sounds lock into 3rd + 11th Sextile Alignment.",
            companies: {
                google: "Moon + Moon vibration aligns with Exalted Jupiter for ultimate source of answers.",
                youtube: "Mercury + Moon forms classic 3rd + 11th Stellar Fortune Alignment."
            }
        }
    },
    {
        name: "Sergey Brin",
        title: "The Perfect Co-Pilot",
        entities: "Google, YouTube",
        netWorth: "$244 Billion",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: "/sergey_brin.jpg",
        color: "from-indigo-600 to-purple-700",
        analysis: {
            blueprint: "Leo Ascendant. Mars and Mercury on Ascendant create 'Raja Yoga' and 'Dhana Yoga'. Fortuner Planet in 11th House.",
            name: "TWO distinct Sextile locks - 'Sergey' (Mars + Moon) and 'Brin' (Jupiter + Rahu).",
            companies: {
                google: "Aligns with 11th Lord Mercury, creating loop of gains connected to effort.",
                youtube: "Mercury + Moon matches vibration of first name 'Sergey'."
            }
        }
    },
    {
        name: "Mark Zuckerberg",
        title: "The Social Architect",
        entities: "Facebook, Meta",
        netWorth: "$218 Billion",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: "/mark_zukerberg.jpg",
        color: "from-blue-600 to-cyan-700",
        analysis: {
            blueprint: "Capricorn Ascendant. Rare 3rd + 11th Lord alignment by placement. Fortuner Planet in 11th House.",
            name: "Jupiter + Mars + Moon + Jupiter - Mirrors chart's rare 3rd + 11th Lord alignment.",
            companies: {
                facebook: "Jupiter + Mars + Jupiter - Pure 3rd + 11th Sextile Alignment.",
                meta: "Jupiter + Saturn - Another powerful 3rd + 11th Alignment."
            }
        }
    },
    {
        name: "Zhang Yiming",
        title: "The Algorithm of Destiny",
        entities: "ByteDance, TikTok",
        netWorth: "$69.3 Billion",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: "/zhang_yiming.jpg",
        color: "from-pink-600 to-rose-700",
        analysis: {
            blueprint: "Sagittarius Ascendant. Jupiter-Mars 'Parivartana Yoga' creates perpetual growth loop. Fortuner Planet in 11th House.",
            name: "Mars + Mercury + Jupiter - Starts with Mars, ends with Jupiter, mimicking chart's Mars-Jupiter exchange.",
            companies: {
                bytedance: "Jupiter + Mars - Perfect Stellar Fortune Name.",
                tiktok: "Acts as 3rd House trigger connecting to 11th House, creating viral resonance."
            }
        }
    },
    {
        name: "Taylor Swift",
        title: "The Icon of Fame",
        entities: "Global Music Icon",
        netWorth: "$1.6 Billion",
        grade: "⭐⭐⭐⭐ (4-Star / Grade A+)",
        image: "/taylor_swift.jpg",
        color: "from-purple-600 to-pink-700",
        analysis: {
            blueprint: "Sagittarius Ascendant. Jupiter on Ascendant. Fortuner Planet in 10th House (Fame).",
            name: "Saturn + Mars - Creates 3rd + 9th + 11th circuit connecting art to luck to wealth.",
            companies: {
                personal: "Grade A+ proves right Stellar Fortune Name can override chart weaknesses."
            }
        }
    },
    {
        name: "Michael Jackson",
        title: "The Tragic King",
        entities: "The King of Pop",
        netWorth: "~$1 Billion (Career Earnings)",
        grade: "⭐⭐⭐ (3-Star / Flawed Structure)",
        image: "/michael_jackson.jpg",
        color: "from-gray-600 to-slate-700",
        analysis: {
            blueprint: "Taurus Ascendant. Saturn and Venus in 1st House create massive 'Raja Yoga'. Fortuner Planet in 10th House.",
            name: "Hidden internal '2nd + 12th Flaw' creates 'Leaking Bucket Effect' despite good outer structure.",
            companies: {
                warning: "Internal name conflicts can drain success and life force despite external success."
            }
        }
    },
    {
        name: "Steve Jobs",
        title: "The Paradox of Genius",
        entities: "Apple, iPhone, iOS",
        netWorth: "$8.3 Billion (at time of death)",
        grade: "⚠️ CRITICAL MISMATCH (Dissonant Structure)",
        image: "/steve_jobs.jpg",
        color: "from-slate-600 to-gray-800",
        analysis: {
            blueprint: "Powerful birth chart with strong planetary positions.",
            name: "'8th House Trap' - Name starts and ends with Mars, activating crisis sector.",
            companies: {
                apple: "Sun + Jupiter - Perfect 3rd + 11th Sextile Alignment creating unstoppable growth.",
                ios: "Sun + Mars - Another 3rd + 11th Alignment for global dominance."
            }
        }
    },
    {
        name: "Tim Cook",
        title: "The Guardian of the Galaxy",
        entities: "Apple Inc.",
        netWorth: "$2.6 Billion",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: "/tim_cook.jpg",
        color: "from-blue-600 to-indigo-700",
        analysis: {
            blueprint: "Virgo Ascendant. Mercury-Mars exchange creates natural Sextile energy. Fortuner Planet in 11th House.",
            name: "Saturn + Moon - Perfect 3rd + 11th Harmony for stable, long-term growth.",
            companies: {
                apple: "Sun + Jupiter vibration mathematically compatible with Cook's chart for cosmic synergy."
            }
        }
    },
    {
        name: "Mao Zedong",
        title: "The Sovereign Power",
        entities: "Founder, People's Republic of China",
        netWorth: "Historical Legacy",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: "/mao_zedong.jpg",
        color: "from-red-700 to-red-900",
        analysis: {
            blueprint: "Cancer Ascendant. Mars on Ascendant creates 'Yogakaraka' (King-Maker). Fortuner Planet in 10th House.",
            name: "Jupiter + Mars + Saturn - First and last sounds form classic 3rd + 11th Stellar Fortune Alignment.",
            companies: {
                legacy: "Bound ideology with everlasting structure, creating legacy outliving the man."
            }
        }
    }
];

interface InsightPageProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

const InsightPage: React.FC<InsightPageProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-32 px-4 md:px-8">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.1}
                    className="max-w-6xl mx-auto text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white">
                        Stellar Fortune Titans
                    </h1>
                    <div className="w-32 h-1 bg-primary-400 mx-auto mb-8"></div>
                    <p className="text-xl md:text-2xl text-purple-200 leading-relaxed max-w-4xl mx-auto">
                        Discover the cosmic secrets behind history's most successful individuals.
                        From tech billionaires to cultural icons, explore how Stellar Fortune Names
                        and celestial blueprints shaped extraordinary destinies.
                    </p>
                </motion.div>
            </section>

            {/* Billionaires Grid */}
            <Section variant="light">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.3}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                        Titans of Success
                    </h2>
                    <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Explore the cosmic alignment and name analysis of history's most successful individuals.
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {billionaires.map((person, index) => (
                        <motion.div
                            key={index}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.5 + index * 0.1}
                            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
                        >
                            {/* Header Section */}
                            <div className={`bg-gradient-to-r ${person.color} p-12 text-white`}>
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl"
                                    >
                                        <img
                                            src={person.image}
                                            alt={person.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-3xl md:text-4xl font-bold mb-2">{person.name}</h3>
                                        <p className="text-xl text-white/90 mb-2">{person.title}</p>
                                        <p className="text-lg text-white/80 mb-1">{person.entities}</p>
                                        <p className="text-2xl font-bold text-yellow-300 mb-2">{person.netWorth}</p>
                                        <div className="flex items-center justify-center md:justify-start gap-2">
                                            <FiStar className="w-5 h-5 text-yellow-300" />
                                            <span className="text-lg font-semibold">{person.grade}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Analysis Section */}
                            <div className="p-12">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Cosmic Blueprint */}
                                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border-2 border-indigo-100 shadow-lg">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
                                                <FiTarget className="w-6 h-6 text-white" />
                                            </div>
                                            <h4 className="text-2xl font-bold text-gray-900">Cosmic Blueprint</h4>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed text-lg">{person.analysis.blueprint}</p>
                                    </div>

                                    {/* Name Analysis */}
                                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border-2 border-amber-100 shadow-lg">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                                                <FiAward className="w-6 h-6 text-white" />
                                            </div>
                                            <h4 className="text-2xl font-bold text-gray-900">Name Analysis</h4>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed text-lg">{person.analysis.name}</p>
                                    </div>

                                    {/* Company Analysis */}
                                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 border-2 border-emerald-100 shadow-lg">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                                                <FiTrendingUp className="w-6 h-6 text-white" />
                                            </div>
                                            <h4 className="text-2xl font-bold text-gray-900">Empire Analysis</h4>
                                        </div>
                                        <div className="space-y-4">
                                            {Object.entries(person.analysis.companies).map(([key, value]) => (
                                                <div key={key} className="bg-white/50 rounded-xl p-4">
                                                    <span className="font-bold text-gray-900 capitalize text-lg">
                                                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                                                    </span>
                                                    <p className="text-gray-700 mt-2 leading-relaxed">{value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Conclusion Section */}
            <Section variant="dark">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={2.5}
                    className="bg-primary-900/30 backdrop-blur-md rounded-3xl p-8 border border-primary-600/30"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-100 mb-6 text-center">
                        The Universal Law of Success
                    </h2>
                    <div className="w-16 h-1 bg-primary-400 mx-auto mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-primary-800/40 rounded-2xl p-6 border border-primary-600/30">
                            <h3 className="text-xl font-bold text-primary-100 mb-3">🌟 The 3rd + 11th Alignment</h3>
                            <p className="text-primary-200">
                                The gold standard for unlimited success. Connects effort (3rd House) with massive gains (11th House),
                                creating a perpetual engine of wealth and achievement.
                            </p>
                        </div>
                        <div className="bg-primary-800/40 rounded-2xl p-6 border border-primary-600/30">
                            <h3 className="text-xl font-bold text-primary-100 mb-3">⚖️ Alignment is Everything</h3>
                            <p className="text-primary-200">
                                When birth chart, personal name, and business name synchronize, success becomes not just
                                possible—it becomes inevitable. These titans prove the cosmic mathematics works.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </Section>
        </PageWrapper>
    );
};

export default InsightPage;