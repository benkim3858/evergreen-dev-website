# FAQ 섹션 검토 — SEO + AI 검색(AEO) 딥리서치

> 작성 2026-06-23 · deep-research(검증 단계 rate limit 실패 → claims 회수 + WebSearch 3건 재검증, salvage 절차) + Research Protocol
> 범위: 홈 FAQ 섹션(`pages/index.vue` #faq + `i18n .faq.items` + FAQPage JSON-LD) — 조사·제안만, 수정 X

---

## 1. 현재 FAQ (6개) + 구현 상태

| # | 질문 | 평가 |
|---|---|---|
| 1 | 에버그린데브는 어떤 개발을 하나요? | ✅ 서비스 범위 (entity 명확) |
| 2 | 어떤 기술 스택을 사용하나요? | ✅ |
| 3 | 개발 기간은 얼마나 걸리나요? | ✅ 숫자 포함(2~3주/4~8주) — AEO 좋음 |
| 4 | 개발 완료 후 유지보수도 가능한가요? | ✅ |
| 5 | 협업은 어떻게 진행되나요? | ✅ |
| 6 | 상담과 견적은 어떻게 받나요? | 🟡 가격 자체는 없음 |

- **FAQPage JSON-LD 이미 구현** (faqItems → Question/acceptedAnswer 자동, visible HTML과 일치) ✅
- 질문이 실제 구매자 intent 기반 ✅

---

## 2. 딥리서치 핵심 (2026, 검증됨)

1. **FAQ rich results는 2026-05-07 Google에서 제거(deprecated)** — 검색결과 드롭다운 사라짐. Search Console FAQ 리포트/Rich Results Test도 6월 종료. **그러나 FAQPage schema markup 자체는 여전히 유효** — Google이 계속 파싱, 페이지에 둬도 무해. → 현재 JSON-LD 유지 OK.
2. **AI 검색은 schema보다 clear Q&A 콘텐츠를 본다** — Ahrefs(2026.2): AI Overviews 인용 페이지의 schema 특권 없음. 단 일부 소스는 FAQPage markup 페이지가 AI Overviews 노출 3.2배 주장(상충). → **schema는 보조, 콘텐츠가 본질**.
3. **답변 형식**: 섹션/질문 첫머리에 **직접 답변 40~60단어**(self-contained mini-answer). AI가 첫 1~2문장으로 인용 여부 판단.
4. **데이터·출처 신호**: hard data(숫자·%)와 출처 인용 시 AI 인용↑. **68%의 AI 인용이 third-party 출처**(brand-owned 32%) → 외부 신뢰 신호 중요.
5. **플랫폼별**: ChatGPT=Bing top10(87% 중복), Perplexity=recency+Reddit(46.7%). → 일반 SEO(Bing 포함) + 외부 언급 병행.
6. **질문 선정**: 실제 사용자 질문(영업 통화·지원 티켓·People Also Ask)에서. 키워드 발명 질문 X. 개수 6~10개 적정.
7. **anti-pattern**: URL당 FAQPage 1개, JSON-LD=visible HTML 일치, 답변에 프로모션/CTA 금지, 페이지 간 FAQ 중복 금지.

---

## 3. 진단 — 무엇이 빠졌나

검색 수요·구매 의사결정·AI 노출 관점에서 **누락된 고가치 질문**:

| 우선 | 누락 질문 | 이유 |
|---|---|---|
| 🔴 높음 | **개발 비용(견적 기준)은 어떻게 되나요?** | 가격은 구매자 검색 #1. 현재 "견적 받는 법"만 있고 비용 기준 없음. 박리다매 전략상 투명성=차별점 |
| 🔴 높음 | **AI를 활용해 개발하나요?** | 에버그린 핵심 차별(AI 네이티브/AX) + 2026 AI 검색 수요 폭증. Our Services엔 AI·AX 있는데 FAQ엔 없음 |
| 🟡 중간 | **다른 회사가 만든 코드(레거시) 유지보수·인수도 되나요?** | 외주 시장 실수요(이전 개발사 이탈 케이스) |
| 🟡 중간 | **계약·세금계산서·결제는 어떻게 하나요?** | B2B 신뢰. 세금계산서 발행 가능(자산) |
| ⚪ 낮음 | **NDA·보안은 어떻게 보장하나요?** | 엔터프라이즈 신뢰 |

---

## 4. 제안 (추가/수정/제거)

### 추가 (3개 권장 → 총 8~9개)
1. **"개발 비용은 어떻게 책정되나요?"** — 규모별 범위 + 견적 방식. (※ memory 룰: "타 업체 대비/인건비 절감" 표현 금지 → "합리적 견적/규모별 범위"로)
2. **"AI를 활용해 개발하나요?"** — AI 네이티브 워크플로우(LLM·에이전트·자동화)로 속도/품질. 차별점 + AI 검색 노출 직격.
3. **"다른 회사가 만든 코드도 인수·유지보수 가능한가요?"** — 레거시 인수, 코드 리뷰 후 진행.

### 수정 (표현·형식)
- **질문을 검색 키워드에 정렬**: "어떤 개발을 하나요" → 자연어 검색형 유지하되 "웹·앱 개발 외주" 키워드 반영 검토. (entity로 브랜드명 1회는 유지 OK)
- **답변 첫 문장 결론 우선(40~60단어 직접 답변)** — 현재 일부 답변이 설명형. AI 추출 최적화 위해 첫 문장에 핵심.
- 답변 내 약한 CTA("맞춤 견적 제공" 등) 최소화 (anti-pattern).

### 제거
- **없음.** 6개 모두 유효. 단 가격 질문 추가 시 #6(상담·견적)과 일부 중복 → #6을 "상담 방법"으로 좁히고 가격은 신규 항목으로 분리 권장.

### 구조 (변경 불필요)
- FAQPage JSON-LD 유지(여전히 유효). 추가 질문도 자동 schema 반영됨(faqItems 기반).

---

## 5. 솔직한 결론
- **현재 FAQ는 기본기가 좋습니다** (실수요 질문 + JSON-LD 구현 + 숫자 포함 답변). 전면 개편 불필요.
- **가장 큰 기회 2가지**: ① 가격/비용 질문 추가(검색 수요 최상위), ② AI 활용 질문 추가(차별점 + AI 검색 노출). 이 둘이 SEO·AEO 효과 대비 비용이 가장 큽니다.
- schema는 이미 갖춰졌으니 **본질은 "질문 추가 + 답변 첫 문장 결론화"**입니다.

---

## 6. 다음 단계 (Ben 결정 대기)
- 추가할 질문 3개 중 택(전부/일부)
- 답변 첫 문장 결론화 리라이트 적용 여부
- 가격 질문의 노출 수위(범위 공개 vs 견적 안내만)
→ 결정 시 i18n faq.items 수정(JSON-LD 자동 반영) + Playwright 검증 + 커밋.

---

## Sources
- [Google Killed FAQ Rich Results — The HOTH](https://www.thehoth.com/blog/google-faq-rich-results-deprecated/)
- [Google Drops FAQ Rich Results — Search Engine Journal](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/)
- [FAQPage structured data — Google Developers](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [Answer Engine Optimization 2026 Guide — CXL](https://cxl.com/blog/answer-engine-optimization-aeo-the-comprehensive-guide/)
- [AEO 2026 Playbook (AI Overviews/ChatGPT/Perplexity/Claude) — ALM Corp](https://almcorp.com/blog/answer-engine-optimization-2026/)
- [FAQ rich results May 2026 change — ALM Corp](https://almcorp.com/blog/google-faq-rich-results-no-longer-supported/)
- [Questions to Ask Before Hiring (agency) 2026 — ViralChilly](https://viralchilly.com/blog/questions-to-ask-when-hiring-an-seo-company-in-2026)
