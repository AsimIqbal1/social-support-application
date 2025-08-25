export const ROUTES = {
    HOME: {
        path: '/',
    },
    INITIATE_APPLICATION: {
        path: '/initiate-application/*',
        children: {
            PERSONAL_INFO: {
                path: '/initiate-application/personal-info',
                subPath: 'personal-info',
            },
            FAMILY_FINANCIAL: {
                path: '/initiate-application/family-financial',
                subPath: 'family-financial',
            },
            SITUATION_DESCRIPTION: {
                path: '/initiate-application/situation-description',
                subPath: 'situation-description',
            },
            REVIEW: {
                path: '/initiate-application/review',
                subPath: 'review',
            },
        },
    }
} as const;