import { PaymentService } from '../services/paymentService';
import { EmailService } from '../services/emailService';
import { STORAGE_KEYS } from '../../constants/api';
import { BusinessInfoForm } from '../types/payment';

// Everything needed to create the order and send the confirmation email once
// a Stripe PaymentIntent has succeeded. Saved to localStorage right before
// confirming payment, since wallet methods (e.g. Amazon Pay) can navigate the
// browser away from the SPA entirely before the intent settles.
export interface PendingOrderPayload {
  packageId: string;
  businessInfo: BusinessInfoForm;
  email: string;
  password: string;
  isAutoCreated: boolean;
  pixel: {
    value: number;
    currency: string;
    contentName?: string;
    contentCategory?: string;
  };
}

export const savePendingOrder = (payload: PendingOrderPayload): void => {
  localStorage.setItem(STORAGE_KEYS.PENDING_ORDER, JSON.stringify(payload));
};

export const loadPendingOrder = (): PendingOrderPayload | null => {
  const raw = localStorage.getItem(STORAGE_KEYS.PENDING_ORDER);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PendingOrderPayload;
  } catch {
    return null;
  }
};

export const clearPendingOrder = (): void => {
  localStorage.removeItem(STORAGE_KEYS.PENDING_ORDER);
};

export interface FinalizeOrderResult {
  success: boolean;
  unauthorized?: boolean;
  error?: string;
}

// Creates the order in the backend, fires the Meta Pixel purchase event, and
// sends the confirmation email. Shared by the in-modal (non-redirect) checkout
// path and the /payment-complete redirect-return page so both finish the same way.
export const finalizeOrder = async (
  paymentIntentId: string,
  pending: PendingOrderPayload
): Promise<FinalizeOrderResult> => {
  const orderData: any = {
    packageId: pending.packageId,
    paymentMethod: 'stripe' as const,
    paymentDetails: { paymentIntentId },
    businessInfo: pending.businessInfo,
    name: pending.email?.split('@')[0] || '',
    email: pending.email,
    password: pending.password || '',
  };

  const response = await PaymentService.createOrder(orderData);

  if (response.statusCode === 401) {
    return { success: false, unauthorized: true };
  }

  if (!response.success) {
    return { success: false, error: response.error || 'Failed to create order' };
  }

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', {
      value: pending.pixel?.value || 0,
      currency: pending.pixel?.currency || 'USD',
      content_name: pending.pixel?.contentName,
      content_category: pending.pixel?.contentCategory,
    });
  }

  let emailText = '';
  let emailSubject = '';

  if (pending.isAutoCreated) {
    emailSubject = `Your order is confirmed - Galaxy NameLab account created ✨`;
    emailText = `
Your order is confirmed. ✨

We've created your Galaxy NameLab account for you so you can easily track and manage your orders.

Your Login Credentials:
• Email: ${pending.email}
• Temp Password: ${pending.password}

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

  // Send email inside an isolated try-catch. If delivery fails (connection
  // timeouts, mail server issues) we must NOT fail the checkout since the
  // order was already persisted in the database!
  try {
    const emailResponse = await EmailService.sendEmail({
      to: pending.email,
      subject: emailSubject,
      text: emailText,
    });
    if (emailResponse?.statusCode === 401) {
      return { success: true, unauthorized: true };
    }
  } catch (emailErr) {
    console.error('Non-blocking confirmation email delivery failure:', emailErr);
  }

  clearPendingOrder();
  return { success: true };
};
