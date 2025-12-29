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


const checkFavoriteVocab = async (vocabId: number): Promise<boolean> => {
    const response = await axiosClient.get<boolean>(`/fav/vocabs/${vocabId}`);
    return response.data;
};

const useCheckFavoriteVocab = (vocabId: number) => {
    return useQuery({
        queryKey: ["favorite-vocab", vocabId],
        queryFn: () => checkFavoriteVocab(vocabId!),
        enabled: !!vocabId,
    });
};

const addFavoriteVocab = async (vocabId: number): Promise<void> => {
    await axiosClient.post(`/fav/vocabs/${vocabId}`);
};

const useAddFavoriteVocab = () => {
    return useMutation({
        mutationFn: (vocabId: number) => addFavoriteVocab(vocabId),
        onSuccess: () => {
            toast.success("Added to favorites ❤️");
        },
    });
};

const removeFavoriteVocab = async (vocabId: number): Promise<void> => {
    await axiosClient.delete(`/fav/vocabs/${vocabId}`);
};

const useRemoveFavoriteVocab = () => {
    return useMutation({
        mutationFn: (vocabId: number) => removeFavoriteVocab(vocabId),
        onSuccess: () => {
            toast.success("Removed from favorites");
        },
    });
};


export { 
    useGetTopics, 
    useGetVocabulariesTopic, 
    useGetRandomTopics, 
    useSubmitTestAnswers,
    checkFavoriteVocab,
    useCheckFavoriteVocab,
    addFavoriteVocab,
    useAddFavoriteVocab,
    removeFavoriteVocab,
    useRemoveFavoriteVocab
};
