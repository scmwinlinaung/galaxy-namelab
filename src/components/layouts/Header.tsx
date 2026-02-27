import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiUser, FiLogOut, FiMail, FiSmile } from 'react-icons/fi';
import { NAVIGATION, ANIMATION } from '../../constants';
import { STORAGE_KEYS } from '../../constants/api';

interface HeaderProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const userMenuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = NAVIGATION.ITEMS;

    const checkAuthStatus = () => {
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        const name = localStorage.getItem(STORAGE_KEYS.USER_NAME);
        const email = localStorage.getItem(STORAGE_KEYS.USER_EMAIL);
        setIsAuthenticated(!!token);
        setUserName(name || '');
        setUserEmail(email || '');
    };

    useEffect(() => {
        checkAuthStatus();

        const handleStorageChange = () => {
            checkAuthStatus();
        };

        const handleAuthChange = () => {
            checkAuthStatus();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('authChange', handleAuthChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('authChange', handleAuthChange);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        if (isUserMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isUserMenuOpen]);

    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
        localStorage.removeItem(STORAGE_KEYS.USER_PASSWORD);
        localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
        localStorage.removeItem(STORAGE_KEYS.USER_NAME);
        localStorage.removeItem(STORAGE_KEYS.USER_ID);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);

        setIsAuthenticated(false);
        setIsMenuOpen(false);
        setIsUserMenuOpen(false);
        setUserName('');
        setUserEmail('');

        window.dispatchEvent(
            new CustomEvent('authChange', { detail: { isAuthenticated: false } })
        );

        navigate('/');
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const getUserDisplayName = () => {
        return userName || userEmail?.split('@')[0] || '';
    };

    return (
        <header className="absolute top-0 left-0 w-full px-6 py-4 z-50">
            <nav className="container mx-auto flex justify-between items-center">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-start hover:opacity-80 transition-opacity duration-300"
                >
                    <img
                        src="/logo.png"
                        alt="Galaxy NameLab"
                        className="h-15 w-auto"
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-10 text-base font-medium tracking-wide uppercase">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `transition-colors duration-300 ${isActive
                                    ? 'text-white'
                                    : 'text-gray-300 hover:text-white'
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}

                    {isAuthenticated ? (
                        <div className="relative ml-6" ref={userMenuRef}>
                            <button
                                onClick={toggleUserMenu}
                                className="flex items-center space-x-2 border border-primary-400 text-primary-400 px-4 py-1.5 rounded-full hover:bg-primary-400 hover:text-white transition-all duration-300 font-semibold"
                            >
                                <span>{getUserDisplayName()}</span>
                                <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isUserMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-3 w-72 bg-gradient-to-b from-primary-900/98 to-primary-950/98 backdrop-blur-xl rounded-2xl border border-primary-500/40 shadow-2xl shadow-primary-900/50 overflow-hidden"
                                >
                                    {/* User Info Section */}
                                    <div className="px-5 py-5 bg-gradient-to-r from-primary-600/20 to-purple-600/20 border-b border-primary-500/20">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg">
                                                <FiUser className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-primary-300 font-medium tracking-wide uppercase mb-1">Signed in as</p>
                                                <p className="text-sm text-white font-semibold truncate">{userName || 'User'}</p>
                                                <p className="text-xs text-gray-400 truncate mt-0.5">{userEmail}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Account Details */}
                                    <div className="px-5 py-4 space-y-3">
                                        <div className="flex items-start space-x-3 p-3 rounded-xl bg-primary-800/40 border border-primary-700/30">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-700/50 flex items-center justify-center">
                                                <FiSmile className="w-4 h-4 text-primary-300" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-gray-400 font-medium">Name</p>
                                                <p className="text-sm text-white font-medium truncate">{userName || 'Not set'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3 p-3 rounded-xl bg-primary-800/40 border border-primary-700/30">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-700/50 flex items-center justify-center">
                                                <FiMail className="w-4 h-4 text-primary-300" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-gray-400 font-medium">Email</p>
                                                <p className="text-sm text-white font-medium truncate">{userEmail}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Logout Button */}
                                    <div className="px-5 pb-4">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-500/30 text-red-400 hover:from-red-600/30 hover:to-red-700/30 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-900/20 transition-all duration-300 font-medium group"
                                        >
                                            <FiLogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                                            <span>{NAVIGATION.LOGOUT_BUTTON}</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={handleLoginClick}
                            className="ml-6 border border-primary-400 text-primary-400 px-4 py-1.5 rounded-full hover:bg-primary-400 hover:text-white transition-all duration-300 font-semibold"
                        >
                            {NAVIGATION.LOGIN_BUTTON}
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-white hover:text-primary-300 transition-colors duration-300"
                    aria-label={NAVIGATION.MENU_TOGGLE_ARIA_LABEL}
                >
                    {isMenuOpen ? (
                        <FiX className="w-8 h-8" />
                    ) : (
                        <FiMenu className="w-8 h-8" />
                    )}
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

                        {isAuthenticated ? (
                            <div className="border-t border-primary-600/30 pt-4">
                                <button
                                    onClick={toggleUserMenu}
                                    className="w-full transition-colors duration-300 px-4 py-2 rounded-lg text-white hover:text-primary-300 hover:bg-primary-800/30 text-left font-semibold flex items-center justify-between"
                                >
                                    <span>{getUserDisplayName()}</span>
                                    <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isUserMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="mt-3 space-y-3"
                                    >
                                        {/* User Info Card */}
                                        <div className="px-4 py-4 bg-gradient-to-r from-primary-600/20 to-purple-600/20 rounded-xl border border-primary-500/20">
                                            <div className="flex items-center space-x-3">
                                                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg">
                                                    <FiUser className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-primary-300 font-medium tracking-wide uppercase">Signed in as</p>
                                                    <p className="text-sm text-white font-semibold truncate">{userName || 'User'}</p>
                                                    <p className="text-xs text-gray-400 truncate">{userEmail}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Account Details */}
                                        <div className="space-y-2">
                                            <div className="flex items-start space-x-3 p-3 rounded-xl bg-primary-800/40 border border-primary-700/30">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-700/50 flex items-center justify-center">
                                                    <FiSmile className="w-4 h-4 text-primary-300" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-gray-400 font-medium">Name</p>
                                                    <p className="text-sm text-white font-medium truncate">{userName || 'Not set'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-3 p-3 rounded-xl bg-primary-800/40 border border-primary-700/30">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-700/50 flex items-center justify-center">
                                                    <FiMail className="w-4 h-4 text-primary-300" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-gray-400 font-medium">Email</p>
                                                    <p className="text-sm text-white font-medium truncate">{userEmail}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Logout Button */}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-500/30 text-red-400 hover:from-red-600/30 hover:to-red-700/30 hover:border-red-500/50 transition-all duration-300 font-medium group"
                                        >
                                            <FiLogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                                            <span>{NAVIGATION.LOGOUT_BUTTON}</span>
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={handleLoginClick}
                                className="transition-colors duration-300 px-4 py-2 rounded-lg text-white hover:text-primary-300 hover:bg-primary-800/30 text-left font-semibold"
                            >
                                {NAVIGATION.LOGIN_BUTTON}
                            </button>
                        )}
                    </nav>
                </motion.div>
            )}
        </header>
    );
};

export default Header;
