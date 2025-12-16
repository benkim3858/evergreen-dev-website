// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    'nuxt-icon',
    'nuxt-calendly'
  ],

  // Runtime Config - 환경 변수
  runtimeConfig: {
    public: {
      web3formsKey: process.env.NUXT_PUBLIC_WEB3FORMS_KEY || '',
      channelPluginKey: process.env.NUXT_PUBLIC_CHANNEL_PLUGIN_KEY || '',
      calendlyUrl: process.env.NUXT_PUBLIC_CALENDLY_URL || ''
    }
  },

  // Global CSS - Design System
  css: [
    '~/assets/styles/main.scss'
  ],

  // SSR 활성화 - SEO 최적화 핵심
  ssr: true,

  // Nitro 설정 - GitHub Pages용 정적 생성
  nitro: {
    preset: 'github-pages'
  },

  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
    baseURL: '/',
    buildAssetsDir: '_nuxt',

    // 전역 SEO 메타태그
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Ben Kim | Full Stack Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Ben Kim - Full Stack Developer specializing in Web & Mobile Development. Vue.js, React, Node.js, and Cloud Services expert with 40+ projects.' },
        { name: 'author', content: 'Ben Kim' },
        { name: 'robots', content: 'index, follow' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Ben Kim Portfolio' },
        { property: 'og:title', content: 'Ben Kim | Full Stack Developer' },
        { property: 'og:description', content: 'Full Stack Developer specializing in Web & Mobile Development. Vue.js, React, Node.js, and Cloud Services expert.' },
        { property: 'og:image', content: '/logo.png' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:locale:alternate', content: 'ko_KR' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Ben Kim | Full Stack Developer' },
        { name: 'twitter:description', content: 'Full Stack Developer specializing in Web & Mobile Development.' },
        { name: 'twitter:image', content: '/logo.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/logo.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/logo.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/logo.png' },
        { rel: 'canonical', href: 'https://evegdev.com/' },
        // Fonts - Pretendard (Variable)
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css', crossorigin: 'anonymous' },
        // Fonts - Google (Space Mono for Logo, Fira Code for Monospace)
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap', crossorigin: 'anonymous' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": "https://evegdev.com/",
            "logo": "https://evegdev.com/logo.png",
            "name": "Ben Kim Portfolio",
            "sameAs": [
              "https://github.com/benkim3858"
            ]
          })
        }
      ]
    }
  },

  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.json'
      },
      {
        code: 'ko',
        file: 'ko.json'
      }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'all',
      alwaysRedirect: false,
      fallbackLocale: 'en'
    },
    bundle: {
      optimizeTranslationDirective: false
    }
  },

  devtools: { enabled: true },
  compatibilityDate: '2025-01-02'
})