import { parseFrontmatter } from '../lib/frontmatter';
import { byDateDesc, slugFromPath, toInsightDetail, toInsightMeta } from '../lib/insights';
import type { Insight, InsightDetail, InsightMeta } from '../lib/insights';

export type { Insight, InsightDetail, InsightFaq, InsightMeta, InsightSource } from '../lib/insights';

/**
 * content/insights/*.md 를 읽어 글 목록과 본문을 만든다.
 *
 * Nuxt Content 를 쓰지 않는 이유는 정적 생성(GitHub Pages) 환경에서
 * 네이티브 의존성 없이 동작시키기 위해서다. 파서는 markdown-it 하나만 쓴다.
 * frontmatter 파싱과 메타 검증은 lib/ 에 있다 (RSS 서버 라우트와 테스트가 함께 쓴다).
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

async function loadDetail(path: string, load: () => Promise<string>): Promise<{ detail: InsightDetail; body: string }> {
    const slug = slugFromPath(path);
    const { meta, body } = parseFrontmatter(await load(), `content/insights/${slug}.md`);
    return { detail: toInsightDetail(slug, meta, body), body };
}

async function renderMarkdown(body: string): Promise<string> {
    const { default: MarkdownIt } = await import('markdown-it');
    // ⚠️ html: false 를 유지할 것. true 로 바꾸면 pages/insights/[slug].vue 의
    // v-html 이 그대로 XSS sink 가 된다 (마크다운 원문의 <script> 가 실행된다)
    const md = new MarkdownIt({ html: false, linkify: true, typographer: false, breaks: false });
    return md.render(body);
}

/** 목록용 메타 (본문 HTML·직답·FAQ·출처 없음) */
export async function loadInsightList(): Promise<InsightMeta[]> {
    const list = await Promise.all(
        Object.entries(rawLoaders).map(async ([path, load]) => toInsightMeta((await loadDetail(path, load)).detail))
    );
    return list.sort(byDateDesc);
}

/** 글 한 편 (본문 HTML 포함). 없으면 null */
export async function loadInsight(slug: string): Promise<Insight | null> {
    const entry = Object.entries(rawLoaders).find(([path]) => slugFromPath(path) === slug);
    if (!entry) return null;

    const { detail, body } = await loadDetail(entry[0], entry[1]);
    return { ...detail, html: await renderMarkdown(body) };
}
