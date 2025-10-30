// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiCopy, FiHeart, FiCalendar } from 'react-icons/fi';

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
    // @ts-ignore
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: "easeOut" },
    }),
};

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [placeholder, setPlaceholder] = useState("a futuristic tech startup...");
    const [type, setType] = useState("username");
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
            <Header />

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

                <motion.h1
                    // @ts-ignore
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.2}
                    className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg"
                >
                    Welcome to <span className="text-primary-200">Galaxy NameLab</span>
                </motion.h1>

                <motion.p
                    // @ts-ignore
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.4}
                    className="text-lg md:text-xl text-primary-50 max-w-3xl mb-8"
                >
                    {tagline}
                </motion.p>

                {/* Name Generation Input */}
                <motion.form
                    onSubmit={handleNameGeneration}
                    // @ts-ignore
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.6}
                    className="w-full flex flex-col gap-4 items-center mb-6"
                >
                    <div className="w-full flex max-w-2xl">
                        <input
                            type="text"
                            name="name"
                            placeholder={`e.g., ${placeholder}`}
                            className="w-full bg-transparent text-white text-lg px-6 py-4 placeholder-primary-200 focus:outline-none rounded-l-full border border-primary-700"
                        />

                    </div>

                    <div className="w-full flex items-center justify-center gap-2 mt-2">
                        <FiCalendar />
                        <input
                            type="date"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            className="bg-primary-900/40 border border-primary-700 text-white px-4 py-2 rounded-full focus:outline-none"
                        />
                    </div>

                    {/* Type Selection */}
                    <div className="flex gap-4 mt-2">
                        {["username", "business", "project"].map((option) => (
                            <button
                                key={option}
                                onClick={() => setType(option)}
                                type="button"
                                className={`px-4 py-2 rounded-full border ${type === option
                                    ? "bg-primary-500 border-primary-400"
                                    : "bg-primary-900/40 border-primary-700"
                                    }`}
                            >
                                {option === "username" ? "Username" : option === "business" ? "Business Name" : "Project Name"}
                            </button>
                        ))}
                    </div>
                </motion.form>

                {/* Generated Suggestions */}
                {suggestions.length > 0 && (
                    <motion.div
                        // @ts-ignore
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.8}
                        className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl"
                    >
                        {suggestions.map((s, i) => (
                            <div
                                key={i}
                                className="flex justify-between items-center bg-primary-900/40 border border-primary-700 px-4 py-3 rounded-full text-white shadow-md"
                            >
                                <span>{s}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => navigator.clipboard.writeText(s)}
                                        className="hover:text-primary-200"
                                    >
                                        <FiCopy />
                                    </button>
                                    <button className="hover:text-primary-200">
                                        <FiHeart />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}

                {/* Richest People Showcase */}
                <motion.div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {richestPeople.map((person, index) => (
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
                            <h2 className="text-2xl font-bold mb-2">{person.name}</h2>
                            <p className="text-primary-200 mb-1"><strong>Profession:</strong> {person.profession}</p>
                            <p className="text-primary-200 mb-1"><strong>Net Worth:</strong> {person.netWorth}</p>
                            <p className="text-primary-50 text-sm">{person.explanation}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </PageWrapper>
    );
};

export default HomePage;
