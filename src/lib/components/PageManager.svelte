<script lang="ts">
  import PageTemplate from './PageTemplate.svelte';
  import { pageState } from '$lib/state/page-state.svelte';
  import { pageConfigs, pageLabels, allPageNames } from '$lib/config/pages';
  import { slideIn, slideOut } from '$lib/transitions/page-transitions';
  import type { PageName } from '$lib/types/page-types';

  // Reactive state from the page state manager
  let currentPage = $derived(pageState.currentPage);
  let previousPage = $derived(pageState.previousPage);
  let isHeroToMain = $derived(pageState.isHeroToMain);
  let isTransitioningToMain = $derived(pageState.isTransitioningToMain);
  let isTransitioningFromMain = $derived(pageState.isTransitioningFromMain);

  // Current page configuration
  let currentConfig = $derived(pageConfigs[currentPage]);
  let previousConfig = $derived(pageConfigs[previousPage]);

  // Determine if main should be visible as background
  let showMainBackground = $derived(
    currentPage === 'main' ||
    isTransitioningToMain ||
    isTransitioningFromMain
  );

  // Custom transition in function
  function customSlideIn(node: Element) {
    // Main page being revealed - no transition
    if (currentPage === 'main') {
      return { duration: 0 };
    }

    // Other pages sliding in
    return slideIn(node, {
      direction: currentConfig.slideDirection || 'up',
      duration: 150
    });
  }

  // Custom transition out function
  function customSlideOut(node: Element) {
    // Hero sliding up to reveal main
    if (isHeroToMain) {
      return slideOut(node, {
        direction: 'up',
        isHeroExit: true,
        duration: 150
      });
    }

    // Main staying in place - no transition
    if (previousPage === 'main') {
      return { duration: 0 };
    }

    // Other pages sliding out
    return slideOut(node, {
      direction: previousConfig.slideDirection || 'up',
      duration: 150
    });
  }

  // Handle navigation
  function handleNavigate(page: PageName) {
    pageState.navigateTo(page);
  }

  // Keyboard navigation
  function handleKeydown(event: KeyboardEvent) {
    const keyMap: Record<string, PageName> = {
      'ArrowLeft': 'left',
      'ArrowRight': 'right',
      'ArrowUp': 'up',
      'ArrowDown': 'down',
      'Escape': 'main',
      'h': 'hero',
      'm': 'main'
    };

    const targetPage = keyMap[event.key];
    if (targetPage) {
      event.preventDefault();
      handleNavigate(targetPage);
    }
  }

  // Add keyboard listener
  $effect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<div class="page-container">
  <!-- Main page as persistent background when needed -->
  {#if showMainBackground && currentPage !== 'main'}
    <div class="page-layer" style:z-index={pageConfigs.main.zIndex}>
      <PageTemplate
        title={pageConfigs.main.title}
        color={pageConfigs.main.color}
        textColor={pageConfigs.main.textColor}
      />
    </div>
  {/if}

  <!-- Animated page content -->
  <div class="page-content">
    {#key currentPage}
      <div
        class="page-layer"
        style:z-index={currentConfig.zIndex}
        in:customSlideIn
        out:customSlideOut
      >
        <PageTemplate
          title={currentConfig.title}
          color={currentConfig.color}
          textColor={currentConfig.textColor}
        />
      </div>
    {/key}
  </div>

  <!-- Navigation controls -->
  <nav class="nav-controls">
    {#each allPageNames as page}
      <button
        class="nav-btn"
        class:active={currentPage === page}
        onclick={() => handleNavigate(page)}
        aria-label="Navigate to {pageLabels[page]} page"
      >
        {pageLabels[page]}
      </button>
    {/each}
  </nav>

  <!-- Keyboard hints -->
  <div class="keyboard-hints">
    <span class="hint">Use arrow keys or click buttons to navigate</span>
    <span class="hint">ESC → Main | H → Hero</span>
  </div>

  <!-- Debug info (remove in production) -->
  {#if import.meta.env.DEV}
    <div class="debug-info">
      <span>Current: {currentPage}</span>
      <span>Previous: {previousPage}</span>
      <span>Transitioning: {pageState.isTransitioning}</span>
    </div>
  {/if}
</div>

<style>
  .page-container {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background: #111;
  }

  .page-content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .page-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .nav-controls {
    position: fixed;
    top: 20px;
    left: 20px;
    display: flex;
    gap: 6px;
    z-index: 1000;
  }

  .nav-btn {
    padding: 8px 14px;
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .nav-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .nav-btn:active {
    transform: translateY(0);
  }

  .nav-btn.active {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.4);
    color: white;
  }

  .keyboard-hints {
    position: fixed;
    bottom: 20px;
    left: 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    z-index: 1000;
  }

  .hint {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
    background: rgba(0, 0, 0, 0.3);
    padding: 4px 8px;
    border-radius: 4px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .debug-info {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.4);
    font-family: monospace;
    z-index: 1000;
  }

  @media (max-width: 768px) {
    .nav-controls {
      flex-wrap: wrap;
      max-width: 200px;
    }

    .nav-btn {
      padding: 6px 10px;
      font-size: 11px;
    }

    .keyboard-hints {
      display: none;
    }
  }
</style>