# Why Evergreen? 영역 개선 — 딥리서치 보고서

> 작성 2026-06-23 · 적용 스킬: frontend-design + Research Protocol(WebSearch 4건)
> 범위: **about 섹션의 Why Evergreen? 영역만** (히어로/스토리/Our Services/Projects는 수정 안 함)
> 대상: `pages/index.vue` about-section (172~203행) + `i18n .about`

---

## 1. 현재 구성 (스크린샷 기준)

| 요소 | 현재 내용 | 코드 |
|---|---|---|
| 제목 | "Why Evergreen?" | `about.whyTitle` |
| 설명문 | "클라이언트의 비즈니스 수익 창출을 최우선… 기획부터 개발, 배포까지 함께하는 든든한 IT 파트너입니다." | `about.description` |
| Stat 4개 | 40+ Successful Projects / 5.0/5.0 Client Satisfaction / 40% Avg. Cost Reduction / 99.9% Service Uptime | `achievements` |
| 팀 티저 | "기획부터 개발까지, 전문가 팀이 함께합니다" + 5명(Sena·Betty·Ben·Jhin·Kayn) + 팀 자세히 보기 | `teamTeaser` |

---

## 2. 문제 진단

### 2-1. 메시지 3중 중복 (Ben 지적의 핵심)
같은 "기획~배포 파트너" 약속이 세 번 반복됩니다.

| 섹션 | 문구 | 역할 |
|---|---|---|
| 히어로 | "처음부터 끝까지, 당신의 개발 파트너 / 기획·개발·배포·운영까지 함께" | 약속 |
| 스토리 | "기획부터 개발, 배포 그 이후 성장까지 … 기술 파트너" | 철학(WHY) |
| **Why Evergreen 설명** | "**기획부터 개발, 배포까지 함께**하는 든든한 IT 파트너" | ← 동일 반복 |

→ 리서치 결론: value prop은 한 번 정립하고, 터치포인트마다 **앵글을 바꿔야** 함(약속→이유→증거→방법). 같은 문장 반복은 redundancy로 인지 부하만 늘림.

### 2-2. Stat 카드 신뢰 리스크 (메모리 룰 충돌)
| Stat | 문제 | 근거 |
|---|---|---|
| **99.9% Service Uptime** | 🔴 "운영 중" 뉘앙스. 포트폴리오는 외주 개발이라 내가 SLA로 운영하는 서비스 아님 | memory: "라이브 운영 중 표현 금지", "포트폴리오 5개는 외주" |
| **40% Avg. Cost Reduction** | 🟡 비교·원가 절감 표현 + 미검증 수치 | memory: "인건비 절감/타 업체 대비" 금지 정신 |
| **5.0/5.0 Client Satisfaction** | 🟡 만점은 과장으로 읽혀 오히려 신뢰 저하 | B2B 리서치: generic excellence < 구체 proof |
| 40+ Successful Projects | 🟢 비교적 안전(검증되면 유지 가능) | — |

### 2-3. 스토리텔링 단절
스토리 섹션이 이미 "문제→고통→답→증명→약속"의 완결된 매니페스토(WHY)입니다. 그 직후 Why Evergreen이 또 "파트너입니다"를 반복하면 내러티브가 **앞으로 나아가지 않고 제자리**입니다.

### 2-4. 팀 인원 불일치
화면 5명(Sena·Betty·Ben·Jhin·Kayn) vs 대외 표기 정책 4명(세나·베티·벤·진). → 정책 확인 필요(Kayn 추가 여부).

---

## 3. 딥리서치 핵심 (2026)

