import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key from environment variable.
// Shared by CheckoutModal (in-page confirmation) and PaymentCompletePage
// (the return_url landing page for wallet methods that redirect, e.g. Amazon Pay)
// so both use the same Stripe.js instance/config.
const stripeKey = (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) || "pk_live_51Sk10FFDgAPvX2A59J3M1cJaM4a1rij1ntQRNEkOvgkH5Vz08xyOJV7nw2tr780YFqYfusonrVdBMvw0edDS0ME700VyWrYVU1";

export const stripePromise = loadStripe(stripeKey);
export const isStripeTestMode = stripeKey?.startsWith('pk_test_');
