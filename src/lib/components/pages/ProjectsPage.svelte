<script lang="ts">
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack online shopping solution with real-time inventory',
      tech: ['React', 'Node.js', 'PostgreSQL'],
      link: '#',
      image: '🛍️'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management tool with team features',
      tech: ['Vue.js', 'Express', 'MongoDB'],
      link: '#',
      image: '📋'
    },
    {
      title: 'Weather Dashboard',
      description: 'Real-time weather tracking with predictive analytics',
      tech: ['Svelte', 'Python', 'FastAPI'],
      link: '#',
      image: '🌤️'
    },
    {
      title: 'Social Media Analytics',
      description: 'Data visualization platform for social media metrics',
      tech: ['Next.js', 'GraphQL', 'Redis'],
      link: '#',
      image: '📊'
    }
  ];
</script>

<div class="projects-page">
  <div class="content-container">
    <div class="page-header">
      <h1>Projects</h1>
      <p>A showcase of my recent work and experiments</p>
    </div>

    <div class="projects-grid">
      {#each projects as project}
        <article class="project-card">
          <div class="project-icon">
            {project.image}
          </div>
          <div class="project-content">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div class="tech-tags">
              {#each project.tech as tech}
                <span class="tech-tag">{tech}</span>
              {/each}
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</div>

<style>
  .projects-page {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    box-sizing: border-box;
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
      0 2px 4px rgba(34, 197, 94, 0.06),
      0 8px 16px rgba(34, 197, 94, 0.08),
      0 16px 48px rgba(34, 197, 94, 0.12),
      inset 0 -2px 4px rgba(0, 0, 0, 0.02);
    border: 1px solid rgba(34, 197, 94, 0.15);
    box-sizing: border-box;
  }

  :global([data-theme="dark"]) .content-container {
    background: #1F2937;
    box-shadow:
      0 2px 4px rgba(16, 185, 129, 0.05),
      0 8px 16px rgba(16, 185, 129, 0.1),
      0 16px 48px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(16, 185, 129, 0.2);
  }

  :global([data-theme="dark"]) .projects-page {
    background: linear-gradient(135deg, #064E3B 0%, #022C22 100%);
  }

  .page-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .page-header h1 {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 800;
    color: #166534;
    margin: 0 0 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .page-header p {
    font-size: 1.2rem;
    color: #15803D;
    margin: 0;
  }

  :global([data-theme="dark"]) .page-header h1 {
    color: #86EFAC;
  }

  :global([data-theme="dark"]) .page-header p {
    color: #BBF7D0;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .project-card {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid #D1FAE5;
    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.08);
  }

  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(34, 197, 94, 0.15);
    border-color: #86EFAC;
  }

  .project-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .project-content h3 {
    font-size: 1.5rem;
    color: #14532D;
    margin: 0 0 0.5rem;
    font-weight: 700;
  }

  .project-content p {
    color: #374151;
    line-height: 1.6;
    margin: 0 0 1rem;
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tech-tag {
    padding: 0.25rem 0.75rem;
    background: #DCFCE7;
    color: #166534;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    border: 1px solid #BBF7D0;
  }

  @media (max-width: 768px) {
    .projects-page {
      padding: 1rem;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>