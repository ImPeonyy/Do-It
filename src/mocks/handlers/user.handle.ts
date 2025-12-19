import { http, HttpResponse } from "msw";
import { ApiResponse } from "@/constants/index";
import userData from "../data/user.json";
import { UserProfile } from "@/services/users/user.interface";

export const userHandle = [
    http.get("/users/profile", () => {
        return HttpResponse.json<
            ApiResponse<UserProfile>
        >({
            data: userData[0],
        });
    }),
];
