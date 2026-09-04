import MarkdownIt from 'markdown-it';

export interface Insight {
    slug: string;
    title: string;
    description: string;
    date: string;
    updated: string;
    category: string;
    tags: string[];
    readingTime: number;
    body: string;   // 마크다운 원문
    html: string;   // 렌더링된 HTML
}

/**
 * content/insights/*.md 를 빌드 타임에 읽어 글 목록을 만든다.
 * Nuxt Content 를 쓰지 않는 이유는 정적 생성(GitHub Pages) 환경에서
 * 네이티브 의존성 없이 동작시키기 위해서다. 파서는 markdown-it 하나만 쓴다.
 */

// eager: true 로 빌드 시점에 전부 인라인된다 (런타임 fetch 없음)
const rawFiles = import.meta.glob('~/content/insights/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
}) as Record<string, string>;

const md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: false,
    breaks: false,
});

/** 마크다운 frontmatter 파싱 (YAML 서브셋: 스칼라 + 하이픈 리스트) */
function parseFrontmatter(raw: string): { meta: Record<string, any>; body: string } {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) return { meta: {}, body: raw };

    const meta: Record<string, any> = {};
    let currentListKey: string | null = null;

    for (const line of match[1].split(/\r?\n/)) {
        if (!line.trim()) continue;

        // "  - item" 형태의 리스트 항목
        const listItem = line.match(/^\s+-\s+(.*)$/);
        if (listItem && currentListKey) {
            (meta[currentListKey] as string[]).push(stripQuotes(listItem[1].trim()));
            continue;
        }

        const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
        if (!kv) continue;

        const [, key, rawValue] = kv;
        const value = rawValue.trim();

        if (value === '') {
            // 다음 줄부터 리스트가 이어지는 키
            meta[key] = [];
            currentListKey = key;
        } else {
            meta[key] = stripQuotes(value);
            currentListKey = null;
        }
    }

    return { meta, body: match[2] };
}

function stripQuotes(s: string): string {
    return s.replace(/^["'](.*)["']$/, '$1');
}

function slugFromPath(path: string): string {
    return path.split('/').pop()!.replace(/\.md$/, '');
}

/** 한국어 기준 분당 500자로 읽기 시간 추정 (frontmatter 값이 있으면 그것을 쓴다) */
function estimateReadingTime(body: string): number {
    return Math.max(1, Math.round(body.replace(/\s/g, '').length / 500));
}

const insights: Insight[] = Object.entries(rawFiles)
    .map(([path, raw]) => {
        const { meta, body } = parseFrontmatter(raw);
        return {
            slug: slugFromPath(path),
            title: meta.title ?? slugFromPath(path),
            description: meta.description ?? '',
            date: meta.date ?? '',
            updated: meta.updated ?? meta.date ?? '',
            category: meta.category ?? '',
            tags: Array.isArray(meta.tags) ? meta.tags : [],
            readingTime: Number(meta.readingTime) || estimateReadingTime(body),
            body,
            html: md.render(body),
        };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // 최신 우선

export function useInsights() {
    return {
        insights,
        getInsight: (slug: string) => insights.find((i) => i.slug === slug),
        /** prerender 대상 경로 (nuxt.config 에서도 쓴다) */
        insightSlugs: insights.map((i) => i.slug),
    };
}
