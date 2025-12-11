// src/pages/offerings/OfferingsPage.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiCheck, FiX, FiPackage, FiZap, FiGift, FiShield, FiTrendingUp, FiAward } from 'react-icons/fi';
import { MdWorkspacePremium } from 'react-icons/md';

import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import Section from '@components/ui/Section';
import Button from '@components/ui/Button';
import { PricingService } from '@api/services/pricingService';
import { Package } from '@api/types/pricing';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: "easeOut" as const },
    }),
};

interface OfferingsPageProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

const OfferingsPage: React.FC<OfferingsPageProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setLoading(true);
                const response = await PricingService.getPackages();
                if (response.success && response.data) {
                    setPackages(response.data);
                } else {
                    setError(response.error || 'Failed to load packages');
                }
            } catch (err) {
                setError('An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    // Group packages by category dynamically
    const packagesByCategory = packages.reduce((acc, pkg) => {
        const category = pkg.category || 'Other';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(pkg);
        return acc;
    }, {} as Record<string, Package[]>);

    // Group packages by path within each category if paths exist
    const packagesByPath = Object.entries(packagesByCategory).reduce((acc, [category, categoryPackages]) => {
        const pathGroups = categoryPackages.reduce((pathAcc, pkg) => {
            const path = pkg.path || 'Default';
            if (!pathAcc[path]) {
                pathAcc[path] = [];
            }
            pathAcc[path].push(pkg);
            return pathAcc;
        }, {} as Record<string, Package[]>);

        acc[category] = pathGroups;
        return acc;
    }, {} as Record<string, Record<string, Package[]>>);
    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />

            {/* Hero Section - Beautiful Cosmic Design */}
            <section className="relative w-full min-h-screen flex flex-col items-center justify-start text-center bg-gradient-to-b from-primary-700 via-primary-800 to-primary-950 text-white overflow-hidden px-4 py-12">
                {/* Background Blobs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-screen blur-3xl opacity-20"
                    animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen blur-3xl opacity-15"
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
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-primary-100">
                        Our Offerings
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-primary-200">
                        Invest in Your Legacy
                    </h2>
                    <p className="text-lg text-primary-200 leading-relaxed">
                        Choose the path that aligns with your vision. Whether you want us to craft the perfect name or validate your own creative ideas, we ensure your brand resonates with Stellar Fortune energy.
                    </p>
                </motion.div>

                {/* Main Content - Still in hero section for cosmic styling */}
                <div className="w-full max-w-7xl mx-auto mb-16">
                    {/* Loading State */}
                    {loading && (
                        <div className="text-center py-12">
                            <div className="text-primary-200">Loading cosmic packages...</div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="text-center py-12">
                            <div className="text-red-400">Error: {error}</div>
                        </div>
                    )}

                    {/* Content State */}
                    {!loading && !error && packages.length > 0 && (
                        <>
                            {/* Dynamic Category Rendering */}
                            {Object.entries(packagesByPath).map(([category, paths], categoryIndex) => (
                                <motion.div
                                    key={category}
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="visible"
                                    custom={0.2 + categoryIndex * 0.3}
                                    className="mb-20"
                                >
                                    <div className="text-center mb-12">
                                        <h3 className="text-3xl font-bold text-primary-100 mb-4">
                                            {category}
                                        </h3>
                                        <p className="text-lg text-primary-200 max-w-3xl mx-auto">
                                            {category === 'Business Naming Solutions'
                                                ? 'Professional naming services tailored to your business needs'
                                                : category === 'Personal & Nickname Solutions'
                                                    ? 'Unlock your personal charisma. These hybrid packages combine our expert suggestions with a validation of your own ideas.'
                                                    : 'Premium solutions designed to meet your unique requirements'
                                            }
                                        </p>
                                    </div>

                                    {/* Dynamic Path Rendering */}
                                    {Object.entries(paths).map(([path, pathPackages], pathIndex) => {
                                        const isSignatureSeries = path.includes('Signature') || category === 'Business Naming Solutions' && pathIndex === 0;
                                        const isPersonalCategory = category === 'Personal & Nickname Solutions';
                                        const hasMultiplePackages = pathPackages.length > 1;

                                        return (
                                            <div key={path} className={hasMultiplePackages || !isSignatureSeries ? "mb-16" : ""}>
                                                {/* Path Header - Only show if there are multiple paths or it's not the Personal category */}
                                                {!isPersonalCategory && (Object.keys(paths).length > 1 || path) && (
                                                    <div className="text-center mb-8">
                                                        <h4 className="text-2xl font-semibold text-primary-100 mb-3">{path}</h4>
                                                        <p className="text-primary-200 max-w-2xl mx-auto">
                                                            {path.includes('Signature') || isSignatureSeries
                                                                ? 'Best for: Entrepreneurs who want a "Done-For-You" service. We do the heavy lifting, calculating and crafting names that are 100% scientifically aligned with your Cosmic Blueprint.'
                                                                : path.includes('Validator')
                                                                    ? 'Best for: Creative founders who love brainstorming. You use AI tools or your own creativity to generate lists based on our "Key Letter Guidance," and we filter them to find the hidden diamonds.'
                                                                    : 'Professional service tailored to your specific needs and requirements.'
                                                            }
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Dynamic Package Grid */}
                                                <div className={`grid ${isSignatureSeries && !isPersonalCategory
                                                    ? 'grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto'
                                                    : isPersonalCategory
                                                        ? 'grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'
                                                        : 'grid-cols-1 md:grid-cols-3 gap-6'
                                                    }`}>
                                                    {pathPackages.map((pkg, pkgIndex) => (
                                                        <motion.div
                                                            // @ts-ignore
                                                            key={pkg._id || pkg.id}
                                                            variants={fadeUp}
                                                            initial="hidden"
                                                            animate="visible"
                                                            custom={0.3 + categoryIndex * 0.3 + pathIndex * 0.1 + pkgIndex * 0.1}
                                                            className={`relative ${pkg.isPopular ? 'scale-105' : ''
                                                                } transition-all duration-300 hover:-translate-y-1 flex flex-col`}
                                                        >
                                                            {pkg.isPopular && (
                                                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                                                    <span className="bg-accent text-primary-950 px-4 py-1 rounded-full text-sm font-bold">
                                                                        MOST POPULAR
                                                                    </span>
                                                                </div>
                                                            )}

                                                            <div className={`h-full relative overflow-hidden group ${pkg.isPopular
                                                                ? 'bg-gradient-to-br from-accent/20 via-primary-600/90 to-primary-800 hover:from-accent/30 hover:via-primary-500/95 hover:to-primary-700'
                                                                : 'bg-gradient-to-br from-primary-600/90 via-primary-700 to-primary-800/95 hover:from-primary-500/95 hover:via-primary-600 hover:to-primary-700/90'
                                                                } rounded-3xl p-${isSignatureSeries && !isPersonalCategory ? '8' : isPersonalCategory ? '8' : '6'
                                                                } border-2 ${pkg.isPopular ? 'border-accent/40' : 'border-primary-400/30'} shadow-2xl backdrop-blur-sm hover:scale-105 transition-all duration-500 flex flex-col`}>

                                                                {/* Enhanced background effects */}
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                                {pkg.isPopular && (
                                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/30 to-transparent rounded-full blur-2xl"></div>
                                                                )}

                                                                {/* Header with improved styling */}
                                                                <div className="relative text-center mb-6">
                                                                    {pkg.isPopular && (
                                                                        <div className="flex justify-center mb-3">
                                                                            <MdWorkspacePremium className="text-accent text-2xl animate-pulse" />
                                                                        </div>
                                                                    )}
                                                                    <h5 className={`font-bold text-primary-100 mb-2 ${isSignatureSeries && !isPersonalCategory
                                                                        ? 'text-2xl'
                                                                        : isPersonalCategory
                                                                            ? 'text-xl'
                                                                            : 'text-lg'
                                                                        }`}>{pkg.name.replace(' – MOST POPULAR', '')}</h5>
                                                                    <div className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${pkg.isPopular
                                                                        ? 'from-accent to-secondary'
                                                                        : 'from-primary-100 to-primary-200'
                                                                        } mb-2 ${isSignatureSeries && !isPersonalCategory || isPersonalCategory
                                                                            ? 'text-4xl'
                                                                            : 'text-3xl'
                                                                        }`}>${pkg.price}</div>
                                                                </div>

                                                                {/* Enhanced Submission Info with better styling */}
                                                                {((pkg.submissionLimit > 0 || pkg.submissionDurationDays > 0) && (
                                                                    <div className="relative bg-primary-900/30 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-primary-400/20">
                                                                        <div className="flex items-center justify-center gap-2 mb-2">
                                                                            <FiPackage className="text-accent" />
                                                                            <span className="text-accent font-semibold text-sm">Submission Details</span>
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            {pkg.submissionLimit > 0 && (
                                                                                <div className="flex items-center justify-center text-primary-200 text-sm">
                                                                                    <span className="font-medium text-primary-100">Limit:</span>
                                                                                    <span className="ml-2 px-2 py-1 bg-accent/20 rounded-full text-accent font-semibold">
                                                                                        {pkg.submissionLimit} names
                                                                                    </span>
                                                                                </div>
                                                                            )}
                                                                            {pkg.submissionDurationDays > 0 && (
                                                                                <div className="flex items-center justify-center text-primary-200 text-sm">
                                                                                    <span className="font-medium text-primary-100">Duration:</span>
                                                                                    <span className="ml-2 px-2 py-1 bg-primary-600/30 rounded-full text-primary-200">
                                                                                        {pkg.submissionDurationDays} days
                                                                                    </span>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}

                                                                {/* Enhanced Package Description for Signature Series */}
                                                                {isSignatureSeries && !isPersonalCategory && pkg.description && (
                                                                    <div className="relative bg-gradient-to-r from-primary-700/40 to-primary-600/40 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-primary-400/20">
                                                                        <div className="flex items-start gap-3">
                                                                            <FiZap className="text-accent mt-1 flex-shrink-0" size={16} />
                                                                            <p className="text-primary-200 text-sm leading-relaxed">
                                                                                {pkg.description}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Enhanced Package Features with beautiful styling */}
                                                                <div className={`space-y-${isSignatureSeries && !isPersonalCategory || isPersonalCategory ? '4' : '3'} flex-grow`}>
                                                                    {/* Business Naming Solutions Features */}
                                                                    {category === 'Business Naming Solutions' && (
                                                                        <div className="space-y-3">
                                                                            {/* Enhanced deliverables section */}
                                                                            {pkg.deliverables && pkg.deliverables !== 'There is no Deliverables to input' && (
                                                                                <div className="relative">
                                                                                    <div className="flex items-center gap-2 mb-3">
                                                                                        <FiGift className="text-accent" size={18} />
                                                                                        <span className="text-accent font-semibold text-sm">What You'll Receive</span>
                                                                                    </div>
                                                                                    <div className="space-y-2">
                                                                                        {pkg.deliverables.split('\n').map((deliverable, index) => (
                                                                                            deliverable.trim() && (
                                                                                                <div key={index} className="group flex items-center gap-3 bg-primary-700/30 backdrop-blur-sm rounded-xl p-3 border border-primary-400/20 hover:bg-primary-600/40 transition-all duration-300">
                                                                                                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center border border-accent/30">
                                                                                                        <span className="text-accent font-bold text-xs">{index + 1}</span>
                                                                                                    </div>
                                                                                                    <span className={`text-primary-200 ${isSignatureSeries ? 'text-sm' : 'text-xs'} leading-relaxed group-hover:text-primary-100 transition-colors duration-300`}>
                                                                                                        {deliverable.trim()}
                                                                                                    </span>
                                                                                                </div>
                                                                                            )
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            )}

                                                                            {/* Enhanced collaborative features */}
                                                                            {!isSignatureSeries && pkg.submissionLimit > 0 && (
                                                                                <div className="relative bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-4 border border-primary-400/20">
                                                                                    <div className="flex items-center gap-3">
                                                                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
                                                                                            <FiPackage className="text-blue-400" />
                                                                                        </div>
                                                                                        <div>
                                                                                            <span className="text-primary-100 font-semibold text-sm">Your Creative Input</span>
                                                                                            <p className={`text-primary-200 ${isSignatureSeries ? 'text-sm' : 'text-xs'} mt-1`}>
                                                                                                Submit up to <span className="text-accent font-semibold">{pkg.submissionLimit}</span> names for our expert validation
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )}

                                                                            {/* Enhanced expected outcome */}
                                                                            {pkg.expectedOutcome && pkg.expectedOutcome !== 'There is no Expected Outcome for this plan. ' && pkg.expectedOutcome !== 'There is no Expected Outcome' && (
                                                                                <div className="relative bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-4 border border-green-400/20">
                                                                                    <div className="flex items-center gap-3">
                                                                                        <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center border border-green-400/30">
                                                                                            <FiTrendingUp className="text-green-400" />
                                                                                        </div>
                                                                                        <div>
                                                                                            <span className="text-primary-100 font-semibold text-sm">Expected Results</span>
                                                                                            <p className={`text-primary-200 ${isSignatureSeries ? 'text-sm' : 'text-xs'} mt-1`}>
                                                                                                {isSignatureSeries ? 'Complete Cosmic Blueprint analysis' : pkg.expectedOutcome}
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )}

                                                                            {/* Enhanced verification features */}
                                                                            <div className="space-y-2">
                                                                                <div className="flex items-center gap-3 bg-gradient-to-r from-accent/10 to-yellow-500/10 backdrop-blur-sm rounded-xl p-3 border border-accent/30">
                                                                                    <FiShield className="text-accent flex-shrink-0" size={18} />
                                                                                    <div>
                                                                                        <span className="text-primary-100 font-semibold text-sm">Cosmic Verification</span>
                                                                                        <p className={`text-primary-200 ${isSignatureSeries ? 'text-sm' : 'text-xs'} mt-1`}>
                                                                                            Every name is validated using Stellar Fortune principles
                                                                                        </p>
                                                                                    </div>
                                                                                </div>

                                                                                {/* Popular package bonuses */}
                                                                                {pkg.isPopular && (
                                                                                    <>
                                                                                        <div className="flex items-center gap-3 bg-gradient-to-r from-accent/20 to-secondary/20 backdrop-blur-sm rounded-xl p-3 border border-accent/40">
                                                                                            <FiAward className="text-accent flex-shrink-0" size={18} />
                                                                                            <div>
                                                                                                <span className="text-primary-100 font-semibold text-sm">Premium Benefits</span>
                                                                                                <p className={`text-primary-200 ${isSignatureSeries ? 'text-sm' : 'text-xs'} mt-1`}>
                                                                                                    Priority delivery + Brand energy analysis
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    {/* Enhanced Personal & Nickname Solutions Features */}
                                                                    {category === 'Personal & Nickname Solutions' && (
                                                                        <div className="space-y-3">
                                                                            <div className="relative bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20">
                                                                                <div className="flex items-center gap-3">
                                                                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-400/30">
                                                                                        <FiGift className="text-purple-400" />
                                                                                    </div>
                                                                                    <div>
                                                                                        <span className="text-primary-100 font-semibold text-sm">From Galaxy NameLab</span>
                                                                                        <p className="text-primary-200 text-sm mt-1">{pkg.deliverables}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="relative bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-xl p-4 border border-blue-400/20">
                                                                                <div className="flex items-center gap-3">
                                                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
                                                                                        <FiPackage className="text-blue-400" />
                                                                                    </div>
                                                                                    <div>
                                                                                        <span className="text-primary-100 font-semibold text-sm">From You</span>
                                                                                        <p className="text-primary-200 text-sm mt-1">
                                                                                            {pkg.submissionLimit > 0
                                                                                                ? `Submit ${pkg.submissionLimit} ideas for validation`
                                                                                                : 'Submit unlimited ideas for validation'
                                                                                            }
                                                                                            {pkg.expectedOutcome && <span className="block text-accent font-medium mt-1">Expected: {pkg.expectedOutcome}</span>}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="relative bg-gradient-to-r from-accent/20 to-yellow-500/20 backdrop-blur-sm rounded-xl p-4 border border-accent/40">
                                                                                <div className="flex items-center gap-3">
                                                                                    <div className="w-10 h-10 bg-gradient-to-br from-accent/30 to-yellow-500/30 rounded-lg flex items-center justify-center border border-accent/50">
                                                                                        <FiStar className="text-accent" />
                                                                                    </div>
                                                                                    <div>
                                                                                        <span className="text-primary-100 font-semibold text-sm">Total Result</span>
                                                                                        <p className="text-primary-200 text-sm mt-1">{pkg.description}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    {/* Default Features for other categories */}
                                                                    {category !== 'Business Naming Solutions' && category !== 'Personal & Nickname Solutions' && (
                                                                        <>
                                                                            <div className="flex items-center text-primary-100">
                                                                                <FiCheck className="text-accent mr-3 flex-shrink-0" size={18} />
                                                                                <span className="text-primary-200">{pkg.deliverables}</span>
                                                                            </div>
                                                                            {pkg.expectedOutcome && (
                                                                                <div className="flex items-center text-primary-100">
                                                                                    <FiCheck className="text-accent mr-3 flex-shrink-0" size={18} />
                                                                                    <span className="text-primary-200">{pkg.expectedOutcome}</span>
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </div>

                                                                {/* Enhanced Button Container - Always at bottom */}
                                                                <div className="mt-8 relative z-10">
                                                                    <Button
                                                                        className={`w-full relative overflow-hidden group ${pkg.isPopular
                                                                            ? 'bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-primary-950 font-bold shadow-lg hover:shadow-accent/50'
                                                                            : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-primary-100 font-semibold shadow-lg hover:shadow-primary-500/50'
                                                                            } font-semibold py-3 px-6 rounded-full transition-all duration-500 transform hover:scale-105 hover:-translate-y-1`}
                                                                        onClick={() => console.log(`Selected: ${pkg.name}`)}
                                                                    >
                                                                        <span className="relative z-10">Get Started</span>
                                                                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                                        {pkg.isPopular && (
                                                                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                                                                <MdWorkspacePremium className="text-primary-900/60 text-sm animate-pulse" />
                                                                            </div>
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            ))}

                            {/* How It Works Section */}
                            <motion.div
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                custom={1.1}
                                className="mb-20"
                            >
                                <div className="text-center mb-12">
                                    <h3 className="text-3xl font-bold text-primary-100 mb-4">
                                        How It Works
                                    </h3>
                                    <p className="text-lg text-primary-200 max-w-3xl mx-auto">
                                        Our proven process for discovering your perfect Stellar Fortune names
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                    <motion.div
                                        variants={fadeUp}
                                        initial="hidden"
                                        animate="visible"
                                        custom={1.2}
                                        className="text-center"
                                    >
                                        <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <span className="text-2xl font-bold text-primary-100">1</span>
                                        </div>
                                        <h4 className="text-xl font-semibold text-primary-100 mb-3">
                                            We Analyze Your Chart
                                        </h4>
                                        <p className="text-primary-200">
                                            We analyze your chart and provide your "Stellar Key Letters" (e.g., starts with A, B, C...).
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        variants={fadeUp}
                                        initial="hidden"
                                        animate="visible"
                                        custom={1.3}
                                        className="text-center"
                                    >
                                        <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <span className="text-2xl font-bold text-primary-100">2</span>
                                        </div>
                                        <h4 className="text-xl font-semibold text-primary-100 mb-3">
                                            You Generate Names
                                        </h4>
                                        <p className="text-primary-200">
                                            You generate a list of names using these letters based on your creative vision.
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        variants={fadeUp}
                                        initial="hidden"
                                        animate="visible"
                                        custom={1.4}
                                        className="text-center"
                                    >
                                        <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <span className="text-2xl font-bold text-primary-100">3</span>
                                        </div>
                                        <h4 className="text-xl font-semibold text-primary-100 mb-3">
                                            We Audit & Verify
                                        </h4>
                                        <p className="text-primary-200">
                                            We audit your list and identify the ones that are True Stellar Fortune Names.
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </div>
            </section>
        </PageWrapper>
    );
};

export default OfferingsPage;