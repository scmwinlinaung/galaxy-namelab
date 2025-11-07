// src/components/auth/LoginModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCalendar, FiStar, FiMoon, FiSun, FiX } from 'react-icons/fi';

import Button from '@components/ui/Button';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: "easeOut" as const },
    }),
};

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        birthdate: '',
        rememberMe: false
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!isLogin) {
            if (!formData.name) {
                newErrors.name = 'Name is required';
            }
            if (!formData.birthdate) {
                newErrors.birthdate = 'Birthdate is required for cosmic insights';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Handle authentication logic here
            console.log('Form submitted:', formData);
            // For demo purposes, close the modal
            onClose();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setFormData({
            name: '',
            email: '',
            password: '',
            birthdate: '',
            rememberMe: false
        });
    };

    const handleContinue = () => {
        // Continue without function binding as requested
        console.log('Continue clicked without function binding');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={onClose}
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="w-full max-w-md bg-primary-900/95 backdrop-blur-md rounded-3xl p-8 border border-primary-600/30 shadow-2xl relative max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-primary-300 hover:text-white transition-colors duration-300"
                                aria-label="Close modal"
                            >
                                <FiX className="w-6 h-6" />
                            </button>

                            {/* Cosmic Icons */}
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                >
                                    <FiSun className="text-3xl text-yellow-400" />
                                </motion.div>
                                <h1 className="text-3xl font-bold text-primary-100">
                                    {isLogin ? 'Welcome Back' : 'Join the Cosmos'}
                                </h1>
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                >
                                    <FiMoon className="text-3xl text-blue-300" />
                                </motion.div>
                            </div>

                            <p className="text-primary-200 mb-8">
                                {isLogin
                                    ? 'Continue your cosmic naming journey'
                                    : 'Start your journey to discover the perfect name'
                                }
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field (Registration Only) */}
                                {!isLogin && (
                                    <div className="relative">
                                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-300 text-xl" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Your full name"
                                            className={`w-full bg-primary-800/50 text-white pl-12 pr-4 py-4 rounded-2xl border-2 focus:outline-none transition-colors duration-300 ${
                                                errors.name
                                                    ? 'border-red-500 focus:border-red-400'
                                                    : 'border-primary-600 focus:border-primary-400'
                                            }`}
                                        />
                                        {errors.name && (
                                            <p className="text-red-400 text-sm mt-2 text-left">{errors.name}</p>
                                        )}
                                    </div>
                                )}

                                {/* Email Field */}
                                <div className="relative">
                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-300 text-xl" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email address"
                                        className={`w-full bg-primary-800/50 text-white pl-12 pr-4 py-4 rounded-2xl border-2 focus:outline-none transition-colors duration-300 ${
                                            errors.email
                                                ? 'border-red-500 focus:border-red-400'
                                                : 'border-primary-600 focus:border-primary-400'
                                        }`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-400 text-sm mt-2 text-left">{errors.email}</p>
                                    )}
                                </div>

                                {/* Birthdate Field (Registration Only) */}
                                {!isLogin && (
                                    <div className="relative">
                                        <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-300 text-xl" />
                                        <input
                                            type="date"
                                            name="birthdate"
                                            value={formData.birthdate}
                                            onChange={handleInputChange}
                                            className={`w-full bg-primary-800/50 text-white pl-12 pr-4 py-4 rounded-2xl border-2 focus:outline-none transition-colors duration-300 ${
                                                errors.birthdate
                                                    ? 'border-red-500 focus:border-red-400'
                                                    : 'border-primary-600 focus:border-primary-400'
                                            }`}
                                            style={{ colorScheme: 'dark' }}
                                        />
                                        {errors.birthdate && (
                                            <p className="text-red-400 text-sm mt-2 text-left">{errors.birthdate}</p>
                                        )}
                                    </div>
                                )}

                                {/* Password Field */}
                                <div className="relative">
                                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-300 text-xl" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Password"
                                        className={`w-full bg-primary-800/50 text-white pl-12 pr-12 py-4 rounded-2xl border-2 focus:outline-none transition-colors duration-300 ${
                                            errors.password
                                                ? 'border-red-500 focus:border-red-400'
                                                : 'border-primary-600 focus:border-primary-400'
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-300 hover:text-primary-200 transition-colors"
                                    >
                                        {showPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
                                    </button>
                                    {errors.password && (
                                        <p className="text-red-400 text-sm mt-2 text-left">{errors.password}</p>
                                    )}
                                </div>

                                {/* Remember Me & Forgot Password */}
                                {isLogin && (
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 text-primary-300 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="rememberMe"
                                                checked={formData.rememberMe}
                                                onChange={handleInputChange}
                                                className="rounded border-primary-600 bg-primary-800/50 focus:ring-2 focus:ring-primary-400"
                                            />
                                            <span className="text-sm">Remember me</span>
                                        </label>
                                        <button
                                            type="button"
                                            className="text-sm text-primary-300 hover:text-primary-200 transition-colors"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-primary-600 to-secondary text-white font-semibold py-4 rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    {isLogin ? 'Sign In to Your Cosmic Account' : 'Create Your Cosmic Account'}
                                    <FiStar className="w-5 h-5" />
                                </Button>

                                {/* Continue Button (without function binding) */}
                                <Button
                                    type="button"
                                    onClick={handleContinue}
                                    className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-2xl transition-all duration-300 border border-primary-600/30"
                                >
                                    Continue
                                </Button>
                            </form>

                            {/* Toggle Login/Register */}
                            <div className="mt-8 text-center">
                                <p className="text-primary-300">
                                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                                    <button
                                        onClick={toggleAuthMode}
                                        className="ml-2 text-primary-100 font-semibold hover:text-primary-200 transition-colors"
                                    >
                                        {isLogin ? 'Sign Up' : 'Sign In'}
                                    </button>
                                </p>
                            </div>

                            {/* Social Login Options */}
                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-primary-600/30"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-primary-900/95 text-primary-300">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <Button
                                        className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all duration-300 border border-primary-600/30"
                                        onClick={() => console.log('Google login')}
                                    >
                                        Google
                                    </Button>
                                    <Button
                                        className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all duration-300 border border-primary-600/30"
                                        onClick={() => console.log('Facebook login')}
                                    >
                                        Facebook
                                    </Button>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="mt-8 text-center">
                                <div className="bg-primary-900/30 backdrop-blur-sm rounded-2xl p-4 border border-primary-600/20">
                                    <p className="text-primary-300 text-sm leading-relaxed">
                                        {isLogin
                                            ? 'By signing in, you agree to our cosmic terms and privacy policy.'
                                            : 'Join thousands who have discovered their perfect names through the power of astrology and numerology.'
                                        }
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default LoginModal;