import axiosClient from "@/libs/clients/axios-client";
import topicQueryKey from "./topic.qkey";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Topic, TopicDetail, TopicTestResultResponse } from "./topic.interface";
import { ApiResponse, PaginationResponse } from "@/constants/api.type";
import { toast } from "sonner";
import { EFlashCardMode } from "@/src/components/pages/flashcard";
import { VocabsTestAnswer } from "../vocabulary/vocabulary.interface";
import { MEDIUM_STALE_TIME } from "@/src/constants";

const getTopics = async (params: { page: number; limit: number }): Promise<PaginationResponse<Topic[]>> => {
    const response = await axiosClient.get("/topics", { params });
    return response.data;
};

const useGetTopics = (params: { page: number; limit: number }) => {
    return useQuery({
        queryKey: topicQueryKey.topics(params.page, params.limit),
        queryFn: () => getTopics(params),
    });
};

const getTopicDetail = async (topicId: number): Promise<ApiResponse<TopicDetail>> => {
    const response = await axiosClient.get(`/topics/${topicId}`);
    return response.data;
};

const getTestTopicDetail = async (topicId: number): Promise<ApiResponse<TopicDetail>> => {
    const response = await axiosClient.get(`/topics/test/${topicId}`);
    return response.data;
};

const useGetTopicDetail = (topicId: number, type: EFlashCardMode) => {
    return useQuery({
        queryKey: topicQueryKey.topicDetail(topicId, type),
        queryFn: () => {
            if (type === EFlashCardMode.TEST) {
                return getTestTopicDetail(topicId);
            }
            return getTopicDetail(topicId);
        },
        staleTime: MEDIUM_STALE_TIME
    });
};

const submitTestAnswers = async (
    topicId: number,
    answers: VocabsTestAnswer[]
): Promise<ApiResponse<TopicTestResultResponse>> => {
    const response = await axiosClient.post(`/topics/test/${topicId}/submit`, [...answers]);
    return response.data;
};

const useSubmitTestAnswers = (onSuccess: (data: TopicTestResultResponse) => void) => {
    return useMutation({
        mutationFn: ({
            topicId,
            answers,
        }: {
            topicId: number;
            answers: VocabsTestAnswer[];
        }): Promise<TopicTestResultResponse> => submitTestAnswers(topicId, answers).then((res) => res.data),
        onSuccess: (data: TopicTestResultResponse) => {
            toast.success("Submit answers success");
            onSuccess(data);
        },
    });
};

const getRandomTopics = async (): Promise<ApiResponse<Topic[]>> => {
    const response = await axiosClient.get("/topics/random");
    return response.data;
};

const useGetRandomTopics = () => {
    return useQuery({
        queryKey: topicQueryKey.randomTopics(),
        queryFn: () => getRandomTopics(),
    });
};


const createTopic = async (data: {
    name: string;
    type: string;
    description: string;
}): Promise<ApiResponse<Topic>> => {
    const response = await axiosClient.post("/topics", data);
    return response.data;
};

const useCreateTopic = (onSuccess?: (data: Topic) => void) => {
    return useMutation({
        mutationFn: (data: { name: string; type: string; description: string }) =>
            createTopic(data).then((res) => res.data),
        onSuccess: (data: Topic) => {
            toast.success("Create topic success");
            onSuccess?.(data);
        },
        onError: () => {
            toast.error("Create topic failed");
        },
    });
};

const updateTopic = async (
    topicId: number,
    data: {
        name: string;
        type: string;
        description: string;
    }
): Promise<ApiResponse<Topic>> => {
    const response = await axiosClient.put(`/topics/${topicId}`, data);
    return response.data;
};

const useUpdateTopic = (onSuccess?: (data: Topic) => void) => {
    return useMutation({
        mutationFn: ({
            topicId,
            data,
        }: {
            topicId: number;
            data: { name: string; type: string; description: string };
        }) => updateTopic(topicId, data).then((res) => res.data),
        onSuccess: (data: Topic) => {
            toast.success("Update topic success");
            onSuccess?.(data);
        },
        onError: () => {
            toast.error("Update topic failed");
        },
    });
};

const deleteTopic = async (topicId: number): Promise<ApiResponse<number>> => {
    const response = await axiosClient.delete(`/topics/${topicId}`);
    return response.data;
};

const useDeleteTopic = (onSuccess?: (topicId: number) => void) => {
    return useMutation({
        mutationFn: (topicId: number) => deleteTopic(topicId).then((res) => res.data),
        onSuccess: (topicId: number) => {
            toast.success("Delete topic success");
            onSuccess?.(topicId);
        },
        onError: () => {
            toast.error("Delete topic failed");
        },
    });
};

export {
    useGetTopics,
    useGetRandomTopics,
    useCreateTopic,
    useUpdateTopic,
    useDeleteTopic,
    useSubmitTestAnswers,
    useGetTopicDetail,
};
