import type { YamlMap, YamlValue } from './frontmatter';

/**
 * 인사이트 글의 메타데이터 정규화·검증과 RSS 생성
 *
 * 앱(composables/useInsights.ts), 서버(server/routes/insights/feed.xml.ts),
 * node 테스트(tests/insights.test.mjs)가 함께 쓴다. 그래서 런타임 import 를 두지 않는다
 * (위의 import type 은 컴파일 때 지워진다).
 *
 * 글 frontmatter 예시. title·description·date 만 필수이고, 나머지가 없으면 해당 섹션을 만들지 않는다.
 *
 *   title: 같은 앱인데 견적이 3배 차이 나는 이유
 *   description: 목록·<meta description>·RSS 에 쓰는 한두 문장 요약
 *   date: 2026-09-04
 *   updated: 2026-09-04
 *   category: 견적
 *   tags:
 *     - 앱 개발 외주
 *   readingTime: 8
 *   question: 독자가 검색창에 치는 질문 한 문장
 *   answer: >-
 *     수치·날짜가 들어간 직답 한 문장
 *   sources:
 *     - name: 문서 제목 (발행처)
 *       url: https://example.com/doc
 *   faq:
 *     - q: 질문
 *       a: >-
 *         답
 *
 * - updated 는 화면 직답 상자의 「기준일」이자 dateModified 다. 본문 사실이 바뀔 때 고친다
 * - 값에 ": " 나 " #" 가 들어가면 따옴표로 감싸거나 위처럼 >- 블록으로 쓴다 (아니면 빌드가 멈춘다)
 * - 줄 끝 주석(값 뒤의 # ...)은 쓰지 않는다. 주석은 별도 줄에 쓴다
 */

export const SITE_URL = 'https://evegdev.com';
export const INSIGHTS_URL = `${SITE_URL}/insights`;
export const INSIGHTS_FEED_PATH = '/insights/feed.xml';
export const INSIGHTS_FEED_URL = `${SITE_URL}${INSIGHTS_FEED_PATH}`;
/** RSS 채널 정보. 페이지 <link rel="alternate"> 의 title 도 이 값을 쓴다.
 *  description 은 목록 페이지 부제(i18n insights.subtitle)와 같은 문장이다 */
export const INSIGHTS_FEED_CHANNEL = {
    title: '개발 인사이트 | 에버그린 데브 (Evergreen Dev)',
    description: '프로젝트를 진행하며 실제로 부딪힌 문제와 판단 기준을 정리합니다.',
} as const;

export interface InsightSource {
    name: string;
    url: string;
}

export interface InsightFaq {
    q: string;
    a: string;
}

/** 목록·피드용 메타 */
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

/** 상세 페이지용 메타. 직답·FAQ·출처는 없는 글도 있다 (빈 문자열·빈 배열) */
export interface InsightDetail extends InsightMeta {
    /** 독자가 검색창에 치는 질문 */
    question: string;
    /** 본문 맨 앞에 보여 주는 직답 한 문장 */
    answer: string;
    sources: InsightSource[];
    /** 화면의 FAQ 섹션과 FAQPage JSON-LD 를 모두 이 값에서 만든다 */
    faq: InsightFaq[];
}

export interface Insight extends InsightDetail {
    html: string;
}

export function insightUrl(slug: string): string {
    return `${INSIGHTS_URL}/${slug}`;
}

export function slugFromPath(path: string): string {
    return path.split('/').pop()!.replace(/\.md$/, '');
}

/** 한국어 기준 분당 500자로 읽기 시간 추정 (frontmatter 값이 있으면 그것을 쓴다) */
function estimateReadingTime(body: string): number {
    return Math.max(1, Math.round(body.replace(/\s/g, '').length / 500));
}

