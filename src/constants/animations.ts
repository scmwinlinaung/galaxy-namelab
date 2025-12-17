/**
 * Animation constants and variants
 */

// First define durations separately
export const ANIMATION_DURATIONS = {
  FAST: 0.3,
  NORMAL: 0.8,
  SLOW: 20,
} as const;

// Then define variants using the durations
export const ANIMATION_VARIANTS = {
  FADE_UP: {
    HIDDEN: { opacity: 0, y: 20 },
    VISIBLE: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: ANIMATION_DURATIONS.NORMAL, delay, ease: "easeOut" as const },
    }),
  },
  SLIDE: {
    INITIAL: { opacity: 0, y: -20 },
    ANIMATE: { opacity: 1, y: 0 },
    EXIT: { opacity: 0, y: -20 },
    TRANSITION: { duration: ANIMATION_DURATIONS.FAST },
  },
} as const;

// Then combine them for backward compatibility
export const ANIMATION = {
  DURATIONS: ANIMATION_DURATIONS,
  VARIANTS: ANIMATION_VARIANTS,
} as const;