// src/pages/insights/InsightPage.tsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiStar,
    FiTrendingUp,
    FiAward,
    FiTarget,
    FiZap,
    FiCompass,
    FiGlobe,
    FiHeart,
    FiAlertTriangle,
    FiShield,
    FiChevronDown,
    FiChevronUp,
    FiFilter,
    FiSearch,
    FiUser,
    FiBriefcase,
    FiActivity
} from 'react-icons/fi';

import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import Section from '@components/ui/Section';

// Import images using dynamic imports
const elonMuskImage = '/elon_musk.jpg';
const jeffBezosImage = '/jeff_bezos.jpg';
const billGatesImage = '/bill_gates.jpg';
const taylorSwiftImage = '/taylor_swift.jpg';
const michaelJacksonImage = '/michael_jackson.jpg';
const steveJobsImage = '/steve_jobs.jpg';
const michaelDellImage = '/michael_dell.jpg';
const larryPageImage = '/larry_page.jpg';
const sergeyBrinImage = '/sergey_brin.jpg';
const markZuckerbergImage = '/mark_zukerberg.jpg';
const zhangYimingImage = '/zhang_yiming.jpg';
const timCookImage = '/tim_cook.jpg';
const maoZedongImage = '/mao_zedong.jpg';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: (delay = 0) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, delay, ease: "easeOut" },
    }),
};

const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: (delay = 0) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, delay, ease: "easeOut" },
    }),
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (delay = 0) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, delay, ease: "easeOut" },
    }),
};

