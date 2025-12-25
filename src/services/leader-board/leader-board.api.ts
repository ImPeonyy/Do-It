import { ApiResponse } from "@/constants/api.type";
import { LeaderBoard } from "./leader-board.interface";
import axiosClient from "@/libs/clients/axios-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import leaderBoardQueryKey from "./leader-board.qkey";

const getTopPoint = async (): Promise<ApiResponse<LeaderBoard[]>> => {
    const response = await axiosClient.get("/users/points");
    return response.data;
}

const useGetTopPoint = () => {
    return useQuery({
        queryKey: leaderBoardQueryKey.point(),
        queryFn: () => getTopPoint(),
    });
};



const getTopStreakDay = async (): Promise<ApiResponse<LeaderBoard[]>> => {
    const response = await axiosClient.get("/users/streak-day");
    return response.data;
}

const useGetTopStreakDay = () => {
    return useQuery({
        queryKey: leaderBoardQueryKey.streakday(),
        queryFn: () => getTopStreakDay(),
    });
};


export { getTopPoint, useGetTopPoint, getTopStreakDay, useGetTopStreakDay };