export interface ApiResponse<T> {
    data: T;
}

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface PaginationResponse<T> extends ApiResponse<T[]> {
    pagination: PaginationMeta;
}
