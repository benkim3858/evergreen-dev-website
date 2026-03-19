<template>
  <main class="main-container">
    <!-- Background is provided by SpaceBackground in default layout -->
    
    <!-- Hero Section -->
    <section id="home" class="section hero-section">
      <div class="hero-content">
        <div class="text-content">
          <h1 class="animate-text">
            <span class="highlight">EVERGREEN DEV</span>
          </h1>
          <p class="hero-slogan">
            {{ $t('hero.slogan') }}<br>
            {{ $t('hero.sloganSub') }}
          </p>
          <p class="typewriter">{{ currentText }}</p>
          <div class="cta-buttons">
            <a href="#expertise" class="btn btn-primary" @click.prevent="scrollTo('expertise')">{{ $t('hero.cta.services') }}</a>
            <a href="#contact" class="btn btn-secondary selected" @click.prevent="scrollTo('contact')">{{ $t('hero.cta.contact') }}</a>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <div class="scroll-text">{{ $t('hero.scroll') }}</div>
      </div>
    </section>

    <!-- Expertise Section -->
    <section id="expertise" class="section expertise-section">
      <div class="container">
        <h2 class="section-title text-center">{{ $t('expertise.title') }}</h2>
        <p class="section-subtitle text-center">{{ $t('expertise.subtitle') }}</p>
        <div class="expertise-grid">
          <div class="expertise-card">
            <div class="expertise-icon">
              <Icon name="mdi:web" />
            </div>
            <h3>{{ $t('expertise.cards.web.title') }}</h3>
            <p>{{ $t('expertise.cards.web.description') }}</p>
            <ul class="expertise-list">
              <li v-for="item in expertiseItems.web" :key="item">{{ item }}</li>
            </ul>
          </div>

          <div class="expertise-card">
            <div class="expertise-icon">
              <Icon name="mdi:cellphone" />
            </div>
            <h3>{{ $t('expertise.cards.mobile.title') }}</h3>
            <p>{{ $t('expertise.cards.mobile.description') }}</p>
            <ul class="expertise-list">
              <li v-for="item in expertiseItems.mobile" :key="item">{{ item }}</li>
            </ul>
          </div>

          <div class="expertise-card">
            <div class="expertise-icon">
              <Icon name="mdi:database" />
            </div>
            <h3>{{ $t('expertise.cards.backend.title') }}</h3>
            <p>{{ $t('expertise.cards.backend.description') }}</p>
            <ul class="expertise-list">
              <li v-for="item in expertiseItems.backend" :key="item">{{ item }}</li>
            </ul>
          </div>

          <div class="expertise-card">
            <div class="expertise-icon">
              <Icon name="mdi:shield-check" />
            </div>
            <h3>{{ $t('expertise.cards.stability.title') }}</h3>
            <p>{{ $t('expertise.cards.stability.description') }}</p>
            <ul class="expertise-list">
              <li v-for="item in expertiseItems.stability" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section projects-section">
      <div class="container">
        <h2 class="section-title text-center">{{ $t('projects.title') }}</h2>
        <div class="grid grid-1 grid-2-sm grid-3-md">
          <article v-for="project in projects"
                   :key="project.id"
                   class="card project-card">
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

    <!-- About Section -->
    <section id="about" class="section about-section">
      <div class="container">
        <div class="about-content">
          <div class="about-header text-center">
            <h2 class="section-title">{{ $t('about.whyTitle') }}</h2>
            <p class="section-subtitle">{{ aboutText }}</p>
          </div>

          <!-- Key Achievements -->
          <div class="stats-grid">
            <div v-for="stat in achievements" :key="stat.label" class="stat-card">
              <div class="stat-icon">
                <Icon :name="stat.icon" />
              </div>
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>

          <!-- Client Testimonials -->
          <div class="testimonials-section">
            <h3 class="testimonials-title text-center">{{ $t('about.testimonials.title') }}</h3>
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
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section contact-section">
      <div class="container">
        <h2 class="section-title text-center">{{ $t('contact.title') }}</h2>
        <div class="contact-container grid grid-1 grid-2-md">
          <div class="contact-info">
            <p>{{ contactText }}</p>
            <div class="contact-details">
              <div class="email-group">
                <div class="email-row">
                  <a :href="`mailto:${contacts.email}`" class="contact-link">
                    <Icon name="mdi:email" /> {{ contacts.email }}
                  </a>
                  <button class="copy-btn" @click="copyEmail" :title="$t('contact.cards.email.copy') || 'Copy'">
                    <Icon :name="emailCopied ? 'mdi:check' : 'mdi:content-copy'" />
                  </button>
                </div>
                <p class="response-time">
                  <Icon name="mdi:clock-outline" /> {{ $t('contact.responseTime') }}
                </p>
              </div>
              
            </div>

            <div class="business-info">
              <p><Icon name="mdi:domain" /> {{ $t('contact.business.name') }}</p>
              <p><Icon name="mdi:card-account-details-outline" /> {{ $t('contact.business.registration') }}</p>
              <p><Icon name="mdi:briefcase-outline" /> {{ $t('contact.business.industry') }}</p>
              <p><Icon name="mdi:code-tags" /> {{ $t('contact.business.category') }}</p>
              <p><Icon name="mdi:map-marker" /> {{ contacts.location }}</p>
            </div>

            <!-- Social Links -->
            <div class="social-links">
              <h3 class="card-title">
              <Icon name="mdi:link-variant" />
              {{ $t('contact.cards.social.title') }}
            </h3>
              <a
                v-for="link in socialLinks"
                :key="link.name"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="link.name"
                class="social-link"
              >
                <Icon :name="link.icon" />
              </a>
            </div>

            <!-- Meeting Scheduler -->
            <ClientOnly>
              <MeetingScheduler />
            </ClientOnly>
          </div>
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">{{ $t('contact.form.nameCompany') }}</label>
              <input type="text" id="name" v-model="formData.name" required :disabled="isSubmitting">
            </div>
            <div class="form-group">
              <label for="email">{{ $t('contact.form.email') }}</label>
              <input type="email" id="email" v-model="formData.email" required :disabled="isSubmitting">
            </div>
            <div class="form-group">
              <label for="projectType">{{ $t('contact.form.projectType') }}</label>
              <select id="projectType" v-model="formData.projectType" :disabled="isSubmitting">
                <option value="">{{ $t('contact.form.projectTypePlaceholder') }}</option>
                <option value="web">{{ $t('contact.form.projectTypes.web') }}</option>
                <option value="mobile">{{ $t('contact.form.projectTypes.mobile') }}</option>
                <option value="fullstack">{{ $t('contact.form.projectTypes.fullstack') }}</option>
                <option value="consulting">{{ $t('contact.form.projectTypes.consulting') }}</option>
                <option value="other">{{ $t('contact.form.projectTypes.other') }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="message">{{ $t('contact.form.message') }}</label>
              <textarea id="message" v-model="formData.message" required :disabled="isSubmitting"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              <span v-if="isSubmitting">{{ $t('contact.form.submitting') }}</span>
              <span v-else>{{ $t('contact.form.submit') }}</span>
            </button>

            <!-- Submit Result Message -->
            <Transition name="fade">
              <div
                v-if="submitResult"
                :class="['submit-result', submitResult.success ? 'success' : 'error']"
              >
                <Icon :name="submitResult.success ? 'mdi:check-circle' : 'mdi:alert-circle'" />
                {{ submitResult.message }}
              </div>
            </Transition>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
const { t, locale } = useI18n();
const localePath = useLocalePath();

// 컨테이너 스크롤 상태를 레이아웃과 공유 (useState는 컴포넌트 간 전역 상태 공유)
const containerScrollY = useState('containerScrollY', () => 0);

// SEO 메타태그 설정
useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  ogTitle: () => t('seo.home.title'),
  ogDescription: () => t('seo.home.description'),
  ogImage: '/logo.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.home.title'),
  twitterDescription: () => t('seo.home.description'),
  twitterImage: '/logo.png',
})

