<script lang="ts">
  import { onMount } from 'svelte';

  let countdown = $state({
    days: 30,
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  onMount(() => {
    const interval = setInterval(() => {
      if (countdown.seconds > 0) {
        countdown.seconds--;
      } else {
        countdown.seconds = 59;
        if (countdown.minutes > 0) {
          countdown.minutes--;
        } else {
          countdown.minutes = 59;
          if (countdown.hours > 0) {
            countdown.hours--;
          } else {
            countdown.hours = 23;
            if (countdown.days > 0) {
              countdown.days--;
            }
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<div class="coming-soon-page">
  <div class="content-container">
    <div class="content">
    <div class="icon-container">
      <div class="icon">🚀</div>
    </div>

    <h1>Coming Soon</h1>
    <p class="subtitle">Something amazing is in the works!</p>

    <div class="countdown">
      <div class="countdown-item">
        <div class="countdown-value">{countdown.days}</div>
        <div class="countdown-label">Days</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value">{countdown.hours}</div>
        <div class="countdown-label">Hours</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value">{countdown.minutes}</div>
        <div class="countdown-label">Minutes</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value">{countdown.seconds}</div>
        <div class="countdown-label">Seconds</div>
      </div>
    </div>

    <div class="features">
      <h2>What to Expect</h2>
      <ul>
        <li>✨ Interactive Portfolio Gallery</li>
        <li>📝 Blog & Tutorials</li>
        <li>🎨 Design Showcase</li>
        <li>🔧 Development Tools</li>
      </ul>
    </div>

    <div class="notify">
      <p>Get notified when we launch!</p>
      <div class="email-form">
        <input type="email" placeholder="Enter your email" />
        <button>Notify Me</button>
      </div>
    </div>
    </div>
  </div>

  <div class="background-animation">
    {#each Array(20) as _, i}
      <div class="floating-shape" style="--delay: {i * 0.3}s; --duration: {10 + i * 0.5}s"></div>
    {/each}
  </div>
</div>

<style>
  .coming-soon-page {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 0.5rem;
    box-sizing: border-box;
  }

  :global([data-theme="dark"]) .coming-soon-page {
    background: linear-gradient(135deg, #075985 0%, #0C4A6E 100%);
  }

  .content-container {
    width: calc(100% - 1rem);
    max-width: 1600px;
    height: calc(100% - 1rem);
    background: white;
    border-radius: 24px;
    padding: 2.5rem;
    overflow-y: auto;
    box-shadow:
      0 2px 4px rgba(14, 165, 233, 0.06),
      0 8px 16px rgba(14, 165, 233, 0.08),
      0 16px 48px rgba(14, 165, 233, 0.12),
      inset 0 -2px 4px rgba(0, 0, 0, 0.02);
    border: 1px solid rgba(14, 165, 233, 0.15);
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  :global([data-theme="dark"]) .content-container {
    background: #1F2937;
    box-shadow:
      0 2px 4px rgba(56, 189, 248, 0.05),
      0 8px 16px rgba(56, 189, 248, 0.1),
      0 16px 48px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(56, 189, 248, 0.2);
  }

  .content {
    text-align: center;
    width: 100%;
    max-width: 600px;
  }

  .icon-container {
    margin-bottom: 2rem;
  }

  .icon {
    font-size: 5rem;
  }

  h1 {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 800;
    color: #0C4A6E;
    margin: 0 0 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .subtitle {
    font-size: 1.3rem;
    color: #0369A1;
    margin: 0 0 3rem;
  }

  :global([data-theme="dark"]) h1 {
    color: #7DD3FC;
  }

  :global([data-theme="dark"]) .subtitle {
    color: #BAE6FD;
  }

  .countdown {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 3rem 0;
  }

  .countdown-item {
    background: white;
    border-radius: 12px;
    padding: 1.5rem 2rem;
    border: 1px solid #BAE6FD;
    box-shadow: 0 2px 8px rgba(14, 165, 233, 0.08);
  }

  .countdown-value {
    font-size: 2.5rem;
    font-weight: 800;
    color: #0C4A6E;
  }

  .countdown-label {
    font-size: 0.9rem;
    color: #0284C7;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .features {
    margin: 3rem 0;
    background: white;
    border-radius: 16px;
    padding: 2rem;
    border: 1px solid #BAE6FD;
    box-shadow: 0 2px 8px rgba(14, 165, 233, 0.08);
  }

  .features h2 {
    font-size: 1.5rem;
    color: #075985;
    margin: 0 0 1rem;
  }

  .features ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
  }

  .features li {
    color: #0369A1;
    padding: 0.5rem 0;
    font-size: 1.1rem;
  }

  .notify {
    margin-top: 3rem;
  }

  .notify p {
    color: #0C4A6E;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .email-form {
    display: flex;
    gap: 0.5rem;
    max-width: 400px;
    margin: 0 auto;
  }

  .email-form input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid #BAE6FD;
    background: white;
    border-radius: 50px;
    color: #0C4A6E;
    font-size: 1rem;
    outline: none;
  }

  .email-form input::placeholder {
    color: #94A3B8;
  }

  .email-form input:focus {
    border-color: #38BDF8;
  }

  .email-form button {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #0EA5E9, #0284C7);
    color: white;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .email-form button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(14, 165, 233, 0.25);
  }

  .background-animation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .floating-shape {
    position: absolute;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.05), transparent);
    border-radius: 50%;
    animation: float var(--duration) ease-in-out infinite;
    animation-delay: var(--delay);
    left: calc(var(--delay) * 10%);
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(100vh) scale(0.5);
      opacity: 0;
    }
    10% {
      opacity: 0.5;
    }
    50% {
      transform: translateY(-100vh) scale(1);
      opacity: 0.2;
    }
  }

  @media (max-width: 768px) {
    .countdown {
      gap: 1rem;
    }

    .countdown-item {
      padding: 1rem;
    }

    .countdown-value {
      font-size: 1.5rem;
    }

    .email-form {
      flex-direction: column;
    }
  }
</style>