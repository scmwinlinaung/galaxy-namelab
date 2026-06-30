// src/pages/success-stories/SuccessStoriesPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import { FiStar, FiTrendingUp, FiAlertCircle, FiAward } from 'react-icons/fi';

interface SuccessStoriesPageProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

interface SuccessStory {
    id: number;
    title: string;
    logo: string;
    industry: string;
    otherName?: string;
    challenge: string;
    blueprintAndResult: string;
}

const successStories: SuccessStory[] = [
    {
        id: 1,
        title: 'She Shines',
        logo: '1.Gems&Jewelry.jpg',
        industry: 'Gems & Jewellery',
        challenge: 'Launching as a minor boutique startup in a fiercely competitive market, overshadowed by deeply entrenched corporate giants.',
        blueprintAndResult: 'Upon transitioning to the strategically aligned name "She Shines," the brand experienced exponential year-on-year growth. Today, with over 20 years of market dominance, it proudly stands as the undisputed #1 luxury gemstone and jewelry brand in the region.'
    },
    {
        id: 2,
        title: 'Sky Moon & Noble Billion (Star Moe Yan Group)',
        logo: '2.Lottery Agent.jpg',
        industry: 'Government Lottery Enterprise',
        otherName: 'Moe Yan Shwe Lamin & Myat Su Kadae',
        challenge: 'Operating as a struggling, low-overhead retail lottery outlet with minimal staff and limited market reach.',
        blueprintAndResult: 'Within just two years of rebranding to "Sky Moon & Noble Billion," the business unlocked unprecedented energetic alignment, consistently producing top-tier national lottery winners week after week. Over the past 28 years, they have commanded a massive 65–70% share of the national lottery retail and wholesale market. The enterprise has since diversified into a powerhouse conglomerate, now firmly established as the Star Moe Yan Group.'
    },
    {
        id: 3,
        title: 'Her Precious',
        logo: '3.Gems&Jewellery2.jpg',
        industry: 'Luxury Gems & Jewellery',
        challenge: 'Possessing world-class craftsmanship and expertise, but severely constrained by a low starting capital of just a few thousand dollars.',
        blueprintAndResult: 'The structural activation of the name "Her Precious" triggered an immediate influx of premium clientele and massive profit margins. Driven by exceptional word-of-mouth prestige, this micro-business scaled into a multi-million-dollar luxury jewelry empire within a mere 5 years of its launch.'
    },
    {
        id: 4,
        title: 'Trust Royal',
        logo: '4.Mini Mart3.png',
        industry: 'Express Mini Mart & Retail',
        challenge: 'Founded by a young, first-time female entrepreneur with minimal industry experience, operating a single, vulnerable neighborhood grocery store.',
        blueprintAndResult: 'By realigning the business identity under the name "Trust Royal," the venture unlocked massive consumer trust and operational breakthroughs. Within 7 years, the single storefront successfully scaled into a highly profitable 5-branch boutique mini-market chain.'
    },
    {
        id: 5,
        title: 'Sway with Me',
        logo: '5.Global Dance.png',
        industry: 'Global Dance Academy',
        challenge: 'Introducing a modern, Western-style multi-genre dance academy into a conservative Asian market heavily dominated by traditional dance schools.',
        blueprintAndResult: 'Under the vibrant frequencies of the name "Sway with Me," the academy shattered market skepticism. Within its very first year, enrollment skyrocketed into the hundreds, creating a massive cultural phenomenon and solidifying its status as the nation\'s premier international dance institution.'
    },
    {
        id: 6,
        title: 'Iron Gate',
        logo: '6.Real Estate.png',
        industry: 'Premium Real Estate Agency',
        challenge: 'Stagnant growth and underwhelming revenue during the entire first year of launch, prompting the founders to seek a deeper strategic audit.',
        blueprintAndResult: 'Our comprehensive corporate audit revealed a severe energetic conflict within the CEO’s personal name profile. After legally rectifying the CEO’s personal name structure alongside the business identity, "Iron Gate" witnessed an immediate turnaround: charting a 66% growth leap in Year 2, and a staggering 142% surge by Year 3.'
    },
    {
        id: 7,
        title: 'Fit4U',
        logo: '7.Fit4U-Gym.jpg',
        industry: 'Gym & Fitness Center',
        challenge: 'Plagued by operational roadblocks at launch, including critical shortages of certified elite trainers and complex social/human resource management issues.',
        blueprintAndResult: 'Following a strategic identity pivot to "Fit4U," the operational friction vanished almost overnight. The business resolved its staffing crisis and rapidly scaled to the absolute top of the regional fitness industry within just 9 months.'
    },
    {
        id: 8,
        title: 'Future Top',
        logo: '8.Pre School2.jpg',
        industry: 'Preschool & Early Childhood Education',
        challenge: 'Severely limited initial funding, forcing the founders to start as a microscopic schoolhouse in an under-developed suburban district.',
        blueprintAndResult: 'Supported by the growth-inducing frequencies of "Future Top," student enrollment surged dramatically within 12 months. This rapid financial influx allowed the founders to open a second premium campus in an affluent residential zone within a year. They are currently preparing to launch their third flagship campus in the heart of the central business district.'
    },
    {
        id: 9,
        title: 'Tech Nova',
        logo: '9.Computer Training.png',
        industry: 'Computer Training Centre',
        challenge: 'Entering a hyper-saturated tech-education market with a modest, cautious goal of securing just 20 students for a single monthly batch.',
        blueprintAndResult: 'The magnetic resonance of "Tech Nova" attracted immense student interest that far exceeded all initial expectations. Instead of running just one class a month, the institute successfully scaled to running four fully occupied batches simultaneously per week (4 batches a month), dominating the local tech-training sector.'
    },
    {
        id: 10,
        title: 'Precision Partners',
        logo: '10.Audit Firm2.png',
        industry: 'Audit, Tax & Financial Advisory Firm',
        challenge: 'Founded by a corporate professional who spent over 20 years climbing the corporate ladder as a salaried employee, facing stagnant career growth before deciding to venture into independent practice.',
        blueprintAndResult: 'Launching as a micro-firm with just 2 corporate staff, the newly christened "Precision Partners" achieved extraordinary market breakthroughs within its first year. Driven by rapid client acquisition, the firm scaled its operations exponentially, expanding its workforce to over 30+ full-time professionals within 12 months.'
    }
];

