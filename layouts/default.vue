<template>
  <div class="app-container">
    <ClientOnly>
      <SpaceBackground />
    </ClientOnly>
    <nav class="nav-container">
      <div class="nav-logo">
        <NuxtLink :to="localePath('/')" class="logo">
          <img
            src="/logo.png?v=1"
            alt="Evergreen Dev Labs"
            class="logo-image"
          />
          <span class="logo-text" :class="{ 'hidden': !isLogoTextVisible }">EVERGREEN DEV</span>
        </NuxtLink>
      </div>

      <!-- Desktop Navigation -->
      <div class="nav-links hide-sm" :class="{ 'active': isMenuOpen }">
        <NuxtLink :to="localePath('/')" :class="{ 'nav-active': isExactHome }">{{ $t('nav.home') }}</NuxtLink>
        <NuxtLink :to="localePath('/projects')" :class="{ 'nav-active': isProjectsSection }">{{ $t('nav.projects') }}</NuxtLink>
        <NuxtLink :to="localePath('/about')" :class="{ 'nav-active': isAboutSection }">{{ $t('nav.about') }}</NuxtLink>
        <NuxtLink :to="localePath('/contact')" :class="{ 'nav-active': isContactSection }">{{ $t('nav.contact') }}</NuxtLink>
      </div>

      <div class="nav-right">
        <div class="language-switcher">
          <button
            v-for="loc in availableLocales"
            :key="loc.code"
            @click="switchLanguage(loc.code)"
            :class="['lang-btn', { active: currentLocale === loc.code }]"
          >
            {{ loc.code.toUpperCase() }}
          </button>
        </div>
        
        <!-- Mobile Menu Button -->
        <button class="menu-btn show-sm" @click="toggleMenu">
          <Icon :name="isMenuOpen ? 'mdi:close' : 'mdi:menu'" />
        </button>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script setup lang="ts">
