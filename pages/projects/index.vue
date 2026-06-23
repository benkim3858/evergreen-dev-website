<template>
  <section class="section">
    <div class="container">
      <h2 class="section-title text-center">{{ $t('projects.portfolioTitle') }}</h2>
      <div class="grid grid-1 grid-2-sm grid-3-md">
        <article v-for="project in projects" :key="project.id" class="card project-card">
          <NuxtLink :to="localePath(`/projects/${project.id}`)" class="project-image-link">
            <div class="project-image">
              <img :src="project.images[0]" :alt="project.title">
              <div class="project-overlay">
                <span>{{ $t('projects.viewDetails') }}</span>
              </div>
            </div>
          </NuxtLink>
          <div class="project-content">
            <h3>
              <NuxtLink :to="localePath(`/projects/${project.id}`)">{{ project.title }}</NuxtLink>
            </h3>
            <p>{{ project.description }}</p>
            <div class="project-tech">
              <span v-for="tech in project.techStack" :key="tech">{{ tech }}</span>
            </div>
            <div class="project-links-row" v-if="project.links">
              <a v-if="project.links.appStore" :href="project.links.appStore" target="_blank" class="icon-link">
                <Icon name="mdi:apple" />
              </a>
              <a v-if="project.links.playStore" :href="project.links.playStore" target="_blank" class="icon-link">
                <Icon name="mdi:google-play" />
              </a>
              <a v-if="project.links.web" :href="project.links.web" target="_blank" class="icon-link">
                <Icon name="mdi:web" />
              </a>
              <a v-if="project.links.github" :href="project.links.github" target="_blank" class="icon-link">
                <Icon name="mdi:github" />
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- Demo 시연 홈페이지 CTA — full-width (홈 Featured Works 정합) -->
      <a
        href="https://portfolio.evegdev.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="demo-cta-card"
      >
        <div class="demo-cta-lead">
          <div class="demo-cta-icon">
            <Icon name="mdi:rocket-launch-outline" />
          </div>
          <div class="demo-cta-text">
            <h3 class="demo-cta-title">{{ $t('projects.demoCta.title') }}</h3>
            <p class="demo-cta-desc">{{ $t('projects.demoCta.desc') }}</p>
          </div>
        </div>
        <span class="demo-cta-link">
          {{ $t('projects.demoCta.cta') }}
          <Icon name="mdi:arrow-top-right" />
        </span>
      </a>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const localePath = useLocalePath();

// SEO 메타태그 설정
useSeoMeta({
  title: () => t('seo.projects.title'),
  description: () => t('seo.projects.description'),
  ogTitle: () => t('seo.projects.title'),
  ogDescription: () => t('seo.projects.description'),
  ogImage: '/logo.png',
  twitterCard: 'summary_large_image',
})

const { projects } = useProjects();
</script>

<style scoped>
.project-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-image {
  aspect-ratio: 16/9;
  width: 100%;
  position: relative;
}

@media (max-width: 768px) {
  .project-content {
    padding: var(--space-md);
  }
}

@media (max-width: 480px) {
  .project-tech {
    flex-wrap: wrap;
  }
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.03);
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-links {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 25, 47, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-links {
  opacity: 1;
}

.project-link {
  color: var(--accent-color);
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.project-link:hover {
  transform: scale(1.1);
}

.project-content {
  padding: 1.5rem;
}

.project-content h3 {
  color: #fff;
  margin: 0 0 1rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.project-tech span {
  background: rgba(100, 255, 218, 0.1);
  color: var(--accent-color);
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
}

/* Demo 시연 CTA — full-width 배너 (홈 정합, 회전 그라데이션 테두리) */
@property --border-angle {
  syntax: "<angle>";
  initial-value: 120deg;
  inherits: false;
}
@keyframes borderAngleRotate {
  to { --border-angle: 480deg; }
}
.demo-cta-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-lg) var(--space-xl);
  max-width: 1400px;
  margin: var(--space-xl) auto 0;
  padding: var(--space-xl);
  text-decoration: none;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(120% 160% at 0% 0%, rgba(100, 255, 218, 0.09), transparent 52%),
    radial-gradient(120% 160% at 100% 100%, rgba(167, 139, 250, 0.08), transparent 50%),
    rgba(10, 25, 47, 0.72);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.demo-cta-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 44px rgba(100, 255, 218, 0.12);
}
.demo-cta-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;
  background: conic-gradient(
    from var(--border-angle),
    #64ffda, #4af3ff, #a78bfa, #4af3ff, #64ffda
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: borderAngleRotate 5s linear infinite;
  pointer-events: none;
}
.demo-cta-lead {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  min-width: 0;
}
.demo-cta-icon {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  font-size: 2.1rem;
  border-radius: 14px;
  color: #9af5e4;
  background: linear-gradient(135deg, rgba(100, 255, 218, 0.16), rgba(167, 139, 250, 0.16));
  border: 1px solid rgba(100, 255, 218, 0.3);
  transition: transform 0.3s ease;
}
.demo-cta-card:hover .demo-cta-icon {
  transform: translateY(-3px) scale(1.06);
}
.demo-cta-title {
  font-size: clamp(1.4rem, 2.4vw, 1.8rem);
  color: var(--text-color-light);
  margin: 0 0 var(--space-xs);
}
.demo-cta-desc {
  font-size: 1rem;
  color: var(--text-color);
  line-height: 1.6;
  margin: 0;
  max-width: 52ch;
}
.demo-cta-link {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 700;
  white-space: nowrap;
  padding: 0.8em 1.7em;
  border-radius: 8px;
  color: #06121f;
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  transition: transform 0.3s ease;
}
.demo-cta-card:hover .demo-cta-link {
  transform: translateX(3px);
}
@media (max-width: 768px) {
  .demo-cta-card {
    flex-direction: column;
    align-items: flex-start;
  }
  .demo-cta-link {
    align-self: stretch;
    justify-content: center;
  }
}
@media (prefers-reduced-motion: reduce) {
  .demo-cta-card::after {
    animation: none;
    background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  }
}
</style> 