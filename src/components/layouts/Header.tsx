import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { NAVIGATION, ANIMATION } from '../../constants';

interface HeaderProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = NAVIGATION.ITEMS;

    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
        setIsMenuOpen(false);
    };

    return (
        <header className="absolute top-0 left-0 w-full p-4 sm:p-6 z-50">
            <nav className="container mx-auto flex justify-between items-center">
                {/* Logo/Brand Name */}
                <Link to="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
                    <img
                        src="/logo.png"
                        alt="Galaxy NameLab"
                        className="h-10 w-auto"
                    />
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-10 text-base font-medium tracking-wide uppercase">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `transition-colors duration-300 ${isActive
                                    ? 'text-white' // active link stays white
                                    : 'text-gray-300 hover:text-white' // hover turns white only
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    <button
                        onClick={handleLoginClick}
                        className="ml-6 border border-primary-400 text-primary-400 px-4 py-1.5 rounded-full hover:bg-primary-400 hover:text-white transition-all duration-300 font-semibold"
                    >
                        {NAVIGATION.LOGIN_BUTTON}
                    </button>
                </div>



                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-white hover:text-primary-300 transition-colors duration-300"
                    aria-label={NAVIGATION.MENU_TOGGLE_ARIA_LABEL}
                >
                    {isMenuOpen ? <FiX className="w-8 h-8" /> : <FiMenu className="w-8 h-8" />}
                </button>
            </nav>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <motion.div
                    initial={ANIMATION.VARIANTS.SLIDE.INITIAL}
                    animate={ANIMATION.VARIANTS.SLIDE.ANIMATE}
                    exit={ANIMATION.VARIANTS.SLIDE.EXIT}
                    transition={ANIMATION.VARIANTS.SLIDE.TRANSITION}
                    className="md:hidden mt-4 bg-primary-900/95 backdrop-blur-md rounded-2xl p-4 border border-primary-600/30"
                >
                    <nav className="flex flex-col space-y-4 text-lg">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `transition-colors duration-300 px-4 py-2 rounded-lg ${isActive
                                        ? 'text-primary-400 bg-primary-800/50'
                                        : 'text-white hover:text-primary-300 hover:bg-primary-800/30'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <button
                            onClick={handleLoginClick}
                            className="transition-colors duration-300 px-4 py-2 rounded-lg text-white hover:text-primary-300 hover:bg-primary-800/30 text-left font-semibold"
                        >
                            Login
                        </button>
                    </nav>
                </motion.div>
            )}
        </header>
    );
};

export default Header;