<script lang="ts">
  interface Props {
    title: string;
    color: string;
    textColor?: string;
  }

  let { title, color, textColor = '#000000' }: Props = $props();
</script>

<div
  class="page-template"
  style:background-color={color}
  style:color={textColor}
>
  <div class="content">
    <h1 class="title">{title}</h1>
    <div class="decoration">
      <div class="circle"></div>
      <div class="line"></div>
    </div>
  </div>
</div>

<style>
  .page-template {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .content {
    text-align: center;
    position: relative;
  }

  .title {
    font-size: clamp(3rem, 10vw, 8rem);
    font-weight: 900;
    letter-spacing: -0.02em;
    margin: 0;
    opacity: 0.9;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  }

  .decoration {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.3;
  }

  .line {
    width: 60px;
    height: 2px;
    background: currentColor;
    opacity: 0.3;
  }

  @media (max-width: 768px) {
    .title {
      font-size: clamp(2rem, 8vw, 4rem);
    }
  }
</style>