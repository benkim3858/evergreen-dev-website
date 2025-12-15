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
            언제나 푸른 상록수처럼,<br>
            클라이언트의 비즈니스를 지속 가능하게 만드는 기술 파트너
          </p>
          <p class="typewriter">{{ currentText }}</p>
          <div class="cta-buttons">
            <a href="#about" class="btn btn-primary">서비스 소개</a>
            <a href="#contact" class="btn btn-secondary">프로젝트 문의</a>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <div class="scroll-text">Scroll Down</div>
      </div>
    </section>

    <!-- Expertise Section -->
    <section id="expertise" class="section expertise-section">
      <div class="container">
        <h2 class="section-title text-center">Our Services</h2>
        <p class="section-subtitle text-center">웹, 모바일, 크로스플랫폼 개발을 통해 비즈니스의 새로운 가능성을 열어갑니다.</p>
        <div class="expertise-grid">
          <div class="expertise-card">
            <div class="expertise-icon">
              <Icon name="mdi:web" />
            </div>
            <h3>Web Development</h3>
            <p>최신 프레임워크와 웹 표준을 준수하여 성능이 뛰어나고 반응형인 웹 애플리케이션을 구축합니다.</p>
            <ul class="expertise-list">
              <li>Vue.js / Nuxt.js</li>
              <li>React / Next.js</li>
              <li>TypeScript</li>
              <li>Responsive Design</li>
            </ul>
          </div>

          <div class="expertise-card">
            <div class="expertise-icon">
              <Icon name="mdi:cellphone" />
            </div>
            <h3>Mobile App</h3>
            <p>네이티브 성능에 준하는 크로스플랫폼 기술로 효율적인 모바일 앱 서비스를 제공합니다.</p>
            <ul class="expertise-list">
              <li>React Native</li>
              <li>Flutter</li>
              <li>iOS / Swift</li>
              <li>Android / Kotlin</li>
            </ul>
          </div>

          <div class="expertise-card">
            <div class="expertise-icon">
              <Icon name="mdi:database" />
            </div>
            <h3>Backend System</h3>
            <p>안정적이고 확장 가능한 서버 아키텍처를 설계하고 구축합니다.</p>
            <ul class="expertise-list">
              <li>Node.js / Express</li>
              <li>Python / Django</li>
              <li>RESTful API / GraphQL</li>
              <li>High Availability</li>
            </ul>
          </div>

          <div class="expertise-card">
            <div class="expertise-icon">
              <Icon name="mdi:shield-check" />
            </div>
            <h3>System Stability</h3>
            <p>지속 가능한 개발 방식과 안정적인 유지보수로 귀사의 디지털 자산을 관리합니다.</p>
            <ul class="expertise-list">
              <li>Security Audit</li>
              <li>Performance Tuning</li>
              <li>24/7 Monitoring</li>
              <li>Legacy Migration</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section projects-section">
      <div class="container">
        <h2 class="section-title text-center">Featured Works</h2>
        <div class="grid grid-1 grid-2-sm grid-3-md">
          <article v-for="project in projects" 
                   :key="project.id" 
                   class="card project-card">
            <NuxtLink :to="`/projects/${project.id}`" class="project-image-link">
              <div class="project-image">
                <img :src="project.images[0]" :alt="project.title">
                <div class="project-overlay">
                  <span>View Details</span>
                </div>
              </div>
            </NuxtLink>
            <div class="project-content">
              <h3>
                <NuxtLink :to="`/projects/${project.id}`">{{ project.title }}</NuxtLink>
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
        <div class="about-content grid grid-1 grid-2-md">
          <div class="about-text">
            <h2 class="section-title">Why Evergreen?</h2>
            <p>{{ aboutText }}</p>
            <div class="skills-container">
              <h3>Core Competencies</h3>
              <div class="skills-grid grid grid-2-sm grid-3-md">
                <div v-for="(skill, category) in skills" 
                     :key="category" 
                     class="skill-category">
                  <h4>{{ category }}</h4>
                  <ul>
                    <li v-for="item in skill" :key="item">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="about-image">
             <!-- Placeholder for company image or abstract graphic -->
            <div class="placeholder-image">
                <Icon name="mdi:forest" size="10rem" color="#64ffda" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section contact-section">
      <div class="container">
        <h2 class="section-title text-center">Get In Touch</h2>
        <div class="contact-container grid grid-1 grid-2-md">
          <div class="contact-info">
            <p>{{ contactText }}</p>
            <div class="contact-details">
                <p><Icon name="mdi:email" /> contact@evergreen.dev</p>
                <p><Icon name="mdi:map-marker" /> Seoul, Korea</p>
            </div>
          </div>
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Name / Company</label>
              <input type="text" id="name" v-model="formData.name" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="formData.email" required>
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" v-model="formData.message" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
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
  title: 'Evergreen Dev | Sustainable Tech Partner',
  description: 'Evergreen Dev - 언제나 푸른 상록수처럼 변함없는 가치를 제공하는 웹/모바일 개발 전문 파트너입니다. 지속 가능한 성장을 위한 최적의 IT 솔루션을 제안합니다.',
  ogTitle: 'Evergreen Dev | Sustainable Tech Partner',
  ogDescription: '언제나 푸른 상록수처럼, 귀사의 비즈니스를 지속 가능하게 만드는 최고의 기술 파트너.',
  ogImage: '/logo.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Evergreen Dev',
  twitterDescription: 'Sustainable Tech Partner for your business.',
  twitterImage: '/logo.png',
})

