<template>
  <section class="section">
    <div class="container">
      <h1 class="section-title text-center">{{ $t('insights.pageTitle') }}</h1>
      <p class="section-subtitle text-center">{{ $t('insights.subtitle') }}</p>

      <div class="insight-list">
        <article v-for="post in insights ?? []" :key="post.slug" class="card insight-card">
          <NuxtLink :to="localePath(`/insights/${post.slug}`)" class="insight-link">
            <div class="insight-meta">
              <span class="insight-category">{{ post.category }}</span>
              <time :datetime="post.date">{{ post.date }}</time>
              <span class="insight-reading">{{ post.readingTime }}{{ $t('insights.minutes') }}</span>
            </div>
            <h3 class="insight-title">{{ post.title }}</h3>
            <p class="insight-desc">{{ post.description }}</p>
            <div class="insight-tags">
              <span v-for="tag in post.tags" :key="tag">#{{ tag }}</span>
            </div>
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
// 글이 한국어라 영문 로케일에는 라우트를 만들지 않는다 (빈 번역본·중복 색인 방지)
defineI18nRoute({ locales: ['ko'] });

const { t } = useI18n();
const localePath = useLocalePath();
const { data: insights } = await useAsyncData('insight-list', () => loadInsightList());

const title = t('seo.insights.title');
const description = t('seo.insights.description');

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://evegdev.com/logo.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
});

// 목록 페이지의 구조화 데이터 — 어떤 글이 있는지 봇에게 알린다
useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      key: 'insights-itemlist',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: title,
        itemListElement: (insights.value ?? []).map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `https://evegdev.com/insights/${post.slug}`,
          name: post.title,
        })),
      }),
    },
  ],
}));
</script>

<style scoped>
.insight-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 780px;
  margin: 0 auto;
}

.insight-card {
  padding: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.insight-card:hover {
  transform: translateY(-3px);
}

.insight-link {
  display: block;
  padding: 1.75rem;
  color: inherit;
  text-decoration: none;
}

.insight-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  opacity: 0.7;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.insight-category {
  padding: 0.15rem 0.6rem;
  border: 1px solid currentColor;
  border-radius: 999px;
  font-size: 0.78rem;
}

.insight-title {
  font-size: 1.35rem;
  line-height: 1.45;
  margin: 0 0 0.6rem;
}

.insight-desc {
  margin: 0 0 1rem;
  line-height: 1.7;
  opacity: 0.85;
}

.insight-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 0.8rem;
  opacity: 0.6;
}

@media (max-width: 640px) {
  .insight-link { padding: 1.25rem; }
  .insight-title { font-size: 1.15rem; }
}
</style>
