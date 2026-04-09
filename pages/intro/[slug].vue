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

    <!-- Not Found Fallback -->
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
            <a
              :href="contacts.calendlyUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary-intro"
            >
              <Icon name="mdi:calendar-clock" />
              {{ $t('intro.hero.cta') }}
            </a>
          </div>
        </div>
      </section>

      <!-- Generic sections when company not found -->
      <IntroServices :services="services" :matched-keys="[]" />
      <IntroProjects :projects="topProjects" />
      <IntroProcess :steps="processSteps" />
      <IntroProposal :points="defaultProposalPoints" :headline="$t('intro.proposal.headline')" />
      <IntroCta :contacts="contacts" />
    </div>

    <!-- Personalized Content -->
    <template v-else>
      <!-- Hero Section -->
      <section class="intro-section hero-section">
        <div class="intro-container">
          <h1 class="hero-title">
            <span class="gradient-text">{{ personalizedTitle }}</span>
          </h1>
          <p class="hero-subtitle">{{ personalizedSubtitle }}</p>
          <div class="hero-cta">
            <a
              :href="contacts.calendlyUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary-intro"
            >
              <Icon name="mdi:calendar-clock" />
              {{ $t('intro.hero.cta') }}
            </a>
          </div>
        </div>
      </section>

      <!-- Services Section (with matching) -->
      <section class="intro-section services-section">
        <div class="intro-container">
          <h2 class="section-heading">
            <span class="gradient-text">{{ $t('intro.services.title') }}</span>
          </h2>
          <p class="section-desc">{{ $t('intro.services.subtitle') }}</p>
          <div class="services-grid">
            <div
              v-for="service in services"
              :key="service.key"
              class="service-card"
              :class="{ matched: matchedServiceKeys.includes(service.key) }"
            >
              <div class="service-icon">
                <Icon :name="service.icon" />
              </div>
              <h3>{{ $t(`intro.services.${service.key}.title`) }}</h3>
              <p>{{ $t(`intro.services.${service.key}.description`) }}</p>
              <ul class="service-list">
                <li v-for="(item, idx) in service.items" :key="idx">
                  {{ $t(`intro.services.${service.key}.items[${idx}]`) }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Section (filtered by tech match) -->
      <section class="intro-section projects-section">
        <div class="intro-container">
          <h2 class="section-heading">
            <span class="gradient-text">{{ $t('intro.projects.title') }}</span>
          </h2>
          <p class="section-desc">{{ $t('intro.projects.subtitle') }}</p>
          <div class="projects-grid">
            <article
              v-for="project in matchedProjects"
              :key="project.id"
              class="project-card"
            >
              <div class="project-thumbnail">
                <img :src="project.images[0]" :alt="project.title" loading="lazy" />
              </div>
              <div class="project-body">
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
                <div class="tech-tags">
                  <span v-for="tech in project.techStack" :key="tech" class="tech-tag">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </article>
          </div>
          <div class="projects-more">
            <NuxtLink :to="localePath('/projects')" class="more-link">
              {{ $t('intro.projects.viewMore') }}
              <Icon name="mdi:arrow-right" />
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Process Section -->
      <section class="intro-section process-section">
        <div class="intro-container">
          <h2 class="section-heading">
            <span class="gradient-text">{{ $t('intro.process.title') }}</span>
          </h2>
          <p class="section-desc">{{ $t('intro.process.subtitle') }}</p>
          <div class="process-timeline">
            <div
              v-for="(step, idx) in processSteps"
              :key="step.key"
              class="process-step"
            >
              <div class="step-number">{{ String(idx + 1).padStart(2, '0') }}</div>
              <div class="step-content">
                <h3>{{ $t(`intro.process.steps.${step.key}.title`) }}</h3>
                <p>{{ $t(`intro.process.steps.${step.key}.description`) }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Proposal Section (dynamic based on company) -->
      <section class="intro-section proposal-section">
        <div class="intro-container">
          <h2 class="section-heading">
            <span class="gradient-text">{{ $t('intro.proposal.title') }}</span>
          </h2>
          <div class="proposal-card">
            <p class="proposal-headline">{{ proposalHeadline }}</p>
            <ul class="proposal-points">
              <li v-for="(point, idx) in proposalPoints" :key="idx">
                <Icon name="mdi:check-circle-outline" class="point-icon" />
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="intro-section cta-section">
        <div class="intro-container">
          <h2 class="cta-title">
            <span class="gradient-text">{{ $t('intro.cta.title') }}</span>
          </h2>
          <p class="cta-desc">{{ $t('intro.cta.description') }}</p>
          <div class="cta-buttons">
            <a
              :href="contacts.calendlyUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary-intro"
            >
              <Icon name="mdi:calendar-clock" />
              {{ $t('intro.cta.meeting') }}
            </a>
            <a
              :href="`mailto:${contacts.email}`"
              class="btn-secondary-intro"
            >
              <Icon name="mdi:email-outline" />
              {{ $t('intro.cta.email') }}
            </a>
          </div>
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
const fetchError = ref<string | null>(null)

// 클라이언트에서만 fetch (SSG 404 fallback 대응)
onMounted(async () => {
  if (!SUPABASE_ANON_KEY) {
    fetchError.value = 'Supabase key not configured'
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
    fetchError.value = e?.message || 'fetch failed'
  } finally {
    pending.value = false
  }
})

const company = computed(() => companyData.value)

const isPersonalized = computed(() => !!company.value)

// ─── SEO ────────────────────────────────────────
useSeoMeta({
  title: computed(() =>
    isPersonalized.value
      ? `${company.value!.company_name} | Evergreen Dev`
      : t('intro.meta.title')
  ),
  description: () => t('intro.meta.description'),
  ogTitle: computed(() =>
    isPersonalized.value
      ? `${company.value!.company_name} | Evergreen Dev`
      : t('intro.meta.title')
  ),
  ogDescription: () => t('intro.meta.description'),
  ogImage: '/logo.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

// ─── Helpers ────────────────────────────────────
function cleanCompanyName(name: string): string {
  return name.replace(/\(주\)|주식회사|㈜/g, '').trim()
}

function extractServiceKeyword(desc: string | null): string {
  if (!desc) return '서비스'
  // Remove job posting noise
  const cleaned = desc
    .replace(/\[.*?\]/g, ' ')
    .replace(/\(.*?경력.*?\)/g, '')
    .replace(/\(.*?정규직.*?\)/g, '')
    .replace(/서울\S+/g, '')
    .replace(/경력\d+년[↑↓]?/g, '')
    .replace(/초대졸[↑↓]?/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  // Take first meaningful phrase (up to 20 chars)
  const words = cleaned.split(/[,.]/).filter(w => w.trim().length > 2)
  return words[0]?.trim().slice(0, 30) || '서비스'
}

// ─── Personalized Hero ──────────────────────────
const personalizedTitle = computed(() => {
  if (!company.value) return t('intro.hero.default.title')
  const name = cleanCompanyName(company.value.name)
  const keyword = extractServiceKeyword(company.value.service_description)
  return `${name}의 ${keyword},\n함께 성장하겠습니다.`
})

const personalizedSubtitle = computed(() => {
  if (!company.value) return t('intro.hero.default.subtitle')
  const matched = matchedServiceKeys.value
  const serviceNames: Record<string, string> = {
    web: '웹 개발', mobile: '앱 개발', backend: '백엔드',
    infra: '인프라', ai: 'AI 솔루션'
  }
  const names = matched.map(k => serviceNames[k] || k).slice(0, 3)
  return names.length > 0 ? names.join(' · ') + ' 파트너' : t('intro.hero.default.subtitle')
})

// ─── Service Matching ───────────────────────────
const services = [
  { key: 'web', icon: 'mdi:web', items: [0, 1, 2] },
  { key: 'mobile', icon: 'mdi:cellphone', items: [0, 1, 2] },
  { key: 'backend', icon: 'mdi:database', items: [0, 1, 2] },
  { key: 'infra', icon: 'mdi:server-network', items: [0, 1, 2] },
  { key: 'ai', icon: 'mdi:robot-outline', items: [0, 1, 2] },
]

const SERVICE_MATCH: Record<string, string[]> = {
  web: ['React', 'Vue', 'Next.js', '프론트엔드', '웹개발', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
  mobile: ['Flutter', 'React Native', 'React-Native', 'iOS', 'Android', '앱개발', 'Kotlin', 'Swift'],
  backend: ['Java', 'Node.js', 'Python', 'Spring', 'Spring Boot', '백엔드', '서버개발', 'NestJS', 'Django', 'Express', 'REST API', 'GraphQL'],
  infra: ['AWS', 'Docker', 'Kubernetes', 'DevOps', 'Linux', 'CI/CD', 'GCP', 'Azure'],
  ai: ['AI', '인공지능', 'ML', '머신러닝', 'LLM', '데이터', 'PyTorch', 'TensorFlow'],
}

const matchedServiceKeys = computed(() => {
  const techStack = company.value?.tech_stack
  if (!techStack || techStack.length === 0) return []
  const techLower = techStack.map(t => t.toLowerCase())
  return Object.entries(SERVICE_MATCH)
    .filter(([_, keywords]) =>
      keywords.some(kw => techLower.some(t => t.includes(kw.toLowerCase()) || kw.toLowerCase().includes(t)))
    )
    .map(([key]) => key)
})

// ─── Project Matching ───────────────────────────
const topProjects = computed(() => projects.value.slice(0, 3))

const matchedProjects = computed(() => {
  if (!company.value?.tech_stack || company.value.tech_stack.length === 0) {
    return projects.value.slice(0, 2)
  }

  const companyTech = company.value.tech_stack.map((t: string) => t.toLowerCase())

  // Score projects by tech stack overlap
  const scored = projects.value.map((project) => {
    const projectTech = project.techStack.map((t) => t.toLowerCase())
    const overlap = companyTech.filter((ct: string) =>
      projectTech.some((pt) => pt.includes(ct) || ct.includes(pt))
    ).length
    return { project, overlap }
  })

  scored.sort((a, b) => b.overlap - a.overlap)

  // Return top 1-2 with at least some overlap, fallback to first 2
  const matched = scored.filter((s) => s.overlap > 0).slice(0, 2)
  if (matched.length === 0) return projects.value.slice(0, 2)
  return matched.map((s) => s.project)
})

// ─── Process Steps ──────────────────────────────
const processSteps = [
  { key: 'discovery' },
  { key: 'planning' },
  { key: 'development' },
  { key: 'delivery' },
]

// ─── Proposal ───────────────────────────────────
const defaultProposalPoints = computed(() => [
  t('intro.proposal.defaultPoints[0]'),
  t('intro.proposal.defaultPoints[1]'),
  t('intro.proposal.defaultPoints[2]'),
])

const proposalHeadline = computed(() => {
  if (!company.value) return t('intro.proposal.defaultHeadline')
  const isHiring = company.value.lead_type === 'hiring'
  if (isHiring) return '검증된 개발팀과 바로 시작하세요'
  const serviceNames: Record<string, string> = {
    web: '웹 개발', mobile: '앱 개발', backend: '백엔드',
    infra: '인프라', ai: 'AI 솔루션'
  }
  const firstMatch = matchedServiceKeys.value[0]
  return firstMatch
    ? `${serviceNames[firstMatch]} 프로젝트, 경험 있는 팀이 함께합니다`
    : t('intro.proposal.defaultHeadline')
})

const proposalPoints = computed(() => {
  if (!company.value) return defaultProposalPoints.value
  const isHiring = company.value.lead_type === 'hiring'
  const serviceNames: Record<string, string> = {
    web: '웹', mobile: '앱', backend: '백엔드', infra: '인프라', ai: 'AI'
  }
  const techs = matchedServiceKeys.value.map(k => serviceNames[k] || k).join(', ')
  return [
    techs ? `${techs} 실전 프로젝트 다수 완료` : t('intro.proposal.defaultPoints[0]'),
    isHiring ? '채용 리드타임 없이 빠른 투입 가능' : '기획부터 배포까지 원스톱으로 진행',
    '개발 후 유지보수와 고도화를 지속 지원',
  ]
})
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
  max-width: 1200px;
  margin: 0 auto;
}

// ─── Loading / Skeleton ─────────────────────────
.loading-state {
  padding: 10rem 2rem;

  .intro-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.03) 25%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.03) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
  border-radius: 12px;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-title {
  width: 60%;
  height: 3rem;
}

.skeleton-subtitle {
  width: 40%;
  height: 1.5rem;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
  margin-top: 2rem;
}

.skeleton-card {
  height: 250px;
}

// ─── Not Found Notice ───────────────────────────
.not-found-notice {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(167, 139, 250, 0.1);
  border: 1px solid rgba(167, 139, 250, 0.2);
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  margin-bottom: 2rem;
  color: var(--text-color);
  font-size: 0.95rem;
}

// ─── Typography ─────────────────────────────────
.gradient-text {
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.section-heading {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  text-align: center;
  margin-bottom: 1rem;
}

.section-desc {
  text-align: center;
  color: var(--text-color);
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

// ─── Hero ───────────────────────────────────────
.hero-section {
  text-align: center;
  padding: 8rem 2rem 6rem;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  color: var(--text-color);
  max-width: 650px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
}

.hero-cta {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

// ─── Buttons ────────────────────────────────────
.btn-primary-intro,
.btn-secondary-intro {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-primary-intro {
  background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  color: #0a192f;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(100, 255, 218, 0.3);
  }
}

.btn-secondary-intro {
  background: transparent;
  color: var(--text-color-light);
  border: 1px solid rgba(100, 255, 218, 0.3);
  position: relative;

  &:hover {
    border-color: transparent;
    transform: translateY(-2px);
  }

  &:hover::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}

// ─── Services ───────────────────────────────────
.services-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1.5rem;
}

.service-card {
  grid-column: span 2;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  opacity: 0.4;

  &:nth-child(4) {
    grid-column: 2 / span 2;
  }

  &:nth-child(5) {
    grid-column: 4 / span 2;
  }

  // Matched state: full opacity + gradient border
  &.matched {
    opacity: 1;

    &::after {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }
  }

  &:hover {
    opacity: 1;
    transform: translateY(-5px);
    border-color: transparent;
  }

  &:hover::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  h3 {
    color: var(--text-color-light);
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }

  p {
    color: var(--text-color);
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
}

.service-icon {
  font-size: 2.5rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
  opacity: 0.9;
}

.service-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    color: var(--text-color);
    font-size: 0.9rem;
    padding: 0.3rem 0;
    padding-left: 1.2rem;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-color);
      transform: translateY(-50%);
      opacity: 0.6;
    }
  }
}

// ─── Projects ───────────────────────────────────
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    border-color: transparent;
  }

  &:hover::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}

.project-thumbnail {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: rgba(17, 34, 64, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 1rem;
  }
}

.project-body {
  padding: 1.5rem;

  h3 {
    color: var(--text-color-light);
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-color);
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: rgba(100, 255, 218, 0.08);
  color: var(--accent-color);
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid rgba(100, 255, 218, 0.1);
}

.projects-more {
  text-align: center;
}

.more-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--accent-color);
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    gap: 0.8rem;
  }
}

