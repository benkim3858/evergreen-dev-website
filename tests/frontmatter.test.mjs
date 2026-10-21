// frontmatter 파서 테스트 — `npm test` (Node 22.18+ 의 TypeScript 타입 제거 기능으로 .ts 를 바로 읽는다)
//
// 파서가 받아들인 입력은 실제 YAML 파서와 같은 값이어야 한다는 원칙을
// js-yaml(failsafe 스키마: 모든 스칼라를 문자열로)과 대조해 확인한다.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { parseFrontmatter, parseYamlSubset } from '../lib/frontmatter.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function viaYaml(src) {
    return yaml.load(src, { schema: yaml.FAILSAFE_SCHEMA }) ?? {};
}

/** 파서 결과가 js-yaml 결과와 같은지 본다 */
function assertSameAsYaml(src, message) {
    // structuredClone: 파서는 null 프로토타입이 아닌 일반 객체를 만들지만 비교를 명확히 하려고 정규화한다
    assert.deepEqual(structuredClone(parseYamlSubset(src)), viaYaml(src), message ?? src);
}

test('기존 인사이트 글 frontmatter 는 js-yaml 과 같은 값으로 읽힌다', () => {
    const dir = join(ROOT, 'content/insights');
    const files = readdirSync(dir).filter((f) => f.endsWith('.md'));
    assert.ok(files.length > 0);
    for (const f of files) {
        const raw = readFileSync(join(dir, f), 'utf8');
        const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1];
        assertSameAsYaml(fm, f);
    }
});

const VALID = {
    '스칼라와 들여쓴 리스트': 'title: 제목\ntags:\n  - a\n  - b\nreadingTime: 7',
    '키와 같은 칸에서 시작한 리스트': 'tags:\n- a\n- b\nnext: x',
    'URL·시각처럼 공백 없는 콜론': 'url: https://example.com/a?b=c#d\ntime: 10:30\nc: C#',
    '따옴표 안의 콜론·샵': 'a: "질문: 무엇 #1"\nb: \'답: 이것 #2\'',
    '큰따옴표 이스케이프': 'a: "탭\\t따옴표\\"역슬래시\\\\ 유니코드\\u00e9 \\x41"',
    '작은따옴표 이스케이프': "a: 'it''s'",
    '빈 따옴표': 'a: ""\nb: \'\'',
    '빈 값은 null': 'a:\nb: x\nc:',
    '줄 전체 주석과 들여쓴 주석': '# 맨 위 주석\na: x\n  # 들여쓴 주석\nb: y\n# 끝 주석',
    '따옴표 뒤 주석': 'a: "x" # 주석\nb: |  # 주석\n  y',
    '여러 줄 평문': 'a: 첫째 줄\n  둘째 줄\n\n  넷째 줄\nb: y',
    '다음 줄에서 시작하는 평문': 'a:\n  첫째\n  둘째\nb: y',
    '여러 줄 큰따옴표': 'a: "one\n  two\\\n  three\n\n  four"',
    '여러 줄 작은따옴표': "a: 'one\n  two'",
    '리터럴 블록': 'a: |\n  l1\n   l2\n\n  l3\n\nb: x',
    '리터럴 블록 strip': 'a: |-\n  l1\n  l2\n\n',
    '리터럴 블록 keep': 'a: |+\n  l1\n\n\nb: x',
    '접는 블록': 'a: >\n  f1\n  f2\n\n  f3\n    more\n  f4\nb: x',
    '접는 블록 strip': 'a: >-\n  f1\n  f2\n',
    '들여쓰기 지시자': 'a: |2\n    x\n  y\n',
    '블록 안의 # 와 콜론은 내용': 'a: |\n  # 제목: 내용\n  b: c\n',
    '매핑 리스트 (faq·sources)':
        'faq:\n  - q: "질문: 무엇인가"\n    a: |\n      답1\n      답2\n  - q: 둘째\n    a: >-\n      접힌\n      답\n' +
        'sources:\n  - name: 문서 (Apple)\n    url: https://developer.apple.com/documentation/security\n',
    '키와 같은 칸의 매핑 리스트': 'faq:\n- q: x\n  a: y\n- q: z\n  a: w\n',
    '리스트 항목 블록 스칼라': 's:\n  - |\n    x\n    y\n  - z',
    '리스트 항목 여러 줄 평문': 's:\n  - one\n    two\n  - three',
    '매핑 리스트 안 여러 줄 평문': 'faq:\n  - q: 첫째\n      이어짐\n    a: 둘째\n',
    '매핑 리스트 안 들여쓰기 지시자': 'faq:\n  - a: |2\n        x\n      y\n',
    '중첩 매핑': 'a:\n  b: c\n  d:\n    e: f',
    '리스트 항목 안 리스트 값': 'faq:\n  - tags:\n      - a\n      - b\n    q: x\n',
    '한글 값의 특수문자': 'title: 2026년 앱 스토어 — 지금 (API 36) 100% · "인용" \'작은\'',
    '끝 공백': 'a: x   \nb: "y"   ',
};

