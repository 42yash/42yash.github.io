import { quintOut } from 'svelte/easing';
import type { SlideDirection, TransitionParams } from '$lib/types/page-types';

/**
 * Transform values for different slide directions
 */
const slideTransforms: Record<SlideDirection, { enter: string; exit: string }> = {
  up: {
    enter: 'translateY(100vh)',
    exit: 'translateY(-100vh)'
  },
  down: {
    enter: 'translateY(-100vh)',
    exit: 'translateY(100vh)'
  },
  left: {
    enter: 'translateX(100vw)',
    exit: 'translateX(-100vw)'
  },
  right: {
    enter: 'translateX(-100vw)',
    exit: 'translateX(100vw)'
  }
};

/**
 * Custom slide in transition for pages
 * Performance-optimized using CSS transforms as per Svelte 5 best practices
 */
export function slideIn(
  node: Element,
  params: TransitionParams & { direction?: SlideDirection; isReveal?: boolean } = {}
) {
  const {
    duration = 150,
    delay = 0,
    easing = quintOut,
    direction = 'up',
    isReveal = false
  } = params;

  // If this is a reveal transition (main page being revealed), no animation needed
  if (isReveal) {
    return {
      duration: 0,
      css: () => ''
    };
  }

  const transform = slideTransforms[direction].enter;

  return {
    duration,
    delay,
    easing,
    css: (t: number) => {
      const progress = 1 - t;
      return `
        transform: ${transform.replace('100', String(100 * progress))};
        will-change: transform;
      `;
    }
  };
}

/**
 * Custom slide out transition for pages
 */
export function slideOut(
  node: Element,
  params: TransitionParams & { direction?: SlideDirection; isHeroExit?: boolean } = {}
) {
  const {
    duration = 150,
    delay = 0,
    easing = quintOut,
    direction = 'up',
    isHeroExit = false
  } = params;

  // Special case for hero sliding up
  const transform = isHeroExit
    ? 'translateY(-100vh)'
    : slideTransforms[direction].exit;

  return {
    duration,
    delay,
    easing,
    css: (t: number) => {
      const progress = 1 - t;
      return `
        transform: ${transform.replace('100', String(100 * progress))};
        will-change: transform;
      `;
    }
  };
}

/**
 * Cover transition - page slides over another
 */
export function coverIn(
  node: Element,
  params: TransitionParams & { direction?: SlideDirection } = {}
) {
  const {
    duration = 150,
    delay = 0,
    easing = quintOut,
    direction = 'up'
  } = params;

  const transform = slideTransforms[direction].enter;

  return {
    duration,
    delay,
    easing,
    css: (t: number) => {
      const progress = 1 - t;
      return `
        transform: ${transform.replace('100', String(100 * progress))};
        z-index: 200;
        will-change: transform;
      `;
    }
  };
}

/**
 * Uncover transition - page slides away revealing another
 */
export function uncoverOut(
  node: Element,
  params: TransitionParams & { direction?: SlideDirection } = {}
) {
  const {
    duration = 150,
    delay = 0,
    easing = quintOut,
    direction = 'up'
  } = params;

  const transform = slideTransforms[direction].exit;

  return {
    duration,
    delay,
    easing,
    css: (t: number) => {
      const progress = 1 - t;
      return `
        transform: ${transform.replace('100', String(100 * progress))};
        z-index: 201;
        will-change: transform;
      `;
    }
  };
}

/**
 * Fade transition for subtle effects
 */
export function fadeTransition(
  node: Element,
  params: TransitionParams = {}
) {
  const {
    duration = 150,
    delay = 0,
    easing = quintOut
  } = params;

  return {
    duration,
    delay,
    easing,
    css: (t: number) => `
      opacity: ${t};
      will-change: opacity;
    `
  };
}

/**
 * Scale and fade transition for emphasis
 */
export function scaleTransition(
  node: Element,
  params: TransitionParams & { scale?: number } = {}
) {
  const {
    duration = 150,
    delay = 0,
    easing = quintOut,
    scale = 0.95
  } = params;

  return {
    duration,
    delay,
    easing,
    css: (t: number) => `
      transform: scale(${scale + (1 - scale) * t});
      opacity: ${t};
      will-change: transform, opacity;
    `
  };
}