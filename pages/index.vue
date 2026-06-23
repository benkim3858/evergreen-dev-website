<template>
  <main class="main-container">
    <!-- Background is provided by SpaceBackground in default layout -->
    
    <!-- Hero Section -->
    <section id="home" class="section hero-section">
      <div class="hero-content">
        <div class="text-content">
          <h1 class="animate-text">
            {{ $t('hero.headline1') }}<br>
            <span class="highlight">{{ $t('hero.headline2') }}</span>
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

    <!-- Story Section -->
    <section id="story" class="section story-section">
      <div class="container story-inner">
        <p class="story-eyebrow story-reveal">{{ $t('story.eyebrow') }}</p>

        <h2 class="story-lead story-reveal">
          {{ $t('story.lead1') }}<br>
          <span class="story-dim">{{ $t('story.lead2') }}</span>
        </h2>

        <p class="story-block story-reveal">
          {{ $t('story.block1a') }}<br>
          {{ $t('story.block1b') }}
        </p>
        <p class="story-block is-dim story-reveal">
          {{ $t('story.block2a') }}<br>
          {{ $t('story.block2b') }}
        </p>

        <figure class="story-pullquote story-reveal">
          <p class="story-pullquote-main">{{ $t('story.quoteMain') }}</p>
          <figcaption class="story-pullquote-sub">{{ $t('story.quoteSub') }}</figcaption>
        </figure>

        <p class="story-turn story-reveal">
          {{ $t('story.turnPre') }}<span class="highlight">{{ $t('story.turnEmph') }}</span>{{ $t('story.turnPost') }}
        </p>

        <p class="story-proof story-reveal">{{ $t('story.proof') }}</p>

        <p class="story-closing story-reveal">
          {{ $t('story.closing1') }}<br>
          {{ $t('story.closing2') }}
        </p>
      </div>
    </section>

    <!-- Expertise Section -->
    <section id="expertise" class="section expertise-section">
      <div class="container">
        <h2 class="section-title text-center story-reveal">{{ $t('expertise.title') }}</h2>
        <div class="expertise-grid">
          <div class="expertise-card featured-card story-reveal">
            <span class="featured-badge">CORE</span>
            <div class="featured-body">
              <div class="featured-lead">
                <div class="expertise-icon">
                  <Icon name="mdi:robot-outline" />
                </div>
                <h3>{{ $t('expertise.cards.ai.title') }}</h3>
                <p>{{ $t('expertise.cards.ai.description') }}</p>
              </div>
              <ul class="expertise-list featured-list">
                <li v-for="item in expertiseItems.ai" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>

          <div class="expertise-card featured-card story-reveal">
            <div class="featured-body">
              <div class="featured-lead">
                <div class="expertise-icon">
                  <Icon name="mdi:monitor-cellphone" />
                </div>
                <h3>{{ $t('expertise.cards.webMobile.title') }}</h3>
                <p>{{ $t('expertise.cards.webMobile.description') }}</p>
              </div>
              <ul class="expertise-list featured-list">
                <li v-for="item in expertiseItems.webMobile" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>

          <div class="expertise-card featured-card story-reveal">
            <div class="featured-body">
              <div class="featured-lead">
                <div class="expertise-icon">
                  <Icon name="mdi:server-network" />
                </div>
                <h3>{{ $t('expertise.cards.backendOps.title') }}</h3>
                <p>{{ $t('expertise.cards.backendOps.description') }}</p>
              </div>
              <ul class="expertise-list featured-list">
                <li v-for="item in expertiseItems.backendOps" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section projects-section">
      <div class="container">
        <h2 class="section-title text-center">{{ $t('projects.title') }}</h2>
        <div class="grid grid-1 grid-2-sm grid-3-md">
          <article v-for="project in homeProjects"
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

        <!-- Demo 시연 홈페이지 CTA — full-width (Our Services featured 톤 + 회전 그라데이션 테두리) -->
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

    <!-- About Section -->
    <section id="about" class="section about-section">
      <div class="container">
        <div class="about-content">
          <div class="about-header text-center">
            <h2 class="section-title">{{ $t('about.teamTitle') }}</h2>
          </div>

          <!-- Founder 소개 (대표) — 흑백→컬러 hover -->
          <div class="founder-card story-reveal">
            <div class="founder-photo">
              <img src="/founder.png" :alt="$t('about.founder.name')" loading="lazy" width="394" height="551" />
            </div>
            <div class="founder-info">
              <p class="founder-role">{{ $t('about.founder.role') }}</p>
              <h3 class="founder-name">{{ $t('about.founder.name') }}</h3>
              <p class="founder-bio">{{ $t('about.founder.bio') }}</p>
            </div>
          </div>

          <!-- Team Teaser -->
          <div class="team-teaser">
            <p class="team-teaser-heading">{{ $t('about.teamTeaser.heading') }}</p>
            <div class="team-teaser-avatars">
              <div v-for="member in teamTeaser" :key="member.name" class="teaser-member">
                <div class="teaser-avatar">
                  <Icon :name="member.icon" />
                </div>
                <span class="teaser-name">{{ member.name }}</span>
                <span class="teaser-role">{{ member.role }}</span>
              </div>
            </div>
            <NuxtLink :to="localePath('/about')" class="team-teaser-cta">
              {{ $t('about.teamTeaser.cta') }}
              <Icon name="mdi:arrow-right" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="section faq-section">
      <div class="container">
        <h2 class="section-title text-center">{{ $t('faq.title') }}</h2>
        <p class="section-subtitle text-center">{{ $t('faq.subtitle') }}</p>
        <div class="faq-list">
          <details
            v-for="(item, i) in faqItems"
            :key="i"
            class="faq-item story-reveal"
            :open="i === 0"
          >
            <summary class="faq-question">
              <span>{{ item.q }}</span>
              <span class="faq-chevron-wrap">
                <Icon name="mdi:chevron-down" class="faq-chevron" />
              </span>
            </summary>
            <div class="faq-answer">
              <p>{{ item.a }}</p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <!-- Testimonials Section — CTA 직전 social proof (결정 순간 배치) -->
    <section id="testimonials" class="section testimonials-section">
      <div class="container">
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
const { t, locale, tm, rt } = useI18n();
const localePath = useLocalePath();

