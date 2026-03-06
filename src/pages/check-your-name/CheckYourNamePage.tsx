import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiShield, FiStar, FiClock } from 'react-icons/fi';

import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import Section from '@components/ui/Section';
import { ANIMATION } from '../../constants';
import { EmailService } from '@api/services/emailService';

interface CheckYourNamePageProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

interface FormData {
    email: string;
    fullName: string;
    dateOfBirth: string;
    timeOfBirth: string;
    placeOfBirth: string;
}

interface FormErrors {
    email?: string;
    fullName?: string;
    dateOfBirth?: string;
    timeOfBirth?: string;
    placeOfBirth?: string;
}

const CheckYourNamePage: React.FC<CheckYourNamePageProps> = ({
    isLoginModalOpen,
    setIsLoginModalOpen
}) => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        fullName: '',
        dateOfBirth: '',
        timeOfBirth: '',
        placeOfBirth: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Please enter a valid name';
        }

        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = 'Date of birth is required';
        } else {
            const dob = new Date(formData.dateOfBirth);
            const today = new Date();
            if (dob > today) {
                newErrors.dateOfBirth = 'Date of birth cannot be in the future';
            }
        }

        if (!formData.timeOfBirth) {
            newErrors.timeOfBirth = 'Time of birth is required';
        }

        if (!formData.placeOfBirth.trim()) {
            newErrors.placeOfBirth = 'Place of birth is required';
        } else if (formData.placeOfBirth.trim().length < 2) {
            newErrors.placeOfBirth = 'Please enter a valid location';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError('');

        try {
            // Send email to admin via backend API
            const emailData = {
                to: 'consult@galaxynamelab.com',
                subject: `Free Audit Request - ${formData.email}`,
                text: `
                Free Name Audit Request
                Gmail: ${formData.email}
                Full Name: ${formData.fullName}
                Date of Birth: ${formData.dateOfBirth}
                Time of Birth: ${formData.timeOfBirth}
                Place of Birth: ${formData.placeOfBirth}

                ---
                Requested at: ${new Date().toISOString()}
                                `.trim()
            };

            await EmailService.sendEmail(emailData);

            setSubmitSuccess(true);

            // Reset form after 3 seconds
            setTimeout(() => {
                setFormData({
                    email: '',
                    fullName: '',
                    dateOfBirth: '',
                    timeOfBirth: '',
                    placeOfBirth: ''
                });
                setSubmitSuccess(false);
            }, 3000);

        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitError('Failed to submit. Please try again or contact us directly at winlinaung2813@gmail.com');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-32 px-4 md:px-8">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                        variants={ANIMATION.VARIANTS.FADE_UP}
                        initial="hidden"
                        animate="visible"
                    >
                        Check Your Name!
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl mb-4 text-purple-200 max-w-4xl mx-auto"
                        variants={ANIMATION.VARIANTS.FADE_UP}
                        initial="hidden"
                        animate="visible"
                        custom={0.2}
                    >
                        Is Your Name Naturally Aligned with Success?
                    </motion.p>
                </div>
            </section>

            {/* Introduction Section */}
            <Section variant="light">
                <motion.div
                    variants={ANIMATION.VARIANTS.FADE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center">
                            Discover Your Cosmic Alignment
                        </h2>
                        <div className="w-20 h-1 bg-primary-500 mx-auto mb-8"></div>

                        <div className="bg-gradient-to-r from-primary-50 to-purple-50 border-2 border-primary-200 rounded-lg p-8 mb-8">
                            <p className="text-lg leading-relaxed text-gray-700 mb-4">
                                As we explored in our Case Studies, some individuals possess names that naturally resonate with the Stellar Fortune frequency. This phenomenon, often occurring in only <span className="font-bold text-primary-700">2 to 3 out of every 100 people</span>, is the result of what we call "Cosmic Merit"—an accidental yet perfect alignment between your identity and your birth chart.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-700">
                                Could you be one of the rare few?
                            </p>
                        </div>

                        <div className="bg-primary-600 text-white rounded-lg p-6 mb-8">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <FiStar className="text-yellow-300" />
                                100% Free Preliminary Audit
                            </h3>
                            <p className="text-lg leading-relaxed">
                                We offer a free preliminary audit to help you discover if your current personal or business name is already vibrating at a billionaire frequency.
                            </p>
                        </div>

                        <div className="flex items-start gap-4 bg-gray-100 rounded-lg p-6">
                            <FiClock className="text-primary-600 text-2xl mt-1 flex-shrink-0" />
                            <p className="text-gray-700 italic">
                                Due to the high volume of requests, free audits are limited to one name per person. Our team will analyze your data and send the results directly to your inbox.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </Section>

            {/* Form Section */}
            <Section variant="dark" className="py-16">
                <motion.div
                    variants={ANIMATION.VARIANTS.FADE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">
                            How to Request Your Free Audit
                        </h2>
                        <p className="text-lg text-primary-200 text-center mb-8">
                            To perform an accurate calculation, our experts require precise data. Even a one-minute difference in your birth time can shift your entire cosmic geometry.
                        </p>

                        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                            {/* Email */}
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-white font-semibold mb-2">
                                    Email <span className="text-primary-300">*</span>
                                </label>
                                <p className="text-primary-200 text-sm mb-2">The email you use most frequently</p>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.email ? 'border-red-400' : 'border-white/30'
                                        } text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all`}
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <p className="text-red-300 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                            {/* Full Name */}
                            <div className="mb-6">
                                <label htmlFor="fullName" className="block text-white font-semibold mb-2">
                                    Full Name <span className="text-primary-300">*</span>
                                </label>
                                <p className="text-primary-200 text-sm mb-2">The name you use most frequently</p>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.fullName ? 'border-red-400' : 'border-white/30'
                                        } text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all`}
                                    placeholder="Enter your full name"
                                />
                                {errors.fullName && (
                                    <p className="text-red-300 text-sm mt-1">{errors.fullName}</p>
                                )}
                            </div>

                            {/* Date of Birth */}
                            <div className="mb-6">
                                <label htmlFor="dateOfBirth" className="block text-white font-semibold mb-2">
                                    Date of Birth <span className="text-primary-300">*</span>
                                </label>
                                <p className="text-primary-200 text-sm mb-2">Day / Month / Year</p>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.dateOfBirth ? 'border-red-400' : 'border-white/30'
                                        } text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all`}
                                />
                                {errors.dateOfBirth && (
                                    <p className="text-red-300 text-sm mt-1">{errors.dateOfBirth}</p>
                                )}
                            </div>

                            {/* Time of Birth */}
                            <div className="mb-6">
                                <label htmlFor="timeOfBirth" className="block text-white font-semibold mb-2">
                                    Exact Time of Birth <span className="text-primary-300">*</span>
                                </label>
                                <p className="text-primary-200 text-sm mb-2">Hour : Minute (as accurate as possible)</p>
                                <input
                                    type="time"
                                    id="timeOfBirth"
                                    name="timeOfBirth"
                                    value={formData.timeOfBirth}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.timeOfBirth ? 'border-red-400' : 'border-white/30'
                                        } text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all`}
                                />
                                {errors.timeOfBirth && (
                                    <p className="text-red-300 text-sm mt-1">{errors.timeOfBirth}</p>
                                )}
                            </div>

                            {/* Place of Birth */}
                            <div className="mb-8">
                                <label htmlFor="placeOfBirth" className="block text-white font-semibold mb-2">
                                    Place of Birth <span className="text-primary-300">*</span>
                                </label>
                                <p className="text-primary-200 text-sm mb-2">City / Country</p>
                                <input
                                    type="text"
                                    id="placeOfBirth"
                                    name="placeOfBirth"
                                    value={formData.placeOfBirth}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.placeOfBirth ? 'border-red-400' : 'border-white/30'
                                        } text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all`}
                                    placeholder="e.g., New York, USA"
                                />
                                {errors.placeOfBirth && (
                                    <p className="text-red-300 text-sm mt-1">{errors.placeOfBirth}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 text-lg shadow-lg"
                            >
                                {isSubmitting ? (
                                    <>Processing...</>
                                ) : (
                                    <>
                                        <FiSend className="text-xl" />
                                        Find Out Now
                                    </>
                                )}
                            </button>

                            {/* Success Message */}
                            {submitSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 bg-green-500/20 border border-green-400 rounded-lg p-4 text-green-200 text-center"
                                >
                                    Thank you! Your request has been submitted successfully. We will analyze your data and send the results to your inbox.
                                </motion.div>
                            )}

                            {/* Error Message */}
                            {submitError && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 bg-red-500/20 border border-red-400 rounded-lg p-4 text-red-200"
                                >
                                    {submitError}
                                </motion.div>
                            )}
                        </form>

                        {/* Trust Badge */}
                        <div className="mt-8 flex items-center justify-center gap-2 text-primary-200">
                            <FiShield className="text-xl" />
                            <p className="text-sm">
                                Your data is 100% private and will only be used for the audit.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </Section>

            {/* Closing Section */}
            <Section variant="light">
                <motion.div
                    variants={ANIMATION.VARIANTS.FADE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">Take the First Step</h2>
                    <div className="w-20 h-1 bg-primary-500 mx-auto mb-8"></div>
                    <p className="text-lg leading-relaxed text-gray-700 mb-6">
                        Discover if your name is already aligned with success or if it's time for a transformation. Your cosmic journey starts here.
                    </p>
                    <p className="text-lg text-primary-700">
                        With Metta & Cosmic Regards,<br />
                        <span className="font-bold text-xl">Galaxy NameLab</span>
                    </p>
                </motion.div>
            </Section>
        </PageWrapper>
    );
};

export default CheckYourNamePage;
