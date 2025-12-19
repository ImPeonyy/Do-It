import { http, HttpResponse } from "msw";
import { ApiResponse } from "@/constants/index";
import userData from "../data/user.json";

export const userHandle = [
    http.get("/users", () => {
        return HttpResponse.json<
            ApiResponse<{
                id: string;
                firstName: string;
                lastName: string;
            }>
        >({
            success: true,
            message: "Success",
            data: userData,
        });
    }),
];
