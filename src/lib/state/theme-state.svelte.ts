import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

// Module-level state
let _theme = $state<Theme>('light');

class ThemeState {
  get theme(): Theme {
    return _theme;
  }

  get isDark(): boolean {
    return _theme === 'dark';
  }

  toggle(): void {
    _theme = _theme === 'light' ? 'dark' : 'light';
    this.applyTheme();
  }

  setTheme(theme: Theme): void {
    _theme = theme;
    this.applyTheme();
  }

  private applyTheme(): void {
    if (browser) {
      document.documentElement.setAttribute('data-theme', _theme);
      localStorage.setItem('theme', _theme);
    }
  }

  initialize(): void {
    if (browser) {
      // Check localStorage or system preference
      const stored = localStorage.getItem('theme') as Theme;
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      _theme = stored || (systemPrefersDark ? 'dark' : 'light');
      this.applyTheme();
    }
  }
}

export const themeState = new ThemeState();