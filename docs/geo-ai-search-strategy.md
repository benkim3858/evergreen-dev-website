# evegdev.com — AI 검색 노출 전략 (GEO/AEO)

> 작성: 2026-06-16 · 대상: "외주개발 업체 추천", "웹/앱 개발 업체 정리" 류 쿼리에서 ChatGPT·Perplexity·Gemini·Google AI Overviews·Claude에 인용/추천되기
> 근거: 2026 Q1~Q2 GEO 리서치 (출처는 문서 하단)

---

## 1. 핵심 원리 — "사이트 SEO"가 아니라 "엔티티 + 제3자 신호"

AI 답변 엔진은 **여러 출처를 종합(RAG)** 해서 답한다. 따라서 자사 웹사이트를 아무리 잘 만들어도, **웹 전반에서 "에버그린데브 = 외주개발 파트너"라는 연관(Entity Strength)** 이 약하면 추천되지 않는다.

- 커뮤니티 플랫폼이 ChatGPT·Perplexity·AI Overviews 인용의 **52.5%** 차지
- 가장 많이 인용되는 도메인: **Reddit(1위), YouTube(2위), LinkedIn(전문 쿼리 1위)**
- **G2·Clutch 등 리뷰 플랫폼 프로필 보유 시 ChatGPT 인용 확률 3배**
- "리뷰 50개 있는 브랜드 > 웹사이트 콘텐츠만 좋은 브랜드" — 제3자 검증이 자사 콘텐츠보다 신뢰됨
- ChatGPT 실시간 검색은 **Bing 기반** → Bing 인덱싱이 전제조건
- ChatGPT·Perplexity 둘 다에 인용되는 도메인은 **11%뿐** → 채널별 따로 공략

---

## 2. 채널별 전략 비교 (우선순위)

| 우선 | 전략 | 왜 효과적인가 | 노력 | 권장도 |
|---|---|---|---|---|
| ★1 | **제3자 리뷰/디렉토리 등록** (한국: 위시켓·프리모아·이랜서 / 글로벌: Clutch·DesignRush·G2) | AI가 가장 신뢰하는 독립 검증 신호. "외주개발 업체" 쿼리의 1차 소스가 디렉토리 | 중 | ⭐⭐⭐⭐⭐ |
| ★2 | **커뮤니티 존재감** (한국: 네이버 블로그/카페·OKKY·디스콰이엇 / 글로벌: Reddit·LinkedIn) | 인용의 절반 이상이 커뮤니티. 실사용 후기·추천 글이 인용됨 | 중 | ⭐⭐⭐⭐⭐ |
| ★3 | **Bing + 네이버 인덱싱** | ChatGPT 검색=Bing. 한국어 쿼리는 네이버 소스 다수 참조 | 저 | ⭐⭐⭐⭐⭐ |
| ★4 | **자사 사이트 GEO** (Schema 확장 + FAQ + 인용가능 문장) | AI가 직접 크롤 시 명시적 컨텍스트 제공. 단독으론 부족하나 필수 기반 | 저~중 | ⭐⭐⭐⭐ |
| ★5 | **엔티티 디렉토리** (LinkedIn Company·Crunchbase·국세청 사업자/네이버 플레이스) | NAP 일관성 → AI 엔티티 인식 강화 | 저 | ⭐⭐⭐⭐ |
| ✗ | **llms.txt 파일** | Google(John Mueller·Gary Illyes)·OpenAI·Anthropic 모두 **미사용 공식 확인**. 서버로그상 봇이 요청조차 안 함 | 저 | ⭐ (비권장, 시간 낭비) |

---

## 3. 자사 사이트(evegdev.com)에서 당장 할 GEO 작업

현재 이미 갖춘 것: SSG prerender, Organization JSON-LD, sitemap, robots(AI봇 차단 없음).

추가할 것:
1. **Schema.org 확장** — 현재 `Organization`만 있음. 추가:
   - `ProfessionalService` / `LocalBusiness` (서비스업종·지역·NAP)
   - `FAQPage` (아래 4번 FAQ에 적용)
   - 각 프로젝트 상세에 `CreativeWork` 또는 `Service` + `review`/`aggregateRating`
2. **FAQ 섹션 신설** (홈 또는 /about) — "외주 개발 비용은?", "웹·앱 둘 다 가능한가?", "유지보수 범위는?", "어떤 기술스택을 쓰나?" 등. **질문-답변 구조가 AI가 가장 추출하기 좋은 형식**
3. **인용 가능한 문장으로 작성** — "저희는 최고입니다" 같은 주관/홍보 표현 제거. 객관·선언·자기완결 문장으로:
   - ✗ "We believe we deliver the best..."
   - ✓ "Evergreen Dev는 React·Vue·Flutter·Node.js 기반 웹·모바일 외주 개발을 제공하며, 40개 이상 프로젝트를 완료했다."
   - LLM은 단락을 통째로 잘라 쓰므로 **앞 문맥 없이도 의미가 완성되는 문장**이 인용됨
