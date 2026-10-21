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

        <!-- 직답: 본문 맨 앞에 둔다. 검색·AI 답변이 첫 문단을 인용하는 경우가 많아 질문·답·기준일을 함께 보인다 -->
        <section v-if="post.answer" class="insight-answer" aria-labelledby="insight-answer-label">
          <p id="insight-answer-label" class="insight-answer-label">{{ $t('insights.answerLabel') }}</p>
          <p v-if="post.question" class="insight-answer-q">{{ post.question }}</p>
          <p class="insight-answer-a">{{ post.answer }}</p>
          <p class="insight-answer-basis">{{ $t('insights.asOf') }} <time :datetime="post.updated">{{ post.updated }}</time></p>
        </section>

        <div class="insight-body" v-html="post.html"></div>

        <!-- 화면의 FAQ 와 FAQPage JSON-LD 는 같은 post.faq 에서 만든다 (글자까지 같아야 한다) -->
        <section v-if="post.faq.length" class="insight-faq" aria-labelledby="insight-faq-title">
          <h2 id="insight-faq-title">{{ $t('insights.faqTitle') }}</h2>
          <div v-for="(item, index) in post.faq" :key="index" class="insight-faq-item">
            <h3 class="insight-faq-q">{{ item.q }}</h3>
            <p class="insight-faq-a">{{ item.a }}</p>
          </div>
        </section>

        <section v-if="post.sources.length" class="insight-sources" aria-labelledby="insight-sources-title">
          <h2 id="insight-sources-title">{{ $t('insights.sourcesTitle') }}</h2>
          <ol>
            <li v-for="source in post.sources" :key="source.url">
              <a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.name }}</a>
            </li>
          </ol>
        </section>

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
import { INSIGHTS_FEED_CHANNEL, INSIGHTS_FEED_URL, toJsonLd } from '~/lib/insights';

// 글이 한국어라 영문 로케일에는 라우트를 만들지 않는다 (빈 번역본·중복 색인 방지)
defineI18nRoute({ locales: ['ko'] });

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();
const slug = String(route.params.slug);
const { data: post } = await useAsyncData(`insight-${slug}`, () => loadInsight(slug));

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Insight not found', fatal: true });
}

const canonical = `https://evegdev.com/insights/${post.value.slug}`;

useSeoMeta({
  title: `${post.value.title} - 에버그린 데브`,
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description,
  ogImage: 'https://evegdev.com/logo.png',
  ogType: 'article',
  articlePublishedTime: post.value.date,
  articleModifiedTime: post.value.updated,
  twitterCard: 'summary_large_image',
});

