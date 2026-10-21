/**
 * 마크다운 frontmatter 파서 (YAML 서브셋)
 *
 * 지원하는 문법
 * - 블록 매핑 (`key: value`), 중첩 매핑
 * - 블록 시퀀스 (`- item`). 항목은 스칼라나 매핑이고,
 *   최상위 키에서는 키와 같은 들여쓰기로 시작하는 시퀀스(`tags:` 다음 줄의 `- a`)도 받는다
 * - 평문 스칼라 (여러 줄로 이어 쓰면 공백으로 접힌다)
 * - 큰따옴표·작은따옴표 스칼라 (이스케이프, 여러 줄)
 * - 블록 스칼라 `|` `>` (chomping `-` `+`, 들여쓰기 지시자 숫자)
 * - 줄 전체 주석, 따옴표·블록 스칼라 헤더 뒤의 주석
 *
 * 모든 스칼라는 문자열로 돌려준다 (YAML failsafe 스키마와 같다). 값이 비면 null 이다.
 *
 * 원칙: 이 파서가 받아들인 입력은 실제 YAML 파서와 같은 값으로 해석된다.
 * YAML 과 다르게 해석될 여지가 있는 입력은 조용히 넘기지 않고 빌드를 세운다.
 * 잘못 파싱된 값이 그대로 <meta description> 이나 JSON-LD 로 발행되는 것이
 * 파싱 실패보다 나쁘기 때문이다. tests/frontmatter.test.mjs 가 js-yaml 과 결과를 대조한다.
 *
 * 이 파일은 앱(Vite)·서버(Nitro)·node 테스트가 함께 쓰므로 다른 모듈을 import 하지 않는다.
 */

export type YamlValue = string | null | YamlValue[] | { [key: string]: YamlValue };
export type YamlMap = { [key: string]: YamlValue };

