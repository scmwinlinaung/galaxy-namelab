/**
 * Navigation and routing constants
 */

export const ROUTES = {
  HOME: '/',
  INSIGHT: '/insight',
  SUCCESS: '/success',
  PRICING: '/pricing',
  ABOUT: '/about',
  FAQ: '/faq',
  ORDERS: '/orders',
  CHECK_YOUR_NAME: '/check-your-name',
  GOOGLE_CALLBACK: '/auth/google/callback',
  FACEBOOK_CALLBACK: '/auth/facebook/callback'
} as const;

export const NAVIGATION = {
  ITEMS: [
    { to: ROUTES.HOME, label: 'Home' },
    { to: ROUTES.INSIGHT, label: 'Insight' },
    { to: ROUTES.CHECK_YOUR_NAME, label: 'Check Your Name' },
    { to: ROUTES.PRICING, label: 'Pring' },
    { to: ROUTES.FAQ, label: 'FAQ' },
    { to: ROUTES.ABOUT, label: 'About' },
    { to: ROUTES.ORDERS, label: 'My Orders' },
  ],
  LOGIN_BUTTON: 'Login',
  LOGOUT_BUTTON: 'Logout',
  MENU_TOGGLE_ARIA_LABEL: 'Toggle menu',
} as const;

export const ROUTE_COMPONENTS = {
  [ROUTES.HOME]: 'HomePage',
  [ROUTES.INSIGHT]: 'InsightPage',
  [ROUTES.SUCCESS]: 'SuccessPage',
  [ROUTES.PRICING]: 'PricingPage',
  [ROUTES.FAQ]: 'FAQPage',
  [ROUTES.ABOUT]: 'ContactInfoPage',
  [ROUTES.ORDERS]: 'OrdersPage',
  [ROUTES.CHECK_YOUR_NAME]: 'CheckYourNamePage',
} as const;