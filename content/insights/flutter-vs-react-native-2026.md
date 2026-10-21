---
title: Flutter와 React Native, 2026년에는 무엇으로 시작할까
description: >-
  2026년 10월 기준 Flutter 3.47과 React Native 0.88을 놓고 웹 화면 운영, 카카오·결제 SDK, 버전 업데이트 부담, 출시 뒤 긴급 수정 방식을 비교했습니다. 저희가 두 프레임워크로 진행한 프로젝트를 기준으로 고르는 기준을 정리했습니다.
date: 2026-10-21
updated: 2026-10-21
category: 앱 개발 방식
tags:
  - Flutter
  - React Native
  - Expo
  - 크로스플랫폼
  - 앱 개발 외주
readingTime: 9
question: Flutter와 React Native 중 2026년에 새 앱은 무엇으로 시작하는 것이 좋나요?
answer: >-
  2026년 10월 기준 Flutter 3.47과 React Native 0.88은 모두 성숙해서 대부분의 앱은 어느 쪽으로도 만들 수 있고, 웹 화면을 함께 운영하거나 웹뷰 구조를 쓰는 서비스는 React Native, 앱이 중심이고 카카오 공식 SDK를 쓰고 싶은 서비스는 Flutter가 유리합니다.
sources:
  - name: Flutter 릴리스 메타데이터 (Google 공식 배포 저장소)
    url: https://storage.googleapis.com/flutter_infra_release/releases/releases_macos.json
  - name: React Native 0.88 출시 글 (React Native Blog)
    url: https://reactnative.dev/blog/2026/10/19/react-native-0.88
  - name: React Native 0.82 출시 글, New Architecture 전용 전환 (React Native Blog)
    url: https://reactnative.dev/blog/2025/10/08/react-native-0.82
  - name: React Native 릴리스 지원 정책 (React Native Docs)
    url: https://reactnative.dev/docs/releases
  - name: Expo SDK 버전 목록 (Expo Docs)
    url: https://docs.expo.dev/versions/latest/
  - name: Impeller 렌더링 엔진 (Flutter Docs)
    url: https://docs.flutter.dev/perf/impeller
  - name: 카카오 로그인 공통 안내, 플랫폼별 SDK (Kakao Developers)
    url: https://developers.kakao.com/docs/ko/kakaologin/common
  - name: react-native-kakao-login (GitHub)
    url: https://github.com/crossplatformkorea/react-native-kakao-login
  - name: 결제위젯 Flutter SDK (토스페이먼츠)
    url: https://docs.tosspayments.com/sdk/v2/widget-flutter
  - name: 결제위젯 React Native SDK (토스페이먼츠)
    url: https://docs.tosspayments.com/sdk/v2/widget-rn
  - name: Flutter Web FAQ, 검색 색인 관련 (Flutter Docs)
    url: https://docs.flutter.dev/platform-integration/web/faq
  - name: Expo Router 정적 렌더링 (Expo Docs)
    url: https://docs.expo.dev/router/web/static-rendering/
  - name: EAS Update 소개 (Expo Docs)
    url: https://docs.expo.dev/eas-update/introduction/
  - name: Shorebird Code Push (Shorebird Docs)
    url: https://docs.shorebird.dev/code-push/
  - name: App Review Guidelines 2.5.2 (Apple Developer)
    url: https://developer.apple.com/app-store/review/guidelines/
  - name: Apple Developer Program License Agreement 3.3.1(B) (Apple Developer)
    url: https://developer.apple.com/support/terms/apple-developer-program-license-agreement/
  - name: Flutter 앱 용량 측정 (Flutter Docs)
    url: https://docs.flutter.dev/perf/app-size
