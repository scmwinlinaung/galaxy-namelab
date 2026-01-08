// src/pages/faq/FAQPage.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiStar, FiShield, FiTrendingUp, FiUsers, FiPackage, FiClock, FiCheckCircle, FiAlertCircle, FiInfo, FiArrowRight, FiPercent } from 'react-icons/fi';

import PageWrapper from '../../components/layouts/PageWrapper';
import Header from '../../components/layouts/Header';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: "easeOut" as const },
    }),
};

interface FAQPageProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

interface FAQItem {
    question: string;
    answer: string;
    icon?: React.ReactNode;
}

interface FAQCategory {
    title: string;
    icon: React.ReactNode;
    items: FAQItem[];
}

// Enhanced Answer Content Component
const AnswerContent: React.FC<{ content: string }> = ({ content }) => {
    // Parse content for special formatting
    const parseContent = (text: string) => {
        // Handle bullet points (•)
        const bulletPointRegex = /^•\s+(.+)$/gm;
        const hasBulletPoints = bulletPointRegex.test(text);

        // Handle percentages and numbers
        const percentageRegex = /\b(\d+)%\b/g;
        const timeRegex = /(\d+)\s*(?:hours?|days?|minutes?)/g;

        // Handle key phrases
        const keyPhrases = [
            'Law of Cosmic Resonance',
            '3rd + 11th Sextile Alignment',
            'Stellar Fortune Naming System',
            'Galaxy Naming Package',
            'Self-Naming',
            'Cosmic Validator',
            'Stellar Key Letters'
        ];

        return text
            .split('\n')
            .map((line, index) => {
                if (line.trim() === '') return null;

                // Check for bullet points
                const bulletMatch = line.match(/^•\s+(.+)$/);
                if (bulletMatch) {
                    return (
                        <div key={index} className="flex items-start gap-3 mb-3 group">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-amber-500 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <span className="text-primary-100 leading-relaxed flex-1">
                                {highlightKeyPhrases(bulletMatch[1])}
                            </span>
                        </div>
                    );
                }

                // Check for note/limit sections
                if (line.toLowerCase().includes('note:') || line.toLowerCase().includes('limit:')) {
                    return (
                        <div key={index} className="mt-4 p-4 bg-amber-900/20 border border-amber-700/30 rounded-xl">
                            <div className="flex items-start gap-2">
                                {line.toLowerCase().includes('note:') ? (
                                    <FiInfo className="text-amber-400 mt-1 flex-shrink-0" />
                                ) : (
                                    <FiAlertCircle className="text-amber-400 mt-1 flex-shrink-0" />
                                )}
                                <span className="text-amber-100 text-sm leading-relaxed">
                                    {highlightSpecialTerms(line)}
                                </span>
                            </div>
                        </div>
                    );
                }

                // Regular paragraph
                return (
                    <p key={index} className="text-primary-100 leading-relaxed mb-4 last:mb-0">
                        {highlightSpecialTerms(line)}
                    </p>
                );
            })
            .filter(Boolean);
    };

    // Highlight key phrases with gradient text
    const highlightKeyPhrases = (text: string) => {
        const phrases = [
            'Law of Cosmic Resonance',
            '3rd + 11th Sextile Alignment',
            'Stellar Fortune Naming System',
            'Galaxy Naming Package',
            'Self-Naming',
            'Cosmic Validator',
            'Stellar Key Letters',
            'Stellar Fortune Nickname'
        ];

        let highlightedText = text;
        phrases.forEach(phrase => {
            const regex = new RegExp(`(${phrase})`, 'g');
            highlightedText = highlightedText.replace(
                regex,
                '<span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400 font-semibold">$1</span>'
            );
        });

        return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
    };

    // Highlight percentages, time periods, and numbers
    const highlightSpecialTerms = (text: string) => {
        let processedText = text;

        // Highlight percentages
        processedText = processedText.replace(
            /(\d+)%/g,
            '<span class="text-amber-400 font-bold">$1%</span>'
        );

        // Highlight time periods
        processedText = processedText.replace(
            /(\d+)\s*(hours?|days?|minutes?)/gi,
            '<span class="text-blue-400 font-semibold">$1 $2</span>'
        );

        // Highlight key success metrics
        processedText = processedText.replace(
            /(80% success rate|30%|20%|27 years)/g,
            '<span class="text-green-400 font-bold">$1</span>'
        );

        return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
    };

    return (
        <div className="space-y-2">
            {parseContent(content)}
        </div>
    );
};

