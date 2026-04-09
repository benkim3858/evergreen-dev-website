<template>
  <main class="intro-page">
    <!-- Hero Section -->
    <section class="intro-section hero-section">
      <div class="intro-container">
        <h1 class="hero-title">
          <span class="gradient-text">{{ $t('intro.hero.default.title') }}</span>
        </h1>
        <p class="hero-subtitle">{{ $t('intro.hero.default.subtitle') }}</p>
        <div class="hero-cta">
          <a
            :href="contacts.calendlyUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary-intro"
          >
            <Icon name="mdi:calendar-clock" />
            {{ $t('intro.hero.cta') }}
          </a>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="intro-section services-section">
      <div class="intro-container">
        <h2 class="section-heading">
          <span class="gradient-text">{{ $t('intro.services.title') }}</span>
        </h2>
        <p class="section-desc">{{ $t('intro.services.subtitle') }}</p>
        <div class="services-grid">
          <div
            v-for="service in services"
            :key="service.key"
            class="service-card"
          >
            <div class="service-icon">
              <Icon :name="service.icon" />
            </div>
            <h3>{{ $t(`intro.services.${service.key}.title`) }}</h3>
            <p>{{ $t(`intro.services.${service.key}.description`) }}</p>
            <ul class="service-list">
              <li v-for="(item, idx) in service.items" :key="idx">
                {{ $t(`intro.services.${service.key}.items[${idx}]`) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="intro-section projects-section">
      <div class="intro-container">
        <h2 class="section-heading">
          <span class="gradient-text">{{ $t('intro.projects.title') }}</span>
        </h2>
        <p class="section-desc">{{ $t('intro.projects.subtitle') }}</p>
        <div class="projects-grid">
          <article
            v-for="project in topProjects"
            :key="project.id"
            class="project-card"
          >
            <div class="project-thumbnail">
              <img :src="project.images[0]" :alt="project.title" loading="lazy" />
            </div>
            <div class="project-body">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="tech-tags">
                <span v-for="tech in project.techStack" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
            </div>
          </article>
        </div>
        <div class="projects-more">
          <NuxtLink :to="localePath('/projects')" class="more-link">
            {{ $t('intro.projects.viewMore') }}
            <Icon name="mdi:arrow-right" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="intro-section process-section">
      <div class="intro-container">
        <h2 class="section-heading">
          <span class="gradient-text">{{ $t('intro.process.title') }}</span>
        </h2>
        <p class="section-desc">{{ $t('intro.process.subtitle') }}</p>
        <div class="process-timeline">
          <div
            v-for="(step, idx) in processSteps"
            :key="step.key"
            class="process-step"
          >
            <div class="step-number">{{ String(idx + 1).padStart(2, '0') }}</div>
            <div class="step-content">
              <h3>{{ $t(`intro.process.steps.${step.key}.title`) }}</h3>
              <p>{{ $t(`intro.process.steps.${step.key}.description`) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Proposal Section -->
    <section class="intro-section proposal-section">
      <div class="intro-container">
        <h2 class="section-heading">
          <span class="gradient-text">{{ $t('intro.proposal.title') }}</span>
        </h2>
        <div class="proposal-card">
          <p class="proposal-headline">{{ $t('intro.proposal.headline') }}</p>
          <ul class="proposal-points">
            <li v-for="(point, idx) in 3" :key="idx">
              <Icon name="mdi:check-circle-outline" class="point-icon" />
              <span>{{ $t(`intro.proposal.defaultPoints[${idx}]`) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="intro-section cta-section">
      <div class="intro-container">
        <h2 class="cta-title">
          <span class="gradient-text">{{ $t('intro.cta.title') }}</span>
        </h2>
        <p class="cta-desc">{{ $t('intro.cta.description') }}</p>
        <div class="cta-buttons">
          <a
            :href="contacts.calendlyUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary-intro"
          >
            <Icon name="mdi:calendar-clock" />
            {{ $t('intro.cta.meeting') }}
          </a>
          <a
            :href="`mailto:${contacts.email}`"
            class="btn-secondary-intro"
          >
            <Icon name="mdi:email-outline" />
            {{ $t('intro.cta.email') }}
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { projects } = useProjects()
const { contacts } = useContactInfo()

// SEO
useSeoMeta({
  title: () => t('intro.meta.title'),
  description: () => t('intro.meta.description'),
  ogTitle: () => t('intro.meta.title'),
  ogDescription: () => t('intro.meta.description'),
  ogImage: '/logo.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

// Top 3 projects
const topProjects = computed(() => projects.value.slice(0, 3))

// Service definitions
const services = [
  { key: 'web', icon: 'mdi:web', items: [0, 1, 2] },
  { key: 'mobile', icon: 'mdi:cellphone', items: [0, 1, 2] },
  { key: 'backend', icon: 'mdi:database', items: [0, 1, 2] },
  { key: 'infra', icon: 'mdi:server-network', items: [0, 1, 2] },
  { key: 'ai', icon: 'mdi:robot-outline', items: [0, 1, 2] },
]

// Process steps
const processSteps = [
  { key: 'discovery' },
  { key: 'planning' },
  { key: 'development' },
  { key: 'delivery' },
]
</script>

<style scoped lang="scss">
.intro-page {
  padding-top: 120px;
  min-height: 100vh;
}

.intro-section {
  padding: 6rem 2rem;
}

.intro-container {
  max-width: 1200px;
  margin: 0 auto;
}

// ─── Typography ─────────────────────────────────
.gradient-text {
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.section-heading {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  text-align: center;
  margin-bottom: 1rem;
}

.section-desc {
  text-align: center;
  color: var(--text-color);
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

// ─── Hero ───────────────────────────────────────
.hero-section {
  text-align: center;
  padding: 8rem 2rem 6rem;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  color: var(--text-color);
  max-width: 650px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
}

.hero-cta {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

// ─── Buttons ────────────────────────────────────
.btn-primary-intro,
.btn-secondary-intro {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-primary-intro {
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  color: #0a192f;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(100, 255, 218, 0.3);
  }
}

.btn-secondary-intro {
  background: transparent;
  color: var(--text-color-light);
  border: 1px solid rgba(100, 255, 218, 0.3);
  position: relative;

  &:hover {
    border-color: transparent;
    transform: translateY(-2px);
  }

  &:hover::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}

// ─── Services ───────────────────────────────────
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  // Last two cards center in second row
  .service-card:nth-child(4),
  .service-card:nth-child(5) {
    // handled by auto-fit below
  }
}

// 3+2 layout: first row 3, second row 2 centered
.services-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1.5rem;

  .service-card {
    grid-column: span 2;

    &:nth-child(4) {
      grid-column: 2 / span 2;
    }

    &:nth-child(5) {
      grid-column: 4 / span 2;
    }
  }
}

.service-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    border-color: transparent;
  }

  &:hover::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  h3 {
    color: var(--text-color-light);
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }

  p {
    color: var(--text-color);
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
}

.service-icon {
  font-size: 2.5rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
  opacity: 0.9;
}

.service-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    color: var(--text-color);
    font-size: 0.9rem;
    padding: 0.3rem 0;
    padding-left: 1.2rem;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-color);
      transform: translateY(-50%);
      opacity: 0.6;
    }
  }
}

// ─── Projects ───────────────────────────────────
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    border-color: transparent;
  }

  &:hover::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}

.project-thumbnail {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: rgba(17, 34, 64, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 1rem;
  }
}

.project-body {
  padding: 1.5rem;

  h3 {
    color: var(--text-color-light);
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-color);
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: rgba(100, 255, 218, 0.08);
  color: var(--accent-color);
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid rgba(100, 255, 218, 0.1);
}

.projects-more {
  text-align: center;
}

.more-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--accent-color);
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    gap: 0.8rem;
  }
}

