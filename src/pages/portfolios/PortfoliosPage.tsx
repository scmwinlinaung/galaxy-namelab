// src/pages/portfolios/PortfoliosPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import { FiStar, FiSearch, FiInfo } from 'react-icons/fi';

interface PortfoliosPageProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

interface PortfolioItem {
    fileName: string;
    title: string;
    category: string;
    categoryKey: string;
}

const portfolioItems: PortfolioItem[] = [
    { fileName: '1.Gems&Jewelry.jpg', title: 'She Shines', category: 'Gems & Jewellery', categoryKey: 'gems-jewellery' },
    { fileName: '2.Lottery Agent.jpg', title: 'Sky Moon & Noble Billion', category: 'Professional Services', categoryKey: 'professional-services' },
    { fileName: '3.Gems&Jewellery2.jpg', title: 'Her Precious', category: 'Gems & Jewellery', categoryKey: 'gems-jewellery' },
    { fileName: '4.Mini Mart3.png', title: 'Trust Royal', category: 'Fashion & Retail', categoryKey: 'fashion-retail' },
    { fileName: '5.Global Dance.png', title: 'Sway with Me', category: 'Education & Entertainment', categoryKey: 'education-entertainment' },
    { fileName: '6.Real Estate.png', title: 'Iron Gate', category: 'Real Estate & Construction', categoryKey: 'real-estate-construction' },
    { fileName: '7.Fit4U-Gym.jpg', title: 'Fit4U', category: 'Beauty & Wellness', categoryKey: 'beauty-wellness' },
    { fileName: '8.Pre School2.jpg', title: 'Future Top', category: 'Education & Entertainment', categoryKey: 'education-entertainment' },
    { fileName: '9.Computer Training.png', title: 'Tech Nova', category: 'Education & Entertainment', categoryKey: 'education-entertainment' },
    { fileName: '10.Audit Firm2.png', title: 'Precision Partners', category: 'Professional Services', categoryKey: 'professional-services' },
    { fileName: 'Auto Clinic.png', title: 'Elite Auto Clinic', category: 'Professional Services', categoryKey: 'professional-services' },
    { fileName: 'Bakery.jpg', title: 'Bee Bakery', category: 'Food & Beverage', categoryKey: 'food-beverage' },
    { fileName: 'Beauty Salon & Barbershop.jpg', title: 'Bella Glow Studio', category: 'Beauty & Wellness', categoryKey: 'beauty-wellness' },
    { fileName: 'Beverages2.jpg', title: 'Quick Quench Beverages', category: 'Food & Beverage', categoryKey: 'food-beverage' },
    { fileName: 'Cafe.png', title: 'Oak & Ember Cafe', category: 'Food & Beverage', categoryKey: 'food-beverage' },
    { fileName: 'Car Sale Centre2.jpg', title: 'Future Drive', category: 'Professional Services', categoryKey: 'professional-services' },
    { fileName: 'Clothes Brand2.jpg', title: 'Nova Nook', category: 'Fashion & Retail', categoryKey: 'fashion-retail' },
    { fileName: 'Construction.png', title: 'Prime Build Construction', category: 'Real Estate & Construction', categoryKey: 'real-estate-construction' },
    { fileName: 'Delivery Co.Ltd.png', title: 'TrueX Delivery', category: 'Logistics & Delivery', categoryKey: 'logistics-delivery' },
    { fileName: 'electric store2.png', title: 'Rapid Current', category: 'Home & Electronics', categoryKey: 'home-electronics' },
    { fileName: 'Electronic Centre.png', title: 'Good Friend', category: 'Home & Electronics', categoryKey: 'home-electronics' },
    { fileName: 'Energy Fuel.jpg', title: 'Golden Fortune Energy', category: 'Real Estate & Construction', categoryKey: 'real-estate-construction' },
    { fileName: 'Food Truck.png', title: 'Rolling Feast', category: 'Food & Beverage', categoryKey: 'food-beverage' },
    { fileName: 'Gems&Jewellery.jpg', title: 'Sweet Stones', category: 'Gems & Jewellery', categoryKey: 'gems-jewellery' },
    { fileName: 'Gems&Jewellery4.jpg', title: 'True Aura', category: 'Gems & Jewellery', categoryKey: 'gems-jewellery' },
    { fileName: 'Good Day Mart-Mini Mart.jpg', title: 'Good Day Mart', category: 'Fashion & Retail', categoryKey: 'fashion-retail' },
    { fileName: 'Health & Wellness.jpg', title: 'Longevity Living', category: 'Beauty & Wellness', categoryKey: 'beauty-wellness' },
    { fileName: 'Home Cleaning.jpg', title: 'Fresh Breeze', category: 'Professional Services', categoryKey: 'professional-services' },
    { fileName: 'Home Repair.png', title: 'Repair Nest', category: 'Real Estate & Construction', categoryKey: 'real-estate-construction' },
    { fileName: 'Ice Cream.jpg', title: 'Bee Ice', category: 'Food & Beverage', categoryKey: 'food-beverage' },
    { fileName: 'Language Centre.jpg', title: 'Global Thrive', category: 'Education & Entertainment', categoryKey: 'education-entertainment' },
    { fileName: 'Logistics2.png', title: 'Perfect Forever', category: 'Logistics & Delivery', categoryKey: 'logistics-delivery' },
    { fileName: 'Luxury Handbags.png', title: 'Opal & Ivy', category: 'Fashion & Retail', categoryKey: 'fashion-retail' },
    { fileName: 'Makeup Artist.jpg', title: 'Mary Mila', category: 'Beauty & Wellness', categoryKey: 'beauty-wellness' },
    { fileName: 'Makeup.jpg', title: 'Glow & Glam', category: 'Beauty & Wellness', categoryKey: 'beauty-wellness' },
    { fileName: 'Milk Tea.png', title: 'Chitchat Tea', category: 'Food & Beverage', categoryKey: 'food-beverage' },
    { fileName: 'Mobile Shop.jpg', title: 'You & Me Mobile', category: 'Home & Electronics', categoryKey: 'home-electronics' },
    { fileName: 'nail diary-nail salon.jpg', title: 'Nail Diary', category: 'Beauty & Wellness', categoryKey: 'beauty-wellness' },
    { fileName: 'Pizza & Pasta.jpg', title: 'Naples Craft', category: 'Food & Beverage', categoryKey: 'food-beverage' },
    { fileName: 'Pure Water.jpeg', title: 'Black Panther Pure Water', category: 'Food & Beverage', categoryKey: 'food-beverage' },
    { fileName: 'Real Estate2.jpg', title: 'Apex Properties', category: 'Real Estate & Construction', categoryKey: 'real-estate-construction' },
    { fileName: 'Restaurant.png', title: 'The Spice Route', category: 'Food & Beverage', categoryKey: 'food-beverage' },
    { fileName: 'Retail Store.png', title: 'Vibe Retail', category: 'Fashion & Retail', categoryKey: 'fashion-retail' },
    { fileName: 'Retail Store2.png', title: 'Luxe Standard', category: 'Fashion & Retail', categoryKey: 'fashion-retail' },
    { fileName: 'Shoes Store.png', title: 'Step Forward', category: 'Fashion & Retail', categoryKey: 'fashion-retail' },
    { fileName: 'Skin Care.png', title: 'Lumora Skin Care', category: 'Beauty & Wellness', categoryKey: 'beauty-wellness' },
    { fileName: 'Skin Care&Cosmetic4.jpg', title: 'Aura Glow', category: 'Beauty & Wellness', categoryKey: 'beauty-wellness' },
    { fileName: 'Smooth&Shine-Skin Car&Beauty Centre.jpg', title: 'Smooth & Shine', category: 'Beauty & Wellness', categoryKey: 'beauty-wellness' },
    { fileName: 'Vet Clinic.jpg', title: 'Paws & Claws Vet', category: 'Professional Services', categoryKey: 'professional-services' },
    { fileName: 'Walking Shose Brand.jpg', title: 'Stride Shoes', category: 'Fashion & Retail', categoryKey: 'fashion-retail' }
];

