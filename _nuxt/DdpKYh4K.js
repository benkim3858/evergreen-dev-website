const e=`---
title: 웹뷰 하이브리드 앱, 어디까지 되고 어디서 막히는가
description: >-
  모바일 웹을 앱에 담는 웹뷰 하이브리드는 개발비가 낮은 대신 구글 로그인, 앱 푸시, 카드사 앱 결제, 홈 화면 위젯, Android 뒤로 가기에서 네이티브 코드가 따로 필요합니다. 2026년 10월 기준 공식 문서로 막히는 지점과 대응 방법을 정리했습니다.
date: 2026-10-21
updated: 2026-10-21
category: 앱 개발 방식
tags:
  - 웹뷰 하이브리드
  - WebView
  - 앱 심사
  - PG 결제
  - React Native
readingTime: 10
question: 웹뷰 하이브리드 앱으로 만들면 어떤 기능에서 막히나요?
answer: >-
  웹 화면을 보여 주는 일은 웹뷰로 충분하지만, 2026년 10월 기준 구글 로그인·앱 푸시·카드사 앱 결제·홈 화면 위젯·Android 16 뒤로 가기는 네이티브 코드를 따로 붙여야 하고, 웹사이트를 감싸기만 한 앱은 App Store 심사 기준 4.2에 걸립니다.
sources:
  - name: App Review Guidelines 4.2·4.8·3.1.1·3.1.3(e) (Apple Developer)
    url: https://developer.apple.com/app-store/review/guidelines/
  - name: StoreKit External Purchase Entitlement 대한민국 (Apple Developer)
    url: https://developer.apple.com/support/storekit-external-entitlement-kr/
  - name: OAuth 2.0 Policies (Google for Developers)
    url: https://developers.google.com/identity/protocols/oauth2/policies
  - name: Upcoming security changes to Google's OAuth 2.0 authorization endpoint (Google Developers Blog)
    url: https://developers.googleblog.com/2021/06/upcoming-security-changes-to-googles-oauth-2.0-authorization-endpoint.html
  - name: Web Push for Web Apps on iOS and iPadOS (WebKit)
    url: https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/
  - name: WKWebView 앱의 Web Push 관련 Apple 엔지니어 답변 (Apple Developer Forums)
    url: https://developer.apple.com/forums/thread/760767
  - name: canOpenURL 문서 (Apple Developer Documentation)
    url: https://developer.apple.com/documentation/uikit/uiapplication/canopenurl(_:)
  - name: 웹뷰 연동 가이드 (토스페이먼츠)
    url: https://docs.tosspayments.com/guides/v2/webview
  - name: 모바일 앱에서 결제 연동하기 (포트원)
    url: https://developers.portone.io/opi/ko/extra/mobile-payment/readme-v2?v=v2
  - name: WebView 앱 연동 참고사항 (KG이니시스 매뉴얼)
    url: https://manual.inicis.com/pay/stdpay_pc.html#mo
  - name: SwiftUI views for widgets (Apple Developer Documentation)
    url: https://developer.apple.com/documentation/widgetkit/swiftui-views
  - name: Android 16 동작 변경사항 (Android Developers)
    url: https://developer.android.com/about/versions/16/behavior-changes-16
  - name: 뒤로 탐색 예측 동작 가이드 (Android Developers)
    url: https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture
  - name: react-native-webview Reference (GitHub)
    url: https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md
faq:
  - q: 웹뷰 앱도 App Store 심사를 통과할 수 있나요?
    a: >-
      통과할 수 있습니다. 심사 기준 4.2는 다시 포장한 웹사이트 이상의 기능과 화면을 요구하므로, 네이티브 푸시 알림, 홈 화면 위젯, 네트워크가 끊겼을 때의 안내 화면처럼 앱에서만 되는 기능을 함께 넣습니다.
  - q: 모바일 웹에서는 되던 구글 로그인이 앱에서만 안 되는 이유는 무엇인가요?
    a: >-
      Google이 2021년 9월 30일부터 앱 안에 내장된 웹뷰에서 보내는 로그인 요청을 모두 차단했기 때문입니다. 웹뷰 안에서 구글 로그인을 누르면 disallowed_useragent 오류가 나고, 앱에서는 구글 로그인 SDK를 네이티브로 붙이거나 시스템 브라우저 화면으로 로그인해야 합니다.
  - q: 웹뷰 앱에서 PG로 결제를 받아도 되나요?
    a: >-
      실물 상품이나 앱 밖에서 쓰는 서비스는 심사 기준 3.1.3(e)에 따라 인앱 결제가 아닌 결제 수단을 써야 하므로 PG 결제를 씁니다. 다만 카드사·간편결제 앱을 호출하는 주소를 앱이 직접 처리하도록 Android와 iOS 양쪽에 네이티브 코드를 넣어야 합니다. 유료 콘텐츠나 구독 같은 디지털 상품은 인앱 결제가 원칙입니다.
  - q: Android 앱을 업데이트한 뒤로 뒤로 가기 버튼이 앱을 바로 꺼 버립니다. 왜 그런가요?
    a: >-
      Android 16(API 36)을 타깃으로 올린 앱은 Android 16 이상 기기에서 onBackPressed가 호출되지 않고 뒤로 가기 키 이벤트도 전달되지 않습니다. OnBackPressedCallback을 등록하고, 웹뷰에 뒤로 갈 페이지가 있을 때만 켜 두는 방식으로 바꿔야 합니다.
  - q: 웹뷰로 시작해서 나중에 Flutter나 React Native 앱으로 옮길 수 있나요?
    a: >-
      옮길 수 있습니다. React Native WebView로 시작하면 자주 쓰는 화면부터 하나씩 네이티브 화면으로 바꿔 나갈 수 있습니다. 다만 앱이 저장한 로그인 토큰과 웹뷰 쿠키를 새 구조로 넘기는 작업을 미리 계획해 두어야 업데이트 때 사용자가 로그아웃되지 않습니다.
---

이미 모바일 웹이 있는 서비스라면 그 화면을 앱에 담아 스토어에 올리는 방법을 먼저 떠올리게 됩니다. 웹뷰 하이브리드라고 부르는 방식이고, 화면을 새로 만들지 않으니 개발비가 낮습니다. 저희 회사는 크로스플랫폼 앱의 0.6~0.8배 정도로 잡습니다([견적이 3배 차이 나는 이유](/insights/app-outsourcing-quote-difference)).

문제는 웹 브라우저에서 되던 기능이 앱 안의 웹뷰에서는 안 되는 경우가 있다는 점입니다. 저희가 개발한 CROU는 Next.js로 만든 웹 화면을 React Native WebView에 담고, 예약 푸시 알림과 홈 화면 위젯 같은 네이티브 기능을 연동한 구조입니다. 이런 프로젝트를 진행하며 확인한 경계를 2026년 10월 기준 공식 문서로 정리했습니다.

## 웹뷰만으로 되는 것과 안 되는 것

| 기능 | 웹뷰만으로 | 필요한 네이티브 작업 |
|---|---|---|
| 콘텐츠 화면, 게시판, 예약 접수 | 됨 | 없음 |
| 자체 회원가입·로그인 | 됨 | 없음 |
| 구글 로그인 | 안 됨 | 네이티브 SDK 또는 시스템 브라우저로 로그인 |
| 앱 푸시 알림 | 안 됨 | FCM·APNs 연동 후 토큰을 웹에 전달 |
| 카드 결제(PG) | 일부만 됨 | 카드사·은행 앱 호출 처리 |
| 사진·파일 업로드 | 설정하면 됨 | 권한 안내 문구와 카메라 호출 선언 |
| 홈 화면 위젯 | 안 됨 | iOS·Android 위젯을 따로 개발 |
| Android 뒤로 가기 | 옛 코드가 동작하지 않음 | Android 16 기준 새 방식으로 처리 |

아래에서 하나씩 설명합니다.

## 1. 웹사이트를 감싸기만 하면 심사에서 거절됩니다

App Store 심사 기준 4.2는 앱이 다시 포장한 웹사이트 이상의 기능과 콘텐츠, 화면을 갖추라고 요구합니다. 4.2.2는 웹 클리핑이나 링크 모음이 주가 되는 앱을 막습니다. 모바일 웹 주소 하나를 띄우기만 하는 앱은 이 조항에 걸립니다.

그래서 웹뷰 앱에도 앱에서만 되는 기능을 넣습니다. 저희는 네이티브 푸시 알림, 홈 화면 위젯, 네트워크가 끊겼을 때의 안내 화면, 네이티브 하단 탭 메뉴 가운데 서비스에 맞는 것을 고릅니다. 아래에서 다루는 기능 대부분이 이 요건을 채우는 재료가 됩니다.

## 2. 구글 로그인은 웹뷰 안에서 막힙니다

Google은 개발자가 제어하는 내장 웹뷰에서 로그인 요청을 보내는 것을 정책으로 금지하고, 2021년 9월 30일부터 모든 내장 웹뷰를 차단했습니다. Android WebView와 iOS WKWebView가 모두 대상입니다. 웹뷰 안에서 구글 로그인 버튼을 누르면 \`disallowed_useragent\` 오류가 나고, 2026년 8월에 고친 정책 문서에도 같은 조항이 그대로 있습니다.

모바일 웹에서는 잘 되던 구글 로그인이 앱에서만 안 되는 이유가 이것입니다. 앱에서는 구글 로그인 SDK를 네이티브로 붙이거나 시스템 브라우저 화면으로 로그인을 띄운 뒤, 받은 결과를 웹 화면에 넘겨야 합니다.

소셜 로그인을 붙이면 Apple 쪽 요건도 함께 봐야 합니다. 심사 기준 4.8은 제3자 로그인으로 계정을 만드는 앱에 세 가지 조건을 갖춘 로그인 방법을 하나 더 제공하라고 요구합니다. 이름과 이메일만 받고, 이메일을 숨길 수 있고, 동의 없이 광고 추적을 하지 않는 방식이어야 합니다. Sign in with Apple이 이 조건을 채우는 대표적인 선택지입니다. 자체 회원 계정만 쓰는 앱은 이 요건을 받지 않습니다.

## 3. 웹 푸시는 앱 안에서 오지 않습니다

iOS는 16.4부터 홈 화면에 추가한 웹앱에서 웹 푸시를 받을 수 있습니다. 그런데 이것은 Safari에서 홈 화면에 추가한 웹앱의 이야기입니다. WKWebView를 쓰는 앱 안에서는 웹 푸시가 동작하지 않고, 같은 앱이라도 네이티브 푸시는 쓸 수 있다고 Apple 엔지니어가 개발자 포럼에서 답했습니다.

그래서 앱 푸시는 네이티브로 붙입니다. 앱이 FCM·APNs 푸시 토큰을 받아 웹 화면에 넘기고, 서버가 그 토큰으로 알림을 보내는 구조입니다. 알림을 눌렀을 때 웹뷰가 어느 페이지를 열지도 앱에서 정해 줘야 합니다.

## 4. 결제는 카드사 앱으로 넘어가는 순간 막힙니다

실물 상품이나 앱 밖에서 쓰는 서비스는 심사 기준 3.1.3(e)에 따라 인앱 결제가 아닌 결제 수단을 써야 합니다. 그래서 쇼핑몰이나 예약 앱은 웹에서 쓰던 PG 결제를 그대로 씁니다.

막히는 곳은 결제 도중 카드사 앱이나 간편결제 앱으로 넘어가는 단계입니다. 웹뷰는 앱을 호출하는 주소를 스스로 처리하지 못합니다. 토스페이먼츠, 포트원, KG이니시스 개발자 문서가 공통으로 안내하는 작업은 다음과 같습니다.

- **Android**: 웹뷰가 이동하려는 주소를 가로채(\`shouldOverrideUrlLoading\`) \`intent://\` 주소를 해석해 해당 앱을 열고, 앱이 없으면 스토어로 보냅니다. Android 11 이상에서는 호출할 결제 앱 패키지를 미리 선언합니다.
- **iOS**: \`Info.plist\`의 \`LSApplicationQueriesSchemes\`에 카드사·은행 앱 스킴을 등록하고, 결제를 마친 뒤 우리 앱으로 돌아올 스킴을 설정합니다.

iOS에는 최근 바뀐 것이 하나 있습니다. 등록할 수 있는 스킴 수는 iOS 15 SDK부터 50개였는데, iOS 27 SDK로 빌드하는 앱부터는 25개로 줄어듭니다. 등록 여부를 확인하는 \`canOpenURL\`도 iOS 27에서 사용 중단 예정(deprecated)이 됐습니다. KG이니시스 매뉴얼에 실린 카드사·은행 앱 스킴만 60개가 넘으므로, 먼저 확인하는 방식보다 Apple 안내대로 일단 열어 보고 실패를 처리하는 방식으로 바꿔 두는 편이 안전합니다.

KG이니시스 매뉴얼은 Android 웹뷰에서 서드파티 쿠키를 허용하지 않으면 안심클릭 결제의 보안 키보드가 뜨지 않을 수 있고, User-Agent를 임의로 바꾸면 카드사 인증이 실패할 수 있다고도 안내합니다. React Native WebView는 Android에서 서드파티 쿠키 허용이 기본으로 켜져 있습니다.

디지털 상품은 다릅니다. 유료 콘텐츠, 구독, 앱 기능 잠금 해제는 심사 기준 3.1.1에 따라 인앱 결제가 원칙입니다. 한국에는 외부 결제를 허용하는 별도 제도가 있지만, 한국 스토어 전용 바이너리를 따로 내야 하고 수수료는 26%입니다. 결제 화면은 네이티브여야 하며 웹뷰 안에 둘 수 없다고 Apple 안내문에 적혀 있습니다. 웹뷰 앱이 PG 결제 페이지를 그대로 띄워 디지털 상품을 파는 방식은 이 제도로도 풀리지 않습니다.

## 5. 홈 화면 위젯은 웹 화면으로 그릴 수 없습니다

iOS 위젯은 SwiftUI 화면 요소 가운데 일부만 쓸 수 있고, UIKit 화면을 감싸서 넣을 수 없습니다. 웹뷰도 넣을 수 없다는 뜻이어서 위젯 화면은 SwiftUI로 따로 만듭니다. Android 위젯도 위젯 전용 화면 요소로 따로 만듭니다. 위젯에 보여 줄 데이터를 앱이나 서버에서 받아 오는 연결도 별도 작업입니다.

CROU에서 앱을 열지 않고 핵심 정보를 확인하는 홈 화면 위젯을 네이티브로 개발한 것도 이 때문입니다.

## 6. Android 16부터 뒤로 가기 코드가 동작하지 않습니다

Google Play는 2026년 8월 31일부터 Android 16(API 36) 타깃을 요구합니다([2026년 스토어 제출 요건](/insights/2026-app-store-play-submission-requirements)). 이 타깃으로 올린 앱이 Android 16 이상 기기에서 돌면 \`onBackPressed\`가 호출되지 않고, 뒤로 가기 키 이벤트(\`KEYCODE_BACK\`)도 전달되지 않습니다. 웹뷰 앱이 흔히 넣던 "뒤로 가기를 누르면 웹 페이지를 한 단계 뒤로" 코드가 여기에 해당합니다.

Android 공식 WebView 가이드에는 아직 옛 방식 예제가 실려 있어서 그대로 따라 하면 안 됩니다. 새 방식은 \`OnBackPressedCallback\`을 등록하고, 웹뷰에 뒤로 갈 페이지가 있을 때만 켜 두는 것입니다. 타깃 API를 올리는 업데이트라면 이 부분을 꼭 다시 확인하십시오.

## 네이티브 작업에 드는 일수

웹뷰 앱 견적에서 아래 작업이 빠져 있으면 출시 직전에 추가 비용으로 돌아옵니다. 저희 회사가 견적을 낼 때 잡는 대략의 일수입니다.

| 작업 | 일수 |
|---|---|
| 구글·애플 로그인 네이티브 연결 | 2~3일 |
| 앱 푸시(FCM·APNs) 연동과 토큰 전달 | 2~3일 |
| PG 결제 앱 호출 처리(Android·iOS) | 1~2일 |
| 홈 화면 위젯(iOS·Android) | 5~7일 |
| 뒤로 가기, 파일 업로드, 네트워크 오류 화면 | 1~2일 |

## 웹뷰로 시작해도 되는 서비스

| 서비스 성격 | 권하는 방식 |
|---|---|
| 모바일 웹이 이미 잘 되어 있고 콘텐츠·예약·커뮤니티가 중심 | 웹뷰 하이브리드 + 위 표의 네이티브 작업 |
| 블루투스, 백그라운드 위치 추적, 카메라 처리처럼 기기 기능이 중심 | 처음부터 크로스플랫폼(Flutter·React Native) |
| 유료 콘텐츠나 구독을 앱에서 판매 | 인앱 결제를 네이티브로 붙이는 범위를 견적에 포함 |

## 정리

웹뷰 하이브리드는 적은 비용으로 앱을 시작하는 방법이 맞습니다. 다만 견적을 받으실 때 로그인, 푸시, 결제 앱 호출, 뒤로 가기 처리가 범위에 들어 있는지 확인하셔야 합니다. 이 부분이 빠져 있으면 출시 직전에 구글 로그인이 안 되거나 심사에서 거절되는 일로 이어집니다. 나중에 크로스플랫폼으로 옮길 계획이라면 로그인 토큰과 웹뷰 쿠키 이관도 미리 생각해 두십시오([React Native 전환 때 로그아웃되는 이유](/insights/native-to-react-native-logout)).

저희 회사는 지금 있는 웹 화면을 살리면서 필요한 기능만 네이티브로 붙이는 작업을 하고 있습니다. 모바일 웹 주소와 앱에서 하고 싶은 기능을 [문의 페이지](/contact)로 남겨 주시면, 웹뷰로 어디까지 되는지부터 확인해 드리겠습니다.
`;export{e as default};
