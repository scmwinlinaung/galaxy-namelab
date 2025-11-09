import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiCopy, FiHeart, FiCalendar, FiStar, FiMoon, FiSun, FiMail } from 'react-icons/fi';

import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import Button from '@components/ui/Button';

// Data remains the same as your original file
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
];

const featuredBusinesses = [
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
    }
];

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

    // Reusable component for the alternating content sections
    const ContentBlock = ({
        imageSrc,
        imageAlt,
        title,
        date,
        category,
        author,
        excerpt,
        buttonText,
        onButtonClick,
        imageLeft = true,
        theme = 'light', // New 'theme' prop, defaults to 'light'
    }: {
        imageSrc: string;
        imageAlt: string;
        title: string;
        date: string;
        category: string;
        author: string;
        excerpt: string;
        buttonText: string;
        onButtonClick: () => void;
        imageLeft?: boolean;
        theme?: 'light' | 'dark'; // Define theme prop
    }) => {
        const isDark = theme === 'dark';

        return (
            <motion.div
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full mx-auto ${!imageLeft ? 'md:flex-row-reverse' : ''}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="md:w-1/2">
                    <img src={imageSrc} alt={imageAlt} className="rounded-lg shadow-xl object-fill w-full " />
                </div>
                <div className="md:w-1/2">
                    <h2 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>{title}</h2>
                    <div className={`w-20 h-0.5 mb-4 ${isDark ? 'bg-primary-400' : 'bg-indigo-500'}`}></div>
                    {/* <div className={`flex items-center gap-4 text-sm mb-4 ${isDark ? 'text-primary-200' : 'text-gray-500'}`}>
                        <span>{date}</span>
                        <span>•</span>
                        <span>{category}</span>
                        <span>•</span>
                        <span>{author}</span>
                    </div> */}
                    <p className={`leading-relaxed mb-6 ${isDark ? 'text-primary-100' : 'text-gray-600'}`}>{excerpt}</p>
                    {/* {buttonText.length > 0 &&
                        <button
                            onClick={onButtonClick}
                            className={`font-semibold border-2 rounded-full px-8 py-3 transition-colors duration-300 focus:outline-none focus:ring-2 
                            ${isDark
                                    ? 'text-white border-white hover:bg-white hover:text-primary-800 focus:ring-gray-300'
                                    : 'text-indigo-600 border-indigo-500 hover:bg-indigo-500 hover:text-white focus:ring-indigo-400'
                                }`}
                        >
                            {buttonText}
                        </button>
                    } */}
                </div>
            </motion.div>
        );
    };

    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />

            {/* Content Section - Dark background */}
            <section id="content-dark" className="bg-gray-50 text-gray-800 py-20 px-4 md:px-8 bg-gradient-to-b from-primary-700 via-primary-800 to-primary-950">
                <div className="max-w-6xl mx-auto space-y-24 mt-20">
                    <ContentBlock
                        imageSrc="https://www.yourtango.com/sites/default/files/image_blog/is-astrology-real.jpg"
                        imageAlt="Astrology and Numerology"
                        title="Astrology & Numerology"
                        date="OCT 28, 2025"
                        category="GUIDES"
                        author="GALAXY NAMELAB"
                        excerpt="Choosing a name is more than just selecting beautiful sounds — it is the beginning of one’s identity, personality, and life journey. In astrology, a name carries vibration and energy that can influence character, success, relationships, and destiny. By aligning a name with one’s birth star, zodiac sign, date of birth, and planetary positions, we can create harmony between the individual and the universe. Our naming with astrology service helps you discover meaningful, balanced, and auspicious names that support positive growth and well-being. Whether you are naming a newborn, changing your own name, or selecting a business or brand name, we use traditional astrological methods combined with deep cultural understanding to guide you. Every name has a story. Let us help you choose a name that brings luck, strength, and happiness for life."
                        buttonText=""
                        onButtonClick={() => alert('Navigate to About Page')}
                        imageLeft={true}
                        theme="dark" // Use the dark theme for this block
                    />
                </div>
            </section>

            {/* Content Section - Light background */}
            <section id="content-light1" className="bg-gray-50 text-gray-800 py-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto space-y-24">
                    <ContentBlock
                        imageSrc={richestPeople[0].photo}
                        imageAlt={richestPeople[0].name}
                        title="Weightless Moons: Success Stories"
                        date="NOV 02, 2025"
                        category="CASE STUDY"
                        author="STELLA MARS"
                        excerpt={`Discover how aligning with cosmic energies can illuminate the path to success. From Elon Musk's pioneering Aries spirit to Oprah's visionary Aquarian nature, we explore the astrological and numerological blueprints of today's leaders.`}
                        buttonText="READ MORE"
                        onButtonClick={() => navigate('/success')}
                        imageLeft={false}
                    // 'theme' prop is omitted, so it defaults to 'light'
                    />
                </div>
            </section>

            {/* Content Section - Light background */}
            <section id="content-light1" className="bg-gray-50 text-gray-800 py-20 px-4 md:px-8 bg-gradient-to-b from-primary-700 via-primary-800 to-primary-950">
                <div className="max-w-6xl mx-auto space-y-24">
                    <ContentBlock
                        imageSrc={richestPeople[1].photo}
                        imageAlt={richestPeople[1].name}
                        title="Weightless Moons: Success Stories"
                        date="NOV 02, 2025"
                        category="CASE STUDY"
                        author="STELLA MARS"
                        excerpt={`Discover how aligning with cosmic energies can illuminate the path to success. From Elon Musk's pioneering Aries spirit to Oprah's visionary Aquarian nature, we explore the astrological and numerological blueprints of today's leaders.`}
                        buttonText="READ MORE"
                        onButtonClick={() => navigate('/success')}
                        imageLeft={false}
                        theme={'dark'}
                    // 'theme' prop is omitted, so it defaults to 'light'
                    />
                </div>
            </section>

            {/* Content Section - Light background */}
            <section id="content-light2" className="bg-gray-50 text-gray-800 py-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto space-y-24">
                    <ContentBlock
                        imageSrc="https://s.yimg.com/ny/api/res/1.2/_VvZEjGgh9_bAPTVM5K2IA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTU0MA--/https://media.zenfs.com/en/creative_bloq_161/42f5fd64ad7a159c7c6b4d44d0993930"
                        imageAlt="Featured Businesses"
                        title="Fire signs – Thriving Businesses"
                        date="NOV 07, 2025"
                        category="BUSINESS"
                        author="GALAXY NAMELAB"
                        excerpt="A brand's name carries a unique vibration. Explore how iconic businesses like 'Telsa Motor' have names that resonate with success, creating a powerful market presence and lasting customer connection through cosmic alignment."
                        buttonText="VIEW MORE SUCCESS BUSINESS"
                        onButtonClick={() => navigate('/business')}
                        imageLeft={true}
                    // 'theme' prop is omitted, so it defaults to 'light'
                    />
                </div>
            </section >

            <section id="content-light2" className="bg-gray-50 text-gray-800 py-20 px-4 md:px-8  bg-gradient-to-b from-primary-700 via-primary-800 to-primary-950">
                <div className="max-w-6xl mx-auto space-y-24">
                    <ContentBlock
                        imageSrc="https://images.icon-icons.com/4049/PNG/512/facebook_logo_icon_257023.png"
                        imageAlt="Featured Businesses"
                        title="Fire signs – Thriving Businesses"
                        date="NOV 07, 2025"
                        category="BUSINESS"
                        author="GALAXY NAMELAB"
                        excerpt="A brand's name carries a unique vibration. Explore how iconic businesses like 'Facebook' have names that resonate with success, creating a powerful market presence and lasting customer connection through cosmic alignment."
                        buttonText="VIEW MORE SUCCESS BUSINESS"
                        onButtonClick={() => navigate('/business')}
                        imageLeft={true}
                        theme={'dark'}
                    // 'theme' prop is omitted, so it defaults to 'light'
                    />
                </div>
            </section >


            {/* Footer Section */}
            < motion.footer
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1.8}
                className="w-full bg-primary-950 border-t border-primary-600/30 pt-8 pb-6"
            >
                <div className="w-full max-w-6xl mx-auto px-4 text-white">
                    <div className="flex flex-col items-center gap-4">

                        <div className="text-primary-300 text-sm text-center">
                            <p>&copy; {new Date().getFullYear()} Galaxy NameLab. All Rights Reserved.</p>
                            <p className="mt-1">Crafted with ✨ and guided by the stars</p>
                        </div>
                    </div>
                </div>
            </motion.footer >
        </PageWrapper >
    );
};

export default HomePage;