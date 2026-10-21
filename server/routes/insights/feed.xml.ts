import { parseFrontmatter } from '../../../lib/frontmatter';
import { INSIGHTS_FEED_CHANNEL, buildInsightsFeed, toInsightDetail, toInsightMeta } from '../../../lib/insights';

/**
 * /insights/feed.xml — 인사이트 글 RSS 2.0 피드
 *
 * nuxt generate 때 프리렌더되어 .output/public/insights/feed.xml 정적 파일이 된다
 * (nuxt.config.ts 의 prerender.routes). 글 원문은 nitro.serverAssets 로 등록한
 * content/insights 를 읽는다. 앱(composables/useInsights.ts)과 같은 파서·검증을 쓰므로
 * frontmatter 가 잘못되면 페이지와 마찬가지로 빌드가 멈춘다.
 */
export default defineEventHandler(async (event) => {
    const storage = useStorage('assets:insights');
    const keys = (await storage.getKeys()).filter((key) => key.endsWith('.md'));
    if (keys.length === 0) {
        throw createError({ statusCode: 500, statusMessage: 'content/insights 에 글이 없다' });
    }

    const posts = await Promise.all(
        keys.map(async (key) => {
            const slug = key.replace(/\.md$/, '');
            const raw = await storage.getItem(key);
            if (typeof raw !== 'string') throw new Error(`content/insights/${key} 를 문자열로 읽지 못했다`);
            const { meta, body } = parseFrontmatter(raw, `content/insights/${slug}.md`);
            return toInsightMeta(toInsightDetail(slug, meta, body));
        })
    );

    setResponseHeader(event, 'content-type', 'application/rss+xml; charset=utf-8');
    return buildInsightsFeed(posts, INSIGHTS_FEED_CHANNEL);
});
