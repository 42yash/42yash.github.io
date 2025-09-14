<script lang="ts">
  const experience = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Corp',
      period: '2022 - Present',
      description: 'Leading frontend architecture and team mentorship'
    },
    {
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      period: '2020 - 2022',
      description: 'Built scalable web applications and REST APIs'
    },
    {
      title: 'Junior Developer',
      company: 'Digital Agency',
      period: '2018 - 2020',
      description: 'Developed responsive websites and web applications'
    }
  ];

  const skills = {
    'Frontend': ['React', 'Svelte', 'TypeScript', 'Vue.js'],
    'Backend': ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'],
    'Tools': ['Git', 'Docker', 'AWS', 'CI/CD']
  };
</script>

<div class="resume-page">
  <div class="resume-container">
    <header class="resume-header">
      <h1>Professional Resume</h1>
      <p class="tagline">Full Stack Developer | UI/UX Enthusiast</p>
    </header>

    <section class="experience-section">
      <h2>Experience</h2>
      <div class="timeline">
        {#each experience as job}
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <h3>{job.title}</h3>
              <p class="company">{job.company} • {job.period}</p>
              <p class="description">{job.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <section class="skills-section">
      <h2>Skills</h2>
      <div class="skills-grid">
        {#each Object.entries(skills) as [category, items]}
          <div class="skill-category">
            <h3>{category}</h3>
            <div class="skill-tags">
              {#each items as skill}
                <span class="skill-tag">{skill}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </section>

    <section class="contact-section">
      <h2>Get In Touch</h2>
      <div class="contact-links">
        <a href="#" class="contact-link">📧 Email</a>
        <a href="#" class="contact-link">💼 LinkedIn</a>
        <a href="#" class="contact-link">🐙 GitHub</a>
        <a href="#" class="contact-link">🌐 Website</a>
      </div>
    </section>
  </div>
</div>

<style>
  .resume-page {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    box-sizing: border-box;
  }

  :global([data-theme="dark"]) .resume-page {
    background: linear-gradient(135deg, #581C87 0%, #3B0764 100%);
  }

  .resume-container {
    width: calc(100% - 1rem);
    max-width: 1600px;
    height: calc(100% - 1rem);
    margin: 0 auto;
    background: white;
    border-radius: 24px;
    padding: 2.5rem;
    overflow-y: auto;
    box-shadow:
      0 2px 4px rgba(147, 51, 234, 0.06),
      0 8px 16px rgba(147, 51, 234, 0.08),
      0 16px 48px rgba(147, 51, 234, 0.12),
      inset 0 -2px 4px rgba(0, 0, 0, 0.02);
    border: 1px solid rgba(147, 51, 234, 0.15);
    box-sizing: border-box;
  }

  :global([data-theme="dark"]) .resume-container {
    background: #1F2937;
    box-shadow:
      0 2px 4px rgba(168, 85, 247, 0.05),
      0 8px 16px rgba(168, 85, 247, 0.1),
      0 16px 48px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(168, 85, 247, 0.2);
  }

  .resume-header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #E9D5FF;
  }

  .resume-header h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    color: #6B21A8;
    margin: 0 0 0.5rem;
    font-weight: 800;
  }

  .tagline {
    font-size: 1.2rem;
    color: #9333EA;
    margin: 0;
  }

  :global([data-theme="dark"]) .resume-header h1 {
    color: #C084FC;
  }

  :global([data-theme="dark"]) .tagline {
    color: #E9D5FF;
  }

  section {
    margin-bottom: 3rem;
  }

  section h2 {
    font-size: 1.8rem;
    color: #7E22CE;
    margin: 0 0 1.5rem;
    font-weight: 700;
  }

  .timeline {
    position: relative;
    padding-left: 2rem;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #A855F7, #C084FC);
  }

  .timeline-item {
    position: relative;
    margin-bottom: 2rem;
  }

  .timeline-marker {
    position: absolute;
    left: -2.35rem;
    top: 0.5rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #A855F7;
    border: 3px solid white;
    box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2);
  }

  .timeline-content h3 {
    font-size: 1.3rem;
    color: #581C87;
    margin: 0 0 0.5rem;
    font-weight: 600;
  }

  .company {
    color: #9333EA;
    font-weight: 500;
    margin: 0 0 0.5rem;
  }

  .description {
    color: #6B7280;
    line-height: 1.6;
    margin: 0;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .skill-category h3 {
    font-size: 1.1rem;
    color: #7E22CE;
    margin: 0 0 1rem;
    font-weight: 600;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill-tag {
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #F3E8FF, #E9D5FF);
    color: #6B21A8;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    transition: transform 0.2s ease;
  }

  .skill-tag:hover {
    transform: translateY(-2px);
  }

  .contact-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .contact-link {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #A855F7, #9333EA);
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .contact-link:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(168, 85, 247, 0.3);
  }

  @media (max-width: 768px) {
    .resume-page {
      padding: 1rem;
    }

    .resume-container {
      padding: 1.5rem;
    }

    .skills-grid {
      grid-template-columns: 1fr;
    }
  }
</style>