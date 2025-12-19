const testQueryKey = {  
    all: ['tests'] as const,
    list: (page?: number, limit?: number) => [...testQueryKey.all, 'list', page, limit] as const,
    detail: (id: string) => [...testQueryKey.all, 'detail', id] as const,
    practice: (testId: string, partIds: string[]) => [...testQueryKey.all, 'practice', testId, ...partIds] as const,
    result: (testId: string) => [...testQueryKey.all, 'result', testId] as const,
};

export default testQueryKey;