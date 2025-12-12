const userQueryKey = {
    all: ['users'] as const,
    list: (page?: number, limit?: number) => [...userQueryKey.all, 'list', page, limit] as const,
    detail: (id: string) => [...userQueryKey.all, 'detail', id] as const,
};

export default userQueryKey;