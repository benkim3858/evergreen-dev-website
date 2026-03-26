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

      <!-- Team Section -->
      <div class="content-section">
        <h2 class="section-title text-center">{{ $t('about.team.title') }}</h2>
        <p class="section-subtitle text-center">{{ $t('about.team.subtitle') }}</p>
        <div class="team-grid">
          <div v-for="(member, index) in teamMembers" :key="index" class="team-card">
            <div class="team-avatar" :style="{ '--delay': index * 0.1 + 's' }">
              <Icon :name="member.icon" class="avatar-icon" />
            </div>
            <h3 class="team-name">{{ member.name }}</h3>
            <span class="team-role">{{ member.role }}</span>
            <p class="team-bio">{{ member.bio }}</p>
            <div class="team-skills">
              <span v-for="skill in member.skills" :key="skill" class="skill-tag">{{ skill }}</span>
            </div>
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
const { t, tm, rt } = useI18n();

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

const roleIcons = {
  0: 'mdi:lightbulb-outline',
  1: 'mdi:palette-outline',
  2: 'mdi:code-braces',
  3: 'mdi:code-braces',
  4: 'mdi:code-braces'
};

const teamMembers = computed(() => {
  try {
    const rawMembers = tm('about.team.members');
    if (rawMembers && Array.isArray(rawMembers)) {
      return rawMembers.map((member, index) => ({
        name: rt(member.name),
        role: rt(member.role),
        bio: rt(member.bio),
        skills: member.skills ? member.skills.map(s => rt(s)) : [],
        icon: roleIcons[index] || 'mdi:account'
      }));
    }
  } catch (e) {
    console.warn('Failed to load team members', e);
  }
  return [];
});

const testimonials = computed(() => {
  try {
    const rawItems = tm('about.testimonials.items');
    if (rawItems && Array.isArray(rawItems)) {
      return rawItems.map((item) => ({
        content: rt(item.content),
        author: rt(item.author),
        role: rt(item.role),
        rating: 5
      }));
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
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
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

.stat-card {
  position: relative;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: transparent;
  background: rgba(17, 34, 64, 0.6);
}

.stat-card:hover::after {
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

.philosophy-card {
  position: relative;
}

.philosophy-card:hover {
  border-color: transparent;
  transform: translateY(-5px);
}

.philosophy-card:hover::after {
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

/* Team Section */
.section-subtitle {
  color: var(--text-color);
  font-size: 1.1rem;
  margin-bottom: var(--space-lg);
  opacity: 0.8;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-md);
  justify-items: center;
}

.team-card {
  background: rgba(255, 255, 255, 0.03);
  padding: 2rem 1.5rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(100, 255, 218, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
}

.team-card:hover {
  transform: translateY(-5px);
  border-color: transparent;
}

.team-card:hover::after {
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

.team-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(100, 255, 218, 0.1), rgba(167, 139, 250, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  border: 1px solid rgba(100, 255, 218, 0.15);
}

.avatar-icon {
  font-size: 2rem;
  color: var(--accent-color);
}

.team-name {
  color: var(--text-color-light);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.team-role {
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.team-bio {
  color: var(--text-color);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.team-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.skill-tag {
  background: rgba(100, 255, 218, 0.08);
  color: var(--accent-color);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid rgba(100, 255, 218, 0.1);
}
</style>