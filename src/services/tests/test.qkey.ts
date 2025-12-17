const testQueryKey = {  
    all: ['tests'] as const,
    list: (page?: number, limit?: number) => [...testQueryKey.all, 'list', page, limit] as const,
    detail: (id: string) => [...testQueryKey.all, 'detail', id] as const,
    practice: (id: string, parts: string[]) => [...testQueryKey.all, 'practice', id, ...parts] as const,
};

export default testQueryKey;