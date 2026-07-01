import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiLock, FiCreditCard, FiCheckCircle, FiAlertCircle, FiUser } from 'react-icons/fi';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentService } from '@api/services/paymentService';
import { Package } from '@api/types/pricing';
import { BusinessInfoForm, CheckoutState, OrderType } from '@api/types/payment';
import LoginModal from '@components/auth/LoginModal';
import { STORAGE_KEYS } from '@constants/api';
import { EmailService, AuthService } from '@api/index';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/navigation';

// Initialize Stripe with publishable key from environment variable
const stripeKey = (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) || "pk_live_51Sk10FFDgAPvX2A59J3M1cJaM4a1rij1ntQRNEkOvgkH5Vz08xyOJV7nw2tr780YFqYfusonrVdBMvw0edDS0ME700VyWrYVU1";
const stripePromise = loadStripe(stripeKey);
const isTestMode = stripeKey?.startsWith('pk_test_');

// Helper function to get user-friendly error messages from Stripe errors
const getStripeErrorMessage = (error: any): string => {
  const errorCode = error.code;

  switch (errorCode) {
    case 'card_declined':
      return 'Your card was declined. Please try a different payment method.';
    case 'insufficient_funds':
      return 'Insufficient funds. Please check your balance or use a different card.';
    case 'expired_card':
      return 'Your card has expired. Please use a different card.';
    case 'incorrect_cvc':
      return 'The CVC code is incorrect. Please check and try again.';
    case 'incorrect_number':
      return 'The card number is incorrect. Please check and try again.';
    case 'processing_error':
      return 'An error occurred while processing your card. Please try again.';
    case 'card_not_supported':
      return 'Your card does not support this type of payment.';
    default:
      return error.message || 'Payment failed. Please try again.';
  }
};

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: Package | null;
}