interface CategoryFilter {
    key: string;
    label: string;
}

const categories: CategoryFilter[] = [
    { key: 'all', label: 'All' },
    { key: 'gems-jewellery', label: 'Gems & Jewellery' },
    { key: 'food-beverage', label: 'Food & Beverage' },
    { key: 'beauty-wellness', label: 'Beauty & Wellness' },
    { key: 'fashion-retail', label: 'Fashion & Retail' },
    { key: 'education-entertainment', label: 'Education & Entertainment' },
    { key: 'real-estate-construction', label: 'Real Estate & Construction' },
    { key: 'home-electronics', label: 'Home & Electronics' },
    { key: 'logistics-delivery', label: 'Logistics & Delivery' },
    { key: 'professional-services', label: 'Professional Services' }
];

interface PortfolioCardProps {
    item: PortfolioItem;
    cardVariants: any;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, cardVariants }) => {
    const [hasError, setHasError] = useState(false);

    return (
        <motion.div 
            className="group bg-primary-900/20 border border-primary-800/60 rounded-2xl p-4 flex flex-col items-center justify-between text-center transition-all duration-300 hover:bg-primary-900/40 hover:border-primary-600 hover:shadow-2xl hover:shadow-primary-500/10 transform hover:-translate-y-1"
            variants={cardVariants}
        >
            <div className="aspect-square w-full rounded-xl overflow-hidden bg-white/5 border border-primary-800 p-2 mb-4 flex items-center justify-center group-hover:border-primary-400/50 transition-colors">
                {!hasError ? (
                    <img 
                        src={`/portfolio/${item.fileName}`} 
                        alt={`${item.title} - ${item.category}`} 
                        className="max-w-full max-h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                        onError={() => setHasError(true)}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-950 to-purple-950 border border-primary-700/30 rounded-lg flex flex-col items-center justify-center p-4">
                        <FiStar className="text-primary-300 text-3xl mb-2 animate-pulse" />
                        <span className="text-xl font-extrabold text-primary-200">
                            {item.title.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()}
                        </span>
                    </div>
                )}
            </div>
            <div className="w-full">
                <p className="text-[10px] md:text-xs font-bold tracking-widest text-primary-300 uppercase mb-1.5 line-clamp-1 font-body">
                    {item.category}
                </p>
                <h3 className="text-sm md:text-base font-extrabold text-white group-hover:text-primary-300 transition-colors line-clamp-1 font-display">
                    {item.title}
                </h3>
            </div>
        </motion.div>
    );
};

