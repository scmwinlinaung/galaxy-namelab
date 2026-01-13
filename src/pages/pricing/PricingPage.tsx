// src/pages/pricing/PricingPage.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiCheck, FiX, FiPackage, FiZap, FiGift, FiShield, FiTrendingUp, FiAward } from 'react-icons/fi';
import { MdWorkspacePremium } from 'react-icons/md';

import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import Section from '@components/ui/Section';
import Button from '@components/ui/Button';
import CheckoutModal from '@components/payment/CheckoutModal';
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

interface PricingPageProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);


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

    const handleGetStarted = (pkg: Package) => {
        setSelectedPackage(pkg);
        setIsCheckoutModalOpen(true);
    };

    const handleCloseCheckoutModal = () => {
        setIsCheckoutModalOpen(false);
        setSelectedPackage(null);
    };

    // Sort packages by displayOrder
    const sortedPackages = [...packages].sort((a, b) => a.displayOrder - b.displayOrder);

    // Group packages by categoryCode only
    const packagesByCategory = sortedPackages.reduce((acc, pkg) => {
        const category = pkg.categoryName || 'Other';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(pkg);
        return acc;
    }, {} as Record<string, Package[]>);
    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />

            {/* Hero Section - Beautiful Dark Cosmic Design */}
            <section className="relative w-full min-h-screen flex flex-col items-center justify-start text-center bg-primary-950 text-primary-50 overflow-hidden px-4 py-12">
                {/* Background Blobs - Updated for dark theme */}
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
                        Our Pricing
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white">
                        Invest in Your Legacy
                    </h2>
                    <p className="text-xl text-white leading-relaxed max-w-4xl mx-auto">
                        Choose the path that aligns with your vision. Whether you want us to craft the perfect name or validate your own creative ideas, we ensure your brand resonates with Stellar Fortune energy.
                    </p>
                </motion.div>

                {/* Main Content - Still in hero section for cosmic styling */}
                <div className="w-full max-w-7xl mx-auto mb-16">
                    {/* Loading State */}
                    {loading && (
                        <div className="text-center py-12">
                            <div className="text-2xl text-primary-300 font-medium animate-pulse">Loading cosmic packages...</div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="text-center py-12">
                            <div className="text-2xl text-red-400 font-medium bg-red-900/20 backdrop-blur-sm rounded-2xl p-6 border border-red-800 max-w-2xl mx-auto">Error: {error}</div>
                        </div>
                    )}

                    {/* Content State */}
                    {!loading && !error && packages.length > 0 && (
                        <>
                            {/* Dynamic Category Rendering */}
                            {Object.entries(packagesByCategory).map(([category, categoryPackages], categoryIndex) => (
                                <motion.div
                                    key={category}
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="visible"
                                    custom={0.2 + categoryIndex * 0.3}
                                    className="mb-20"
                                >
                                    <div className="text-center mb-12">
                                        <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-amber-600 mb-10">
                                            {category}
                                        </h3>
                                        <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed font-light">
                                            {category === 'Business Naming Solutions'
                                                ? 'Professional naming services tailored to your business needs'
                                                : category === 'Personal & Nickname Solutions'
                                                    ? 'Unlock your personal charisma. These hybrid packages combine our expert suggestions with a validation of your own ideas.'
                                                    : 'Premium solutions designed to meet your unique requirements'
                                            }
                                        </p>
                                    </div>

                                    {/* Package Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                                        {categoryPackages.map((pkg, pkgIndex) => (
                                            <motion.div
                                                // @ts-ignore
                                                key={pkg._id || pkg.id}
                                                variants={fadeUp}
                                                initial="hidden"
                                                animate="visible"
                                                custom={0.3 + categoryIndex * 0.3 + pkgIndex * 0.1}
                                                className={`relative ${pkg.plan?.isPopular ? 'scale-105' : ''
                                                    } transition-all duration-300 hover:-translate-y-1 flex flex-col mb-10`}
                                            >
                                                {pkg.plan?.isPopular && (
                                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                                        <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                                                            MOST POPULAR
                                                        </span>
                                                    </div>
                                                )}

                                                <div className={`h-full relative overflow-hidden group ${pkg.plan?.isPopular
                                                    ? 'bg-gradient-to-br from-amber-900/30 via-purple-900/30 to-primary-900/50 hover:from-amber-900/20 hover:via-purple-900/20 hover:to-primary-900/30'
                                                    : 'bg-gradient-to-br from-purple-900/30 via-amber-900/30 to-primary-900/50 hover:from-purple-900/20 hover:via-amber-900/20 hover:to-primary-900/30'
                                                    } rounded-3xl p-8 border-2 ${pkg.plan?.isPopular ? 'border-amber-600/50' : 'border-primary-700/50'} shadow-xl hover:shadow-2xl backdrop-blur-sm hover:scale-105 transition-all duration-500 flex flex-col`}>

                                                    {/* Enhanced background effects */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                    {pkg.plan?.isPopular && (
                                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-600/20 to-transparent rounded-full blur-2xl"></div>
                                                    )}

                                                    {/* Header with improved styling */}
                                                    <div className="relative text-center mb-6">
                                                        {pkg.plan?.isPopular && (
                                                            <div className="flex justify-center mb-4">
                                                                <MdWorkspacePremium className="text-amber-600 text-3xl animate-pulse drop-shadow-lg" />
                                                            </div>
                                                        )}
                                                        <h5 className="font-bold text-primary-50 mb-3 text-2xl">{pkg.plan?.name || 'Package'}</h5>
                                                        <div className={`font-semibold text-white mb-3 text-lg opacity-80`}>
                                                            {pkg.plan?.code || 'PREMIUM'}
                                                        </div>
                                                        {pkg.path?.name && (
                                                            <div className="text-amber-400 font-medium text-sm mb-2">
                                                                {pkg.path.name}
                                                            </div>
                                                        )}
                                                        <div className="text-3xl font-bold text-white mb-1">
                                                            ${pkg.price?.amount || 0}
                                                        </div>
                                                        <div className="text-sm text-primary-300 opacity-80">
                                                            {pkg.price?.currency || 'USD'}
                                                        </div>
                                                    </div>

                                                    {/* Deliverables Info */}
                                                    {pkg.deliverables?.generatedNames > 0 && (
                                                        <div className="relative bg-green-900/30 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-green-700/50">
                                                            <div className="flex items-center justify-center gap-2 mb-2">
                                                                <FiStar className="text-green-400" />
                                                                <span className="text-green-400 font-semibold text-base">Generated Names</span>
                                                            </div>
                                                            <div className="text-center">
                                                                <span className="text-2xl font-bold text-white">{pkg.deliverables.generatedNames}</span>
                                                                <span className="text-green-300 font-medium ml-2">expert-crafted names</span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Enhanced Submission Info with better styling */}
                                                    {(pkg.submissionPolicy && (
                                                        (pkg.submissionPolicy.totalSubmissions !== undefined && pkg.submissionPolicy.totalSubmissions !== 0) ||
                                                        (pkg.submissionPolicy.maxNamesPerSubmission !== undefined && pkg.submissionPolicy.maxNamesPerSubmission !== 0)
                                                    )) && (
                                                            <div className="relative bg-purple-900/30 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-purple-700/50">
                                                                <div className="flex items-center justify-center gap-2 mb-2">
                                                                    <FiPackage className="text-amber-400" />
                                                                    <span className="text-amber-400 font-semibold text-base">Submission Details</span>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    {/* Total Submissions */}
                                                                    {pkg.submissionPolicy.totalSubmissions !== undefined && pkg.submissionPolicy.totalSubmissions !== 0 && (
                                                                        <div className="flex items-center justify-center text-white text-base">
                                                                            <span className="font-medium text-white">Submissions:</span>
                                                                            <span className={`ml-2 px-3 py-1 rounded-full font-semibold text-base ${pkg.submissionPolicy.totalSubmissions === 'UNLIMITED'
                                                                                ? 'bg-green-800/50 text-green-300'
                                                                                : 'bg-blue-800/50 text-blue-300'
                                                                                }`}>
                                                                                {pkg.submissionPolicy.totalSubmissions === 'UNLIMITED'
                                                                                    ? 'Unlimited submissions'
                                                                                    : `${pkg.submissionPolicy.totalSubmissions} submission${parseInt(pkg.submissionPolicy.totalSubmissions.toString()) > 1 ? 's' : ''}`
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    {/* Max Names Per Submission */}
                                                                    {pkg.submissionPolicy.maxNamesPerSubmission !== undefined && pkg.submissionPolicy.maxNamesPerSubmission !== 0 && pkg.submissionPolicy.maxNamesPerSubmission !== 'UNLIMITED' && (
                                                                        <div className="flex items-center justify-center text-white text-base">
                                                                            <span className="font-medium text-white">Limit:</span>
                                                                            <span className="ml-2 px-3 py-1 bg-amber-800/50 rounded-full text-amber-300 font-semibold text-base">
                                                                                {pkg.submissionPolicy.maxNamesPerSubmission} names
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    {pkg.submissionPolicy.maxNamesPerSubmission === 'UNLIMITED' && (
                                                                        <div className="flex items-center justify-center text-white text-base">
                                                                            <span className="font-medium text-white">Limit:</span>
                                                                            <span className="ml-2 px-3 py-1 bg-green-800/50 rounded-full text-green-300 font-semibold text-base">
                                                                                Unlimited names
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    {pkg.submissionPolicy.submissionWindowDays && pkg.submissionPolicy.submissionWindowDays > 0 && (
                                                                        <div className="flex items-center justify-center text-white text-base">
                                                                            <span className="font-medium text-white">Duration:</span>
                                                                            <span className="ml-2 px-3 py-1 bg-purple-800/50 rounded-full text-white text-base">
                                                                                {pkg.submissionPolicy.submissionWindowDays} days
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                    {/* Enhanced Package Description */}
                                                    {pkg.description && (
                                                        <div className="relative bg-amber-900/30 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-amber-700/50">
                                                            <div className="flex items-start gap-3">
                                                                <FiZap className="text-amber-400 mt-1 flex-shrink-0" size={16} />
                                                                <p className="text-white text-sm leading-relaxed">
                                                                    {pkg.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Enhanced Package Features with beautiful styling */}
                                                    <div className="space-y-4 flex-grow">
                                                        {/* Business Naming Solutions Features */}
                                                        {category === 'Business Naming Solutions' && (
                                                            <div className="space-y-3">
                                                                {/* Generated Names Display */}
                                                                {pkg.deliverables?.generatedNames > 0 && (
                                                                    <div className="relative bg-green-900/30 backdrop-blur-sm rounded-xl p-4 border border-green-700/50">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="w-10 h-10 bg-gradient-to-br from-green-800 to-emerald-800 rounded-lg flex items-center justify-center border border-green-600/50">
                                                                                <FiStar className="text-green-400" />
                                                                            </div>
                                                                            <div>
                                                                                <span className="text-primary-50 font-semibold text-sm">Expert-Crafted Names</span>
                                                                                <p className="text-white text-sm mt-1">
                                                                                    Receive <span className="text-green-400 font-semibold">{pkg.deliverables.generatedNames}</span> professionally curated names
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Path Information */}
                                                                {pkg.path?.description && (
                                                                    <div className="relative bg-purple-900/30 backdrop-blur-sm rounded-xl p-4 border border-purple-700/50">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-800 to-indigo-800 rounded-lg flex items-center justify-center border border-purple-600/50">
                                                                                <FiAward className="text-purple-400" />
                                                                            </div>
                                                                            <div>
                                                                                <span className="text-primary-50 font-semibold text-sm">Service Type</span>
                                                                                <p className="text-white text-sm mt-1">
                                                                                    {pkg.path.description}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Enhanced collaborative features */}
                                                                {pkg.submissionPolicy && pkg.submissionPolicy.maxNamesPerSubmission !== undefined && pkg.submissionPolicy.maxNamesPerSubmission !== 'UNLIMITED' && typeof pkg.submissionPolicy.maxNamesPerSubmission === 'number' && pkg.submissionPolicy.maxNamesPerSubmission > 0 && (
                                                                    <div className="relative bg-blue-900/30 backdrop-blur-sm rounded-xl p-4 border border-blue-700/50">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-800 to-purple-800 rounded-lg flex items-center justify-center border border-blue-600/50">
                                                                                <FiPackage className="text-blue-400" />
                                                                            </div>
                                                                            <div>
                                                                                <span className="text-primary-50 font-semibold text-sm">Your Creative Input</span>
                                                                                <p className="text-white text-sm mt-1">
                                                                                    Submit up to <span className="text-purple-400 font-semibold">{pkg.submissionPolicy.maxNamesPerSubmission}</span> names for our expert validation
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {pkg.submissionPolicy && pkg.submissionPolicy.maxNamesPerSubmission !== undefined && pkg.submissionPolicy.maxNamesPerSubmission === 'UNLIMITED' && (
                                                                    <div className="relative bg-blue-900/30 backdrop-blur-sm rounded-xl p-4 border border-blue-700/50">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-800 to-purple-800 rounded-lg flex items-center justify-center border border-blue-600/50">
                                                                                <FiPackage className="text-blue-400" />
                                                                            </div>
                                                                            <div>
                                                                                <span className="text-primary-50 font-semibold text-sm">Your Creative Input</span>
                                                                                <p className="text-white text-sm mt-1">
                                                                                    Submit <span className="text-green-400 font-semibold">unlimited</span> names for our expert validation
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Enhanced expected outcome */}
                                                                {pkg.expectedOutcome && pkg.expectedOutcome !== 'There is no Expected Outcome for this plan. ' && pkg.expectedOutcome !== 'There is no Expected Outcome' && (
                                                                    <div className="relative bg-green-900/30 backdrop-blur-sm rounded-xl p-4 border border-green-700/50">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="w-10 h-10 bg-gradient-to-br from-green-800 to-emerald-800 rounded-lg flex items-center justify-center border border-green-600/50">
                                                                                <FiTrendingUp className="text-green-400" />
                                                                            </div>
                                                                            <div>
                                                                                <span className="text-primary-50 font-semibold text-sm">Expected Results</span>
                                                                                <p className="text-white text-sm mt-1">
                                                                                    {pkg.expectedOutcome}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Enhanced verification features */}
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center gap-3 bg-amber-900/30 backdrop-blur-sm rounded-xl p-4 border border-amber-700/50">
                                                                        <FiShield className="text-amber-400 flex-shrink-0" size={18} />
                                                                        <div>

                                                                            <p className="text-white text-sm mt-1">
                                                                                Every name is validated using Stellar Fortune principles
                                                                            </p>
                                                                        </div>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Enhanced Personal & Nickname Solutions Features */}
                                                        {category === 'Personal & Nickname Solutions' && (
                                                            <div className="space-y-3">
                                                                {/* Expert-Crafted Names */}
                                                                {pkg.deliverables?.generatedNames > 0 && (
                                                                    <div className="relative bg-purple-900/30 backdrop-blur-sm rounded-xl p-4 border border-purple-700/50">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-800 to-pink-800 rounded-lg flex items-center justify-center border border-purple-600/50">
                                                                                <FiGift className="text-purple-400" />
                                                                            </div>
                                                                            <div>
                                                                                <span className="text-primary-50 font-semibold text-sm">From Galaxy NameLab</span>
                                                                                <p className="text-white text-sm mt-1">
                                                                                    Receive <span className="text-purple-400 font-semibold">{pkg.deliverables.generatedNames}</span> expert-crafted names
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Path Information */}
                                                                {pkg.path?.description && (
                                                                    <div className="relative bg-indigo-900/30 backdrop-blur-sm rounded-xl p-4 border border-indigo-700/50">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-800 to-purple-800 rounded-lg flex items-center justify-center border border-indigo-600/50">
                                                                                <FiAward className="text-indigo-400" />
                                                                            </div>
                                                                            <div>
                                                                                <span className="text-primary-50 font-semibold text-sm">Service Type</span>
                                                                                <p className="text-white text-sm mt-1">
                                                                                    {pkg.path.description}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                <div className="relative bg-blue-900/30 backdrop-blur-sm rounded-xl p-4 border border-blue-700/50">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-800 to-cyan-800 rounded-lg flex items-center justify-center border border-blue-600/50">
                                                                            <FiPackage className="text-blue-400" />
                                                                        </div>
                                                                        <div>
                                                                            <span className="text-primary-50 font-semibold text-sm">From You</span>
                                                                            <p className="text-white text-sm mt-1">
                                                                                {pkg.submissionPolicy && pkg.submissionPolicy.maxNamesPerSubmission !== undefined && pkg.submissionPolicy.maxNamesPerSubmission !== 'UNLIMITED' && typeof pkg.submissionPolicy.maxNamesPerSubmission === 'number' && pkg.submissionPolicy.maxNamesPerSubmission > 0
                                                                                    ? `Submit ${pkg.submissionPolicy.maxNamesPerSubmission} ideas for validation`
                                                                                    : 'Submit unlimited ideas for validation'
                                                                                }
                                                                                {pkg.expectedOutcome && <span className="block text-amber-400 font-medium mt-1">Expected: {pkg.expectedOutcome}</span>}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="relative bg-amber-900/30 backdrop-blur-sm rounded-xl p-4 border border-amber-700/50">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-10 h-10 bg-gradient-to-br from-amber-800 to-yellow-800 rounded-lg flex items-center justify-center border border-amber-600/50">
                                                                            <FiStar className="text-amber-400" />
                                                                        </div>
                                                                        <div>
                                                                            <span className="text-primary-50 font-semibold text-sm">Total Result</span>
                                                                            <p className="text-white text-sm mt-1">{pkg.expectedOutcome || 'Complete analysis and validation'}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Default Features for other categories */}
                                                        {category !== 'Business Naming Solutions' && category !== 'Personal & Nickname Solutions' && (
                                                            <>
                                                                {pkg.expectedOutcome && (
                                                                    <div className="flex items-center text-primary-50">
                                                                        <FiCheck className="text-purple-400 mr-3 flex-shrink-0" size={18} />
                                                                        <span className="text-white">{pkg.expectedOutcome}</span>
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>

                                                    {/* Enhanced Button Container - Always at bottom */}
                                                    <div className="mt-8 relative z-10">
                                                        <Button
                                                            className={`w-full relative overflow-hidden group ${pkg.plan?.isPopular
                                                                ? 'bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-900 font-bold shadow-lg hover:shadow-amber-400/50 text-lg py-4'
                                                                : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-semibold shadow-lg hover:shadow-purple-500/50 text-base py-3'
                                                                } font-semibold px-6 rounded-full transition-all duration-500 transform hover:scale-105 hover:-translate-y-1`}
                                                            onClick={() => handleGetStarted(pkg)}
                                                        >
                                                            <span className="relative z-10">Get Started</span>
                                                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                            {pkg.plan?.isPopular && (
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
                                </motion.div>
                            ))}

                            {/* How It Works Section */}
                            <div className="text-center w-full ">
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="visible"
                                    custom={2.0}
                                    className="mb-8"
                                >
                                    <h3 className="text-4xl font-bold text-primary-50 mb-8 bg-gradient-to-r from-purple-600 via-amber-600 to-purple-600 bg-clip-text text-transparent">
                                        How It Works
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Step 1 */}
                                        <motion.div
                                            variants={fadeUp}
                                            initial="hidden"
                                            animate="visible"
                                            custom={2.1}
                                            className="bg-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-700/50 hover:border-amber-600/60 transition-all duration-300 group hover:scale-105"
                                        >
                                            <div className="text-5xl font-bold text-amber-600 mb-4">01</div>
                                            <h4 className="text-xl font-bold text-primary-50 mb-4 group-hover:text-amber-400 transition-colors">
                                                Stellar Analysis
                                            </h4>
                                            <p className="text-white text-base leading-relaxed">
                                                We analyze your chart and provide your "Stellar Key Letters" (e.g., starts with A, B, C...)
                                            </p>
                                        </motion.div>

                                        {/* Step 2 */}
                                        <motion.div
                                            variants={fadeUp}
                                            initial="hidden"
                                            animate="visible"
                                            custom={2.2}
                                            className="bg-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-700/50 hover:border-amber-600/60 transition-all duration-300 group hover:scale-105"
                                        >
                                            <div className="text-5xl font-bold text-amber-600 mb-4">02</div>
                                            <h4 className="text-xl font-bold text-primary-50 mb-4 group-hover:text-amber-400 transition-colors">
                                                Creative Generation
                                            </h4>
                                            <p className="text-white text-base leading-relaxed">
                                                You generate a list of names using these letters
                                            </p>
                                        </motion.div>

                                        {/* Step 3 */}
                                        <motion.div
                                            variants={fadeUp}
                                            initial="hidden"
                                            animate="visible"
                                            custom={2.3}
                                            className="bg-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-700/50 hover:border-amber-600/60 transition-all duration-300 group hover:scale-105"
                                        >
                                            <div className="text-5xl font-bold text-amber-600 mb-4">03</div>
                                            <h4 className="text-xl font-bold text-primary-50 mb-4 group-hover:text-amber-400 transition-colors">
                                                Fortune Audit
                                            </h4>
                                            <p className="text-white text-base leading-relaxed">
                                                We audit your list and identify the ones that are True Stellar Fortune Names
                                            </p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Checkout Modal */}
            <CheckoutModal
                isOpen={isCheckoutModalOpen}
                onClose={handleCloseCheckoutModal}
                selectedPackage={selectedPackage}
            />
        </PageWrapper>
    );
};

export default PricingPage;