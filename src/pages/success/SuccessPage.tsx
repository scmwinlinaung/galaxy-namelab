// src/pages/success/SuccessPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiStar, FiAward } from 'react-icons/fi';

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

const richestPeople = [
    {
        name: "Elon Musk",
        photo: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg",
        profession: "Entrepreneur",
        netWorth: "$200B",
        explanation: "Numerology: Life path 11 → visionary, innovative; Astrology: Aries → bold, pioneering."
    },
    {
        name: "Oprah Winfrey",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Oprah_Winfrey_2016.jpg/1024px-Oprah_Winfrey_2016.jpg",
        profession: "Media Mogul",
        netWorth: "$2.5B",
        explanation: "Numerology: Life path 8 → leadership and success in business; Astrology: Aquarius → visionary, humanitarian."
    },
    {
        name: "Jeff Bezos",
        photo: "https://upload.wikimedia.org/wikipedia/commons/0/03/Jeff_Bezos_visits_LAAFB_SMC_%283908618%29_%28cropped%29.jpeg",
        profession: "Entrepreneur",
        netWorth: "$150B",
        explanation: "Numerology: Life path 7 → analytical and strategic; Astrology: Capricorn → disciplined, ambitious."
    },
    {
        name: "Bill Gates",
        photo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Bill_Gates_2018.jpg",
        profession: "Entrepreneur",
        netWorth: "$120B",
        explanation: "Numerology: Life path 4 → practical, disciplined; Astrology: Scorpio → focused, determined."
    },
    {
        name: "Mark Zuckerberg",
        photo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/F20250904AH-2824_%2854778373111%29_%28cropped%29.jpg",
        profession: "Entrepreneur",
        netWorth: "$90B",
        explanation: "Numerology: Life path 7 → analytical, strategic; Astrology: Taurus → persistent, practical."
    },
    {
        name: "Warren Buffett",
        photo: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_%28cropped%29.jpg",
        profession: "Investor",
        netWorth: "$100B",
        explanation: "Numerology: Life path 6 → nurturing, responsible; Astrology: Virgo → analytical, reliable."
    },
    {
        name: "Bernard Arnault",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Bernard_Arnault_%28cropped_2%29.jpg/800px-Bernard_Arnault_%28cropped_2%29.jpg",
        profession: "Business Magnate",
        netWorth: "$180B",
        explanation: "Numerology: Life path 9 → humanitarian, generous; Astrology: Pisces → intuitive, creative."
    },
    {
        name: "Larry Ellison",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Larry_Ellison_World_Economic_Forum_2012.jpg/800px-Larry_Ellison_World_Economic_Forum_2012.jpg",
        profession: "Entrepreneur",
        netWorth: "$130B",
        explanation: "Numerology: Life path 5 → adventurous, freedom-loving; Astrology: Leo → confident, natural leader."
    },
    {
        name: "Michael Bloomberg",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Michael_Bloomberg_in_2023.jpg/800px-Michael_Bloomberg_in_2023.jpg",
        profession: "Businessman",
        netWorth: "$70B",
        explanation: "Numerology: Life path 3 → creative, communicative; Astrology: Aquarius → innovative, humanitarian."
    }
];

