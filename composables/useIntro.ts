import type { Project } from './useProjects'

// ─── Types ───────────────────────────────────────────────────────────

export interface IntroCompany {
  id: string
  name: string
  service_description: string | null
  tech_stack: string[] | null
  hiring_positions: string[] | null
  lead_type: string
  ai_analysis: string | null
  ai_recommended_approach: string | null
  website: string | null
  intro_slug: string | null
}

export interface IntroService {
  id: string
  name: string
  matched: boolean
}

export interface IntroData {
  company: IntroCompany | null
  hero: { title: string; subtitle: string }
  services: IntroService[]
  projects: Project[]
  proposal: { headline: string; points: string[] }
  isPersonalized: boolean
}

// ─── Constants ───────────────────────────────────────────────────────

const SUPABASE_URL = 'https://jjqobumitamcyvfgnacf.supabase.co'

const SERVICE_MATCH: Record<string, string[]> = {
  web: ['React', 'Vue', 'Next.js', '프론트엔드', '웹개발', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
  mobile: ['Flutter', 'React Native', 'React-Native', 'iOS', 'Android', '앱개발', 'Kotlin', 'Swift'],
  backend: ['Java', 'Node.js', 'Python', 'Spring', 'Spring Boot', '백엔드', '서버개발', 'NestJS', 'Django', 'Express', 'REST API', 'GraphQL'],
  infra: ['AWS', 'Docker', 'Kubernetes', 'DevOps', 'Linux', 'CI/CD', 'GCP', 'Azure'],
  ai: ['AI', '인공지능', 'ML', '머신러닝', 'LLM', '데이터', 'PyTorch', 'TensorFlow'],
}

const SERVICE_NAMES: Record<string, string> = {
  web: '웹 개발',
  mobile: '모바일 앱 개발',
  backend: '백엔드 개발',
  infra: '인프라 구축',
  ai: 'AI 솔루션',
}

/** Noise patterns to strip from service_description when extracting keywords */
const NOISE_PATTERNS = [
  /경력\s*\d+\s*년[↑↓]?/g,
  /신입/g,
  /정규직/g,
  /계약직/g,
  /프리랜서/g,
  /파견/g,
  /서울\S*/g,
  /경기\S*/g,
  /인천\S*/g,
  /부산\S*/g,
  /대구\S*/g,
  /대전\S*/g,
  /광주\S*/g,
  /울산\S*/g,
  /세종\S*/g,
  /제주\S*/g,
  /\d+만\s*원/g,
  /연봉\s*\d+/g,
  /협의/g,
  /면접\s*후\s*결정/g,
  /[~·\-|/]+/g,
  /\s{2,}/g,
]

// ─── Composable ──────────────────────────────────────────────────────

export const useIntro = () => {
  const config = useRuntimeConfig()
  const { projects } = useProjects()

  const supabaseAnonKey = config.public.supabaseAnonKey as string

  // ─── Supabase REST helper ────────────────────────────────────────

  async function supabaseGet<T>(path: string): Promise<T[]> {
    return await $fetch<T[]>(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    })
  }

  // ─── 1. fetchCompanyBySlug ───────────────────────────────────────

  async function fetchCompanyBySlug(slug: string): Promise<IntroCompany | null> {
    // Try intro_slug exact match
    const bySlug = await supabaseGet<IntroCompany>(
      `companies?intro_slug=eq.${encodeURIComponent(slug)}&select=id,name,service_description,tech_stack,hiring_positions,lead_type,ai_analysis,ai_recommended_approach,website,intro_slug&limit=1`
    )
    if (bySlug.length > 0) return bySlug[0]

    // Try UUID fallback
    const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (UUID_RE.test(slug)) {
      const byId = await supabaseGet<IntroCompany>(
        `companies?id=eq.${encodeURIComponent(slug)}&select=id,name,service_description,tech_stack,hiring_positions,lead_type,ai_analysis,ai_recommended_approach,website,intro_slug&limit=1`
      )
      if (byId.length > 0) return byId[0]
    }

    // Fuzzy match by name
    const byName = await supabaseGet<IntroCompany>(
      `companies?name=ilike.*${encodeURIComponent(slug)}*&select=id,name,service_description,tech_stack,hiring_positions,lead_type,ai_analysis,ai_recommended_approach,website,intro_slug&limit=1`
    )
    if (byName.length > 0) return byName[0]

    return null
  }

  // ─── 2. matchServices ────────────────────────────────────────────

  function matchServices(techStack: string[]): IntroService[] {
    const lowerStack = techStack.map(t => t.toLowerCase())

    const scored = Object.entries(SERVICE_MATCH).map(([serviceId, keywords]) => {
      const matchCount = keywords.filter(kw =>
        lowerStack.some(tech => tech.includes(kw.toLowerCase()) || kw.toLowerCase().includes(tech))
      ).length

      return {
        id: serviceId,
        name: SERVICE_NAMES[serviceId],
        matched: matchCount > 0,
        _score: matchCount,
      }
    })

    // Sort: matched first, then by score descending
    scored.sort((a, b) => {
      if (a.matched !== b.matched) return a.matched ? -1 : 1
      return b._score - a._score
    })

    return scored.map(({ _score, ...rest }) => rest)
  }

  // ─── 3. matchProjects ────────────────────────────────────────────

  function matchProjects(techStack: string[], _leadType: string): Project[] {
    const lowerStack = new Set(techStack.map(t => t.toLowerCase()))

    const scored = projects.value.map(project => {
      const overlap = project.techStack.filter(pt =>
        lowerStack.has(pt.toLowerCase()) ||
        [...lowerStack].some(ct =>
          ct.includes(pt.toLowerCase()) || pt.toLowerCase().includes(ct)
        )
      ).length

      return { project, score: overlap }
    })

    scored.sort((a, b) => b.score - a.score)

    return scored
      .filter(s => s.score > 0)
      .slice(0, 2)
      .map(s => s.project)
  }

  // ─── 4. generateHero ─────────────────────────────────────────────

  function extractKeyword(description: string | null): string {
    if (!description) return '디지털 혁신'

    let cleaned = description
    for (const pattern of NOISE_PATTERNS) {
      cleaned = cleaned.replace(pattern, ' ')
    }
    cleaned = cleaned.trim()

    // Take the first meaningful phrase (up to 15 chars)
    const phrases = cleaned.split(/[,.]/).map(s => s.trim()).filter(s => s.length >= 2)
    if (phrases.length > 0) {
      const phrase = phrases[0]
      return phrase.length > 15 ? phrase.slice(0, 15) : phrase
    }

    return '디지털 혁신'
  }

  function generateHero(company: IntroCompany): { title: string; subtitle: string } {
    const name = company.name.replace(/\(주\)|주식회사|㈜/g, '').trim()
    const keyword = extractKeyword(company.service_description)
    const services = matchServices(company.tech_stack ?? [])
    const matchedNames = services.filter(s => s.matched).map(s => s.name)

    return {
      title: `${name}의 ${keyword},\n함께 성장하겠습니다.`,
      subtitle: matchedNames.length > 0
        ? matchedNames.join(' · ') + ' 파트너'
        : '기술 파트너',
    }
  }

  // ─── 5. generateProposal ─────────────────────────────────────────

  function generateProposal(company: IntroCompany): { headline: string; points: string[] } {
    const services = matchServices(company.tech_stack ?? [])
    const matchedNames = services.filter(s => s.matched).map(s => s.name)
    const isHiring = company.lead_type === 'hiring'

    const headline = isHiring
      ? '검증된 개발팀과 바로 시작하세요'
      : matchedNames.length > 0
        ? `${matchedNames[0]} 프로젝트, 경험 있는 팀이 함께합니다`
        : '경험 있는 개발팀이 함께합니다'

    const techLabel = matchedNames.length > 0 ? matchedNames.join(', ') : '다양한 기술 스택'

    const points = [
      `${techLabel} 실전 프로젝트 경험`,
      isHiring ? '채용 리드타임 없이 빠른 투입 가능' : '기획부터 배포까지 원스톱',
      '개발 후 유지보수/고도화 지속 지원',
    ]

    return { headline, points }
  }

  // ─── 6. generateSlug ─────────────────────────────────────────────

  function generateSlug(companyName: string): string {
    // Strip legal entity markers
    let name = companyName.replace(/\(주\)|주식회사|㈜/g, '').trim()

    // If English-only: lowercase + kebab-case
    if (/^[a-zA-Z0-9\s\-_.]+$/.test(name)) {
      return name
        .toLowerCase()
        .replace(/[_.]/g, '-')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 20)
    }

    // Korean or mixed: extract English parts or create abbreviation
    const englishParts = name.match(/[a-zA-Z]+/g)
    if (englishParts && englishParts.join('').length >= 3) {
      return englishParts
        .join('-')
        .toLowerCase()
        .slice(0, 20)
    }

    // Fallback: use consonant-based abbreviation of Korean
    const CHOSUNG = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
    const ROMANIZE: Record<string, string> = {
      'ㄱ': 'g', 'ㄲ': 'kk', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄸ': 'tt',
      'ㄹ': 'r', 'ㅁ': 'm', 'ㅂ': 'b', 'ㅃ': 'pp', 'ㅅ': 's',
      'ㅆ': 'ss', 'ㅇ': '', 'ㅈ': 'j', 'ㅉ': 'jj', 'ㅊ': 'ch',
      'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h',
    }

    const initials: string[] = []
    for (const char of name) {
      const code = char.charCodeAt(0) - 0xAC00
      if (code >= 0 && code < 11172) {
        const chosungIndex = Math.floor(code / 588)
        const romanized = ROMANIZE[CHOSUNG[chosungIndex]]
        if (romanized) initials.push(romanized)
      }
    }

    if (initials.length > 0) {
      return initials.join('').slice(0, 20)
    }

    // Final fallback: encode as simple hash-like string
    return `co-${name.length}-${name.charCodeAt(0).toString(36)}`.slice(0, 20)
  }

  // ─── Aggregate: build full IntroData ─────────────────────────────

  async function loadIntroData(slug: string): Promise<IntroData> {
    const company = await fetchCompanyBySlug(slug)

    if (!company) {
      return {
        company: null,
        hero: { title: '함께 성장하는 기술 파트너', subtitle: '웹 · 모바일 · 백엔드 · AI' },
        services: Object.entries(SERVICE_NAMES).map(([id, name]) => ({ id, name, matched: false })),
        projects: projects.value.slice(0, 2),
        proposal: {
          headline: '경험 있는 개발팀이 함께합니다',
          points: [
            '다양한 기술 스택 실전 프로젝트 경험',
            '기획부터 배포까지 원스톱',
            '개발 후 유지보수/고도화 지속 지원',
          ],
        },
        isPersonalized: false,
      }
    }

    const techStack = company.tech_stack ?? []
    const services = matchServices(techStack)
    const matched = matchProjects(techStack, company.lead_type)
    const hero = generateHero(company)
    const proposal = generateProposal(company)

    return {
      company,
      hero,
      services,
      projects: matched.length > 0 ? matched : projects.value.slice(0, 2),
      proposal,
      isPersonalized: true,
    }
  }

  return {
    fetchCompanyBySlug,
    matchServices,
    matchProjects,
    generateHero,
    generateProposal,
    generateSlug,
    loadIntroData,
  }
}
