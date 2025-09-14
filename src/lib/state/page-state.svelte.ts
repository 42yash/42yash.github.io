import type { PageName } from '$lib/types/page-types';

/**
 * Page navigation state management using Svelte 5 runes
 * Using module-level state as per Svelte 5 best practices for .svelte.ts files
 */

// Module-level state
let _currentPage = $state<PageName>('hero');
let _previousPage = $state<PageName>('hero');
let _isTransitioning = $state(false);
let _transitionHistory = $state<PageName[]>(['hero']);

// Derived state for special transitions
let isHeroToMain = $derived(_previousPage === 'hero' && _currentPage === 'main');
let isTransitioningToMain = $derived(_currentPage === 'main' && _previousPage !== 'hero');
let isTransitioningFromMain = $derived(_previousPage === 'main' && _currentPage !== 'main');

/**
 * Page state API
 */
class PageState {
  get currentPage(): PageName {
    return _currentPage;
  }

  get previousPage(): PageName {
    return _previousPage;
  }

  get isTransitioning(): boolean {
    return _isTransitioning;
  }

  get transitionHistory(): PageName[] {
    return _transitionHistory;
  }

  /**
   * Navigate to a new page
   */
  navigateTo(page: PageName): void {
    if (_currentPage === page || _isTransitioning) {
      return;
    }

    _isTransitioning = true;
    _previousPage = _currentPage;
    _currentPage = page;

    // Update history
    if (_transitionHistory[_transitionHistory.length - 1] !== page) {
      _transitionHistory = [..._transitionHistory, page];
      // Keep only last 10 transitions
      if (_transitionHistory.length > 10) {
        _transitionHistory = _transitionHistory.slice(-10);
      }
    }

    // Log transition for debugging
    console.log(`Page transition: ${_previousPage} → ${_currentPage}`);

    // Reset transitioning flag after animation completes
    setTimeout(() => {
      _isTransitioning = false;
    }, 150); // Match animation duration
  }

  /**
   * Check if transitioning from hero to main (special case)
   */
  get isHeroToMain(): boolean {
    return isHeroToMain;
  }

  /**
   * Check if transitioning to main from other pages
   */
  get isTransitioningToMain(): boolean {
    return isTransitioningToMain;
  }

  /**
   * Check if transitioning from main to other pages
   */
  get isTransitioningFromMain(): boolean {
    return isTransitioningFromMain;
  }

  /**
   * Reset to initial state
   */
  reset(): void {
    _currentPage = 'hero';
    _previousPage = 'hero';
    _isTransitioning = false;
    _transitionHistory = ['hero'];
  }

  /**
   * Go back to previous page
   */
  goBack(): void {
    if (_transitionHistory.length > 1) {
      const history = [..._transitionHistory];
      history.pop(); // Remove current
      const previous = history[history.length - 1];
      if (previous) {
        this.navigateTo(previous);
      }
    }
  }
}

// Export singleton instance
export const pageState = new PageState();