#!/usr/bin/env node
/**
 * 배포 직후 바뀐 URL 을 IndexNow 로 알린다.
 * IndexNow 는 Bing·네이버·Yandex 등이 함께 쓰는 색인 알림 규약이다. 한 곳에 보내면 참여 엔진에 공유되지만,
 * 국내 검색 비중 때문에 네이버 엔드포인트에도 직접 보낸다.
 *
 *   node scripts/indexnow.mjs             이번 배포에서 바뀐 인사이트 글 URL 만 보낸다
 *   node scripts/indexnow.mjs --all       빌드 산출물(.output/public) sitemap 의 URL 을 모두 보낸다
 *   node scripts/indexnow.mjs --dry-run   보낼 내용만 출력하고 보내지 않는다
 *
 * 바뀐 글은 INDEXNOW_BEFORE..INDEXNOW_AFTER(GitHub push 이벤트의 before·sha) 사이에
 * content/insights/*.md 가 추가·수정·삭제됐는지로 판단한다. 삭제된 글의 URL 도 보낸다(404 를 알리는 용도).
 * 비교 기준 커밋을 구할 수 없으면 --all 로 동작한다.
 *
 * 키는 public/{key}.txt 파일 하나다(파일 내용 = 파일 이름). 배포가 실제 사이트에 반영되기 전에 보내면
 * 검색엔진이 키 파일을 찾지 못하므로, 키 파일과 새 글 주소가 응답할 때까지 기다린 뒤 보낸다.
 *
 * 보내기에 실패하면 1 로 끝난다. 워크플로에서는 continue-on-error 로 두어 배포를 실패시키지 않는다.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://evegdev.com';
const HOST = 'evegdev.com';
const ENDPOINTS = ['https://api.indexnow.org/indexnow', 'https://searchadvisor.naver.com/indexnow'];
const OUTPUT_DIR = join(ROOT, '.output/public');

/** 배포 반영을 기다리는 최대 시간과 확인 간격 */
const WAIT_TIMEOUT_MS = 6 * 60 * 1000;
const WAIT_INTERVAL_MS = 15 * 1000;

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');

/** GitHub Actions 화면에 경고로 보이게 한다 (로컬에서는 그냥 한 줄 출력) */
function warn(message) {
    console.log(process.env.GITHUB_ACTIONS ? `::warning title=IndexNow::${message}` : `경고: ${message}`);
}

function findKey() {
    const dir = join(ROOT, 'public');
    const keys = readdirSync(dir)
        .filter((f) => /^[a-zA-Z0-9-]{8,128}\.txt$/.test(f))
        .map((f) => f.replace(/\.txt$/, ''))
        .filter((k) => readFileSync(join(dir, `${k}.txt`), 'utf8').trim() === k);
    if (keys.length !== 1) throw new Error(`public/ 에 IndexNow 키 파일이 정확히 하나 있어야 한다 (찾은 수: ${keys.length})`);
    return keys[0];
}

function locsOf(xml) {
    return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'));
}

/** 빌드 산출물의 sitemap(색인 → 하위 sitemap)에서 이 사이트 URL 을 모두 모은다 */
function sitemapUrls() {
    const index = join(OUTPUT_DIR, 'sitemap_index.xml');
    if (!existsSync(index)) throw new Error(`${index} 가 없다. npm run generate 뒤에 실행할 것`);
    const urls = new Set();
    for (const child of locsOf(readFileSync(index, 'utf8'))) {
        const file = join(OUTPUT_DIR, new URL(child).pathname);
        for (const loc of locsOf(readFileSync(file, 'utf8'))) {
            if (new URL(loc).host === HOST) urls.add(loc);
        }
    }
    return [...urls];
}

