import { apiServer } from "@/src/libs";
import { ApiResponse } from "@/src/constants";
import { Topic } from "@/src/services";

export default class ServerTopicsService {
    static async getUserTopics(): Promise<ApiResponse<Topic[]>> {
        const response = await apiServer<ApiResponse<Topic[]>>("/topics/user", {
            method: "GET",
        });
        return response;
    }
}
