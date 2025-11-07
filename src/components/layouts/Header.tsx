import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

interface HeaderProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/business', label: 'Business' },
        { to: '/success', label: 'Success' },
        { to: '/pricing', label: 'Pricing' },
        { to: '/contact', label: 'Contact' },
    ];

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
                <div className="hidden md:flex items-center space-x-4 sm:space-x-8 text-lg">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `transition-colors duration-300 ${isActive ? 'text-primary-400' : 'text-white hover:text-primary-300'}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    <button
                        onClick={handleLoginClick}
                        className="transition-colors duration-300 text-white hover:text-primary-300 font-semibold"
                    >
                        Login
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-white hover:text-primary-300 transition-colors duration-300"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                </button>
            </nav>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden mt-4 bg-primary-900/95 backdrop-blur-md rounded-2xl p-4 border border-primary-600/30"
                >
                    <nav className="flex flex-col space-y-4 text-lg">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `transition-colors duration-300 px-4 py-2 rounded-lg ${
                                        isActive
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