function isMap(v: YamlValue | undefined): v is YamlMap {
    return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/**
 * frontmatter 를 검증해 상세 메타로 바꾼다.
 * 누락·형식 오류는 조용히 기본값으로 떨어뜨리지 않고 빌드를 세운다.
 * 잘못된 값이 <meta>·JSON-LD·RSS 로 발행되는 것이 빌드 실패보다 나쁘기 때문이다.
 */
export function toInsightDetail(slug: string, meta: YamlMap, body: string): InsightDetail {
    const where = `content/insights/${slug}.md`;
    const fail = (message: string): never => {
        throw new Error(`${where}: frontmatter ${message}`);
    };

    const requiredString = (key: string): string => {
        const v = meta[key];
        if (typeof v !== 'string' || !v.trim()) fail(`"${key}" 가 비었거나 문자열이 아니다`);
        return (v as string).trim();
    };
    /** 없거나 비었으면 '' */
    const optionalString = (key: string): string => {
        const v = meta[key];
        if (v === null || v === undefined) return '';
        if (typeof v !== 'string') fail(`"${key}" 는 문자열이어야 한다`);
        return (v as string).trim();
    };
    const dateValue = (key: string, value: string): string => {
        const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        const d = m && new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
        if (!m || !d || d.getUTCMonth() !== +m[2] - 1 || d.getUTCDate() !== +m[3]) {
            fail(`"${key}" 는 YYYY-MM-DD 형식의 실제 날짜여야 한다 (값: "${value}")`);
        }
        return value;
    };
    /** 매핑의 리스트를 읽는다. 각 항목에 fields 가 모두 비지 않은 문자열로 있어야 한다 */
    const mapList = <K extends string>(key: string, fields: K[]): Record<K, string>[] => {
        const v = meta[key];
        if (v === null || v === undefined) return [];
        if (!Array.isArray(v)) return fail(`"${key}" 는 리스트여야 한다`);
        return v.map((item, i) => {
            if (!isMap(item)) return fail(`"${key}" ${i + 1}번째 항목은 ${fields.join('·')} 를 가진 매핑이어야 한다`);
            const out = {} as Record<K, string>;
            for (const f of fields) {
                const fv = item[f];
                if (typeof fv !== 'string' || !fv.trim()) fail(`"${key}" ${i + 1}번째 항목의 "${f}" 가 비었거나 문자열이 아니다`);
                out[f] = (fv as string).trim();
            }
            return out;
        });
    };

    const title = requiredString('title');
    const description = requiredString('description');
    const date = dateValue('date', requiredString('date'));
    const updatedRaw = optionalString('updated');
    const updated = updatedRaw ? dateValue('updated', updatedRaw) : date;

    const tagsValue = meta.tags;
    let tags: string[] = [];
    if (tagsValue !== null && tagsValue !== undefined) {
        if (!Array.isArray(tagsValue) || tagsValue.some((t) => typeof t !== 'string' || !t.trim())) {
            fail('"tags" 는 비지 않은 문자열의 리스트여야 한다');
        }
        tags = (tagsValue as string[]).map((t) => t.trim());
    }

    const readingTimeRaw = optionalString('readingTime');
    if (readingTimeRaw && !/^[1-9]\d*$/.test(readingTimeRaw)) fail('"readingTime" 은 1 이상의 정수여야 한다');

    const sources = mapList('sources', ['name', 'url']);
    sources.forEach((s, i) => {
        // href 로 렌더되므로 javascript: 같은 스킴을 막는다
        if (!/^https?:\/\/[^\s]+$/.test(s.url)) fail(`"sources" ${i + 1}번째 항목의 url 은 http(s) 주소여야 한다 (값: "${s.url}")`);
    });

    return {
        slug,
        title,
        description,
        date,
        updated,
        category: optionalString('category'),
        tags,
        readingTime: readingTimeRaw ? Number(readingTimeRaw) : estimateReadingTime(body),
        question: optionalString('question'),
        answer: optionalString('answer'),
        sources,
        faq: mapList('faq', ['q', 'a']),
    };
}

/** 목록·피드에 필요한 필드만 남긴다 (목록 페이지 payload 를 가볍게 유지) */
export function toInsightMeta(detail: InsightDetail): InsightMeta {
    const { slug, title, description, date, updated, category, tags, readingTime } = detail;
    return { slug, title, description, date, updated, category, tags, readingTime };
}

/** 최신 우선. 같은 날짜면 slug 로 안정 정렬한다 (0 을 반환하지 않는 comparator 는
 *  ECMA 명세상 결과가 구현 정의라 Node 버전에 따라 순서가 달라진다) */
export function byDateDesc(a: InsightMeta, b: InsightMeta): number {
    return b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug);
}

/**
 * <script type="application/ld+json"> 에 넣을 JSON 문자열.
 * 값에 "</script>" 가 들어가도 태그가 닫히지 않도록 < > & 를 유니코드 이스케이프로 바꾼다.
 * JSON.parse 결과는 원래 값과 같다.
 */
