import { ApiResponse } from "@/src/constants";
import axiosClient from "@/src/libs/clients/axios-client";
import userStatsQueryKey from "./user-stats.qkey";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserStreak } from "./user-stats.interface";
import { toast } from "sonner";

const getUserStreak = async (): Promise<ApiResponse<UserStreak>> => {
    const response = await axiosClient.get("/user-stats/streak");
    return response.data;
};

const useGetUserStreak = () => {
    return useQuery({
        queryKey: userStatsQueryKey.getUserStreak(),
        queryFn: getUserStreak,
        staleTime: Infinity,
    });
};

const updateUserStreak = async (): Promise<ApiResponse<UserStreak>> => {
    const response = await axiosClient.post("/user-stats/streak");
    return response.data;
};

const useUpdateUserStreak = (onSuccess: () => void) => {
    return useMutation({
        mutationFn: updateUserStreak,
        onSuccess: (data) => {
            toast.success("You are now on a streak of " + data.data.streakDays + " days");
            onSuccess();
        },
    });
};

export { useGetUserStreak, useUpdateUserStreak };