faq:
  - q: Flutter와 React Native로 만들 때 개발비가 다른가요?
    a: >-
      같은 기능이라면 큰 차이가 없습니다. 저희 회사는 두 프레임워크 모두 크로스플랫폼 기준(1.0배)으로 견적을 내고, 차이는 프레임워크보다 기능 수와 디자인 준비 정도에서 납니다.
  - q: React Native에서도 카카오 로그인을 쓸 수 있나요?
    a: >-
      쓸 수 있습니다. 카카오는 React Native용 공식 SDK를 제공하지 않아서 커뮤니티 패키지(@react-native-seoul/kakao-login)를 쓰고, Expo로 개발하면 Expo Go 대신 Development Build로 테스트해야 합니다.
  - q: Flutter로 만든 웹 화면도 검색에 노출되나요?
    a: >-
      Flutter 공식 문서는 Flutter Web 결과물이 검색 엔진 색인에 맞지 않고, 텍스트 위주의 정적 사이트에도 맞지 않는다고 설명합니다. 회사 소개나 랜딩 페이지처럼 검색 노출이 필요한 화면은 HTML로 따로 만드는 편이 맞습니다.
  - q: 출시한 뒤 심사 없이 앱을 고칠 수 있나요?
    a: >-
      일부만 가능합니다. React Native는 EAS Update로 JS·스타일·이미지를, Flutter는 Shorebird로 Dart 코드를 바꿀 수 있습니다. 그러나 네이티브 코드와 권한을 바꾸려면 새 빌드와 심사가 필요하고, Apple 심사 기준 2.5.2는 기능을 새로 넣거나 바꾸는 코드를 내려받아 실행하는 것을 금지합니다.
  - q: 이미 만든 앱의 프레임워크를 바꿔야 할까요?
    a: >-
      대부분은 바꿀 필요가 없습니다. 버전이 많이 뒤처져 업데이트가 막힌 경우라면 프레임워크 교체보다 버전 업그레이드가 먼저입니다. 프레임워크를 바꾸게 되면 기존 사용자의 로그인 토큰을 새 앱으로 옮기는 작업을 함께 계획해야 합니다.
---

앱 개발을 맡기실 때 먼저 정하게 되는 것 중 하나가 Flutter와 React Native 중 무엇으로 만드느냐입니다. 결론부터 말씀드리면, 2026년 10월 현재 두 프레임워크 모두 충분히 성숙해서 대부분의 앱은 어느 쪽으로도 만들 수 있습니다. 저희 회사 포트폴리오에도 Flutter로 만든 프로젝트가 5건, React Native로 만든 프로젝트가 4건 있습니다.

그래서 성능 비교보다 **우리 서비스의 조건에서 어느 쪽이 덜 번거로운가**를 보는 편이 맞습니다. 갈리는 지점은 웹 화면을 함께 운영하는지, 한국 서비스에 필요한 SDK, 버전 업데이트 부담, 출시 뒤 긴급 수정 방식입니다.

## 2026년 10월 현재 두 프레임워크

| 항목 | Flutter | React Native |
|---|---|---|
| 최신 안정판 | 3.47.7 (2026-10-08, Dart 3.13 계열) | 0.88 (2026-10-15), Expo SDK 58 |
| 새 버전 주기 | 안정판이 분기마다 | minor가 2개월 안팎마다, 최근 3개만 지원 |
| 화면 구조 | Impeller 렌더러 (iOS는 유일한 렌더러) | New Architecture (0.82부터 필수) |
| 카카오 로그인 | 카카오 공식 SDK | 커뮤니티 패키지 |
| 토스페이먼츠·포트원 결제 | 공식 SDK | 공식 SDK |
| 웹 화면 | Flutter Web, 검색 노출용으로는 부적합 | Expo Router 정적 렌더링으로 경로별 HTML 생성 |
| 출시 뒤 코드 업데이트 | Shorebird (Dart 코드) | EAS Update (JS·스타일·이미지) |

Flutter는 다음 안정판인 3.50을 올해 안에 낸다고 공식 문서에 밝혀 두었습니다.

## 1. 웹 화면을 함께 운영한다면 React Native가 편합니다

React Native는 웹과 같은 React로 화면을 만듭니다. Expo를 쓰면 같은 코드로 웹 화면을 만들 수 있고, Expo Router의 정적 렌더링을 쓰면 경로마다 HTML이 생겨 검색 노출이 가능합니다. 이미 Next.js 같은 React 웹이 있는 서비스라면 개발자와 코드를 함께 쓸 수 있습니다.

