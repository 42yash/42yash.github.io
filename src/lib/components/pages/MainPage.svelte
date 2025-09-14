<script lang="ts">
  import type { PageName } from '$lib/types/page-types';
  import { themeState } from '$lib/state/theme-state.svelte';

  interface Props {
    onNavigate: (page: PageName) => void;
  }

  let { onNavigate }: Props = $props();

  let isDark = $derived(themeState.isDark);

  function toggleTheme() {
    themeState.toggle();
  }

  const sections = [
    {
      page: 'up' as PageName,
      title: 'Coming Soon',
      subtitle: 'New features ahead',
      color: isDark ? '#1E40AF' : '#DBEAFE',  // Blue
      hoverColor: isDark ? '#2563EB' : '#BFDBFE',
      position: 'top'  // Top triangle
    },
    {
      page: 'right' as PageName,
      title: 'Resume',
      subtitle: 'Professional experience',
      color: isDark ? '#7C3AED' : '#EDE9FE',  // Purple
      hoverColor: isDark ? '#8B5CF6' : '#DDD6FE',
      position: 'right'  // Right triangle
    },
    {
      page: 'down' as PageName,
      title: 'AI Chat',
      subtitle: 'Let\'s talk',
      color: isDark ? '#9333EA' : '#F3E8FF',  // Violet
      hoverColor: isDark ? '#A855F7' : '#E9D5FF',
      position: 'bottom'  // Bottom triangle
    },
    {
      page: 'left' as PageName,
      title: 'Projects',
      subtitle: 'View my work',
      color: isDark ? '#059669' : '#D1FAE5',  // Green
      hoverColor: isDark ? '#10B981' : '#A7F3D0',
      position: 'left'  // Left triangle
    }
  ];

  let hoveredSection = $state<string | null>(null);
</script>

