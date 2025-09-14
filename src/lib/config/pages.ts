import type { PageConfig, PageName } from '$lib/types/page-types';

/**
 * Matte color palette for sophisticated animations
 * Using lighter, desaturated colors for a modern look
 */
export const pageConfigs: Record<PageName, PageConfig> = {
  hero: {
    title: 'HERO',
    color: '#6B7280',     // Matte gray
    textColor: '#F9FAFB', // Off-white
    zIndex: 100
  },
  main: {
    title: 'MAIN',
    color: '#E5E7EB',     // Light matte gray
    textColor: '#374151', // Dark gray
    zIndex: 50
  },
  left: {
    title: 'LEFT',
    color: '#FCA5A5',     // Matte coral
    textColor: '#7F1D1D', // Deep red
    zIndex: 200
  },
  right: {
    title: 'RIGHT',
    color: '#A7F3D0',     // Matte mint
    textColor: '#064E3B', // Deep green
    zIndex: 200
  },
  up: {
    title: 'UP',
    color: '#BFDBFE',     // Matte sky
    textColor: '#1E3A8A', // Deep blue
    zIndex: 200
  },
  down: {
    title: 'DOWN',
    color: '#DDD6FE',     // Matte lavender
    textColor: '#4C1D95', // Deep purple
    zIndex: 200
  }
} as const;

/**
 * Page navigation labels for UI
 */
export const pageLabels: Record<PageName, string> = {
  hero: 'Welcome',
  main: 'Home',
  left: 'Projects',
  right: 'Resume',
  up: 'Coming Soon',
  down: 'AI Chat'
} as const;

/**
 * Animation timing configuration
 */
export const animationConfig = {
  duration: 300, // Smoother, less jarring transitions
  easing: 'quintOut' as const
} as const;

/**
 * Get all available page names
 */
export const allPageNames = Object.keys(pageConfigs) as PageName[];