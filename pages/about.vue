<template>
  <main class="page-container">
    <div class="container content-wrapper">
      <!-- Hero & Stats Group -->
      <div class="hero-group">
        <div class="text-center mb-large">
          <h1 class="page-title">{{ $t('about.pageTitle') }}</h1>
          <p class="page-subtitle">{{ aboutText }}</p>
        </div>

        <div class="stats-grid">
          <div v-for="stat in achievements" :key="stat.label" class="stat-card">
            <div class="stat-icon">
              <Icon :name="stat.icon" />
            </div>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Philosophy Section -->
      <div class="content-section">
        <div class="philosophy-content">
          <div class="philosophy-card">
            <Icon name="mdi:handshake-outline" class="philosophy-icon" />
            <h3>{{ $t('about.philosophy.partner.title') }}</h3>
            <p>{{ $t('about.philosophy.partner.description') }}</p>
          </div>
          <div class="philosophy-card">
            <Icon name="mdi:speedometer" class="philosophy-icon" />
            <h3>{{ $t('about.philosophy.speed.title') }}</h3>
            <p>{{ $t('about.philosophy.speed.description') }}</p>
          </div>
          <div class="philosophy-card">
            <Icon name="mdi:shield-check-outline" class="philosophy-icon" />
            <h3>{{ $t('about.philosophy.maintenance.title') }}</h3>
            <p>{{ $t('about.philosophy.maintenance.description') }}</p>
          </div>
        </div>
      </div>

      <!-- Testimonials Section -->
      <div class="content-section">
        <h2 class="section-title text-center">{{ $t('about.testimonials.title') }}</h2>
        <div class="testimonials-grid">
          <div v-for="(review, index) in testimonials" :key="index" class="testimonial-card">
            <div class="quote-icon">
              <Icon name="mdi:format-quote-open" />
            </div>
            <p class="review-content">"{{ review.content }}"</p>
            <div class="quote-icon-close">
              <Icon name="mdi:format-quote-close" />
            </div>
            <div class="review-author">
              <div class="author-info">
                <strong>{{ review.author }}</strong>
                <span>{{ review.role }}</span>
              </div>
              <div class="review-rating">
                <Icon v-for="n in review.rating" :key="n" name="mdi:star" class="star" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const { t, tm } = useI18n();

// SEO 메타태그 설정 (검색 최적화)
useSeoMeta({
  title: () => t('seo.about.title'),
  description: () => t('seo.about.description'),
  ogTitle: () => t('seo.about.title'),
  ogDescription: () => t('seo.about.description'),
  ogImage: '/logo.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const aboutText = computed(() => t('about.description'));

const achievements = computed(() => [
  { label: t('about.achievements.projects'), value: '40+', icon: 'mdi:trophy-award' },
  { label: t('about.achievements.satisfaction'), value: '5.0/5.0', icon: 'mdi:star' },
  { label: t('about.achievements.costReduction'), value: '40%', icon: 'mdi:chart-timeline-variant-shimmer' },
  { label: t('about.achievements.uptime'), value: '99.9%', icon: 'mdi:server-network' }
]);

const testimonials = computed(() => {
  try {
    const rawItems = tm('about.testimonials.items');
    if (rawItems && typeof rawItems === 'object') {
      // Use JSON.parse/stringify to break Vue reactivity and get plain values
      const items = JSON.parse(JSON.stringify(rawItems));
      if (Array.isArray(items)) {
        return items.map((item) => ({
          content: item.content || '',
          author: item.author || '',
          role: item.role || '',
          rating: 5
        }));
      }
    }
  } catch (e) {
    console.warn('Failed to load testimonials', e);
  }
  return [];
});
</script>

<style scoped>
.page-container {
  padding-top: 180px; /* Increased to avoid header overlap */
  min-height: 100vh;
  padding-bottom: var(--space-xl);
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md); /* Add side padding for smaller screens */
}

.hero-group {
  margin-bottom: var(--space-xl);
}

.mb-large {
  margin-bottom: var(--space-lg);
}

.content-section {
  margin-bottom: var(--space-xl);
}

.page-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: var(--space-md);
  color: var(--text-color-light);
}

.page-subtitle {
  font-size: 1.2rem;
  color: var(--text-color);
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.6;
  white-space: pre-line;
}

.highlight {
  color: var(--accent-color);
}

/* Stats Styles */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--space-md);
}

.stat-card {
  background: rgba(17, 34, 64, 0.4);
  padding: var(--space-md);
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(100, 255, 218, 0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-color);
  background: rgba(17, 34, 64, 0.6);
}

.stat-icon {
  font-size: 2.5rem;
  color: var(--accent-color);
  margin-bottom: var(--space-sm);
  opacity: 0.8;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color-light);
  margin-bottom: 0;
}

.stat-label {
  color: var(--text-color);
  font-size: 0.9rem;
  margin-top: 5px;
}

/* Philosophy Section */
.philosophy-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-md);
}

.philosophy-card {
  background: rgba(255, 255, 255, 0.03);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(100, 255, 218, 0.05);
  transition: all 0.3s ease;
  height: 100%; /* Ensure equal height */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.philosophy-card:hover {
  border-color: var(--accent-color);
  transform: translateY(-5px);
}

.philosophy-icon {
  font-size: 2.5rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
}

.philosophy-card h3 {
  color: var(--text-color-light);
  font-size: 1.25rem;
  margin-bottom: 0.8rem;
}

.philosophy-card p {
  color: var(--text-color);
  line-height: 1.5;
  font-size: 0.95rem;
  flex-grow: 1; /* Push bottom if needed */
}

/* Testimonials Styles */
.section-title {
  margin-bottom: var(--space-lg);
  font-size: 2rem;
  color: var(--text-color-light);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-md);
}

.testimonial-card {
  background: rgba(17, 34, 64, 0.3);
  padding: 2rem;
  border-radius: 12px;
  position: relative;
  border: 1px solid rgba(100, 255, 218, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%; /* Equal height */
}

.quote-icon {
  font-size: 2rem;
  color: var(--accent-color);
  opacity: 0.3;
  margin-bottom: 1rem;
}

.quote-icon-close {
  font-size: 2rem;
  color: var(--accent-color);
  opacity: 0.3;
  align-self: flex-end;
}

.review-content {
  font-style: italic;
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  font-size: 1rem;
}

.review-author {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
}

.author-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.author-info strong {
  color: var(--text-color-light);
  font-weight: 600;
  font-size: 1rem;
}

.author-info span {
  font-size: 0.85rem;
  color: var(--text-color);
  opacity: 0.7;
}

.review-rating {
  color: #ffc107;
  font-size: 1rem;
  display: flex;
}
</style>