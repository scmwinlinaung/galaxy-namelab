// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiCopy, FiHeart, FiCalendar, FiStar, FiMoon, FiSun, FiMail } from 'react-icons/fi';

import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import Button from '@components/ui/Button';

const taglines = [
    "Your next idea starts here…",
    "Names as infinite as the galaxy",
    "Discover a name that shines",
    "From mundane to cosmic",
];

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
];


// Mock astrology/numerology suggestion function
function generateCosmicNames(name: string, birthdate: string, type: string): string[] {
    const base = `${name}-${type}`;
    return Array.from({ length: 5 }, (_, i) => `${base}-${i + 1}`);
}

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
    const [placeholder, setPlaceholder] = useState("a futuristic tech startup...");
    const [type, setType] = useState("business");
    const [tagline, setTagline] = useState(taglines[0]);
    const [birthdate, setBirthdate] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);

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

        let taglineIndex = 0;
        const taglineInterval = setInterval(() => {
            taglineIndex = (taglineIndex + 1) % taglines.length;
            setTagline(taglines[taglineIndex]);
        }, 4000);

        return () => {
            clearInterval(intervalId);
            clearInterval(taglineInterval);
        };
    }, []);

    const handleNameGeneration = (e: React.FormEvent) => {
        e.preventDefault();
        // @ts-ignore
        const inputName = (e.currentTarget.querySelector('input[name="name"]') as HTMLInputElement).value || "User";
        const generated = generateCosmicNames(inputName, birthdate, type);
        setSuggestions(generated);
        navigate(`/generate?q=${encodeURIComponent(inputName)}&type=${type}&birthdate=${birthdate}`);
    };

    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />

            <section className="relative w-full min-h-screen flex flex-col items-center justify-start text-center bg-gradient-to-b from-primary-700 via-primary-800 to-primary-950 text-white overflow-hidden px-4 py-12">
                {/* Background Blobs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500 rounded-full mix-blend-screen blur-3xl opacity-30"
                    // @ts-ignore
                    animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
                    // @ts-ignore
                    transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary rounded-full mix-blend-screen blur-3xl opacity-20"
                    // @ts-ignore
                    animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
                    // @ts-ignore
                    transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
                />



                <motion.div
                    // @ts-ignore
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.3}
                    className="flex items-center justify-center gap-2 mb-6"
                >
                    <a
                        href="mailto:galaxynamelab@gmail.com"
                        className="flex items-center gap-2 text-primary-200 hover:text-white transition-colors duration-300 bg-primary-800/40 px-4 py-2 rounded-full border border-primary-600/30 hover:bg-primary-700/50"
                    >
                        <FiMail className="text-xl" />
                        <span className="text-sm">galaxynamelab@gmail.com</span>
                    </a>
                </motion.div>
                <motion.div
                    // @ts-ignore
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={1.5}
                    className="w-full max-w-6xl mb-12 bg-primary-900/30 backdrop-blur-md rounded-3xl p-10 border border-primary-600/30"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <FiSun className="text-5xl text-yellow-400" />
                        <h2 className="text-4xl md:text-5xl font-bold text-primary-100">
                            Galaxy Name Lab
                        </h2>
                        <FiMoon className="text-5xl text-indigo-400" />
                    </div>

                    <div className="text-left">
                        <p className="text-primary-100 leading-relaxed text-lg">
                            Choosing a name is more than just selecting beautiful sounds — it is the beginning of one's identity, personality, and life journey. In astrology, a name carries vibration and energy that can influence character, success, relationships, and destiny. By aligning a name with one's birth star, zodiac sign, date of birth, and planetary positions, we can create harmony between the individual and the universe.
                        </p>
                        <p className="text-primary-200 leading-relaxed text-lg mt-4">
                            Our naming with astrology service helps you discover meaningful, balanced, and auspicious names that support positive growth and well-being. Whether you are naming a newborn, changing your own name, or selecting a business or brand name, we use traditional astrological methods combined with deep cultural understanding to guide you.
                        </p>
                        <p className="text-primary-100 leading-relaxed text-lg mt-4 text-center italic">
                            Every name has a story.<br />
                            Let us help you choose a name that brings luck, strength, and happiness for life.
                        </p>
                    </div>
                </motion.div>



                {/* Business Showcase Flashcards */}
                <motion.div
                    // @ts-ignore
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={1.0}
                    className="w-full max-w-4xl mb-16"
                >
                    <h2 className="text-4xl font-bold mb-8 text-primary-100">Featured Businesses</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
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
                        ].map((business, index) => (
                            <motion.div
                                key={index}
                                className="perspective-1000"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
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
                                            <h3 className="text-2xl font-bold text-white mb-3">
                                                {business.name}
                                            </h3>
                                            <div className="w-12 h-1 bg-white/50 mb-4"></div>
                                            <p className="text-white/90 text-sm leading-relaxed">
                                                {business.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-white/60">{business.location}</span>
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
                                                className="inline-block bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors duration-300 shadow-lg"
                                                onClick={(e) => e.stopPropagation()}
                                            >
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

                    <div className="text-center mt-8">
                        <Button
                            onClick={() => navigate('/business')}
                            className="bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg active:scale-95 touch-manipulation"
                        >
                            See More Businesses
                        </Button>
                    </div>
                </motion.div>


                {/* Richest People Showcase */}
                <motion.div
                    // @ts-ignore
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={1.2}
                    className="w-full max-w-4xl mb-16"
                >
                    <h2 className="text-4xl font-bold mb-8 text-primary-100">Success Stories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {richestPeople.slice(0, 2).map((person, index) => (
                            <motion.div
                                key={index}
                                // @ts-ignore
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                custom={0.5 + index * 0.2}
                                className="bg-primary-900/40 border border-primary-700 rounded-2xl p-6 text-left shadow-lg backdrop-blur-sm hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src={person.photo}
                                    alt={person.name}
                                    className="w-full h-48 object-cover rounded-xl mb-4"
                                />
                                <h3 className="text-2xl font-bold mb-2">{person.name}</h3>
                                <p className="text-primary-200 mb-1"><strong>Profession:</strong> {person.profession}</p>
                                <p className="text-primary-200 mb-1"><strong>Net Worth:</strong> {person.netWorth}</p>
                                <p className="text-primary-50 text-sm">{person.explanation}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* See More Button */}
                    <div className="text-center mt-8">
                        <Button
                            onClick={() => navigate('/success')}
                            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                        >
                            See More Success Stories
                        </Button>
                    </div>
                </motion.div>

                {/* About Astrology Section */}
                <motion.div
                    // @ts-ignore
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={1.5}
                    className="w-full max-w-6xl mb-12 bg-primary-900/30 backdrop-blur-md rounded-3xl p-10 border border-primary-600/30"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <FiSun className="text-5xl text-yellow-400" />
                        <h2 className="text-4xl md:text-5xl font-bold text-primary-100">
                            About Astrology & Numerology
                        </h2>
                        <FiMoon className="text-5xl text-indigo-400" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div>
                            <h3 className="text-2xl font-bold text-primary-200 mb-4">🌟 Astrology</h3>
                            <p className="text-primary-100 leading-relaxed mb-4">
                                Astrology is the ancient practice of interpreting celestial movements and their influence on human affairs.
                                Your birth chart reveals the positions of planets at your birth, each contributing unique energies to your personality and life path.
                            </p>
                            <p className="text-primary-200">
                                The 12 zodiac signs represent archetypal energies that shape character traits, strengths, and challenges.
                                By aligning your name with astrological insights, you create harmony between your identity and cosmic forces.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-primary-200 mb-4">🔢 Numerology</h3>
                            <p className="text-primary-100 leading-relaxed mb-4">
                                Numerology is the mystical study of numbers and their vibrational significance. Each number carries specific
                                energies and meanings that influence personality, destiny, and life purpose.
                            </p>
                            <p className="text-primary-200">
                                Your Life Path Number, derived from your birthdate, reveals your core purpose and natural talents.
                                By calculating the numerical value of names, we ensure cosmic alignment with your personal vibration
                                for maximum success and fulfillment.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 p-6 bg-primary-800/40 rounded-2xl border border-primary-600/30">
                        <h4 className="text-xl font-bold text-primary-100 mb-3 text-center">
                            ✨ Why Use Astrology for Naming? ✨
                        </h4>
                        <p className="text-primary-200 text-center leading-relaxed">
                            Names carry vibrational frequencies that interact with cosmic energies. When your name resonates
                            with your astrological profile and numerological signature, it creates a powerful alignment that
                            attracts opportunities, success, and positive energy into your life and ventures.
                        </p>
                    </div>
                </motion.div>

                {/* Footer Section */}
                <motion.footer
                    // @ts-ignore
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={1.8}
                    className="w-full border-t border-primary-600/30 pt-8 pb-6"
                >
                    <div className="w-full max-w-6xl mx-auto px-4">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-2">
                                <FiStar className="text-yellow-400" />
                                <p className="text-primary-200 text-sm">
                                    Powered by Cosmic Intelligence & Ancient Wisdom
                                </p>
                                <FiStar className="text-yellow-400" />
                            </div>

                            <div className="text-primary-300 text-sm text-center">
                                <p>&copy; {new Date().getFullYear()} Galaxy NameLab. All Rights Reserved.</p>
                                <p className="mt-1">Crafted with ✨ and guided by the stars</p>
                            </div>
                        </div>
                    </div>
                </motion.footer>
            </section>
        </PageWrapper>
    );
};

export default HomePage;