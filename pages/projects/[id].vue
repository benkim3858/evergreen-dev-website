<template>
  <div class="project-detail-page">
    <div class="container" v-if="project">
      <!-- Header Section -->
      <header class="project-header">
        <div class="nav-wrapper">
            <NuxtLink to="/projects" class="back-pill">
            <Icon name="mdi:arrow-left" size="20" />
            <span>All Projects</span>
            </NuxtLink>
        </div>
        
        <span class="project-client">{{ project.client }}</span>
        <h1 class="project-title">{{ project.title }}</h1>
        <p class="project-subtitle">{{ project.description }}</p>

        <div class="project-meta-grid">
          <div class="meta-item">
            <span class="label">Period</span>
            <span class="value">{{ project.period }}</span>
          </div>
          <div class="meta-item">
            <span class="label">Role</span>
            <span class="value">{{ project.role }}</span>
          </div>
          <div class="meta-item">
            <span class="label">Team Size</span>
            <span class="value">{{ project.teamSize }}</span>
          </div>
          <div class="meta-item">
            <span class="label">Tech Stack</span>
            <div class="tech-tags">
              <span v-for="tech in project.techStack" :key="tech">{{ tech }}</span>
            </div>
          </div>
        </div>

        <div class="project-actions">
           <a v-if="project.links.appStore" :href="project.links.appStore" target="_blank" class="btn btn-primary">
            <Icon name="mdi:apple" /> App Store
          </a>
           <a v-if="project.links.playStore" :href="project.links.playStore" target="_blank" class="btn btn-primary">
            <Icon name="mdi:google-play" /> Play Store
          </a>
          <a v-if="project.links.web" :href="project.links.web" target="_blank" class="btn btn-primary">
            <Icon name="mdi:web" /> Visit Website
          </a>
          <a v-if="project.links.github" :href="project.links.github" target="_blank" class="btn btn-secondary">
            <Icon name="mdi:github" /> View Code
          </a>
        </div>
      </header>

      <!-- Main Content -->
      <div class="project-body">
        <section class="content-section">
          <h2>Project Overview</h2>
          <p class="long-description">{{ project.details }}</p>
        </section>

        <section class="content-section">
          <h2>Key Features</h2>
          <div class="features-grid">
            <div v-for="(feature, idx) in project.features" :key="idx" class="feature-block">
              <h3>{{ feature.title }}</h3>
              <ul>
                <li v-for="(item, i) in feature.items" :key="i">{{ item }}</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="content-section" v-if="project.images && project.images.length > 0">
          <h2>Project Gallery</h2>
          <div class="gallery-grid">
            <div v-for="(image, idx) in project.images.slice(1)" :key="idx" class="gallery-item">
              <img :src="image" :alt="`${project.title} screenshot ${idx + 1}`" loading="lazy">
            </div>
          </div>
        </section>

        <section class="contact-cta">
            <h2>Interested in building something similar?</h2>
            <p>Let's discuss how we can help your business grow.</p>
            <NuxtLink to="/#contact" class="btn btn-primary">Contact Us</NuxtLink>
        </section>
      </div>
    </div>
    <div v-else class="container not-found">
      <h1>Project Not Found</h1>
      <NuxtLink to="/" class="btn btn-primary">Go Home</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { getProjectById } = useProjects();
const project = computed(() => getProjectById(route.params.id));

useSeoMeta({
  title: () => project.value ? `${project.value.title} - Success Case | Evergreen Dev` : 'Project Not Found',
  description: () => project.value ? `${project.value.title} 프로젝트 개발 사례. Evergreen Dev는 ${project.value.techStack.join(', ')} 기술을 활용하여 성공적인 서비스를 구축했습니다.` : 'Evergreen Dev Project Case Study',
})
</script>

<style scoped lang="scss">
.project-detail-page {
  padding-top: 180px; // Increased top spacing significantly
  padding-bottom: 4rem;
  background-color: var(--color-bg, #0a192f);
  color: var(--color-text-primary, #e6f1ff);
  min-height: 100vh;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.nav-wrapper {
    margin-bottom: 3rem;
}

.back-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text-primary, #e6f1ff);
  text-decoration: none;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.6rem 1.25rem;
  border-radius: 99px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  font-size: 0.9rem;
  
  span {
      position: relative;
      top: 1px;
  }
  
  &:hover {
    background: rgba(100, 255, 218, 0.1);
    border-color: var(--color-primary, #64ffda);
    color: var(--color-primary, #64ffda);
    transform: translateX(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
}

.project-client {
  display: block;
  color: var(--color-primary, #64ffda);
  font-family: monospace;
  margin-bottom: 0.5rem;
}

.project-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.1;
  color: var(--color-text-primary, #e6f1ff);
}

.project-subtitle {
  font-size: 1.25rem;
  color: var(--color-text-secondary, #8892b0);
  margin-bottom: 3rem;
  max-width: 700px;
}

.project-meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background: rgba(17, 34, 64, 0.4);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 3rem;

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .label {
      color: var(--color-text-secondary, #8892b0);
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .value {
      color: var(--color-text-primary, #e6f1ff);
      font-weight: 500;
      font-size: 1.1rem;
    }
  }
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  
  span {
    color: var(--color-primary, #64ffda);
    background: rgba(100, 255, 218, 0.1);
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
    font-size: 0.9rem;
  }
}

.project-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;

  .btn {
    text-transform: none;
    letter-spacing: 0;
  }
}

.content-section {
  margin-bottom: 4rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: var(--color-text-primary, #e6f1ff);
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 2px;
      background: var(--color-primary, #64ffda);
    }
  }
}

.long-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text-secondary, #8892b0);
  white-space: pre-line;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-block {
  background: rgba(17, 34, 64, 0.4);
  padding: 2rem;
  border-radius: 8px;
  border-top: 2px solid var(--color-primary, #64ffda);

  h3 {
    margin-bottom: 1rem;
    color: var(--color-text-primary, #e6f1ff);
  }

  ul {
    list-style: none;
    padding: 0;
    
    li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.8rem;
      color: var(--color-text-secondary, #8892b0);
      line-height: 1.6;

      &::before {
        content: "▹";
        position: absolute;
        left: 0;
        color: var(--color-primary, #64ffda);
      }
    }
  }
}

.gallery-grid {
  column-count: 1;
  column-gap: 1.5rem;
  
  @media (min-width: 640px) {
    column-count: 2;
  }
  
  @media (min-width: 1024px) {
    column-count: 3;
  }
}

.gallery-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease;
  background: rgba(255,255,255,0.05);
  break-inside: avoid;
  margin-bottom: 1.5rem;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
}

.contact-cta {
    text-align: center;
    background: linear-gradient(135deg, rgba(17, 34, 64, 0.8) 0%, rgba(10, 25, 47, 0.9) 100%);
    padding: 4rem 2rem;
    border-radius: 16px;
    border: 1px solid rgba(100, 255, 218, 0.2);
    margin-top: 6rem;

    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: var(--color-text-primary, #e6f1ff);
    }

    p {
        color: var(--color-text-secondary, #8892b0);
        margin-bottom: 2rem;
        font-size: 1.2rem;
    }
}
</style>
