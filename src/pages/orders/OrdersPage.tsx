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
  FiLock,
  FiEdit,
  FiRefreshCw,
  FiX,
} from 'react-icons/fi';

import PageWrapper from '@components/layouts/PageWrapper';
import Header from '@components/layouts/Header';
import { OrderService } from '@api/services/orderService';
import { Order, OrderStatus, Submission } from '@api/types/order';
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
  const [uploadingOrderId, setUploadingOrderId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<{ orderId: string; file: File } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<Record<string, Submission[]>>({});
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});
  const [loadingSubmissions, setLoadingSubmissions] = useState<Record<string, boolean>>({});

  // New state for submission actions
  const [submissionFileInputs, setSubmissionFileInputs] = useState<Record<string, File | null>>({});
  const [replacingSubmissionId, setReplacingSubmissionId] = useState<string | null>(null);

  const [downloadingAdminResponse, setDownloadingAdminResponse] = useState<string | null>(null);

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

  const handleDownloadAdminResponse = async (submissionId: string) => {
    try {
      setDownloadingAdminResponse(submissionId);
      const response = await OrderService.downloadAdminResponsePdf(submissionId);

      if (response.success && response.blob) {
        // Generate filename using submission ID
        const filename = `admin-response-${submissionId}.pdf`;
        OrderService.downloadBlob(response.blob, filename);
      } else {
        alert(response.error || 'Failed to download admin response');
      }
    } catch (err) {
      alert('An unexpected error occurred while downloading');
    } finally {
      setDownloadingAdminResponse(null);
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
        // Refresh submissions for this order
        fetchSubmissionsForOrder(orderId);
      } else {
        alert(response.error || 'Failed to upload PDF');
      }
    } catch (err) {
      alert('An unexpected error occurred while uploading');
    } finally {
      setUploadingOrderId(null);
    }
  };

  const fetchSubmissionsForOrder = async (orderId: string) => {
    try {
      setLoadingSubmissions(prev => ({ ...prev, [orderId]: true }));
      const response = await OrderService.getOrderSubmissions(orderId);
      if (response.success && response.data) {
        const submissionsData = response.data;
        setSubmissions(prev => ({ ...prev, [orderId]: submissionsData }));
      }
    } catch (err) {
      console.error('Failed to fetch submissions:', err);
    } finally {
      setLoadingSubmissions(prev => ({ ...prev, [orderId]: false }));
    }
  };

  // Handle file selection for submission replacement
  const handleSubmissionFileSelect = (submissionId: string, file: File) => {
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }
    setSubmissionFileInputs(prev => ({ ...prev, [submissionId]: file }));
  };

  // Handle replacing submission file
  const handleReplaceSubmissionFile = async (orderId: string, submissionId: string) => {
    const file = submissionFileInputs[submissionId];
    if (!file) {
      alert('Please select a PDF file first');
      return;
    }

    try {
      setReplacingSubmissionId(submissionId);
      const response = await OrderService.replaceSubmissionFile(orderId, file);

      if (response.success) {
        alert('Submission file replaced successfully!');
        setSubmissionFileInputs(prev => ({ ...prev, [submissionId]: null }));
        // Refresh submissions for this order
        await fetchSubmissionsForOrder(orderId);
      } else {
        alert(response.error || 'Failed to replace submission file');
      }
    } catch (err) {
      alert('An unexpected error occurred while replacing file');
    } finally {
      setReplacingSubmissionId(null);
    }
  };



  // Handle admin update submission
  // const handleAdminUpdateSubmission = async () => {
  //   if (!adminUpdateModal) return;

  //   try {
  //     setIsUpdatingSubmission(adminUpdateModal.submissionId);
  //     const response = await OrderService.updateSubmission(
  //       adminUpdateModal.submissionId,
  //       adminUpdateData.status,
  //       adminUpdateData.adminComment,
  //       adminUpdateData.file || undefined
  //     );

  //     if (response.success) {
  //       alert('Submission updated successfully!');
  //       closeAdminUpdateModal();
  //       // Refresh submissions for this order
  //       await fetchSubmissionsForOrder(adminUpdateModal.orderId);
  //     } else {
  //       alert(response.error || 'Failed to update submission');
  //     }
  //   } catch (err) {
  //     alert('An unexpected error occurred while updating');
  //   } finally {
  //     setIsUpdatingSubmission(null);
  //   }
  // };

  const toggleExpanded = (orderId: string) => {
    setExpandedOrders(prev => {
      const newState = { ...prev, [orderId]: !prev[orderId] };
      // Fetch submissions when expanding for the first time
      if (newState[orderId] && !submissions[orderId]) {
        fetchSubmissionsForOrder(orderId);
      }
      return newState;
    });
  };

  const getSubmissionStatusColor = (status: string) => {
    switch (status) {
      case 'reviewed':
        return 'bg-blue-900/30 text-blue-400 border-blue-700/50';
      case 'approved':
        return 'bg-green-900/30 text-green-400 border-green-700/50';
      case 'rejected':
        return 'bg-red-900/30 text-red-400 border-red-700/50';
      default:
        return 'bg-gray-900/30 text-gray-400 border-gray-700/50';
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

      <section className="relative w-full min-h-screen flex flex-col items-center justify-start text-center bg-primary-950 text-primary-50 overflow-hidden px-4 py-32">
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
          {/* Not Authenticated State */}
          {!isAuthenticated && !loading && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-center py-16 bg-primary-900/30 backdrop-blur-sm rounded-3xl p-12 border border-primary-800"
            >
              <FiLock className="text-6xl text-primary-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Login Required</h3>
              <p className="text-lg text-primary-300 mb-8">
                Please log in to view your orders.
              </p>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white rounded-full font-bold shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Login to Continue
              </button>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && isAuthenticated && (
            <div className="text-center py-12">
              <div className="text-2xl text-primary-300 font-medium animate-pulse">Loading your orders...</div>
            </div>
          )}

          {/* Error State */}
          {error && isAuthenticated && (
            <div className="text-center py-12">
              <div className="text-2xl text-red-400 font-medium bg-red-900/20 backdrop-blur-sm rounded-2xl p-6 border border-red-800 max-w-2xl mx-auto">
                {error}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && isAuthenticated && orders.length === 0 && (
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
          {!loading && !error && isAuthenticated && orders.length > 0 && (
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

                    {/* Submissions Section */}
                    <div className="mt-6 pt-6 border-t border-primary-700">
                      <button
                        onClick={() => toggleExpanded(order._id)}
                        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
                      >
                        <FiFileText className="text-lg" />
                        {expandedOrders[order._id] ? 'Hide Submissions' : 'View Submissions'}
                        {submissions[order._id] && (
                          <span className="px-2 py-1 bg-purple-900/50 rounded-full text-xs">
                            {submissions[order._id].length}
                          </span>
                        )}
                      </button>

                      {expandedOrders[order._id] && (
                        <div className="mt-4 space-y-3">
                          {loadingSubmissions[order._id] ? (
                            <div className="text-center py-8 text-primary-400">Loading submissions...</div>
                          ) : submissions[order._id]?.length > 0 ? (
                            submissions[order._id].map((submission) => (
                              <div
                                key={submission._id}
                                className="bg-primary-800/30 rounded-xl p-4 border border-primary-700"
                              >
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSubmissionStatusColor(submission.status)}`}>
                                        Status: {submission.status}
                                      </span>
                                    </div>
                                    <div className="space-y-1 text-sm">
                                      <p className="text-primary-400">
                                        File: <span className="text-white">{submission.originalName}</span>
                                      </p>
                                      <p className="text-primary-400">
                                        Submitted: <span className="text-white">{formatDate(submission.createdAt)}</span>
                                      </p>
                                      {submission.adminComment && (
                                        <p className="text-primary-400">
                                          Admin Comment: <span className="text-white">{submission.adminComment}</span>
                                        </p>
                                      )}
                                      {submission.adminPdfPath && (
                                        <p className="text-green-400">
                                          ✓ Admin response available
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                      {/* Upload/Replace PDF Button */}
                                      <input
                                        type="file"
                                        id={`submission-file-${submission._id}`}
                                        accept=".pdf,application/pdf"
                                        className="hidden"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            handleSubmissionFileSelect(submission._id, file);
                                          }
                                        }}
                                      />
                                      <button
                                        onClick={() => document.getElementById(`submission-file-${submission._id}`)?.click()}
                                        disabled={replacingSubmissionId === submission._id}
                                        className="px-3 py-2 bg-primary-700 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Upload/Replace PDF"
                                      >
                                        {submissionFileInputs[submission._id] ? (
                                          <>
                                            <FiCheckCircle className="text-sm text-green-400" />
                                            {submissionFileInputs[submission._id]!.name.length > 10
                                              ? submissionFileInputs[submission._id]!.name.substring(0, 10) + '...'
                                              : submissionFileInputs[submission._id]!.name}
                                          </>
                                        ) : (
                                          <>
                                            <FiUpload className="text-sm" />
                                            Upload
                                          </>
                                        )}
                                      </button>
                                      {submissionFileInputs[submission._id] && (
                                        <button
                                          onClick={() => handleReplaceSubmissionFile(order._id, submission._id)}
                                          disabled={replacingSubmissionId === submission._id}
                                          className="px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                          {replacingSubmissionId === submission._id ? (
                                            <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent"></div>
                                          ) : (
                                            <FiUpload className="text-sm" />
                                          )}
                                        </button>
                                      )}

                                      {/* Download Admin Response Button */}
                                      {submission.adminPdfPath ? (
                                        <button
                                          onClick={() => handleDownloadAdminResponse(submission._id)}
                                          disabled={downloadingAdminResponse === submission._id}
                                          className="px-3 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                          title="Download Admin Response"
                                        >
                                          {downloadingAdminResponse === submission._id ? (
                                            <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent"></div>
                                          ) : (
                                            <FiDownload className="text-sm" />
                                          )}
                                          Response
                                        </button>
                                      ) : (
                                        <span className="px-3 py-2 bg-primary-800/50 text-primary-400 rounded-lg text-sm font-medium">
                                          No Response
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8 text-primary-400">
                              No submissions yet for this order
                            </div>
                          )}
                        </div>
                      )}
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
