const userQueryKey = {
    all: ['users'] as const,
    profile: () => [...userQueryKey.all, 'profile'] as const,
};

export default userQueryKey;