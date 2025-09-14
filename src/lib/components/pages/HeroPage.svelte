<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    onDismiss: () => void;
  }

  let { onDismiss }: Props = $props();

  const techStack = [
    { name: 'Svelte 5', icon: '⚡', description: 'Reactive UI framework' },
    { name: 'TypeScript', icon: '🔷', description: 'Type-safe JavaScript' },
    { name: 'SvelteKit', icon: '🏗️', description: 'Full-stack framework' },
    { name: 'Vite', icon: '⚙️', description: 'Lightning-fast bundler' }
  ];

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      onDismiss();
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<div class="hero-page">
  <div class="hero-content">
    <h1 class="hero-title">Welcome to My Portfolio</h1>
    <p class="hero-subtitle">Built with modern web technologies</p>

    <div class="tech-stack">
      {#each techStack as tech}
        <div class="tech-item">
          <span class="tech-icon">{tech.icon}</span>
          <div class="tech-info">
            <h3>{tech.name}</h3>
            <p>{tech.description}</p>
          </div>
        </div>
      {/each}
    </div>

    <div class="instructions">
      <p class="instruction-text">Navigate with arrow keys or click to explore</p>
      <button class="enter-button" onclick={onDismiss}>
        Press <kbd>Enter</kbd> to continue
      </button>
    </div>
  </div>

  <div class="background-pattern"></div>
</div>

<style>
  .hero-page {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    overflow: hidden;
  }

  .background-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    background-image:
      repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px),
      repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px);
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 800px;
    padding: 2rem;
    animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-title {
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: 900;
    color: white;
    margin: 0 0 1rem;
    text-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    letter-spacing: -0.02em;
  }

  .hero-subtitle {
    font-size: clamp(1rem, 3vw, 1.5rem);
    color: rgba(255, 255, 255, 0.9);
    margin: 0 0 3rem;
    font-weight: 300;
  }

  .tech-stack {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 3rem 0;
    animation: slideUpDelayed 0.8s cubic-bezier(0.4, 0, 0.2, 1) backwards;
    animation-delay: 0.2s;
  }

  @keyframes slideUpDelayed {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .tech-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }

  .tech-item:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  .tech-icon {
    font-size: 2rem;
  }

  .tech-info {
    text-align: left;
  }

  .tech-info h3 {
    font-size: 1.1rem;
    margin: 0 0 0.25rem;
    color: white;
    font-weight: 600;
  }

  .tech-info p {
    font-size: 0.85rem;
    margin: 0;
    color: rgba(255, 255, 255, 0.8);
  }

  .instructions {
    margin-top: 3rem;
    animation: slideUpDelayed 0.8s cubic-bezier(0.4, 0, 0.2, 1) backwards;
    animation-delay: 0.4s;
  }

  .instruction-text {
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }

  .enter-button {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    backdrop-filter: blur(10px);
  }

  .enter-button:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .enter-button kbd {
    display: inline-block;
    padding: 0.2rem 0.5rem;
    margin: 0 0.3rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9em;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    .tech-stack {
      grid-template-columns: 1fr;
    }

    .hero-content {
      padding: 1rem;
    }
  }
</style>