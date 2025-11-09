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
        photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Elon_Musk_2019.jpg",
        profession: "Entrepreneur",
        netWorth: "$200B",
        explanation: "Numerology: Life path 11 → visionary, innovative; Astrology: Aries → bold, pioneering."
    },
    {
        name: "Oprah Winfrey",
        photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Oprah_Winfrey.jpg",
        profession: "Media Mogul",
        netWorth: "$2.5B",
        explanation: "Numerology: Life path 8 → leadership and success in business; Astrology: Aquarius → visionary, humanitarian."
    },
    {
        name: "Jeff Bezos",
        photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Jeff_Bezos_2016.jpg",
        profession: "Entrepreneur",
        netWorth: "$150B",
        explanation: "Numerology: Life path 7 → analytical and strategic; Astrology: Capricorn → disciplined, ambitious."
    },
    {
        name: "Bill Gates",
        photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Bill_gates_portrait.jpg",
        profession: "Entrepreneur",
        netWorth: "$120B",
        explanation: "Numerology: Life path 4 → practical, disciplined; Astrology: Scorpio → focused, determined."
    },
    {
        name: "Mark Zuckerberg",
        photo: "https://commons.wikimedia.org/wiki/Special:FilePath/MarkZuckerberg.jpg",
        profession: "Entrepreneur",
        netWorth: "$90B",
        explanation: "Numerology: Life path 7 → analytical, strategic; Astrology: Taurus → persistent, practical."
    },
    {
        name: "Warren Buffett",
        photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Warren_Buffett_KU_Visit.jpg",
        profession: "Investor",
        netWorth: "$100B",
        explanation: "Numerology: Life path 6 → nurturing, responsible; Astrology: Virgo → analytical, reliable."
    },
    {
        name: "Larry Page",
        photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Larry_Page.jpg",
        profession: "Entrepreneur",
        netWorth: "$120B",
        explanation: "Numerology: Life path 3 → creative, innovative; Astrology: Aries → bold, pioneering."
    },
    {
        name: "Larry Ellison",
        photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Larry_Ellison_picture.png",
        profession: "Entrepreneur",
        netWorth: "$130B",
        explanation: "Numerology: Life path 8 → leadership, business success; Astrology: Leo → charismatic, ambitious."
    },
    {
        name: "Steve Jobs",
        photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Steve_Jobs.jpg",
        profession: "Entrepreneur",
        netWorth: "$10B",
        explanation: "Numerology: Life path 11 → visionary, innovative; Astrology: Pisces → creative, intuitive."
    }
];


interface SuccessPageProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

// Image component with error handling and fallback
// Replace ONLY this component in your file

// Image component with error handling and fallback
const ImageWithErrorHandling: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [currentSrc, setCurrentSrc] = React.useState<string | null>(null);

    React.useEffect(() => {
        // Reset state when src changes
        setImageError(false);
        setImageLoaded(false);
        setCurrentSrc(null);

        if (!src) {
            setImageError(true);
            return;
        }

        // Preload using Image() to avoid rendering issues in some environments
        const img = new window.Image();
        // try to allow cross-origin if remote server supports it (won't hurt if not)
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            setCurrentSrc(src);
            setImageLoaded(true);
        };
        img.onerror = () => {
            setImageError(true);
        };
        img.src = src;

        // cleanup
        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src]);

    // Fallback to a placeholder with initials when the external image fails
    const getFallbackImage = (name: string) => {
        const initials = name
            .split(' ')
            .map(n => n[0] ?? '')
            .slice(0, 2)
            .join('')
            .toUpperCase() || '?';

        const colors = [
            'bg-indigo-500', 'bg-purple-500', 'bg-blue-500', 'bg-green-500',
            'bg-yellow-500', 'bg-red-500', 'bg-pink-500', 'bg-teal-500'
        ];
        const colorIndex = (name.charCodeAt(0) || 0) % colors.length;

        return (
            <div
                className={`w-full h-96 rounded-lg shadow-xl flex items-center justify-center ${colors[colorIndex]} text-white text-4xl font-bold`}
                aria-hidden="true"
            >
                {initials}
            </div>
        );
    };

    // While preloading, keep a stable skeleton to avoid layout shift
    if (!imageLoaded && !imageError) {
        return (
            <div className="relative">
                <div className="w-full h-96 rounded-lg shadow-xl bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="text-gray-500">Loading...</div>
                </div>
            </div>
        );
    }

    if (imageError || !currentSrc) {
        return getFallbackImage(alt);
    }

    return (
        <div className="relative">
            <img
                src={currentSrc}
                alt={alt}
                loading="lazy"
                className="rounded-lg shadow-xl object-cover w-full h-96 transition-opacity duration-300 opacity-100"
                // Keep handlers for extra safety (shouldn't be needed because we preload)
                onError={() => setImageError(true)}
                onLoad={() => setImageLoaded(true)}
            />
        </div>
    );
};


