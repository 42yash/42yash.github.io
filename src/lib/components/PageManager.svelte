<script lang="ts">
  import { onMount } from 'svelte';
  import { pageState } from '$lib/state/page-state.svelte';
  import { themeState } from '$lib/state/theme-state.svelte';
  import { pageConfigs, pageLabels, allPageNames } from '$lib/config/pages';
  import type { PageName, CameraPosition } from '$lib/types/page-types';

  // Import page components
  import HeroPage from './pages/HeroPage.svelte';
  import MainPage from './pages/MainPage.svelte';
  import ProjectsPage from './pages/ProjectsPage.svelte';
  import ResumePage from './pages/ResumePage.svelte';
  import AIChatPage from './pages/AIChatPage.svelte';
  import ComingSoonPage from './pages/ComingSoonPage.svelte';

  // Reactive state from the page state manager
  let currentPage = $derived(pageState.currentPage);
  let heroWasDismissed = $derived(pageState.heroWasDismissed);

  // Camera position for seamless navigation
  let cameraX = $state(0);
  let cameraY = $state(0);

  // Update camera position based on current page
  $effect(() => {
    if (currentPage === 'hero') {
      // Hero page is separate from the plus world
      cameraX = 0;
      cameraY = 0;
    } else {
      // Position camera to show the current page
      const positions: Record<Exclude<PageName, 'hero'>, CameraPosition> = {
        'main': { x: 0, y: 0 },
        'left': { x: 100, y: 0 },   // Move camera right to show left page
        'right': { x: -100, y: 0 },  // Move camera left to show right page
        'up': { x: 0, y: 100 },      // Move camera down to show up page
        'down': { x: 0, y: -100 }    // Move camera up to show down page
      };

      const pos = positions[currentPage as Exclude<PageName, 'hero'>] || { x: 0, y: 0 };
      cameraX = pos.x;
      cameraY = pos.y;
    }
  });

  // Initialize page and theme state on mount
  onMount(() => {
    pageState.initialize();
    themeState.initialize();
  });

  // Handle navigation
  function handleNavigate(page: PageName) {
    pageState.navigateTo(page);
  }

  // Handle hero dismissal
  function handleHeroDismiss() {
    pageState.dismissHero();
  }

  // Keyboard navigation with smart main page return
  function handleKeydown(event: KeyboardEvent) {
    // Don't handle navigation keys when hero is active
    if (currentPage === 'hero') {
      return;
    }

    // Smart navigation that returns to main when pressing opposite arrow
    let targetPage: PageName | undefined;

    if (event.key === 'Escape') {
      targetPage = 'main';
    } else if (event.key === 'ArrowLeft') {
      targetPage = currentPage === 'right' ? 'main' : 'left';
    } else if (event.key === 'ArrowRight') {
      targetPage = currentPage === 'left' ? 'main' : 'right';
    } else if (event.key === 'ArrowUp') {
      targetPage = currentPage === 'down' ? 'main' : 'up';
    } else if (event.key === 'ArrowDown') {
      targetPage = currentPage === 'up' ? 'main' : 'down';
    }

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

  // No need for complex hero exit state - it's handled by heroWasDismissed
</script>

<div class="page-container" role="application" aria-label="Portfolio navigation interface">
  <!-- Hero page (separate from the plus world) -->
  {#if currentPage === 'hero'}
    <div
      class="hero-layer"
      class:hero-exit={heroWasDismissed}
    >
      <HeroPage onDismiss={handleHeroDismiss} />
    </div>
  {/if}

  <!-- Plus-shaped world container -->
  {#if currentPage !== 'hero'}
    <div
      class="world-container"
      style="transform: translate({cameraX}vw, {cameraY}vh)"
    >
      <!-- Main page at center -->
      <div class="page-fixed page-main" role="region" aria-label="Main navigation hub">
        <MainPage onNavigate={handleNavigate} />
      </div>

      <!-- Left page -->
      <div class="page-fixed page-left" role="region" aria-label="Projects section">
        <ProjectsPage />
      </div>

      <!-- Right page -->
      <div class="page-fixed page-right" role="region" aria-label="Resume section">
        <ResumePage />
      </div>

      <!-- Up page -->
      <div class="page-fixed page-up" role="region" aria-label="Coming soon section">
        <ComingSoonPage />
      </div>

      <!-- Down page -->
      <div class="page-fixed page-down" role="region" aria-label="AI Chat section">
        <AIChatPage />
      </div>
    </div>
  {/if}

  <!-- Navigation controls (hidden when hero is active) -->
  {#if currentPage !== 'hero'}
    <nav class="nav-controls">
      {#each allPageNames.filter(p => p !== 'hero') as page}
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
  {/if}

  <!-- Debug info (remove in production) -->
  {#if import.meta.env.DEV}
    <div class="debug-info">
      <span>Current: {currentPage}</span>
      <span>Camera: ({cameraX}, {cameraY})</span>
      <span>Hero Dismissed: {heroWasDismissed}</span>
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

  /* Hero page layer */
  .hero-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 500;
    transition: transform 300ms ease-out;
  }

  .hero-layer.hero-exit {
    transform: translateY(-100vh);
  }

  /* World container that moves like a camera */
  .world-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }

  /* Fixed positioned pages in the plus layout */
  .page-fixed {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }

  /* Main page at center (0, 0) */
  .page-main {
    transform: translate(0, 0);
  }

  /* Left page */
  .page-left {
    transform: translateX(-100vw);
  }

  /* Right page */
  .page-right {
    transform: translateX(100vw);
  }

  /* Up page */
  .page-up {
    transform: translateY(-100vh);
  }

  /* Down page */
  .page-down {
    transform: translateY(100vh);
  }

  /* Navigation controls */
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
  }
</style>