/** 매핑 키 줄. `key:` 뒤에는 공백이나 줄 끝이 와야 한다 (`key:value` 는 YAML 에서 키가 아니다) */
const KEY_LINE = /^([A-Za-z_][\w-]*):(?: +(.*))?$/;
const SEQ_ENTRY = /^-(?: |$)/;
const BLANK = /^[ \t]*$/;
const COMMENT_LINE = /^[ \t]*#/;
/** 평문 스칼라 첫 글자로 쓸 수 없는 YAML 지시자 (`| > ' " #` 는 따로 처리한다) */
const UNSUPPORTED_START = /^[[\]{},&*!%@`]/;

const ESCAPES: Record<string, string> = {
    '0': '\0', a: '\x07', b: '\b', t: '\t', '\t': '\t', n: '\n', v: '\v', f: '\f',
    r: '\r', e: '\x1b', ' ': ' ', '"': '"', '/': '/', '\\': '\\',
    N: '\u0085', _: ' ', L: ' ', P: ' ',
};

// 생성자 매개변수 프로퍼티(private readonly x)를 쓰지 않는다. node 의 타입 제거 모드가 지원하지 않는다
class FrontmatterParser {
    private i = 0;
    private readonly lines: string[];
    /** 오류 메시지에 붙일 위치 정보 */
    private readonly source: string;
    /** lines[0] 이 원본 파일의 몇 번째 줄인지 (1부터) */
    private readonly firstLineNo: number;

    constructor(lines: string[], source: string, firstLineNo: number) {
        this.lines = lines;
        this.source = source;
        this.firstLineNo = firstLineNo;
    }

    parse(): YamlMap {
        const result = this.parseMapping(0);
        const rest = this.nextContentLine();
        if (rest >= 0) throw this.error(rest, `해석할 수 없는 줄 "${this.lines[rest].trim()}"`);
        return result;
    }

    private error(lineIdx: number, message: string): Error {
        return new Error(`${this.source} ${this.firstLineNo + lineIdx}행: frontmatter ${message}`);
    }

    /** 빈 줄·주석 줄을 건너뛰고 다음 내용 줄의 번호를 돌려준다. 없으면 -1 */
    private nextContentLine(): number {
        while (this.i < this.lines.length) {
            const line = this.lines[this.i];
            if (!BLANK.test(line) && !COMMENT_LINE.test(line)) return this.i;
            this.i++;
        }
        return -1;
    }

    /** 들여쓰기 칸 수. YAML 은 들여쓰기에 탭을 허용하지 않는다 */
    private indentOf(lineIdx: number): number {
        const line = this.lines[lineIdx];
        const n = leadingSpaces(line);
        if (line[n] === '\t') throw this.error(lineIdx, '들여쓰기에 탭을 쓸 수 없다 (공백만 허용)');
        return n;
    }

    private parseMapping(indent: number): YamlMap {
        const out: YamlMap = {};
        for (;;) {
            const j = this.nextContentLine();
            if (j < 0) break;
            const ind = this.indentOf(j);
            if (ind < indent) break;
            if (ind > indent) throw this.error(j, `들여쓰기가 맞지 않는다 "${this.lines[j].trim()}"`);

            const text = this.lines[j].slice(ind);
            const kv = text.match(KEY_LINE);
            if (!kv) {
                if (SEQ_ENTRY.test(text)) throw this.error(j, `어느 키에도 속하지 않은 리스트 항목 "${text}"`);
                throw this.error(j, `해석할 수 없는 줄 "${text}"`);
            }
            const key = kv[1];
            // 일반 객체에 __proto__ 를 대입하면 키가 생기지 않고 프로토타입이 바뀐다 (YAML 과 다른 값이 된다)
            if (key === '__proto__') throw this.error(j, '키 "__proto__" 는 쓸 수 없다');
            if (Object.prototype.hasOwnProperty.call(out, key)) {
                throw this.error(j, `키 "${key}" 가 두 번 나온다`);
            }
            this.i = j + 1;
            // 키와 같은 칸에서 시작하는 리스트(tags: 다음 줄의 "- a")는 최상위 키에서만 받는다.
            // 리스트 항목 안의 매핑에서는 js-yaml 이 뒤따르는 바깥 항목까지 안쪽 리스트로 읽는다
            out[key] = this.parseValue(kv[2] ?? '', indent, j, indent === 0);
        }
        return out;
    }

    private parseSequence(indent: number): YamlValue[] {
        const out: YamlValue[] = [];
        for (;;) {
            const j = this.nextContentLine();
            if (j < 0) break;
            const ind = this.indentOf(j);
            if (ind < indent) break;
            if (ind > indent) throw this.error(j, `들여쓰기가 맞지 않는다 "${this.lines[j].trim()}"`);

            const text = this.lines[j].slice(ind);
            // 같은 들여쓰기에서 리스트가 끝나고 다음 키가 오는 경우 (키와 같은 칸에서 시작한 리스트)
            if (!SEQ_ENTRY.test(text)) break;

            const afterDash = text.slice(1);
            const pad = leadingSpaces(afterDash);
            // 끝 공백은 판단용으로만 지운다. 따옴표 값의 끝 공백 검사를 위해 원문(raw)을 넘긴다
            const raw = afterDash.slice(pad);
            const rest = raw.replace(/[ \t]+$/, '');
            const column = ind + 1 + pad;

            if (rest === '' || rest.startsWith('#')) {
                // 빈 항목은 frontmatter 에 쓸 일이 없고, 뒤따르는 줄의 소속을 YAML 구현마다 다르게 읽는다
                // (js-yaml 은 빈 항목 다음의 바깥 항목을 안쪽 리스트로 흡수하기도 한다)
                throw this.error(j, '빈 리스트 항목("-")은 지원하지 않는다. "- " 와 같은 줄에 값을 쓸 것');
            } else if (SEQ_ENTRY.test(rest)) {
                // "- - a" 는 YAML 구현마다 다음 항목의 소속을 다르게 읽는다
                throw this.error(j, '한 줄에 겹친 리스트("- - ")는 지원하지 않는다');
            } else if (KEY_LINE.test(rest)) {
                // "- q: x" 는 q 가 놓인 칸을 들여쓰기로 하는 매핑이다.
                // 대시를 공백으로 바꿔 그 칸에서 시작하는 일반 블록으로 읽는다
                this.lines[j] = ' '.repeat(column) + raw;
                this.i = j;
                out.push(this.parseMapping(column));
            } else {
                this.i = j + 1;
                out.push(this.parseValue(raw, ind, j, false));
            }
        }
        return out;
    }

    /**
     * 키 뒤(또는 "- " 뒤)에 온 값을 읽는다.
     * parentIndent 는 이 값을 가진 매핑·시퀀스의 들여쓰기다. 값이 다음 줄로 이어지려면 그보다 깊어야 한다.
     * 호출 시점에 this.i 는 lineIdx 다음 줄을 가리킨다.
     */
    private parseValue(rest: string, parentIndent: number, lineIdx: number, sameIndentSeq: boolean): YamlValue {
        const value = rest.replace(/[ \t]+$/, '');

        if (value === '' || value.startsWith('#')) {
            const j = this.nextContentLine();
            if (j < 0) return null;
            const ind = this.indentOf(j);
            const text = this.lines[j].slice(ind);
            if (SEQ_ENTRY.test(text) && (ind > parentIndent || (sameIndentSeq && ind === parentIndent))) {
                return this.parseSequence(ind);
            }
            if (ind <= parentIndent) return null;
            if (KEY_LINE.test(text)) return this.parseMapping(ind);
            // 키 다음 줄부터 시작하는 스칼라
            if (/^[|>]/.test(text)) throw this.error(j, '블록 스칼라 지시자(| >)는 키와 같은 줄에 써야 한다');
            this.i = j + 1;
            return this.parseInlineScalar(text, parentIndent, j);
        }

        if (value[0] === '|' || value[0] === '>') return this.parseBlockScalar(value, parentIndent, lineIdx);
        // 따옴표 값은 첫 줄 끝 공백도 검사해야 하므로 원문을 넘긴다
        return this.parseInlineScalar(rest, parentIndent, lineIdx);
    }

    private parseInlineScalar(value: string, parentIndent: number, lineIdx: number): string {
        if (value[0] === '"' || value[0] === "'") return this.parseQuoted(value, parentIndent, lineIdx);
        if (UNSUPPORTED_START.test(value) || /^[-?:](?:[ \t]|$)/.test(value)) {
            throw this.error(lineIdx, `"${value[0]}" 로 시작하는 값은 지원하지 않는다. 값 전체를 따옴표로 감쌀 것`);
        }
        return this.parsePlain(value, parentIndent, lineIdx);
    }

    /** 평문 스칼라에 YAML 이 다르게 읽을 문자열이 있으면 세운다 */
    private checkPlain(text: string, lineIdx: number): void {
        if (/:(?:[ \t]|$)/.test(text)) {
            throw this.error(lineIdx, `값 안의 ": " 는 YAML 에서 매핑으로 읽힌다. 값 전체를 따옴표로 감쌀 것 "${text}"`);
        }
        if (/[ \t]#/.test(text)) {
            throw this.error(lineIdx, `값 안의 " #" 는 YAML 에서 주석으로 읽힌다. 값 전체를 따옴표로 감쌀 것 "${text}"`);
        }
    }

    private parsePlain(first: string, parentIndent: number, lineIdx: number): string {
        this.checkPlain(first, lineIdx);
        let value = first.trim();
        let blankLines = 0;

        while (this.i < this.lines.length) {
            const line = this.lines[this.i];
            if (BLANK.test(line)) {
                blankLines++;
                this.i++;
                continue;
            }
            // 주석 줄이나 덜 들여쓴 줄을 만나면 값이 끝난다 (그 사이 빈 줄은 값에 넣지 않는다)
            if (COMMENT_LINE.test(line)) break;
            const ind = this.indentOf(this.i);
            if (ind <= parentIndent) break;

            const text = line.trim();
            if (SEQ_ENTRY.test(text)) {
                throw this.error(this.i, '값 다음 줄에 "- " 가 이어진다. 리스트라면 키 뒤를 비우고 다음 줄부터 쓸 것');
            }
            this.checkPlain(text, this.i);
            value += blankLines > 0 ? '\n'.repeat(blankLines) : ' ';
            value += text;
            blankLines = 0;
            this.i++;
        }
        return value;
    }

    private parseQuoted(first: string, parentIndent: number, lineIdx: number): string {
        const quote = first[0];
        const rawLines: string[] = [];
        let line = first.slice(1);
        let current = lineIdx;

        for (;;) {
            const end = findClosingQuote(line, quote);
            if (end >= 0) {
                rawLines.push(line.slice(0, end));
                const after = line.slice(end + 1);
                if (!/^(?:[ \t]*|[ \t]+#.*)$/.test(after)) {
                    throw this.error(current, `닫는 따옴표 뒤에 다른 내용이 있다 "${after.trim()}"`);
                }
                break;
            }
            // 줄 끝 공백은 명세상 지워지지만 js-yaml 은 남긴다. 구현마다 다르니 받지 않는다
            if (/[ \t]$/.test(line)) throw this.error(current, '여러 줄 따옴표 값의 줄 끝에 공백이 있다. 지울 것');
            rawLines.push(line);
            if (this.i >= this.lines.length) throw this.error(lineIdx, '따옴표가 닫히지 않았다');
            const next = this.lines[this.i];
            // 따옴표 안 이어지는 줄의 앞 공백은 값이 아니라 구분자다. 다만 부모보다 깊어야 한다
            if (!BLANK.test(next) && leadingSpaces(next) <= parentIndent) {
                throw this.error(lineIdx, '따옴표가 닫히지 않았다');
            }
            line = next;
            current = this.i;
            this.i++;
        }

        // 여러 줄 따옴표 값은 YAML 규칙대로 접는다: 줄바꿈 하나는 공백, 빈 줄 n개는 줄바꿈 n개
        let out = '';
        let blankLines = 0;
        let escapedBreak = false;
        rawLines.forEach((raw, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === rawLines.length - 1;
            let s = raw;
            if (!isFirst) s = s.replace(/^[ \t]+/, '');
            if (!isLast) s = s.replace(/[ \t]+$/, '');
            if (!isFirst && !isLast && s === '') {
                blankLines++;
                return;
            }
            if (!isFirst && !escapedBreak) out += blankLines > 0 ? '\n'.repeat(blankLines) : ' ';
            blankLines = 0;
            escapedBreak = false;
            if (quote === '"' && !isLast && /(?:^|[^\\])(?:\\\\)*\\$/.test(s)) {
                // 줄 끝의 홀수 개 역슬래시: 줄바꿈 자체를 없앤다
                s = s.slice(0, -1);
                escapedBreak = true;
            }
            out += quote === '"' ? this.decodeEscapes(s, lineIdx) : s.replace(/''/g, "'");
        });
        return out;
    }

    private decodeEscapes(s: string, lineIdx: number): string {
        return s.replace(/\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}|[\s\S])/g, (_, esc: string) => {
            if (esc.length > 1) return String.fromCodePoint(parseInt(esc.slice(1), 16));
            if (esc in ESCAPES) return ESCAPES[esc];
            throw this.error(lineIdx, `지원하지 않는 이스케이프 "\\${esc}"`);
        });
    }

    private parseBlockScalar(header: string, parentIndent: number, lineIdx: number): string {
        const m = header.match(/^([|>])(?:([1-9])([+-])?|([+-])([1-9])?)?(?:[ \t]+#.*)?$/);
        if (!m) throw this.error(lineIdx, `블록 스칼라 헤더를 해석할 수 없다 "${header}"`);
        const folded = m[1] === '>';
        const indicator = m[2] ?? m[5];
        const chomping = m[3] ?? m[4] ?? '';

        let contentIndent = indicator ? parentIndent + Number(indicator) : -1;
        const content: (string | null)[] = []; // null 은 빈 줄
        /** 들여쓰기를 첫 내용 줄에서 정할 때, 그 앞 공백 줄의 최대 공백 수 */
        let leadingBlankSpaces = 0;

        while (this.i < this.lines.length) {
            const line = this.lines[this.i];
            const spaces = leadingSpaces(line);
            if (spaces === line.length) {
                // 공백만 있는 줄: 들여쓰기보다 긴 공백은 리터럴 내용이다
                if (contentIndent < 0) leadingBlankSpaces = Math.max(leadingBlankSpaces, spaces);
                content.push(contentIndent >= 0 && spaces > contentIndent ? line.slice(contentIndent) : null);
                this.i++;
                continue;
            }
            if (contentIndent < 0) {
                if (spaces <= parentIndent) break;
                // YAML 은 첫 내용 줄보다 깊은 앞쪽 공백 줄을 오류로 본다
                if (leadingBlankSpaces > spaces) {
                    throw this.error(this.i, '블록 스칼라 첫 줄 앞의 빈 줄에 내용 줄보다 많은 공백이 있다. 지울 것');
                }
                contentIndent = spaces;
            }
            if (spaces < contentIndent) break;
            content.push(line.slice(contentIndent));
            this.i++;
        }

        // YAML 1.2 블록 스칼라 접기·chomping 규칙
        let out = '';
        let emptyLines = 0;
        let didReadContent = false;
        let atMoreIndented = false;
        for (const line of content) {
            if (line === null) {
                emptyLines++;
                continue;
            }
            if (folded) {
                if (line[0] === ' ' || line[0] === '\t') {
                    atMoreIndented = true;
                    out += '\n'.repeat(didReadContent ? 1 + emptyLines : emptyLines);
                } else if (atMoreIndented) {
                    atMoreIndented = false;
                    out += '\n'.repeat(emptyLines + 1);
                } else if (emptyLines === 0) {
                    if (didReadContent) out += ' ';
                } else {
                    out += '\n'.repeat(emptyLines);
                }
            } else {
                out += '\n'.repeat(didReadContent ? 1 + emptyLines : emptyLines);
            }
            out += line;
            didReadContent = true;
            emptyLines = 0;
        }

        if (chomping === '+') out += '\n'.repeat(didReadContent ? 1 + emptyLines : emptyLines);
        else if (chomping !== '-' && didReadContent) out += '\n';
        return out;
    }
}

function leadingSpaces(line: string): number {
    return line.length - line.replace(/^ +/, '').length;
}

/** 닫는 따옴표의 위치. 큰따옴표는 역슬래시 이스케이프, 작은따옴표는 '' 를 건너뛴다 */
function findClosingQuote(s: string, quote: string): number {
    for (let k = 0; k < s.length; k++) {
        if (quote === '"' && s[k] === '\\') {
            k++;
            continue;
        }
        if (s[k] === quote) {
            if (quote === "'" && s[k + 1] === "'") {
                k++;
                continue;
            }
            return k;
        }
    }
    return -1;
}

/**
 * YAML 서브셋 문서를 매핑으로 읽는다.
 * @param source 오류 메시지에 붙일 위치 (예: 파일 경로)
 * @param firstLineNo src 첫 줄이 원본 파일의 몇 번째 줄인지
 */
export function parseYamlSubset(src: string, source = 'frontmatter', firstLineNo = 1): YamlMap {
    const lines = src.split(/\r?\n/);
    // 마지막 줄바꿈 뒤의 빈 조각은 줄이 아니다 (세면 |+ 값 끝에 줄바꿈이 하나 더 붙는다)
    if (lines.length > 1 && lines[lines.length - 1] === '') lines.pop();
    return new FrontmatterParser(lines, source, firstLineNo).parse();
}

/**
 * 마크다운 원문을 frontmatter 와 본문으로 나눈다. frontmatter 가 없으면 meta 는 빈 객체다.
 * @param source 오류 메시지에 붙일 위치 (예: content/insights/foo.md)
 */
export function parseFrontmatter(raw: string, source = 'frontmatter'): { meta: YamlMap; body: string } {
    // BOM 제거 — 편집기에 따라 붙는데, 있으면 ^--- 가 불일치해 frontmatter 가 통째로 본문이 된다
    const text = raw.replace(/^﻿/, '');

    const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) return { meta: {}, body: text };

    // 첫 줄 "---" 다음 줄이 파일의 2행이다
    return { meta: parseYamlSubset(match[1], source, 2), body: match[2] };
}
