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

interface ProjectStaticData {
    id: string;
    title: string;
    client?: string;
    period: string;
    techStack: string[];
    images: string[];
    links: {
        github?: string;
        web?: string;
        appStore?: string;
        playStore?: string;
    };
}

// Define feature keys and item counts for each project to use t() with specific paths
const projectFeatureConfig: Record<string, { key: string; itemCount: number }[]> = {
    'pozo': [
        { key: 'ordering', itemCount: 2 },
        { key: 'operations', itemCount: 2 },
        { key: 'business', itemCount: 2 }
    ],
    'crou': [
        { key: 'routine', itemCount: 2 },
        { key: 'motivation', itemCount: 2 },
        { key: 'spiritual', itemCount: 2 }
    ],
    'chordly': [
        { key: 'matching', itemCount: 2 },
        { key: 'social', itemCount: 2 }
    ],
    'suwon-its-2025': [
        { key: 'schedule', itemCount: 2 },
        { key: 'communication', itemCount: 2 }
    ],
    'koback': [
        { key: 'learning', itemCount: 2 },
        { key: 'users', itemCount: 3 }
    ]
};

// Static data that doesn't need translation
const projectsStaticData: ProjectStaticData[] = [
    {
        id: 'pozo',
        title: 'POZO',
        client: 'EVERGREEN DEV',
        period: '2025.10. ~ 2025.12.',
        techStack: ['Flutter', 'Flutter Web', 'Nest.js', 'AWS'],
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
        techStack: ['React(Next.js)', 'React Native Webview', 'Nest.js', 'AWS'],
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
        techStack: ['Flutter', 'Nest.js', 'AWS'],
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
        techStack: ['Flutter', 'Nest.js', 'AWS'],
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
        techStack: ['Flutter', 'Supabase'],
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
];

export const useProjects = () => {
    const { t } = useI18n();

    // Helper function to safely get string from translation
    const getString = (key: string): string => {
        const result = t(key);
        if (typeof result === 'string') return result;
        // Handle case where t() returns the key itself (translation not found)
        return key.split('.').pop() || '';
    };

    // Helper function to get features using t() with specific paths
    const getFeatures = (projectId: string): { title: string; items: string[] }[] => {
        const featureConfig = projectFeatureConfig[projectId];
        if (!featureConfig) return [];

        return featureConfig.map(({ key, itemCount }) => {
            const items: string[] = [];
            for (let i = 0; i < itemCount; i++) {
                items.push(t(`projectData.${projectId}.features.${key}.items[${i}]`));
            }
            return {
                title: t(`projectData.${projectId}.features.${key}.title`),
                items
            };
        });
    };

    // Build projects with translations
    const projects = computed<Project[]>(() => {
        return projectsStaticData.map(staticData => {
            const translationKey = staticData.id;

            // Create a plain object copy to avoid reactivity issues
            const project: Project = {
                id: staticData.id,
                title: staticData.title,
                client: staticData.client,
                period: staticData.period,
                techStack: [...staticData.techStack],
                images: [...staticData.images],
                links: { ...staticData.links },
                description: getString(`projectData.${translationKey}.description`),
                details: getString(`projectData.${translationKey}.details`),
                role: getString(`projectData.${translationKey}.role`),
                teamSize: staticData.id === 'koback' ? '1' : staticData.id === 'crou' ? '2' : '3',
                features: getFeatures(translationKey)
            };

            return project;
        });
    });

    const getProjectById = (id: string) => {
        return projects.value.find(p => p.id === id);
    };

    return {
        projects,
        getProjectById
    };
};
