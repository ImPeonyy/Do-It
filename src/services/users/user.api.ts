import axiosClient from "@/libs/clients/axios-client";
import { ApiResponse } from "@/constants/api.type";
import { UserProfile } from "./user.interface";
import { useQuery } from "@tanstack/react-query";
import userQueryKey from "./user.qkey";

const getUserProfile = async (): Promise<ApiResponse<UserProfile>> => {
    const response = await axiosClient.get("/users/profile");
    return response.data;
};

const useGetUserProfile = () => {
    return useQuery({
        queryKey: userQueryKey.profile(),
        queryFn: getUserProfile,
    });
};

export { useGetUserProfile };