// Comprehensive billionaire data with detailed analysis
const billionaires = [
    {
        name: "Elon Musk",
        title: "The Architect of the Future",
        entities: "Tesla, SpaceX, X",
        netWorth: "$460.4 Billion (Nov 2025 Estimate)",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: elonMuskImage,
        color: "from-blue-600 to-purple-700",
        category: "tech",
        analysis: {
            blueprint: {
                title: "The Cosmic Blueprint",
                content: "Elon Musk is not just hard-working; he is mathematically designed to work hard.",
                details: [
                    "The Engine of Effort: Born under the Capricorn Ascendant, his chart ruler is Saturn. Interestingly, Saturn resides in the 3rd House—the specific sector of courage, enterprise, and tireless effort. This placement dictates a personality that views 'work as life.'",
                    "The Exalted Amplifier: The planet Jupiter sits in its Exalted Position (Highest Dignity) and casts a direct aspect on Saturn. In cosmic mechanics, this means his massive efforts (Saturn) are constantly expanded and blessed by the planet of fortune (Jupiter)."
                ]
            },
            name: {
                title: "Name Analysis: 'ELON MUSK'",
                content: "When we decode the acoustic vibration of his name, we see a perfect alignment with his chart.",
                details: [
                    "Planetary Sequence: Sun + Mercury + Jupiter + Mars.",
                    "The Geometric Lock: Every segment of his name, from start to finish, forms the 'Sextile Alignment' (3rd + 11th House connection).",
                    "The Result: This creates a Grade A++ Stellar Fortune Name. It is a name that converts 'Idea' (3rd House) into 'Wealth' (11th House) without friction."
                ]
            },
            companies: {
                title: "The Empire Analysis: His Business Names",
                subtitle: "Is it a coincidence that his companies dominate the world? The math says no.",
                details: [
                    {
                        name: "TESLA",
                        vibration: "Saturn + Mars + Mercury",
                        analysis: "The sounds interact in a perfect 3rd + 11th Sextile Chain. This alignment grants the brand resilience (Saturn) and rapid innovation (Mars/Mercury)."
                    },
                    {
                        name: "SPACEX",
                        vibration: "Mars + Jupiter + Mars",
                        analysis: "A high-energy combination. Mars (Action) and Jupiter (Expansion) form the Golden Sextile. This allows the company to conquer aggressive frontiers like space."
                    },
                    {
                        name: "X (Formerly Twitter)",
                        vibration: "Sun + Mars",
                        analysis: "When he rebranded Twitter to 'X,' he unknowingly shifted the vibration to a Sun + Mars alignment. Once again, this falls perfectly into the 3rd + 11th Stellar Fortune structure."
                    }
                ]
            },
            conclusion: "Elon Musk represents the ultimate synchronization of Cosmic Blueprint (Birth Chart) and Stellar Fortune Names. When a relentless destiny meets a harmonized name, the result is not just success—it is history."
        }
    },
    {
        name: "Jeff Bezos",
        title: "The Master of Commerce",
        entities: "Amazon",
        netWorth: "$241.5 Billion (Nov 2025 Estimate)",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: jeffBezosImage,
        color: "from-orange-600 to-amber-700",
        category: "tech",
        analysis: {
            blueprint: {
                title: "The Cosmic Blueprint",
                content: "Jeff Bezos operates on a different cosmic frequency. His chart reveals the engine behind his relentless expansion.",
                details: [
                    "The Capricorn Titan: Like Elon Musk and Mark Zuckerberg, Bezos is also a Capricorn Ascendant. This confirms a pattern: Capricorns are natural empire builders.",
                    "The Wealth Vision: His 2nd Lord (Saturn) sits in the 9th House and casts a special aspect on the 11th House (Gains) and Mars. This creates a 'Dhana Yoga' that connects 'Wealth' with 'Divine Luck.'",
                    "The Fortuner: His Fortuner Planet aligns with Mars in the 11th House (Scorpio), signaling massive financial victories."
                ]
            },
            name: {
                title: "Name Analysis: 'JEFF BEZOS'",
                content: "Here we find a fascinating deviation from the norm. Jeff Bezos carries the 'Rare Trine Structure.'",
                details: [
                    "The Full Name Vibration (J+F+Z): Moon + Jupiter + Mars.",
                    "The Trine Phenomenon: The connection between Moon (J) and Mars (Z) forms a 5th + 9th Trine Alignment. While 90% of billionaires use the Sextile (3+11), Bezos belongs to the rare 10% who utilize the Trine energy. This energy represents 'Divine Creativity and Luck.'",
                    "The 'Bezos' Power: However, his last name 'Bezos' (Jupiter + Mars) specifically locks into the classic 3rd + 11th Sextile. This gives him the best of both worlds: Creative Luck (Trine) and Hard Work/Gains (Sextile)."
                ]
            },
            companies: {
                title: "The Empire Analysis: 'AMAZON'",
                subtitle: "While his personal name is a rare hybrid, his company name is a Pure Sextile Machine.",
                details: [
                    {
                        name: "AMAZON",
                        vibration: "Sun (A) + Jupiter (M) + Mars (Z).",
                        analysis: "The planets Sun, Jupiter, and Mars form a perfect 3rd + 11th Sextile Chain in his chart. The Outcome: This alignment is designed for Velocity and Scale. Just like the Amazon river, the vibration of this name ensures flow, volume, and endless expansion."
                    }
                ]
            },
            conclusion: "Jeff Bezos proves that there is more than one path to the top. By combining the Rare Trine (Creativity) in his personal name with the Powerful Sextile (Execution) in his business name, he built a global infrastructure that changed how the world shops."
        }
    },
    {
        name: "Bill Gates",
        title: "The Phenomenon of Double Resonance",
        entities: "Microsoft",
        netWorth: "$104.5 Billion (Nov 2025 Estimate)",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: billGatesImage,
        color: "from-cyan-600 to-blue-700",
        category: "tech",
        analysis: {
            blueprint: {
                title: "The Cosmic Blueprint",
                content: "Bill Gates is a prime example of 'Destiny Engineering.' His chart reveals why he became the richest man in the world for decades.",
                details: [
                    "The Cancer Ascendant: He is born under the sign of Cancer.",
                    "The Wealth Exchange (Parivartana): There is a rare and powerful 'Energy Exchange' in his chart. The Moon (Lord of Self/1st House) and Venus (Lord of Gains/11th House) have swapped positions. In cosmic science, this creates an infinite loop of wealth generation.",
                    "The Luck Factor: His 'Fortuner Planet' stands strong in the 9th House (The House of Fortune), further amplifying his grade to A++."
                ]
            },
            name: {
                title: "The 'Twin Vibration' Discovery",
                content: "Here is where Galaxy NameLab's research uncovers a stunning secret: His Name and his Company Name act as 'Cosmic Twins.' They carry the exact same planetary vibration.",
                details: [
                    "Personal Name: 'BILL GATES' - Vibration: Jupiter (B) + Moon (G) + Mars (S). This sequence forms the classic 3rd + 11th Sextile Alignment. Specifically, Mars (S) acts as a 'Raja Yoga' (King-Maker) planet for his chart, giving him aggressive power in business.",
                    "Company Name: 'MICROSOFT' - Vibration: Jupiter (M) + Moon (C/r) + Mars (S). Notice the pattern? It is identical to his personal name (Jupiter + Moon + Mars)."
                ]
            },
            companies: {
                title: "The Double Engine Effect",
                subtitle: "Most successful people have either a good personal name or a good business name. Bill Gates has BOTH, and they are structurally identical.",
                details: [
                    {
                        name: "SYNCHRONIZATION",
                        vibration: "Identical Vibrations",
                        analysis: "Because the vibrations match perfectly, there is zero friction between the founder and the company. The company becomes a direct extension of his soul."
                    },
                    {
                        name: "THE RESULT",
                        vibration: "Double Stellar Fortune",
                        analysis: "This 'Double Stellar Fortune Name' phenomenon powered Microsoft to dominate the software industry and generated a personal net worth of over $104.5 Billion."
                    }
                ]
            },
            conclusion: "Bill Gates teaches us the power of 'Total Alignment.' When your personal name and your business name sing the same cosmic song, and that song aligns with your birth chart, success is not just possible—it is inevitable."
        }
    },
    {
        name: "Taylor Swift",
        title: "The Icon of Fame",
        entities: "Global Music Icon",
        netWorth: "$1.6 Billion (Nov 2025 Estimate)",
        grade: "⭐⭐⭐⭐ (4-Star / Grade A+)",
        image: taylorSwiftImage,
        color: "from-purple-600 to-pink-700",
        category: "entertainment",
        analysis: {
            blueprint: {
                title: "The Billionaire Anomaly",
                content: "Taylor Swift proves a vital rule: You don't need a 'Perfect 5-Star Chart' to be a Billionaire.",
                details: [
                    "The Sagittarius Artist: Born under the Sagittarius Ascendant, her chart ruler Jupiter sits directly on the Ascendant. This gives her massive optimism and expansion energy.",
                    "The Fame Engine: The key to her success lies in the 10th House (Career/Fame). Her Fortuner Planet resides here, granting her unstoppable popularity and a connection with the public that few can match."
                ]
            },
            name: {
                title: "Name Analysis: 'TAYLOR SWIFT'",
                content: "Even with a slightly less powerful chart compared to Elon Musk, her Name Vibration elevates her to the top.",
                details: [
                    "Planetary Sequence: Saturn (T) . . . . Mars (S).",
                    "The Geometric Lock: The name starts with Saturn (T). In her chart, Saturn is the 3rd Lord (Arts/Effort) placed in the 9th House (Fortune). It ends with Mars (S), placed in the 11th House (Gains). The Aspect: Saturn (from the 9th) casts a direct aspect onto Mars (in the 11th).",
                    "The Result: This creates a powerful 3rd + 9th + 11th Circuit. 3rd (Art) connects to 9th (Luck) which connects to 11th (Massive Wealth)."
                ]
            },
            companies: {
                title: "The 'Stellar Fortune' Verdict",
                subtitle: "Grade A+ (4-Star): Unlike the 'Titans' (Musk/Bezos) who have rare 5-Star charts, Taylor Swift represents the Grade A+ category.",
                details: [
                    {
                        name: "THE LESSON",
                        vibration: "Power of Alignment",
                        analysis: "This proves that if your name forms the Sextile Alignment (3rd + 11th)—as 'Taylor Swift' does—you can override minor weaknesses in your chart and achieve billionaire status."
                    }
                ]
            },
            conclusion: "Taylor Swift is the beacon of hope for everyone. She shows that with the right Stellar Fortune Name, talent transforms into empire, and a singer becomes a billionaire. Grade A+ is powerful enough to rule the world."
        }
    },
    {
        name: "Michael Jackson",
        title: "The Tragic King",
        entities: "The King of Pop",
        netWorth: "~$1 Billion (Career Earnings), left with ~$500M Debt at death.",
        grade: "⭐⭐⭐ (3-Star / Flawed Structure)",
        image: michaelJacksonImage,
        color: "from-gray-600 to-slate-700",
        category: "entertainment",
        analysis: {
            blueprint: {
                title: "The Star of Fame",
                content: "Why did he become the most famous person on the planet? The stars show a 'Fame Engine.'",
                details: [
                    "The Taurus Icon: Born under the Taurus Ascendant, his Lagna Lord (Venus) sits directly in the Ascendant.",
                    "The Raja Yoga: Saturn (the most powerful Yogakaraka planet for Taurus) joins Venus in the 1st House. This combination creates a massive 'Raja Yoga' (King-Maker), granting him undeniable charisma and talent.",
                    "The Fame Peak: His Fortuner Planet resides in the 10th House (Aquarius)—the House of Reputation. This placement guarantees global superstardom."
                ]
            },
            name: {
                title: "Name Analysis: 'MICHAEL JACKSON'",
                content: "This is where the story turns tragic. His name is a 'Deceptive Trap.'",
                details: [
                    "The Good (The Outer Shell): Sequence: Jupiter (M) . . . . Mars (S/n). Analysis: If we look only at the first and last sounds, it forms a 3rd + 11th Sextile. This gave him the 'King of Pop' title and initial massive wealth.",
                    "The Bad (The Internal Poison): The Defect: Inside the name, the sub-components form a destructive '2nd + 12th Alignment' (Dwirdwadasha). 'Michael' (Jupiter + Moon) and 'Jackson' (Moon + Mars) create friction.",
                    "The Cosmic Meaning: In cosmic science, the 2nd House represents 'Accumulation,' but the 12th House represents 'Loss and Exit.' When these two energies lock together, they create a 'Leaking Bucket Effect.'"
                ]
            },
            companies: {
                title: "The Consequence: Glory and Ruin",
                subtitle: "Because of this internal '2nd + 12th Flaw,' Michael Jackson could not hold onto his blessings.",
                details: [
                    {
                        name: "FINANCIAL RUIN",
                        vibration: "Leaking Bucket Effect",
                        analysis: "Despite earning billions, he died with $500 million in debt. The '12th House Energy' forced the money to flow out as fast as it came in."
                    },
                    {
                        name: "SHORTENED LIFE",
                        vibration: "12th House Effect",
                        analysis: "The 12th House also rules 'Exit from the physical plane.' The destructive vibration attacked his vitality, leading to his premature departure at age 50."
                    }
                ]
            },
            conclusion: "Michael Jackson's case teaches us a critical lesson: A 'Good Looking' name is not enough. Even if the outer frame is strong, hidden internal conflicts can drain your success and life force. True Stellar Fortune Names must be flawless inside and out."
        }
    },
    {
        name: "Steve Jobs",
        title: "The Paradox of Genius",
        entities: "Apple, iPhone, iOS",
        netWorth: "$8.3 Billion (at time of death in 2011)",
        grade: "⚠️ CRITICAL MISMATCH (Dissonant Structure)",
        image: steveJobsImage,
        color: "from-slate-600 to-gray-800",
        category: "tech",
        analysis: {
            blueprint: {
                title: "The Observation: A Cosmic Mystery",
                content: "Steve Jobs presents a fascinating anomaly. He built the most valuable company on earth, yet his personal life was plagued by health struggles, and he left the world prematurely at the age of 56.",
                details: [
                    "Why? The answer lies in the conflict between his Stellar Business Name and his Destructive Personal Name."
                ]
            },
            name: {
                title: "Personal Name Analysis: 'STEVE JOBS'",
                content: "Unlike Elon Musk, Steve Jobs did NOT possess a Stellar Fortune Name. In fact, his name carried a dangerous vibration known in cosmic science as a 'Dusthana' or '8th House Trap.'",
                details: [
                    "Planetary Sequence: Mars + Saturn + Moon + Mars",
                    "The Fatal Geometric Flaw: The name starts and ends with Mars (S). In his chart, Mars sits in the 5th House but casts a full, powerful aspect directly into the 8th House (Scorpio)—the sector of crisis, chronic illness, and endings.",
                    "The Saturn Connection: To make matters worse, Saturn resides in that exact 8th House. His name essentially 'activated' this sector of suffering every time it was spoken."
                ]
            },
            companies: {
                title: "The Empire Analysis: 'APPLE' & 'iPhone'",
                subtitle: "If his personal name was destructive, why did he succeed? Because his Business Names were cosmically perfect.",
                details: [
                    {
                        name: "APPLE",
                        vibration: "Sun (A) + Jupiter (P)",
                        analysis: "This creates the legendary 3rd + 11th Sextile Alignment. The Sun (Glory) combined with Jupiter (Expansion) creates unstoppable growth."
                    },
                    {
                        name: "iOS Platform",
                        vibration: "Sun + Mars",
                        analysis: "Another 3rd + 11th Alignment. This explains why the software ecosystem became globally dominant."
                    }
                ]
            },
            conclusion: "Steve Jobs' life proves a critical rule: A great birth chart alone is not enough. His Chart & Business Name pushed him to the peak of success, but his Personal Name anchored him in crisis and cut his journey short. He planted the tree of wealth (Apple) but, due to his '8th House Name,' he could not stay long enough to fully enjoy its shade."
        }
    },
    {
        name: "Michael Dell",
        title: "The Pioneer of Personal Branding",
        entities: "Dell Technologies",
        netWorth: "$146.5 Billion (Nov 2025 Estimate)",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: michaelDellImage,
        color: "from-green-600 to-teal-700",
        category: "tech",
        analysis: {
            blueprint: {
                title: "The Cosmic Blueprint",
                content: "Michael Dell's chart reveals the DNA of a tech giant who builds things to last.",
                details: [
                    "The Virgo Analyst: Born under the Virgo Ascendant, he possesses natural analytical precision.",
                    "The Wealth Yoga: His chart features a powerful 'Dhana Yoga' (Wealth Combination). Venus (Lord of the 2nd and 9th Houses) sits in the 11th House (Gains) and forms a Sextile aspect with Mars (Lord of the 3rd House). This planetary geometry signifies massive accumulated wealth derived from enterprise.",
                    "The Fortuner: Ideally placed, his Fortuner Planet resides in the 11th House (Cancer) alongside Venus, ensuring that his ambitions always result in financial success."
                ]
            },
            name: {
                title: "Personal Name Analysis: 'MICHAEL DELL'",
                content: "",
                details: [
                    "Planetary Sequence: Jupiter (M) + Moon (Ch) + Saturn (D).",
                    "The Alignment: The first letter (Jupiter) and the last letter (Saturn) create a perfect 3rd + 11th Sextile Alignment.",
                    "Analysis: This vibration connects 'Wisdom' (Jupiter) with 'Structure/Endurance' (Saturn), allowing him to build a business empire that withstands the test of time."
                ]
            },
            companies: {
                title: "The Brand Synergy: 'DELL' & 'DELL TECHNOLOGIES'",
                subtitle: "Using one's own last name as a brand is risky—unless it is a Stellar Fortune Name. Michael Dell took that risk, and the stars rewarded him.",
                details: [
                    {
                        name: "DELL TECHNOLOGIES (Corporate Name)",
                        vibration: "Saturn (D) + Saturn (T) + Mars (S).",
                        analysis: "All three planets form a robust 3rd + 11th Sextile Alignment. This structure ensures that the corporation remains stable and aggressive in the market."
                    },
                    {
                        name: "DELL (Brand Name)",
                        vibration: "Saturn (D)",
                        analysis: "The Saturn Factor: The name 'Dell' is ruled by Saturn (D), which sits in the 3rd House (Effort/Enterprise) of his chart. The Connection: Its dispositor planet (Mars) is positioned 11 houses away from Saturn. This creates the signature 3rd + 11th Stellar Fortune loop, turning the name 'Dell' into a money-making machine."
                    }
                ]
            },
            conclusion: "Michael Dell's success story is a masterclass in 'Identity Alignment.' Because his personal name, his company name, and his brand name all carry the same Stellar Fortune vibration, he has maintained his position as one of the world's top billionaires for decades."
        }
    },
    {
        name: "Larry Page",
        title: "The Architect of Information",
        entities: "Google, YouTube",
        netWorth: "$265 Billion (Nov 2025 Estimate)",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: larryPageImage,
        color: "from-blue-600 to-indigo-700",
        category: "tech",
        analysis: {
            blueprint: {
                title: "The Cosmic Blueprint",
                content: "Larry Page's chart explains why he didn't just build a company; he built the 'Brain of the Internet.'",
                details: [
                    "The Cancer Ascendant: He is born under the sensitive and intuitive sign of Cancer.",
                    "The Exalted Wisdom (Hamsa Yoga): This is the game-changer. His 9th Lord (Jupiter) is Exalted and sits directly on his Ascendant, conjunct with his Ascendant Lord (Moon). Cosmic Meaning: Jupiter represents 'Knowledge and Expansion.' Having an Exalted Jupiter on the self signifies a destiny to organize the world's knowledge.",
                    "The Fortuner: His Fortuner Planet resides in the 11th House (House of Gains), ensuring his knowledge leads to massive wealth."
                ]
            },
            name: {
                title: "Personal Name Analysis: 'LARRY PAGE'",
                content: "",
                details: [
                    "Planetary Sequence: Mercury (L) + Mercury (R) + Jupiter (P) + Moon (G).",
                    "The Vibration: Mercury (Communication/Data) + Jupiter (Expansion) + Moon (Public).",
                    "The Alignment: The first and last sounds of his name lock into the powerful 3rd + 11th Sextile Alignment.",
                    "Analysis: This name is perfectly engineered for a tech visionary. It connects the 'effort of communication' (3rd House) with 'massive gains' (11th House)."
                ]
            },
            companies: {
                title: "The Empire Analysis: 'GOOGLE' & 'YOUTUBE'",
                subtitle: "His companies are household names because they carry the vibration of 'Luminaries' (Sun/Moon/Jupiter).",
                details: [
                    {
                        name: "GOOGLE",
                        vibration: "Moon + Moon.",
                        analysis: "The Connection: The name aligns with the Exalted Jupiter and the 11th Lord (Venus) in his chart. The Result: Because the name activates his Exalted Jupiter (Wisdom), Google became the ultimate source of answers for humanity."
                    },
                    {
                        name: "YOUTUBE",
                        vibration: "Mercury + Moon.",
                        analysis: "The Connection: This forms the classic 3rd + 11th Stellar Fortune Alignment. The Result: Mercury (Video/Media) connected to Moon (Public/Masses) allowed YouTube to dominate global video culture."
                    }
                ]
            },
            conclusion: "Larry Page's success is not random. It is the result of a 'High-Wisdom Chart' (Exalted Jupiter) powered by 'Stellar Fortune Names.'"
        }
    },
    {
        name: "Sergey Brin",
        title: "The Perfect Co-Pilot",
        entities: "Google, YouTube",
        netWorth: "$244 Billion (Nov 2025 Estimate)",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: sergeyBrinImage,
        color: "from-purple-600 to-blue-700",
        category: "tech",
        analysis: {
            blueprint: {
                title: "The Cosmic Blueprint",
                content: "If Larry Page is the 'Architect,' Sergey Brin is the 'Powerhouse.' His chart is built for massive wealth and authority.",
                details: [
                    "The Leo Commander: Born under the Leo Ascendant, he has a natural royal presence.",
                    "The Wealth Magnet: His chart features a powerful conjunction of Mars (Yogakaraka/Power Planet) and Mercury (Lord of Wealth) sitting directly on his Ascendant. This creates both a 'Raja Yoga' (Power) and 'Dhana Yoga' (Wealth) right at the core of his identity.",
                    "The Fortuner: His Fortuner Planet is locked in the 11th House (Gains) alongside the Moon, ensuring that his efforts always multiply in value."
                ]
            },
            name: {
                title: "Name Analysis: 'SERGEY BRIN'",
                content: "While most billionaires have one 'Stellar Alignment' in their name, Sergey Brin has TWO. His name works like a dual-core engine.",
                details: [
                    "Part 1: 'SERGEY' (S+G) - Vibration: Mars + Moon. Alignment: This forms the first 3rd + 11th Sextile Pair.",
                    "Part 2: 'BRIN' (B+R) - Vibration: Jupiter + Rahu. Alignment: This forms the second 3rd + 11th Sextile Pair.",
                    "Analysis: Having two distinct Sextile locks in a single name is incredibly rare. It suggests a destiny capable of handling double the pressure and generating double the impact."
                ]
            },
            companies: {
                title: "The Corporate Synergy: 'GOOGLE' & 'YOUTUBE'",
                subtitle: "The partnership between Larry Page and Sergey Brin is mathematically perfect. Both founders possess Grade A++ names that align with their company.",
                details: [
                    {
                        name: "GOOGLE",
                        vibration: "Moon + Moon",
                        analysis: "The name aligns with his 11th Lord (Mercury), which aspects his 3rd House. This creates a loop of 'Gains connected to Effort.'"
                    },
                    {
                        name: "YOUTUBE",
                        vibration: "Mercury + Moon.",
                        analysis: "Another classic 3rd + 11th Sextile. It perfectly matches the vibration of his first name 'Sergey' (Mars/Moon energy)."
                    }
                ]
            },
            conclusion: "What are the odds of two Stanford students meeting, both having Leo/Cancer strong charts, and both carrying rare Stellar Fortune Names? Virtually zero. Yet, it happened. Sergey Brin's case confirms that great empires are not built by solo stars alone, but by Constellations of Success."
        }
    },
    {
        name: "Mark Zuckerberg",
        title: "The Social Architect",
        entities: "Facebook, Meta",
        netWorth: "$218 Billion (Nov 2025 Estimate)",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: markZuckerbergImage,
        color: "from-blue-600 to-cyan-700",
        category: "tech",
        analysis: {
            blueprint: {
                title: "The Rare Cosmic Geometry",
                content: "Mark Zuckerberg achieved billionaire status at a remarkably young age. Was it luck? No, it was a geometric anomaly in his birth chart.",
                details: [
                    "The Capricorn Builder: Born under the Capricorn Ascendant, he possesses the relentless drive of Saturn.",
                    "The Royal Combination: His Lagna Lord (Saturn) sits in the 2nd House (Wealth) combined with Mars and Venus. This creates a powerful 'Raja Yoga' and 'Dhana Yoga' (Royal Combination for Wealth).",
                    "The Rare 3rd + 11th Lock: Here is the unique factor: His 3rd House Lord (Jupiter) and 11th House Lord (Mars) are positioned in a perfect Sextile Alignment by placement. Note: It is statistically very rare for these two planets to be aligned both by ownership and physical placement. This structure indicates 'Unstoppable Success'.",
                    "The Fortuner: His Fortuner Planet resides in the 11th House (Scorpio), ensuring that every ambition leads to fulfillment."
                ]
            },
            name: {
                title: "Personal Name Analysis: 'MARK ZUCKERBERG'",
                content: "His personal name is a direct acoustic reflection of his rare chart structure.",
                details: [
                    "Planetary Sequence: Jupiter (M) + Mars (Z) + Moon (K) + Jupiter (B).",
                    "The Vibration: The name is dominated by the Jupiter + Mars combination.",
                    "Analysis: This perfectly mirrors his chart's rare '3rd Lord + 11th Lord' alignment. His name literally sings the song of his 'Rare Geometry.'"
                ]
            },
            companies: {
                title: "The Evolution Analysis: 'FACEBOOK' to 'META'",
                subtitle: "Many companies fail after rebranding. Why did Zuckerberg survive and thrive? Because he swapped one Stellar Fortune Name for another.",
                details: [
                    {
                        name: "FACEBOOK",
                        vibration: "Jupiter + Mars + Jupiter.",
                        analysis: "Identical to his birth chart. A pure 3rd + 11th Sextile Alignment. This name laid the foundation of his empire."
                    },
                    {
                        name: "META",
                        vibration: "Jupiter (M) + Saturn (T).",
                        analysis: "When analyzed against his Capricorn chart, the Jupiter + Saturn combination forms another powerful 3rd + 11th Alignment. The Result: The transition was scientifically sound. Whether it is Facebook or Meta, the vibration remains locked in the 'Stellar Fortune' zone, protecting his $218 Billion net worth."
                    }
                ]
            },
            conclusion: "Mark Zuckerberg represents the 'Architect archetype.' His chart provided a rare geometric blueprint, and he (consciously or unconsciously) built his entire identity—his name, his first company, and his rebranded company—strictly adhering to that blueprint. Consistency is the key to his empire."
        }
    },
    {
        name: "Zhang Yiming",
        title: "The Algorithm of Destiny",
        entities: "ByteDance, TikTok",
        netWorth: "$69.3 Billion (Nov 2025 Estimate)",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: zhangYimingImage,
        color: "from-red-600 to-pink-700",
        category: "tech",
        analysis: {
            blueprint: {
                title: "The Eastern Dragon",
                content: "Within just 20 years of China's market opening, many billionaires emerged. But Zhang Yiming stands out because his rise was 'Algorithmically' fast.",
                details: [
                    "The Sagittarius Visionary: Born under the Sagittarius Ascendant, he is ruled by Jupiter (Expansion).",
                    "The Wealth Loop (Parivartana Yoga): His chart reveals a spectacular 'Exchange of Signs' between his Lagna Lord (Jupiter) and the Energy Planet (Mars). The Setup: Jupiter (Growth) sits in the 11th House (Gains). The Result: This creates a perpetual energy loop where 'Personal Growth' translates directly into 'Massive Gains.'",
                    "The Fortuner: His Fortuner Planet aligns with Jupiter in the 11th House (Libra), doubling the luck factor."
                ]
            },
            name: {
                title: "Personal Name Analysis: 'ZHANG YIMING'",
                content: "",
                details: [
                    "Planetary Sequence: Mars + Mercury + Jupiter.",
                    "The Cosmic Mirror: The name starts with Mars (Z) and ends with Jupiter (M/ng).",
                    "Analysis: This effectively mimics the 'Mars-Jupiter Exchange' in his birth chart. The name forms the powerful 3rd + 11th Stellar Fortune Alignment, proving that the laws of cosmic vibration work equally well for Eastern names."
                ]
            },
            companies: {
                title: "The Viral Empire: 'BYTEDANCE' & 'TIKTOK'",
                subtitle: "Why did TikTok conquer the world so quickly? The answer lies in the name geometry.",
                details: [
                    {
                        name: "BYTEDANCE",
                        vibration: "Jupiter (B) + Mars (D).",
                        analysis: "Just like his personal name, the parent company 'ByteDance' carries the Jupiter + Mars combination. It is a perfect Stellar Fortune Name."
                    },
                    {
                        name: "TIKTOK",
                        vibration: "3rd House Trigger",
                        analysis: "The Cosmic Connection: When he acquired the platform and rebranded it to 'TikTok,' he unknowingly activated a specific geometric code. Analysis: The name 'TikTok' acts as a 3rd House (Communication/Media) trigger that connects directly to his 11th House (Gains/Masses). The Result: This 3rd+11th connection created a 'Viral Resonance' that shook the world and generated billions in ad revenue."
                    }
                ]
            },
            conclusion: "Zhang Yiming's story confirms a universal truth: Mathematics knows no language. Whether in English or Chinese, the 3rd + 11th Alignment remains the gold standard for unlimited success. His synchronization of Name + Company + Product created a trillion-dollar impact in record time."
        }
    },
    {
        name: "Tim Cook",
        title: "The Guardian of the Galaxy",
        entities: "Apple Inc.",
        netWorth: "$2.6 Billion (Nov 2025 Estimate)",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: timCookImage,
        color: "from-gray-700 to-slate-800",
        category: "tech",
        analysis: {
            blueprint: {
                title: "The Succession Mystery",
                content: "When Steve Jobs passed away, the world worried: Could anyone replace the visionary? The answer was Tim Cook. But why him? Astrologically, he was not just a choice; he was the Perfect Stabilizer. Unlike Jobs, Tim Cook possesses a Grade A++ Stellar Fortune Name.",
                details: [
                    "The Virgo Administrator: Born under the Virgo Ascendant, Cook is naturally detail-oriented and systematic.",
                    "The Exchange of Power: His chart shows a powerful exchange between Mercury (Lord of Ascendant) and Mars (Lord of 3rd House). This creates a natural 'Sextile Energy' in his destiny, granting him the ability to execute massive operations flawlessly.",
                    "The Fortuner in the 11th: Crucially, his 'Fortuner Planet' resides in the 11th House (The House of Immense Gains). This indicates that whatever he touches turns into massive profit."
                ]
            },
            name: {
                title: "Name Analysis: 'TIM COOK'",
                content: "His name acts as a geometric anchor that stabilized Apple after the loss of its founder.",
                details: [
                    "Planetary Alignment: Saturn (T) + Moon (Co)",
                    "The 3rd + 11th Harmony: The name 'Tim Cook' forms a perfect Sextile Alignment (3rd + 11th House) relative to his chart.",
                    "The Result: While Steve Jobs' name was 'Volatile' (Creating highs and lows), Tim Cook's name is 'Stable' (Creating consistent, long-term growth)."
                ]
            },
            companies: {
                title: "The Trillion-Dollar Synergy: 'Apple' + 'Tim Cook'",
                subtitle: "Here is the most fascinating discovery: The name 'Apple' is mathematically compatible with Tim Cook's birth chart.",
                details: [
                    {
                        name: "Apple's Vibration",
                        vibration: "Sun + Jupiter.",
                        analysis: "The Alignment: This vibration falls exactly into Tim Cook's 3rd House and is viewed by his 11th Lord (Moon). The Outcome: Because of this cosmic compatibility, under his leadership, Apple's value skyrocketed to over $4.11 Trillion. He didn't just inherit the company; he was cosmically designed to scale it."
                    }
                ]
            },
            conclusion: "History shows us a clear pattern: 1. Steve Jobs (Visionary): Built the engine, but suffered personally due to a dissonant name. 2. Tim Cook (Guardian): Inherited the engine and used his Stellar Fortune Name to fly it to the moon. Alignment is not just about starting; it is about lasting."
        }
    },
    {
        name: "Mao Zedong",
        title: "The Sovereign Power",
        entities: "People's Republic of China",
        netWorth: "Establishing a Global Superpower",
        grade: "⭐⭐⭐⭐⭐ (5-Star / Grade A++)",
        image: maoZedongImage,
        color: "from-red-800 to-red-900",
        category: "politics",
        analysis: {
            blueprint: {
                title: "The Warlord's Chart",
                content: "How did one man dismantle an ancient feudal system and build a global superpower? His chart reveals the structure of 'Absolute Power.'",
                details: [
                    "The Cancer Warrior: Born under the Cancer Ascendant, his chart features Mars (the Planet of War and Energy) sitting directly on the Ascendant. Raja Yoga: For Cancer Ascendant, Mars is the 'Yogakaraka' (Best Planet). Its presence in the 1st House creates a massive 'Raja Yoga' (King-Maker Combination), giving him the spirit of an unconquerable warrior.",
                    "The Controller: His Jupiter (9th Lord) sits in Scorpio and casts a controlling aspect over both Mars and Venus (who resides in the 11th House of Masses). The Meaning: This signifies that his ideology (Jupiter) would control the military (Mars) and the masses (Venus).",
                    "The Fortuner: His Fortuner Planet resides in the 10th House (Aries), the House of Authority, ensuring his rise to the highest seat of power."
                ]
            },
            name: {
                title: "Name Analysis: 'MAO ZEDONG'",
                content: "",
                details: [
                    "Planetary Sequence: Jupiter (M) + Mars (Z) + Saturn (D).",
                    "The Trine + Sextile Chain: The name flows from Jupiter (Wisdom/Ideology) to Mars (Action) to Saturn (Endurance). Mathematically, this creates a sequence of 1st to 9th (Trine) and 9th to 3rd (Sextile) connections.",
                    "The 'Mao' and 'Dong' Lock: The most powerful connection lies between the first sound 'Mao' (Jupiter) and the last sound 'Dong' (Saturn). Analysis: These two planets form the classic 3rd + 11th Stellar Fortune Alignment. The Result: This alignment binds 'Ideology' with 'Everlasting Structure.' This explains why, even decades after his death, the People's Republic of China remains firmly under the system he built. His name didn't just build a company; it built a nation."
                ]
            },
            companies: {
                title: "Legacy Analysis",
                subtitle: "Mao Zedong's case proves that the Stellar Fortune System is not limited to commerce. It applies to Power, Politics, and History.",
                details: [
                    {
                        name: "Historical Impact",
                        vibration: "Nation Building",
                        analysis: "A name aligned with the stars can create a legacy that outlives the man himself."
                    }
                ]
            },
            conclusion: "Mao Zedong's case proves that the Stellar Fortune System is not limited to commerce. It applies to Power, Politics, and History. A name aligned with the stars can create a legacy that outlives the man himself."
        }
    }
];

