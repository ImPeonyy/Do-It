import axiosClient from "@/libs/clients/axios-client";
import { ApiResponse } from "@/constants/api.type";
import { Answer, PartQuestion, SubmitAnswers, Test, TestDetail } from "./test.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import testQueryKey from "./test.qkey";

const getTests = async (page?: number, limit?: number): Promise<ApiResponse<Test[]>> => {
    const response = await axiosClient.get("/tests", { params: { page, limit } });
    return response.data;
};

const useGetTests = (page?: number, limit?: number) => {
    return useQuery({
        queryKey: testQueryKey.list(),
        queryFn: () => getTests(page, limit),
    });
};

const getTest = async (id: string): Promise<ApiResponse<TestDetail>> => {
    const response = await axiosClient.get(`/tests/${id}`);
    return response.data;
};

const useGetTest = (id: string) => {
    return useQuery({
        queryKey: testQueryKey.detail(id),
        queryFn: () => getTest(id),
    });
};

const getPartQuestions = async (id: string, part: string[]): Promise<ApiResponse<PartQuestion[]>> => {
    const params = new URLSearchParams();
    const partsArray = Array.isArray(part) ? part : [part];
    partsArray.forEach((p) => {
        params.append("part", p);
    });

    const response = await axiosClient.get(`/tests/${id}/practice`, { params });
    return response.data;
};

const useGetPartQuestions = (id: string, part: string[]) => {
    return useQuery({
        queryKey: testQueryKey.practice(id, part),
        queryFn: () => getPartQuestions(id, part),
    });
};

const submitAnswers = async (testId: string, partId: string, data: SubmitAnswers): Promise<ApiResponse<void>> => {
    const response = await axiosClient.post(`/tests/${testId}/parts/${partId}/submit`, data);
    return response.data;
};

const useSubmitAnswers = (testId: string, partId: string) => {
    return useMutation({
        mutationFn: ( data: SubmitAnswers ) => submitAnswers(testId, partId, data),
    });
};

export { useGetTests, useGetTest, useGetPartQuestions, useSubmitAnswers };
