import { apiServer } from "@/src/libs";
import { PAGINATION_DEFAULT_VALUES, PaginationResponse } from "@/src/constants";
import { Test } from "@/src/services";

export default class ServerTestsService {
    static async getTests(
        page: number = PAGINATION_DEFAULT_VALUES.page,
        limit: number = PAGINATION_DEFAULT_VALUES.limit
    ): Promise<PaginationResponse<Test[]>> {
        const response = await apiServer<PaginationResponse<Test[]>>("/toeic/tests", {
            method: "GET",
            params: {
                page,
                limit,
            },
        });
        return response;
    }
}
