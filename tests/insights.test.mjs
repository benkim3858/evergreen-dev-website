// 인사이트 메타 정규화·RSS·JSON-LD 헬퍼 테스트 — `npm test`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter } from '../lib/frontmatter.ts';
import { buildInsightsFeed, toInsightDetail, toInsightMeta, toJsonLd, toRfc822 } from '../lib/insights.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const BASE = { title: '제목', description: '설명', date: '2026-09-04' };

test('새 필드가 없는 글도 기본값으로 읽힌다', () => {
    const d = toInsightDetail('a', { ...BASE }, '가'.repeat(1200));
    assert.deepEqual(d, {
        slug: 'a', title: '제목', description: '설명', date: '2026-09-04', updated: '2026-09-04',
        category: '', tags: [], readingTime: 2, question: '', answer: '', sources: [], faq: [],
    });
});

test('직답·FAQ·출처를 읽고 앞뒤 공백·블록 스칼라 끝 줄바꿈을 정리한다', () => {
    const { meta } = parseFrontmatter([
        '---',
        'title: 제목',
        'description: 설명',
        'date: 2026-09-04',
        'updated: 2026-10-21',
        'readingTime: 7',
        'question: 견적이 왜 다른가요?',
        'answer: >-',
        '  범위가 다르기',
        '  때문입니다.',
        'sources:',
        '  - name: "문서: 이름"',
        '    url: https://example.com/a?b=1',
        'faq:',
        '  - q: "질문: 하나?"',
        '    a: |',
        '      답 하나.',
        '---',
        '',
    ].join('\n'));
    const d = toInsightDetail('a', meta, '');
    assert.equal(d.updated, '2026-10-21');
    assert.equal(d.readingTime, 7);
    assert.equal(d.question, '견적이 왜 다른가요?');
    assert.equal(d.answer, '범위가 다르기 때문입니다.');
    assert.deepEqual(d.sources, [{ name: '문서: 이름', url: 'https://example.com/a?b=1' }]);
    assert.deepEqual(d.faq, [{ q: '질문: 하나?', a: '답 하나.' }]);
});

test('목록 메타에는 직답·FAQ·출처가 빠진다', () => {
    const d = toInsightDetail('a', { ...BASE, answer: 'x', faq: [{ q: 'q', a: 'a' }] }, '');
    assert.deepEqual(Object.keys(toInsightMeta(d)).sort(), ['category', 'date', 'description', 'readingTime', 'slug', 'tags', 'title', 'updated']);
});

const INVALID = {
    '제목 없음': [{ description: '설명', date: '2026-09-04' }, /"title"/],
    '빈 설명': [{ ...BASE, description: '' }, /"description"/],
    '없는 날짜': [{ ...BASE, date: '2026-02-30' }, /"date"/],
    '날짜 형식': [{ ...BASE, date: '2026/09/04' }, /"date"/],
    '수정일 형식': [{ ...BASE, updated: '어제' }, /"updated"/],
    '태그가 문자열': [{ ...BASE, tags: 'a' }, /"tags"/],
    '읽기 시간이 숫자가 아님': [{ ...BASE, readingTime: '7분' }, /"readingTime"/],
    '직답이 리스트': [{ ...BASE, answer: ['a'] }, /"answer"/],
    '출처가 문자열 리스트': [{ ...BASE, sources: ['https://a.b'] }, /"sources" 1번째/],
    '출처 url 누락': [{ ...BASE, sources: [{ name: 'a' }] }, /"url"/],
    '출처 url 스킴': [{ ...BASE, sources: [{ name: 'a', url: 'javascript:alert(1)' }] }, /http\(s\)/],
    'FAQ 답 누락': [{ ...BASE, faq: [{ q: '질문' }] }, /"faq" 1번째 항목의 "a"/],
    'FAQ 가 매핑': [{ ...BASE, faq: { q: 'x', a: 'y' } }, /"faq" 는 리스트/],
};

for (const [name, [meta, pattern]] of Object.entries(INVALID)) {
    test(`빌드를 세운다: ${name}`, () => {
        assert.throws(() => toInsightDetail('bad', meta, ''), (e) => pattern.test(e.message) && e.message.includes('content/insights/bad.md'));
    });
}

test('실제 글 3편이 모두 검증을 통과한다', () => {
    const dir = join(ROOT, 'content/insights');
    for (const f of readdirSync(dir).filter((x) => x.endsWith('.md'))) {
        const slug = f.replace(/\.md$/, '');
        const { meta, body } = parseFrontmatter(readFileSync(join(dir, f), 'utf8'), `content/insights/${f}`);
        const d = toInsightDetail(slug, meta, body);
        assert.equal(d.slug, slug);
    }
});

test('toRfc822: 요일과 한국 시각을 붙인다', () => {
    assert.equal(toRfc822('2026-09-04'), 'Fri, 04 Sep 2026 00:00:00 +0900');
    assert.equal(toRfc822('2026-10-21'), 'Wed, 21 Oct 2026 00:00:00 +0900');
});

