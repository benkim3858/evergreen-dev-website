export interface InsightMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    updated: string;
    category: string;
    tags: string[];
    readingTime: number;
}

export interface Insight extends InsightMeta {
    html: string;
}

/**
 * content/insights/*.md 를 읽어 글 목록과 본문을 만든다.
 *
 * Nuxt Content 를 쓰지 않는 이유는 정적 생성(GitHub Pages) 환경에서
 * 네이티브 의존성 없이 동작시키기 위해서다. 파서는 markdown-it 하나만 쓴다.
 *
 * glob 과 markdown-it 을 모두 동적으로 불러오는 이유는 클라이언트 번들 때문이다.
 * eager glob + 정적 import 로 두면 렌더된 HTML 을 이미 받은 브라우저가
 * markdown-it 과 마크다운 원문 전체를 또 내려받는다(실측 137KB).
 * 아래 구조에서는 프리렌더 시점에만 로드되고 결과는 payload 로 전달된다.
 */
const rawLoaders = import.meta.glob('../content/insights/*.md', {
    query: '?raw',
    import: 'default',
}) as Record<string, () => Promise<string>>;

/**
 * 마크다운 frontmatter 파싱 (YAML 서브셋: 스칼라 + 하이픈 리스트)
 *
 * 지원하지 않는 문법을 만나면 조용히 넘어가는 대신 빌드를 세운다.
 * 잘못 파싱된 값이 그대로 <meta description> 이나 JSON-LD 로 발행되는 것이
 * 파싱 실패보다 나쁘기 때문이다.
 */
function parseFrontmatter(raw: string): { meta: Record<string, any>; body: string } {
    // BOM 제거 — 편집기에 따라 붙는데, 있으면 ^--- 가 불일치해 frontmatter 가 통째로 본문이 된다
    const text = raw.replace(/^﻿/, '');

    const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) return { meta: {}, body: text };

    const meta: Record<string, any> = {};
    let currentListKey: string | null = null;

    for (const line of match[1].split(/\r?\n/)) {
        if (!line.trim()) continue;

        // "- item" / "  - item" 둘 다 받는다 (들여쓰기 없는 쪽이 정석 YAML)
        const listItem = line.match(/^\s*-\s+(.*)$/);
        if (listItem) {
            if (!currentListKey) {
                throw new Error(`frontmatter: 어느 키에도 속하지 않은 리스트 항목 "${listItem[1]}"`);
            }
            (meta[currentListKey] as string[]).push(stripQuotes(listItem[1].trim()));
            continue;
        }

        const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
        if (!kv) {
            throw new Error(`frontmatter: 해석할 수 없는 줄 "${line.trim()}"`);
        }

        const [, key, rawValue] = kv;
        const value = rawValue.trim();

        // 블록 스칼라(> 또는 |)는 지원하지 않는다. 값이 "&gt;" 로 발행되는 사고를 막는다
        if (/^[>|][-+\d]*$/.test(value)) {
            throw new Error(`frontmatter: 블록 스칼라를 지원하지 않는다 (키 "${key}"). 한 줄로 쓰거나 따옴표로 감쌀 것`);
        }

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

/** 양끝이 같은 따옴표일 때만 벗긴다 (짝이 안 맞는 인용부호를 훼손하지 않도록) */
function stripQuotes(s: string): string {
    return s.replace(/^(["'])([\s\S]*)\1$/, '$2');
}

/** 발행 전에 필수 키를 검증한다. 누락되면 조용히 나가지 않고 빌드를 세운다 */
function assertRequired(slug: string, meta: Record<string, any>): void {
    for (const key of ['title', 'description', 'date'] as const) {
        const v = meta[key];
        if (typeof v !== 'string' || !v.trim()) {
            throw new Error(`content/insights/${slug}.md: frontmatter 의 "${key}" 가 비었거나 문자열이 아니다`);
        }
    }
}

function slugFromPath(path: string): string {
    return path.split('/').pop()!.replace(/\.md$/, '');
}

/** 한국어 기준 분당 500자로 읽기 시간 추정 (frontmatter 값이 있으면 그것을 쓴다) */
function estimateReadingTime(body: string): number {
    return Math.max(1, Math.round(body.replace(/\s/g, '').length / 500));
}

function toMeta(slug: string, meta: Record<string, any>, body: string): InsightMeta {
    return {
        slug,
        title: meta.title,
        description: meta.description,
        date: meta.date,
        updated: meta.updated ?? meta.date,
        category: meta.category ?? '',
        tags: Array.isArray(meta.tags) ? meta.tags : [],
        readingTime: Number(meta.readingTime) || estimateReadingTime(body),
    };
}

/** 최신 우선. 같은 날짜면 slug 로 안정 정렬한다 (0 을 반환하지 않는 comparator 는
 *  ECMA 명세상 결과가 구현 정의라 Node 버전에 따라 순서가 달라진다) */
function byDateDesc(a: InsightMeta, b: InsightMeta): number {
    return b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug);
}

async function renderMarkdown(body: string): Promise<string> {
    const { default: MarkdownIt } = await import('markdown-it');
    // ⚠️ html: false 를 유지할 것. true 로 바꾸면 pages/insights/[slug].vue 의
    // v-html 이 그대로 XSS sink 가 된다 (마크다운 원문의 <script> 가 실행된다)
    const md = new MarkdownIt({ html: false, linkify: true, typographer: false, breaks: false });
    return md.render(body);
}

/** 목록용 메타 (본문 HTML 없음) */
export async function loadInsightList(): Promise<InsightMeta[]> {
    const list = await Promise.all(
        Object.entries(rawLoaders).map(async ([path, load]) => {
            const slug = slugFromPath(path);
            const { meta, body } = parseFrontmatter(await load());
            assertRequired(slug, meta);
            return toMeta(slug, meta, body);
        })
    );
    return list.sort(byDateDesc);
}

/** 글 한 편 (본문 HTML 포함). 없으면 null */
export async function loadInsight(slug: string): Promise<Insight | null> {
    const entry = Object.entries(rawLoaders).find(([path]) => slugFromPath(path) === slug);
    if (!entry) return null;

    const { meta, body } = parseFrontmatter(await entry[1]());
    assertRequired(slug, meta);
    return { ...toMeta(slug, meta, body), html: await renderMarkdown(body) };
}