// Typewriter texts - reactive to locale changes
const typewriterTexts = computed(() => [
  t('hero.typewriter.tech_partner'),
  t('hero.typewriter.web_mobile'),
  t('hero.typewriter.cross_platform'),
  t('hero.typewriter.maintenance')
]);

const currentText = ref('');
let currentIndex = 0;

// Watch for locale changes to reset typewriter
watch(locale, () => {
  currentIndex = 0;
  currentText.value = typewriterTexts.value[0];
});

// Data - reactive to locale
const aboutText = computed(() => t('about.description'));
const achievements = computed(() => [
  { label: t('about.achievements.projects'), value: '40+', icon: 'mdi:trophy-award' },
  { label: t('about.achievements.satisfaction'), value: '5.0/5.0', icon: 'mdi:star' },
  { label: t('about.achievements.costReduction'), value: '40%', icon: 'mdi:chart-timeline-variant-shimmer' },
  { label: t('about.achievements.uptime'), value: '99.9%', icon: 'mdi:server-network' }
]);
// Testimonials - use t() with array index for proper string resolution
const testimonials = computed(() => [
  {
    content: t('about.testimonials.items[0].content'),
    author: t('about.testimonials.items[0].author'),
    role: t('about.testimonials.items[0].role'),
    rating: 5
  },
  {
    content: t('about.testimonials.items[1].content'),
    author: t('about.testimonials.items[1].author'),
    role: t('about.testimonials.items[1].role'),
    rating: 5
  },
  {
    content: t('about.testimonials.items[2].content'),
    author: t('about.testimonials.items[2].author'),
    role: t('about.testimonials.items[2].role'),
    rating: 5
  }
]);

