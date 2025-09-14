export type PageName = 'hero' | 'main' | 'left' | 'right' | 'up' | 'down';

export interface PageConfig {
  title: string;
  color: string;
  textColor?: string;
  zIndex?: number;
}

export interface CameraPosition {
  x: number;
  y: number;
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