const FAQPage: React.FC<FAQPageProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

    const toggleItem = (categoryTitle: string, itemIndex: number) => {
        const key = `${categoryTitle}-${itemIndex}`;
        setOpenItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const faqCategories: FAQCategory[] = [
        {
            title: "General & Methodology",
            icon: <FiStar className="text-purple-400" />,
            items: [
                {
                    question: "Is this system based on Numerology or standard Astrology?",
                    answer: "No. The Stellar Fortune Naming System is a proprietary evolution of guarded esoteric traditions from Eastern Wisdom. It is not Numerology, nor is it standard Western or Eastern Astrology. It is an advanced system that uses planetary geometry to align the 3rd House (Effort) and 11th House (Gains).",
                    icon: <FiStar className="text-amber-400" />
                },
                {
                    question: "Why do I need to provide my exact birth time down to the minute?",
                    answer: "Because this system relies on precise planetary geometry. A difference of even a few minutes can shift the house positions, making the Stellar Fortune calculation mathematically impossible or inaccurate.",
                    icon: <FiClock className="text-blue-400" />
                },
                {
                    question: "Does this system work for all languages and cultures?",
                    answer: "Yes. Mathematics knows no language. We have reverse-engineered and verified this system against hundreds of global billionaires from the USA to China. The 3rd + 11th Sextile Alignment remains the gold standard for success across the globe.",
                    icon: <FiTrendingUp className="text-green-400" />
                }
            ]
        },
        {
            title: "Personal & Nicknames",
            icon: <FiUsers className="text-purple-400" />,
            items: [
                {
                    question: "Do I have to legally change my name for this to work?",
                    answer: "Not necessarily. According to the Law of Cosmic Resonance, the universe responds to the sound that is most frequently used. If you use a Stellar Fortune Nickname and it is used by others 10 times more frequently than your legal name, your destiny vibration will shift to align with that new nickname.",
                    icon: <FiCheckCircle className="text-amber-400" />
                },
                {
                    question: "I am over 40. Is it too late to get a Stellar Nickname?",
                    answer: "It is never too late to improve your vibration, but our research shows that results are most potent and rapid for individuals under the age of 40. After 40, karmic patterns become more rigid, though positive shifts are still very much possible.",
                    icon: <FiClock className="text-blue-400" />
                }
            ]
        },
        {
            title: "Business & Results",
            icon: <FiTrendingUp className="text-purple-400" />,
            items: [
                {
                    question: "What is the success rate of businesses using Stellar Fortune Names?",
                    answer: "Based on 27 years of data, businesses using our system show an 80% success rate for achieving stability and profit. Approximately 30% of those businesses achieve explosive, market-dominating success.",
                    icon: <FiTrendingUp className="text-green-400" />
                },
                {
                    question: "Can a good business name overcome a bad personal name?",
                    answer: "A powerful business name like \"Apple\" can create immense wealth, as seen in the case of Steve Jobs. However, if your personal name is dissonant, it can act as a \"bottleneck\" to your health or personal enjoyment of that success. For ultimate results, we recommend aligning both.",
                    icon: <FiShield className="text-amber-400" />
                },
                {
                    question: "Are there any cases where a Stellar Fortune Name might fail?",
                    answer: "Yes, in approximately 20% of cases. Failures usually occur if the business industry fundamentally contradicts the owner's birth chart, or if the business was launched during a prohibited astrological period of the owner's life. We advise checking these factors before finalize your brand.",
                    icon: <FiStar className="text-red-400" />
                }
            ]
        },
        {
            title: "Service & Delivery",
            icon: <FiPackage className="text-purple-400" />,
            items: [
                {
                    question: "What is the difference between the \"Galaxy Naming\" and \"Self-Naming\" packages?",
                    answer: "In the Galaxy Naming Package, our experts calculate and provide ready-to-use names for you. In the Self-Naming (Cosmic Validator) Package, we provide you with your specific \"Stellar Key Letters,\" and you generate names using AI or your own creativity, which we then audit for accuracy.",
                    icon: <FiPackage className="text-blue-400" />
                },
                {
                    question: "How do I introduce my new Stellar Nickname to people?",
                    answer: "You can introduce it through social media, or even host a small party to announce your new nickname to friends and family. The goal is to make the new vibration the dominant sound people associate with you.",
                    icon: <FiUsers className="text-green-400" />
                },
                {
                    question: "How long will it take to receive my names after payment?",
                    answer: "We prioritize precision and quality. You will receive your customized Stellar Fortune Name Report (PDF) within 48 to 72 hours (2 to 3 days) after your payment is confirmed.\n\nNote: For Self-Naming packages, the 48-72 hour window begins once you submit your list of selected names to our experts for auditing.",
                    icon: <FiClock className="text-amber-400" />
                }
            ]
        },
        {
            title: "Customer Experience",
            icon: <FiShield className="text-purple-400" />,
            items: [
                {
                    question: "What if I don't like the names suggested by Galaxy NameLab?",
                    answer: "While our experts select names with the highest cosmic resonance, personal preference varies. To solve this, we offer Self-Naming (Cosmic Validator) Packages. These allow you to propose names based on our \"Stellar Key Letters,\" which we then audit and certify for you.\n\nExpert Tip: If you are highly selective about your name's style or sound, we strongly recommend starting with a Self-Naming Package from the beginning.",
                    icon: <FiShield className="text-amber-400" />
                }
            ]
        },
        {
            title: "Impact & Applications",
            icon: <FiTrendingUp className="text-purple-400" />,
            items: [
                {
                    question: "Are Stellar Nicknames only for social interactions?",
                    answer: "Absolutely not. While they improve your social charisma, their primary function in our system is to boost your financial vibration and career growth. This service is highly effective for:\n• Entrepreneurs & Business Owners\n• Content Creators & Social Media Influencers\n• Gamers & Public Personalities\n• Anyone looking to generate high-income results through their personal brand.",
                    icon: <FiStar className="text-purple-400" />
                }
            ]
        },
        {
            title: "The Discovery Tool",
            icon: <FiCheckCircle className="text-purple-400" />,
            items: [
                {
                    question: "Can I check if my current name or business name is already a Stellar Fortune Name?",
                    answer: "Yes, we offer this service for FREE! We understand that some individuals are naturally aligned with cosmic success.\n\nHow to Check: Simply Log In to our website and send your current name and birth details through our Chat Box. Our experts will provide a preliminary audit at no cost.\n\nLimit: This free audit is limited to one current name per person. Discover today if you are already vibrating at a billionaire frequency!",
                    icon: <FiCheckCircle className="text-green-400" />
                }
            ]
        }
    ];

    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />

            {/* Hero Section */}
            <section className="relative w-full min-h-screen flex flex-col items-center justify-start text-center bg-primary-950 text-primary-50 overflow-hidden px-4 py-12">
                {/* Background Blobs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply blur-3xl opacity-20"
                    animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600 rounded-full mix-blend-multiply blur-3xl opacity-15"
                    animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
                />

                {/* Page Title */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.1}
                    className="w-full max-w-5xl mb-12 mt-10 bg-primary-900/50 backdrop-blur-md rounded-3xl p-8 border border-primary-800 shadow-2xl"
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-amber-600 to-purple-600">
                        Frequently Asked Questions
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white">
                        Everything You Need to Know
                    </h2>
                    <p className="text-xl text-white leading-relaxed max-w-4xl mx-auto">
                        Find answers to common questions about our Stellar Fortune Naming System, services, and the cosmic principles behind our work.
                    </p>
                </motion.div>

                {/* FAQ Content */}
                <div className="w-full max-w-6xl mx-auto space-y-8">
                    {faqCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.2 + categoryIndex * 0.1}
                            className="bg-primary-900/30 backdrop-blur-md rounded-3xl p-8 border border-primary-700/50 shadow-xl"
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-purple-900/50 rounded-2xl border border-purple-700/50">
                                    {category.icon}
                                </div>
                                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">
                                    {category.title}
                                </h3>
                            </div>

                            {/* FAQ Items */}
                            <div className="space-y-4">
                                {category.items.map((item, itemIndex) => {
                                    const itemKey = `${category.title}-${itemIndex}`;
                                    const isOpen = openItems[itemKey] || false;

                                    return (
                                        <motion.div
                                            key={itemIndex}
                                            className="bg-primary-800/30 rounded-2xl border border-primary-700/50 overflow-hidden"
                                            initial={false}
                                            animate={{
                                                borderColor: isOpen ? 'rgb(251 191 36 / 0.5)' : 'rgb(147 51 234 / 0.3)'
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <button
                                                onClick={() => toggleItem(category.title, itemIndex)}
                                                className="w-full p-6 flex items-start gap-4 text-left hover:bg-primary-800/50 transition-colors duration-300"
                                            >
                                                <div className="flex-shrink-0 mt-1">
                                                    {item.icon || <FiStar className="text-purple-400" />}
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="text-xl font-semibold text-white mb-2">
                                                        {item.question}
                                                    </h4>
                                                </div>
                                                <div className="flex-shrink-0 mt-1">
                                                    {isOpen ? (
                                                        <FiChevronUp className="text-amber-400 text-xl" />
                                                    ) : (
                                                        <FiChevronDown className="text-purple-400 text-xl" />
                                                    )}
                                                </div>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-6 pb-6 pl-[4.5rem]">
                                                            <AnswerContent content={item.answer} />
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={1.0}
                    className="w-full max-w-4xl mx-auto mt-16 mb-8"
                >
                    <div className="bg-gradient-to-r from-purple-900/50 to-amber-900/50 backdrop-blur-md rounded-3xl p-8 border border-purple-700/50 shadow-xl text-center">
                        <h3 className="text-3xl font-bold text-white mb-4">
                            Still Have Questions?
                        </h3>
                        <p className="text-xl text-primary-200 mb-6">
                            Our cosmic experts are here to help guide you on your journey to stellar success.
                        </p>
                    </div>
                </motion.div>
            </section>
        </PageWrapper>
    );
};

export default FAQPage;