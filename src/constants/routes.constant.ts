export const PATH = {
    AUTH: {
        LOGIN: "/login",
        CALLBACK: "/login/callback",
        REDIRECT_OAUTH: "/oauth/redirect-oauth",
    },
    DASHBOARD: "/dashboard",
    COMMUNICATION: "/communication",
    VOCABULARY: {
        LEARN: "/vocabulary/learn",
        TEST: "/vocabulary/test",
    },
    TEST: {
        INDEX: "/test",
        TOEIC: {
            INDEX: "/test/toeic",
            DETAIL: (id: string) => `/test/toeic/${id}`,
            PRACTICE: (id: string, partId: string) => `/test/toeic/${id}/practice?part=${partId}`,
        },
    },
    FLASHCARD: {
        INDEX: "/flashcard",
        MANAGEMENT: "/flashcard/management",
        TOPIC: {
            INDEX: "/flashcard/topic",
            DETAIL: (id: string) => `/flashcard/topic/${id}`,
        },
    },
    SETTINGS: "/settings",
    LOGOUT: "/logout",
};

export const PUBLIC_ROUTES = [PATH.AUTH.LOGIN, PATH.AUTH.CALLBACK, PATH.AUTH.REDIRECT_OAUTH];