const contactText = computed(() => t('contact.description'));

// Expertise card items - use t() with array index for proper string resolution
const expertiseItems = computed(() => ({
  web: [
    t('expertise.cards.web.items[0]'),
    t('expertise.cards.web.items[1]'),
    t('expertise.cards.web.items[2]'),
    t('expertise.cards.web.items[3]')
  ],
  mobile: [
    t('expertise.cards.mobile.items[0]'),
    t('expertise.cards.mobile.items[1]'),
    t('expertise.cards.mobile.items[2]'),
    t('expertise.cards.mobile.items[3]')
  ],
  backend: [
    t('expertise.cards.backend.items[0]'),
    t('expertise.cards.backend.items[1]'),
    t('expertise.cards.backend.items[2]'),
    t('expertise.cards.backend.items[3]')
  ],
  stability: [
    t('expertise.cards.stability.items[0]'),
    t('expertise.cards.stability.items[1]'),
    t('expertise.cards.stability.items[2]'),
    t('expertise.cards.stability.items[3]')
  ]
}));

// Contact Form with Web3Forms
const { isSubmitting, submitResult, submitForm, resetForm } = useContactForm();
const { contacts, socialLinks } = useContactInfo();

const formData = ref({
  name: '',
  email: '',
  message: '',
  projectType: ''
});

// Projects Data from Composable
const { projects } = useProjects();

// Form submission handler
const handleSubmit = async () => {
  await submitForm(formData.value);
  if (submitResult.value?.success) {
    // Reset form on success
    formData.value = { name: '', email: '', message: '', projectType: '' };
    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      resetForm();
    }, 5000);
  }
};


// 이메일 복사
const emailCopied = ref(false);
const copyEmail = async () => {
  await navigator.clipboard.writeText(contacts.email);
  emailCopied.value = true;
  setTimeout(() => { emailCopied.value = false; }, 2000);
};

// 섹션 스크롤 이동 (앵커 링크용)
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

// 동적 뷰포트 높이 계산 (모바일 주소창 대응)
const updateViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// 컨테이너 스크롤 이벤트 핸들러 (레이아웃 헤더용)
const handleContainerScroll = () => {
  const el = document.querySelector('.main-container');
  if (el) {
    containerScrollY.value = el.scrollTop;
  }
};