for (const [name, src] of Object.entries(VALID)) {
    test(`js-yaml 과 같다: ${name}`, () => assertSameAsYaml(src));
}

test('주요 값의 실제 해석 (js-yaml 대조와 별개로 의도를 고정한다)', () => {
    assert.deepEqual(parseYamlSubset('faq:\n  - q: "질문: 무엇"\n    a: |\n      답1\n      답2\n'), {
        faq: [{ q: '질문: 무엇', a: '답1\n답2\n' }],
    });
    assert.deepEqual(parseYamlSubset('a: 첫째\n  둘째'), { a: '첫째 둘째' });
    assert.deepEqual(parseYamlSubset('a: >-\n  f1\n  f2'), { a: 'f1 f2' });
    assert.deepEqual(parseYamlSubset('a:'), { a: null });
});

const INVALID = {
    '평문 값 안의 ": "': ['answer: 결론: 2026년', /따옴표로 감쌀 것/],
    '평문 값 끝의 ":"': ['a: 결론:', /따옴표로 감쌀 것/],
    '평문 값 안의 " #"': ['title: 개발 #1 가이드', /주석/],
    '이어지는 줄의 ": "': ['a: x\n  b: c', /따옴표로 감쌀 것/],
    '흐름 리스트': ['tags: [a, b]', /따옴표로 감쌀 것/],
    '흐름 매핑': ['a: {b: c}', /따옴표로 감쌀 것/],
    '앵커·별칭': ['a: *ref', /따옴표로 감쌀 것/],
    '태그': ['a: !!str x', /따옴표로 감쌀 것/],
    '값 자리의 "- "': ['a: - x', /따옴표로 감쌀 것/],
    '탭 들여쓰기': ['tags:\n\t- a', /탭/],
    '중복 키': ['a: x\na: y', /두 번/],
    '키에 속하지 않은 리스트': ['- a', /리스트 항목/],
    '들여쓰기 어긋남': ['a: x\n b: y', /따옴표로 감쌀 것|들여쓰기/],
    '갑자기 깊은 들여쓰기': ['a:\n  b: c\n    d: e', /들여쓰기|따옴표/],
    '닫히지 않은 따옴표': ['a: "x\nb: y', /닫히지 않았다/],
    '닫는 따옴표 뒤 내용': ['a: "x" y', /닫는 따옴표 뒤/],
    '알 수 없는 이스케이프': ['a: "\\q"', /이스케이프/],
    '콜론 뒤 공백 없음': ['a:b', /해석할 수 없는 줄/],
    '한글 키': ['제목: 값', /해석할 수 없는 줄/],
    '평문 다음 줄의 리스트': ['a: x\n  - y', /리스트/],
    '블록 스칼라 헤더 오류': ['a: |x', /헤더/],
    '한 줄에 겹친 리스트': ['s:\n  - - a', /겹친 리스트/],
    '빈 리스트 항목': ['s:\n  -\n  - a', /빈 리스트 항목/],
    '빈 리스트 항목 아래의 값': ['s:\n  -\n    a: b', /빈 리스트 항목/],
    '여러 줄 따옴표의 줄 끝 공백': ['a: "one \n  two"', /줄 끝에 공백/],
    '리스트 항목 매핑 안에서 키와 같은 칸의 리스트': ['faq:\n  - tags:\n    - a\n  - q: x', /리스트 항목/],
};