const POSTS = [
    { slug: 'old', title: 'A & B <c>', description: '"따옴표" \'작은\'', date: '2026-01-02', updated: '2026-10-21', category: '견적', tags: ['t1'], readingTime: 3 },
    { slug: 'new', title: '새 글', description: '설명', date: '2026-09-04', updated: '2026-09-04', category: '', tags: [], readingTime: 1 },
];

test('RSS: 최신순·이스케이프·lastBuildDate 는 가장 최근 수정일', () => {
    const xml = buildInsightsFeed(POSTS, { title: '개발 인사이트 | 에버그린', description: '설명 & 요약' });
    assert.ok(xml.indexOf('<link>https://evegdev.com/insights/new</link>') < xml.indexOf('<link>https://evegdev.com/insights/old</link>'));
    assert.match(xml, /<title>A &amp; B &lt;c&gt;<\/title>/);
    assert.match(xml, /<description>&quot;따옴표&quot; &apos;작은&apos;<\/description>/);
    assert.match(xml, /<lastBuildDate>Wed, 21 Oct 2026 00:00:00 \+0900<\/lastBuildDate>/);
    assert.match(xml, /<category>견적<\/category>\n {6}<category>t1<\/category>/);
    assert.match(xml, /<atom:link href="https:\/\/evegdev.com\/insights\/feed.xml" rel="self" type="application\/rss\+xml"\/>/);
});

test('RSS: xmllint 로 well-formed 확인 (xmllint 가 없으면 건너뛴다)', (t) => {
    const xml = buildInsightsFeed(POSTS, { title: 't', description: 'd' });
    try {
        execFileSync('xmllint', ['--noout', '-'], { input: xml, stdio: ['pipe', 'pipe', 'pipe'] });
    } catch (e) {
        if (e.code === 'ENOENT') return t.skip('xmllint 없음');
        assert.fail(String(e.stderr));
    }
});

test('toJsonLd: </script> 로 태그가 닫히지 않고 JSON.parse 결과는 원래 값과 같다', () => {
    const data = { text: '</script><script>alert(1)</script> & 답' };
    const s = toJsonLd(data);
    assert.ok(!s.includes('<') && !s.includes('>') && !s.includes('&'));
    assert.deepEqual(JSON.parse(s), data);
});

test('annotateTables: 열 이름·role·쌓기 class·짧은 열 고정을 붙이고 속성 값은 이스케이프된다', async () => {
    const { default: MarkdownIt } = await import('markdown-it');
    const { annotateTables } = await import('../lib/insights.ts');
    const md = new MarkdownIt({ html: false });
    const render = (src) => {
        const env = {};
        const tokens = md.parse(src, env);
        annotateTables(tokens);
        return md.renderer.render(tokens, md.options, env);
    };

    const wide = render([
        '| 방식 | **동시 대응** | "특징" <b> | 공수 |',
        '|---|---|---|---|',
        '| 네이티브 | 각각 개발하는 방식으로 화면을 두 번 만든다 | 성능과 OS 기능 접근이 가장 좋음 | 1.8~2.0배 |',
        '| 웹뷰 | 웹 화면을 앱 껍데기에 담는 방식 | 콘텐츠 중심 서비스에 적합 | 0.6~0.8배 |',
        '',
    ].join('\n'));
    assert.match(wide, /<table class="insight-table insight-table--stack" role="table">/);
    assert.match(wide, /<td role="cell" data-label="동시 대응">각각 개발/);
    assert.match(wide, /<td role="cell" data-label="&quot;특징&quot; &lt;b&gt;">성능과/);
    // 짧은 열(방식·공수)만 한 줄로 고정한다
    assert.match(wide, /<td role="cell" data-label="방식" class="insight-nowrap">네이티브<\/td>/);
    assert.match(wide, /<td role="cell" data-label="공수" class="insight-nowrap">1\.8~2\.0배<\/td>/);
    assert.match(wide, /<th role="columnheader" class="insight-nowrap">공수<\/th>/);
    assert.doesNotMatch(wide, /data-label="동시 대응" class="insight-nowrap"/);

    const narrow = render('| 작업 | 기간 |\n|---|---|\n| 옛 저장 구조 파악 (소스 확인 포함) | 1~2일 |\n');
    assert.match(narrow, /<table class="insight-table" role="table">/);
    assert.match(narrow, /<td role="cell" data-label="기간" class="insight-nowrap">1~2일<\/td>/);
    assert.match(narrow, /<td role="cell" data-label="작업">옛 저장/);
});

test('annotateTables: 짧은 열이 많아도 고정 너비 합은 예산을 넘지 않는다', async () => {
    const { default: MarkdownIt } = await import('markdown-it');
    const { annotateTables } = await import('../lib/insights.ts');
    const md = new MarkdownIt();
    const tokens = md.parse('| 가나다라마바사아자차 | 가나다라마바사아자차 | 가나다라마바사아자차 | 가나다라마바사아자차 |\n|---|---|---|---|\n| 가 | 나 | 다 | 라 |\n', {});
    annotateTables(tokens);
    const html = md.renderer.render(tokens, md.options, {});
    // 열마다 10em + 여백 2.2em → 예산 38em 안에는 3열까지만 들어간다
    assert.equal((html.match(/<th role="columnheader" class="insight-nowrap">/g) ?? []).length, 3);
});
