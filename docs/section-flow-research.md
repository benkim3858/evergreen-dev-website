# 전체 섹션 배치 — 스토리텔링 관점 딥리서치

> 작성 2026-06-23 · 스킬: frontend-design + marketing-principles + homepage-audit + Research Protocol(WebSearch 4건)
> 범위: 홈(`pages/index.vue`) 전체 섹션 순서 진단 (조사·제안만, 수정 X)

---

## 1. 현재 섹션 순서 + 스토리 역할 매핑

| # | 섹션 | 내용 | 내러티브 역할 | 평가 |
|---|---|---|---|---|
| 1 | Hero | 처음부터 끝까지, 당신의 개발 파트너 | **Hook / 약속** | ✅ |
| 2 | Story | 미완성 프로토타입→제대로 만드는 것이 답 | **Problem / Why** | ✅ |
| 3 | Our Services | AI·AX / 웹·모바일 / 백엔드 | **Solution / What** | ✅ |
| 4 | Projects | 포트폴리오 작업물 | **Proof / 증거** | ✅ |
| 5 | Why Evergreen | 프로세스 4단계 + 40+ + 팀 + **후기** | **Plan(How) + Trust(Who)** | ⚠️ 후기 위치 |
| 6 | FAQ | 자주 묻는 질문 | **Objection 해소** | ✅ |
| 7 | Contact | 문의 폼 | **CTA / 행동** | ✅ |

---

## 2. 딥리서치 핵심 (2026)

1. **표준 고전환 순서** = Hero → Problem → Solution → **Social Proof** → Offer/CTA → FAQ → Footer. 가장 흔한 실패는 "fit 전에 feature, trust 전에 CTA". (involve.me, unicornplatform)
2. **StoryBrand**(Donald Miller): Header → Problem → Solution → **Plan(프로세스 1·2·3)** → Authority(후기/팀) → CTA. 프로세스는 "고객 불안 해소" 장치로 Solution 가까이. (Toptal, ConnectiveWebDesign)
3. **Social Proof 배치가 핵심** — hero 근처 social proof는 2.3배 engagement, "결정 순간(CTA 근처)"에 둘 때 전환↑. **"placement > quantity"**. 홈 3-5개 적정. (Genesys Growth, DigitalApplied)
4. **B2B**: case study/proof는 한 곳에 몰지 말고 맥락에 분산 가능하나, 홈의 포트폴리오 섹션 자체는 유효. (Grafit, Trajectory)

---

## 3. 진단 — 대순서는 이미 좋다

현재 흐름 **Hero→Story(Problem)→Services(Solution)→Projects(Proof)→Why Evergreen(Plan+Trust)→FAQ→Contact(CTA)** 은
2026 표준 고전환 시퀀스와 **거의 정확히 일치**합니다. 전면 재배치는 불필요합니다.

### 유일한 실질 개선점: 고객 후기(Testimonials) 위치 🔴
- **현재**: About(5번째 섹션) **맨 끝**, 프로세스→40+→팀 **뒤**에 묻힘 (index.vue 210행)
- **문제**: 리서치상 social proof는 "결정 순간(CTA 근처)" 또는 hero 근처가 가장 효과적인데, 현재는 CTA(Contact, 7번째)에서 멀고 페이지 중간에 갇힘
- **결과**: 가장 강한 신뢰 자산이 전환 직전에 작동하지 못함

---

## 4. 옵션 비교

| 옵션 | 변경 | 효과 | 리스크 | 권장 |
|---|---|---|---|---|
| **A. 현행 유지** | 없음 | 대순서 이미 양호 | 후기가 묻힘(기회손실) | — |
| **B. 후기만 CTA 앞으로** | testimonials를 About에서 분리 → FAQ 뒤·Contact 앞 독립 섹션 | ★★★★ 결정 순간 social proof, About도 가벼워짐 | 낮음 | ⭐ 권장 |
| **C. B + 프로세스를 Services 직후로** | 후기 이동 + Why Evergreen의 프로세스를 Projects 앞(Solution 직후)으로 분리 | ★★★ full StoryBrand 정렬 | 중(섹션 분해, Why Evergreen 응집 깨짐) | 선택 |

---

## 5. 권장 — 옵션 B (후기만 이동) ⭐

**섹션 대순서는 그대로 두고, 고객 후기(testimonials)만 Contact 직전 독립 섹션으로 이동.**

권장 순서:
> Hero → Story → Our Services → Projects → Why Evergreen(프로세스+40++팀) → FAQ → **Testimonials(후기)** → Contact

- About(Why Evergreen)은 "어떻게 일하나 + 누가"로 응집(가벼워짐)
- 후기는 FAQ로 의문 해소 직후, 문의 폼 바로 앞 = **결정 순간**에 작동
- (선택) hero 또는 Story 근처에 별점/한줄 pull-quote 1개로 above-the-fold 신뢰 신호 추가 — 리서치상 2.3배 engagement

### 옵션 C를 권장하지 않는 이유 (자기 제안 재검증)
처음엔 "프로세스를 Services 직후로(StoryBrand Solution→Plan)"도 고려했으나:
- 현재 Projects(Proof)→프로세스(How) 순서도 "증거를 본 뒤 → 그래서 이렇게 일한다"로 설득력이 충분
- 방금 Why Evergreen을 프로세스+팀으로 응집해 둔 것을 다시 쪼개는 비용 > 이득
- → **marginal**. 굳이 안 함.

---

## 6. 솔직한 결론

- **전체 섹션 배치는 손댈 필요가 거의 없습니다.** 이미 Hero→Problem→Solution→Proof→Plan/Trust→Objection→CTA의 교과서적 스토리 흐름입니다.
- **딱 하나, 고객 후기(testimonials)를 Contact 직전으로 빼는 것만 권장합니다.** 이건 디자인이 아니라 "신뢰 자산을 결정 순간에 배치"라는 전환 원칙 문제입니다.
- 그 외 재배치는 효과 대비 비용이 커서 권장하지 않습니다.

---

## 7. 다음 단계 (Ben 결정 대기)
- 옵션 **B 채택 여부** (후기 → Contact 앞 이동)
- (선택) above-the-fold 신뢰 신호 1줄 추가 여부
→ 승인 시 testimonials 블록만 이동 + CSS 정합 + Playwright 검증 + 커밋.

---

## Sources
- [Landing Page Structure 2026 — Unicorn Platform](https://unicornplatform.com/blog/optimal-landing-page-structure/)
- [Landing Page Structure & Best Practices — involve.me](https://www.involve.me/blog/landing-page-structure)
- [StoryBrand Framework for Web Design — Toptal](https://www.toptal.com/designers/ux/storybrand-framework)
- [StoryBrand B2B Homepage Guide — Connective Web Design](https://connectivewebdesign.com/blog/storybrand-framework)
- [Social Proof Conversion Stats 2026 — Genesys Growth](https://genesysgrowth.com/blog/social-proof-conversion-stats-for-marketing-leaders)
- [Trust Signals Funnel Placement — Digital Applied](https://www.digitalapplied.com/blog/social-proof-trust-signals-2026-conversion-placement-framework)
- [B2B Website Best Practices 2026 — Grafit](https://www.grafit.agency/blog/best-practices-for-building-a-high-performing-b2b-website-in-2026)
