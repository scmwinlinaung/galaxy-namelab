import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiLock, FiCreditCard, FiCheckCircle, FiAlertCircle, FiUser } from 'react-icons/fi';
import { Elements, PaymentElement, LinkAuthenticationElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentService } from '@api/services/paymentService';
import { Package } from '@api/types/pricing';
import { BusinessInfoForm, CheckoutState, OrderType } from '@api/types/payment';
import LoginModal from '@components/auth/LoginModal';
import { STORAGE_KEYS } from '@constants/api';
import { AuthService } from '@api/index';
import { finalizeOrder, savePendingOrder, PendingOrderPayload } from '@api/utils/orderFinalization';
import { stripePromise, isStripeTestMode } from '@api/utils/stripeClient';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/navigation';

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

// Payment Fields Component — rendered inside <Elements>, once the PaymentIntent
// (and its clientSecret) already exists. Holds the actual form + PaymentElement,
// which renders Card, Apple Pay, Google Pay, Link and Amazon Pay based on what's
// eligible for the amount/currency/device/browser.
const CheckoutFormFields: React.FC<{
  selectedPackage: Package;
  paymentIntentId: string | null;
  onComplete: () => void;
  onCancel: () => void;
  onUnauthorized: () => void;
}> = ({ selectedPackage, paymentIntentId, onComplete, onCancel, onUnauthorized }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [guestEmail, setGuestEmail] = useState('');
  const [isAutoCreatedAccount, setIsAutoCreatedAccount] = useState(false);
  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    step: 'payment',
    packageId: selectedPackage._id,
    clientSecret: null,
    paymentIntentId,
    error: null,
    loading: false,
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
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Create the order in the backend, send the confirmation email, and navigate away.
  // Shared logic lives in finalizeOrder() since the redirect-return page
  // (/payment-complete) needs to do the exact same thing for wallet methods
  // like Amazon Pay that leave the SPA before the intent settles.
  const finishOrder = async (confirmedPaymentIntentId: string, pendingOrder: PendingOrderPayload) => {
    try {
      const result = await finalizeOrder(confirmedPaymentIntentId, pendingOrder);

      if (!isMountedRef.current) return;

      if (result.unauthorized) {
        onUnauthorized();
        return;
      }

      if (result.success) {
        setCheckoutState({
          step: 'complete',
          packageId: selectedPackage._id,
          clientSecret: null,
          paymentIntentId: confirmedPaymentIntentId,
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
          clientSecret: null,
          paymentIntentId: confirmedPaymentIntentId,
          error: result.error || 'Failed to create order',
          loading: false,
        });
      }
    } catch (err: any) {
      console.error('Fatal order creation error:', err);
      if (isMountedRef.current) {
        setCheckoutState({
          step: 'error',
          packageId: selectedPackage._id,
          clientSecret: null,
          paymentIntentId: confirmedPaymentIntentId,
          error: err?.message || 'Payment confirmed but failed to register the order. Please contact support.',
          loading: false,
        });
      }
    }
  };

  // Confirm Payment with Stripe (with Pre-Payment account validation)
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setCheckoutState((prev) => ({
        ...prev,
        error: 'Payment system not ready. Please try again.',
      }));
      return;
    }

    // LinkAuthenticationElement lives in a Stripe iframe, so the form's native
    // `required` validation can't reach it — check the guest email explicitly.
    if (!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) && !guestEmail.trim()) {
      setCheckoutState((prev) => ({
        ...prev,
        error: 'Please enter your contact email.',
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

      // Ensure account is registered and logged in BEFORE capturing payment details!
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
              ? 'This email address is already registered in our system. Please click the "Login" button to sign in first, then proceed with your checkout!'
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

      // Persist what's needed to finish the order in case this payment method
      // redirects the browser away before returning (e.g. Amazon Pay via /payment-complete).
      const pendingOrder: PendingOrderPayload = {
        packageId: selectedPackage._id,
        businessInfo,
        email: userEmail,
        password: password || '',
        isAutoCreated,
        pixel: {
          value: selectedPackage.price?.amount || 0,
          currency: selectedPackage.price?.currency || 'USD',
          contentName: selectedPackage.plan?.name,
          contentCategory: selectedPackage.path?.name,
        },
      };
      savePendingOrder(pendingOrder);

      // Account verified or newly auto-registered. Proceed with secure payment confirmation!
      // redirect: 'if_required' keeps the user on this page for methods that don't need
      // one (Card, Link, Apple Pay, Google Pay); wallets that do (e.g. Amazon Pay) will
      // navigate to return_url, which is handled by PaymentCompletePage.
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}${ROUTES.PAYMENT_COMPLETE}`,
          payment_method_data: {
            billing_details: {
              name: businessInfo.fullName || 'Customer',
              email: effectiveEmail,
            },
          },
        },
        redirect: 'if_required',
      });

      if (!isMountedRef.current) return;

      if (error) {
        setCheckoutState((prev) => ({
          ...prev,
          error: getStripeErrorMessage(error),
          loading: false,
        }));
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        await finishOrder(paymentIntent.id, pendingOrder);
      } else if (paymentIntent) {
        // Resolved without a redirect but not yet settled (e.g. still 'processing').
        // Don't leave the user staring at an indefinite spinner.
        setCheckoutState((prev) => ({
          ...prev,
          loading: false,
          error: 'Your payment is still being processed. Please wait a moment and check your email — we will confirm your order as soon as it settles.',
        }));
      }
      // Otherwise (no error, no paymentIntent) the browser is mid-redirect to a
      // wallet's approval flow (e.g. Amazon Pay); nothing more to do here.
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
            // LinkAuthenticationElement (instead of a plain input) so Stripe can recognize
            // the email and offer Link as a payment method in the PaymentElement below.
            <div className="px-4 py-3 bg-primary-800/50 border border-primary-700 rounded-xl focus-within:ring-2 focus-within:ring-purple-500">
              <LinkAuthenticationElement
                options={{ defaultValues: { email: guestEmail } }}
                onChange={(e) => {
                  setGuestEmail(e.value.email);
                  if (checkoutState.error) {
                    setCheckoutState(prev => ({ ...prev, error: null }));
                  }
                }}
              />
            </div>
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

      {/* Payment Section — PaymentElement self-renders Card, Apple Pay, Google Pay, Link
          and Amazon Pay tabs/buttons based on what's eligible for this device/browser/amount */}
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
          <PaymentElement
            options={{ layout: 'tabs' }}
            onReady={() => setIsElementsReady(true)}
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

      <p className="text-primary-300 text-xs font-body leading-normal text-center opacity-85">
        After your payment is confirmed, a confirmation email will be sent to you. If you do not see it in your inbox, please check your Spam or Junk folder.
      </p>
    </form>
  );
};

// Outer Checkout Form Component — creates the PaymentIntent first, then mounts
// Stripe <Elements> with its clientSecret (required up front so PaymentElement
// knows which payment methods, Card/Apple Pay/Google Pay/Link/Amazon Pay, to offer).
const CheckoutForm: React.FC<{
  selectedPackage: Package;
  onComplete: () => void;
  onCancel: () => void;
  onUnauthorized: () => void;
}> = ({ selectedPackage, onComplete, onCancel, onUnauthorized }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [initError, setInitError] = useState<string | null>(null);
  const isInitializingRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    if (isInitializingRef.current) return;

    const initializePayment = async () => {
      if (!selectedPackage._id) return;

      isInitializingRef.current = true;
      if (isMounted) setInitError(null);

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
          if (isMounted) {
            setClientSecret(response.data.clientSecret);
            setPaymentIntentId(response.data.paymentIntentId);
          }
        } else if (isMounted) {
          setInitError(response.error || 'Failed to initialize payment');
        }
      } catch (error) {
        if (isMounted) {
          setInitError('Failed to connect to payment server');
        }
      }
    };

    initializePayment();

    return () => {
      isInitializingRef.current = false;
      isMounted = false;
    };
  }, [selectedPackage._id]);

  if (initError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <FiAlertCircle className="text-red-400 text-6xl mb-6" />
        <h3 className="text-2xl font-bold text-white mb-4">Payment Failed</h3>
        <p className="text-red-300 text-center mb-8 font-body">{initError}</p>
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

  if (!clientSecret) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mb-6"></div>
        <p className="text-white text-lg">Initializing secure payment...</p>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'night',
          variables: {
            colorPrimary: '#a855f7',
            colorBackground: '#1f2937',
            colorText: '#ffffff',
            colorDanger: '#ef4444',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            borderRadius: '12px',
          },
        },
      }}
    >
      <CheckoutFormFields
        selectedPackage={selectedPackage}
        paymentIntentId={paymentIntentId}
        onComplete={onComplete}
        onCancel={onCancel}
        onUnauthorized={onUnauthorized}
      />
    </Elements>
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
              {isStripeTestMode && (
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
    </>
  );
};

export default CheckoutModal;