// Nuxt auto-imports useI18n from @nuxtjs/i18n - no need to import from vue-i18n directly
const { locale, setLocale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const isMenuOpen = ref(false);
const isScrolled = ref(false);

// index.vue의 컨테이너 스크롤 값을 useState로 공유받음
const containerScrollY = useState('containerScrollY', () => 0);

const currentLocale = computed(() => locale.value);
const availableLocales = computed(() => {
  // 하드코딩된 로케일 배열 사용
  return [
    { code: 'en', name: 'English' },
    { code: 'ko', name: 'Korean' }
  ];
});

// Check if we are on the home page
const isHome = computed(() => {
  const path = route.path;
  return path === '/' || path === '/ko' || path === '/ko/';
});

// Navigation active states - check if current path matches or starts with section path
const isExactHome = computed(() => {
  const path = route.path;
  return path === '/' || path === '/ko' || path === '/ko/';
});

const isProjectsSection = computed(() => {
  const path = route.path;
  return path.startsWith('/projects') || path.startsWith('/ko/projects');
});

const isAboutSection = computed(() => {
  const path = route.path;
  return path === '/about' || path === '/ko/about';
});

const isContactSection = computed(() => {
  const path = route.path;
  return path === '/contact' || path === '/ko/contact';
});

// Determine if logo text should be visible
// Hidden only when on Home page AND at the very top
const isLogoTextVisible = computed(() => {
  if (!isHome.value) return true;
  return isScrolled.value;
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const switchLanguage = async (newLocale: string) => {
  await setLocale(newLocale as 'en' | 'ko');
};

const handleScroll = () => {
  // window 스크롤 또는 컨테이너 스크롤 중 하나라도 50 이상이면 스크롤된 것으로 처리
  const windowScrolled = window.scrollY > 50;
  const containerScrolled = containerScrollY.value > 50;
  isScrolled.value = windowScrolled || containerScrolled;
};

// Close menu when route changes
watch(() => useRoute().path, () => {
  isMenuOpen.value = false;
});

// 컨테이너 스크롤 값 변경 감지
watch(containerScrollY, () => {
  handleScroll();
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // Initial check
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: transparent;
}

.nav-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0.5rem 2rem;
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  background: rgba(11, 16, 33, 0.6);
  backdrop-filter: blur(12px);
  z-index: 1000;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

/* Optional: Add shadow when scrolled */
.nav-container.scrolled {
  box-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.7);
}

.nav-logo {
  justify-self: end; /* Align to the right of the left column (next to menu) */
  display: flex;
  align-items: center;
  padding-right: 2rem; /* Gap between logo and menu */
  min-width: 0; /* Prevent potential flex overflow issues */
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 0; /* Remove gap */
}

.logo-image {
  height: 60px;
  width: auto;
  object-fit: contain;
  transition: transform 0.5s ease;
}

.logo-text {
  display: inline-block; /* Essential for transform to work */
  color: var(--text-color-light);
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 2px;
  font-family: 'Space Mono', monospace;
  background: linear-gradient(120deg, #64ffda, #64ffda);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 10px rgba(100, 255, 218, 0.2);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); /* Smoother bezier */
  opacity: 1;
  max-width: 300px; /* Limit max width for transition calculation */
  white-space: nowrap;
  margin-left: 1rem; /* Add margin instead */
}

/* Hide logo text state */
.logo-text.hidden {
  opacity: 0;
  max-width: 0;
  margin-left: 0; /* Remove margin when hidden */
  overflow: hidden;
  padding: 0; /* Ensure no padding remains */
}

.logo:hover .logo-text {
  text-shadow: 2px 2px 15px rgba(100, 255, 218, 0.4);
}


.nav-links {
  justify-self: center;
  display: flex;
  align-items: center;
}

.nav-right {
  justify-self: end; /* Align to right edge */
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-links a {
  margin-left: 2rem;
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

/* Updated Hover Effect: Underline */
.nav-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--accent-color);
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-links a:hover {
  color: var(--accent-color);
}

/* Active link state - current page */
.nav-links a.nav-active {
  color: var(--accent-color);
}

.nav-links a.nav-active::after {
  width: 100%;
}

.menu-btn {
  background: none;
  border: none;
  color: var(--accent-color);
  font-size: var(--font-size-lg);
  cursor: pointer;
  display: flex; /* Fix alignment */
  align-items: center;
}

@media (max-width: 768px) {
  .nav-links {
    position: absolute;
    top: calc(100% + 1rem);
    left: 0;
    right: 0;
    width: 100%;
    background: rgba(11, 16, 33, 0.95);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: var(--space-md);
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
    transform: translateY(-10px);
    opacity: 0;
    pointer-events: none;
    transition: var(--transition-normal);
  }

  .nav-links.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .nav-links.active {
    transform: translateY(0);
  }

  .logo-image {
    height: 45px;
  }

  .logo-text {
    font-size: 1.1rem;
    letter-spacing: 1px;
  }
}

@media (max-width: 480px) {
  .logo-text {
    display: none;
  }
}

.language-switcher {
  display: flex;
  gap: 0.2rem;
  align-items: center;
  margin-left: 0;
}

/* Modern Minimalist Language Buttons */
.lang-btn {
  padding: 0.4rem 0.6rem;
  background: transparent;
  border: none;
  color: var(--text-color);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  opacity: 0.6;
}

.lang-btn:hover {
  opacity: 1;
  color: var(--accent-color);
  transform: none;
  background: transparent;
  box-shadow: none;
}

.lang-btn.active {
  opacity: 1;
  color: var(--accent-color);
  font-weight: 700;
  background: rgba(100, 255, 218, 0.1);
  border-radius: 20px;
}

@media (max-width: 768px) {
  .language-switcher {
     /* Reset mobile styles if needed, but flex layout handles it mostly */
     position: static;
     padding: 0;
     background: transparent;
  }

  .lang-btn {
    font-size: 0.8rem;
    padding: 0.3rem 0.5rem;
  }
}

@media (max-width: 380px) {
  .language-switcher {
    right: var(--space-lg);
  }
}
</style> 