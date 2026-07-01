// src/pages/inquiry/InquiryPage.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FiMail, 
    FiUser, 
    FiPhone,
    FiSend, 
    FiMessageSquare, 
    FiCompass, 
    FiCheckCircle, 
    FiAlertCircle
} from 'react-icons/fi';

import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import { EmailService } from '@api/services/emailService';

interface InquiryPageProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

interface InquiryFormData {
    fullName: string;
    email: string;
    phone: string;
    topic: string;
    message: string;
}

const initialFormData: InquiryFormData = {
    fullName: '',
    email: '',
    phone: '',
    topic: '',
    message: ''
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: "easeOut" as const },
    }),
};

const InquiryPage: React.FC<InquiryPageProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    const [formData, setFormData] = useState<InquiryFormData>(initialFormData);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            // 1. Prepare and send email to the Galaxy NameLab team (consult@galaxynamelab.com)
            const emailSubject = `[Inquiry] ${formData.topic || 'New Submission'} from ${formData.fullName}`;
            const emailText = `
=== New Contact/Inquiry Submission ===

Personal Details:
------------------------------------------
Full Name: ${formData.fullName}
Email Address: ${formData.email}
Phone Number: ${formData.phone || 'Not provided'}

Inquiry Specifications:
------------------------------------------
Inquiry Topic: ${formData.topic || 'General Inquiry'}

Message:
${formData.message}

------------------------------------------
Submitted via Galaxy NameLab Inquiry Portal.
`;

            const adminEmailPayload = {
                to: 'consult@galaxynamelab.com',
                subject: emailSubject,
                text: emailText
            };

            const response = await EmailService.sendEmail(adminEmailPayload);

            if (!response.success) {
                throw new Error(response.error || 'Failed to submit inquiry to our servers.');
            }

            // 2. Prepare and send confirmation email receipt to the user's email
            const receiptSubject = `We have received your Inquiry - Galaxy NameLab`;
            const receiptText = `
Dear ${formData.fullName},

Thank you for contacting Galaxy NameLab. We have successfully received your inquiry and our team of experts is already reviewing your details.

Here is a copy of your submission:
------------------------------------------
Inquiry Topic: ${formData.topic || 'General Inquiry'}
Message:
${formData.message}
------------------------------------------

Our team will evaluate your inquiry and get back to you within 24 to 48 business hours.

In the meantime, feel free to explore our public portfolios and success stories to see how our Stellar Fortune Naming System has changed thousands of destinies:
- Portfolios: https://galaxynamelab.com/portfolios
- Success Stories: https://galaxynamelab.com/success-stories

May the stars guide you towards stellar success and cosmic harmony!

Warmest regards,

The Stellar Fortune Name Team
(Galaxy NameLab, LLC)
`;

            // We attempt to send a copy to the user, but don't crash if their email delivery fails
            try {
                const userEmailPayload = {
                    to: formData.email,
                    subject: receiptSubject,
                    text: receiptText
                };
                await EmailService.sendEmail(userEmailPayload);
            } catch (receiptErr) {
                console.warn('Unable to send confirmation receipt copy to client email:', receiptErr);
            }

            setSuccess(true);
            setFormData(initialFormData);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred while processing your inquiry.';
            setError(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <PageWrapper>
            <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />

            <section className="relative w-full min-h-screen flex flex-col items-center justify-start bg-primary-950 text-primary-50 overflow-hidden px-4 md:px-8 py-32">
                {/* Decorative Background Blobs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply blur-3xl opacity-20"
                    animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600 rounded-full mix-blend-multiply blur-3xl opacity-15"
                    animate={{ y: [0, 20, 0], x: [0,-20, 0] }}
                    transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
                />

                <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-12 mt-10">
                    
                    {/* Header Intro Card */}
                    <motion.div 
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="text-center bg-primary-900/40 backdrop-blur-md rounded-3xl p-8 border border-primary-800 shadow-2xl max-w-4xl mx-auto"
                    >
                        <span className="text-amber-400 font-semibold tracking-wider uppercase text-sm mb-2 block font-display">Let the Stars Align</span>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-amber-400 to-purple-400 font-display">
                            Connect with Our Experts
                        </h1>
                        <p className="text-base md:text-lg text-primary-200 font-body leading-relaxed max-w-2xl mx-auto">
                            Do you have questions about our methodology or need guidance choosing the right package? Submit an inquiry and let our expert team analyze your path.
                        </p>
                    </motion.div>

                    {/* Main Layout Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Left Column: Simplified Contact Details (Email Only) */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.2}
                            className="lg:col-span-4"
                        >
                            {/* Contact Details Card */}
                            <div className="bg-primary-900/30 backdrop-blur-md border border-primary-800/60 p-8 rounded-3xl shadow-xl space-y-6">
                                <h3 className="text-2xl font-bold font-display text-white border-b border-primary-800 pb-3 flex items-center gap-3">
                                    <FiCompass className="text-amber-400" /> Contact Info
                                </h3>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary-800/40 border border-primary-700 rounded-2xl text-amber-400">
                                            <FiMail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-primary-400 uppercase tracking-wider font-display font-medium">Official Inquiry Inbox</p>
                                            <p className="text-lg text-white font-semibold font-body break-all">consult@galaxynamelab.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Form Container */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.4}
                            className="lg:col-span-8 bg-primary-900/20 backdrop-blur-md border border-primary-800/60 p-8 rounded-3xl shadow-2xl relative"
                        >
                            <AnimatePresence mode="wait">
                                {!success ? (
                                    <motion.form
                                        key="inquiry-form"
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <h3 className="text-2xl font-bold font-display text-white mb-6 border-b border-primary-800 pb-3">
                                            Submit Your Inquiry
                                        </h3>

                                        {error && (
                                            <div className="p-4 bg-red-900/30 border border-red-800 rounded-2xl flex items-start gap-3 text-red-200 text-sm font-body">
                                                <FiAlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                                <span>{error}</span>
                                            </div>
                                        )}

                                        {/* Row 1: Full Name & Email */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-primary-300 mb-2 font-body flex items-center gap-1.5">
                                                    <FiUser className="text-purple-400" /> Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. Gabriel Faith"
                                                    required
                                                    disabled={submitting}
                                                    className="w-full px-4 py-3 bg-primary-800/40 border border-primary-700/60 rounded-xl text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-body text-sm md:text-base"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-primary-300 mb-2 font-body flex items-center gap-1.5">
                                                    <FiMail className="text-purple-400" /> Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. contact@example.com"
                                                    required
                                                    disabled={submitting}
                                                    className="w-full px-4 py-3 bg-primary-800/40 border border-primary-700/60 rounded-xl text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-body text-sm md:text-base"
                                                />
                                            </div>
                                        </div>

                                        {/* Row 2: Phone & Subject Dropdown */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-primary-300 mb-2 font-body flex items-center gap-1.5">
                                                    <FiPhone className="text-purple-400" /> Phone Number (Optional)
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. +1 (555) 019-9000"
                                                    disabled={submitting}
                                                    className="w-full px-4 py-3 bg-primary-800/40 border border-primary-700/60 rounded-xl text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-body text-sm md:text-base"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-primary-300 mb-2 font-body">
                                                    Inquiry Topic *
                                                </label>
                                                <select
                                                    name="topic"
                                                    value={formData.topic}
                                                    onChange={handleInputChange}
                                                    required
                                                    disabled={submitting}
                                                    className="w-full px-4 py-3 bg-primary-800/40 border border-primary-700/60 rounded-xl text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-body text-sm md:text-base cursor-pointer"
                                                >
                                                    <option value="" className="bg-primary-950 text-white">Select a topic...</option>
                                                    <option value="General Question" className="bg-primary-950 text-white">General Inquiry</option>
                                                    <option value="Business Naming Consultation" className="bg-primary-950 text-white">Corporate & Business Naming</option>
                                                    <option value="Individual Fortune Naming" className="bg-primary-950 text-white">Individual Fortune Naming</option>
                                                    <option value="Astrological Audit Service" className="bg-primary-950 text-white">Astrological Chart Analysis</option>
                                                    <option value="Billing & Support" className="bg-primary-950 text-white">Order Issues & Technical Support</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Message Textarea */}
                                        <div>
                                            <label className="block text-sm font-medium text-primary-300 mb-2 font-body flex items-center gap-1.5">
                                                <FiMessageSquare className="text-purple-400" /> Message / Details *
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                rows={6}
                                                placeholder="Please write the details of your inquiry..."
                                                required
                                                disabled={submitting}
                                                className="w-full px-4 py-3 bg-primary-800/40 border border-primary-700/60 rounded-xl text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-body text-sm md:text-base resize-y"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/20 disabled:from-primary-800 disabled:to-primary-800 disabled:text-primary-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 font-display text-sm md:text-base cursor-pointer"
                                        >
                                            {submitting ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2" />
                                                    Sending Inquiry...
                                                </>
                                            ) : (
                                                <>
                                                    <FiSend className="w-5 h-5" />
                                                    Submit Inquiry Request
                                                </>
                                            )}
                                        </button>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success-container"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                                        className="text-center py-12 px-4 space-y-6"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: 'spring', damping: 12 }}
                                            className="inline-block p-4 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full mb-2"
                                        >
                                            <FiCheckCircle className="w-16 h-16" />
                                        </motion.div>

                                        <h3 className="text-3xl font-extrabold font-display text-white">
                                            Inquiry Transmitted!
                                        </h3>
                                        
                                        <p className="text-primary-100 font-body text-base max-w-lg mx-auto leading-relaxed">
                                            Your inquiry has been broadcasted and sent directly to our team at <span className="text-amber-400 font-semibold">consult@galaxynamelab.com</span>.
                                        </p>

                                        <div className="p-5 bg-primary-950/60 border border-primary-800 rounded-2xl max-w-md mx-auto text-sm text-left font-body space-y-2 text-primary-200">
                                            <p className="font-semibold text-amber-400 border-b border-primary-800 pb-1.5 mb-2">What Happens Next?</p>
                                            <p>1. A confirmation receipt has been dispatched to your email address with the contents of your inquiry.</p>
                                            <p>2. Our team of naming experts will analyze your request in details.</p>
                                            <p>3. A detailed response will be delivered directly to your inbox within <span className="text-white font-medium">24 - 48 business hours</span>.</p>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                onClick={() => setSuccess(false)}
                                                className="px-6 py-3 bg-primary-800/60 hover:bg-primary-700/60 border border-primary-700 text-white rounded-xl font-display font-semibold transition-colors duration-200 cursor-pointer"
                                            >
                                                Send Another Message
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                    </div>
                </div>
            </section>
        </PageWrapper>
    );
};

export default InquiryPage;
