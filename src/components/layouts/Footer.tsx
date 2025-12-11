import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: "easeOut" as const },
    }),
};

const Footer: React.FC = () => {
    return (
        <motion.footer
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1.8}
            className="w-full bg-primary-950 border-t border-primary-600/30 pt-8 pb-6"
        >
            <div className="w-full max-w-6xl mx-auto px-4 text-white">
                <div className="flex flex-col items-center gap-8">
                    {/* How It Works Section */}
                    <div className="text-center max-w-4xl">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={2.0}
                            className="mb-8"
                        >
                            <h3 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                How It Works
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Step 1 */}
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="visible"
                                    custom={2.1}
                                    className="bg-primary-800/50 backdrop-blur-sm rounded-2xl p-6 border border-primary-600/30 hover:border-yellow-500/50 transition-all duration-300 group"
                                >
                                    <div className="text-3xl font-bold text-yellow-400 mb-3">01</div>
                                    <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                                        Stellar Analysis
                                    </h4>
                                    <p className="text-primary-300 text-sm leading-relaxed">
                                        We analyze your chart and provide your "Stellar Key Letters" (e.g., starts with A, B, C...)
                                    </p>
                                </motion.div>

                                {/* Step 2 */}
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="visible"
                                    custom={2.2}
                                    className="bg-primary-800/50 backdrop-blur-sm rounded-2xl p-6 border border-primary-600/30 hover:border-yellow-500/50 transition-all duration-300 group"
                                >
                                    <div className="text-3xl font-bold text-yellow-400 mb-3">02</div>
                                    <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                                        Creative Generation
                                    </h4>
                                    <p className="text-primary-300 text-sm leading-relaxed">
                                        You generate a list of names using these letters
                                    </p>
                                </motion.div>

                                {/* Step 3 */}
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="visible"
                                    custom={2.3}
                                    className="bg-primary-800/50 backdrop-blur-sm rounded-2xl p-6 border border-primary-600/30 hover:border-yellow-500/50 transition-all duration-300 group"
                                >
                                    <div className="text-3xl font-bold text-yellow-400 mb-3">03</div>
                                    <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                                        Fortune Audit
                                    </h4>
                                    <p className="text-primary-300 text-sm leading-relaxed">
                                        We audit your list and identify the ones that are True Stellar Fortune Names
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Copyright Section */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={2.4}
                        className="border-t border-primary-600/30 w-full pt-6"
                    >
                        <div className="text-primary-300 text-sm text-center space-y-2">
                            <p className="flex items-center justify-center gap-2">
                                <span>&copy; {new Date().getFullYear()} Galaxy NameLab. All Rights Reserved.</span>
                                <span className="text-yellow-400">✨</span>
                            </p>
                            <p className="text-primary-400">Crafted with cosmic energy and guided by the stars</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;