interface SuccessPageProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />

            <section className="relative w-full min-h-screen flex flex-col items-center justify-start text-center bg-gradient-to-b from-primary-700 via-primary-800 to-primary-950 text-white overflow-hidden px-4 py-12">
                {/* Background Blobs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-screen blur-3xl opacity-20"
                    animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold rounded-full mix-blend-screen blur-3xl opacity-15"
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
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <FiTrendingUp className="text-5xl text-yellow-400" />
                        <h1 className="text-4xl md:text-6xl font-extrabold text-primary-100">
                            Success Stories
                        </h1>
                        <FiAward className="text-5xl text-gold" />
                    </div>
                    <p className="text-lg text-primary-200 leading-relaxed">
                        Meet the world's most successful individuals who have achieved extraordinary success.
                        Discover how numerology and astrology insights align with their achievements and life paths.
                    </p>
                </motion.div>

                {/* Success People Grid */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.3}
                    className="w-full max-w-7xl mb-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {richestPeople.map((person, index) => (
                            <motion.div
                                key={index}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                custom={0.5 + index * 0.1}
                                className="bg-primary-900/40 border border-primary-700 rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm hover:scale-105 transition-transform duration-300 group"
                            >
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={person.photo}
                                        alt={person.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                    {/* Floating Badge */}
                                    <motion.div
                                        className="absolute top-4 right-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"
                                        animate={{
                                            scale: [1, 1.05, 1],
                                            rotate: [0, 2, -2, 0]
                                        }}
                                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                    >
                                        <FiStar className="w-3 h-3" />
                                        {person.netWorth}
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="p-6 text-left">
                                    <h3 className="text-2xl font-bold text-white mb-2">{person.name}</h3>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-primary-200 text-sm font-semibold">
                                            {person.profession}
                                        </span>
                                        <span className="text-primary-400">•</span>
                                        <span className="text-yellow-400 text-sm font-bold">
                                            {person.netWorth}
                                        </span>
                                    </div>
                                    <div className="bg-primary-800/40 rounded-xl p-4 border border-primary-600/30">
                                        <p className="text-primary-100 text-sm leading-relaxed">
                                            {person.explanation}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Astrology & Success Section */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={1.5}
                    className="w-full max-w-5xl mb-12 bg-primary-900/30 backdrop-blur-md rounded-3xl p-8 border border-primary-600/30"
                >
                    <h2 className="text-3xl font-bold text-primary-100 mb-6">
                        The Cosmic Connection to Success
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="bg-primary-800/40 rounded-2xl p-6 border border-primary-600/30">
                            <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                                <FiStar className="w-5 h-5" />
                                Numerology Patterns
                            </h3>
                            <p className="text-primary-200 mb-3">
                                Many successful individuals share common life path numbers:
                            </p>
                            <ul className="space-y-2 text-primary-100 text-sm">
                                <li><strong>Life Path 7:</strong> Analytical thinkers (Elon, Mark, Jeff)</li>
                                <li><strong>Life Path 8:</strong> Natural leaders (Oprah)</li>
                                <li><strong>Life Path 4:</strong> Disciplined achievers (Bill)</li>
                                <li><strong>Life Path 6:</strong> Responsible visionaries (Warren)</li>
                            </ul>
                        </div>

                        <div className="bg-primary-800/40 rounded-2xl p-6 border border-primary-600/30">
                            <h3 className="text-xl font-bold text-blue-400 mb-3 flex items-center gap-2">
                                <FiAward className="w-5 h-5" />
                                Astrological Advantages
                            </h3>
                            <p className="text-primary-200 mb-3">
                                Common zodiac traits among high achievers:
                            </p>
                            <ul className="space-y-2 text-primary-100 text-sm">
                                <li><strong>Aries:</strong> Bold pioneers (Elon)</li>
                                <li><strong>Capricorn:</strong> Ambitious achievers (Jeff)</li>
                                <li><strong>Aquarius:</strong> Visionary thinkers (Oprah)</li>
                                <li><strong>Taurus:</strong> Persistent builders (Mark)</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 p-6 bg-gradient-to-r from-yellow-900/30 to-blue-900/30 rounded-2xl border border-yellow-600/30">
                        <h4 className="text-xl font-bold text-primary-100 mb-3 text-center">
                            ✨ Success Alignment Formula ✨
                        </h4>
                        <p className="text-primary-200 text-center leading-relaxed">
                            Success often comes when your name, business ventures, and life choices align with your
                            numerological life path and astrological strengths. These cosmic leaders demonstrate how
                            understanding your personal cosmic blueprint can unlock extraordinary potential.
                        </p>
                    </div>
                </motion.div>
            </section>
        </PageWrapper>
    );
};

export default SuccessPage;