interface SuccessStoryCardProps {
    story: SuccessStory;
    isEven: boolean;
}

const SuccessStoryCard: React.FC<SuccessStoryCardProps> = ({ story, isEven }) => {
    const [hasError, setHasError] = useState(false);

    return (
        <motion.div 
            className="bg-primary-900/10 border border-primary-800/50 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm relative overflow-hidden group hover:border-primary-600 transition-colors duration-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
        >
            {/* Accent line on left */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary-400 to-purple-500" />

            <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 items-center`}>
                {/* Logo Section */}
                <div className="w-full lg:w-1/3 flex flex-col items-center justify-center">
                    <div className="aspect-square w-64 bg-white rounded-2xl p-4 shadow-xl border border-primary-800 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                        {!hasError ? (
                            <img 
                                src={`/portfolio/${story.logo}`} 
                                alt={`${story.title} Logo`} 
                                className="max-w-full max-h-full object-contain"
                                onError={() => setHasError(true)}
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-indigo-950 to-purple-950 border border-primary-700/30 rounded-xl flex flex-col items-center justify-center p-4">
                                <FiStar className="text-primary-300 text-4xl mb-2 animate-pulse" />
                                <span className="text-2xl font-extrabold text-primary-200 text-center">
                                    {story.title.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-2/3 space-y-6">
                    <div>
                        <div className="flex flex-wrap gap-2 items-center mb-2">
                            <span className="bg-primary-500/10 border border-primary-400/30 text-primary-300 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest font-body">
                                {story.industry}
                            </span>
                            {story.otherName && (
                                <span className="bg-purple-500/10 border border-purple-400/30 text-purple-300 text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full italic tracking-wide font-body">
                                    Name Profile: {story.otherName}
                                </span>
                            )}
                        </div>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white group-hover:text-primary-300 transition-colors font-display">
                            {story.title}
                        </h3>
                    </div>

                    {/* Challenge Block */}
                    <div className="bg-red-950/10 border border-red-900/30 rounded-2xl p-5 space-y-2">
                        <h4 className="text-red-400 font-bold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 font-body">
                            <FiAlertCircle className="text-red-400 flex-shrink-0" />
                            <span>The Challenge</span>
                        </h4>
                        <p className="text-primary-100/90 text-sm md:text-base leading-relaxed font-body">
                            {story.challenge}
                        </p>
                    </div>

                    {/* Blueprint & Result Block */}
                    <div className="bg-green-950/10 border border-green-900/30 rounded-2xl p-5 space-y-2">
                        <h4 className="text-green-400 font-bold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 font-body">
                            <FiTrendingUp className="text-green-400 flex-shrink-0" />
                            <span>The Blueprint & Result</span>
                        </h4>
                        <p className="text-primary-100/90 text-sm md:text-base leading-relaxed font-body">
                            {story.blueprintAndResult}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const SuccessStoriesPage: React.FC<SuccessStoriesPageProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
            <main className="min-h-screen w-full bg-primary-950 text-primary-50 py-32 relative overflow-hidden">
                {/* Space Dust / Stars effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-primary-950 to-primary-950 pointer-events-none" />

                <div className="relative z-10 container mx-auto px-6 max-w-6xl">
                    {/* Header Section */}
                    <motion.div 
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center justify-center p-3 bg-primary-500/10 border border-primary-500/20 rounded-2xl mb-4 text-primary-300">
                            <FiAward className="text-3xl" />
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-50 mb-4 drop-shadow-lg font-display">
                            Success <span className="text-primary-300">Stories</span>
                        </h1>
                        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-primary-200 mb-6 font-display">
                            Transforming Visions into Industry Leaders: Our 28-Year Legacy
                        </h2>
                        <div className="w-24 h-1 bg-primary-400 mx-auto mb-8"></div>
                        <p className="text-base md:text-lg text-primary-100 max-w-3xl mx-auto leading-relaxed font-body">
                            Behind every corporate giant is a name calibrated for destiny. Over the past <span className="font-semibold text-primary-300">28 years</span>, Galaxy NameLab has empowered thousands of businesses to break through market saturation and achieve extraordinary growth. Here are <span className="font-semibold text-primary-300">10 handpicked success stories</span> from our extensive portfolio of over 300,000 global clients.
                        </p>
                    </motion.div>

                    {/* Stories Layout */}
                    <div className="space-y-16">
                        {successStories.map((story, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <SuccessStoryCard 
                                    key={story.id} 
                                    story={story} 
                                    isEven={isEven} 
                                />
                            );
                        })}
                    </div>

                    {/* Bottom Section */}
                    <motion.div 
                        className="text-center mt-24 bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-primary-800/80 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>
                        <div className="relative z-10">
                            <FiStar className="text-4xl text-primary-300 mx-auto mb-4 animate-pulse" />
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display">Start Your Story Today</h2>
                            <p className="text-sm md:text-base text-primary-200 mb-8 max-w-2xl mx-auto font-body leading-relaxed">
                                Every business giant starts with a single aligned seed. Let Gabriel Faith and the science of Sextile Alignment build your vehicle for ultimate destiny and market resonance.
                            </p>
                            <a 
                                href="/pricing"
                                className="inline-flex items-center justify-center bg-primary-400 text-primary-950 font-bold text-sm md:text-base py-3 px-10 rounded-full hover:bg-primary-300 transition-all shadow-lg hover:shadow-primary-500/20 transform hover:-translate-y-0.5 duration-300 font-body"
                            >
                                View Naming Packages & Pricing
                            </a>
                        </div>
                    </motion.div>
                </div>
            </main>
        </PageWrapper>
    );
};

export default SuccessStoriesPage;