onMounted(() => {
  // 뷰포트 높이 초기 설정 및 리사이즈 이벤트 등록
  updateViewportHeight();
  window.addEventListener('resize', updateViewportHeight);
  window.addEventListener('orientationchange', updateViewportHeight);

  // 컨테이너 스크롤 리스너
  const container = document.querySelector('.main-container');
  if (container) {
    container.addEventListener('scroll', handleContainerScroll, { passive: true });
  }

  // Typing effect - initialize and start interval
  currentText.value = typewriterTexts.value[0];
  setInterval(() => {
    currentIndex = (currentIndex + 1) % typewriterTexts.value.length;
    currentText.value = typewriterTexts.value[currentIndex];
  }, 3000);

  // Intersection Observer for scroll animations
  const observerRoot = document.querySelector('.main-container');
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, root: observerRoot });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Scroll indicator 클릭 시 expertise 섹션으로 이동
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const expertiseSection = document.getElementById('expertise');
      if (expertiseSection) {
        expertiseSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

onUnmounted(() => {
  const container = document.querySelector('.main-container');
  if (container) {
    container.removeEventListener('scroll', handleContainerScroll);
  }
  window.removeEventListener('resize', updateViewportHeight);
  window.removeEventListener('orientationchange', updateViewportHeight);
});
</script>

<style scoped>
.main-container {
  position: relative;
  width: 100%;
  height: 100dvh;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: y proximity;
  scroll-padding-top: calc(94px + 1rem);
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.main-container::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Opera */
}

.section {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px var(--space-xl);
  box-sizing: border-box;
  overflow: hidden;
  scroll-margin-top: 94px;
}

/* Only hero and contact get full-height snap behavior */
.hero-section,
.contact-section {
  min-height: 100dvh;
  scroll-snap-align: start;
}

/* Section dividers for visual separation */
.section:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(100, 255, 218, 0.2), transparent);
  pointer-events: none;
}

/* Hero Section */
.hero-section {
  position: relative;
  overflow: visible;
}

.hero-content {
  width: 100%;
  max-width: var(--container-lg);
  margin: 0 auto;
  text-align: center;
  position: relative;
}

.text-content {
  position: relative;
}

.animate-text {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  margin-bottom: var(--space-md);
  line-height: 1.2;
  background: linear-gradient(to right, #64ffda, #4af3ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards;
}

.highlight {
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  position: relative;
}

.hero-slogan {
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  color: #94a3b8;
  line-height: 1.8;
  max-width: 500px;
  margin: 0 auto var(--space-md);
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards 0.2s;
}

.typewriter {
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  color: #94a3b8;
  margin: var(--space-md) 0;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards 0.3s;
}

.cta-buttons {
  margin-top: var(--space-xl);
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards 0.6s;
}

/* Section Backgrounds */
.section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* backdrop-filter: blur(1px); */
  z-index: -1;
}

.projects-section::before {
  background: rgba(15, 23, 42, 0.2);
}

.about-section::before {
  background: rgba(15, 23, 42, 0.2);
}

.contact-section::before {
  background: rgba(15, 23, 42, 0.2);
}

