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
      calendlyUrl: process.env.NUXT_PUBLIC_CALENDLY_URL || '',
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || 'https://jjqobumitamcyvfgnacf.supabase.co',
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || ''
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
    preset: 'github-pages',
  },

  // SPA fallback — 동적 라우트(/intro/[slug])를 클라이언트에서 처리
  hooks: {
    'nitro:build:public-assets'(nitro) {
      const fs = require('fs')
      const path = require('path')
      const publicDir = path.join(nitro.options.output.publicDir)
      const indexHtml = path.join(publicDir, 'index.html')
      const fallbackHtml = path.join(publicDir, '404.html')
      if (fs.existsSync(indexHtml) && !fs.existsSync(fallbackHtml)) {
        fs.copyFileSync(indexHtml, fallbackHtml)
      }
    }
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
      title: 'Evergreen Dev | 에버그린 데브 - Web & App Development Partner',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Evergreen Dev (에버그린 데브) - Web & Mobile Development Partner. Vue.js, React, Flutter, Node.js, and Cloud Services expert. 웹/앱 개발 전문 파트너.' },
        { name: 'author', content: 'Evergreen Dev' },
        { name: 'robots', content: 'index, follow' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Evergreen Dev (에버그린 데브)' },
        { property: 'og:title', content: 'Evergreen Dev | 에버그린 데브 - Web & App Development Partner' },
        { property: 'og:description', content: 'Evergreen Dev (에버그린 데브) - Your trusted web and mobile development partner. 웹/앱 개발 전문 파트너.' },
        { property: 'og:image', content: '/logo.png' },
        { property: 'og:url', content: 'https://evegdev.com/' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:locale:alternate', content: 'ko_KR' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Evergreen Dev | 에버그린 데브' },
        { name: 'twitter:description', content: 'Evergreen Dev (에버그린 데브) - Web & Mobile Development Partner. 웹/앱 개발 전문 파트너.' },
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
            "name": "Evergreen Dev",
            "alternateName": "에버그린 데브",
            "description": "웹/모바일 앱 개발 전문 파트너 - Web & Mobile Development Partner",
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
    defaultLocale: 'ko',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'all',
      alwaysRedirect: false,
      fallbackLocale: 'ko'
    },
    bundle: {
      optimizeTranslationDirective: false
    }
  },

  devtools: { enabled: true },
  compatibilityDate: '2025-01-02',

  devServer: {
    port: 5000
  }
})