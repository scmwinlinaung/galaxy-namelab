import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { stripePromise } from '@api/utils/stripeClient';
import { finalizeOrder, loadPendingOrder } from '@api/utils/orderFinalization';
import { ROUTES } from '@constants/navigation';

/**
 * Return URL landing page for Stripe payment methods that redirect the
 * browser away from the app to complete (e.g. Amazon Pay). Card, Apple Pay,
 * Google Pay and Link normally resolve without leaving the checkout modal,
 * but this page is required so any method Stripe decides to redirect still
 * completes the order correctly.
 *
 * Expected URL format: /payment-complete?payment_intent_client_secret=xxx
 */
type PageStatus = 'checking' | 'success' | 'processing' | 'failed' | 'unclear';

const PaymentCompletePage: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<PageStatus>('checking');
  const [message, setMessage] = useState('Confirming your payment...');
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const run = async () => {
      const stripe = await stripePromise;
      const params = new URLSearchParams(window.location.search);
      const clientSecret = params.get('payment_intent_client_secret');

      if (!stripe || !clientSecret) {
        setStatus('failed');
        setMessage('We could not verify your payment. If you were charged, please contact support.');
        return;
      }

      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      if (paymentIntent?.status === 'processing') {
        setStatus('processing');
        setMessage('Your payment is still processing. We will email you as soon as it is confirmed.');
        return;
      }

      if (paymentIntent?.status !== 'succeeded') {
        setStatus('failed');
        setMessage('Your payment was not completed. Please return to pricing and try again.');
        return;
      }

      const pending = loadPendingOrder();
      if (!pending) {
        // No pending order on file for this browser — most likely this page was already
        // completed once before (e.g. the user refreshed or came back later) and the
        // order was already created then, since a successful finalizeOrder() clears it.
        // We can't tell the difference from here without a "does this order exist"
        // endpoint, so don't alarm the user with a hard failure message.
        setStatus('unclear');
        setMessage(
          `Your payment succeeded (ref: ${paymentIntent.id}). If you've already seen a confirmation for this order, no action is needed. Otherwise, please contact support with this reference.`
        );
        return;
      }

      const result = await finalizeOrder(paymentIntent.id, pending);

      if (result.success) {
        setStatus('success');
        setMessage(
          pending.isAutoCreated
            ? `Payment successful! We've created your Galaxy NameLab account and emailed your temporary password to ${pending.email}. Redirecting you to your orders dashboard...`
            : 'Payment successful! Redirecting you to your orders dashboard...'
        );
        setTimeout(() => navigate(ROUTES.ORDERS, { replace: true }), 4000);
      } else if (result.unauthorized) {
        setStatus('failed');
        setMessage('Payment succeeded, but your session expired. Please log in, then check your Orders page.');
      } else {
        setStatus('failed');
        setMessage(result.error || 'Payment succeeded but we could not register your order. Please contact support.');
      }
    };

    run();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-950 px-4">
      <div className="max-w-md text-center">
        {status === 'checking' && (
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-6"></div>
        )}
        {status === 'success' && <FiCheckCircle className="text-green-400 text-6xl mx-auto mb-6" />}
        {(status === 'failed' || status === 'processing' || status === 'unclear') && (
          <FiAlertCircle className="text-amber-400 text-6xl mx-auto mb-6" />
        )}
        <p className="text-white text-lg font-body">{message}</p>

        {(status === 'failed' || status === 'unclear') && (
          <button
            type="button"
            onClick={() => navigate(ROUTES.ORDERS)}
            className="mt-8 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-semibold transition-all cursor-pointer"
          >
            Check My Orders
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentCompletePage;