Flutter도 웹을 지원하지만 쓰임새가 다릅니다. Flutter 공식 문서는 Flutter Web 결과물이 검색 엔진 색인에 맞지 않고, 텍스트 위주의 정적 사이트에는 맞지 않는다고 설명합니다. 대신 PWA나 기존 앱의 웹판처럼 로그인 뒤에 쓰는 화면에는 맞다고 합니다. Flutter로 간다면 랜딩·소개 페이지는 HTML로 따로 두는 것을 전제로 하시면 됩니다.

웹 화면을 앱에 담는 웹뷰 하이브리드로 시작하는 경우에도 React Native가 자연스럽습니다. React Native WebView로 웹 화면을 담고, 자주 쓰는 화면부터 하나씩 네이티브 화면으로 바꿔 나갈 수 있습니다. 저희가 개발한 CROU가 Next.js 웹 화면을 React Native WebView에 담은 구조입니다. 웹뷰로 어디까지 되는지는 [웹뷰 하이브리드 앱, 어디까지 되고 어디서 막히는가](/insights/webview-hybrid-app-limits)에 정리했습니다.

## 2. 카카오 로그인은 Flutter에만 공식 SDK가 있습니다

한국 서비스는 카카오 로그인, 네이버 로그인, 국내 PG 결제를 거의 항상 붙입니다. 2026년 10월 기준 두 프레임워크의 지원 상황은 다음과 같습니다.

| SDK | Flutter | React Native |
|---|---|---|
| 카카오 로그인 | 카카오가 직접 제공·관리 | 커뮤니티 패키지, Expo는 Development Build 필요 |
| 네이버 로그인 | 커뮤니티 패키지 | 커뮤니티 패키지 |
| 토스페이먼츠 | 공식 SDK | 공식 SDK (react-native-webview 13.x 필요) |
| 포트원 | 공식 패키지 (V1·V2) | 공식 SDK (V2), V1 저장소도 포트원이 관리 |

결제는 두 프레임워크 모두 PG사가 직접 SDK를 내고 있어서 차이가 크지 않습니다. 차이는 카카오 로그인에서 납니다. 커뮤니티 패키지도 널리 쓰이지만 관리 주체가 카카오가 아니어서, 카카오가 SDK나 정책을 바꿀 때 패키지가 언제 따라오는지를 개발사가 직접 확인해야 합니다.

## 3. React Native는 업데이트를 오래 미루면 비용이 커집니다

React Native는 최근 3개 minor 버전만 지원하고, 2026년에는 minor가 2개월 안팎마다 나왔습니다. 계산해 보면 반년 정도 버전을 올리지 않으면 지원 범위를 벗어납니다.

특히 2025년 10월에 나온 0.82부터는 New Architecture만 쓸 수 있습니다. 옛 아키텍처를 쓸 수 있는 마지막 버전이 0.81과 Expo SDK 54여서, 그 이전에 만든 앱은 버전을 올릴 때 라이브러리 교체가 함께 붙는 경우가 많습니다. 스토어 제출 요건이 바뀌어 업데이트가 막혔을 때 이 작업이 한꺼번에 몰립니다([2026년 스토어 제출 요건](/insights/2026-app-store-play-submission-requirements)).

Flutter도 안정판이 분기마다 나오므로 손을 놓아도 되는 것은 아닙니다. 어느 쪽이든 1년에 한두 번 버전을 올리는 작업을 유지보수 계약에 넣어 두시는 편이 출시 뒤 비용을 줄입니다.

## 4. 출시 뒤 긴급 수정은 둘 다 되고, 한계도 같습니다

두 프레임워크 모두 스토어 심사를 다시 받지 않고 코드를 고치는 방법이 있습니다. React Native는 Expo의 EAS Update로 JS, 스타일, 이미지를 바꿀 수 있습니다. Flutter는 Shorebird로 Dart 코드를 바꿀 수 있습니다.