<div class="main-page">
  <div class="diagonal-container">
    {#each sections as section}
      <button
        class="diagonal-section {section.position}"
        class:hovered={hoveredSection === section.position}
        style:--section-color={section.color}
        style:--hover-color={section.hoverColor}
        onmouseenter={() => hoveredSection = section.position}
        onmouseleave={() => hoveredSection = null}
        onclick={() => onNavigate(section.page)}
        aria-label="Navigate to {section.title}"
        role="button"
        tabindex="0"
      >
        <div class="section-content">
          <h2>{section.title}</h2>
          <p>{section.subtitle}</p>
        </div>
      </button>
    {/each}

    <div class="center-logo">
      <button
        class="theme-toggle"
        onclick={toggleTheme}
        aria-label="Toggle theme"
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {#if isDark}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        {:else}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        {/if}
      </button>
    </div>
  </div>

  <div class="navigation-hint" aria-live="polite">
    <p>Use arrow keys or click sections to navigate</p>
    <p class="esc-hint">Press <kbd>ESC</kbd> to return here</p>
  </div>
</div>

<style>
  .main-page {
    width: 100%;
    height: 100%;
    position: relative;
    background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
    overflow: hidden;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global([data-theme="dark"]) .main-page {
    background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  }

  .diagonal-container {
    width: calc(100% - 1rem);
    height: calc(100% - 1rem);
    max-width: 1600px;
    max-height: 1000px;
    position: relative;
    background: white;
    border-radius: 24px;
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.02),
      0 8px 16px rgba(0, 0, 0, 0.04),
      0 16px 32px rgba(0, 0, 0, 0.06),
      inset 0 -2px 4px rgba(0, 0, 0, 0.02);
  }

  :global([data-theme="dark"]) .diagonal-container {
    background: #1F2937;
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.1),
      0 8px 16px rgba(0, 0, 0, 0.2),
      0 16px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  .diagonal-section {
    position: absolute;
    border: none;
    background: var(--section-color);
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    padding: 0;
    box-shadow:
      inset 0 2px 4px rgba(255, 255, 255, 0.25),
      inset 0 -2px 4px rgba(0, 0, 0, 0.1);
  }

  :global([data-theme="dark"]) .diagonal-section {
    box-shadow:
      inset 0 1px 2px rgba(255, 255, 255, 0.1),
      inset 0 -1px 2px rgba(0, 0, 0, 0.3);
  }

  .diagonal-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .diagonal-section:hover::before {
    opacity: 1;
  }

  /* Top triangle (Coming Soon) - top part of diagonal cross */
  .diagonal-section.top {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip-path: polygon(0 0, 100% 0, 50% 50%);
  }

  /* Right triangle (Resume) - right part of diagonal cross */
  .diagonal-section.right {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip-path: polygon(100% 0, 100% 100%, 50% 50%);
  }

  /* Bottom triangle (AI Chat) - bottom part of diagonal cross */
  .diagonal-section.bottom {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip-path: polygon(0 100%, 100% 100%, 50% 50%);
  }

  /* Left triangle (Projects) - left part of diagonal cross */
  .diagonal-section.left {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip-path: polygon(0 0, 50% 50%, 0 100%);
  }

  .diagonal-section:hover {
    background: var(--hover-color);
    z-index: 5;
  }

  .diagonal-section.hovered {
    transform: scale(1.02);
  }

  .section-content {
    position: absolute;
    color: rgba(0, 0, 0, 0.8);
    text-align: center;
    transition: transform 0.3s ease;
  }

  /* Position content in center of each triangle */
  .top .section-content {
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .right .section-content {
    top: 50%;
    right: 25%;
    transform: translate(50%, -50%);
  }

  .bottom .section-content {
    bottom: 25%;
    left: 50%;
    transform: translate(-50%, 50%);
  }

  .left .section-content {
    top: 50%;
    left: 25%;
    transform: translate(-50%, -50%);
  }

  .top:hover .section-content {
    transform: translate(-50%, -50%) scale(1.1);
  }

  .right:hover .section-content {
    transform: translate(50%, -50%) scale(1.1);
  }

  .bottom:hover .section-content {
    transform: translate(-50%, 50%) scale(1.1);
  }

  .left:hover .section-content {
    transform: translate(-50%, -50%) scale(1.1);
  }

  .section-content h2 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 700;
    margin: 0 0 0.5rem;
    color: #374151;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .section-content p {
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    margin: 0;
    color: #6B7280;
  }

  :global([data-theme="dark"]) .section-content h2 {
    color: rgba(255, 255, 255, 0.95);
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  :global([data-theme="dark"]) .section-content p {
    color: rgba(255, 255, 255, 0.8);
  }

  .center-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
  }

  .theme-toggle {
    width: 80px;
    height: 80px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.05),
      0 4px 12px rgba(0, 0, 0, 0.08);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #6B7280;
    position: relative;
    z-index: 30;
  }

  .theme-toggle:hover {
    transform: scale(1.1);
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.05),
      0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .theme-toggle:active {
    transform: scale(0.95);
  }

  .theme-toggle svg {
    width: 32px;
    height: 32px;
  }

  :global([data-theme="dark"]) .theme-toggle {
    background: #374151;
    color: #F9FAFB;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 4px 12px rgba(0, 0, 0, 0.3);
  }

  :global([data-theme="dark"]) .theme-toggle:hover {
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 8px 20px rgba(0, 0, 0, 0.4);
  }

  .navigation-hint {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: #6B7280;
    font-size: 0.9rem;
    z-index: 30;
  }

  :global([data-theme="dark"]) .navigation-hint {
    color: rgba(255, 255, 255, 0.6);
  }

  .navigation-hint p {
    margin: 0.25rem 0;
  }

  .esc-hint kbd {
    display: inline-block;
    padding: 0.2rem 0.5rem;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.85em;
    color: #374151;
  }

  :global([data-theme="dark"]) .esc-hint kbd {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 768px) {
    .section-content h2 {
      font-size: 1.2rem;
    }

    .section-content p {
      font-size: 0.8rem;
    }

    .logo-circle {
      width: 60px;
      height: 60px;
    }

    .logo-circle span {
      font-size: 1.5rem;
    }
  }
</style>