4. **AI 크롤러 명시 허용** — robots.txt에 `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended` 차단이 없는지 확인(현재 `User-agent: *` Allow라 OK). 단 `OAI-SearchBot`/`PerplexityBot`은 검색 인용용이므로 절대 차단 금지
5. **콘텐츠 최신성** — Perplexity는 날짜·최신성 중시. 프로젝트/블로그에 명시적 날짜 표기, 정기 갱신

---

## 4. 한국 시장 특수성

- "외주개발 업체 추천" 한국어 쿼리 → AI는 **위시켓·프리모아 같은 외주 플랫폼, 네이버 블로그/카페, OKKY·디스콰이엇** 등을 주로 참조
- **위시켓(wishket) 파트너 등록 + 포트폴리오/후기 확보**가 한국 맥락에서 Clutch 역할 (최우선)
- **네이버 검색 노출**(네이버 웹마스터 — 이미 인증 파일 있음 ✓ / 네이버 플레이스 비즈니스 등록) 강화
- LinkedIn 한국어 회사 페이지 + 정기 포스팅

---

## 5. 측정 방법

- 주간으로 ChatGPT·Claude·Perplexity·Gemini에 타깃 쿼리("외주개발 업체 추천", "React 외주 개발사" 등) 직접 입력 → 인용/언급 여부 기록
- GA4에서 referrer가 chatgpt.com·perplexity.ai·gemini 인 트래픽 추적
- 브랜드 멘션 모니터링 (구글 알리미 + 수동)
- 결과는 보통 **인프라 구축 후 4~8주**에 인용 빈도 개선

---

## 6. 30일 실행 체크리스트 (우선순위순)

- [ ] 위시켓/프리모아/이랜서 파트너 등록 + 포트폴리오·후기
- [ ] Clutch / DesignRush 프로필 생성 (글로벌 대상 시)
- [ ] LinkedIn Company + Crunchbase 등록, NAP 일관성 통일
- [ ] Bing Webmaster Tools + 네이버 서치어드바이저 사이트 등록/색인 요청
- [ ] evegdev.com에 FAQPage 섹션 + FAQ schema 추가
- [ ] Organization → ProfessionalService schema 확장 (NAP·서비스·지역)
- [ ] 홈/소개 카피를 인용가능 문장으로 리라이트
- [ ] 네이버 블로그/디스콰이엇/OKKY 등 커뮤니티에 사례·인사이트 글 발행 시작
- [ ] 주간 AI 쿼리 모니터링 루틴 시작

---

## 출처

- [Frase — What is GEO? 2026 Guide](https://www.frase.io/blog/what-is-generative-engine-optimization-geo)
- [AI Magicx — Getting Cited in ChatGPT, Claude, Perplexity 2026](https://www.aimagicx.com/blog/generative-engine-optimization-chatgpt-perplexity-2026)
- [Enrich Labs — GEO Complete 2026 Guide](https://www.enrichlabs.ai/blog/generative-engine-optimization-geo-complete-guide-2026)
- [Averi — Definitive Guide to GEO: Get Cited by AI 2026](https://www.averi.ai/learn/the-definitive-guide-to-geo-get-cited-by-ai-in-2026)
- [Yotpo — ChatGPT SEO & GEO 2026: 12 Tips](https://www.yotpo.com/blog/chatgpt-seo-geo-tips/)
- [Sight AI — LLM Optimization Best Practices 2026](https://www.trysight.ai/blog/llm-optimization-best-practices)
- [Wellows — Schema & NLP Best Practices for AI Search 2026](https://wellows.com/blog/schema-and-nlp-best-practices-for-ai-search/)
- [Search Engine Journal — Google: llms.txt is speculative for now](https://www.searchenginejournal.com/google-says-llms-txt-is-purely-speculative-for-now/577576/)
- [Stan Ventures — Google Dismisses llms.txt as Ineffective](https://www.stanventures.com/news/google-dismisses-llms-txt-as-ineffective-and-unused-by-ai-bots-2479/)
- [indiehackers — Best GEO Agency 2026 review (8/10 just repackage SEO)](https://www.indiehackers.com/post/best-geo-agency-2026-i-reviewed-10-aeo-firms-promising-to-get-b2b-saas-cited-in-chatgpt-8-are-just-repackaging-seo-ad29ed9123)
