// src/pages/orders/OrdersPage.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiPackage,
  FiDownload,
  FiUpload,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiAlertCircle,
  FiFileText,
} from 'react-icons/fi';

import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import { OrderService } from '@api/services/orderService';
import { Order, OrderStatus } from '@api/types/order';

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
  const [uploadingOrderId, setUploadingOrderId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<{ orderId: string; file: File } | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await OrderService.getMyOrders();
        console.log("RESPONSE = " + JSON.stringify(response.data))
        if (response.success && response.data) {
          setOrders(response.data);
        } else {
          setError(response.error || 'Failed to load orders');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

  const handleFileSelect = (orderId: string, file: File) => {
    // Validate PDF file
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }
    setSelectedFile({ orderId, file });
  };

  const handleUploadPdf = async (orderId: string) => {
    if (!selectedFile || selectedFile.orderId !== orderId) {
      alert('Please select a PDF file first');
      return;
    }

    try {
      setUploadingOrderId(orderId);
      const response = await OrderService.uploadSubmission(orderId, selectedFile.file);

      if (response.success) {
        alert('PDF uploaded successfully!');
        setSelectedFile(null);
      } else {
        alert(response.error || 'Failed to upload PDF');
      }
    } catch (err) {
      alert('An unexpected error occurred while uploading');
    } finally {
      setUploadingOrderId(null);
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

      <section className="relative w-full min-h-screen flex flex-col items-center justify-start text-center bg-primary-950 text-primary-50 overflow-hidden px-4 py-12">
        {/* Background Blobs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply blur-3xl opacity-20"
          animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600 rounded-full mix-blend-multiply blur-3xl opacity-15"
          animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
        />

        {/* Page Title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="w-full max-w-5xl mb-12 mt-10 bg-primary-900/50 backdrop-blur-md rounded-3xl p-8 border border-primary-800 shadow-2xl"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <FiPackage className="text-purple-400 text-4xl" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-amber-600 to-purple-600">
              My Orders
            </h1>
          </div>
          <p className="text-xl text-white leading-relaxed">
            View and manage your orders. Download your reports once they're ready.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="w-full max-w-6xl mx-auto mb-16">
          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="text-2xl text-primary-300 font-medium animate-pulse">Loading your orders...</div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="text-2xl text-red-400 font-medium bg-red-900/20 backdrop-blur-sm rounded-2xl p-6 border border-red-800 max-w-2xl mx-auto">
                {error}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && orders.length === 0 && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-center py-16 bg-primary-900/30 backdrop-blur-sm rounded-3xl p-12 border border-primary-800"
            >
              <FiPackage className="text-6xl text-primary-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">No Orders Yet</h3>
              <p className="text-lg text-primary-300 mb-8">
                You haven't placed any orders yet. Visit our pricing page to get started!
              </p>
              <button
                onClick={() => window.location.href = '/pricing'}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white rounded-full font-bold shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Browse Packages
              </button>
            </motion.div>
          )}

          {/* Orders List */}
          {!loading && !error && orders.length > 0 && (
            <div className="space-y-6">
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
                    className="bg-primary-900/50 backdrop-blur-md rounded-3xl p-8 border border-primary-800 shadow-xl hover:shadow-2xl hover:border-purple-700/50 transition-all"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Order ID & Status */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-primary-400 mb-1">Order ID</p>
                          <p className="text-white font-semibold">{order._id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-primary-400 mb-1">Status</p>
                          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${statusBadge.color}`}>
                            {statusBadge.icon}
                            <span className="font-medium">{statusBadge.text}</span>
                          </div>
                        </div>
                      </div>

                      {/* Package & Business Info */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-primary-400 mb-1">Package</p>
                          <p className="text-white font-medium">{order.package.plan.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-primary-400 mb-1">Business Name</p>
                          <p className="text-white">{order.businessInfo.businessName}</p>
                        </div>
                      </div>

                      {/* Date of Birth & Created At */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-primary-400 mb-1">Date of Birth</p>
                          <p className="text-white">{formatDate(order.businessInfo.dateOfBirth)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiCalendar className="text-primary-400" />
                          <div>
                            <p className="text-sm text-primary-400">Created</p>
                            <p className="text-white">{formatDate(order.createdAt)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Payment & Actions */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-primary-400 mb-1">Payment</p>
                          <p className="text-white text-sm capitalize">{order.payment.gateway}</p>
                          <p className={`text-sm ${order.payment.status === 'completed' ? 'text-green-400' : 'text-amber-400'}`}>
                            {order.payment.status}
                          </p>
                        </div>
                        <div className="space-y-2 pt-2">
                          {/* Download Button */}
                          {canDownload ? (
                            <button
                              onClick={() => handleDownloadPdf(order._id)}
                              disabled={downloadingOrderId === order._id}
                              className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                              {downloadingOrderId === order._id ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                  Downloading...
                                </>
                              ) : (
                                <>
                                  <FiDownload className="text-lg" />
                                  Download Report
                                </>
                              )}
                            </button>
                          ) : (
                            <div className="px-4 py-3 bg-primary-800/50 rounded-xl text-center text-primary-400 text-sm">
                              <FiFileText className="inline mr-2" />
                              Report will be available once confirmed
                            </div>
                          )}

                          {/* Upload Button */}
                          <div className="flex gap-2">
                            <input
                              type="file"
                              id={`file-input-${order._id}`}
                              accept=".pdf,application/pdf"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileSelect(order._id, file);
                                }
                              }}
                            />
                            <button
                              onClick={() => document.getElementById(`file-input-${order._id}`)?.click()}
                              disabled={uploadingOrderId === order._id}
                              className="flex-1 px-4 py-3 bg-primary-700 hover:bg-primary-600 text-white rounded-xl font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                              <FiFileText className="text-lg" />
                              {selectedFile?.orderId === order._id ? selectedFile.file.name : 'Select PDF'}
                            </button>
                            <button
                              onClick={() => handleUploadPdf(order._id)}
                              disabled={!selectedFile || selectedFile.orderId !== order._id || uploadingOrderId === order._id}
                              className="px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                              {uploadingOrderId === order._id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                              ) : (
                                <FiUpload className="text-lg" />
                              )}
                            </button>
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
