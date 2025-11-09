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
                <div className="flex flex-col items-center gap-4">
                    <div className="text-primary-300 text-sm text-center">
                        <p>&copy; {new Date().getFullYear()} Galaxy NameLab. All Rights Reserved.</p>
                        <p className="mt-1">Crafted with ✨ and guided by the stars</p>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;