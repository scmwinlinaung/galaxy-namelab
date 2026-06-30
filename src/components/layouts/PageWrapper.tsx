import React, { ReactNode, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import Footer from './Footer';

interface PageWrapperProps {
    children: ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    const { pathname } = useLocation();
    const [isVisible, setIsVisible] = useState(false);

    // Scroll back to top instantly whenever the route/pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // Handle floating scroll-to-top button visibility
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="antialiased text-slate-700 relative min-h-screen">
            {children}
            <Footer />

            {/* Scroll To Top Button */}
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        type="button"
                        onClick={scrollToTop}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1, translateY: -4 }}
                        whileTap={{ scale: 0.9 }}
                        className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-400 hover:to-purple-500 text-white rounded-full shadow-2xl border border-primary-400/40 hover:shadow-primary-500/30 transition-all duration-300 cursor-pointer flex items-center justify-center group"
                        aria-label="Scroll to top"
                    >
                        <FiArrowUp className="w-5 h-5 group-hover:animate-bounce" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PageWrapper;