import axiosClient from "@/libs/clients/axios-client";
import { Feedback } from "./feedback.interface";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "@/src/constants";

const createFeedback = async (data: Feedback): Promise<ApiResponse<void>> => {
    const response = await axiosClient.post("/feedback", data);
    return response.data;
};

const useCreateFeedback = (onSuccess: () => void) => {
    return useMutation({
        mutationFn: (data: Feedback) => createFeedback(data),
        onSuccess: onSuccess,
    });
};

export { useCreateFeedback };
