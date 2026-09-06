/**
 * 유입 경로 기록
 *
 * 블로그·소셜 등 외부에서 들어온 방문자가 어느 경로로 왔는지 세션에 남긴다.
 * 문의 폼(pages/contact.vue)이 이 값을 읽어 문의 메일 본문에 덧붙인다.
 *
 * 링크 예: https://evegdev.com/insights/app-outsourcing-quote-difference?ref=nblog-01
 *
 * 첫 진입 시점에만 기록한다. 방문자가 사이트 안에서 여러 페이지를 옮겨 다녀도
 * 최초 출처가 그대로 남아야 문의가 어디서 시작됐는지 알 수 있다.
 */
export default defineNuxtPlugin(() => {
  const KEY = 'eveg_referral'

  try {
    if (sessionStorage.getItem(KEY)) return

    const raw = new URLSearchParams(window.location.search).get('ref') || ''
    const ref = raw.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 32)

    let from = ''
    try {
      const host = document.referrer ? new URL(document.referrer).hostname : ''
      if (host && host !== window.location.hostname) from = host
    } catch {
      // 형식이 깨진 referrer 는 무시한다
    }

    if (!ref && !from) return

    sessionStorage.setItem(KEY, JSON.stringify({
      ref,
      from,
      landing: window.location.pathname,
      at: new Date().toISOString()
    }))
  } catch {
    // 시크릿 모드처럼 sessionStorage 가 막힌 환경에서는 기록하지 않고 넘어간다
  }
})