for (const [name, [src, pattern]] of Object.entries(INVALID)) {
    test(`빌드를 세운다: ${name}`, () => {
        assert.throws(() => parseYamlSubset(src), pattern);
    });
}

test('오류 메시지에 파일과 원본 행 번호가 붙는다', () => {
    const raw = '---\ntitle: 제목\nanswer: 결론: x\n---\n본문';
    assert.throws(() => parseFrontmatter(raw, 'content/insights/x.md'), /content\/insights\/x\.md 3행/);
});

test('parseFrontmatter: BOM·CRLF·frontmatter 없음', () => {
    const crlf = '\uFEFF---\r\ntitle: 제목\r\ntags:\r\n  - a\r\n---\r\n본문\r\n';
    assert.deepEqual(parseFrontmatter(crlf), { meta: { title: '제목', tags: ['a'] }, body: '본문\r\n' });
    assert.deepEqual(parseFrontmatter('그냥 본문'), { meta: {}, body: '그냥 본문' });
});

/** 재현 가능한 난수 (mulberry32). 0 이상 n 미만의 정수를 돌려준다 */
function seededRandom(seed) {
    let a = seed >>> 0;
    return (n) => {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return Math.floor((((t ^ (t >>> 14)) >>> 0) / 4294967296) * n);
    };
}

// 무작위 문서로 원칙을 확인한다: 파서가 받아들이면 js-yaml 도 받아들이고 값이 같아야 한다.
// (파서가 거부하는 것은 괜찮다. 더 엄격한 쪽으로 틀리는 것은 허용한다)
test('fuzz: 파서가 받아들인 무작위 문서는 js-yaml 과 같은 값이다', () => {
    const rand = seededRandom(20261021);
    const pick = (arr) => arr[rand(arr.length)];
    const INDENTS = [0, 0, 0, 1, 2, 2, 3, 4, 4, 6];
    const KEYS = ['a', 'b', 'q', 'url', 'faq'];
    const SCALARS = [
        'x', '값 하나', 'a: b', 'a:b', 'C#', 'a #b', 'end:', '"q: x"', "'it''s'", '"esc \\" \\t"',
        'https://x.y/z?a=b#c', '- z', '"open', "'open", 'close"', '[a]', '*a', '10:30', '"a" # c', '# c', '- ',
        '|', '>-', '|+', '|2', '> # c', '"\\u00e9"', "''", '""', '?', ': x', '"sp ', "'sp ", 'sp" ',
    ];
    // 줄 끝 공백은 YAML 구현마다 다르게 다루는 지점이라 일부러 섞는다
    const line = () => lineBody() + pick(['', '', '', '', ' ', '  ']);
    const lineBody = () => {
        const ind = ' '.repeat(pick(INDENTS));
        switch (rand(8)) {
            case 0: return `${ind}${pick(KEYS)}: ${pick(SCALARS)}`;
            case 1: return `${ind}${pick(KEYS)}:`;
            case 2: return `${ind}- ${pick(SCALARS)}`;
            case 3: return `${ind}- ${pick(KEYS)}: ${pick(SCALARS)}`;
            case 4: return `${ind}${pick(SCALARS)}`;
            case 5: return rand(2) ? '' : `${ind}# 주석`;
            case 6: return `${ind}-`;
            default: return `${ind}${pick(KEYS)}: ${pick(['|', '>', '|-', '>+', '|2'])}`;
        }
    };

    let accepted = 0;
    for (let n = 0; n < 100000; n++) {
        const src = Array.from({ length: 1 + rand(7) }, line).join('\n');
        let ours;
        try {
            ours = parseYamlSubset(src);
        } catch {
            continue;
        }
        accepted++;
        let theirs;
        try {
            theirs = viaYaml(src);
        } catch (e) {
            assert.fail(`파서는 받아들였지만 js-yaml 은 거부했다\n--- 문서 ---\n${src}\n--- 파서 결과 ---\n${JSON.stringify(ours)}\n--- js-yaml ---\n${e.message}`);
        }
        assert.deepEqual(structuredClone(ours), theirs, `값이 다르다\n--- 문서 ---\n${src}`);
    }
    // 생성기가 너무 깨진 문서만 만들면 이 테스트가 아무것도 확인하지 않는다
    assert.ok(accepted > 5000, `받아들인 문서가 너무 적다: ${accepted}`);
});