// Inner Checkout Form Component
const CheckoutForm: React.FC<{
  selectedPackage: Package;
  onComplete: () => void;
  onCancel: () => void;
  onUnauthorized: () => void;
}> = ({ selectedPackage, onComplete, onCancel, onUnauthorized }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [guestEmail, setGuestEmail] = useState('');
  const [isAutoCreatedAccount, setIsAutoCreatedAccount] = useState(false);
  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    step: 'initialize',
    packageId: selectedPackage._id,
    clientSecret: null,
    paymentIntentId: null,
    error: null,
    loading: true,
  });
  const [businessInfo, setBusinessInfo] = useState<BusinessInfoForm>({
    fullName: '',
    dob: '',
    birthTime: '',
    birthPlace: '',
    details: '',
    preferredSyllables: [],
  });
  const [orderType] = useState<OrderType>(selectedPackage.categoryCode as OrderType);
  const [isElementsReady, setIsElementsReady] = useState(false);
  const isInitializingRef = useRef(false);
  const isMountedRef = useRef(true);

  // Step 1: Initialize Payment
  useEffect(() => {
    isMountedRef.current = true;

    if (isInitializingRef.current) return;

    const initializePayment = async () => {
      if (!selectedPackage._id) return;

      isInitializingRef.current = true;
      if (isMountedRef.current) {
        setCheckoutState((prev) => ({ ...prev, loading: true, error: null }));
      }

      try {
        const userEmail = localStorage.getItem(STORAGE_KEYS.USER_EMAIL) || '';
        const name = localStorage.getItem(STORAGE_KEYS.USER_NAME) || '';
        const response = await PaymentService.createStripeIntent(selectedPackage._id, userEmail, name);

        // Check for 401 unauthorized
        if (response.statusCode === 401) {
          onUnauthorized();
          return;
        }

        // Ensure we have the data we need
        if (response.success && response.data && response.data.clientSecret) {
          if (isMountedRef.current) {
            setCheckoutState({
              step: 'payment',
              packageId: selectedPackage._id,
              clientSecret: response.data.clientSecret,
              paymentIntentId: response.data.paymentIntentId,
              error: null,
              loading: false,
            });
          }
        } else {
          if (isMountedRef.current) {
            setCheckoutState({
              step: 'error',
              packageId: selectedPackage._id,
              clientSecret: null,
              paymentIntentId: null,
              error: response.error || 'Failed to initialize payment',
              loading: false,
            });
          }
        }
      } catch (error) {
        if (isMountedRef.current) {
          setCheckoutState({
            step: 'error',
            packageId: selectedPackage._id,
            clientSecret: null,
            paymentIntentId: null,
            error: 'Failed to connect to payment server',
            loading: false,
          });
        }
      }
    };

    initializePayment();

    return () => {
      isInitializingRef.current = false;
      isMountedRef.current = false;
    };
  }, [selectedPackage._id]);

  // Ensure elements are ready before allowing payment
  useEffect(() => {
    if (elements && stripe) {
      setIsElementsReady(true);
    }
  }, [elements, stripe]);

  // Step 2: Confirm Payment with Stripe (with Pre-Payment account validation)
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !checkoutState.clientSecret) {
      setCheckoutState((prev) => ({
        ...prev,
        error: 'Payment system not ready. Please try again.',
      }));
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setCheckoutState((prev) => ({
        ...prev,
        error: 'Card element not found. Please refresh the page.',
      }));
      return;
    }

    if (isMountedRef.current) {
      setCheckoutState((prev) => ({ ...prev, loading: true, error: null }));
    }

    try {
      let authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) || '';
      let userEmail = localStorage.getItem(STORAGE_KEYS.USER_EMAIL) || '';
      let password = localStorage.getItem(STORAGE_KEYS.USER_PASSWORD) || '';
      let isAutoCreated = false;
      let autoGeneratedPassword = '';

      const effectiveEmail = authToken ? userEmail : guestEmail.trim();

      // Ensure account is registered and logged in BEFORE capturing credit card info!
      if (!authToken) {
        autoGeneratedPassword = 'Galaxy_' + Math.random().toString(36).slice(-8) + '!';
        
        try {
          const registerResponse = await AuthService.register({
            name: businessInfo.fullName,
            email: effectiveEmail,
            password: autoGeneratedPassword
          });

          if (registerResponse.success && registerResponse.data) {
            const token = registerResponse.data.token;
            const userId = registerResponse.data.user?.id || '';
            
            localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
            localStorage.setItem(STORAGE_KEYS.USER_EMAIL, effectiveEmail);
            localStorage.setItem(STORAGE_KEYS.USER_NAME, businessInfo.fullName);
            localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
            localStorage.setItem(STORAGE_KEYS.USER_PASSWORD, autoGeneratedPassword);
            
            authToken = token;
            userEmail = effectiveEmail;
            password = autoGeneratedPassword;
            isAutoCreated = true;
            setIsAutoCreatedAccount(true);

            // Dispatch auth change event so UI updates
            window.dispatchEvent(new CustomEvent('authChange', { detail: { isAuthenticated: true } }));
          } else {
            // STOP! Registration failed (likely email exists). Do NOT charge the card.
            const backendMsg = (registerResponse as any).msg || (registerResponse as any).message || registerResponse.error || '';
            const isEmailExists = backendMsg.toLowerCase().includes('already') || 
                                 backendMsg.toLowerCase().includes('exist');
            
            const userFriendlyError = isEmailExists 
              ? 'This email address is already registered in our system. Please click the "Login" button at the top-right to sign in first, then proceed with your checkout!'
              : backendMsg || 'This email is already registered. Please login to your account at the top right before checking out, or use a different email.';

            setCheckoutState((prev) => ({
              ...prev,
              error: userFriendlyError,
              loading: false,
            }));
            return;
          }
        } catch (regError: any) {
          console.error('Pre-checkout registration error:', regError);
          setCheckoutState((prev) => ({
            ...prev,
            error: 'Failed to create your account. This email might already be registered. Please use another email or login first.',
            loading: false,
          }));
          return;
        }
      }

      // Account verified or newly auto-registered. Proceed with secure payment confirmation!
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        checkoutState.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: businessInfo.fullName || 'Customer',
            },
          },
        }
      );

      if (!isMountedRef.current) return;

      if (error) {
        setCheckoutState((prev) => ({
          ...prev,
          error: getStripeErrorMessage(error),
          loading: false,
        }));
        return;
      }

      if (paymentIntent?.id) {
        await createOrder(paymentIntent.id, userEmail, password, isAutoCreated);
      }
    } catch (err) {
      console.error("Payment Error:", err);
      if (isMountedRef.current) {
        setCheckoutState((prev) => ({
          ...prev,
          error: 'An unexpected error occurred. Please try again.',
          loading: false,
        }));
      }
    }
  };

  // Step 3: Create Order in backend
  const createOrder = async (
    paymentIntentId: string, 
    userEmail: string, 
    password?: string, 
    isAutoCreated: boolean = false
  ) => {
    try {
      // Prepare order payload
      const orderData: any = {
        packageId: selectedPackage._id,
        paymentMethod: 'stripe' as const,
        paymentDetails: {
          paymentIntentId,
        },
        businessInfo: {
          fullName: businessInfo.fullName,
          dob: businessInfo.dob,
          birthTime: businessInfo.birthTime,
          birthPlace: businessInfo.birthPlace,
          details: businessInfo.details,
          preferredSyllables: businessInfo.preferredSyllables,
        },
      };

      // Include credentials for order tracking validation
      orderData.name = userEmail?.split('@')[0] || '';
      orderData.email = userEmail;
      orderData.password = password || '';

      const response = await PaymentService.createOrder(orderData);

      if (!isMountedRef.current) return;

      if (response.statusCode === 401) {
        onUnauthorized();
        return;
      }

      if (response.success) {
        // Track Meta Pixel Purchase event
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Purchase', {
            value: selectedPackage.price?.amount || 0,
            currency: selectedPackage.price?.currency || 'USD',
            content_name: selectedPackage.plan?.name,
            content_category: selectedPackage.path?.name,
          });
        }

        let emailText = '';
        let emailSubject = '';

        if (isAutoCreated) {
          emailSubject = `Your order is confirmed - Galaxy NameLab account created ✨`;
          emailText = `
Your order is confirmed. ✨

We've created your Galaxy NameLab account for you so you can easily track and manage your orders.

Your Login Credentials:
• Email: ${userEmail}
• Temp Password: ${password}

Click here to view your order and download your report when ready:
https://galaxynamelab.com/orders

(We highly recommend changing your password under your profile after logging in.)

Thank you for choosing Stellar Fortune Name! Our senior consultant is now carefully reviewing your astrological data.

Best regards,
The Stellar Fortune Name Team
(Galaxy NameLab, LLC)
          `;
        } else {
          emailSubject = `We've Received Your Naming Request - Stellar Fortune Name`;
          emailText = `
Thank you for choosing **Stellar Fortune Name** for your naming needs. ✨

We have successfully received your information and payment.

Our senior consultant, with **over 28 years of expertise**, is now carefully reviewing your astrological data to find the most auspicious and meaningful names for you.

**WHAT HAPPENS NEXT?**

• **REVIEW PERIOD**
  We will perform detailed calculations based on your provided data.

• **DELIVERY**
  You will receive your personalized Naming Report via email within **3 business days**.
  If we need any further information, we will reach out to you directly.

Thank you for trusting us with this important milestone.

Best regards,

**The Stellar Fortune Name Team**
(Galaxy NameLab, LLC)
          `;
        }

        const emailData = {
          to: userEmail,
          subject: emailSubject,
          text: emailText
        };

        // Send email inside an isolated try-catch. If the email delivery fails (due to connection timeouts or mail server status),
        // we MUST NOT block the successful checkout completion since the order was successfully persisted in the database!
        try {
          const emailResponse = await EmailService.sendEmail(emailData);
          if (emailResponse?.statusCode === 401) {
            onUnauthorized();
            return;
          }
        } catch (emailErr) {
          console.error('Non-blocking confirmation email delivery failure:', emailErr);
        }

        setCheckoutState({
          step: 'complete',
          packageId: selectedPackage._id,
          clientSecret: checkoutState.clientSecret,
          paymentIntentId,
          error: null,
          loading: false,
        });

        // Keep success message on screen for 5 seconds so they can read the login credentials notice
        setTimeout(() => {
          if (isMountedRef.current) {
            onComplete();
            navigate(ROUTES.ORDERS);
          }
        }, 5000);

      } else {
        setCheckoutState({
          step: 'error',
          packageId: selectedPackage._id,
          clientSecret: checkoutState.clientSecret,
          paymentIntentId,
          error: response.error || 'Failed to create order',
          loading: false,
        });
      }
    } catch (err: any) {
      console.error('Fatal order creation or payment handler error:', err);
      if (isMountedRef.current) {
        setCheckoutState({
          step: 'error',
          packageId: selectedPackage._id,
          clientSecret: checkoutState.clientSecret,
          paymentIntentId,
          error: err?.message || 'Payment confirmed but failed to register the order. Please contact support.',
          loading: false,
        });
      }
    }
  };

  const handleBusinessInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessInfo((prev) => ({ ...prev, [name]: value }));
    if (checkoutState.error) {
      setCheckoutState((prev) => ({ ...prev, error: null }));
    }
  };

  const handleSyllableToggle = (syllable: number) => {
    setBusinessInfo((prev) => {
      const exists = prev.preferredSyllables.includes(syllable);
      if (exists) {
        if (prev.preferredSyllables.length <= 2) {
          return prev;
        }
        return {
          ...prev,
          preferredSyllables: prev.preferredSyllables.filter(s => s !== syllable),
        };
      } else {
        return {
          ...prev,
          preferredSyllables: [...prev.preferredSyllables, syllable].sort((a, b) => a - b),
        };
      }
    });
  };

  // --- RENDER STATES ---

  if (checkoutState.loading && checkoutState.step === 'initialize') {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mb-6"></div>
        <p className="text-white text-lg">Initializing secure payment...</p>
      </div>
    );
  }

  if (checkoutState.step === 'complete') {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center max-w-lg mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="mb-6"
        >
          <FiCheckCircle className="text-green-400 text-7xl" />
        </motion.div>
        <h3 className="text-3xl font-extrabold text-white mb-4 font-display">Payment Successful!</h3>
        
        {isAutoCreatedAccount ? (
          <div className="space-y-4 mb-4 bg-primary-900/50 border border-primary-700/50 rounded-2xl p-6 shadow-xl text-left">
            <p className="text-emerald-400 font-bold text-lg font-display flex items-center gap-2">
              <FiCheckCircle />
              <span>Account Automatically Created!</span>
            </p>
            <p className="text-primary-100 text-sm md:text-base leading-relaxed font-body">
              Your order is confirmed! We have auto-created a secure Galaxy NameLab account for you and sent your **temporary login password** to <span className="font-semibold text-white underline">{localStorage.getItem(STORAGE_KEYS.USER_EMAIL)}</span>.
            </p>
            <p className="text-xs text-primary-300 font-body opacity-90 leading-normal border-t border-primary-850 pt-3 mt-3">
              Please check your inbox (including Spam/Junk folder). You are already logged in now! Redirecting you to your orders dashboard in 5 seconds...
            </p>
          </div>
        ) : (
          <p className="text-primary-200 text-base md:text-lg mb-8 font-body leading-relaxed">
            Your order has been created successfully. Redirecting you to your orders dashboard...
          </p>
        )}
      </div>
    );
  }

  if (checkoutState.step === 'error') {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <FiAlertCircle className="text-red-400 text-6xl mb-6" />
        <h3 className="text-2xl font-bold text-white mb-4">Payment Failed</h3>
        <p className="text-red-300 text-center mb-8 font-body">{checkoutState.error}</p>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-primary-700 hover:bg-primary-600 text-white rounded-full font-semibold transition-all cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-semibold transition-all cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handlePaymentSubmit} className="space-y-6 relative text-left">
      {checkoutState.loading && (
        <div className="absolute inset-0 bg-primary-950/20 z-10 rounded-xl cursor-wait" />
      )}

      {checkoutState.error && (
        <div className="p-4 bg-red-900/30 border border-red-800/60 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-red-200 text-sm font-body animate-pulse">
          <div className="flex items-start gap-3">
            <FiAlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
            <span className="leading-relaxed">{checkoutState.error}</span>
          </div>
          {checkoutState.error.includes('already registered') && (
            <button
              type="button"
              onClick={onUnauthorized}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 hover:scale-105 text-white font-bold rounded-lg transition-all text-xs flex-shrink-0 font-display shadow-md cursor-pointer"
            >
              Login Now
            </button>
          )}
        </div>
      )}

      {/* Business Info Section */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white flex items-center gap-2 font-display">
          <FiUser className="text-purple-400" />
          Information Required at Time of Payment
        </h4>

        {/* Contact Email Field */}
        <div>
          <label className="block text-sm font-medium text-primary-300 mb-2 font-body">
            1. Contact Email *
          </label>
          {localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) ? (
            <input
              type="email"
              name="email"
              value={localStorage.getItem(STORAGE_KEYS.USER_EMAIL) || ''}
              disabled
              className="w-full px-4 py-3 bg-primary-800/30 border border-primary-700 rounded-xl text-primary-300 cursor-not-allowed font-body"
            />
          ) : (
            <input
              type="email"
              name="email"
              value={guestEmail}
              onChange={(e) => {
                setGuestEmail(e.target.value);
                if (checkoutState.error) {
                  setCheckoutState(prev => ({ ...prev, error: null }));
                }
              }}
              placeholder="Enter your contact email"
              disabled={checkoutState.loading}
              required
              className="w-full px-4 py-3 bg-primary-800/50 border border-primary-700 rounded-xl text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-body text-sm md:text-base"
            />
          )}
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-primary-300 mb-2 font-body">
            2. Your Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={businessInfo.fullName}
            onChange={handleBusinessInfoChange}
            placeholder="Enter your full name"
            disabled={checkoutState.loading}
            required
            className="w-full px-4 py-3 bg-primary-800/50 border border-primary-700 rounded-xl text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-body text-sm md:text-base"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-primary-300 mb-2 font-body">
            3. Date of Birth (dd/mm/yyyy) *
          </label>
          <input
            type="date"
            name="dob"
            value={businessInfo.dob}
            onChange={handleBusinessInfoChange}
            disabled={checkoutState.loading}
            required
            className="w-full px-4 py-3 bg-primary-800/50 border border-primary-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all [color-scheme:dark] font-body text-sm md:text-base"
          />
        </div>

        {/* Birth Time */}
        <div>
          <label className="block text-sm font-medium text-primary-300 mb-2 font-body">
            4. Birth Time (Hour/Minute) - As accurate as possible *
          </label>
          <input
            type="time"
            name="birthTime"
            value={businessInfo.birthTime}
            onChange={handleBusinessInfoChange}
            disabled={checkoutState.loading}
            required
            className="w-full px-4 py-3 bg-primary-800/50 border border-primary-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all [color-scheme:dark] font-body text-sm md:text-base"
          />
        </div>

        {/* Birth Place */}
        <div>
          <label className="block text-sm font-medium text-primary-300 mb-2 font-body">
            5. Birth Place (Country/City) e.g. New York, USA *
          </label>
          <input
            type="text"
            name="birthPlace"
            value={businessInfo.birthPlace}
            onChange={handleBusinessInfoChange}
            placeholder="e.g. New York, USA"
            disabled={checkoutState.loading}
            required
            className="w-full px-4 py-3 bg-primary-800/50 border border-primary-700 rounded-xl text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-body text-sm md:text-base"
          />
        </div>

        {/* Details */}
        <div>
          <label className="block text-sm font-medium text-primary-300 mb-2 font-body">
            {orderType === 'BUSINESS'
              ? '6. Business Type Name / Company Name (Describe in detail) *'
              : '6. Nickname Usage Area (For Social, Entrepreneurs, Content Creators, Gamers, etc.) *'}
          </label>
          <textarea
            name="details"
            value={businessInfo.details}
            onChange={handleBusinessInfoChange}
            placeholder={orderType === 'BUSINESS'
              ? 'Company (or) Brand Name... (Describe in detail)'
              : 'For Social, Entrepreneurs & Business Owners, Content Creators, Gamers, etc.'}
            disabled={checkoutState.loading}
            required
            rows={3}
            className="w-full px-4 py-3 bg-primary-800/50 border border-primary-700 rounded-xl text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none font-body text-sm md:text-base"
          />
        </div>

        {/* Preferred Syllables */}
        <div>
          <label className="block text-sm font-medium text-primary-300 mb-2 font-body">
            {orderType === 'BUSINESS'
              ? '7. Preferred Name Length (Syllables) - Select at least 2'
              : '7. Preferred Nickname Length (Syllables) - Select at least 2'}
            {orderType === 'PERSONAL' && <span className="text-amber-400 ml-2">(Note: Longer nicknames may reduce success rate)</span>}
          </label>
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5].map((syllable) => (
              <button
                key={syllable}
                type="button"
                onClick={() => handleSyllableToggle(syllable)}
                disabled={checkoutState.loading}
                className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${businessInfo.preferredSyllables.includes(syllable)
                  ? 'bg-purple-600 text-white border-2 border-purple-400'
                  : 'bg-primary-800/50 text-primary-300 border-2 border-primary-700 hover:border-purple-500'
                  } disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm`}
              >
                {syllable}
              </button>
            ))}
          </div>
          {businessInfo.preferredSyllables.length > 0 && (
            <p className="text-xs text-primary-400 mt-2 font-body">
              Selected: {businessInfo.preferredSyllables.sort((a, b) => a - b).join(', ')} syllable(s)
            </p>
          )}
        </div>

        {/* Note */}
        <div className="bg-primary-800/30 border border-primary-700 rounded-xl p-4">
          <p className="text-xs text-primary-300 leading-relaxed font-body">
            <strong className="text-purple-400">Note:</strong> You are not required to submit your own name suggestions at this time. Once we (Galaxy NameLab) provide our initial recommendations, we will also send you the specific "Guiding Letters" to assist with your brainstorming. At that stage, you may submit your chosen names for our review. We will then identify the most auspicious selections — the true gems among your suggestions — and send the final, perfected results back to you.
          </p>
        </div>
      </div>

      {/* Card Payment Section */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white flex items-center gap-2 font-display">
          <FiCreditCard className="text-purple-400" />
          Payment Details
          {!isElementsReady && (
            <span className="ml-2 text-[10px] bg-amber-600/30 text-amber-300 px-2 py-1 rounded-full animate-pulse">
              Loading...
            </span>
          )}
          {isElementsReady && (
            <span className="ml-2 text-[10px] bg-green-600/30 text-green-300 px-2 py-1 rounded-full">
              Ready
            </span>
          )}
        </h4>

        <div className="p-4 bg-primary-800/50 border border-primary-700 rounded-xl">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#ffffff',
                  backgroundColor: '#1f2937',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSmoothing: 'antialiased',
                  '::placeholder': {
                    color: '#9ca3af',
                  },
                  ':-webkit-autofill': {
                    color: '#ffffff',
                  },
                },
                invalid: {
                  color: '#ef4444',
                  iconColor: '#ef4444',
                },
                empty: {
                  color: '#9ca3af',
                },
              },
            }}
            className="stripe-card-element"
          />
        </div>

        <div className="flex items-center gap-2 text-primary-400 text-xs font-body">
          <FiLock className="text-green-400" />
          <span>Secured by Stripe SSL encryption</span>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-purple-900/30 border border-purple-700/50 rounded-xl p-6 space-y-3 font-body">
        <h5 className="text-lg font-bold text-white font-display">Order Summary</h5>
        <div className="flex justify-between text-primary-300 text-sm">
          <span>Package:</span>
          <span className="text-white font-medium">{selectedPackage.plan?.name}</span>
        </div>
        <div className="flex justify-between text-primary-300 text-sm">
          <span>Service:</span>
          <span className="text-white font-medium">{selectedPackage.path?.name}</span>
        </div>
        <div className="border-t border-purple-700/50 pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-white font-display">Total:</span>
            <span className="text-xl md:text-2xl font-black text-amber-400 font-display">
              ${selectedPackage.price?.amount || 0} {selectedPackage.price?.currency || 'USD'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4 font-body">
        <button
          type="button"
          onClick={onCancel}
          disabled={checkoutState.loading}
          className="flex-1 px-6 py-3 bg-primary-700 hover:bg-primary-600 text-white rounded-full font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm md:text-base"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || !isElementsReady || checkoutState.loading}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white rounded-full font-bold shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer text-sm md:text-base"
        >
          {checkoutState.loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              Processing...
            </>
          ) : (
            <>
              <FiLock className="text-lg" />
              Pay ${selectedPackage.price?.amount || 0}
            </>
          )}
        </button>
      </div>
      <p className="text-primary-300 text-xs font-body leading-normal text-center opacity-85">
        After your payment is confirmed, a confirmation email will be sent to you. If you do not see it in your inbox, please check your Spam or Junk folder.
      </p>
    </form>
  );
};

// Main Checkout Modal Component
const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
}) => {
  const [isComplete, setIsComplete] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleComplete = () => {
    setIsComplete(true);
    onClose();
    setTimeout(() => setIsComplete(false), 500);
  };

  return (
    <>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <Elements stripe={stripePromise}>
        <AnimatePresence>
          {isOpen && selectedPackage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={onClose}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.3 }}
                className="relative w-full max-w-2xl bg-gradient-to-br from-primary-900 to-primary-950 rounded-3xl shadow-2xl border border-primary-700 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {isTestMode && (
                  <div className="bg-amber-500/20 border-b border-amber-500/50 px-6 py-3 flex items-center justify-center gap-2">
                    <FiAlertCircle className="text-amber-400" />
                    <span className="text-amber-200 text-sm font-medium font-body">
                      Test Mode - No real charges will be made
                    </span>
                  </div>
                )}

                <div className="sticky top-0 bg-primary-900/90 backdrop-blur-md border-b border-primary-700 px-6 py-5 flex items-center justify-between z-10">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white font-display">Secure Checkout</h2>
                    <p className="text-xs md:text-sm text-primary-300 mt-1 font-body">
                      {selectedPackage?.plan?.name} — {selectedPackage?.path?.name}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-primary-800 rounded-full transition-all text-primary-300 hover:text-white cursor-pointer"
                  >
                    <FiX className="text-2xl" />
                  </button>
                </div>

                <div className="px-6 py-8 max-h-[70vh] overflow-y-auto">
                  <CheckoutForm
                    selectedPackage={selectedPackage}
                    onComplete={handleComplete}
                    onCancel={onClose}
                    onUnauthorized={() => setShowLoginModal(true)}
                  />
                </div>

                <div className="bg-primary-900/50 border-t border-primary-700 px-6 py-4">
                  <div className="flex items-center justify-center gap-6 text-xs md:text-sm text-primary-400 font-body">
                    <div className="flex items-center gap-2">
                      <FiLock className="text-green-400" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCheckCircle className="text-purple-400" />
                      <span>SSL Encrypted</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Elements>
    </>
  );
};

export default CheckoutModal;