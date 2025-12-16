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
            <a href="#about" class="btn btn-primary">{{ $t('hero.cta.services') }}</a>
            <a href="#contact" class="btn btn-secondary">{{ $t('hero.cta.contact') }}</a>
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
            <p class="section-subtitle" style="white-space: pre-line;">{{ aboutText }}</p>
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
              <a :href="`mailto:${contacts.email}`" class="contact-link">
                <Icon name="mdi:email" /> {{ contacts.email }}
              </a>
              <p><Icon name="mdi:map-marker" /> {{ contacts.location }}</p>
              <p class="response-time">
                <Icon name="mdi:clock-outline" /> {{ $t('contact.responseTime') }}
              </p>
            </div>

            <!-- Social Links -->
            <div class="social-links">
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

// 섹션 스크롤 관련 상태
const sectionIds = ['home', 'expertise', 'projects', 'about', 'contact'];
const currentSectionIndex = ref(0);
const isScrolling = ref(false);
const mainContainer = ref(null);

// 컨테이너 스크롤 상태를 레이아웃과 공유 (useState는 컴포넌트 간 전역 상태 공유)
const containerScrollY = useState('containerScrollY', () => 0);

// 스크롤 민감도 설정 (둔감 설정)
const SCROLL_THRESHOLD = 350;      // 누적 임계값 (높을수록 덜 민감)
const SCROLL_RESET_DELAY = 400;    // 스크롤 멈추면 누적값 리셋 (ms)
const TOUCH_SWIPE_THRESHOLD = 200;  // 터치 스와이프 임계값 (px)
let accumulatedDelta = 0;
let scrollResetTimer = null;

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

// 섹션으로 스크롤하는 함수
const scrollToSection = (index) => {
  if (index < 0 || index >= sectionIds.length) return;

  const targetSection = document.getElementById(sectionIds[index]);
  if (targetSection && mainContainer.value) {
    isScrolling.value = true;
    currentSectionIndex.value = index;

    mainContainer.value.scrollTo({
      top: targetSection.offsetTop,
      behavior: 'smooth'
    });

    // 스크롤 애니메이션 완료 후 잠금 해제
    setTimeout(() => {
      isScrolling.value = false;
    }, 800);
  }
};

// 스크롤 가능한 부모 요소 찾기
const findScrollableParent = (element) => {
  while (element && element !== mainContainer.value) {
    const style = window.getComputedStyle(element);
    const overflowY = style.overflowY;
    const isScrollable = overflowY === 'auto' || overflowY === 'scroll';
    const hasScrollableContent = element.scrollHeight > element.clientHeight;

    if (isScrollable && hasScrollableContent) {
      return element;
    }
    element = element.parentElement;
  }
  return null;
};

// 휠 이벤트 핸들러
const handleWheel = (e) => {
  if (isScrolling.value) {
    e.preventDefault();
    return;
  }

  // Last Section Logic (Contact Section)
  const isLastSection = currentSectionIndex.value === sectionIds.length - 1;
  if (isLastSection) {
    const contactSection = document.getElementById('contact');
    if (contactSection && mainContainer.value) {
      const mainScrollTop = mainContainer.value.scrollTop;
      const sectionTop = contactSection.offsetTop;
      
      // Check if we are at the top of the contact section (with tolerance)
      // Usually strict equality is fine, but tolerance helps with sub-pixel issues
      const atTop = mainScrollTop <= sectionTop + 1; 

      if (e.deltaY < 0 && atTop) {
        // Scrolling UP at the top -> Go to previous section
        // We let the standard logic below handle the snap-up
      } else {
        // Scrolling DOWN or Scrolling UP while NOT at top -> Allow native scroll
        // IMPORTANT: checks for bottom boundary in standard logic would prevent scroll,
        // so we return early here to allow native behavior.
        // We only want to prevent default if we are specifically triggering a section transition.
        return; 
      }
    }
  }

  // 스크롤 가능한 내부 요소 찾기
  const scrollableElement = findScrollableParent(e.target);

  if (scrollableElement) {
    const { scrollTop, scrollHeight, clientHeight } = scrollableElement;
    const isAtTop = scrollTop <= 1;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;

    // 내부 스크롤이 아직 가능하면 허용 (기본 동작)
    if ((scrollingDown && !isAtBottom) || (scrollingUp && !isAtTop)) {
      // 내부 스크롤 시 누적값 리셋
      accumulatedDelta = 0;
      return; // 내부 스크롤 허용
    }
  }

  // 내부 스크롤이 없거나 끝에 도달했으면 섹션 스크롤
  e.preventDefault();

  // 스크롤 누적
  accumulatedDelta += e.deltaY;

  // 리셋 타이머 재설정 (스크롤을 멈추면 누적값 초기화)
  clearTimeout(scrollResetTimer);
  scrollResetTimer = setTimeout(() => {
    accumulatedDelta = 0;
  }, SCROLL_RESET_DELAY);

  // 임계값 도달 시에만 섹션 이동
  if (accumulatedDelta >= SCROLL_THRESHOLD) {
    // If at last section, we don't snap to next (there is no next)
    if (currentSectionIndex.value < sectionIds.length - 1) {
       scrollToSection(currentSectionIndex.value + 1);
       accumulatedDelta = 0;
    }
  } else if (accumulatedDelta <= -SCROLL_THRESHOLD) {
    scrollToSection(currentSectionIndex.value - 1);
    accumulatedDelta = 0;
  }
};