/* Buttons */
.btn {
  padding: 0.8em 2em;
  border-radius: 4px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary,
.btn-secondary {
  background: rgba(148, 163, 184, 0.05);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #94a3b8;
}

.btn-primary:hover,
.btn-secondary:hover {
  background: rgba(100, 255, 218, 0.08);
  border-color: transparent;
  color: #64ffda;
  transform: translateY(-2px);
}

.btn-primary:hover::after,
.btn-secondary:hover::after,
.btn-primary:active::after,
.btn-secondary:active::after,
.btn-secondary.selected::after {
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

.btn-primary:active,
.btn-secondary:active {
  background: rgba(100, 255, 218, 0.15);
  border-color: transparent;
  color: #64ffda;
  transform: translateY(0);
}

.btn-secondary.selected {
  background: rgba(100, 255, 218, 0.08);
  border-color: transparent;
  color: #64ffda;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: fadeIn 0.8s ease forwards 1s;
}

.mouse {
  width: 26px;
  height: 42px;
  border: 2px solid #4af3ff;
  border-radius: 20px;
  position: relative;
}

.wheel {
  width: 3px;
  height: 8px;
  background-color: #4af3ff;
  border-radius: 2px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scrollWheel 1.6s ease-in-out infinite;
}

.scroll-text {
  color: #94a3b8;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

@keyframes scrollWheel {
  0% {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, 12px);
    opacity: 0;
  }
  51% {
    transform: translate(-50%, -12px);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

/* Responsive Styles */
@media (max-width: 768px) {
  .main-container {
    scroll-snap-type: none;
  }

  .section {
    padding: 80px var(--space-lg) 3rem;
    scroll-margin-top: 70px;
  }

  .hero-section {
    padding-top: 100px;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 250px;
    text-align: center;
  }

  .hero-slogan {
    max-width: 320px;
    font-size: clamp(0.85rem, 3.5vw, 1rem);
    line-height: 1.9;
  }

  .section-subtitle {
    max-width: 320px;
    font-size: 0.9rem;
  }

  .about-header {
    max-width: 100%;
  }

  .about-header .section-subtitle {
    max-width: 340px;
    font-size: 0.9rem;
    white-space: normal;
  }

  .testimonial-card {
    padding: 1.5rem;
  }

  .review-content {
    font-size: 0.9rem;
    line-height: 1.8;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 70px var(--space-md) 1.5rem;
  }

  .scroll-indicator {
    bottom: 1.5rem;
  }

  .hero-slogan {
    max-width: 280px;
  }
}

/* Landscape mode fix for short viewports */
@media (max-height: 500px) and (orientation: landscape) {
  .hero-section {
    min-height: auto;
    padding: 60px var(--space-lg) 2rem;
  }

  .animate-text {
    font-size: clamp(1.8rem, 4vw, 3rem);
  }

  .typewriter {
    font-size: clamp(1rem, 2vw, 1.3rem);
    margin: var(--space-sm) 0;
  }

  .cta-buttons {
    flex-direction: row;
    margin-top: var(--space-md);
  }

  .scroll-indicator {
    display: none;
  }
}

.section > .container {
  overflow: visible;
}

.expertise-section {
  padding: 100px var(--space-xl) var(--space-xxl);
}

.projects-section {
  padding-top: 100px;
}

.about-section {
  padding-top: 100px;
}

@media (max-width: 768px) {
  .expertise-section,
  .projects-section,
  .about-section {
    padding-top: 80px;
    padding-left: var(--space-lg);
    padding-right: var(--space-lg);
  }
}

@media (max-width: 480px) {
  .expertise-section,
  .projects-section,
  .about-section {
    padding-top: 70px;
    padding-left: var(--space-md);
    padding-right: var(--space-md);
  }
}

.expertise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-xl);
  margin-top: var(--space-xl);
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

.expertise-card {
  background: rgba(10, 25, 47, 0.7);
  border-radius: 12px;
  padding: var(--space-lg);
  transition: transform 0.3s ease;
  border: 1px solid rgba(100, 255, 218, 0.1);
  backdrop-filter: blur(10px);
}

.expertise-card {
  position: relative;
}

.expertise-card:hover {
  transform: translateY(-5px);
  border-color: transparent;
}

.expertise-card:hover::after {
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

.expertise-icon {
  font-size: 2.5rem;
  color: var(--accent-color);
  margin-bottom: var(--space-md);
}

.expertise-card h3 {
  color: var(--text-color-light);
  margin-bottom: var(--space-sm);
  font-size: 1.5rem;
}

.expertise-card p {
  color: var(--text-color);
  margin-bottom: var(--space-md);
  line-height: 1.6;
}

.expertise-list {
  list-style: none;
  padding: 0;
}

.expertise-list li {
  color: var(--text-color-light);
  margin-bottom: var(--space-xs);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.expertise-list li::before {
  content: "▹";
  color: var(--accent-color);
}

@media (min-width: 1200px) {
  .expertise-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .expertise-grid {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }

  .expertise-card {
    padding: var(--space-md);
  }
}

.project-image {
  aspect-ratio: 16/9;
  width: 100%;
  position: relative;
  overflow: hidden;
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

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 25, 47, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-overlay span {
  color: var(--accent-color);
  font-weight: 500;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  position: relative;
}

.project-overlay span::before {
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

/* Section Subtitle */
.section-subtitle {
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
}

/* About Section Styles */

.about-header {
  max-width: 800px;
  margin: 0 auto var(--space-xl);
}

.about-header .section-subtitle {
  max-width: 720px;
  line-height: 1.9;
  white-space: pre-line;
}

/* Statistics Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
  margin-bottom: var(--space-xxl);
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  background: rgba(17, 34, 64, 0.4);
  padding: var(--space-lg);
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
  margin-bottom: var(--space-xs);
}

.stat-label {
  color: var(--text-color);
  font-size: 0.9rem;
}

/* Testimonials */
.testimonials-title {
  margin-bottom: var(--space-xl);
  color: var(--text-color-light);
  font-size: 2rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

@media (min-width: 992px) {
  .testimonials-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.03);
  padding: 2rem;
  border-radius: 12px;
  position: relative;
  border: 1px solid rgba(100, 255, 218, 0.05);
  display: flex;
  flex-direction: column;
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
}

.author-info strong {
  color: var(--text-color-light);
  font-weight: 600;
}

.author-info span {
  font-size: 0.85rem;
  color: var(--text-color);
  opacity: 0.7;
}

.review-rating {
  color: #ffc107;
  font-size: 0.9rem;
  display: flex;
}

/* Contact Section Styles */
.contact-section {
  overflow: visible;
  justify-content: flex-start;
}

.contact-container {
  gap: 2rem;
}

.contact-info {
  background: rgba(11, 16, 33, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(74, 243, 255, 0.1);
  border-radius: 24px;
  padding: 2.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.contact-info {
  position: relative;
}

.contact-info:hover {
  border-color: transparent;
  transform: translateY(-5px);
}

.contact-info:hover::after {
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

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-details p, 
.contact-details a {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--text-color);
  font-size: 1rem;
  text-decoration: none;
}

.contact-details p .iconify,
.contact-details a .iconify {
  color: var(--accent-color);
  font-size: 1.2rem;
}

.contact-link:hover {
  color: var(--accent-color);
}

.email-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--text-color);
  opacity: 0.5;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.copy-btn:hover {
  opacity: 1;
  color: var(--accent-color);
}

.response-time {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  opacity: 0.8;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.social-links .card-title {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--accent-color);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.social-link {
  position: relative;
}

.social-link:hover {
  background: rgba(74, 243, 255, 0.1);
  border-color: transparent;
  color: var(--accent-color);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.social-link:hover::after {
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

.contact-form {
  background: rgba(11, 16, 33, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  height: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: var(--text-color-light);
  font-size: 0.9rem;
  font-weight: 500;
  margin-left: 0.2rem;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 1rem 1.2rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--text-color-light);
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--accent-color);
  background: rgba(74, 243, 255, 0.05);
  box-shadow: 0 0 0 4px rgba(74, 243, 255, 0.1);
}

.form-group select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364ffda' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1.2rem center;
}

.form-group select option {
  background: #0b1021;
  color: var(--text-color-light);
  padding: 10px;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.contact-form .btn-primary {
  margin-top: 1rem;
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  color: var(--bg-color);
  border: none;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 12px;
}

.contact-form .btn-primary:hover {
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  transform: translateY(-3px);
  box-shadow: 0 0 30px rgba(100, 255, 218, 0.4);
}

.submit-result {
  padding: 1rem;
  border-radius: 12px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.95rem;
}

.submit-result.success {
  background: rgba(74, 243, 255, 0.1);
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
}

.submit-result.error {
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid #ff6b6b;
  color: #ff6b6b;
}

.business-info {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.business-info p {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--text-color);
  font-size: 0.85rem;
}

.business-info p .iconify {
  color: var(--accent-color);
  font-size: 1rem;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .contact-info, .contact-form {
    padding: 1.5rem;
  }
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
