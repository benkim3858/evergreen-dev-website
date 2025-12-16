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
</style> 