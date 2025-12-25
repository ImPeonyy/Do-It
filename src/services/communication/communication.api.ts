import axiosClient from "@/libs/clients/axios-client";
import { ApiResponse } from "@/src/constants";
import { LiveKitTokenResponse } from "./communication.interface";

const createLiveKitRoom = async (): Promise<ApiResponse<{ roomName: string }>> => {
    return axiosClient.post("/call/room");
};

const getLiveKitToken = async (roomName: string): Promise<ApiResponse<LiveKitTokenResponse>> => {
    return axiosClient.post("/call/token", { roomName });
};

export { createLiveKitRoom, getLiveKitToken };
