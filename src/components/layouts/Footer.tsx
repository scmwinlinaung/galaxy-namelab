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
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2.4}
                className=" w-full pt-6"
            >
                <div className="text-primary-300 text-sm text-center space-y-2">
                    <p className="flex items-center justify-center gap-2">
                        <span>&copy; {new Date().getFullYear()} Galaxy NameLab. All Rights Reserved.</span>
                        <span className="text-yellow-400">✨</span>
                    </p>
                    <p className="text-primary-400">Crafted with cosmic energy and guided by the stars</p>
                </div>
            </motion.div>
        </motion.footer>
    );
};

export default Footer;