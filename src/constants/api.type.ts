export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T | T[];
  }
  
  export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;

  }
  
  export interface PaginationResponse<T> extends ApiResponse<T[]> {
    meta: {
      pagination: PaginationMeta;
    };
  }
  