// 문법에 맞는 쪽으로 기운 생성기: 매핑 리스트·블록 스칼라·여러 줄 값을 섞은 frontmatter 모양
test('fuzz: frontmatter 모양의 무작위 문서는 js-yaml 과 같은 값이다', () => {
    const rand = seededRandom(7);
    const pick = (arr) => arr[rand(arr.length)];
    const WORDS = ['앱', '견적', 'API 36', '2026년', 'Xcode 26', '"인용"', "'작은'", '(괄호)', '100%', '—', 'a-b', 'x_y', 'C#', '10:30', 'https://a.b/c'];
    const text = () => Array.from({ length: 1 + rand(4) }, () => pick(WORDS)).join(' ');
    const quoted = (t) => (rand(2) ? `"${t.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"` : `'${t.replace(/'/g, "''")}'`);
    const scalar = (ind) => {
        switch (rand(5)) {
            case 0: return ' ' + text();
            case 1: return ' ' + quoted(text() + ': ' + text());
            case 2: return ` ${pick(['|', '>', '|-', '>-', '|+'])}\n` + Array.from({ length: 1 + rand(3) }, () => (rand(4) ? ' '.repeat(ind + 2) + text() : '')).join('\n');
            case 3: return ' ' + text() + '\n' + ' '.repeat(ind + 2) + text();
            default: return ' ' + quoted(text()) + (rand(2) ? ' # 주석' : '');
        }
    };
    let accepted = 0;
    for (let n = 0; n < 5000; n++) {
        const lines = [];
        for (const key of ['title', 'answer', 'faq', 'tags']) {
            if (key === 'faq') {
                lines.push('faq:');
                const base = rand(2) ? 2 : 0;
                for (let k = 0; k < 1 + rand(3); k++) {
                    lines.push(' '.repeat(base) + '- q:' + scalar(base + 2));
                    lines.push(' '.repeat(base + 2) + 'a:' + scalar(base + 2));
                }
            } else if (key === 'tags') {
                lines.push('tags:');
                for (let k = 0; k < 1 + rand(3); k++) lines.push('  -' + scalar(2));
            } else {
                lines.push(key + ':' + scalar(0));
            }
        }
        const src = lines.join('\n');
        let ours;
        try {
            ours = parseYamlSubset(src);
        } catch {
            continue;
        }
        accepted++;
        let theirs;
        try {
            theirs = viaYaml(src);
        } catch (e) {
            assert.fail(`파서는 받아들였지만 js-yaml 은 거부했다\n--- 문서 ---\n${src}\n--- js-yaml ---\n${e.message}`);
        }
        assert.deepEqual(structuredClone(ours), theirs, `값이 다르다\n--- 문서 ---\n${src}`);
    }
    assert.ok(accepted > 1000, `받아들인 문서가 너무 적다: ${accepted}`);
});
