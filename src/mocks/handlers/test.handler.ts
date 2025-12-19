import { http, HttpResponse } from "msw";
import { ApiResponse } from "@/constants/index";
import testData from "../data/test.json";
import { PartQuestion, Test, TestDetail } from "@/services/tests/test.interface";

export const testHandle = [
    http.get("/tests", () => {
        return HttpResponse.json<ApiResponse<Test[]>>({
            data: testData.tests,
        });
    }),

    http.get("/tests/:id", () => {
        return HttpResponse.json<ApiResponse<TestDetail>>({
            data: {
                test: testData.testDetail,
                parts: testData.testDetail.parts,
            },
        });
    }),

    http.get("/tests/:id/practice", ({ request }) => {
        const url = new URL(request.url);
        const parts = url.searchParams.getAll("part");
        
        return HttpResponse.json<ApiResponse<PartQuestion[]>>({
            data: testData.partQuestions.filter((part) => parts.includes(part.partId.toString())),
        });
    }),
];