// ─── Process Timeline ───────────────────────────
.process-timeline {
  display: flex;
  gap: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 2rem;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  }
}

.process-step {
  flex: 1;
  position: relative;
  padding-top: 3.5rem;
}

.step-number {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: rgba(10, 25, 47, 0.9);
  border: 2px solid var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--accent-color);
  z-index: 1;
}

.step-content {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  text-align: center;
  margin-top: 1rem;

  h3 {
    color: var(--text-color-light);
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-color);
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

// ─── Proposal ───────────────────────────────────
.proposal-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  padding: 3rem;
  max-width: 800px;
  margin: 0 auto;
}

.proposal-headline {
  font-size: 1.3rem;
  color: var(--text-color-light);
  margin-bottom: 2rem;
  line-height: 1.6;
  text-align: center;
}

.proposal-points {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    color: var(--text-color);
    font-size: 1.05rem;
    line-height: 1.6;
  }
}

.point-icon {
  color: var(--accent-color);
  font-size: 1.4rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

// ─── CTA ────────────────────────────────────────
.cta-section {
  text-align: center;
  padding: 6rem 2rem 8rem;
}

.cta-title {
  font-size: clamp(2rem, 4vw, 2.8rem);
  margin-bottom: 1rem;
}

.cta-desc {
  color: var(--text-color);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

// ─── Responsive ─────────────────────────────────
@media (max-width: 768px) {
  .intro-section {
    padding: 4rem 1.5rem;
  }

  .hero-section {
    padding: 6rem 1.5rem 4rem;
  }

  // Tablet: 2+2+1 grid
  .services-grid {
    grid-template-columns: repeat(2, 1fr);

    .service-card {
      grid-column: span 1;

      &:nth-child(4) {
        grid-column: span 1;
      }

      &:nth-child(5) {
        grid-column: span 1;
      }
    }
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  // Vertical timeline
  .process-timeline {
    flex-direction: column;
    gap: 1.5rem;

    &::before {
      width: 2px;
      height: 100%;
      top: 0;
      left: 2rem;
      right: auto;
    }
  }

  .process-step {
    padding-top: 0;
    padding-left: 5rem;
  }

  .step-number {
    top: 50%;
    left: 0.5rem;
    transform: translateY(-50%);
  }

  .step-content {
    margin-top: 0;
    text-align: left;
  }

  .proposal-card {
    padding: 2rem 1.5rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .intro-section {
    padding: 3rem 1rem;
  }

  .hero-section {
    padding: 5rem 1rem 3rem;
  }

  // Mobile: 1 column
  .services-grid {
    grid-template-columns: 1fr;

    .service-card {
      grid-column: span 1;
    }
  }

  .btn-primary-intro,
  .btn-secondary-intro {
    width: 100%;
    justify-content: center;
  }
}
</style>
