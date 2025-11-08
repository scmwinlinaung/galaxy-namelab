// src/pages/pricing/PricingPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiStar, FiZap, FiAward, FiTrendingUp } from 'react-icons/fi';

import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import Button from '@components/ui/Button';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: "easeOut" as const },
    }),
};

const pricingPlans = [

    {
        name: "Cosmic Explorer",
        price: "$19",
        period: "",
        description: "For serious name seekers and creators",
        icon: <FiStar className="w-6 h-6" />,
        color: "from-blue-600 to-purple-700",
        borderColor: "border-blue-500",
        buttonColor: "bg-blue-600 hover:bg-blue-700",
        features: [
            { name: "Unlimited name generations", included: true },
            { name: "Deep numerology analysis", included: true },
            { name: "Full birth chart compatibility", included: true },
            { name: "Priority email support", included: true },
            { name: "Advanced astrology reports", included: true },
            { name: "Business name analysis", included: true },
            { name: "Name history tracking", included: true },
            { name: "Custom name consultations", included: false },
        ],
        highlighted: true,
        popular: "Most Popular"
    },
    {
        name: "Galaxy Master",
        price: "$49",
        period: "",
        description: "Ultimate cosmic naming experience",
        icon: <FiAward className="w-6 h-6" />,
        color: "from-yellow-600 to-orange-700",
        borderColor: "border-yellow-500",
        buttonColor: "bg-yellow-600 hover:bg-yellow-700",
        features: [
            { name: "Everything in Cosmic Explorer", included: true },
            { name: "Unlimited custom consultations", included: true },
            { name: "Personal astrologer access", included: true },
            { name: "Business partnership naming", included: true },
            { name: "Family name compatibility", included: true },
            { name: "API access for developers", included: true },
            { name: "White-label solutions", included: true },
            { name: "24/7 phone support", included: true },
        ],
        highlighted: false
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For businesses and agencies",
        icon: <FiTrendingUp className="w-6 h-6" />,
        color: "from-green-600 to-emerald-700",
        borderColor: "border-green-500",
        buttonColor: "bg-green-600 hover:bg-green-700",
        features: [
            { name: "Custom pricing plans", included: true },
            { name: "Dedicated account manager", included: true },
            { name: "Enterprise API integration", included: true },
            { name: "Custom branding options", included: true },
            { name: "Advanced analytics dashboard", included: true },
            { name: "Team collaboration tools", included: true },
            { name: "On-premise deployment", included: true },
            { name: "SLA guarantee", included: true },
        ],
        highlighted: false
    }
];

interface PricingPageProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />

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
                        Cosmic Pricing Plans
                    </h1>
                    <p className="text-lg text-primary-200 leading-relaxed">
                        Choose the perfect cosmic plan for your naming journey. From free explorations to
                        enterprise solutions, we have options for every cosmic traveler.
                    </p>
                </motion.div>


                {/* Pricing Cards */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.5}
                    className="w-full max-w-7xl mb-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={index}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                custom={0.7 + index * 0.1}
                                className={`relative ${plan.highlighted ? 'scale-105' : ''}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                        <span className="bg-yellow-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                                            {plan.popular}
                                        </span>
                                    </div>
                                )}

                                <div className={`h-full bg-gradient-to-br ${plan.color} rounded-3xl p-6 border-2 ${plan.borderColor} shadow-2xl backdrop-blur-sm hover:scale-105 transition-transform duration-300`}>
                                    {/* Plan Header */}
                                    <div className="text-center mb-6">
                                        <div className="flex justify-center mb-4">
                                            {plan.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                        <div className="flex items-baseline justify-center gap-1">
                                            <span className="text-4xl font-bold text-white">{plan.price}</span>
                                            {plan.period && (
                                                <span className="text-white/80">{plan.period}</span>
                                            )}
                                        </div>
                                        <p className="text-white/80 text-sm mt-2">{plan.description}</p>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-3 mb-8">
                                        {plan.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-start gap-2">
                                                {feature.included ? (
                                                    <FiCheck className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                                                ) : (
                                                    <FiX className="w-5 h-5 text-white/50 flex-shrink-0 mt-0.5" />
                                                )}
                                                <span className={`text-sm ${feature.included ? 'text-white' : 'text-white/50'}`}>
                                                    {feature.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <Button
                                        className={`w-full ${plan.buttonColor} text-white font-semibold py-3 rounded-full hover:shadow-lg transition-all duration-300`}
                                        onClick={() => {
                                            // Handle plan selection
                                            console.log(`Selected plan: ${plan.name}`);
                                        }}
                                    >
                                        {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Additional Information */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={1.5}
                    className="w-full max-w-5xl mb-12"
                >
                    {/* FAQ Section */}
                    <div className="bg-primary-900/30 backdrop-blur-md rounded-3xl p-8 border border-primary-600/30">
                        <h2 className="text-3xl font-bold text-primary-100 mb-6">
                            Frequently Asked Questions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            <div>
                                <h3 className="text-xl font-bold text-primary-200 mb-2">
                                    How accurate are the cosmic predictions?
                                </h3>
                                <p className="text-primary-300 text-sm">
                                    Our system combines traditional numerology and astrology principles with modern
                                    algorithms to provide insights that many users find remarkably accurate and helpful.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary-200 mb-2">
                                    Can I change my plan anytime?
                                </h3>
                                <p className="text-primary-300 text-sm">
                                    Yes! You can upgrade, downgrade, or cancel your subscription at any time.
                                    Changes take effect at the next billing cycle.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary-200 mb-2">
                                    Do you offer refunds?
                                </h3>
                                <p className="text-primary-300 text-sm">
                                    We offer a 30-day money-back guarantee for all paid plans.
                                    If you're not satisfied, we'll refund your purchase.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary-200 mb-2">
                                    Is my data secure?
                                </h3>
                                <p className="text-primary-300 text-sm">
                                    Absolutely. We use industry-standard encryption and security measures
                                    to protect your personal information and birth data.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Money Back Guarantee */}
                    <div className="mt-8 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-3xl p-8 border border-yellow-600/30">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <FiStar className="text-3xl text-yellow-400" />
                            <h3 className="text-2xl font-bold text-primary-100">
                                30-Day Cosmic Guarantee
                            </h3>
                            <FiStar className="text-3xl text-yellow-400" />
                        </div>
                        <p className="text-primary-200 text-center leading-relaxed">
                            Try any paid plan risk-free for 30 days. If you don't feel the cosmic connection
                            or aren't completely satisfied with your naming insights, we'll refund 100% of your purchase.
                        </p>
                    </div>
                </motion.div>
            </section>
        </PageWrapper>
    );
};

export default PricingPage;