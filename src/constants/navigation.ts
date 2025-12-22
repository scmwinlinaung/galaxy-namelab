/**
 * Navigation and routing constants
 */

export const ROUTES = {
  HOME: '/',
  INSIGHT: '/insight',
  SUCCESS: '/success',
  PRICING: '/pricing',
  CONTACT: '/contact',
  FAQ: '/faq',
} as const;

export const NAVIGATION = {
  ITEMS: [
    { to: ROUTES.HOME, label: 'Home' },
    { to: ROUTES.INSIGHT, label: 'Insight' },
    { to: ROUTES.PRICING, label: 'pricing' },
    { to: ROUTES.FAQ, label: 'FAQ' },
    { to: ROUTES.CONTACT, label: 'Contact' },
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
  [ROUTES.CONTACT]: 'ContactInfoPage',
} as const;