const texts = {
  en: [
    'Sustainable Tech Partner',
    'Web & Mobile Solutions',
    'Cross-Platform Expert',
    'System Maintenance'
  ],
  ko: [
    '지속 가능한 기술 파트너',
    '웹 & 모바일 솔루션',
    '크로스 플랫폼 개발',
    '시스템 유지보수 및 고도화'
  ]
};
// Use Korean as default for now or stick to English for the typewriter if preferred. 
// Given the prompt, let's mix or use English for "Tech" vibe but the slogan is Korean.
// Let's use English for the typewriter to match the likely global/modern tech aesthetic, or ko if desired.
// I will keep it pointing to texts.en for "Global" feel, or switch to ko. Let's switch to ko as the prompt text was significantly Korean.
const currentText = ref(texts.ko[0]); 
let currentIndex = 0;

// Data
const aboutText = ref(`변화하는 기술 환경 속에서도 변함없는 가치를 제공합니다. 저희 Evergreen Dev는 단순한 개발사가 아닌, 고객의 비즈니스 성장을 함께 고민하는 파트너입니다. 안정적인 시스템 구축과 효율적인 유지보수를 통해 귀사의 디지털 자산을 안전하게 지켜드립니다.`);
const contactText = ref(`새로운 프로젝트 논의나 기술 상담이 필요하시다면 언제든 연락주세요. 귀사의 비즈니스에 최적화된 솔루션을 제안해 드립니다.`);
const formData = ref({
  name: '',
  email: '',
  message: ''
});
const skills = ref({
  'Development': ['Vue.js / Nuxt', 'React / Next.js', 'React Native / Flutter', 'Node.js / Python'],
  'Infrastructure': ['AWS / Azure', 'Docker / K8s', 'CI/CD Pipelines', 'Security'],
  'Process': ['Agile / Scrum', 'Code Review', 'Documentation', 'Maintenance']
});

// Projects Data from Composable
const { projects } = useProjects();

// Methods
const handleSubmit = async () => {
  // Implement form submission logic
  console.log('Form submitted:', formData.value);
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
    scrollToSection(currentSectionIndex.value + 1);
    accumulatedDelta = 0;
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

  // Typing effect
  setInterval(() => {
    currentIndex = (currentIndex + 1) % texts.en.length;
    currentText.value = texts.en[currentIndex];
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
  padding: 0 var(--space-xl);
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
  background: rgba(74, 243, 255, 0.1);
  border: 1px solid #4af3ff;
  color: #4af3ff;
}

.btn-primary:hover {
  background: rgba(74, 243, 255, 0.2);
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(148, 163, 184, 0.1);
  border: 1px solid #94a3b8;
  color: #94a3b8;
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
</style>
