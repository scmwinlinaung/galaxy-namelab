// src/components/auth/LoginModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCalendar, FiStar, FiMoon, FiSun, FiX } from 'react-icons/fi';

import Button from '@components/ui/Button';
import { ANIMATION, VALIDATION, FORM_TEXT, MODAL_TEXT, STORAGE_KEYS } from '../../constants';
import { API_HOST } from '@api/config/host';
import { hashPassword } from '@api/utils/crypto';
import { AuthService } from '@api/services/authService';

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
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email) {
            newErrors.email = VALIDATION.MESSAGES.EMAIL.REQUIRED;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = VALIDATION.MESSAGES.EMAIL.INVALID;
        }

        if (!formData.password) {
            newErrors.password = VALIDATION.MESSAGES.PASSWORD.REQUIRED;
        } else if (formData.password.length < 8) {
            newErrors.password = VALIDATION.MESSAGES.PASSWORD.MIN_LENGTH;
        }

        if (!isLogin) {
            if (!formData.name) {
                newErrors.name = VALIDATION.MESSAGES.NAME.REQUIRED;
            }
            if (!formData.birthdate) {
                newErrors.birthdate = VALIDATION.MESSAGES.BIRTHDATE.REQUIRED;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError('');

        if (!validateForm()) {
            return;
        }

        if (isLogin) {
            // Handle login
            setIsLoading(true);
            try {
                const hashedPassword = await hashPassword(formData.password);
                const response = await fetch(`${API_HOST}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: hashedPassword,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    // Store token and role in localStorage
                    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
                    localStorage.setItem(STORAGE_KEYS.USER_ROLE, data.role);
                    localStorage.setItem(STORAGE_KEYS.USER_EMAIL, formData.email);
                    localStorage.setItem(STORAGE_KEYS.USER_PASSWORD, hashedPassword);
                    localStorage.setItem(STORAGE_KEYS.USER_ID, data.userId || data.user?._id || data.userId);

                    // Fetch user data and save name and email
                    if (data.userid || data.user?._id) {
                        try {
                            const userId = data.userid || data.user._id;
                            const userData = await AuthService.getUserById(userId, data.token);
                            console.log("user Data = " + userData);
                            localStorage.setItem(STORAGE_KEYS.USER_NAME, userData.data?.name || "");
                            localStorage.setItem(STORAGE_KEYS.USER_EMAIL, userData.data?.email || "");
                        } catch (error) {
                            console.error('Failed to fetch user data:', error);
                        }
                    }

                    // Dispatch custom event to notify components about login
                    window.dispatchEvent(new CustomEvent('authChange', { detail: { isAuthenticated: true } }));

                    // Close modal on success
                    onClose();
                } else {
                    // Handle error response
                    setApiError(data.message || 'Invalid credentials. Please try again.');
                }
            } catch (error) {
                console.error('Login error:', error);
                setApiError('An error occurred. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        } else {
            // Handle registration
            setIsLoading(true);
            try {
                const hashedPassword = await hashPassword(formData.password);
                const response = await fetch(`${API_HOST}/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: hashedPassword,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    // Store token in localStorage
                    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
                    localStorage.setItem(STORAGE_KEYS.USER_ID, data.userId || data.user?._id || data.userId);
                    localStorage.setItem(STORAGE_KEYS.USER_EMAIL, formData.email);
                    localStorage.setItem(STORAGE_KEYS.USER_NAME, formData.name);
                    localStorage.setItem(STORAGE_KEYS.USER_PASSWORD, hashedPassword);

                    // Fetch user data and save name and email
                    if (data.userId || data.user?._id) {
                        try {
                            const userId = data.userId || data.user._id;
                            const userData = await AuthService.getUserById(userId, data.token);
                            localStorage.setItem(STORAGE_KEYS.USER_NAME, userData.data?.name || "");
                            localStorage.setItem(STORAGE_KEYS.USER_EMAIL, userData.data?.email || "");
                        } catch (error) {
                            console.error('Failed to fetch user data:', error);
                        }
                    }

                    // Dispatch custom event to notify components about login
                    window.dispatchEvent(new CustomEvent('authChange', { detail: { isAuthenticated: true } }));

                    // Close modal on success
                    onClose();
                } else {
                    // Handle error response
                    if (response.status === 400) {
                        setApiError(data.message || 'User already exists. Please try logging in.');
                    } else {
                        setApiError(data.message || 'Registration failed. Please try again.');
                    }
                }
            } catch (error) {
                console.error('Registration error:', error);
                setApiError('An error occurred. Please try again later.');
            } finally {
                setIsLoading(false);
            }
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
        // Clear API error when user starts typing
        if (apiError) {
            setApiError('');
        }
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setApiError('');
        setFormData({
            name: '',
            email: '',
            password: '',
            birthdate: '',
            rememberMe: false
        });
    };


    const handleGoogleLogin = () => {
        // Redirect to Google OAuth endpoint
        window.location.href = `${API_HOST}/auth/google`;
    };

    const handleFacebookLogin = () => {
        // Redirect to Facebook OAuth endpoint
        window.location.href = `${API_HOST}/auth/facebook`;
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
                                <FiX className="w-8 h-8" />
                            </button>

                            {/* Cosmic Icons */}
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                >
                                    <FiSun className="text-5xl text-yellow-400" />
                                </motion.div>
                                <h1 className="text-3xl font-bold text-primary-100">
                                    {isLogin ? MODAL_TEXT.WELCOME.LOGIN : MODAL_TEXT.WELCOME.REGISTER}
                                </h1>
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ repeat: Infinity, duration: ANIMATION.DURATIONS.SLOW, ease: "linear" }}
                                >
                                    <FiMoon className="text-5xl text-blue-300" />
                                </motion.div>
                            </div>

                            <p className="text-primary-200 mb-8">
                                {isLogin
                                    ? MODAL_TEXT.SUBTITLE.LOGIN
                                    : MODAL_TEXT.SUBTITLE.REGISTER
                                }
                            </p>

                            {/* API Error Message */}
                            {apiError && (
                                <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-4 mb-6">
                                    <p className="text-red-300 text-sm text-center">{apiError}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field (Registration Only) */}
                                {!isLogin && (
                                    <div className="relative">
                                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-300 text-2xl" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder={FORM_TEXT.PLACEHOLDERS.NAME}
                                            className={`w-full bg-primary-800/50 text-white pl-12 pr-4 py-4 rounded-2xl border-2 focus:outline-none transition-colors duration-300 ${errors.name
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
                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-300 text-2xl" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder={FORM_TEXT.PLACEHOLDERS.EMAIL}
                                        className={`w-full bg-primary-800/50 text-white pl-12 pr-4 py-4 rounded-2xl border-2 focus:outline-none transition-colors duration-300 ${errors.email
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
                                            className={`w-full bg-primary-800/50 text-white pl-12 pr-4 py-4 rounded-2xl border-2 focus:outline-none transition-colors duration-300 ${errors.birthdate
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
                                        className={`w-full bg-primary-800/50 text-white pl-12 pr-12 py-4 rounded-2xl border-2 focus:outline-none transition-colors duration-300 ${errors.password
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
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-primary-600 to-secondary text-white font-semibold py-4 rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            {isLogin ? 'Signing In...' : 'Creating Account...'}
                                        </>
                                    ) : (
                                        <>
                                            {isLogin ? 'Sign In to Your Cosmic Account' : 'Create Your Cosmic Account'}
                                            <FiStar className="w-5 h-5" />
                                        </>
                                    )}
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

                                <div className="mt-6 grid gap-3">
                                    <Button
                                        className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all duration-300 border border-primary-600/30"
                                        onClick={handleGoogleLogin}
                                    >
                                        Google
                                    </Button>
                                    <Button
                                        className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all duration-300 border border-primary-600/30"
                                        onClick={handleFacebookLogin}
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