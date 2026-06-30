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
  PORTFOLIOS: '/portfolios',
  SUCCESS_STORIES: '/success-stories',
  GOOGLE_CALLBACK: '/auth/google/callback',
  FACEBOOK_CALLBACK: '/auth/facebook/callback'
} as const;

export const NAVIGATION = {
  ITEMS: [
    { to: ROUTES.HOME, label: 'Home' },
    { to: ROUTES.INSIGHT, label: 'Insight' },
    { to: ROUTES.PORTFOLIOS, label: 'Portfolios' },
    { to: ROUTES.SUCCESS_STORIES, label: 'Success Stories' },
    { to: ROUTES.PRICING, label: 'Pricing' },
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
  [ROUTES.PORTFOLIOS]: 'PortfoliosPage',
  [ROUTES.SUCCESS_STORIES]: 'SuccessStoriesPage',
} as const;