const PortfoliosPage: React.FC<PortfoliosPageProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredItems = portfolioItems.filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.categoryKey === selectedCategory;
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch = !query || 
                              item.title.toLowerCase().includes(query) ||
                              item.category.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.4, ease: 'easeOut' as const }
        }
    };

    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
            <main className="min-h-screen w-full bg-primary-950 text-primary-50 py-32 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply blur-3xl opacity-15 pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply blur-3xl opacity-15 pointer-events-none" />

                <div className="relative z-10 container mx-auto px-6 max-w-7xl">
                    {/* Page Header */}
                    <motion.div 
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-50 mb-4 drop-shadow-lg font-display">
                            Our Trusted <span className="text-primary-300">Portfolios</span>
                        </h1>
                        <div className="w-24 h-1 bg-primary-400 mx-auto mb-6"></div>
                        <p className="text-base md:text-lg lg:text-xl text-primary-200 max-w-3xl mx-auto leading-relaxed font-body">
                            A curated selection of our most successful naming projects, scientifically designed to resonate with market dominance and energetic alignment.
                        </p>
                    </motion.div>

                    {/* Disclaimer Panel */}
                    <motion.div 
                        className="bg-primary-900/40 border border-primary-800/80 rounded-2xl p-6 mb-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 shadow-xl backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="p-3 bg-primary-500/10 border border-primary-400/30 rounded-full text-primary-300">
                            <FiInfo className="text-2xl" />
                        </div>
                        <div>
                            <h3 className="text-base md:text-lg font-bold text-primary-200 mb-1 font-display">Privacy Notice</h3>
                            <p className="text-primary-100 text-sm leading-relaxed font-body">
                                Over the past <span className="font-semibold text-primary-300">28 years</span>, Galaxy NameLab has crafted more than <span className="font-semibold text-primary-300">300,000 personal names</span> and over <span className="font-semibold text-primary-300">7,000 business names</span>. Out of respect for privacy and identity protection, personal name projects are not displayed here.
                            </p>
                        </div>
                    </motion.div>

                    {/* Controls Section (Search & Filter) */}
                    <div className="mb-12 space-y-6">
                        {/* Search Bar */}
                        <div className="max-w-md mx-auto relative font-body">
                            <input 
                                type="text"
                                placeholder="Search by brand name or category..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-primary-900/60 border border-primary-700 rounded-full py-3 pl-12 pr-6 text-primary-50 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all shadow-md text-sm md:text-base"
                            />
                            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400 text-xl" />
                        </div>

                        {/* Category Buttons */}
                        <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto font-body">
                            {categories.map((category) => (
                                <button
                                    type="button"
                                    key={category.key}
                                    onClick={() => setSelectedCategory(category.key)}
                                    className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                                        selectedCategory === category.key 
                                            ? 'bg-primary-400 text-primary-950 font-bold shadow-lg shadow-primary-500/20 scale-105' 
                                            : 'bg-primary-900/40 border border-primary-800 text-primary-200 hover:bg-primary-900/80 hover:text-white'
                                    }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Portfolio Grid */}
                    {filteredItems.length > 0 ? (
                        <motion.div 
                            key={selectedCategory}
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {filteredItems.map((item) => (
                                <PortfolioCard 
                                    key={item.fileName} 
                                    item={item} 
                                    cardVariants={cardVariants} 
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            className="text-center py-20 bg-primary-900/20 border border-primary-800/40 rounded-2xl font-body"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <p className="text-sm md:text-base text-primary-300">No projects found matching your criteria.</p>
                            <button 
                                type="button"
                                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                                className="mt-4 px-6 py-2 bg-primary-400 text-primary-950 font-bold rounded-full hover:bg-primary-300 transition-colors text-xs md:text-sm"
                            >
                                Reset Filters
                            </button>
                        </motion.div>
                    )}

                    {/* Bottom CTA */}
                    <motion.div 
                        className="text-center mt-20"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center space-x-2 mb-4 font-display">
                            <FiStar className="text-2xl text-primary-300" />
                            <h2 className="text-xl md:text-2xl font-bold text-primary-100">Ready to Align Your Brand?</h2>
                            <FiStar className="text-2xl text-primary-300" />
                        </div>
                        <p className="text-sm md:text-base text-primary-200 mb-8 max-w-2xl mx-auto font-body leading-relaxed">
                            Join the ranks of these successful, harmonically balanced enterprises. Let our 28-year esoteric wisdom structure your market dominance.
                        </p>
                        <a 
                            href="/pricing"
                            className="inline-flex items-center justify-center bg-primary-400 text-primary-950 font-bold text-sm md:text-base py-3 px-8 rounded-full hover:bg-primary-300 transition-all shadow-lg hover:shadow-primary-500/20 transform hover:-translate-y-0.5 duration-300 font-body"
                        >
                            Select Your Naming Package
                        </a>
                    </motion.div>
                </div>
            </main>
        </PageWrapper>
    );
};

export default PortfoliosPage;