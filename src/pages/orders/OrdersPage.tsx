// src/pages/orders/OrdersPage.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiPackage,
  FiDownload,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiAlertCircle,
  FiFileText,
  FiLock,
  FiRefreshCw,
  FiArrowRight,
} from 'react-icons/fi';

import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import { OrderService } from '@api/services/orderService';
import { Order, OrderStatus } from '@api/types/order';
import { STORAGE_KEYS } from '@constants/api';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
  }),
};

interface OrdersPageProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadingOrderId, setDownloadingOrderId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  const checkAuthStatus = () => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const isAuthenticated = !!token;
    setIsAuthenticated(isAuthenticated);

    // Open login modal if not authenticated
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    }

    return isAuthenticated;
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await OrderService.getMyOrders();

      // Handle 401 error specifically - clear invalid token and show login modal
      if (response.statusCode === 401) {
        console.log("Handling 401 - opening login modal");
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        setIsAuthenticated(false);
        setIsLoginModalOpen(true);
        return; // Don't set error - the "Not Authenticated" message will show
      }

      if (response.success && response.data) {
        setOrders(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to load orders');
      }
    } catch (err: any) {
      // Handle 401 error in catch block - clear invalid token and show login modal
      console.log('Fetch orders error:', err);
      if (err?.response?.status === 401 || err?.message?.includes('401') || err?.statusCode === 401) {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        setIsAuthenticated(false);
        setIsLoginModalOpen(true);
        return; // Don't set error - the "Not Authenticated" message will show
      }
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check auth status on mount
    const isAuth = checkAuthStatus();

    // Listen for auth change events
    const handleAuthChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const loggedIn = customEvent.detail?.isAuthenticated;

      if (loggedIn) {
        setIsAuthenticated(true);
        // Fetch orders after login
        fetchOrders();
      } else {
        setIsAuthenticated(false);
      }
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  useEffect(() => {
    // Only fetch orders if authenticated
    if (isAuthenticated) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const handleDownloadPdf = async (orderId: string) => {
    try {
      setDownloadingOrderId(orderId);
      const response = await OrderService.downloadOrderPdf(orderId);

      if (response.success && response.blob) {
        // Generate filename with timestamp
        const filename = `order-report-${orderId}-${Date.now()}.pdf`;
        OrderService.downloadBlob(response.blob, filename);
      } else {
        alert(response.error || 'Failed to download PDF');
      }
    } catch (err) {
      alert('An unexpected error occurred while downloading');
    } finally {
      setDownloadingOrderId(null);
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed':
      case 'completed':
        return {
          color: 'bg-green-900/30 text-green-400 border-green-700/50',
          icon: <FiCheckCircle className="text-green-400" />,
          text: 'Confirmed',
        };
      case 'pending':
        return {
          color: 'bg-amber-900/30 text-amber-400 border-amber-700/50',
          icon: <FiClock className="text-amber-400" />,
          text: 'Pending',
        };
      case 'cancelled':
        return {
          color: 'bg-red-900/30 text-red-400 border-red-700/50',
          icon: <FiXCircle className="text-red-400" />,
          text: 'Cancelled',
        };
      default:
        return {
          color: 'bg-gray-900/30 text-gray-400 border-gray-700/50',
          icon: <FiAlertCircle className="text-gray-400" />,
          text: status,
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <PageWrapper>
      <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />

      <section className="relative w-full min-h-screen flex flex-col items-center justify-start text-center bg-gradient-to-b from-primary-950 via-primary-900/50 to-primary-950 text-primary-50 overflow-hidden px-4 py-32">
        {/* Animated Background Blobs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-600/15 rounded-full mix-blend-multiply blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, -30, 0], scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-600/20 rounded-full mix-blend-multiply blur-3xl"
          animate={{ y: [0, -25, 0], x: [0, 25, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut', delay: 2 }}
        />

        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Page Title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="w-full max-w-5xl mb-12 mt-10 relative z-10"
        >
          <div className="bg-gradient-to-br from-primary-900/80 via-primary-800/60 to-primary-900/80 backdrop-blur-xl rounded-[2rem] p-10 border border-primary-700/50 shadow-2xl relative overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-amber-600/5 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-5 mb-5">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                >
                  <FiPackage className="text-purple-400 text-5xl drop-shadow-lg" />
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-amber-400 to-purple-400 drop-shadow-2xl">
                  My Orders
                </h1>
              </div>
              <p className="text-xl text-primary-200 leading-relaxed font-light">
                View and manage your orders. Download your reports once they're ready.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="w-full max-w-6xl mx-auto mb-16 relative z-10">
          {/* Not Authenticated State */}
          {!isAuthenticated && !loading && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-center py-16 bg-gradient-to-br from-primary-900/60 to-primary-800/40 backdrop-blur-xl rounded-[2rem] p-12 border border-primary-700/50 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-amber-600/10 pointer-events-none" />

              <div className="relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/20 to-amber-600/20 border-2 border-purple-500/30 backdrop-blur-sm">
                    <FiLock className="text-6xl text-purple-400" />
                  </div>
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-4">Login Required</h3>
                <p className="text-lg text-primary-200 mb-8 max-w-md mx-auto">
                  Please log in to view your orders.
                </p>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="group px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-amber-600 hover:from-purple-500 hover:via-purple-400 hover:to-amber-500 text-white rounded-full font-bold shadow-lg shadow-purple-900/50 hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <span className="flex items-center gap-2">
                    Login to Continue
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && isAuthenticated && (
            <div className="text-center py-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600/20 to-amber-600/20 border-2 border-purple-500/30 backdrop-blur-sm mb-6"
              >
                <FiRefreshCw className="text-4xl text-purple-400" />
              </motion.div>
              <div className="text-2xl text-primary-200 font-medium">Loading your orders...</div>
            </div>
          )}

          {/* Error State */}
          {error && isAuthenticated && (
            <div className="text-center py-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-2xl mx-auto bg-gradient-to-br from-red-900/30 to-red-800/20 backdrop-blur-xl rounded-[1.5rem] p-8 border border-red-700/50 shadow-2xl relative overflow-hidden"
              >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-red-500/10 pointer-events-none" />

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600/20 border-2 border-red-500/30 mb-4">
                    <FiAlertCircle className="text-3xl text-red-400" />
                  </div>
                  <div className="text-2xl text-red-300 font-medium">{error}</div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && isAuthenticated && orders.length === 0 && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-center py-16 bg-gradient-to-br from-primary-900/60 to-primary-800/40 backdrop-blur-xl rounded-[2rem] p-12 border border-primary-700/50 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-amber-600/10 pointer-events-none" />

              <div className="relative z-10">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/20 to-amber-600/20 border-2 border-purple-500/30 backdrop-blur-sm">
                    <FiPackage className="text-6xl text-purple-400" />
                  </div>
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-4">No Orders Yet</h3>
                <p className="text-lg text-primary-200 mb-8 max-w-md mx-auto">
                  You haven't placed any orders yet. Visit our pricing page to get started!
                </p>
                <button
                  onClick={() => window.location.href = '/pricing'}
                  className="group px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-amber-600 hover:from-purple-500 hover:via-purple-400 hover:to-amber-500 text-white rounded-full font-bold shadow-lg shadow-purple-900/50 hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <span className="flex items-center gap-2">
                    Browse Packages
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Orders List */}
          {!loading && !error && isAuthenticated && orders.length > 0 && (
            <div className="space-y-8">
              {orders.map((order, index) => {
                const statusBadge = getStatusBadge(order.status);
                const canDownload = order.status === 'confirmed' || order.status === 'completed';

                return (
                  <motion.div
                    key={order._id}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.2 + index * 0.1}
                    whileHover={{ y: -4 }}
                    className="group bg-gradient-to-br from-primary-900/70 via-primary-800/50 to-primary-900/70 backdrop-blur-xl rounded-[2rem] p-8 border border-primary-700/50 shadow-xl hover:shadow-2xl hover:border-purple-600/50 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Decorative gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Glowing border effect */}
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-purple-600/20 via-amber-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />

                    <div className="relative z-10">
                      {/* Order Header */}
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-primary-700/50">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-gradient-to-br from-purple-600/20 to-amber-600/20 rounded-xl border border-purple-500/30">
                            <FiPackage className="text-2xl text-purple-400" />
                          </div>
                          <div className="text-left">
                            <p className="text-xs text-primary-400 uppercase tracking-wider font-semibold mb-1">Order ID</p>
                            <p className="text-lg font-bold text-white tracking-wide">{order._id}</p>
                          </div>
                        </div>
                        <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border shadow-lg ${statusBadge.color}`}>
                          {statusBadge.icon}
                          <span className="font-semibold">{statusBadge.text}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary-300">
                          <FiCalendar className="text-lg" />
                          <span className="text-sm font-medium">{formatDate(order.createdAt)}</span>
                        </div>
                      </div>

                      {/* Order Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Package & Business Info */}
                        <div className="space-y-4">
                          <div className="bg-primary-800/30 rounded-xl p-4 border border-primary-700/50">
                            <p className="text-xs text-primary-400 uppercase tracking-wider font-semibold mb-2">Package</p>
                            <p className="text-white font-bold text-lg mb-1">{order.package.plan.name}</p>
                            <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                              ${order.package.price.amount}
                            </p>
                          </div>
                          <div className="bg-primary-800/30 rounded-xl p-4 border border-primary-700/50">
                            <p className="text-xs text-primary-400 uppercase tracking-wider font-semibold mb-1">Business Name</p>
                            <p className="text-white font-medium">{order.businessInfo.fullName}</p>
                          </div>
                        </div>

                        {/* Payment Info */}
                        <div className="space-y-4">
                          <div className="bg-primary-800/30 rounded-xl p-4 border border-primary-700/50 h-full">
                            <p className="text-xs text-primary-400 uppercase tracking-wider font-semibold mb-3">Payment Details</p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-primary-400">Gateway</span>
                                <span className="text-white font-semibold capitalize">{order.payment.gateway}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-primary-400">Status</span>
                                <span className={`text-sm font-bold ${order.payment.status === 'completed' ? 'text-green-400' : 'text-amber-400'}`}>
                                  {order.payment.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Report Status */}
                        <div className="space-y-4">
                          <div className="bg-gradient-to-br from-primary-800/50 to-primary-900/50 rounded-xl p-4 border border-primary-700/50 h-full flex flex-col justify-center">
                            <div className="flex items-center justify-center gap-2 mb-3">
                              <FiFileText className="text-2xl text-primary-400" />
                              <p className="text-sm font-semibold text-primary-300">Report Status</p>
                            </div>
                            <div className="px-4 py-3 bg-primary-900/60 rounded-lg text-center">
                              <p className="text-sm text-primary-400">Report will be available once confirmed</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>


    </PageWrapper>
  );
};

export default OrdersPage;
