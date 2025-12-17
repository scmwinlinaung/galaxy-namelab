/**
 * Form validation and UI text constants
 */

export const VALIDATION = {
  MESSAGES: {
    EMAIL: {
      REQUIRED: 'Email is required',
      INVALID: 'Email is invalid',
    },
    PASSWORD: {
      REQUIRED: 'Password is required',
      MIN_LENGTH: 'Password must be at least 8 characters',
    },
    NAME: {
      REQUIRED: 'Name is required',
    },
    BIRTHDATE: {
      REQUIRED: 'Birthdate is required for cosmic insights',
    },
  },
} as const;

export const FORM_TEXT = {
  PLACEHOLDERS: {
    NAME: 'Your full name',
    EMAIL: 'Email address',
    PASSWORD: 'Password',
    BIRTHDATE: 'Birth date',
  },
  LABELS: {
    REMEMBER_ME: 'Remember me',
    FORGOT_PASSWORD: 'Forgot password?',
    CONTINUE: 'Continue',
    GOOGLE: 'Google',
    FACEBOOK: 'Facebook',
  },
} as const;

export const MODAL_TEXT = {
  WELCOME: {
    LOGIN: 'Welcome Back',
    REGISTER: 'Join the Cosmos',
  },
  SUBTITLE: {
    LOGIN: 'Continue your cosmic naming journey',
    REGISTER: 'Start your journey to discover the perfect name',
  },
  SUBMIT: {
    LOGIN: 'Sign In to Your Cosmic Account',
    REGISTER: 'Create Your Cosmic Account',
  },
  TOGGLE: {
    LOGIN: "Don't have an account?",
    REGISTER: "Already have an account?",
  },
  TOGGLE_ACTION: {
    LOGIN: 'Sign Up',
    REGISTER: 'Sign In',
  },
  FOOTER: {
    LOGIN: 'By signing in, you agree to our cosmic terms and privacy policy.',
    REGISTER: 'Join thousands who have discovered their perfect names through the power of astrology and numerology.',
  },
} as const;