// 키보드 이벤트 핸들러
const handleKeydown = (e) => {
  if (isScrolling.value) return;

  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    e.preventDefault();
    scrollToSection(currentSectionIndex.value + 1);
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    e.preventDefault();
    scrollToSection(currentSectionIndex.value - 1);
  } else if (e.key === 'Home') {
    e.preventDefault();
    scrollToSection(0);
  } else if (e.key === 'End') {
    e.preventDefault();
    scrollToSection(sectionIds.length - 1);
  }
};

// 터치 이벤트 핸들러
let touchStartY = 0;
let touchStartElement = null;

const handleTouchStart = (e) => {
  touchStartY = e.touches[0].clientY;
  touchStartElement = e.target;
};

const handleTouchEnd = (e) => {
  if (isScrolling.value) return;

  const touchEndY = e.changedTouches[0].clientY;
  const diff = touchStartY - touchEndY;

  // 최소 TOUCH_SWIPE_THRESHOLD 이상 스와이프해야 섹션 이동
  if (Math.abs(diff) > TOUCH_SWIPE_THRESHOLD) {
    // 스크롤 가능한 내부 요소 찾기
    const scrollableElement = findScrollableParent(touchStartElement);

    if (scrollableElement) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableElement;
      const isAtTop = scrollTop <= 1;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      const swipingDown = diff > 0; // 손가락을 위로 올림 = 아래로 스크롤
      const swipingUp = diff < 0;   // 손가락을 아래로 내림 = 위로 스크롤

      // 내부 스크롤이 아직 가능하면 섹션 스크롤 하지 않음
      if ((swipingDown && !isAtBottom) || (swipingUp && !isAtTop)) {
        return; // 내부 스크롤이 자연스럽게 처리됨
      }
    }

    // 섹션 스크롤 실행
    if (diff > 0) {
      scrollToSection(currentSectionIndex.value + 1);
    } else {
      scrollToSection(currentSectionIndex.value - 1);
    }
  }
};

// 동적 뷰포트 높이 계산 (모바일 주소창 대응)
const updateViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// 컨테이너 스크롤 이벤트 핸들러 (레이아웃 헤더용)
const handleContainerScroll = () => {
  if (mainContainer.value) {
    containerScrollY.value = mainContainer.value.scrollTop;
  }
};