// Article 스키마 — 발행일·수정일이 들어가야 최신성 신호가 전달된다.
// FAQPage 는 화면의 FAQ 섹션과 같은 post.faq 에서 만든다. 인용 효과를 기대한 것이 아니라
// 화면에 보이는 질문·답을 기계가 읽을 수 있게 같은 글자로 옮겨 두는 것이다
useHead(() => ({
  link: [
    { rel: 'alternate', type: 'application/rss+xml', title: INSIGHTS_FEED_CHANNEL.title, href: INSIGHTS_FEED_URL, key: 'insights-rss' },
  ],
  script: [
    {
      type: 'application/ld+json',
      key: 'insight-article',
      innerHTML: toJsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            '@id': `${canonical}#article`,
            headline: post.value.title,
            description: post.value.description,
            image: 'https://evegdev.com/logo.png',
            datePublished: post.value.date,
            dateModified: post.value.updated,
            inLanguage: 'ko-KR',
            keywords: post.value.tags.join(', '),
            articleSection: post.value.category,
            author: { '@id': 'https://evegdev.com/#ben-kim' },
            publisher: { '@id': 'https://evegdev.com/#organization' },
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
            ...(post.value.sources.length && {
              citation: post.value.sources.map((source) => ({ '@type': 'CreativeWork', name: source.name, url: source.url })),
            }),
          },
          ...(post.value.faq.length
            ? [
                {
                  '@type': 'FAQPage',
                  '@id': `${canonical}#faq`,
                  mainEntity: post.value.faq.map((item) => ({
                    '@type': 'Question',
                    name: item.q,
                    acceptedAnswer: { '@type': 'Answer', text: item.a },
                  })),
                },
              ]
            : []),
          {
            '@type': 'BreadcrumbList',
            '@id': `${canonical}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: '홈', item: 'https://evegdev.com/' },
              { '@type': 'ListItem', position: 2, name: t('insights.pageTitle'), item: 'https://evegdev.com/insights' },
              { '@type': 'ListItem', position: 3, name: post.value.title, item: canonical },
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

/* 직답 상자 — 본문 첫머리에서 질문·답·기준일을 한눈에 보이게 한다 */
.insight-answer {
  margin: 0 0 2.5rem;
  padding: 1.25rem 1.4rem;
  border: 1px solid rgba(128, 128, 128, 0.25);
  border-left: 3px solid var(--accent-color);
  border-radius: 8px;
  background: rgba(128, 128, 128, 0.06);
}

.insight-answer-label {
  margin: 0 0 0.5rem;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--accent-color);
}

.insight-answer-q {
  margin: 0 0 0.5rem;
  font-weight: 600;
  line-height: 1.6;
}

.insight-answer-a {
  margin: 0 0 0.75rem;
  line-height: 1.85;
  white-space: pre-line;
}

.insight-answer-basis {
  margin: 0;
  font-size: 0.82rem;
  opacity: 0.6;
}

/* FAQ·출처 — 본문 h2 와 같은 위계를 쓴다 */
.insight-faq,
.insight-sources {
  margin-top: 3rem;
}

.insight-faq h2,
.insight-sources h2 {
  font-size: 1.5rem;
  line-height: 1.45;
  margin: 0 0 1.25rem;
}

.insight-faq-item + .insight-faq-item {
  margin-top: 1.5rem;
}

.insight-faq-q {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0 0 0.5rem;
}

.insight-faq-a {
  margin: 0;
  line-height: 1.9;
  white-space: pre-line;
}

.insight-sources ol {
  margin: 0;
  padding-left: 1.5rem;
  line-height: 1.9;
  font-size: 0.95rem;
}

.insight-sources a {
  text-decoration: underline;
  text-underline-offset: 3px;
  word-break: break-word;
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

/* 표 — 가로 스크롤을 만들지 않는다. 칸 안에서 줄바꿈하고, 한국어는 어절 단위로 끊는다(keep-all).
   짧은 값만 있는 열(.insight-nowrap)은 한 줄로 고정하고, 열이 많은 표(.insight-table--stack)는
   본문 폭이 좁으면 행 단위로 쌓는다. class·data-label·role 은 lib/insights.ts 의 annotateTables 가 붙인다 */
/* 표를 쌓는 기준은 화면 폭이 아니라 본문 폭이다 (아래 @container) */
.insight-body {
  container-type: inline-size;
}

.insight-body :deep(table) {
  width: 100%;
  margin: 1.75rem 0 2.25rem;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid rgba(128, 128, 128, 0.25);
  border-radius: 10px;
  overflow: hidden;
  font-size: 0.92rem;
  line-height: 1.65;
  font-variant-numeric: tabular-nums;
  word-break: keep-all;
  overflow-wrap: anywhere;
}

.insight-body :deep(th),
.insight-body :deep(td) {
  padding: 0.75rem 1rem;
  text-align: left;
  vertical-align: top;
}

.insight-body :deep(th) {
  font-size: 0.85rem;
  font-weight: 600;
  background: rgba(128, 128, 128, 0.1);
  border-bottom: 1px solid rgba(128, 128, 128, 0.25);
}

.insight-body :deep(th + th),
.insight-body :deep(td + td) {
  border-left: 1px solid rgba(128, 128, 128, 0.14);
}

.insight-body :deep(tbody tr + tr td) {
  border-top: 1px solid rgba(128, 128, 128, 0.14);
}

/* 첫 칸은 행의 이름(방식·규모·스토어 등)이라 한 단계 강조한다 */
.insight-body :deep(td:first-child) {
  font-weight: 600;
}

.insight-body :deep(.insight-nowrap) {
  white-space: nowrap;
}

/* 열이 많은 표는 본문 폭이 740px 보다 좁으면 행마다 「첫 칸 = 제목, 나머지 = 열 이름 + 값」으로 쌓는다.
   lib/insights.ts 의 짧은 열 예산(NOWRAP_BUDGET_STACKED_EM)이 이 폭을 기준으로 잡혀 있다 */
@container (max-width: 739px) {
  .insight-body :deep(.insight-table--stack),
  .insight-body :deep(.insight-table--stack tbody),
  .insight-body :deep(.insight-table--stack tr) {
    display: block;
  }

  /* 머리글은 각 값 옆 이름표가 대신하므로 화면에서만 숨긴다 (스크린 리더는 읽는다) */
  .insight-body :deep(.insight-table--stack thead) {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .insight-body :deep(.insight-table--stack tr) {
    padding: 0.9rem 1rem 0.8rem;
  }

  .insight-body :deep(.insight-table--stack tr + tr) {
    border-top: 1px solid rgba(128, 128, 128, 0.18);
  }

  /* 이름표는 왼쪽 여백에 띄운다. flow-root 라 이름표가 두 줄이 돼도 칸 높이가 따라 늘어 다음 줄과 겹치지 않는다 */
  .insight-body :deep(.insight-table--stack td) {
    display: flow-root;
    padding: 0.2rem 0 0.2rem 6.75rem;
    border: 0;
    font-weight: 400;
    line-height: 1.45rem;
    white-space: normal;
  }

  .insight-body :deep(.insight-table--stack td::before) {
    content: attr(data-label);
    /* 이름표는 시각 보조라 스크린 리더에는 빈 문자열로 알린다 (지원하지 않는 브라우저는 위 줄을 쓴다) */
    content: attr(data-label) / "";
    float: left;
    width: 6rem;
    margin-left: -6.75rem;
    font-size: 0.8rem;
    line-height: 1.45rem;
    opacity: 0.6;
  }

  .insight-body :deep(.insight-table--stack td:first-child) {
    padding: 0 0 0.35rem;
    font-size: 0.98rem;
    font-weight: 600;
  }

  .insight-body :deep(.insight-table--stack td:first-child::before) {
    content: none;
  }
}

/* 코드·로그 블록도 가로 스크롤 대신 줄바꿈한다 (들여쓰기는 pre-wrap 이 지킨다) */
.insight-body :deep(pre) {
  padding: 1rem 1.15rem;
  border-radius: 8px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
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
  .insight-faq h2,
  .insight-sources h2 { font-size: 1.25rem; }
  .insight-answer { padding: 1rem 1.1rem; }
  .insight-body :deep(h2) { font-size: 1.25rem; margin-top: 2.25rem; }
  .insight-body :deep(table) { font-size: 0.88rem; }
  .insight-body :deep(th),
  .insight-body :deep(td) { padding: 0.65rem 0.8rem; }
}
</style>
