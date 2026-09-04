<template>
  <section class="section" v-if="post">
    <div class="container">
      <article class="insight-article">
        <header class="insight-header">
          <div class="insight-meta">
            <span class="insight-category">{{ post.category }}</span>
            <time :datetime="post.date">{{ post.date }}</time>
            <span class="insight-reading">{{ post.readingTime }}{{ $t('insights.minutes') }}</span>
          </div>
          <h1 class="insight-h1">{{ post.title }}</h1>
          <p class="insight-lead">{{ post.description }}</p>
        </header>

        <div class="insight-body" v-html="post.html"></div>

        <footer class="insight-footer">
          <div class="insight-tags">
            <span v-for="tag in post.tags" :key="tag">#{{ tag }}</span>
          </div>
          <p class="insight-updated">{{ $t('insights.lastUpdated') }}: {{ post.updated }}</p>
          <div class="insight-nav">
            <NuxtLink :to="localePath('/insights')" class="btn btn-outline">{{ $t('insights.backToList') }}</NuxtLink>
            <NuxtLink :to="localePath('/contact')" class="btn btn-primary">{{ $t('insights.ctaContact') }}</NuxtLink>
          </div>
        </footer>
      </article>
    </div>
  </section>
</template>

<script setup>
// 글이 한국어라 영문 로케일에는 라우트를 만들지 않는다 (빈 번역본·중복 색인 방지)
defineI18nRoute({ locales: ['ko'] });

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();
const { getInsight } = useInsights();

const post = getInsight(route.params.slug);

if (!post) {
  throw createError({ statusCode: 404, statusMessage: 'Insight not found', fatal: true });
}

const canonical = `https://evegdev.com/insights/${post.slug}`;

useSeoMeta({
  title: `${post.title} - 에버그린 데브`,
  description: post.description,
  ogTitle: post.title,
  ogDescription: post.description,
  ogImage: 'https://evegdev.com/logo.png',
  ogType: 'article',
  articlePublishedTime: post.date,
  articleModifiedTime: post.updated,
  twitterCard: 'summary_large_image',
});

// Article 스키마 — 발행일·수정일이 들어가야 최신성 신호가 전달된다
useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      key: 'insight-article',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            '@id': `${canonical}#article`,
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.updated,
            inLanguage: 'ko-KR',
            keywords: post.tags.join(', '),
            articleSection: post.category,
            author: { '@id': 'https://evegdev.com/#ben-kim' },
            publisher: { '@id': 'https://evegdev.com/#organization' },
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${canonical}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: '홈', item: 'https://evegdev.com/' },
              { '@type': 'ListItem', position: 2, name: t('insights.pageTitle'), item: 'https://evegdev.com/insights' },
              { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
            ],
          },
        ],
      }),
    },
  ],
}));
</script>

<style scoped>
.insight-article {
  max-width: 760px;
  margin: 0 auto;
}

.insight-header {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(128, 128, 128, 0.25);
}

.insight-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  opacity: 0.7;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.insight-category {
  padding: 0.15rem 0.6rem;
  border: 1px solid currentColor;
  border-radius: 999px;
  font-size: 0.78rem;
}

.insight-h1 {
  font-size: 2rem;
  line-height: 1.4;
  margin: 0 0 1rem;
}

.insight-lead {
  font-size: 1.05rem;
  line-height: 1.8;
  opacity: 0.85;
  margin: 0;
}

/* 본문은 v-html 이라 :deep 으로 스타일을 내려보낸다 */
.insight-body :deep(h2) {
  font-size: 1.5rem;
  line-height: 1.45;
  margin: 3rem 0 1rem;
  padding-top: 0.5rem;
}

.insight-body :deep(h3) {
  font-size: 1.2rem;
  margin: 2rem 0 0.75rem;
}

.insight-body :deep(p) {
  line-height: 1.9;
  margin: 0 0 1.25rem;
}

.insight-body :deep(ul),
.insight-body :deep(ol) {
  line-height: 1.9;
  margin: 0 0 1.25rem;
  padding-left: 1.5rem;
}

.insight-body :deep(li) {
  margin-bottom: 0.5rem;
}

.insight-body :deep(strong) {
  font-weight: 600;
}

.insight-body :deep(a) {
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* 표는 좁은 화면에서 가로 스크롤 */
.insight-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0 2rem;
  font-size: 0.92rem;
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}

.insight-body :deep(th),
.insight-body :deep(td) {
  border: 1px solid rgba(128, 128, 128, 0.3);
  padding: 0.6rem 0.85rem;
  text-align: left;
  vertical-align: top;
}

.insight-body :deep(th) {
  font-weight: 600;
  background: rgba(128, 128, 128, 0.08);
}

.insight-body :deep(pre) {
  padding: 1rem 1.15rem;
  border-radius: 8px;
  overflow-x: auto;
  background: rgba(128, 128, 128, 0.12);
  margin: 1.25rem 0 1.75rem;
  font-size: 0.88rem;
  line-height: 1.6;
}

.insight-body :deep(code) {
  font-family: 'Fira Code', ui-monospace, monospace;
  font-size: 0.9em;
}

.insight-body :deep(:not(pre) > code) {
  padding: 0.12em 0.4em;
  border-radius: 4px;
  background: rgba(128, 128, 128, 0.15);
}

.insight-body :deep(hr) {
  border: none;
  border-top: 1px solid rgba(128, 128, 128, 0.25);
  margin: 2.5rem 0;
}

.insight-footer {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(128, 128, 128, 0.25);
}

.insight-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 0.82rem;
  opacity: 0.6;
  margin-bottom: 0.75rem;
}

.insight-updated {
  font-size: 0.82rem;
  opacity: 0.6;
  margin: 0 0 1.75rem;
}

.insight-nav {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

@media (max-width: 640px) {
  .insight-h1 { font-size: 1.5rem; }
  .insight-body :deep(h2) { font-size: 1.25rem; margin-top: 2.25rem; }
  .insight-body :deep(table) { font-size: 0.85rem; }
}
</style>