export function toJsonLd(data: unknown): string {
    return JSON.stringify(data)
        .replace(/</g, '\\u003c')
        .replace(/>/g, '\\u003e')
        .replace(/&/g, '\\u0026');
}

// ─────────────────────────────────────────────
// 본문 표
// ─────────────────────────────────────────────

/** annotateTables 가 쓰는 markdown-it Token 의 일부 (markdown-it 을 import 하지 않으려고 직접 적는다) */
export interface MarkdownToken {
    type: string;
    content: string;
    children: MarkdownToken[] | null;
    attrSet(name: string, value: string): void;
    attrJoin(name: string, value: string): void;
}

/** 이 열 수 이상인 표는 본문 폭이 좁으면 행 단위로 쌓는다 (2열 표는 줄바꿈만으로 폭에 맞는다).
 *  쌓는 기준 폭은 pages/insights/[slug].vue 의 @container 조건이다 */
const STACK_MIN_COLUMNS = 3;

/**
 * 한 줄로 고정할 「짧은 열」 기준 (단위 em, 한글 1자 = 1em, 그 밖의 글자 = 0.55em 으로 어림한다).
 * 공수·기간·금액처럼 짧은 값이 「1,500만 ~ 4,000만 / 원」처럼 쪼개지는 것을 막는다.
 * 고정한 열 너비의 합(칸 여백 포함)이 예산을 넘으면 나머지 열이 너무 좁아지므로 짧은 열부터 예산만큼만 고정한다.
 * 예산은 표가 표 모양으로 보이는 가장 좁은 본문 폭을 기준으로 잡았다
 * (쌓이는 표는 본문 740px 이상 ≈ 50em, 2열 표는 모바일 본문 약 280px ≈ 20em)
 */
const NOWRAP_MAX_EM = 11;
const NOWRAP_CELL_PADDING_EM = 2.2;
const NOWRAP_BUDGET_STACKED_EM = 38;
const NOWRAP_BUDGET_NARROW_EM = 11;

function inlineText(token: MarkdownToken | undefined): string {
    return (token?.children ?? [])
        .filter((c) => c.type === 'text' || c.type === 'code_inline')
        .map((c) => c.content)
        .join('')
        .trim();
}

function displayWidthEm(text: string): number {
    let width = 0;
    for (const ch of text) width += /[\u1100-\u11ff\u3000-\u303f\u3130-\u318f\uac00-\ud7af\u4e00-\u9fff\uff00-\uffef]/.test(ch) ? 1 : 0.55;
    return width;
}

/**
 * markdown-it 표 토큰에 반응형 표시용 속성을 붙인다 (렌더 전에 토큰을 고친다).
 *
 * - table 에 class="insight-table", 열이 많으면 "insight-table--stack" 을 더한다.
 *   본문 폭이 좁으면 --stack 표는 행마다 「첫 칸 = 제목, 나머지 = 열 이름: 값」으로 쌓인다
 * - 본문 칸(td)에 data-label="열 이름" 을 단다. 쌓인 화면에서 CSS 가 이 값을 이름표로 보여 준다
 * - 짧은 열의 칸(th·td)에 class="insight-nowrap" 을 단다 (위 NOWRAP_* 설명)
 * - role 속성을 단다. CSS 로 display 를 바꾸면 일부 브라우저가 표 의미를 잃어
 *   스크린 리더가 행·열을 읽지 못하는데, role 이 그 의미를 되살린다
 */
export function annotateTables(tokens: MarkdownToken[]): void {
    for (let start = 0; start < tokens.length; start++) {
        if (tokens[start].type !== 'table_open') continue;
        let end = start;
        while (end < tokens.length && tokens[end].type !== 'table_close') end++;
        annotateTable(tokens, start, end);
        start = end;
    }
}

