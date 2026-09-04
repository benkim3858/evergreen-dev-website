import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config

// content/insights/*.md 를 읽어 프리렌더 대상 경로를 만든다.
// 글을 추가하면 자동으로 정적 생성 대상에 포함된다.
const insightRoutes = (() => {
  try {
    return readdirSync(resolve(__dirname, 'content/insights'))
      .filter((f) => f.endsWith('.md'))
      .map((f) => `/insights/${f.replace(/\.md$/, '')}`)
  } catch {
    return []
  }
})()

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    'nuxt-icon',
    'nuxt-calendly',
    '@nuxtjs/sitemap'
  ],

  // 사이트 기준 URL — @nuxtjs/sitemap이 절대 URL·hreflang 생성에 사용.
  // nuxt-i18n을 자동 감지해 로케일별 URL과 alternate를 함께 생성한다.
  site: {
    url: 'https://evegdev.com',
    name: 'Evergreen Dev'
  },

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
    prerender: {
      // ko 라우트는 nav 링크에서 자동 크롤되지만, 영어(/en) 라우트는
      // 기본 로케일(ko) DOM에 링크가 없어 크롤되지 않는다.
      // 영어 진입점을 시드로 주면 crawlLinks가 /en 내부 링크를 따라
      // /en/about·/en/contact·/en/projects/* 까지 정적 생성한다.
      crawlLinks: true,
      routes: ['/en', '/en/about', '/en/contact', '/en/projects', '/insights', ...insightRoutes],
    },
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
      // <html lang>/dir, hreflang, canonical, og:url, og:locale은
      // layouts/default.vue의 useLocaleHead()가 라우트·로케일별로 동적 생성한다.
      title: 'Evergreen Dev | 에버그린 데브 - Web & App Development Partner',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Evergreen Dev (에버그린 데브) - AI-native development partner. Web, Mobile App, AI/LLM solutions. AI·웹·모바일 개발 전문 파트너.' },
        { name: 'author', content: 'Evergreen Dev' },
        { name: 'robots', content: 'index, follow' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Evergreen Dev (에버그린 데브)' },
        { property: 'og:title', content: 'Evergreen Dev | 에버그린 데브 - Web & App Development Partner' },
        { property: 'og:description', content: 'Evergreen Dev — AI-native partner from planning to launch and beyond. AI·웹·앱 개발 파트너.' },
        { property: 'og:image', content: 'https://evegdev.com/logo.png' },
        // og:url, og:locale, og:locale:alternate → useLocaleHead()가 라우트별 동적 생성

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Evergreen Dev | 에버그린 데브' },
        { name: 'twitter:description', content: 'Evergreen Dev — AI-native development partner. AI·웹·앱 개발 파트너.' },
        { name: 'twitter:image', content: 'https://evegdev.com/logo.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/logo.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/logo.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/logo.png' },
        // canonical → useLocaleHead()가 라우트별 동적 생성
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
            "@graph": [
              {
                "@type": ["Organization", "ProfessionalService"],
                "@id": "https://evegdev.com/#organization",
                "url": "https://evegdev.com/",
                "logo": {
                  "@type": "ImageObject",
                  "@id": "https://evegdev.com/#logo",
                  "url": "https://evegdev.com/logo.png",
                  "contentUrl": "https://evegdev.com/logo.png",
                  "caption": "Evergreen Dev"
                },
                "image": { "@id": "https://evegdev.com/#logo" },
                "name": "Evergreen Dev",
                "alternateName": ["에버그린 데브", "에버그린데브", "Evergreen Dev Labs"],
                "legalName": "에버그린데브",
                "taxID": "366-72-00644",
                "description": "AI 네이티브 개발 파트너 — 기획부터 출시, 그 이후 성장까지 함께합니다. 웹·모바일 앱·AI 솔루션을 한 팀에서 제공합니다.",
                "email": "ben@evegdev.com",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "수영로 383번길 66, 2층 208호",
                  "addressLocality": "수영구",
                  "addressRegion": "부산",
                  "addressCountry": "KR"
                },
                "areaServed": { "@type": "Country", "name": "South Korea" },
                "founder": { "@id": "https://evegdev.com/#ben-kim" },
                "knowsLanguage": ["ko", "en"],
                "serviceType": [
                  "AI & LLM Solutions",
                  "AI Agent Development",
                  "Web Development",
                  "Mobile App Development",
                  "Hybrid WebView App Development",
                  "Backend Development",
                  "Software Outsourcing"
                ],
                "knowsAbout": [
                  "AI", "LLM", "Claude", "GPT", "RAG", "AI Agents", "Workflow Automation",
                  "Vue.js", "React", "Next.js", "Nuxt.js",
                  "Flutter", "React Native", "Kotlin", "Swift",
                  "Node.js", "NestJS", "Java", "Spring", "eGovFrame", "Python",
                  "Supabase", "PostgreSQL", "AWS", "Vercel",
                  "Open Market API Integration", "WebView Hybrid App", "Cloud Services"
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "개발 서비스",
                  "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "웹 서비스 개발", "description": "Next.js·Nuxt·React·Vue 기반 웹 서비스와 관리자 시스템을 구축합니다.", "serviceType": "Web Development" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "모바일 앱 개발", "description": "Flutter·React Native 크로스플랫폼과 iOS·Android 네이티브 앱을 개발합니다.", "serviceType": "Mobile App Development" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "웹뷰 하이브리드 앱 개발", "description": "웹과 React Native 셸을 결합해 하나의 코드베이스로 앱과 웹을 함께 운영하는 구조를 만듭니다.", "serviceType": "Hybrid App Development" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI·AX 솔루션", "description": "LLM 통합, RAG 검색, AI 에이전트, 업무 자동화를 제품과 사내 운영에 적용합니다.", "serviceType": "AI Solutions" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "백엔드·시스템 구축", "description": "Node.js·NestJS·Java Spring·Python 기반 API 설계와 인프라 운영을 맡습니다.", "serviceType": "Backend Development" } }
                  ]
                },
                "sameAs": [
                  "https://github.com/benkim3858",
                  "https://www.linkedin.com/in/ben-kim-87a5a0219"
                ]
              },
              {
                "@type": "WebSite",
                "@id": "https://evegdev.com/#website",
                "url": "https://evegdev.com/",
                "name": "Evergreen Dev",
                "alternateName": "에버그린 데브",
                "description": "웹·모바일 앱·AI 솔루션을 기획부터 운영까지 한 팀에서 맡는 개발 회사",
                "publisher": { "@id": "https://evegdev.com/#organization" },
                "inLanguage": ["ko-KR", "en-US"]
              },
              {
                "@type": "Person",
                "@id": "https://evegdev.com/#ben-kim",
                "name": "Ben Kim",
                "alternateName": "김벤",
                "jobTitle": "대표 / 풀스택 개발자",
                "worksFor": { "@id": "https://evegdev.com/#organization" },
                "email": "ben@evegdev.com",
                "image": "https://evegdev.com/founder.png",
                "knowsAbout": [
                  "Flutter", "React Native", "Next.js", "Nuxt.js",
                  "Java Spring", "eGovFrame", "Node.js", "Python",
                  "LLM Application Development", "AI Agents",
                  "Blockchain Data Indexing", "Open Market API Integration"
                ],
                "sameAs": [
                  "https://www.linkedin.com/in/ben-kim-87a5a0219",
                  "https://github.com/benkim3858"
                ]
              }
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
        language: 'en-US',
        file: 'en.json'
      },
      {
        code: 'ko',
        language: 'ko-KR',
        file: 'ko.json'
      }
    ],
    // hreflang/canonical/og:url을 완전한 절대 URL로 생성하기 위한 사이트 origin
    baseUrl: 'https://evegdev.com',
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'ko',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      // 'all'은 /en 같은 명시 경로까지 기본 로케일로 리다이렉트시켜
      // 영어 페이지가 prerender되지 못하게 한다. 'root'는 루트(/)에서만
      // 브라우저 언어를 감지하며 SEO 권장값이다.
      redirectOn: 'root',
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