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
} as const;

export const NAVIGATION = {
  ITEMS: [
    { to: ROUTES.HOME, label: 'Home' },
    { to: ROUTES.INSIGHT, label: 'Insight' },
    { to: ROUTES.PRICING, label: 'pricing' },
    { to: ROUTES.FAQ, label: 'FAQ' },
    { to: ROUTES.ABOUT, label: 'About' },
    { to: ROUTES.ORDERS, label: 'My Orders' },
  ],
  LOGIN_BUTTON: 'Login',
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
} as const;