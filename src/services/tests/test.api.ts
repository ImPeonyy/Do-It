import axiosClient from "@/libs/clients/axios-client";
import { ApiResponse } from "@/constants/api.type";
import { Answer, PartQuestion, Test, TestDetail, ToeicTestResult } from "./test.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import testQueryKey from "./test.qkey";

const getTests = async (page?: number, limit?: number): Promise<ApiResponse<Test[]>> => {
    const response = await axiosClient.get("/toeic/tests", { params: { page, limit } });
    return response.data;
};

const useGetTests = (page?: number, limit?: number) => {
    return useQuery({
        queryKey: testQueryKey.list(),
        queryFn: () => getTests(page, limit),
    });
};

const getTest = async (id: string): Promise<ApiResponse<TestDetail>> => {
    const response = await axiosClient.get(`/toeic/tests/${id}`);
    return response.data;
};

const useGetTest = (id: string) => {
    return useQuery({
        queryKey: testQueryKey.detail(id),
        queryFn: () => getTest(id),
    });
};

const getPartQuestions = async (testId: string, partIds: string[]): Promise<ApiResponse<PartQuestion[]>> => {
    const partsArray = Array.isArray(partIds) ? partIds : [partIds];

    const response = await axiosClient.get(`/toeic/tests/${testId}/parts/${partsArray[0]}?isContinue=false`);
    return response.data;
};

const useGetPartQuestions = (testId: string, partIds: string[]) => {
    return useQuery({
        queryKey: testQueryKey.practice(testId, partIds),
        queryFn: () => getPartQuestions(testId, partIds),
    });
};

const submitAnswers = async (testId: string, partId: string, data: Answer[]): Promise<ApiResponse<void>> => {
    const response = await axiosClient.post(`/toeic/tests/${testId}/parts/${partId}/submit`, data);
    return response.data;
};

const useSubmitAnswers = (testId: string, partId: string, onSuccess: () => void) => {
    return useMutation({
        mutationFn: ( data: Answer[] ) => submitAnswers(testId, partId, data),
        onSuccess: onSuccess,
    });
};

const getTestResult = async (testId: string): Promise<ApiResponse<ToeicTestResult>> => {
    const response = await axiosClient.get(`/toeic/tests/${testId}/results`);
    return response.data;
};

const useGetTestResult = (testId: string) => {
    return useQuery({
        queryKey: testQueryKey.result(testId),
        queryFn: () => getTestResult(testId),
    });
};

export { getTests, useGetTests, useGetTest, useGetPartQuestions, useSubmitAnswers, useGetTestResult };
