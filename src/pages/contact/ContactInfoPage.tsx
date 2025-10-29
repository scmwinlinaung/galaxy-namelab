// src/pages/ContactInfoPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
// Added FiPhone, FiMail, FiMapPin for contact details
import { FiSend, FiUsers, FiCheckCircle, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const ContactInfoPage: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <PageWrapper>
            <Header />
            <main className="min-h-screen w-full bg-gray-900 text-gray-100">
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <motion.div
                    className="relative z-10 container mx-auto px-6 py-24"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Page Title */}
                    <motion.div className="text-center mb-16" variants={itemVariants}>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
                            Get in <span className="text-cyan-400">Touch</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            We'd love to hear from you. Our team is always here to chat.
                        </p>
                    </motion.div>

                    {/* Top Stats Section */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto"
                        variants={containerVariants}
                    >
                        <motion.div className="bg-gray-800/50 border border-gray-700 p-6 rounded-2xl flex items-center justify-center space-x-4" variants={itemVariants}>
                            <div className="bg-cyan-500/20 p-3 rounded-full">
                                <FiUsers className="text-3xl text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white">1,234+</h3>
                                <p className="text-gray-400">Happy Clients</p>
                            </div>
                        </motion.div>
                        <motion.div className="bg-gray-800/50 border border-gray-700 p-6 rounded-2xl flex items-center justify-center space-x-4" variants={itemVariants}>
                            <div className="bg-green-500/20 p-3 rounded-full">
                                <FiCheckCircle className="text-3xl text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white">98%</h3>
                                <p className="text-gray-400">Success Rate</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Main Content Grid: Contact Info + Form */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

                        {/* LEFT COLUMN: Contact Information */}
                        <motion.div variants={containerVariants} className="space-y-8">
                            <motion.div variants={itemVariants}>
                                <h2 className="text-3xl font-bold mb-6 text-white">Contact Information</h2>
                                <p className="text-gray-300 mb-8 leading-relaxed">
                                    Fill up the form and our team will get back to you within 24 hours.
                                    Or feel free to reach out to us directly via email or phone.
                                </p>
                            </motion.div>

                            {/* Contact Details Cards */}
                            <motion.div className="space-y-6" variants={containerVariants}>
                                {/* Phone */}
                                <motion.a
                                    href="tel:+15551234567"
                                    className="flex items-center p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-cyan-400 transition-colors duration-300 group"
                                    variants={itemVariants}
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="bg-cyan-500/10 p-3 rounded-lg mr-4 group-hover:bg-cyan-500/20 transition-colors">
                                        <FiPhone className="text-2xl text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Phone</p>
                                        <p className="text-lg text-white font-semibold">+1 (555) 123-4567</p>
                                    </div>
                                </motion.a>

                                {/* Email */}
                                <motion.a
                                    href="mailto:hello@example.com"
                                    className="flex items-center p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-cyan-400 transition-colors duration-300 group"
                                    variants={itemVariants}
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="bg-cyan-500/10 p-3 rounded-lg mr-4 group-hover:bg-cyan-500/20 transition-colors">
                                        <FiMail className="text-2xl text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Email</p>
                                        <p className="text-lg text-white font-semibold">hello@example.com</p>
                                    </div>
                                </motion.a>

                                {/* Office Address */}
                                <motion.div
                                    className="flex items-center p-4 bg-gray-800 rounded-xl border border-gray-700"
                                    variants={itemVariants}
                                >
                                    <div className="bg-cyan-500/10 p-3 rounded-lg mr-4">
                                        <FiMapPin className="text-2xl text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Office</p>
                                        <p className="text-lg text-white font-semibold">123 Innovation Drive, Tech City</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* RIGHT COLUMN: Contact Form */}
                        <motion.div
                            className="bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700"
                            variants={itemVariants}
                        >
                            <h2 className="text-2xl font-bold mb-6 text-white">Send us a Message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                                            Phone Number (Optional)
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white transition-all"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white transition-all resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <motion.button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FiSend className="mr-2 text-xl" />
                                    Send Message
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>

                </motion.div>
            </main>
        </PageWrapper>
    );
};

export default ContactInfoPage;