// FAQ 데이터 (i18n 배열). DOM에 항상 렌더 + FAQPage JSON-LD로 AI 검색/리치결과 대응.
const faqItems = computed(() => {
  const items = tm('faq.items');
  return Array.isArray(items)
    ? items.map((item) => ({ q: rt(item.q), a: rt(item.a) }))
    : [];
});

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      key: 'faq-jsonld',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.value.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }),
    },
  ],
}));

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
  t('hero.typewriter.ai'),
  t('hero.typewriter.web'),
  t('hero.typewriter.backend'),
  t('hero.typewriter.saas')
]);

const currentText = ref('');
let currentIndex = 0;

// Watch for locale changes to reset typewriter
watch(locale, () => {
  currentIndex = 0;
  currentText.value = typewriterTexts.value[0];
});

// Data - reactive to locale
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

const teamTeaser = [
  { name: 'Sena', role: 'PM', icon: 'mdi:lightbulb-outline' },
  { name: 'Betty', role: 'Design', icon: 'mdi:palette-outline' },
  { name: 'Ben', role: 'Dev', icon: 'mdi:code-braces' },
  { name: 'Jhin', role: 'Dev', icon: 'mdi:code-braces' }
];

const contactText = computed(() => t('contact.description'));

// Expertise card items - use t() with array index for proper string resolution
const expertiseItems = computed(() => ({
  ai: [
    t('expertise.cards.ai.items[0]'),
    t('expertise.cards.ai.items[1]'),
    t('expertise.cards.ai.items[2]'),
    t('expertise.cards.ai.items[3]')
  ],
  webMobile: [
    t('expertise.cards.webMobile.items[0]'),
    t('expertise.cards.webMobile.items[1]'),
    t('expertise.cards.webMobile.items[2]'),
    t('expertise.cards.webMobile.items[3]'),
    t('expertise.cards.webMobile.items[4]'),
    t('expertise.cards.webMobile.items[5]'),
    t('expertise.cards.webMobile.items[6]'),
    t('expertise.cards.webMobile.items[7]')
  ],
  backendOps: [
    t('expertise.cards.backendOps.items[0]'),
    t('expertise.cards.backendOps.items[1]'),
    t('expertise.cards.backendOps.items[2]'),
    t('expertise.cards.backendOps.items[3]'),
    t('expertise.cards.backendOps.items[4]'),
    t('expertise.cards.backendOps.items[5]'),
    t('expertise.cards.backendOps.items[6]'),
    t('expertise.cards.backendOps.items[7]')
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

// 홈 Featured Works 표시용 — 일부 프로젝트는 홈에서 숨김(/projects 페이지엔 전체 노출)
const HOME_HIDDEN_PROJECTS = ['ecommerce-platform', 'loan-matching', 'e-signature', 'edtech-lms'];
const homeProjects = computed(() => projects.value.filter(p => !HOME_HIDDEN_PROJECTS.includes(p.id)));

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

  // Story 섹션 — 요소별 스크롤 리빌 (#work 패턴: 진입 시 in, 완전히 벗어나면 리셋 → 재진입 리플레이)
  const storyEls = document.querySelectorAll('.story-reveal');
  const storyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
      } else if (entry.intersectionRatio === 0) {
        entry.target.classList.remove('is-in');
      }
    });
  }, { threshold: [0, 0.15], root: observerRoot, rootMargin: '0px 0px -8% 0px' });
  storyEls.forEach(el => storyObserver.observe(el));

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
  font-size: clamp(2.4rem, 5.4vw, 4.4rem);
  font-weight: 700;
  margin-bottom: var(--space-lg);
  line-height: 1.16;
  letter-spacing: -0.025em;
  color: var(--text-color-light);
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
.btn-secondary:active::after {
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

/* 그라데이션 테두리 — 테두리(1.5px)만 그라데이션, 안쪽은 연한 글래스 단색 배경.
   mask 트릭(content-box xor) + inset:0 으로 .btn overflow:hidden 클립 회피. */
.btn-secondary.selected {
  background: rgba(100, 255, 218, 0.08);
  border-color: transparent;
  color: #64ffda;
}
.btn-secondary.selected:hover {
  background: rgba(100, 255, 218, 0.14);
}
/* 회전하는 그라데이션 테두리 — conic-gradient를 --border-angle 회전시켜
   빛이 테두리를 따라 도는 효과. @property로 angle 보간. */
@property --border-angle {
  syntax: "<angle>";
  initial-value: 120deg;
  inherits: false;
}
.btn-secondary.selected::after,
.btn-secondary.selected:hover::after {
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
@keyframes borderAngleRotate {
  to { --border-angle: 480deg; }
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
  position: relative;
  background: rgba(10, 25, 47, 0.7);
  border-radius: 12px;
  padding: var(--space-lg);
  transition: transform 0.3s ease, border-color 0.3s ease;
  border: 1px solid rgba(100, 255, 218, 0.1);
  backdrop-filter: blur(10px);
}

/* 상단 그라데이션 액센트 — hover 시 좌→우로 확장 (미묘한 시그니처) */
.expertise-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: var(--space-lg);
  width: 0;
  height: 2px;
  border-radius: 0 0 2px 2px;
  background: linear-gradient(90deg, #64ffda, #4af3ff, #a78bfa);
  transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.expertise-card:hover::before {
  width: 56px;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.4rem;
  height: 3.4rem;
  font-size: 1.7rem;
  border-radius: 12px;
  color: #64ffda;
  background: rgba(100, 255, 218, 0.07);
  border: 1px solid rgba(100, 255, 218, 0.18);
  margin-bottom: var(--space-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.expertise-card:hover .expertise-icon {
  transform: translateY(-3px);
  box-shadow: 0 8px 22px rgba(100, 255, 218, 0.22);
  border-color: rgba(100, 255, 218, 0.4);
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

/* Featured 카드 (AI · AX) — full-width, 가로 레이아웃, 그라데이션 강조 */
.featured-card {
  grid-column: 1 / -1;
  padding: var(--space-xl);
  background:
    radial-gradient(130% 150% at 0% 0%, rgba(100, 255, 218, 0.08), transparent 52%),
    radial-gradient(120% 160% at 100% 100%, rgba(167, 139, 250, 0.07), transparent 50%),
    rgba(10, 25, 47, 0.72);
  border-color: rgba(100, 255, 218, 0.26);
}
.featured-card:hover {
  transform: none;
}
.featured-card:hover::before {
  width: 0;
}
.featured-badge {
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  padding: 0.34em 0.9em;
  border-radius: 999px;
  color: #06121f;
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
}
.featured-body {
  display: flex;
  align-items: center;
  gap: var(--space-xxl);
}
.featured-lead {
  flex: 1 1 52%;
  min-width: 0;
}
.featured-card .expertise-icon {
  width: 4rem;
  height: 4rem;
  font-size: 2.1rem;
  background: linear-gradient(135deg, rgba(100, 255, 218, 0.16), rgba(167, 139, 250, 0.16));
  border-color: rgba(100, 255, 218, 0.3);
  color: #9af5e4;
}
.featured-card h3 {
  font-size: clamp(1.6rem, 3vw, 2rem);
}
.featured-card p {
  margin-bottom: 0;
  max-width: 42ch;
}
.featured-list {
  flex: 1 1 48%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm) var(--space-lg);
  align-content: center;
}
.featured-list li {
  font-size: 1.02rem;
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

  .featured-card {
    padding: var(--space-lg);
  }
  .featured-body {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-lg);
  }
  .featured-list {
    grid-template-columns: 1fr;
    width: 100%;
    gap: var(--space-xs) var(--space-lg);
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

/* Demo 시연 CTA — full-width 배너 (Our Services featured 톤 + 회전 그라데이션 테두리) */
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
/* 회전 그라데이션 테두리 — '파트너 상담 시작' 버튼과 동일 인터랙션 */
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

/* Founder 소개 — 세로 레이아웃(레퍼런스): 큰 사진 위 + 캡션 아래, 흑백→컬러 hover */
.founder-card {
  display: flex;
  flex-direction: column;
  max-width: 360px;
  margin: 0 auto var(--space-xxl);
  text-decoration: none;
}
/* 큰 인물 사진 (세로 라운드 사각) — 신뢰감, 그라데이션 보더 + 글로우 */
.founder-photo {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 20px;
  padding: 2px;
  background: linear-gradient(150deg, #64ffda, #4af3ff, #a78bfa);
  box-shadow: 0 18px 44px rgba(2, 12, 27, 0.5);
  margin-bottom: var(--space-lg);
  overflow: hidden;
}
.founder-photo img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 18px;
  object-fit: cover;
  object-position: center 15%;
  /* 흑백 + 명암 보정 (색조는 ::after 듀오톤 overlay가 담당 — hue-rotate 미사용) */
  filter: grayscale(100%) contrast(1.1) brightness(0.88);
  transition: filter 0.5s ease;
}
/* 홈 스페이스 블루 톤 cool 듀오톤 — mix-blend overlay.
   hue-rotate 전환 시 보라색을 거치던 문제 제거(grayscale+opacity만 보간). */
.founder-photo::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 18px;
  background: linear-gradient(155deg, #1c4f78, #0d2c49);
  mix-blend-mode: color;
  opacity: 0.55;
  transition: opacity 0.5s ease;
  pointer-events: none;
}
@media (hover: hover) {
  .founder-card:hover .founder-photo img { filter: grayscale(0%) contrast(1) brightness(1); }
  .founder-card:hover .founder-photo::after { opacity: 0; }
}
@media (hover: none) {
  /* 터치기기는 hover 불가 → 기본 컬러로 표시 */
  .founder-photo img { filter: grayscale(0%) contrast(1) brightness(1); }
  .founder-photo::after { opacity: 0; }
}
.founder-info {
  text-align: left;
  padding: 0 0.25rem;
}
/* eyebrow — 직함(레퍼런스 CEO / VISIONARY 톤) */
.founder-role {
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin: 0 0 0.5rem;
}
.founder-name {
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-color-light);
  margin: 0 0 var(--space-sm);
}
.founder-bio {
  font-size: 0.98rem;
  line-height: 1.65;
  color: var(--text-color);
  margin: 0;
}
@media (prefers-reduced-motion: reduce) {
  .founder-photo img { transition: none; }
}


/* Team Teaser */
.team-teaser {
  text-align: center;
  margin-bottom: var(--space-xxl);
}

.team-teaser-heading {
  color: var(--text-color-light);
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: var(--space-xl);
}

.team-teaser-avatars {
  display: flex;
  justify-content: center;
  gap: var(--space-xl);
  margin-bottom: var(--space-xl);
  flex-wrap: wrap;
}

.teaser-member {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.teaser-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(100, 255, 218, 0.1), rgba(167, 139, 250, 0.1));
  border: 1px solid rgba(100, 255, 218, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--accent-color);
  transition: all 0.3s ease;
  margin-bottom: 0.25rem;
}

.teaser-member:hover .teaser-avatar {
  border-color: transparent;
  background: linear-gradient(135deg, rgba(100, 255, 218, 0.2), rgba(167, 139, 250, 0.2));
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(100, 255, 218, 0.15);
}

.teaser-name {
  color: var(--text-color-light);
  font-size: 1rem;
  font-weight: 600;
}

.teaser-role {
  font-size: 0.85rem;
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.team-teaser-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-color);
  font-size: 1rem;
  text-decoration: none;
  padding: 0.6rem 1.25rem;
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 24px;
  transition: all 0.3s ease;
}

.team-teaser-cta:hover {
  background: rgba(100, 255, 218, 0.08);
  border-color: rgba(100, 255, 218, 0.4);
}

@media (max-width: 480px) {
  .team-teaser-avatars {
    gap: var(--space-lg);
  }

  .teaser-avatar {
    width: 64px;
    height: 64px;
    font-size: 1.6rem;
  }

  .teaser-name {
    font-size: 0.9rem;
  }
}

/* Testimonials */
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
  position: relative;
  background: rgba(11, 16, 33, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid transparent;
  border-radius: 24px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  height: 100%;
}
/* 카드 전체 회전 그라데이션 테두리 — '파트너 상담 시작' 버튼과 동일 인터랙션 */
.contact-form::after {
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
@media (prefers-reduced-motion: reduce) {
  .contact-form::after {
    animation: none;
    background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  }
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
/* FAQ Section */
.faq-list {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.faq-item {
  position: relative;
  background: rgba(10, 25, 47, 0.5);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
  /* 2026 모던: height auto 보간 허용 (미지원 브라우저는 즉시 펼침) */
  interpolate-size: allow-keywords;
}
.faq-item:hover {
  border-color: rgba(100, 255, 218, 0.28);
  background: rgba(10, 25, 47, 0.7);
}
.faq-item[open] {
  border-color: rgba(100, 255, 218, 0.32);
  background: rgba(10, 25, 47, 0.72);
}
/* open 시 좌측 그라데이션 액센트 바 (signature, story pullquote와 일관) */
.faq-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #64ffda, #4af3ff, #a78bfa);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.faq-item[open]::before {
  transform: scaleY(1);
}
.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--text-color-light, #ccd6f6);
  list-style: none;
  transition: color 0.3s ease;
}
.faq-question::-webkit-details-marker {
  display: none;
}
.faq-item:hover .faq-question,
.faq-item[open] .faq-question {
  color: #d8e4ff;
}
/* chevron 원형 칩 */
.faq-chevron-wrap {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(100, 255, 218, 0.08);
  border: 1px solid rgba(100, 255, 218, 0.18);
  transition: background 0.3s ease, border-color 0.3s ease;
}
.faq-item[open] .faq-chevron-wrap {
  background: rgba(100, 255, 218, 0.14);
  border-color: rgba(100, 255, 218, 0.4);
}
.faq-chevron {
  font-size: 1.25rem;
  color: var(--accent-color, #64ffda);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.faq-item[open] .faq-chevron {
  transform: rotate(180deg);
}
.faq-answer {
  padding: 0 1.5rem 1.25rem;
  color: var(--text-color, #8892b0);
  line-height: 1.7;
}
.faq-answer p {
  margin: 0;
}
/* 부드러운 펼침 — ::details-content 높이 보간 (Chrome/Edge 2026, 미지원은 즉시) */
.faq-item::details-content {
  height: 0;
  overflow: hidden;
  opacity: 0;
  transition:
    height 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.4s ease,
    content-visibility 0.4s allow-discrete;
  content-visibility: hidden;
}
.faq-item[open]::details-content {
  height: auto;
  opacity: 1;
  content-visibility: visible;
}
@media (prefers-reduced-motion: reduce) {
  .faq-item::details-content {
    transition: none;
  }
  .faq-item::before {
    transition: none;
  }
}

/* ===========================================
   Story Section — 다크/그라데이션 톤 매니페스토 내러티브
   =========================================== */
.story-section {
  display: flex;
  align-items: center;
}
.story-inner {
  max-width: 880px;
}
.story-eyebrow {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: var(--space-xl);
}
.story-lead {
  font-size: clamp(1.8rem, 4.2vw, 3.1rem);
  font-weight: 700;
  line-height: 1.34;
  letter-spacing: -0.02em;
  color: var(--text-color-light);
  margin-bottom: var(--space-xxl);
}
.story-lead .story-dim {
  color: #56688c;
}
.story-block {
  font-size: clamp(1.1rem, 2.2vw, 1.5rem);
  font-weight: 500;
  line-height: 1.6;
  color: var(--text-color-light);
  max-width: 44ch;
  margin-bottom: var(--space-lg);
}
.story-block.is-dim {
  color: #7585a3;
  font-weight: 400;
}
/* Editorial pull-quote — 카드(배경/보더/blur) 제거, 타이포로 승부.
   유일한 장식: 좌측 얇은 그라데이션 헤어라인 (signature). */
.story-pullquote {
  position: relative;
  margin: calc(var(--space-xxl) * 1.4) 0;
  padding-left: clamp(1.25rem, 3vw, 2.25rem);
}
.story-pullquote::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.18em;
  bottom: 0.18em;
  width: 2px;
  border-radius: 2px;
  background: linear-gradient(180deg, #64ffda, #4af3ff, #a78bfa);
}
.story-pullquote-main {
  font-size: clamp(1.9rem, 4.6vw, 3.2rem);
  font-weight: 700;
  line-height: 1.22;
  letter-spacing: -0.025em;
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: var(--space-md);
}
.story-pullquote-sub {
  font-size: clamp(1rem, 1.9vw, 1.2rem);
  line-height: 1.65;
  color: var(--text-color);
  max-width: 42ch;
  margin: 0;
}
.story-turn {
  font-size: clamp(1.4rem, 2.9vw, 2.1rem);
  font-weight: 600;
  line-height: 1.4;
  color: #56688c;
  margin-bottom: var(--space-xl);
  max-width: 44ch;
}
.story-turn .highlight {
  font-weight: 700;
}
.story-proof {
  font-size: clamp(1.05rem, 2vw, 1.35rem);
  line-height: 1.65;
  color: var(--text-color);
  max-width: 46ch;
  margin-bottom: var(--space-xl);
}
.story-closing {
  font-size: clamp(1.3rem, 2.6vw, 1.9rem);
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: var(--text-color-light);
  max-width: 42ch;
}

/* 스크롤 리빌 — 각 요소가 뷰포트 진입 시 개별 트리거(#work 패턴).
   완전히 벗어나면 리셋 → 재진입마다 리플레이. 스크롤하며 한 문장씩 등장. */
.story-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}
.story-reveal.is-in {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .story-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .btn-secondary.selected::after,
  .btn-secondary.selected:hover::after,
  .demo-cta-card::after {
    animation: none;
    background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  }
}
</style>
