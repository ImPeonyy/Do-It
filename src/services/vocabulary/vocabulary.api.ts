import axiosClient from "@/libs/clients/axios-client";
import vocabularyQueryKey from "./vocabulary.qkey";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Topic, TopicDetail, TopicTestResultResponse, VocabsTestAnswer } from "./vocabulary.interface";
import { ApiResponse, PaginationResponse } from "@/constants/api.type";
import { EFlashCardMode } from "@/src/components/pages/flashcard";
import { toast } from "sonner";

const getTopics = async (params: { page: number; limit: number }): Promise<PaginationResponse<Topic[]>> => {
    const response = await axiosClient.get("/topics", { params });
    return response.data;
};

const useGetTopics = (params: { page: number; limit: number }) => {
    return useQuery({
        queryKey: vocabularyQueryKey.topics(params.page, params.limit),
        queryFn: () => getTopics(params),
    });
};

const getVocabulariesTopic = async (topicId: number): Promise<ApiResponse<TopicDetail>> => {
    const response = await axiosClient.get(`/topics/${topicId}`);
    return response.data;
};

const getTestVocabulariesTopic = async (topicId: number): Promise<ApiResponse<TopicDetail>> => {
    const response = await axiosClient.get(`/topics/test/${topicId}`);
    return response.data;
};

const useGetVocabulariesTopic = (topicId: number, type: EFlashCardMode) => {
    return useQuery({
        queryKey: vocabularyQueryKey.vocabularies(topicId, type),
        queryFn: () => {
            if (type === EFlashCardMode.TEST) {
                return getTestVocabulariesTopic(topicId);
            }
            return getVocabulariesTopic(topicId);
        },
    });
};

const getRandomTopics = async (): Promise<ApiResponse<Topic[]>> => {
    const response = await axiosClient.get("/topics/random");
    return response.data;
};

const useGetRandomTopics = () => {
    return useQuery({
        queryKey: vocabularyQueryKey.randomTopics(),
        queryFn: () => getRandomTopics(),
    });
};

const submitTestAnswers = async (
    topicId: number,
    answers: VocabsTestAnswer[]
): Promise<ApiResponse<TopicTestResultResponse>> => {
    console.log(answers);
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

export { useGetTopics, useGetVocabulariesTopic, useGetRandomTopics, useSubmitTestAnswers };
