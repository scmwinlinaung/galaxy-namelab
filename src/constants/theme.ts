/**
 * Color and theme constants
 */

export const COLORS = {
  PRIMARY: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065',
  },
  BACKGROUND: {
    DARK: '#160f29',
    STAR: '#1c1232',
    LIGHT: '#ffffff',
  },
  TEXT: {
    BASE: '#ffffff',
    MUTED: '#d1c4e9',
    DARK: '#160f29',
  },
  BORDER: {
    PRIMARY_600: '#7c3aed',
    PRIMARY_800: '#5b21b6',
  },
} as const;

export const SPACING = {
  PY_DEFAULT: 'py-20',
  PX_DEFAULT: 'px-4 md:px-8',
  SECTION_PADDING: 'py-20 px-4 md:px-8',
} as const;