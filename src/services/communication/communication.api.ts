import axiosClient from "@/libs/clients/axios-client";

const createLiveKitRoom = async (): Promise<string> => {
    const res = await axiosClient.post("/call/room");
    return res.data.roomName;
};

const getLiveKitToken = async (roomName: string): Promise<string> => {
    const res = await axiosClient.post("/call/token", { roomName });
    return res.data.token;
};

export { createLiveKitRoom, getLiveKitToken };