function git(...gitArgs) {
    return execFileSync('git', gitArgs, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function hasCommit(sha) {
    try {
        git('cat-file', '-e', `${sha}^{commit}`);
        return true;
    } catch {
        return false;
    }
}

/**
 * before..after 사이에 바뀐 인사이트 글. 비교할 수 없으면 null.
 * actions/checkout 은 기본으로 커밋 하나만 받으므로 before 커밋은 따로 받아 온다.
 */
function changedInsights(before, after) {
    if (!before || !after || /^0+$/.test(before)) return null;
    if (!hasCommit(before)) {
        try {
            git('fetch', '--no-tags', '--depth=1', 'origin', before);
        } catch (e) {
            warn(`비교 기준 커밋 ${before} 를 받지 못했다: ${String(e.stderr || e.message).trim()}`);
            return null;
        }
    }
    if (!hasCommit(before) || !hasCommit(after)) return null;

    const out = git('diff', '--name-status', '--no-renames', before, after, '--', 'content/insights/');
    const added = [];
    const changed = [];
    for (const line of out.split('\n').filter(Boolean)) {
        const [status, path] = line.split('\t');
        const m = path.match(/^content\/insights\/([^/]+)\.md$/);
        if (!m) continue;
        const url = `${SITE}/insights/${m[1]}`;
        changed.push(url);
        if (status === 'A') added.push(url);
    }
    return { added, changed };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** url 이 200 으로 응답하고 check(본문) 이 참이 될 때까지 기다린다. CDN 캐시를 피하려고 쿼리를 붙인다 */
async function waitUntilLive(url, deadline, check = () => true) {
    for (;;) {
        try {
            const res = await fetch(`${url}?indexnow=${Date.now()}`, { redirect: 'follow', signal: AbortSignal.timeout(15_000) });
            if (res.status === 200 && check(await res.text())) return true;
        } catch {
            // 네트워크 오류는 다시 시도한다
        }
        if (Date.now() + WAIT_INTERVAL_MS > deadline) return false;
        await sleep(WAIT_INTERVAL_MS);
    }
}

async function submit(endpoint, payload) {
    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(30_000),
        });
        const body = (await res.text().catch(() => '')).slice(0, 300);
        // 200 = 받음, 202 = 받았고 키 확인 대기 중. 그 밖(400·403·422·429)은 실패다
        if (res.status === 200 || res.status === 202) {
            console.log(`${endpoint}: ${res.status} 접수`);
            return true;
        }
        warn(`${endpoint}: ${res.status} ${body}`);
        return false;
    } catch (e) {
        warn(`${endpoint}: 요청 실패 ${e.message}`);
        return false;
    }
}

async function main() {
    const key = findKey();
    const keyLocation = `${SITE}/${key}.txt`;

    let urls;
    let mustBeLive = [];
    const diff = args.has('--all') ? null : changedInsights(process.env.INDEXNOW_BEFORE, process.env.INDEXNOW_AFTER);
    if (diff) {
        if (diff.changed.length === 0) {
            console.log('이번 배포에서 바뀐 인사이트 글이 없다. 보내지 않는다');
            return 0;
        }
        // 글이 바뀌면 목록 페이지도 바뀐다
        urls = [...diff.changed, `${SITE}/insights`];
        mustBeLive = diff.added;
    } else {
        if (!args.has('--all')) console.log('비교 기준 커밋이 없어 sitemap 의 URL 을 모두 보낸다');
        urls = sitemapUrls();
    }

    const payload = { host: HOST, key, keyLocation, urlList: urls };
    console.log(`보낼 URL ${urls.length}개\n${urls.map((u) => `  ${u}`).join('\n')}`);
    if (DRY_RUN) {
        console.log(`--dry-run: 보내지 않는다\n${JSON.stringify({ endpoints: ENDPOINTS, payload }, null, 2)}`);
        return 0;
    }

    const deadline = Date.now() + WAIT_TIMEOUT_MS;
    if (!(await waitUntilLive(keyLocation, deadline, (body) => body.trim() === key))) {
        warn(`키 파일 ${keyLocation} 이 ${WAIT_TIMEOUT_MS / 60000}분 안에 응답하지 않았다. 그대로 보낸다`);
    }
    for (const url of mustBeLive) {
        if (!(await waitUntilLive(url, deadline))) warn(`새 글 ${url} 이 아직 응답하지 않는다. 그대로 보낸다`);
    }

    const results = [];
    for (const endpoint of ENDPOINTS) results.push(await submit(endpoint, payload));
    return results.every(Boolean) ? 0 : 1;
}

main().then(
    (code) => process.exit(code),
    (e) => {
        warn(e.message);
        process.exit(1);
    },
);
