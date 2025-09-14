export type PageName = 'hero' | 'main' | 'left' | 'right' | 'up' | 'down';

export type SlideDirection = 'up' | 'down' | 'left' | 'right';

export interface PageConfig {
  title: string;
  color: string;
  textColor?: string;
  slideDirection?: SlideDirection;
  zIndex?: number;
}

export interface TransitionParams {
  duration?: number;
  delay?: number;
  easing?: (t: number) => number;
}

export interface PageTransition {
  from: PageName;
  to: PageName;
  type: 'slide' | 'reveal' | 'cover';
  direction?: SlideDirection;
}