다만 둘 다 네이티브 코드, 권한, SDK 버전은 바꾸지 못해서 새 빌드와 심사가 필요합니다. Apple 심사 기준 2.5.2는 기능을 새로 넣거나 바꾸는 코드를 내려받아 실행하는 것을 금지합니다. 해석되는 코드를 내려받는 것은 개발자 프로그램 약관 3.3.1(B)에서 앱의 주된 목적을 바꾸지 않는 등의 조건 아래에서만 허용합니다. 출시 뒤 긴급 수정은 오류 수정 용도로 보시고, 새 기능은 심사를 거친다고 생각하시면 됩니다.

## 5. 앱 용량과 성능은 고르는 기준이 되기 어렵습니다

앱 용량을 공식 수치로 비교할 수 있는 자료는 없습니다. Flutter 공식 문서는 엔진이 압축 기준 몇 MB를 더한다고만 적고, 용량은 개발용 빌드가 아니라 Play Console과 App Store Connect의 수치로 재라고 안내합니다. React Native 쪽은 공식 기준 수치가 없습니다.

같은 앱을 두 프레임워크로 만들어 비교한 공개 측정 자료도 있지만, 2024년 말 버전 기준이라 지금 판단 근거로 쓰기에는 오래됐습니다. 저희가 진행한 커머스·예약·학습 앱에서는 사용자가 체감하는 차이가 프레임워크보다 이미지 처리, 목록 화면 구현, 서버 응답 속도에서 더 크게 났습니다.

## 저희가 진행한 프로젝트

| 프레임워크 | 프로젝트 | 성격 |
|---|---|---|
| Flutter | 우리차이나 | 1:1 화상 수업·AI 발음 평가 학습 앱 |
| Flutter | POZO | 포장 주문 소비자 앱·매장 관리 앱 |
| Flutter | Chordly | 전문가 매칭·소셜 피드·실시간 메시지 앱 |
| Flutter | 2025 Suwon ITS AP Forum | 국제 컨퍼런스 참가자 앱 |
| Flutter | KOBACK | 학생·학부모·코치용 학습 관리 앱 |
| React Native | CROU | Next.js 웹 화면 + 웹뷰, 네이티브 위젯 |
| React Native | 이커머스 플랫폼 | Vue·Nuxt 웹과 함께 운영하는 앱 |
| React Native | 대출 매칭 플랫폼 | Vue·Nuxt 웹과 함께 운영하는 앱 |
| React Native | 에듀테크 LMS | Vue·Nuxt 웹과 함께 운영하는 앱 |

돌아보면 앱이 서비스의 중심인 프로젝트는 Flutter로, 웹 화면이 함께 있거나 웹 화면을 앱에 담는 프로젝트는 React Native로 진행했습니다. 위에서 설명한 기준과 같은 결과입니다.

## 이렇게 고르시면 됩니다

| 상황 | 권하는 프레임워크 |
|---|---|
| React·Next.js 웹이 이미 있거나 웹 화면을 함께 운영 | React Native |
| 모바일 웹을 앱에 담아 시작하고 점차 네이티브로 전환 | React Native |
| 앱이 서비스의 중심이고 웹은 소개 페이지 정도 | Flutter |
| 카카오 로그인이 핵심이고 공식 SDK를 원함 | Flutter |
| 사내 개발자가 이어받을 예정 | 사내 개발자가 익숙한 쪽 |

마지막 줄이 생각보다 중요합니다. 외주로 만든 앱을 나중에 사내에서 운영하실 계획이라면, 그 개발자가 다룰 수 있는 프레임워크가 정답입니다.

## 정리

2026년에는 Flutter와 React Native 중 어느 쪽을 골라도 앱을 만드는 데 문제가 없습니다. 그래서 프레임워크 이름보다 웹 화면 운영, 카카오 로그인, 버전 업데이트를 누가 언제 할지를 먼저 정하시는 편이 좋습니다. 견적을 받으실 때는 어떤 프레임워크를 전제로 했는지와 버전 업데이트가 유지보수 범위에 들어 있는지를 함께 확인하십시오([견적이 3배 차이 나는 이유](/insights/app-outsourcing-quote-difference)).

저희 회사는 두 프레임워크로 모두 앱을 만들고 있습니다. 서비스 소개와 웹 화면이 있는지 정도만 [문의 페이지](/contact)로 남겨 주시면, 어느 쪽이 맞는지부터 말씀드리겠습니다.