// ─── Process Timeline ───────────────────────────
.process-timeline {
  display: flex;
  gap: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 2rem;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(120deg, #64ffda, #4af3ff, #a78bfa);
  }
}

.process-step {
  flex: 1;
  position: relative;
  padding-top: 3.5rem;
}

.step-number {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: rgba(10, 25, 47, 0.9);
  border: 2px solid var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--accent-color);
  z-index: 1;
}

.step-content {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  text-align: center;
  margin-top: 1rem;

  h3 {
    color: var(--text-color-light);
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-color);
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

// ─── Proposal ───────────────────────────────────
.proposal-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  padding: 3rem;
  max-width: 800px;
  margin: 0 auto;
}

.proposal-headline {
  font-size: 1.3rem;
  color: var(--text-color-light);
  margin-bottom: 2rem;
  line-height: 1.6;
  text-align: center;
}

.proposal-points {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    color: var(--text-color);
    font-size: 1.05rem;
    line-height: 1.6;
  }
}

.point-icon {
  color: var(--accent-color);
  font-size: 1.4rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

// ─── CTA ────────────────────────────────────────
.cta-section {
  text-align: center;
  padding: 6rem 2rem 8rem;
}

.cta-title {
  font-size: clamp(2rem, 4vw, 2.8rem);
  margin-bottom: 1rem;
}

.cta-desc {
  color: var(--text-color);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

// ─── Responsive ─────────────────────────────────
@media (max-width: 768px) {
  .intro-section {
    padding: 4rem 1.5rem;
  }

  .hero-section {
    padding: 6rem 1.5rem 4rem;
  }

  .skeleton-grid {
    grid-template-columns: 1fr;
  }

  // Tablet: 2+2+1 grid
  .services-grid {
    grid-template-columns: repeat(2, 1fr);

    .service-card {
      grid-column: span 1;

      &:nth-child(4) {
        grid-column: span 1;
      }

      &:nth-child(5) {
        grid-column: span 1;
      }
    }
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  // Vertical timeline
  .process-timeline {
    flex-direction: column;
    gap: 1.5rem;

    &::before {
      width: 2px;
      height: 100%;
      top: 0;
      left: 2rem;
      right: auto;
    }
  }

  .process-step {
    padding-top: 0;
    padding-left: 5rem;
  }

  .step-number {
    top: 50%;
    left: 0.5rem;
    transform: translateY(-50%);
  }

  .step-content {
    margin-top: 0;
    text-align: left;
  }

  .proposal-card {
    padding: 2rem 1.5rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .intro-section {
    padding: 3rem 1rem;
  }

  .hero-section {
    padding: 5rem 1rem 3rem;
  }

  // Mobile: 1 column
  .services-grid {
    grid-template-columns: 1fr;

    .service-card {
      grid-column: span 1;
    }
  }

  .btn-primary-intro,
  .btn-secondary-intro {
    width: 100%;
    justify-content: center;
  }
}
</style>
