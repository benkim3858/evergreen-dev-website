export interface Project {
    id: string;
    title: string;
    client?: string;
    period: string;
    role: string;
    techStack: string[];
    teamSize: string;
    description: string; // Short description for cards
    details: string; // Long description for detail page
    features: {
        title: string;
        items: string[];
    }[];
    images: string[];
    links: {
        github?: string;
        web?: string;
        appStore?: string;
        playStore?: string;
    };
}

export const useProjects = () => {
    const projects = ref<Project[]>([
        {
            id: 'pozo',
            title: 'POZO',
            client: 'EVERGREEN DEV',
            period: '2025.10. ~ 진행 중',
            role: '모바일 프론트엔드, 백엔드',
            techStack: ['Flutter', 'Flutter Web', 'Nest.js', 'AWS'],
            teamSize: '1명',
            description: '언택트 포장 주문의 혁신적인 솔루션',
            details: `POZO는 기존 배달 플랫폼의 복잡한 구조에서 벗어나 '포장 주문(Pick-up Only)' 기능에만 집중하여 사용자(소비자)와 매장(가맹점주) 모두에게 최적화된 서비스를 제공하는 전문 플랫폼입니다. 배달 수수료와 시간 지연 문제를 해결하고, 비대면 포장 주문의 효율성을 극대화하는 데 중점을 두고 개발되었습니다.`,
            features: [
                {
                    title: '직관적인 포장 주문 시스템',
                    items: [
                        '매장 탐색 및 메뉴 선택: 주변 포장 가능 매장을 지도 또는 리스트 형태로 제공',
                        '간편 주문 및 결제: 배달 주소 입력 없이 픽업 예상 시간과 함께 즉시 주문'
                    ]
                },
                {
                    title: '운영 효율화 시스템',
                    items: [
                        '주문 접수 및 실시간 알림: 주문 즉시 매장 관리자에게 전달 및 고객에게 준비 상태 알림',
                        '매장 관리자 앱: 주문 상태 변경(접수, 준비중, 완료) 및 매출 관리'
                    ]
                },
                {
                    title: '핵심 비즈니스 로직',
                    items: [
                        '결제 및 정산 시스템: PG 연동 및 자동 정산 로직 구현',
                        '환불 시스템: 결제 취소 및 환불 처리 프로세스 구축'
                    ]
                }
            ],
            images: [
                '/images/projects/pozo/pozo_logo.png',
                '/images/projects/pozo/pozo_1.png',
                '/images/projects/pozo/pozo_2.png',
                '/images/projects/pozo/pozo_3.png',
                '/images/projects/pozo/pozo_4.png',
                '/images/projects/pozo/pozo_5.png',
                '/images/projects/pozo/pozo_6.png',
                '/images/projects/pozo/pozo_7.png',
                '/images/projects/pozo/pozo_8.png',
                '/images/projects/pozo/pozo_9.png',
                '/images/projects/pozo/pozo_10.png',
                '/images/projects/pozo/pozo_11.png',
                '/images/projects/pozo/pozo_12.png',
                '/images/projects/pozo/pozo_13.png',
            ],
            links: {
                appStore: 'https://apps.apple.com/kr/app/pozo/id6751218631',
                playStore: 'https://play.google.com/store/apps/details?id=com.pozo.app',
                web: 'https://pozo.clickn.co.kr/'
            }
        },
        {
            id: 'crou',
            title: 'CROU',
            client: 'EVERGREEN DEV',
            period: '2025.07. ~ 2025.09.',
            role: '모바일 프론트엔드, 백엔드',
            techStack: ['React(Next.js)', 'React Native Webview', 'Nest.js', 'AWS'],
            teamSize: '1명',
            description: '크리스천을 위한 루틴 관리 & 영적 성장 동반자 앱',
            details: `CROU는 크리스천 사용자를 핵심 타겟으로 하면서도 일반적인 생활 목표 달성까지 지원하는 하이브리드 루틴 관리 애플리케이션입니다. 사용자들은 영적 성장을 위한 기도, 성경 읽기 등의 신앙 루틴과 일상 목표를 효율적으로 관리하고, 매일 제공되는 성경 구절을 통해 영감을 얻으며 꾸준함을 유지할 수 있습니다.`,
            features: [
                {
                    title: '맞춤형 루틴 관리',
                    items: [
                        '자유로운 루틴 생성: 기상, 운동, 독서 등 일상 목표 관리',
                        '크리스천 특화 루틴: 기도, 큐티, 성경 통독 계획 추천'
                    ]
                },
                {
                    title: '동기 부여 시스템',
                    items: [
                        '루틴 트래킹: 수행 점수 부여 및 주간/월간 통계 제공',
                        '예약 푸시 알림: 루틴 시작 시간에 맞춰 알림 전송'
                    ]
                },
                {
                    title: '영적 성장 도구',
                    items: [
                        '매일의 성경 구절: 매일 새로운 구절 제공 및 스크랩/공유 기능',
                        '잠금 화면 위젯: 앱 실행 없이 오늘의 말씀 확인'
                    ]
                }
            ],
            images: [
                '/images/projects/crou/crou_logo.png',
                '/images/projects/crou/crou_1.jpeg',
                '/images/projects/crou/crou_2.jpeg',
                '/images/projects/crou/crou_3.jpeg',
                '/images/projects/crou/crou_4.jpeg',
                '/images/projects/crou/crou_5.jpeg',
                '/images/projects/crou/crou_logo_body.png'
            ],
            links: {
                web: 'https://crou.kr/',
                appStore: 'https://apps.apple.com/kr/app/크루-크리스천-말씀묵상-루틴/id6746938617',
                playStore: 'https://play.google.com/store/apps/details?id=크루-크리스천-말씀묵상-루틴'
            }
        },
        {
            id: 'chordly',
            title: 'Chordly',
            client: 'EVERGREEN DEV',
            period: '2025.05. ~ 2025.07.',
            role: '모바일 프론트엔드, 백엔드',
            techStack: ['Flutter', 'Nest.js', 'AWS'],
            teamSize: '1명',
            description: '음악 전문가를 위한 인스타그램형 소셜 네트워킹 플랫폼',
            details: `Chordly는 전문 음악인과 음악 산업 종사자를 위해 인스타그램의 직관적인 사용자 경험(UX)과 음악 전문 매칭 기능을 결합한 신개념 소셜 미디어 앱입니다. 합주 파트너, 전문 과외 강사, 유료 세션 연주자 매칭 등 음악 활동에 필수적인 네트워킹과 기회를 제공하여, 전문가들의 협업 효율성을 극대화합니다.`,
            features: [
                {
                    title: '전문가 매칭 시스템',
                    items: [
                        '합주/레슨/세션 매칭: 장르, 악기, 레벨별 상세 필터링 제공',
                        '전문 프로필: 경력, 주력 악기, 포트폴리오 중심의 프로필'
                    ]
                },
                {
                    title: '소셜 네트워킹',
                    items: [
                        '인스타그램형 피드: 사진, 영상, 음원 클립 공유',
                        '다이렉트 메시지(DM): 1:1 실시간 소통 및 매칭 조율'
                    ]
                }
            ],
            images: [
                '/images/projects/chordly/chordly_logo.png',
                '/images/projects/chordly/chordly_1.png',
                '/images/projects/chordly/chordly_2.png',
                '/images/projects/chordly/chordly_3.png',
                '/images/projects/chordly/chordly_4.png',
                '/images/projects/chordly/chordly_5.png',
                '/images/projects/chordly/chordly_6.png',
                '/images/projects/chordly/chordly_7.png',
                '/images/projects/chordly/chordly_8.png',
                '/images/projects/chordly/chordly_9.png',
                '/images/projects/chordly/chordly_10.png',
                '/images/projects/chordly/chordly_11.png',
                '/images/projects/chordly/chordly_12.png',
                '/images/projects/chordly/chordly_13.png',
                '/images/projects/chordly/chordly_14.png',
                '/images/projects/chordly/chordly_15.png',
                '/images/projects/chordly/chordly_16.png'
            ],
            links: {
                appStore: 'https://apps.apple.com/kr/app/chordly/id6748267841',
                playStore: 'https://play.google.com/store/apps/details?id=com.chordly.app',
            }
        },
        {
            id: 'suwon-its-2025',
            title: '2025 Suwon ITS AP Forum',
            client: 'EVERGREEN DEV',
            period: '2025.03. ~ 2025.05.',
            role: '모바일 프론트엔드, 백엔드',
            techStack: ['Flutter', 'Nest.js', 'AWS'],
            teamSize: '1명',
            description: '2025 수원 ITS 아태총회 공식 모바일 플랫폼',
            details: `2025 수원 ITS 아태총회(ITSAP 2025) 참가자를 위한 올인원(All-in-One) 모바일 플랫폼으로, 행사 참가 경험을 극대화하고, 효과적인 네트워킹 및 정보 접근성을 제공합니다. 참가자들은 이 앱을 통해 맞춤형 스케줄 관리, 실시간 정보 획득, 그리고 활발한 커뮤니케이션을 경험할 수 있습니다.`,
            features: [
                {
                    title: '행사 정보 및 스케줄링',
                    items: [
                        '프로그램 가이드: 세션 정보, 연사, 초록 등 상세 조회',
                        '개인 맞춤 스케줄: 관심 세션 즐겨찾기 및 개인 일정 관리'
                    ]
                },
                {
                    title: '소통 및 알림',
                    items: [
                        '참가자 네트워킹: 1:1 및 그룹 채팅 기능',
                        '실시간 푸시 알림: 스케줄 리마인더 및 긴급 공지 전송'
                    ]
                }
            ],
            images: [
                '/images/projects/suwon-its-2025/suwon-its-2025_logo.png',
                '/images/projects/suwon-its-2025/suwon-its-2025_1.png',
                '/images/projects/suwon-its-2025/suwon-its-2025_2.png',
                '/images/projects/suwon-its-2025/suwon-its-2025_3.png',
                '/images/projects/suwon-its-2025/suwon-its-2025_4.png',
                '/images/projects/suwon-its-2025/suwon-its-2025_5.png',
                '/images/projects/suwon-its-2025/suwon-its-2025_6.png',
                '/images/projects/suwon-its-2025/suwon-its-2025_7.png',
                '/images/projects/suwon-its-2025/suwon-its-2025_8.png',
                '/images/projects/suwon-its-2025/suwon-its-2025_9.png',
                '/images/projects/suwon-its-2025/suwon-its-2025_10.png',
                '/images/projects/suwon-its-2025/suwon-its-2025_11.png',
                '/images/projects/suwon-its-2025/suwon-its-2025_12.png',
                '/images/projects/suwon-its-2025/suwon-its-2025_13.png',
                '/images/projects/suwon-its-2025/suwon-its-2025_14.png'
            ],
            links: {
                appStore: 'https://apps.apple.com/kr/app/suwon-its-ap-forum/id6745976353',
                playStore: 'https://play.google.com/store/apps/details?id=com.suwonits.apforum',
                web: 'https://www.itsap2025.org/'
            }
        },
        {
            id: 'koback',
            title: 'KOBACK',
            client: 'EVERGREEN DEV',
            period: '2025.01. ~ 2025.03.',
            role: '모바일 프론트엔드, 백엔드',
            techStack: ['Flutter', 'Supabase'],
            teamSize: '1명',
            description: '축구교실 학생/학부모/코치를 위한 올인원 코칭 앱',
            details: `KOBACK 앱은 학생(플레이어), 학부모, 코치 간의 효과적인 소통과 체계적인 학습 관리를 위한 플랫폼입니다. 실시간 피드백과 학습 진행 상황을 공유하여 체계적인 축구 교육을 지원합니다.`,
            features: [
                {
                    title: '학습 및 진도 관리',
                    items: [
                        '학습 일지: 코치 작성 피드백 및 영상 분석 제공',
                        '진도 관리: 개인별 기술 발전 현황 차트 및 리포트'
                    ]
                },
                {
                    title: '사용자별 맞춤 기능',
                    items: [
                        '학생: 프로필 관리, 연습 과제 확인',
                        '학부모: 자녀 성장 기록 열람, 코치 상담, 수업료 결제',
                        '코치: 클래스 및 출석 관리, 피드백 업로드'
                    ]
                }
            ],
            images: [
                '/images/projects/koback/koback_logo.png',
                '/images/projects/koback/koback_1.png',
                '/images/projects/koback/koback_2.png',
                '/images/projects/koback/koback_3.png',
                '/images/projects/koback/koback_4.png',
                '/images/projects/koback/koback_5.png',
                '/images/projects/koback/koback_7.png',
                '/images/projects/koback/koback_8.png',
                '/images/projects/koback/koback_9.png',
                '/images/projects/koback/koback_10.png',
                '/images/projects/koback/koback_11.png',
                '/images/projects/koback/koback_12.png'
            ],
            links: {
                appStore: 'https://apps.apple.com/kr/app/koback/id6746938617',
                playStore: 'https://play.google.com/store/apps/details?id=com.koback.app',
                web: 'https://koback.co.kr/'
            }
        }
    ]);

    const getProjectById = (id: string) => {
        return projects.value.find(p => p.id === id);
    };

    return {
        projects,
        getProjectById
    };
};
