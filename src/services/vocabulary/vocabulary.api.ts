import axiosClient from "@/libs/clients/axios-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/constants/api.type";
import { toast } from "sonner";
import { CreateVocabularyRequest, Vocabulary, VocabularyForm } from "./vocabulary.interface";

const createVocabulary = async (data: CreateVocabularyRequest): Promise<ApiResponse<Vocabulary>> => {
    const response = await axiosClient.post(`/vocabulary/flashcard`, data);
    return response.data;
};

const useCreateVocabulary = (onSuccess?: (data: Vocabulary) => void) => {
    return useMutation({
        mutationFn: (data: CreateVocabularyRequest) => createVocabulary(data).then((res) => res.data),
        onSuccess: (data: Vocabulary) => {
            toast.success("Create vocabulary success");
            onSuccess?.(data);
        },
        onError: () => {
            toast.error("Create vocabulary failed");
        },
    });
};

const updateVocabulary = async (vocabId: number, data: VocabularyForm): Promise<ApiResponse<Vocabulary>> => {
    const response = await axiosClient.put(`/vocabulary/flashcard/${vocabId}`, data);
    return response.data;
};

const useUpdateVocabulary = (onSuccess?: (data: Vocabulary) => void) => {
    return useMutation({
        mutationFn: ({ vocabId, data }: { vocabId: number; data: VocabularyForm }) =>
            updateVocabulary(vocabId, data).then((res) => res.data),
        onSuccess: (data: Vocabulary) => {
            toast.success("Update vocabulary success");
            onSuccess?.(data);
        },
        onError: () => {
            toast.error("Update vocabulary failed");
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

const deleteVocabulary = async (vocabIds: number[]): Promise<ApiResponse<number[]>> => {
    const response = await axiosClient.delete(`/vocabulary/flashcard`, {
        data: {
            vocabIds: vocabIds,
        },
    });
    return response.data;
};

const useDeleteVocabulary = (onSuccess?: (vocabIds: number[]) => void) => {
    return useMutation({
        mutationFn: (vocabIds: number[]) => deleteVocabulary(vocabIds).then((res) => res.data),
        onSuccess: (vocabIds: number[]) => {
            toast.success("Delete vocabulary success");
            onSuccess?.(vocabIds);
        },
        onError: () => {
            toast.error("Delete vocabulary failed");
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
    useCreateVocabulary,
    useUpdateVocabulary,
    useDeleteVocabulary,
    checkFavoriteVocab,
    useCheckFavoriteVocab,
    addFavoriteVocab,
    useAddFavoriteVocab,
    removeFavoriteVocab,
    useRemoveFavoriteVocab,
};
export {};