const SuccessPage: React.FC<SuccessPageProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    // Reusable component for the alternating content sections (matching HomePage)
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
        theme = 'light',
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
        theme?: 'light' | 'dark';
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
                    <img src={imageSrc} />
                    {/* <ImageWithErrorHandling src={imageSrc} alt={imageAlt} /> */}
                </div>
                <div className="md:w-1/2">
                    <h2 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>{title}</h2>
                    <div className={`w-20 h-0.5 mb-4 ${isDark ? 'bg-primary-400' : 'bg-indigo-500'}`}></div>
                    <p className={`leading-relaxed mb-6 ${isDark ? 'text-primary-100' : 'text-gray-600'}`}>{excerpt}</p>
                </div>
            </motion.div>
        );
    };

    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />

            {/* Hero Section - Dark background */}
            <section className="bg-gradient-to-b from-primary-700 via-primary-800 to-primary-950 text-white py-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto text-center mb-12 mt-20">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.1}
                    >
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <FiTrendingUp className="text-5xl text-yellow-400" />
                            <h1 className="text-4xl md:text-6xl font-extrabold text-primary-100">
                                Success Stories
                            </h1>
                            <FiAward className="text-5xl text-yellow-400" />
                        </div>
                        <p className="text-lg text-primary-200 leading-relaxed max-w-3xl mx-auto">
                            Meet the world's most successful individuals who have achieved extraordinary success.
                            Discover how numerology and astrology insights align with their achievements and life paths.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section - Light background */}
            <section className="bg-gray-50 text-gray-800 py-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto space-y-24">
                    <ContentBlock
                        imageSrc={richestPeople[0].photo}
                        imageAlt={richestPeople[0].name}
                        title="Elon Musk: The Cosmic Visionary"
                        date="NOV 09, 2025"
                        category="SUCCESS STORY"
                        author="GALAXY NAMELAB"
                        excerpt="Elon Musk exemplifies the power of cosmic alignment with his Life Path 11 numerology and Aries astrology. As a natural-born pioneer, his bold vision and innovative spirit have revolutionized multiple industries. His numerological path as a master number 11 grants him heightened intuition and the ability to see possibilities others miss, while his Aries Sun sign provides the courage and determination to turn visions into reality."
                        buttonText=""
                        onButtonClick={() => { }}
                        imageLeft={true}
                    />
                </div>
            </section>

            {/* Content Section - Dark background */}
            <section className="bg-gradient-to-b from-primary-700 via-primary-800 to-primary-950 text-white py-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto space-y-24">
                    <ContentBlock
                        imageSrc={richestPeople[1].photo}
                        imageAlt={richestPeople[1].name}
                        title="Oprah Winfrey: The Humanitarian Leader"
                        date="NOV 09, 2025"
                        category="SUCCESS STORY"
                        author="GALAXY NAMELAB"
                        excerpt="Oprah Winfrey's journey showcases the perfect blend of Life Path 8 numerology and Aquarius astrology. Her numerological path 8 signifies natural leadership abilities and immense potential for business success, while her Aquarian nature provides the visionary, humanitarian perspective that has made her a global influencer. Together, these cosmic energies have guided her to build an empire centered on empowerment, education, and positive change."
                        buttonText=""
                        onButtonClick={() => { }}
                        imageLeft={false}
                        theme="dark"
                    />
                </div>
            </section>

            {/* Content Section - Light background */}
            <section className="bg-gray-50 text-gray-800 py-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto space-y-24">
                    <ContentBlock
                        imageSrc={richestPeople[2].photo}
                        imageAlt={richestPeople[2].name}
                        title="Jeff Bezos: The Strategic Builder"
                        date="NOV 09, 2025"
                        category="SUCCESS STORY"
                        author="GALAXY NAMELAB"
                        excerpt="Jeff Bezos demonstrates the cosmic combination of Life Path 7 numerology and Capricorn astrology. His analytical and strategic numerological path, combined with the ambitious and disciplined nature of Capricorn, has enabled him to build Amazon from a simple online bookstore into a global empire. His cosmic blueprint reveals a personality driven by methodical planning, relentless ambition, and the ability to see long-term patterns others miss."
                        buttonText=""
                        onButtonClick={() => { }}
                        imageLeft={true}
                    />
                </div>
            </section>

            {/* Content Section - Dark background */}
            <section className="bg-gradient-to-b from-primary-700 via-primary-800 to-primary-950 text-white py-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto space-y-24">
                    <ContentBlock
                        imageSrc={richestPeople[3].photo}
                        imageAlt={richestPeople[3].name}
                        title="Bill Gates: The Disciplined Innovator"
                        date="NOV 09, 2025"
                        category="SUCCESS STORY"
                        author="GALAXY NAMELAB"
                        excerpt="Bill Gates embodies the cosmic alignment of Life Path 4 numerology and Scorpio astrology. His practical and disciplined numerological path, enhanced by the focused and determined nature of Scorpio, has guided him to revolutionize the technology industry. This cosmic combination provides the foundation for methodical innovation, strategic thinking, and the intense focus required to create lasting global impact through technology and philanthropy."
                        buttonText=""
                        onButtonClick={() => { }}
                        imageLeft={false}
                        theme="dark"
                    />
                </div>
            </section>

            {/* Content Section - Light background */}
            <section className="bg-gray-50 text-gray-800 py-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto space-y-24">
                    <ContentBlock
                        imageSrc={richestPeople[4].photo}
                        imageAlt={richestPeople[4].name}
                        title="Mark Zuckerberg: The Social Connector"
                        date="NOV 09, 2025"
                        category="SUCCESS STORY"
                        author="GALAXY NAMELAB"
                        excerpt="Mark Zuckerberg demonstrates the cosmic alignment of Life Path 7 numerology and Taurus astrology. His analytical and strategic numerological path, combined with the persistent and practical nature of Taurus, has enabled him to build the world's largest social network. This cosmic blueprint reveals a personality driven by methodical planning, relentless determination, and the ability to create platforms that fundamentally change how people connect and communicate globally."
                        buttonText=""
                        onButtonClick={() => { }}
                        imageLeft={true}
                    />
                </div>
            </section>

            {/* Content Section - Dark background */}
            <section className="bg-gradient-to-b from-primary-700 via-primary-800 to-primary-950 text-white py-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto space-y-24">
                    <ContentBlock
                        imageSrc={richestPeople[5].photo}
                        imageAlt={richestPeople[5].name}
                        title="Warren Buffett: The Wise Investor"
                        date="NOV 09, 2025"
                        category="SUCCESS STORY"
                        author="GALAXY NAMELAB"
                        excerpt="Warren Buffett exemplifies the cosmic combination of Life Path 6 numerology and Virgo astrology. His nurturing and responsible numerological path, enhanced by the analytical and reliable nature of Virgo, has established him as one of the world's most successful investors. This cosmic alignment provides the foundation for patient, disciplined investing strategies and the wisdom to build lasting value through principled decision-making and long-term vision."
                        buttonText=""
                        onButtonClick={() => { }}
                        imageLeft={false}
                        theme="dark"
                    />
                </div>
            </section>

            {/* Content Section - Light background */}
            <section className="bg-gray-50 text-gray-800 py-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto space-y-24">
                    <ContentBlock
                        imageSrc={richestPeople[6].photo}
                        imageAlt={richestPeople[6].name}
                        title="Larry Page: The Search Pioneer"
                        date="NOV 09, 2025"
                        category="SUCCESS STORY"
                        author="GALAXY NAMELAB"
                        excerpt="Larry Page showcases the cosmic synergy of Life Path 3 numerology and Aries astrology. His creative and innovative numerological path, combined with the bold and pioneering nature of Aries, has enabled him to revolutionize how the world accesses information. This cosmic blueprint reveals a personality driven by curiosity, breakthrough thinking, and the courage to pursue ambitious ideas that transform global communication and knowledge sharing."
                        buttonText=""
                        onButtonClick={() => { }}
                        imageLeft={true}
                    />
                </div>
            </section>

            {/* Content Section - Dark background */}
            <section className="bg-gradient-to-b from-primary-700 via-primary-800 to-primary-950 text-white py-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto space-y-24">
                    <ContentBlock
                        imageSrc={richestPeople[7].photo}
                        imageAlt={richestPeople[7].name}
                        title="Larry Ellison: The Tech Titan"
                        date="NOV 09, 2025"
                        category="SUCCESS STORY"
                        author="GALAXY NAMELAB"
                        excerpt="Larry Ellison embodies the cosmic power of Life Path 8 numerology and Leo astrology. His numerological path 8 signifies natural leadership abilities and immense potential for business success, while his Leo nature provides the charisma and ambition needed to build a global empire. This cosmic combination has guided him to establish Oracle as a dominant force in enterprise software, demonstrating the perfect blend of strategic thinking, bold vision, and the magnetic leadership that inspires teams to achieve extraordinary technological breakthroughs."
                        buttonText=""
                        onButtonClick={() => { }}
                        imageLeft={false}
                        theme="dark"
                    />
                </div>
            </section>

            {/* Content Section - Dark background */}
            <section className="bg-gradient-to-b from-primary-700 via-primary-800 to-primary-950 text-white py-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto space-y-24">
                    <ContentBlock
                        imageSrc={richestPeople[8].photo}
                        imageAlt={richestPeople[8].name}
                        title="Steve Jobs: The Visionary Designer"
                        date="NOV 09, 2025"
                        category="SUCCESS STORY"
                        author="GALAXY NAMELAB"
                        excerpt="Steve Jobs exemplifies the perfect fusion of Life Path 11 numerology and Pisces astrology. As a master number 11, his visionary and innovative numerological path grants him extraordinary insight and the ability to see beyond conventional boundaries. His Piscean nature adds layers of creativity and intuition, enabling him to merge technology with artistry. This cosmic alignment has guided him to create products that not only function beautifully but also transform how people interact with technology on a profound level."
                        buttonText=""
                        onButtonClick={() => { }}
                        imageLeft={false}
                        theme="dark"
                    />
                </div>
            </section>

          </PageWrapper>
    );
};

export default SuccessPage;