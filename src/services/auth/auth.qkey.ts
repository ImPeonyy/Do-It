const authQueryKey = {
    all: ["auth"] as const,
    getOauthUrl: () => [...authQueryKey.all, "getOauthUrl"] as const,
    login: () => [...authQueryKey.all, "login"] as const,
    logout: () => [...authQueryKey.all, "logout"] as const,
};

export default authQueryKey;