function annotateTable(tokens: MarkdownToken[], start: number, end: number): void {
    const headers: string[] = [];
    const cells: { token: MarkdownToken; column: number; text: string }[] = [];
    let inHead = false;
    let column = 0;

    for (let i = start + 1; i < end; i++) {
        const token = tokens[i];
        switch (token.type) {
            case 'thead_open':
                inHead = true;
                token.attrSet('role', 'rowgroup');
                break;
            case 'thead_close':
                inHead = false;
                break;
            case 'tbody_open':
                token.attrSet('role', 'rowgroup');
                break;
            case 'tr_open':
                column = 0;
                token.attrSet('role', 'row');
                break;
            case 'th_open':
            case 'td_open': {
                const text = inlineText(tokens[i + 1]);
                if (token.type === 'th_open') {
                    token.attrSet('role', 'columnheader');
                    if (inHead) headers[column] = text;
                } else {
                    token.attrSet('role', 'cell');
                    if (headers[column]) token.attrSet('data-label', headers[column]);
                }
                cells.push({ token, column, text });
                column++;
                break;
            }
        }
    }

    const stacked = headers.length >= STACK_MIN_COLUMNS;
    const table = tokens[start];
    table.attrJoin('class', stacked ? 'insight-table insight-table--stack' : 'insight-table');
    table.attrSet('role', 'table');

    // 짧은 열을 좁은 것부터 예산 안에서 한 줄로 고정한다
    const widths: number[] = [];
    for (const cell of cells) widths[cell.column] = Math.max(widths[cell.column] ?? 0, displayWidthEm(cell.text));
    const budget = stacked ? NOWRAP_BUDGET_STACKED_EM : NOWRAP_BUDGET_NARROW_EM;
    const nowrap = new Set<number>();
    let used = 0;
    widths
        .map((width, index) => ({ width, index }))
        .filter(({ width }) => width <= NOWRAP_MAX_EM)
        .sort((a, b) => a.width - b.width)
        .forEach(({ width, index }) => {
            if (used + width + NOWRAP_CELL_PADDING_EM > budget) return;
            used += width + NOWRAP_CELL_PADDING_EM;
            nowrap.add(index);
        });
    for (const cell of cells) {
        if (nowrap.has(cell.column)) cell.token.attrJoin('class', 'insight-nowrap');
    }
}

// ─────────────────────────────────────────────
// RSS 2.0
// ─────────────────────────────────────────────

function escapeXml(s: string): string {
    return s
        // XML 1.0 에서 쓸 수 없는 제어 문자는 지운다
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F￾￿]/g, '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** YYYY-MM-DD → RFC 822 날짜 (한국 시각 자정). RSS 2.0 pubDate 형식이다 */
export function toRfc822(date: string): string {
    const [y, m, d] = date.split('-').map(Number);
    const day = DAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
    return `${day}, ${String(d).padStart(2, '0')} ${MONTHS[m - 1]} ${y} 00:00:00 +0900`;
}

export interface FeedChannel {
    title: string;
    description: string;
}

/**
 * 인사이트 목록으로 RSS 2.0 문서를 만든다.
 * lastBuildDate 는 빌드 시각이 아니라 가장 최근 수정일이다. 글이 바뀌지 않으면 피드도 바뀌지 않는다.
 */
export function buildInsightsFeed(posts: InsightMeta[], channel: FeedChannel): string {
    const sorted = [...posts].sort(byDateDesc);
    const lastUpdated = sorted.reduce((max, p) => (p.updated > max ? p.updated : max), '');

    const items = sorted.map((p) => {
        const url = insightUrl(p.slug);
        const categories = [p.category, ...p.tags]
            .filter(Boolean)
            .map((c) => `      <category>${escapeXml(c)}</category>`);
        return [
            '    <item>',
            `      <title>${escapeXml(p.title)}</title>`,
            `      <link>${escapeXml(url)}</link>`,
            `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
            `      <pubDate>${toRfc822(p.date)}</pubDate>`,
            `      <description>${escapeXml(p.description)}</description>`,
            ...categories,
            '    </item>',
        ].join('\n');
    });

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
        '  <channel>',
        `    <title>${escapeXml(channel.title)}</title>`,
        `    <link>${INSIGHTS_URL}</link>`,
        `    <description>${escapeXml(channel.description)}</description>`,
        '    <language>ko</language>',
        ...(lastUpdated ? [`    <lastBuildDate>${toRfc822(lastUpdated)}</lastBuildDate>`] : []),
        `    <atom:link href="${INSIGHTS_FEED_URL}" rel="self" type="application/rss+xml"/>`,
        ...items,
        '  </channel>',
        '</rss>',
        '',
    ].join('\n');
}
