<template>
  <main class="intro-page">
    <!-- Loading State -->
    <div v-if="pending" class="loading-state">
      <div class="intro-container">
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-subtitle"></div>
        <div class="skeleton-grid">
          <div v-for="n in 3" :key="n" class="skeleton skeleton-card"></div>
        </div>
      </div>
    </div>

    <!-- Not Found → Generic Intro -->
    <div v-else-if="!company" class="intro-page">
      <section class="intro-section hero-section">
        <div class="intro-container">
          <div class="not-found-notice">
            <Icon name="mdi:information-outline" />
            <span>{{ $t('intro.notFound.message') }}</span>
          </div>
          <h1 class="hero-title">
            <span class="gradient-text">{{ $t('intro.hero.default.title') }}</span>
          </h1>
          <p class="hero-subtitle">{{ $t('intro.hero.default.subtitle') }}</p>
          <div class="hero-cta">
            <a :href="contacts.calendlyUrl" target="_blank" rel="noopener noreferrer" class="btn-primary-intro">
              <Icon name="mdi:calendar-clock" />
              {{ $t('intro.hero.cta') }}
            </a>
          </div>
        </div>
      </section>
    </div>

    <!-- ═══ Personalized Content ═══ -->
    <template v-else>

      <!-- 1. Hero -->
      <section class="intro-section hero-section">
        <div class="intro-container">
          <p class="hero-eyebrow">{{ companyContent.eyebrow }}</p>
          <h1 class="hero-title">
            <span class="gradient-text" v-html="companyContent.heroTitle"></span>
          </h1>
          <p class="hero-subtitle">{{ companyContent.heroSubtitle }}</p>
          <div class="hero-cta">
            <a :href="contacts.calendlyUrl" target="_blank" rel="noopener noreferrer" class="btn-primary-intro">
              <Icon name="mdi:calendar-clock" />
              10분 미팅 예약하기
            </a>
            <button class="btn-secondary-intro" :class="{ copied: emailCopied }" @click="handleEmailClick">
              <Icon :name="emailCopied ? 'mdi:check-circle' : 'mdi:email-outline'" />
              {{ emailCopied ? `${contacts.email} 복사 완료` : '이메일 문의' }}
            </button>
          </div>
        </div>
      </section>

      <!-- 2. 귀사를 이해합니다 -->
      <section class="intro-section understand-section">
        <div class="intro-container">
          <h2 class="section-heading">
            <span class="gradient-text">{{ companyContent.understandTitle }}</span>
          </h2>
          <p class="section-desc">{{ companyContent.understandDesc }}</p>
          <div class="facts-grid">
            <div v-for="fact in companyContent.facts" :key="fact.label" class="fact-card">
              <div class="fact-value gradient-text">{{ fact.value }}</div>
              <div class="fact-label">{{ fact.label }}</div>
            </div>
          </div>
          <div class="understand-quote" v-if="companyContent.understandQuote">
            <p>{{ companyContent.understandQuote }}</p>
          </div>
        </div>
      </section>

      <!-- 3. Evergreen Dev 소개 -->
      <section class="intro-section about-section">
        <div class="intro-container">
          <h2 class="section-heading">
            <span class="gradient-text">Evergreen Dev</span>
          </h2>
          <p class="section-desc">
            웹, 앱, 백엔드를 아우르는 풀스택 개발팀입니다.<br>
            기획부터 디자인, 개발, 배포까지 한 팀에서 완결합니다.
          </p>

          <!-- 실적 -->
          <div class="about-stats">
            <div class="about-stat">
              <div class="about-stat-value gradient-text">40+</div>
              <div class="about-stat-label">완료 프로젝트</div>
            </div>
            <div class="about-stat">
              <div class="about-stat-value gradient-text">5.0 / 5.0</div>
              <div class="about-stat-label">클라이언트 만족도</div>
            </div>
            <div class="about-stat">
              <div class="about-stat-value gradient-text">99.9%</div>
              <div class="about-stat-label">서비스 가동률</div>
            </div>
          </div>

          <!-- 팀 구성 -->
          <div class="about-team">
            <h3 class="about-sub-heading">팀 구성</h3>
            <div class="team-roles">
              <div class="team-role">
                <Icon name="mdi:clipboard-check-outline" class="team-role-icon" />
                <span class="team-role-name">PM</span>
                <span class="team-role-count">1명</span>
              </div>
              <div class="team-role">
                <Icon name="mdi:palette-outline" class="team-role-icon" />
                <span class="team-role-name">디자이너</span>
                <span class="team-role-count">1명</span>
              </div>
              <div class="team-role">
                <Icon name="mdi:code-braces" class="team-role-icon" />
                <span class="team-role-name">개발자</span>
                <span class="team-role-count">3명</span>
              </div>
            </div>
          </div>

          <!-- 이런 팀입니다 -->
          <div class="about-values">
            <h3 class="about-sub-heading">이런 팀입니다</h3>
            <ul class="values-list">
              <li>
                <Icon name="mdi:check-circle-outline" class="value-icon" />
                <span>기획, 디자인, 개발이 <strong>하나의 팀에서 빠르게 소통</strong>하며 진행</span>
              </li>
              <li>
                <Icon name="mdi:check-circle-outline" class="value-icon" />
                <span>스타트업부터 공공기관까지 <strong>다양한 산업과 규모</strong>의 프로젝트 경험</span>
              </li>
              <li>
                <Icon name="mdi:check-circle-outline" class="value-icon" />
                <span>개발 완료 후에도 <strong>유지보수와 고도화를 지속 지원</strong>하는 장기 파트너십 지향</span>
              </li>
            </ul>
          </div>

          <!-- 기술 스택 -->
          <div class="about-tech">
            <span v-for="tech in ['React', 'Next.js', 'Vue', 'Flutter', 'Kotlin', 'Swift', 'Node.js', 'NestJS', 'Java', 'Spring Boot', 'Python', 'AWS']" :key="tech" class="about-tech-tag">{{ tech }}</span>
          </div>
        </div>
      </section>

      <!-- 4. 저희가 도움이 될 수 있는 영역 -->
      <section class="intro-section help-section">
        <div class="intro-container">
          <h2 class="section-heading">
            <span class="gradient-text">저희가 함께할 수 있는 영역</span>
          </h2>
          <div class="help-grid">
            <div v-for="area in companyContent.helpAreas" :key="area.title" class="help-card">
              <div class="help-icon">
                <Icon :name="area.icon" />
              </div>
              <h3>{{ area.title }}</h3>
              <p>{{ area.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. 유사 프로젝트 경험 -->
      <section class="intro-section projects-section">
        <div class="intro-container">
          <h2 class="section-heading">
            <span class="gradient-text">관련 프로젝트 경험</span>
          </h2>
          <p class="section-desc">{{ companyContent.projectsDesc }}</p>
          <div class="projects-grid">
            <article v-for="project in matchedProjects" :key="project.id" class="project-card">
              <div class="project-thumbnail">
                <img :src="project.images[0]" :alt="project.title" loading="lazy" />
              </div>
              <div class="project-body">
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
                <div class="project-relevance" v-if="companyContent.projectRelevance[project.id]">
                  <Icon name="mdi:link-variant" class="relevance-icon" />
                  <span>{{ companyContent.projectRelevance[project.id] }}</span>
                </div>
                <div class="tech-tags">
                  <span v-for="tech in project.techStack" :key="tech" class="tech-tag">{{ tech }}</span>
                </div>
              </div>
            </article>
          </div>
          <div class="projects-more">
            <NuxtLink :to="localePath('/projects')" class="more-link">
              더 많은 프로젝트 보기 <Icon name="mdi:arrow-right" />
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- 5. 협업 제안 -->
      <section class="intro-section proposal-section">
        <div class="intro-container">
          <h2 class="section-heading">
            <span class="gradient-text">협업 제안</span>
          </h2>
          <div class="proposal-card">
            <p class="proposal-headline">{{ companyContent.proposalHeadline }}</p>
            <ul class="proposal-points">
              <li v-for="(point, idx) in companyContent.proposalPoints" :key="idx">
                <Icon name="mdi:check-circle-outline" class="point-icon" />
                <div>
                  <strong v-if="point.title">{{ point.title }}</strong>
                  <span>{{ point.desc }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 6. 진행 방식 -->
      <section class="intro-section process-section">
        <div class="intro-container">
          <h2 class="section-heading">
            <span class="gradient-text">진행 방식</span>
          </h2>
          <p class="section-desc">체계적인 프로세스로 프로젝트를 성공으로 이끕니다.</p>
          <div class="process-timeline">
            <div v-for="(step, idx) in processSteps" :key="step.title" class="process-step">
              <div class="step-number">{{ String(idx + 1).padStart(2, '0') }}</div>
              <div class="step-content">
                <h3>{{ step.title }}</h3>
                <span class="step-duration">{{ step.duration }}</span>
                <p>{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. CTA -->
      <section class="intro-section cta-section">
        <div class="intro-container">
          <h2 class="cta-title">
            <span class="gradient-text">{{ companyContent.ctaTitle }}</span>
          </h2>
          <p class="cta-desc">{{ companyContent.ctaDesc }}</p>
          <div class="cta-buttons">
            <a :href="contacts.calendlyUrl" target="_blank" rel="noopener noreferrer" class="btn-primary-intro">
              <Icon name="mdi:calendar-clock" /> 미팅 예약하기
            </a>
            <button class="btn-secondary-intro" :class="{ copied: emailCopied }" @click="handleEmailClick">
              <Icon :name="emailCopied ? 'mdi:check-circle' : 'mdi:email-outline'" />
              {{ emailCopied ? `${contacts.email} 복사 완료` : '이메일 문의' }}
            </button>
          </div>
          <p class="cta-contact">{{ contacts.email }} · {{ contacts.phone || '' }}</p>
        </div>
      </section>

    </template>
  </main>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const { projects } = useProjects()
const { contacts } = useContactInfo()

const slug = route.params.slug as string

// ─── Supabase Fetch ─────────────────────────────
const config = useRuntimeConfig()
const SUPABASE_URL = config.public.supabaseUrl as string || 'https://jjqobumitamcyvfgnacf.supabase.co'
const SUPABASE_ANON_KEY = config.public.supabaseAnonKey as string

interface IntroCompany {
  id: string
  name: string
  intro_slug: string
  service_description: string | null
  lead_type: string
  tech_stack: string[] | null
  hiring_positions: string[] | null
  ceo_name: string | null
  website: string | null
  ai_analysis: string | null
  ai_recommended_approach: string | null
  employee_count: number | null
}

const companyData = ref<IntroCompany | null>(null)
const pending = ref(true)

onMounted(async () => {
  if (!SUPABASE_ANON_KEY) {
    pending.value = false
    return
  }
  try {
    const url = `${SUPABASE_URL}/rest/v1/companies?intro_slug=eq.${slug}&select=id,name,intro_slug,service_description,lead_type,tech_stack,hiring_positions,ceo_name,website,ai_analysis,ai_recommended_approach,employee_count`
    const res = await $fetch<IntroCompany[]>(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })
    if (res && res.length > 0) {
      companyData.value = res[0]
    }
  } catch (e: any) {
    console.error('Intro fetch error:', e)
  } finally {
    pending.value = false
  }
})

const company = computed(() => companyData.value)

// ─── Email Click Handler ────────────────────────
const emailCopied = ref(false)

async function handleEmailClick() {
  try {
    await navigator.clipboard.writeText(contacts.email)
    emailCopied.value = true
    setTimeout(() => { emailCopied.value = false }, 2000)
  } catch {}
}

// ─── SEO ────────────────────────────────────────
useSeoMeta({
  title: computed(() =>
    company.value
      ? `${cleanName(company.value.name)} | Evergreen Dev`
      : t('intro.meta.title')
  ),
  description: () => t('intro.meta.description'),
  ogImage: '/logo.png',
  ogType: 'website',
})

// ─── Helpers ────────────────────────────────────
function cleanName(name: string): string {
  return name.replace(/\(주\)|주식회사|㈜/g, '').trim()
}

// ─── 기업별 맞춤 콘텐츠 ─────────────────────────
// slug별로 직접 작성한 콘텐츠. DB에서 가져온 데이터를 보충.
interface CompanyContent {
  eyebrow: string
  heroTitle: string
  heroSubtitle: string
  understandTitle: string
  understandDesc: string
  understandQuote: string
  facts: { value: string; label: string }[]
  helpAreas: { icon: string; title: string; desc: string }[]
  projectsDesc: string
  projectRelevance: Record<string, string>
  proposalHeadline: string
  proposalPoints: { title: string; desc: string }[]
  ctaTitle: string
  ctaDesc: string
}

const CUSTOM_CONTENT: Record<string, CompanyContent> = {
  tnear: {
    eyebrow: 'For 티니어',
    heroTitle: '7,000만 사용자의 일상을<br>함께 만들겠습니다.',
    heroSubtitle: '200개국, 월 16억 실행을 지탱하는 서비스의 다음 성장을 위한 개발 파트너',
    understandTitle: '귀사를 이해합니다',
    understandDesc: '11년간 "기술로 편리함을 가까이" 라는 철학으로 성장해 온 티니어의 여정이 인상적입니다.',
    understandQuote: '2026년 AI 기반 개인화와 글로벌 확장이라는 다음 도전을 앞두고 계신 만큼, 현재 아키텍처를 이해한 후 가장 효과적인 확장 방안을 함께 설계하고 싶습니다.',
    facts: [
      { value: '7,000만+', label: '누적 다운로드' },
      { value: '200개국', label: '글로벌 서비스' },
      { value: '16억 회/월', label: '월간 실행 횟수' },
      { value: '11년차', label: '업력' },
    ],
    helpAreas: [
      {
        icon: 'mdi:server-network',
        title: '백엔드 확장',
        desc: '200개국 트래픽을 안정적으로 처리하는 서버 아키텍처 확장. Java, Node.js, Python 백엔드 실전 경험을 바탕으로 기존 시스템을 이해한 후 효율적인 확장 방안을 함께 설계합니다.',
      },
      {
        icon: 'mdi:brain',
        title: 'AI 개인화',
        desc: '사용자별 맞춤 정보 제공을 위한 AI 파이프라인 구축. LLM 연동, 데이터 분석, ML 모델 서빙 경험으로 실제 사용자 체감 차이를 만드는 AI 솔루션을 개발합니다.',
      },
      {
        icon: 'mdi:cellphone',
        title: '앱 고도화',
        desc: 'Flutter, React Native 크로스플랫폼부터 Kotlin, Swift 네이티브까지. 첫화면날씨, 디자인키보드, 번역기 등 다양한 앱 서비스의 기능 고도화와 새로운 앱 개발을 지원합니다.',
      },
    ],
    projectsDesc: '글로벌 서비스, 백엔드 확장, 앱 개발 경험이 있는 프로젝트입니다.',
    projectRelevance: {
      pozo: '공통점: 글로벌 앱 서비스 + 백엔드 확장 + 다중 플랫폼',
      crou: '공통점: 사용자 일상 서비스 + 개인화 데이터 처리',
    },
    proposalHeadline: '검증된 개발팀이 바로 함께할 수 있습니다',
    proposalPoints: [
      {
        title: '빠른 합류 — ',
        desc: '채용 프로세스 없이 Java, Node.js, Flutter 경험의 풀스택 팀이 기존 코드베이스를 파악한 후 빠르게 합류합니다.',
      },
      {
        title: '글로벌 경험 — ',
        desc: '다국어, 다중 지역 서비스를 운영한 경험으로 200개국 서비스 확장에 실질적인 도움을 드릴 수 있습니다.',
      },
      {
        title: '유연한 협업 — ',
        desc: '프로젝트 단위 또는 상주 개발 등 귀사의 상황에 맞는 협업 방식을 제안드립니다.',
      },
      {
        title: '지속적 파트너십 — ',
        desc: '개발 완료 후에도 유지보수와 고도화를 지속 지원합니다. 단기 외주가 아닌 장기 기술 파트너를 지향합니다.',
      },
    ],
    ctaTitle: '다음 단계를 함께 이야기해요',
    ctaDesc: '10분 미팅으로 티니어의 기술 과제와 저희 팀의 경험을 나눠보겠습니다. 부담 없이 편하게 연락해 주세요.',
  },
}

// 맞춤 콘텐츠가 없는 기업은 DB 데이터로 자동 생성
const companyContent = computed<CompanyContent>(() => {
  // 1. 수동 작성 콘텐츠 우선
  if (CUSTOM_CONTENT[slug]) return CUSTOM_CONTENT[slug]

  // 2. DB 데이터 기반 자동 생성 (폴백)
  const c = company.value
  if (!c) return CUSTOM_CONTENT.tnear // fallback

  const name = cleanName(c.name)
  const isHiring = c.lead_type === 'hiring'

  return {
    eyebrow: `For ${name}`,
    heroTitle: `${name}과 함께<br>성장하겠습니다.`,
    heroSubtitle: isHiring
      ? '채용 부담 없이, 검증된 개발팀과 바로 시작하세요'
      : '기획부터 배포까지, 풀스택 개발 파트너',
    understandTitle: '귀사를 이해합니다',
    understandDesc: c.service_description || `${name}의 기술적 과제를 함께 해결하겠습니다.`,
    understandQuote: '',
    facts: [],
    helpAreas: [
      { icon: 'mdi:web', title: '웹 개발', desc: 'React, Next.js, Vue 기반 고성능 웹 애플리케이션' },
      { icon: 'mdi:cellphone', title: '앱 개발', desc: 'Flutter, React Native 크로스플랫폼 + Kotlin, Swift 네이티브' },
      { icon: 'mdi:database', title: '백엔드', desc: 'Node.js, Java, Python 기반 안정적인 서버 아키텍처' },
    ],
    projectsDesc: '귀사의 기술 스택과 관련된 프로젝트 경험입니다.',
    projectRelevance: {},
    proposalHeadline: '검증된 개발팀과 함께 시작하세요',
    proposalPoints: [
      { title: '', desc: '웹, 앱, 백엔드 풀스택 실전 프로젝트 다수 완료' },
      { title: '', desc: isHiring ? '채용 리드타임 없이 빠른 투입 가능' : '기획부터 배포까지 원스톱으로 진행' },
      { title: '', desc: '개발 후 유지보수와 고도화를 지속 지원' },
    ],
    ctaTitle: '프로젝트를 함께 시작하세요',
    ctaDesc: '10분 미팅으로 프로젝트 방향을 함께 잡아보겠습니다.',
  }
})

// ─── Project Matching ───────────────────────────
const matchedProjects = computed(() => {
  const techStack = company.value?.tech_stack
  if (!techStack || techStack.length === 0) return projects.value.slice(0, 2)

  const companyTech = techStack.map((t: string) => t.toLowerCase())
  const scored = projects.value.map((project) => {
    const projectTech = project.techStack.map((t) => t.toLowerCase())
    const overlap = companyTech.filter((ct: string) =>
      projectTech.some((pt) => pt.includes(ct) || ct.includes(pt))
    ).length
    return { project, overlap }
  })
  scored.sort((a, b) => b.overlap - a.overlap)
  const matched = scored.filter((s) => s.overlap > 0).slice(0, 2)
  return matched.length > 0 ? matched.map((s) => s.project) : projects.value.slice(0, 2)
})

// ─── Process Steps ──────────────────────────────
const processSteps = [
  { title: '상담', duration: '1주', desc: '프로젝트 요구사항을 파악하고 최적의 기술 솔루션을 제안합니다.' },
  { title: '기획/견적', duration: '1-2주', desc: '요구사항 분석, WBS 작성, 상세 견적을 제공합니다.' },
  { title: '개발/QA', duration: '4-8주', desc: '애자일 스프린트로 개발하며, 주간 데모 리뷰를 진행합니다.' },
  { title: '인수인계', duration: '지속', desc: '코드와 문서를 인수인계하고, 유지보수를 지속 지원합니다.' },
]
</script>

<style scoped lang="scss">
.intro-page {
  padding-top: 120px;
  min-height: 100vh;
}

.intro-section {
  padding: 6rem 2rem;
}

.intro-container {
  max-width: 1100px;
  margin: 0 auto;
}

// ─── Loading / Skeleton ─────────────────────────
.loading-state {
  padding: 10rem 2rem;
  .intro-container { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
}

.skeleton {
  background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
  border-radius: 12px;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-title { width: 60%; height: 3rem; }
.skeleton-subtitle { width: 40%; height: 1.5rem; }
.skeleton-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; width: 100%; margin-top: 2rem; }
.skeleton-card { height: 250px; }

// ─── Not Found ──────────────────────────────────
.not-found-notice {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2);
  border-radius: 8px; padding: 0.75rem 1.25rem; margin-bottom: 2rem;
  color: #8892b0; font-size: 0.95rem;
}

// ─── Typography ─────────────────────────────────
.gradient-text {
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  background-clip: text; -webkit-background-clip: text; color: transparent;
}

.section-heading {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  text-align: center; margin-bottom: 1rem;
}

.section-desc {
  text-align: center; color: #8892b0; font-size: 1.1rem;
  max-width: 700px; margin: 0 auto 3rem; line-height: 1.7;
}

// ─── Hero ───────────────────────────────────────
.hero-section { text-align: center; padding: 8rem 2rem 6rem; }

.hero-eyebrow {
  font-size: 1rem; color: #64ffda; letter-spacing: 2px;
  text-transform: uppercase; margin-bottom: 1.5rem; font-weight: 500;
}

.hero-title {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  margin-bottom: 1.5rem; line-height: 1.3;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: #8892b0; max-width: 700px; margin: 0 auto 2.5rem; line-height: 1.7;
}

.hero-cta { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }

// ─── Buttons ────────────────────────────────────
.btn-primary-intro, .btn-secondary-intro {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.9rem 2rem; border-radius: 8px; font-size: 1rem;
  font-weight: 600; text-decoration: none; transition: all 0.3s ease; cursor: pointer;
}

.btn-primary-intro {
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  color: #0a192f;
  &:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(100,255,218,0.3); }
}

.btn-secondary-intro {
  background: transparent; color: #e2e8f0;
  border: 1px solid rgba(100,255,218,0.3); position: relative;
  transition: all 0.3s ease;
  &.copied {
    border-color: #64ffda; color: #64ffda; background: rgba(100,255,218,0.08);
  }
  &:hover { border-color: transparent; transform: translateY(-2px); }
  &:hover::after {
    content: ''; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
    background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
  }
}

// ─── Understand Section ─────────────────────────
.facts-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2rem;
}

.fact-card {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px; padding: 2rem 1.5rem; text-align: center;
  backdrop-filter: blur(10px);
}

.fact-value { font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem; }
.fact-label { color: #8892b0; font-size: 0.95rem; }

.understand-quote {
  max-width: 800px; margin: 2rem auto 0; text-align: center;
  p {
    font-size: 1.1rem; line-height: 1.8; color: #94a3b8;
    font-style: italic; position: relative; padding: 1.5rem 2rem;
    border-left: 3px solid #64ffda;
    background: rgba(100,255,218,0.03);
    border-radius: 0 12px 12px 0;
  }
}

// ─── About Section ──────────────────────────────
.about-stats {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;
  margin-bottom: 2.5rem;
}

.about-stat {
  text-align: center;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px; padding: 2rem 1.5rem; backdrop-filter: blur(10px);
}

.about-stat-value { font-size: 2.2rem; font-weight: 700; margin-bottom: 0.5rem; }
.about-stat-label { color: #8892b0; font-size: 0.95rem; }

.about-sub-heading {
  font-size: 1.1rem; color: #64ffda; text-align: center;
  margin-bottom: 1.5rem; font-weight: 600; letter-spacing: 1px;
}

.about-team { margin-bottom: 2.5rem; }

.team-roles {
  display: flex; justify-content: center; gap: 2rem;
}

.team-role {
  display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px; padding: 1.5rem 2.5rem; backdrop-filter: blur(10px);
}

.team-role-icon { font-size: 1.8rem; color: #64ffda; opacity: 0.9; }
.team-role-name { color: #e2e8f0; font-size: 0.95rem; font-weight: 500; }
.team-role-count { color: #8892b0; font-size: 0.85rem; }

.about-values { margin-bottom: 2.5rem; }

.values-list {
  list-style: none; padding: 0; margin: 0;
  max-width: 650px; margin: 0 auto;
  display: flex; flex-direction: column; gap: 1rem;

  li {
    display: flex; align-items: flex-start; gap: 0.6rem;
    color: #94a3b8; font-size: 1rem; line-height: 1.6;
    strong { color: #e2e8f0; }
  }
}

.value-icon { color: #64ffda; font-size: 1.3rem; flex-shrink: 0; margin-top: 0.15rem; }

.about-tech {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem;
}

.about-tech-tag {
  background: rgba(100,255,218,0.06); color: #64ffda;
  padding: 0.4rem 1rem; border-radius: 24px; font-size: 0.9rem;
  border: 1px solid rgba(100,255,218,0.1); transition: all 0.3s ease;
  &:hover { background: rgba(100,255,218,0.12); transform: translateY(-2px); }
}

// ─── Help Areas ─────────────────────────────────
.help-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }

.help-card {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px; padding: 2rem; backdrop-filter: blur(10px);
  transition: all 0.3s ease; position: relative;
  &:hover { transform: translateY(-5px); border-color: transparent; }
  &:hover::after {
    content: ''; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
    background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
  }
  h3 { color: #e2e8f0; font-size: 1.2rem; margin-bottom: 0.75rem; }
  p { color: #8892b0; font-size: 0.95rem; line-height: 1.6; }
}

.help-icon { font-size: 2.5rem; color: #64ffda; margin-bottom: 1rem; opacity: 0.9; }

// ─── Projects ───────────────────────────────────
.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }

.project-card {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px; overflow: hidden; transition: all 0.3s ease; position: relative;
  &:hover { transform: translateY(-5px); border-color: transparent; }
  &:hover::after {
    content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px;
    background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
  }
}

.project-thumbnail {
  width: 100%; height: 200px; overflow: hidden;
  background: rgba(17,34,64,0.5); display: flex; align-items: center; justify-content: center;
  img { width: 100%; height: 100%; object-fit: contain; padding: 1rem; }
}

.project-body {
  padding: 1.5rem;
  h3 { color: #e2e8f0; font-size: 1.2rem; margin-bottom: 0.5rem; }
  p { color: #8892b0; font-size: 0.95rem; line-height: 1.5; margin-bottom: 1rem; }
}

.project-relevance {
  display: flex; align-items: center; gap: 0.4rem;
  background: rgba(100,255,218,0.06); border: 1px solid rgba(100,255,218,0.12);
  border-radius: 8px; padding: 0.5rem 0.75rem; margin-bottom: 1rem;
  font-size: 0.85rem; color: #64ffda;
}

.relevance-icon { font-size: 1rem; flex-shrink: 0; }

.tech-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }

.tech-tag {
  background: rgba(100,255,218,0.08); color: #64ffda;
  padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.8rem;
  border: 1px solid rgba(100,255,218,0.1);
}

.projects-more { text-align: center; }

.more-link {
  display: inline-flex; align-items: center; gap: 0.4rem;
  color: #64ffda; font-size: 1rem; text-decoration: none; transition: all 0.3s ease;
  &:hover { gap: 0.8rem; }
}

// ─── Process ────────────────────────────────────
.process-timeline { display: flex; gap: 2rem; position: relative;
  &::before { content: ''; position: absolute; top: 1.5rem; left: 0; right: 0; height: 2px;
    background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa); }
}

.process-step { flex: 1; position: relative; padding-top: 3.5rem; }

.step-number {
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 3rem; height: 3rem; border-radius: 50%;
  background: rgba(10,25,47,0.95); border: 2px solid #64ffda;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem; font-weight: 700; color: #64ffda; z-index: 1;
}

.step-content {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px; backdrop-filter: blur(10px); padding: 1.5rem; text-align: center; margin-top: 1rem;
  h3 { color: #e2e8f0; font-size: 1.1rem; margin-bottom: 0.25rem; }
  p { color: #8892b0; font-size: 0.9rem; line-height: 1.5; }
}

.step-duration {
  display: inline-block; font-size: 0.8rem; color: #64ffda;
  background: rgba(100,255,218,0.08); padding: 0.15rem 0.5rem;
  border-radius: 4px; margin-bottom: 0.5rem;
}

// ─── Proposal ───────────────────────────────────
.proposal-card {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px; backdrop-filter: blur(10px); padding: 3rem;
  max-width: 800px; margin: 0 auto;
}

.proposal-headline { font-size: 1.3rem; color: #e2e8f0; margin-bottom: 2rem; line-height: 1.6; text-align: center; }

.proposal-points {
  list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1.5rem;
  li {
    display: flex; align-items: flex-start; gap: 0.75rem;
    color: #94a3b8; font-size: 1.05rem; line-height: 1.6;
    strong { color: #e2e8f0; }
  }
}

.point-icon { color: #64ffda; font-size: 1.4rem; flex-shrink: 0; margin-top: 0.15rem; }

// ─── CTA ────────────────────────────────────────
.cta-section { text-align: center; padding: 6rem 2rem 8rem; }
.cta-title { font-size: clamp(2rem, 4vw, 2.8rem); margin-bottom: 1rem; }
.cta-desc { color: #8892b0; font-size: 1.1rem; max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.6; }
.cta-buttons { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
.cta-contact { color: #475569; font-size: 0.9rem; margin-top: 1.5rem; }

// ─── Responsive ─────────────────────────────────
@media (max-width: 768px) {
  .intro-section { padding: 4rem 1.5rem; }
  .hero-section { padding: 6rem 1.5rem 4rem; }
  .facts-grid { grid-template-columns: repeat(2, 1fr); }
  .about-stats { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
  .team-roles { gap: 1rem; }
  .team-role { padding: 1.2rem 1.5rem; }
  .help-grid { grid-template-columns: 1fr; }
  .projects-grid { grid-template-columns: 1fr; }
  .process-timeline {
    flex-direction: column; gap: 1.5rem;
    &::before { width: 2px; height: 100%; top: 0; left: 1.5rem; right: auto; }
  }
  .process-step { padding-top: 0; padding-left: 4.5rem; }
  .step-number { top: 50%; left: 0; transform: translateY(-50%); }
  .step-content { margin-top: 0; text-align: left; }
  .proposal-card { padding: 2rem 1.5rem; }
  .skeleton-grid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .intro-section { padding: 3rem 1rem; }
  .hero-section { padding: 5rem 1rem 3rem; }
  .facts-grid { grid-template-columns: 1fr 1fr; gap: 1rem; }
  .about-stats { grid-template-columns: 1fr; gap: 1rem; }
  .team-roles { flex-direction: column; align-items: center; gap: 0.75rem; }
  .team-role { width: 100%; flex-direction: row; justify-content: center; padding: 1rem; }
  .btn-primary-intro, .btn-secondary-intro { width: 100%; justify-content: center; }
  .cta-buttons { flex-direction: column; align-items: center; }
}
</style>
