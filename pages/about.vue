<template>
  <main class="page-container">
    <div class="container content-wrapper">
      <!-- Hero & Stats Group -->
      <div class="hero-group">
        <div class="text-center mb-large">
          <h1 class="page-title">About <span class="highlight">Evergreen Dev</span></h1>
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
            <h3>비즈니스 파트너</h3>
            <p>단순한 코드 작성이 아닌, 고객의 비즈니스 모델을 이해하고 수익 창출을 위한 최적의 솔루션을 제안합니다.</p>
          </div>
          <div class="philosophy-card">
            <Icon name="mdi:speedometer" class="philosophy-icon" />
            <h3>빠른 실행력</h3>
            <p>비즈니스의 타이밍을 놓치지 않도록, 핵심 기능(MVP) 위주의 빠른 개발과 런칭을 지원합니다.</p>
          </div>
          <div class="philosophy-card">
            <Icon name="mdi:shield-check-outline" class="philosophy-icon" />
            <h3>책임감 있는 유지보수</h3>
            <p>개발이 끝이 아닙니다. 안정적인 서비스 운영을 위한 지속적인 모니터링과 기술 지원을 약속합니다.</p>
          </div>
        </div>
      </div>

      <!-- Testimonials Section -->
      <div class="content-section">
        <h2 class="section-title text-center">Client Stories</h2>
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
// SEO 메타태그 설정 (검색 최적화)
useSeoMeta({
  title: 'Evergreen Dev | 웹/앱 개발 외주 전문 파트너 (Web & App Development Agency)',
  description: '성공적인 비즈니스를 위한 최고의 IT 파트너, Evergreen Dev. 플러터(Flutter) 앱 개발, 웹사이트 제작, 서버 구축 등 맞춤형 외주 개발 서비스를 제공합니다. 40+ 프로젝트 성공 경험과 5.0 만점의 고객 만족도를 보유하고 있습니다. 지금 바로 문의하세요.',
  keywords: '앱개발, 웹개발, 외주개발, 플러터, Flutter, SI, 스타트업 개발, IT 파트너, 홈페이지 제작, 앱 제작, 개발 외주, 프리랜서 개발자',
  ogTitle: 'Evergreen Dev | 비즈니스 성장을 위한 IT 개발 파트너',
  ogDescription: '40개 이상의 프로젝트 성공, 고객 만족도 5.0. 당신의 아이디어를 현실로 만들어드립니다.',
  ogImage: '/logo.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const aboutText = ref(`클라이언트의 비즈니스 수익 창출을 최우선으로 생각합니다. \n 고객님의 비즈니스가 언제나 푸르게 번창하고 지속 성장할 수 있도록 \n 기획부터 개발, 배포까지 함께하는 든든한 IT 파트너입니다.`);

const achievements = ref([
  { label: 'Successful Projects', value: '40+', icon: 'mdi:trophy-award' },
  { label: 'Client Satisfaction', value: '5.0/5.0', icon: 'mdi:star' },
  { label: 'Avg. Cost Reduction', value: '40%', icon: 'mdi:chart-timeline-variant-shimmer' },
  { label: 'Service Uptime', value: '99.9%', icon: 'mdi:server-network' }
]);

const testimonials = ref([
  {
    content: "초기 스타트업이라 기획이 불확실했는데, 전문가님께서 비즈니스 모델까지 함께 고민해주셨습니다. 덕분에 3주 만에 MVP를 런칭하고 초기 투자를 유치할 수 있었습니다.",
    author: "박OO 대표",
    role: "Fintech Startup CEO",
    rating: 5
  },
  {
    content: "기존 외주 개발사들과는 다르게 코드 퀄리티가 상당히 높습니다. 인수인계 받은 내부 개발팀이 '유지보수하기 너무 편한 구조'라며 극찬했습니다.",
    author: "김OO CTO",
    role: "E-commerce Platform",
    rating: 5
  },
  {
    content: "Flutter 크로스플랫폼 성능에 대한 의구심이 있었는데, 네이티브 못지않은 퍼포먼스를 보여줬습니다. iOS와 Android 두 마리 토끼를 완벽하게 잡았습니다.",
    author: "이OO 기획팀장",
    role: "O2O Service",
    rating: 5
  }
]);
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