// Smooth scroll implementation
onMounted(() => {
  // 뷰포트 높이 초기 설정 및 리사이즈 이벤트 등록
  updateViewportHeight();
  window.addEventListener('resize', updateViewportHeight);
  window.addEventListener('orientationchange', updateViewportHeight);

  // main-container 참조 설정
  mainContainer.value = document.querySelector('.main-container');

  // 휠 이벤트 리스너 추가
  if (mainContainer.value) {
    mainContainer.value.addEventListener('wheel', handleWheel, { passive: false });
    mainContainer.value.addEventListener('touchstart', handleTouchStart, { passive: true });
    mainContainer.value.addEventListener('touchend', handleTouchEnd, { passive: true });
    mainContainer.value.addEventListener('scroll', handleContainerScroll, { passive: true });
  }

  // 키보드 이벤트 리스너 추가
  document.addEventListener('keydown', handleKeydown);

  // Typing effect - initialize and start interval
  currentText.value = typewriterTexts.value[0];
  setInterval(() => {
    currentIndex = (currentIndex + 1) % typewriterTexts.value.length;
    currentText.value = typewriterTexts.value[currentIndex];
  }, 3000);

  // 앵커 링크 클릭 시 섹션 인덱스 업데이트
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const targetId = href.replace('#', '');
      const targetIndex = sectionIds.indexOf(targetId);

      if (targetIndex !== -1) {
        scrollToSection(targetIndex);
      }
    });
  });

  // Intersection Observer for scroll animations
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px'
    }
  );

  sections.forEach(section => {
    observer.observe(section);
  });

  // Scroll indicator 클릭 시 다음 섹션으로 이동
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      scrollToSection(currentSectionIndex.value + 1);
    });
  }

  // Clean up
  onUnmounted(() => {
    if (mainContainer.value) {
      mainContainer.value.removeEventListener('wheel', handleWheel);
      mainContainer.value.removeEventListener('touchstart', handleTouchStart);
      mainContainer.value.removeEventListener('touchend', handleTouchEnd);
      mainContainer.value.removeEventListener('scroll', handleContainerScroll);
    }
    document.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('resize', updateViewportHeight);
    window.removeEventListener('orientationchange', updateViewportHeight);
  });
});
</script>

<style scoped>
.main-container {
  position: relative;
  width: 100%;
  /* 동적 뷰포트 높이: dvh > --vh 변수 > vh 순으로 폴백 */
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  height: 100dvh;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
  /* 스크롤바 숨김 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.main-container::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Opera */
}

.section {
  position: relative;
  /* 동적 뷰포트 높이: dvh > --vh 변수 > vh 순으로 폴백 */
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  height: 100dvh;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px var(--space-xl);
  scroll-margin-top: 120px;
  box-sizing: border-box;
  overflow: hidden; /* 콘텐츠가 넘치면 숨김 */
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
  color: #4af3ff;
  position: relative;
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

.btn-primary {
  background: rgba(148, 163, 184, 0.1);
  border: 1px solid #94a3b8;
  color: #94a3b8;
}

.btn-primary:hover {
  background: rgba(74, 243, 255, 0.2);
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(74, 243, 255, 0.1);
  border: 1px solid #4af3ff;
  color: #4af3ff;
}

.btn-secondary:hover {
  background: rgba(148, 163, 184, 0.2);
  transform: translateY(-2px);
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
  .section {
    padding: 0 var(--space-lg);
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
}

@media (max-width: 480px) {
  .section {
    padding: 0 var(--space-md);
  }

  .scroll-indicator {
    bottom: 1.5rem;
  }
}

/* 콘텐츠가 많은 섹션을 위한 내부 스크롤 컨테이너 */
.section > .container {
  max-height: 90%;
  overflow-y: auto;
  overflow-x: hidden;
  /* 내부 스크롤바 스타일링 */
  scrollbar-width: thin;
  scrollbar-color: rgba(100, 255, 218, 0.3) transparent;
}

.section > .container::-webkit-scrollbar {
  width: 4px;
}

.section > .container::-webkit-scrollbar-track {
  background: transparent;
}

.section > .container::-webkit-scrollbar-thumb {
  background: rgba(100, 255, 218, 0.3);
  border-radius: 2px;
}

.expertise-section {
  padding: var(--space-xxl) 0;
}

.projects-section {
  padding-top: var(--space-xxl);
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

.expertise-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-color);
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
  border: 1px solid var(--accent-color);
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

/* About Section Styles */
.about-section {
  padding-top: var(--space-xxl);
}

.about-header {
  max-width: 800px;
  margin: 0 auto var(--space-xl);

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
  height: auto !important;
  min-height: 100dvh;
  overflow: visible !important;
  justify-content: flex-start; /* Align content to top if needed, or keeping center is fine but auto height implies flow */
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

.contact-info:hover {
  border-color: rgba(74, 243, 255, 0.3);
  transform: translateY(-5px);
}

.contact-details {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.response-time {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  opacity: 0.8;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
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

.social-link:hover {
  background: rgba(74, 243, 255, 0.1);
  border-color: var(--accent-color);
  color: var(--accent-color);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
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
  background: var(--accent-color);
  color: var(--bg-color);
  border: none;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 12px;
}

.contact-form .btn-primary:hover {
  background: var(--accent-color);
  transform: translateY(-3px);
  box-shadow: 0 0 30px rgba(74, 243, 255, 0.4);
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
