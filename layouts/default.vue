<template>
  <div class="app-container">
    <ClientOnly>
      <SpaceBackground />
    </ClientOnly>
    <nav class="nav-container">
      <!-- Desktop: Logo (left) -->
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

      <!-- Navigation Links -->
      <div class="nav-links">
        <NuxtLink :to="localePath('/')" :class="{ 'nav-active': isExactHome }">{{ $t('nav.home') }}</NuxtLink>
        <NuxtLink :to="localePath('/projects')" :class="{ 'nav-active': isProjectsSection }">{{ $t('nav.projects') }}</NuxtLink>
        <NuxtLink :to="localePath('/about')" :class="{ 'nav-active': isAboutSection }">{{ $t('nav.about') }}</NuxtLink>
        <NuxtLink :to="localePath('/contact')" :class="{ 'nav-active': isContactSection }">{{ $t('nav.contact') }}</NuxtLink>
      </div>

      <!-- Desktop: Language switcher (right) -->
      <div class="nav-right">
        <div class="language-switcher">
          <button
            v-for="loc in availableLocales"
            :key="loc.code"
            @click="switchLanguage(loc.code)"
            :class="['lang-btn', { active: currentLocale === loc.code }]"
            :aria-label="`Switch to ${loc.name}`"
          >
            {{ loc.code.toUpperCase() }}
          </button>
        </div>
      </div>

      <!-- Mobile: Globe language toggle (inside nav, positioned by CSS) -->
      <button
        class="mobile-lang-toggle"
        @click="toggleLanguage"
        :aria-label="`Current language: ${currentLocale.toUpperCase()}. Tap to switch.`"
      >
        <Icon name="mdi:web" />
        <span class="mobile-lang-code">{{ currentLocale.toUpperCase() }}</span>
      </button>
    </nav>
    <slot />
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const isScrolled = ref(false);

const containerScrollY = useState('containerScrollY', () => 0);

const currentLocale = computed(() => locale.value);
const availableLocales = computed(() => {
  return [
    { code: 'en', name: 'English' },
    { code: 'ko', name: 'Korean' }
  ];
});

const isHome = computed(() => {
  const path = route.path;
  return path === '/' || path === '/ko' || path === '/ko/';
});

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

const isIntroSection = computed(() => {
  const path = route.path;
  return path.startsWith('/intro') || path.startsWith('/ko/intro');
});

const isContactSection = computed(() => {
  const path = route.path;
  return path === '/contact' || path === '/ko/contact';
});

const isLogoTextVisible = computed(() => {
  if (!isHome.value) return true;
  return isScrolled.value;
});

// Desktop: switch to specific locale
const switchLanguage = async (newLocale: string) => {
  await setLocale(newLocale as 'en' | 'ko');
};

// Mobile: toggle between two languages
const toggleLanguage = async () => {
  const next = currentLocale.value === 'ko' ? 'en' : 'ko';
  await setLocale(next as 'en' | 'ko');
};

const handleScroll = () => {
  const windowScrolled = window.scrollY > 50;
  const containerScrolled = containerScrollY.value > 50;
  isScrolled.value = windowScrolled || containerScrolled;
};

watch(containerScrollY, () => {
  handleScroll();
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.app-container {
  --nav-height: 94px;
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

.nav-container.scrolled {
  box-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.7);
}

.nav-logo {
  justify-self: end;
  display: flex;
  align-items: center;
  padding-right: 2rem;
  min-width: 0;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 0;
}

.logo-image {
  height: 60px;
  width: auto;
  object-fit: contain;
  transition: transform 0.5s ease;
}

.logo-text {
  display: inline-block;
  color: var(--text-color-light);
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 2px;
  font-family: 'Space Mono', monospace;
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 10px rgba(100, 255, 218, 0.2);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
  max-width: 300px;
  white-space: nowrap;
  margin-left: 1rem;
}

.logo-text.hidden {
  opacity: 0;
  max-width: 0;
  margin-left: 0;
  overflow: hidden;
  padding: 0;
}

.logo:hover .logo-text {
  text-shadow: 2px 2px 15px rgba(100, 255, 218, 0.4);
}

/* Desktop: nav-links visible as flex row */
.nav-links {
  justify-self: center;
  display: flex;
  align-items: center;
}

.nav-right {
  justify-self: end;
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

.nav-links a.nav-active {
  color: var(--accent-color);
}

.nav-links a.nav-active::after {
  width: 100%;
}

/* Desktop language switcher */
.language-switcher {
  display: flex;
  gap: 0.2rem;
  align-items: center;
}

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
}

.lang-btn.active {
  opacity: 1;
  color: var(--accent-color);
  font-weight: 700;
  background: rgba(100, 255, 218, 0.1);
  border-radius: 20px;
}

/* Mobile globe language toggle — hidden on desktop */
.mobile-lang-toggle {
  display: none;
}

/* ================================================
   Mobile styles (768px and below)
   ================================================ */
@media (max-width: 768px) {
  .app-container {
    --nav-height: 56px;
  }

  /* Mobile nav: single row with all items visible */
  .nav-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding: 0.4rem 0.5rem;
    width: 95%;
    top: 0.5rem;
    border-radius: 30px;
  }

  /* Mobile: compact logo (image only, no text) */
  .nav-logo {
    display: flex;
    padding-right: 0;
    flex-shrink: 0;
  }

  .logo-image {
    height: 30px;
  }

  .logo-text {
    display: none;
  }

  .nav-right {
    display: none;
  }

  /* Mobile nav-links: always visible, horizontal row */
  .nav-links {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0;
    flex: 1;
    justify-content: center;
  }

  .nav-links a {
    margin-left: 0;
    padding: 0.5rem 0.6rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-color);
    text-align: center;
    white-space: nowrap;
    border-radius: 20px;
    transition: color 0.3s ease, background 0.3s ease;
  }

  .nav-links a::after {
    display: none;
  }

  .nav-links a.nav-active {
    color: var(--accent-color);
    background: rgba(100, 255, 218, 0.1);
  }

  .nav-links a:hover {
    color: var(--accent-color);
  }

  /* Mobile globe toggle — visible */
  .mobile-lang-toggle {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    background: none;
    border: none;
    color: var(--text-color);
    opacity: 0.7;
    cursor: pointer;
    padding: 0.4rem 0.5rem;
    border-radius: 20px;
    font-size: 1rem;
    transition: all 0.3s ease;
    flex-shrink: 0;
    min-width: 44px;
    min-height: 44px;
    justify-content: center;
  }

  .mobile-lang-toggle:hover,
  .mobile-lang-toggle:active {
    opacity: 1;
    color: var(--accent-color);
    background: rgba(100, 255, 218, 0.1);
  }

  .mobile-lang-code {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
}

@media (max-width: 380px) {
  .logo-image {
    height: 24px;
  }

  .nav-links a {
    padding: 0.4rem 0.3rem;
    font-size: 0.7rem;
  }

  .mobile-lang-toggle {
    padding: 0.3rem 0.3rem;
    min-width: 36px;
    font-size: 0.85rem;
  }

  .mobile-lang-code {
    font-size: 0.55rem;
  }
}
</style>
