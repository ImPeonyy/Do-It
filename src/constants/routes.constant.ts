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
    TEST: "/test",
    SETTINGS: "/settings",
    LOGOUT: "/logout",
};

export const PUBLIC_ROUTES = [PATH.AUTH.LOGIN, PATH.AUTH.CALLBACK, PATH.AUTH.REDIRECT_OAUTH];
