// 인사이트 메타 정규화·RSS·JSON-LD 헬퍼 테스트 — `npm test`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter } from '../lib/frontmatter.ts';
import { toInsightDetail, toInsightMeta } from '../lib/insights.ts';

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
