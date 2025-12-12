import axiosClient from "@/libs/clients/axios-client";
import { ApiResponse } from "@/constants/api.type";
import { User } from "./user.interface";
import { useQuery } from "@tanstack/react-query";
import userQueryKey from "./user.qkey";

const getUsers = async (): Promise<ApiResponse<User[]>> => {
    const response = await axiosClient.get("/user");
    return response.data;
};

const useGetUsers = () => {
    return useQuery({
        queryKey: userQueryKey.list(),
        queryFn: getUsers,
    });
};

export { getUsers, useGetUsers };