1. **내러티브는 막(act)의 연속** — "section이 아니라 scene". 히어로(약속)→스토리(왜)→**Why Evergreen은 다음 막(어떻게/증거)**이어야. 같은 막 반복 금지. (CMI: hero's journey 적용 캠페인 완주율 48%↑)
2. **B2B는 구체 차별점 > stat counter** — "우리는 최고" 류 generic 통계보다 "Acme의 장애 75%↓" 같은 구체 proof가 전환에 강함. 단독 stat 카드는 효과 약함.
3. **메시지 앵글 변주** — 첫 터치가 cost면 다음은 efficiency, 그다음은 차별점. "so that"(그래서) 문장을 섹션 전환 헤드라인으로.
4. **팀은 장기 파트너십 신호** — 클라이언트를 파트너로 대하는 "한 팀" 메시지가 신뢰. 팀 티저 자체는 유지 가치 있음.

---

## 4. 수정 방향 — 3개 옵션 비교

| 옵션 | 개념 | 중복 해소 | 스토리텔링 연속 | 신뢰(리서치) | 구현 난이도 |
|---|---|---|---|---|---|
| **A. 차별점 3선** | stat → "왜 다른가" 3가지(AI 네이티브 속도 / 풀사이클 한 팀 / 출시 후 성장 동행), 각 구체 근거 | ★★★ | ★★★ | ★★★★ (구체 차별점) | 중 |
| **B. Stat 정직화** | 문구만 제거 + 위험 stat(uptime·cost·5.0) 교체(출시 40+ / 풀스택 팀 / 기획~출시 일괄 / AI 네이티브) | ★★ | ★★ | ★★★ | 하 |
| **C. "How we work" 프로세스** | Why Evergreen → 일하는 방식 4단계(기획→설계→개발→출시·성장) 타임라인. 스토리(왜)의 자연스러운 다음 막(어떻게) | ★★★★ | ★★★★★ | ★★★ | 중상 |

---

## 5. 권장 — C(프로세스) 골격 + A(차별점) 결합 ⭐

**Why Evergreen?를 "어떻게 일하는가(HOW)" 막으로 재정의.** 스토리(왜)의 답을 행동으로 보여주는 다음 단계 → 내러티브가 전진.

구성안:
1. **제목 유지** "Why Evergreen?" (또는 "How We Work"로 변경 검토)
2. **설명문 교체** — "파트너입니다" 반복 제거 → 차별 한 줄. 예:
   > "외주는 만들고 끝나지만, 에버그린은 출시 후 성장까지 설계합니다."
   (스토리의 '곁을 지키는 파트너'를 **행동 약속**으로 전환, 반복 아님)
3. **Stat 4개 → 차별점/프로세스로 전환**:
   - 🔴 99.9% Uptime, 40% Cost Reduction 제거 (룰 위반)
   - 대체안 (택1):
     - (A형) 차별점 3카드: "AI 네이티브 개발" / "기획~출시 한 팀" / "출시 후 성장 동행"
     - (C형) 프로세스 4스텝: 기획 → 설계 → 개발 → 출시·성장 (각 1줄)
   - 검증되면 "40+ 출시 프로젝트" 1개만 신뢰 지표로 유지 가능
4. **팀 티저 유지** — 단 인원 정책(4명) 확인 후 정합. "한 팀이 끝까지" 신뢰 메시지로 스토리 마무리.

### 솔직한 결론
- 내 초기 직관(차별점 카드, 옵션 A)도 좋지만, **Ben의 "하나의 스토리텔링" 요구엔 C(프로세스)가 더 정확**합니다. 스토리=왜, Why Evergreen=어떻게로 막이 전진하기 때문.
- 단독 stat counter는 2026 B2B 리서치상 약하므로 **줄이는 방향이 맞습니다**.
- uptime/cost stat은 디자인 문제가 아니라 **사실 정합성(메모리 룰) 문제**라 어느 옵션이든 제거 권장.

---

## 6. 다음 단계 (Ben 결정 대기)
- 옵션 A / B / C / 하이브리드 중 택1
- "Why Evergreen?" 제목 유지 vs "How We Work" 변경
- 팀 인원 4명 vs 5명 확정
- stat 중 "40+ 출시 프로젝트" 수치 사용 가능 여부(검증)

→ 결정 시 about-section 해당 영역만 수정 + Playwright 검증 + feat 브랜치 커밋.

---

## Sources
- [Immersive Storytelling Websites: 2026 Guide — Utsubo](https://www.utsubo.com/blog/immersive-storytelling-websites-guide)
- [Hero Section Design: Best Practices for 2026 — Landy AI](https://www.landy-ai.com/blog/hero-section-design)
- [Key Differentiators That Drive B2B Growth — Martal](https://martal.ca/key-differentiators-lb/)
- [B2B Website Conversion Optimization — Trajectory Web Design](https://www.trajectorywebdesign.com/blog/b2b-website-conversion-optimization)
- [Optimize Website Messaging: 2026 Guide — InfluencerDB](https://influencerdb.net/campaign-strategy/optimize-website-messaging/)
- [How B2B Can Make Value Propositions Work Harder — Brandingmag](https://www.brandingmag.com/perri-richman/how-b2b-can-make-value-propositions-work-harder-for-growth/)
- [8 SaaS Website Design Trends 2026 — Mockflow](https://mockflow.com/blog/saas-website-design-trends)