// Categories for filtering
const categories = [
    { id: 'all', name: 'All Titans', icon: FiGlobe },
    { id: 'tech', name: 'Tech Giants', icon: FiZap },
    { id: 'entertainment', name: 'Entertainment', icon: FiHeart },
    // { id: 'business', name: 'Business', icon: FiBriefcase },
    { id: 'politics', name: 'Politics', icon: FiShield },
];

// Sort options
const sortOptions = [
    { id: 'netWorth', name: 'Net Worth (High to Low)' },
    { id: 'name', name: 'Name (A-Z)' },
    { id: 'grade', name: 'Grade (High to Low)' },
];

interface InsightPageProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

const InsightPage: React.FC<InsightPageProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('netWorth');
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    // Filter and sort billionaires
    const filteredAndSortedBillionaires = useMemo(() => {
        let filtered = billionaires.filter(person => {
            const matchesCategory = selectedCategory === 'all' || person.category === selectedCategory;
            const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                person.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                person.entities.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'netWorth':
                    const aWorth = parseFloat(a.netWorth.replace(/[^0-9.]/g, ''));
                    const bWorth = parseFloat(b.netWorth.replace(/[^0-9.]/g, ''));
                    return bWorth - aWorth;
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'grade':
                    const aGrade = a.grade.includes('⭐⭐⭐⭐⭐') ? 5 : a.grade.includes('⭐⭐⭐⭐') ? 4 : a.grade.includes('⭐⭐⭐') ? 3 : 1;
                    const bGrade = b.grade.includes('⭐⭐⭐⭐⭐') ? 5 : b.grade.includes('⭐⭐⭐⭐') ? 4 : b.grade.includes('⭐⭐⭐') ? 3 : 1;
                    return bGrade - aGrade;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [selectedCategory, searchTerm, sortBy]);

    const toggleCardExpansion = (name: string) => {
        setExpandedCard(expandedCard === name ? null : name);
    };

    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />

            {/* Main Content Section */}
            <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white relative overflow-hidden py-20">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-slate-900/90"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 max-w-6xl">
                    <motion.div
                        // @ts-ignore
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.2}
                        className="mb-12 mt-12"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 text-center">
                            Titans of Success
                        </h2>
                        <div className="w-24 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 mx-auto mb-8 rounded-full"></div>
                        <p className="text-xl text-gray-300 max-w-4xl mx-auto text-center mb-16 leading-relaxed">
                            Explore the cosmic alignment and name analysis of history's most successful individuals through the lens of stellar fortune and cosmic mathematics.
                        </p>

                        {/* Filters */}
                        <div className="max-w-3xl mx-auto space-y-6">
                            {/* Category Filters */}
                            <div className="flex flex-wrap gap-3 justify-center">
                                {categories.map((category) => {
                                    const Icon = category.icon;
                                    return (
                                        <motion.button
                                            key={category.id}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category.id
                                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl shadow-purple-500/25 scale-105'
                                                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50 backdrop-blur-sm'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {category.name}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Sort Options */}
                            <div className="flex justify-center">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-8 py-4 rounded-2xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 text-lg font-medium shadow-lg appearance-none cursor-pointer"
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </motion.div>
                </div>
                {/* Results Count */}
                <motion.div
                    // @ts-ignore
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.2}
                    className="text-center mb-8"
                >
                    <p className="text-xl md:text-xl font-bold mb-6 text-white text-center">
                        Showing <span className="font-bold text-yellow-400">{filteredAndSortedBillionaires.length}</span> Titans
                    </p>
                </motion.div>

                {/* Billionaires Grid */}
                <div className="space-y-16">
                    <div className="max-w-6xl mx-auto">
                        <AnimatePresence>
                            {filteredAndSortedBillionaires.map((person, index) => (
                                <motion.div
                                    key={person.name}
                                    // @ts-ignore
                                    variants={scaleIn}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    viewport={{ once: true }}
                                    custom={0.5 + index * 0.1}
                                    className="group mb-16"
                                >
                                    <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-800/50 hover:shadow-3xl hover:shadow-purple-900/20 transition-all duration-500 hover:-translate-y-1">
                                        {/* Header Section */}
                                        <div className={`relative bg-gradient-to-r ${person.color} p-8 md:p-12 text-white overflow-hidden`}>
                                            {/* Background Pattern */}
                                            <div className="absolute inset-0 opacity-20">
                                                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>
                                                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full filter blur-3xl"></div>
                                                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                                            </div>

                                            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
                                                <motion.div
                                                    whileHover={{ scale: 1.08, rotate: 2 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="relative"
                                                >
                                                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl ring-4 ring-white/10">
                                                        <img
                                                            src={person.image}
                                                            alt={person.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    {/* Grade Badge */}
                                                    <motion.div
                                                        animate={{ rotate: [0, 5, -5, 0] }}
                                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                        className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-xl ring-2 ring-white/20"
                                                    >
                                                        {person.grade.split(' ')[0]}
                                                    </motion.div>
                                                </motion.div>

                                                <div className="flex-1 text-center lg:text-left">
                                                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-white">{person.name}</h3>
                                                    <p className="text-xl md:text-2xl text-white/90 mb-3 font-medium tracking-wide">{person.title}</p>
                                                    <p className="text-lg md:text-xl text-white/80 mb-6 font-light">{person.entities}</p>
                                                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-8">
                                                        <p className="text-3xl md:text-4xl font-black text-yellow-400">{person.netWorth}</p>
                                                        <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                                                            <FiStar className="w-6 h-6 text-yellow-400" />
                                                            <span className="text-lg font-bold text-white">{person.grade}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* View More / View Less Button - Show on all screen sizes */}
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => toggleCardExpansion(person.name)}
                                                    className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-all font-semibold text-white whitespace-nowrap border-2 border-white/30 shadow-lg hover:shadow-xl"
                                                >
                                                    {expandedCard === person.name ? (
                                                        <span className="flex items-center gap-2">
                                                            View Less
                                                            <FiChevronUp className="w-5 h-5" />
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-2">
                                                            View More
                                                            <FiChevronDown className="w-5 h-5" />
                                                        </span>
                                                    )}
                                                </motion.button>
                                            </div>
                                        </div>

                                        {/* Analysis Section */}
                                        <AnimatePresence>
                                            {expandedCard === person.name && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-8 md:p-12 space-y-8">
                                                        {/* Cosmic Blueprint */}
                                                        <motion.div
                                                            // @ts-ignore
                                                            variants={slideInLeft}
                                                            initial="hidden"
                                                            animate="visible"
                                                            custom={0.1}
                                                            className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-3xl p-12 border-2 border-blue-700/30 shadow-xl hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 backdrop-blur-sm hover:-translate-y-1"
                                                        >
                                                            <div className="flex items-center gap-4 mb-6">
                                                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-blue-500/20">
                                                                    <FiTarget className="w-7 h-7 text-white" />
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-2xl font-bold text-white">{person.analysis.blueprint.title}</h4>
                                                                    <p className="text-gray-300 mt-1 text-lg">{person.analysis.blueprint.content}</p>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-4">
                                                                {person.analysis.blueprint.details.map((detail, idx) => (
                                                                    <div key={idx} className="bg-gray-800/60 rounded-xl p-6 leading-relaxed text-gray-200 backdrop-blur-sm border border-gray-700/30 hover:bg-gray-800/70 transition-colors">
                                                                        {detail}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>

                                                        {/* Name Analysis */}
                                                        <motion.div
                                                            // @ts-ignore
                                                            variants={slideInRight}
                                                            initial="hidden"
                                                            animate="visible"
                                                            custom={0.2}
                                                            className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 rounded-3xl p-12 border-2 border-yellow-700/30 shadow-xl hover:shadow-2xl hover:shadow-yellow-900/20 transition-all duration-300 backdrop-blur-sm hover:-translate-y-1"
                                                        >
                                                            <div className="flex items-center gap-4 mb-6">
                                                                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-yellow-500/20">
                                                                    <FiAward className="w-7 h-7 text-white" />
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-2xl font-bold text-white">{person.analysis.name.title}</h4>
                                                                    <p className="text-gray-300 mt-1 text-lg">{person.analysis.name.content}</p>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-4">
                                                                {person.analysis.name.details.map((detail, idx) => (
                                                                    <div key={idx} className="bg-gray-800/60 rounded-xl p-6 leading-relaxed text-gray-200 backdrop-blur-sm border border-gray-700/30 hover:bg-gray-800/70 transition-colors">
                                                                        {detail}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>

                                                        {/* Company Analysis */}
                                                        <motion.div
                                                            // @ts-ignore
                                                            variants={slideInLeft}
                                                            initial="hidden"
                                                            animate="visible"
                                                            custom={0.3}
                                                            className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-3xl p-12 border-2 border-green-700/30 shadow-xl hover:shadow-2xl hover:shadow-green-900/20 transition-all duration-300 backdrop-blur-sm hover:-translate-y-1"
                                                        >
                                                            <div className="flex items-center gap-4 mb-6">
                                                                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-green-500/20">
                                                                    <FiTrendingUp className="w-7 h-7 text-white" />
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-2xl font-bold text-white">{person.analysis.companies.title}</h4>
                                                                    <p className="text-gray-300 mt-1 text-lg">{person.analysis.companies.subtitle}</p>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-4">
                                                                {person.analysis.companies.details.map((company, idx) => (
                                                                    <div key={idx} className="bg-gray-800/60 rounded-xl p-8 border border-gray-700/30 hover:bg-gray-800/70 transition-colors backdrop-blur-sm">
                                                                        <div className="flex items-center justify-between mb-4">
                                                                            <h5 className="font-bold text-white text-xl">{company.name}</h5>
                                                                            <span className="text-sm font-bold text-emerald-400 bg-emerald-900/50 px-4 py-2 rounded-full border border-emerald-700/50">
                                                                                {company.vibration}
                                                                            </span>
                                                                        </div>
                                                                        <p className="text-gray-200 leading-relaxed text-lg">{company.analysis}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>

                                                        {/* Conclusion */}
                                                        {person.analysis.conclusion && (
                                                            <motion.div
                                                                // @ts-ignore
                                                                variants={fadeUp}
                                                                initial="hidden"
                                                                animate="visible"
                                                                custom={0.4}
                                                                className="bg-gradient-to-br from-purple-900/40 to-gray-900/40 rounded-3xl p-12 text-white border border-purple-700/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300"
                                                            >
                                                                <h4 className="text-3xl font-bold mb-6 flex items-center gap-4">
                                                                    <FiZap className="w-8 h-8 text-yellow-400" />
                                                                    Conclusion
                                                                </h4>
                                                                <p className="text-gray-200 leading-relaxed text-xl">{person.analysis.conclusion}</p>
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            {/* Conclusion Section */}
            <Section variant="dark">
                <motion.div
                    // @ts-ignore
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.1}
                    className="bg-gradient-to-br from-indigo-900/60 to-blue-900/60 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-indigo-600/30 shadow-2xl"
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-center">
                        The Universal Law of Success
                    </h2>
                    <div className="w-24 h-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mx-auto mb-12 rounded-full"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        <motion.div
                            whileHover={{ scale: 1.03, y: -5 }}
                            className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-2"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl ring-4 ring-blue-400/20">
                                <FiStar className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">The 3rd + 11th Alignment</h3>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                The gold standard for unlimited success. Connects effort (3rd House) with massive gains (11th House),
                                creating a perpetual engine of wealth and achievement.
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.03, y: -5 }}
                            className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-2"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl ring-4 ring-indigo-400/20">
                                <FiCompass className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Alignment is Everything</h3>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                When birth chart, personal name, and business name synchronize, success becomes not just
                                possible—it becomes inevitable.
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.03, y: -5 }}
                            className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-2"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-green-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl ring-4 ring-teal-400/20">
                                <FiShield className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Cosmic Mathematics</h3>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                These titans prove the cosmic mathematics works. The numbers don't lie—alignment creates destiny.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="text-center"
                    >
                        <p className="text-2xl text-gray-200 leading-relaxed max-w-4xl mx-auto mb-12 font-light">
                            "The cosmos doesn't reward the lucky—it rewards the aligned. These stories prove that when
                            your name vibrates in harmony with your celestial blueprint, you don't chase success—success
                            finds you."
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 text-white px-12 py-6 rounded-full font-black text-xl shadow-2xl hover:shadow-blue-400/50 transition-all duration-300 ring-4 ring-blue-400/20 hover:ring-blue-400/40"
                        >
                            Discover Your Stellar Fortune
                        </motion.button>
                    </motion.div>
                </motion.div>
            </Section>
        </PageWrapper>
    );
};

export default InsightPage;